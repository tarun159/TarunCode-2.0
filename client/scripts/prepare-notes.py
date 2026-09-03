#!/usr/bin/env python3
"""
PC Notes — Automated PDF-to-WebP Converter

Scans public/source-notes/, converts all PDF pages to WebP images,
and updates pcNotes.ts with the correct page paths.

Usage:
    python3 scripts/prepare-notes.py

Workflow:
1. Place PDFs in: public/source-notes/<module-folder>/<question-id>.pdf
   Example: public/source-notes/module-1/simd.pdf
2. Run this script
3. It will:
   - Convert each PDF page to page-1.webp, page-2.webp, etc.
   - Save images to public/notes/pc/<module-folder>/<question-id>/
   - Update the pages array in pcNotes.ts automatically
   - Skip unchanged PDFs (by checking timestamps)
   - Show a clear success/error report

Requirements:
    pip install pdf2image pillow
"""

import sys
import os
import json
import hashlib
import re
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional, Tuple
try:
    from pdf2image import convert_from_path
    from PIL import Image
except ImportError:
    print("Error: pdf2image or pillow not installed.")
    print("Install with: pip install pdf2image pillow")
    sys.exit(1)

# -------------------------------------------------------------------
# Configuration
# -------------------------------------------------------------------
PROJECT_ROOT = Path(__file__).parent.parent
SOURCE_NOTES_DIR = PROJECT_ROOT / "public" / "source-notes"
OUTPUT_NOTES_DIR = PROJECT_ROOT / "public" / "notes" / "pc"
TS_DATA_FILE = PROJECT_ROOT / "src" / "data" / "pcNotes.ts"

# Regex patterns to extract module and question from folder structure
MODULE_PATTERN = re.compile(r'module[-\s]?(\d+)', re.IGNORECASE)
QUESTION_ID_PATTERN = re.compile(r'^[a-z0-9][a-z0-9-]*[a-z0-9]$')

# Keep track of conversion stats
class ConversionStats:
    def __init__(self):
        self.total_pdfs = 0
        self.converted_pdfs = 0
        self.total_pages = 0
        self.skipped_pdfs = 0
        self.errors = []

    def print_report(self):
        print("\n" + "="*60)
        print("PC NOTES CONVERSION REPORT")
        print("="*60)
        print(f"• Found {self.total_pdfs} PDF(s) in source-notes/")
        print(f"• Converted {self.converted_pdfs} PDF(s) ({self.skipped_pdfs} skipped)")
        print(f"• Generated {self.total_pages} page image(s)")
        if self.errors:
            print(f"• Encountered {len(self.errors)} error(s):")
            for err in self.errors:
                print(f"  - {err}")
        else:
            print("• All PDFs processed successfully!")
        print("="*60)

# -------------------------------------------------------------------
# Helper functions
# -------------------------------------------------------------------
def clean_question_id(filename: str) -> str:
    """Convert a filename to a valid question ID."""
    # Remove .pdf extension and any spaces
    base = filename.replace('.pdf', '').replace(' ', '-').lower()
    # Remove any non-alphanumeric or dash characters
    base = re.sub(r'[^a-z0-9-]', '', base)
    # Ensure it starts and ends with alphanumeric
    if base.startswith('-'):
        base = base[1:]
    if base.endswith('-'):
        base = base[:-1]
    return base if base else "question"

def get_module_number_from_path(path: Path) -> Optional[int]:
    """Extract module number from a folder path."""
    for part in path.parts:
        match = MODULE_PATTERN.search(part)
        if match:
            return int(match.group(1))
    return None

def pdf_needs_conversion(pdf_path: Path, output_dir: Path) -> bool:
    """Check if PDF needs conversion (newer than images or images missing)."""
    if not output_dir.exists():
        return True

    pdf_mtime = pdf_path.stat().st_mtime

    # Check if any page images are missing or older
    page_files = list(output_dir.glob("page-*.webp"))
    if not page_files:
        return True

    for page_file in page_files:
        if page_file.stat().st_mtime < pdf_mtime:
            return True

    return False

