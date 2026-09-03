# PC Notes — Answer PDFs

Each question in **PC Notes** opens a PDF answer that you create in Microsoft
Word and export as a PDF. The website keeps your exact formatting — Times New
Roman, bold headings, tables, images, diagrams, formulas, numbered and bulleted
points, and page layout. Nothing is converted to Markdown or plain text.

---

## 1. Making the PDF (Microsoft Word → PDF)

1. Write the complete answer in **Microsoft Word** with all your formatting
   (headings, tables, images, formulas, numbering, etc.).
2. Go to **File → Save As** (or **Export**) and choose **PDF (*.pdf)**.
3. Name it after the question id, e.g. `simd.pdf`.

> Tip: keep margins, fonts and diagrams the way you want them — the student
> sees exactly what you export.

---

## 2. Where to place the PDF

Put the PDF inside the correct module folder under
`client/public/notes/pc/`:

| Module | Folder |
|--------|--------|
| Module 1 | `public/notes/pc/module-1/` |
| Module 2 | `public/notes/pc/module-2/` |
| Module 3 | `public/notes/pc/module-3/` |
| Module 4 | `public/notes/pc/module-4/` |
| Module 5 | `public/notes/pc/module-5/` |

Files in `public/` are served from the web root, so a file at
`public/notes/pc/module-1/simd.pdf` is reached at the URL
`/notes/pc/module-1/simd.pdf`.

---

## 3. Adding a question

Open `client/src/data/pcNotes.ts` and push a question into a module's
`questions` array:

```ts
{
  id: 'simd',                                     // unique id
  question: 'Explain SIMD systems',               // shown in the list
  answerFile: '/notes/pc/module-1/simd.pdf',      // path to the PDF
  description: 'Short optional summary.',         // optional
  readingTime: '5 min',                           // optional
  tags: ['Architecture', 'Parallel Computing'],   // optional
}
```

The question appears automatically — just add the PDF to the matching folder.

---

## 4. Adding a new module

In the same file, add another `NoteModule` to `pcNotesModules`:

```ts
{
  id: 'module-6',
  number: 6,
  title: 'Module 6',
  subtitle: 'Short description.',
  questions: [],   // or add questions here
}
```

Create the matching folder `public/notes/pc/module-6/` for its PDFs.

---

## 5. Updating an answer PDF

Just export the new version from Word and **overwrite the existing PDF file**
in `public/notes/pc/<module>/`. No code changes needed — the student will see
the updated answer immediately.

---

## 6. Missing PDFs

If a question's PDF is missing, the viewer shows a friendly "Answer PDF not
found" state with the expected path, so the rest of the site keeps working.
