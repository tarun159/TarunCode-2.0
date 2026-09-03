# PC Notes — Simplified Workflow

## Overview
The PC Notes system has been completely automated. You only need to:
1. Prepare your answer in **Microsoft Word**.
2. **Export** it as a single PDF.
3. Place the PDF in the correct folder.
4. Run **one command**.

The system will automatically convert PDF pages to WebP images, create folders, and update the TypeScript data file.

## Quick Start

### 1. Create Your Answer
- Write your complete answer in **Microsoft Word**.
- Use **Times New Roman** font for consistency (automatically applied in the viewer).
- Add any formatting you want: **bold**, *italic*, headings, tables, images, diagrams, numbered lists, bullet points.
- The PDF export preserves all Word formatting perfectly.

### 2. Export as PDF
- In Word: **File → Export → Create PDF/XPS**
- Save with a descriptive name, e.g., `simd.pdf`

### 3. Place the PDF
Create this folder structure:
```
public/source-notes/
├── module-1/
│   └── simd.pdf
├── module-2/
│   └── cache-consistency.pdf
└── ...
```

**Rules:**
- Folder name must contain `module-N` (e.g., `module-1`, `module-2`)
- PDF filename becomes the question ID (e.g., `simd.pdf` → `simd`)

### 4. Run the Conversion
```bash
cd /client
npm run prepare-notes
```

This single command will:
- Find all PDFs in `public/source-notes/`
- Convert each PDF page to WebP images
- Create output folders: `public/notes/pc/module-N/question-id/`
- Name pages: `page-1.webp`, `page-2.webp`, etc.
- Automatically update `src/data/pcNotes.ts` with correct page paths
- Skip unchanged PDFs (checks timestamps)
- Show clear success/error report

### 5. Done!
- The website will now display your answer as beautiful page images
- No manual editing of TypeScript files needed
- No manual image conversion or folder creation

## Adding a New Question

### First-Time Setup
1. Create your Word document with the answer
2. Export as PDF (e.g., `parallel-processing.pdf`)
3. Place in: `public/source-notes/module-1/parallel-processing.pdf`
4. Run: `npm run prepare-notes`

### What Happens Automatically
```
✅ PDF detected: module-1/parallel-processing.pdf
✅ Module: 1, Question: parallel-processing
✅ Generated 3 page(s)
✅ Updated pcNotes.ts
```

The question will appear in Module 1 with:
- Question text: "Parallel Processing" (auto-capitalized from filename)
- Page count: 3 pages
- Reading time: "2 min" (auto-calculated)
- Tags: ["Module 1"]

## Updating an Existing Answer

### When You Revise Your Word Document
1. Edit your Word document
2. Export as PDF with the same filename
3. Replace the old PDF: `public/source-notes/module-1/simd.pdf`
4. Run: `npm run prepare-notes`

### What Happens Automatically
```
📄 PDF detected: module-1/simd.pdf
🔍 Already exists, checking timestamps...
🔄 PDF is newer, regenerating pages...
✅ Regenerated 4 page(s)
🔄 Updating existing question 'simd'
✅ Updated pcNotes.ts
```

The system detects the PDF is newer and regenerates all pages.

## Deleting a Question

1. Remove the PDF: `public/source-notes/module-1/simd.pdf`
2. Manually edit `src/data/pcNotes.ts` to remove the question entry
3. Optionally delete the image folder: `public/notes/pc/module-1/simd/`

## File Structure

```
public/
├── source-notes/          ← Your PDFs go here
│   ├── module-1/
│   │   ├── simd.pdf
│   │   └── parallel-processing.pdf
│   └── module-2/
│       └── cache-consistency.pdf
│
└── notes/pc/              ← Auto-generated images
    ├── module-1/
    │   ├── simd/
    │   │   ├── page-1.webp
    │   │   ├── page-2.webp
    │   │   └── ...
    │   └── parallel-processing/
    │       ├── page-1.webp
    │       └── ...
    └── module-2/
        └── cache-consistency/
            ├── page-1.webp
            └── ...
```

## Requirements

### Python Dependencies
The conversion script needs:
```bash
pip install pdf2image pillow
```

If you see "pdf2image not installed", install with:
```bash
pip install pdf2image pillow
```

### Note for macOS
If you get a poppler error:
```bash
brew install poppler
```

## Troubleshooting

### "No PDF files found"
Make sure:
- PDFs are in `public/source-notes/module-N/` folders
- Filename ends with `.pdf` (case-sensitive)

### "Could not determine module number"
Folder name must contain `module-N` (case-insensitive):
- ✅ `module-1`, `Module-2`, `MODULE-3`
- ❌ `module1`, `mod-1`, `1`

### "Failed to convert PDF"
Check:
- PDF is not corrupted (open in PDF viewer)
- Python dependencies are installed: `pdf2image pillow`
- macOS: `poppler` is installed via Homebrew

### Pages out of order
The script processes pages in the order they appear in the PDF. Ensure your Word document pages are in the correct order before exporting.

## Advanced: Manual Override

### Custom Question Text
After automatic conversion, you can manually edit `src/data/pcNotes.ts`:
```typescript
{
  id: 'simd',
  question: 'Custom question text here',  // ← Edit this
  pages: [...],
  description: 'Custom description',
  readingTime: '10 min',
  tags: ['Architecture', 'Advanced'],
}
```

### Adding Multiple Questions to One PDF
If you have multiple answers in one PDF, split them into separate PDFs before placing in `source-notes/`.

## Performance Notes

- **Skip unchanged PDFs**: The script checks file timestamps and only converts newer PDFs
- **WebP format**: High quality (90%) with good compression
- **150 DPI**: Balanced quality vs file size
- **Lazy loading**: Pages beyond the first two load on demand

## Viewing Your Notes

1. Run the dev server: `npm run dev`
2. Open: http://localhost:5173/pc-notes
3. Click a module → click a question
4. The futuristic viewer slides down with your page images

## Backup Your Source PDFs

The `public/source-notes/` folder contains your original PDFs. Keep them as backups. The website displays only the generated WebP images.

---

**Summary:** Word → Export PDF → Place PDF → `npm run prepare-notes` → Done.