def get_pdf_hash(pdf_path: Path) -> str:
    """Get a hash of the PDF file for change detection."""
    with open(pdf_path, 'rb') as f:
        return hashlib.md5(f.read()).hexdigest()

def convert_pdf_to_webp(
    pdf_path: Path,
    output_dir: Path,
    question_id: str,
    module_num: int,
    stats: ConversionStats
) -> List[str]:
    """Convert PDF pages to WebP images."""
    try:
        print(f"  📄 Converting {pdf_path.name}...")

        # Create output directory
        output_dir.mkdir(parents=True, exist_ok=True)

        # Convert PDF to images
        pages = convert_from_path(str(pdf_path), dpi=150)

        # Save each page
        page_paths = []
        for i, img in enumerate(pages, start=1):
            # Create page filename
            page_filename = f"page-{i}.webp"
            page_path = output_dir / page_filename

            # Save as WebP with good quality
            img.save(str(page_path), "WEBP", quality=90, method=6)

            # Calculate relative path for TypeScript
            rel_path = f"/notes/pc/module-{module_num}/{question_id}/{page_filename}"
            page_paths.append(rel_path)

            stats.total_pages += 1

        print(f"    ✅ Generated {len(page_paths)} page(s)")
        return page_paths

    except Exception as e:
        error_msg = f"Failed to convert {pdf_path}: {e}"
        stats.errors.append(error_msg)
        print(f"    ❌ {error_msg}")
        return []

