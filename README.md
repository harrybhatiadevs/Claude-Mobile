# Skill Tracker

A clean, dark-themed, **local** checklist app that maps your path from
soon-to-graduate CS student to employable Software / Backend / Cloud / DevOps /
AI engineer. It tells you what to learn first → last, lets you tick off
progress, and shows what to focus on next.

No backend, no build step, no dependencies. Just static HTML/CSS/JavaScript.
Progress is saved automatically in your browser via `localStorage`.

## Features

- **10 ordered categories** with 206 skills/tasks, in a fixed learn-first → last order:
  1. Coding Fundamentals
  2. SQL and Databases
  3. Backend Engineering
  4. Full-Stack Development
  5. Cloud and Deployment
  6. DevOps and Platform Skills
  7. Practical AI Engineering
  8. Portfolio Projects (3 projects, broken into required features)
  9. Interview Preparation
  10. Weekly Discipline Tracker (recurring, with a per-week reset button)
- **Collapsible category sections**, each with its own progress bar.
- **Overall progress** percentage and bar across everything.
- **Status per task** — *Not Started → Learning → Practicing → Confident* —
  via a checkbox (quick "done") and a status dropdown. Progress bars are
  weighted so partial learning still moves the needle.
- **Difficulty badges** — Beginner / Intermediate / Advanced.
- **Notes** and an optional **resource/link** field for every task.
- **"What should I do next?"** — jumps to and highlights the first incomplete
  task in the recommended order.
- **Focus Mode** — hides everything except your next 3 incomplete tasks.
- **Search** — filter tasks by keyword.
- **Export / Import** progress as JSON (good for backups or moving devices).
- **Reset** — wipe all progress, notes, and links.

## How to run it locally

You only need a browser. There are two easy options.

### Option A — just open the file
Double-click `index.html`, or open it in your browser:

```
file:///path/to/Claude-Mobile/index.html
```

This works for everything (import/export included) in modern browsers.

### Option B — run a tiny local server (recommended)
Some browsers are stricter with `file://`. Serving the folder avoids any edge
cases and is the closest to "running on your phone over your home network".

From the project folder:

```bash
# Python 3 (already installed on most machines)
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

To use it on your **phone**, make sure the phone is on the same Wi-Fi, find
your laptop's local IP (e.g. `192.168.1.20`), and visit
`http://192.168.1.20:8000` on the phone. Progress on the phone is stored in the
phone's browser; use Export/Import to move progress between devices.

> Node alternative: `npx serve` (or any static file server) works too.

## Using it day-to-day

- Tick the **checkbox** when you're confident with a task, or open **Notes**
  (the button on each task) to set a finer status, jot notes, and paste a
  resource link.
- Hit **What should I do next?** whenever you're unsure — it always points to
  the next thing in the recommended order.
- Turn on **Focus Mode** when you just want today's next 3 tasks and nothing else.
- Every Monday, scroll to **Weekly Discipline Tracker** and hit
  **Reset weekly checklist** to start the week fresh.
- **Export** every so often to back up your progress to a JSON file.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure |
| `styles.css` | Dark theme and layout |
| `data.js` | The full learning path (categories, tasks, difficulty). Edit here to add tasks. |
| `app.js` | App logic: rendering, progress, status, focus, export/import |

### Customising the learning path
Open `data.js` and add/edit items. Keep the existing order where you can — the
"next task" and "Focus Mode" features follow it top-to-bottom. Saved progress is
keyed by each task's position, so inserting items in the middle will shift the
saved status of items below it; adding to the end of a category is safest.
