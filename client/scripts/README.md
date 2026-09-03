# PC Notes Automation Scripts

## Overview
This folder contains the automation scripts for the PC Notes system.

## Scripts

### `prepare-notes.py`
**Main automation script** that:
- Scans `public/source-notes/` for PDF files
- Converts each PDF page to WebP images
- Updates `src/data/pcNotes.ts` automatically
- Skips unchanged PDFs (checks timestamps)

**Usage:**
```bash
npm run prepare-notes
```

### `requirements.txt`
Python dependencies:
```bash
pip install -r scripts/requirements.txt
```

For macOS, also install poppler:
```bash
brew install poppler
```

## Folder Structure
```
client/
├── scripts/
│   ├── prepare-notes.py     # Main conversion script
│   ├── requirements.txt     # Python dependencies
│   └── README.md           # This file
├── public/
│   ├── source-notes/       ← Your PDFs go here
│   │   ├── module-1/
│   │   │   └── simd.pdf
│   │   └── module-2/
│   │       └── cache.pdf
│   └── notes/pc/           ← Auto-generated images
│       ├── module-1/
│       │   └── simd/
│       │       ├── page-1.webp
│       │       ├── page-2.webp
│       │       └── ...
│       └── module-2/
│           └── cache/
│               ├── page-1.webp
│               └── ...
└── src/data/pcNotes.ts     ← Auto-updated by script
```

## How It Works
1. **Place PDF**: Export Word document as PDF → place in `source-notes/module-N/question.pdf`
2. **Run Script**: `npm run prepare-notes`
3. **Automatic**:
   - PDF detected → module number extracted from folder
   - Question ID derived from filename (e.g., `simd.pdf` → `simd`)
   - PDF pages converted to `page-1.webp`, `page-2.webp`, etc.
   - Images saved to `notes/pc/module-N/question/`
   - TypeScript file updated with correct page paths
   - Question appears in website automatically

## Troubleshooting

### Python Dependencies Missing
```bash
pip install pdf2image pillow
```

### macOS: Poppler Missing
```bash
brew install poppler
```

### Script Permission Denied
```bash
chmod +x scripts/prepare-notes.py
```

### No PDFs Found
- Check PDFs are in `public/source-notes/module-N/` folders
- Filename must end with `.pdf` (case-sensitive)

### Module Number Not Detected
Folder name must contain `module-N`:
- ✅ `module-1`, `Module-2`, `MODULE-3`
- ❌ `module1`, `mod-1`, `1`

## Testing
To test the script:
1. Place a PDF in `public/source-notes/module-1/test.pdf`
2. Run: `npm run prepare-notes`
3. Check output and verify images are created

## Notes
- The script preserves your original PDFs in `source-notes/` as backup
- Only newer PDFs are converted (checks timestamps)
- WebP format provides good compression with high quality
- The TypeScript update is non-destructive - existing questions are updated, new ones are added