def update_typescript_file(
    module_num: int,
    question_id: str,
    question_name: str,
    page_paths: List[str],
    stats: ConversionStats
) -> bool:
    """Update the TypeScript data file with the new question/page info."""
    try:
        # Read the TypeScript file
        with open(TS_DATA_FILE, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the module in the array
        module_id = f"module-{module_num}"
        module_pattern = re.compile(rf'{{\s*id:\s*[\'"]{module_id}[\'"]', re.IGNORECASE)

        if not module_pattern.search(content):
            print(f"    ⚠️  Module '{module_id}' not found in pcNotes.ts")
            stats.errors.append(f"Module '{module_id}' not found in TypeScript file")
            return False

        # Find the questions array for this module
        # This regex finds the module block and its questions array
        module_start = content.find(f'id: "{module_id}"')
        if module_start == -1:
            module_start = content.find(f"id: '{module_id}'")

        if module_start == -1:
            print(f"    ❌ Could not find module {module_id} in file")
            return False

        # Find the questions array start
        questions_start = content.find("questions: [", module_start)
        if questions_start == -1:
            print(f"    ❌ Could not find questions array for module {module_id}")
            return False

        # Find the end of the questions array
        bracket_count = 0
        i = questions_start + len("questions: [")
        while i < len(content):
            if content[i] == '[':
                bracket_count += 1
            elif content[i] == ']':
                if bracket_count == 0:
                    questions_end = i
                    break
                bracket_count -= 1
            i += 1
        else:
            print(f"    ❌ Could not find end of questions array")
            return False

        # Check if question already exists
        existing_question_pattern = re.compile(rf'id:\s*[\'"]{question_id}[\'"]', re.IGNORECASE)
        existing_match = existing_question_pattern.search(content[questions_start:questions_end])

        if existing_match:
            # Update existing question
            print(f"    🔄 Updating existing question '{question_id}'")

            # Find the question block
            question_block_start = questions_start + existing_match.start()
            # Find the end of this question (next }, or end of array)
            brace_count = 0
            j = question_block_start
            while j < questions_end:
                if content[j] == '{':
                    brace_count += 1
                elif content[j] == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        question_block_end = j + 1
                        break
                j += 1
            else:
                question_block_end = questions_end

            # Build new question data
            pages_str = ',\n    '.join([f"'{p}'" for p in page_paths])
            new_question = f"""{{
    id: '{question_id}',
    question: '{question_name}',
    pages: [
      {pages_str}
    ],
    description: '{question_name}',
    readingTime: '{max(1, len(page_paths)//2)} min',
    tags: ['Module {module_num}'],
  }}"""

            # Replace the question block
            new_content = content[:question_block_start] + new_question + content[question_block_end:]

        else:
            # Add new question
            print(f"    ➕ Adding new question '{question_id}'")

            # Build new question data
            pages_str = ',\n    '.join([f"'{p}'" for p in page_paths])
            new_question = f""",
  {{
    id: '{question_id}',
    question: '{question_name}',
    pages: [
      {pages_str}
    ],
    description: '{question_name}',
    readingTime: '{max(1, len(page_paths)//2)} min',
    tags: ['Module {module_num}'],
  }}"""

            # Insert before the closing bracket of the questions array
            insert_pos = questions_end
            new_content = content[:insert_pos] + new_question + content[insert_pos:]

        # Write the updated file
        with open(TS_DATA_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"    ✅ Updated pcNotes.ts")
        return True

    except Exception as e:
        error_msg = f"Failed to update TypeScript file: {e}"
        stats.errors.append(error_msg)
        print(f"    ❌ {error_msg}")
        return False

def process_pdf(pdf_path: Path, stats: ConversionStats) -> bool:
    """Process a single PDF file."""
    try:
        stats.total_pdfs += 1

        # Extract module number from folder structure
        relative_to_source = pdf_path.relative_to(SOURCE_NOTES_DIR)
        module_num = get_module_number_from_path(relative_to_source)

        if not module_num:
            print(f"  ⚠️  Skipping {pdf_path.name}: Could not determine module number")
            stats.skipped_pdfs += 1
            return False

        # Get question ID from filename
        question_id = clean_question_id(pdf_path.stem)
        question_name = pdf_path.stem.replace('-', ' ').title()

        # Determine output directory
        output_dir = OUTPUT_NOTES_DIR / f"module-{module_num}" / question_id

        # Check if conversion is needed
        if not pdf_needs_conversion(pdf_path, output_dir):
            print(f"  ⏭️  Skipping {pdf_path.name}: Already up to date")
            stats.skipped_pdfs += 1
            return True

        print(f"  🔍 Processing: {pdf_path.name}")
        print(f"    → Module: {module_num}, Question: {question_id}")

        # Convert PDF to WebP
        page_paths = convert_pdf_to_webp(pdf_path, output_dir, question_id, module_num, stats)

        if not page_paths:
            return False

        # Update TypeScript file
        if update_typescript_file(module_num, question_id, question_name, page_paths, stats):
            stats.converted_pdfs += 1
            return True
        else:
            return False

    except Exception as e:
        error_msg = f"Error processing {pdf_path.name}: {e}"
        stats.errors.append(error_msg)
        print(f"  ❌ {error_msg}")
        return False

def main():
    """Main function to scan and process all PDFs."""
    print("🚀 PC Notes - Automated PDF Conversion")
    print("="*60)

    # Check if source directory exists
    if not SOURCE_NOTES_DIR.exists():
        print(f"❌ Source directory not found: {SOURCE_NOTES_DIR}")
        print(f"   Create it and place PDFs in: {SOURCE_NOTES_DIR}/module-*/")
        return 1

    # Create output directory
    OUTPUT_NOTES_DIR.mkdir(parents=True, exist_ok=True)

    # Initialize stats
    stats = ConversionStats()

    # Find all PDF files
    pdf_files = list(SOURCE_NOTES_DIR.rglob("*.pdf"))

    if not pdf_files:
        print("📭 No PDF files found in source-notes/")
        print(f"   Place your Word-exported PDFs in: {SOURCE_NOTES_DIR}/module-1/simd.pdf etc.")
        return 0

    print(f"📂 Found {len(pdf_files)} PDF file(s) to process")

    # Process each PDF
    for pdf_path in pdf_files:
        process_pdf(pdf_path, stats)

    # Print report
    stats.print_report()

    if stats.errors:
        return 1

    return 0

if __name__ == "__main__":
    sys.exit(main())