# 📱 Using the Skill Tracker on your iPhone

The whole app is a single self-contained file: **`index.html`**. It has all the
HTML, CSS, and JavaScript inlined — no Node, npm, Vite, React dev server,
localhost, or backend required to *use* it. Your progress is saved in the
browser with `localStorage`.

There are two ways to run it on your phone. **GitHub Pages is recommended.**

---

## ✅ Recommended: GitHub Pages (stable URL, reliable saving)

A stable `https://` URL is the most reliable way to use it on iPhone, because
Safari keeps `localStorage` tied to that URL — so your progress survives
closing and reopening the page.

### Steps

1. **Push the files to GitHub** (already done if you're reading this in the repo).
   The important file, `index.html`, is at the repository root.

2. On GitHub, open your repository and click **Settings** (top tab).

3. In the left sidebar, click **Pages**.

4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
   Then set:
   - **Branch:** `main` *(recommended)* — or the branch that has these files,
     e.g. `claude/skill-tracking-checklist-gcxttl`.
   - **Folder:** `/ (root)`
   - Click **Save**.

   > Tip: if the files are currently only on the feature branch, merge them into
   > `main` first so you can point Pages at `main`. Pages can serve any branch,
   > but `main` is the simplest to remember.

5. Wait about 1 minute. GitHub will show a green banner with your live URL.
   It will look like:

   ```
   https://harrybhatiadevs.github.io/Claude-Mobile/
   ```

   Because `index.html` is at the root, that bare URL opens the tracker. (The
   exact URL is shown on the Pages settings screen — copy it from there.)

6. **Open that URL in Safari on your iPhone.** Tick tasks, set status, add notes
   — it all saves automatically on your phone.

7. *(Optional, makes it feel like an app)* In Safari, tap the **Share** button
   (square with an arrow) → **Add to Home Screen** → **Add**. Now "Skill
   Tracker" launches full-screen from your home screen, with no browser bars.

### Updating later
Whenever you change the app, run `node build.js` to rebuild `index.html`, commit,
and push. GitHub Pages redeploys automatically within a minute. Your saved
progress is unaffected (it lives in the browser, not the file).

---

## 🟡 Fallback: open the single `index.html` file directly

If you don't want to use GitHub Pages, you can open `index.html` straight from
the phone, but it's a little fiddlier on iOS:

1. Get `index.html` onto the phone — AirDrop it, email it to yourself, or save
   it from a chat. **Save it into the Files app** (e.g. "On My iPhone" or
   iCloud Drive), not just Downloads.
2. Open the **Files** app, tap `index.html`. It opens in an in-app viewer.

### Limitations of local-file mode on iPhone (please read)
- **iOS Safari won't open arbitrary `file://` pages directly** from the address
  bar, which is why you go through the **Files** app.
- Opening from Files sometimes uses a temporary/sandboxed location, so
  `localStorage` **may not persist reliably** between opens — your ticks could
  reset. If you notice progress not saving, that's why.
- **Add to Home Screen** is not available for local files.

Because of this, **GitHub Pages is the better option**: under a stable
`https://` URL, `localStorage` persists reliably and you get the home-screen
app experience. Use local-file mode only as a quick, temporary preview.

> Safety net regardless of mode: use the in-app **Export** button now and then to
> download a JSON backup of your progress, and **Import** it back if needed
> (handy for moving progress between your laptop and phone).

---

## Quick reference

| Question | Answer |
| --- | --- |
| Which file do I open? | **`index.html`** (it's fully self-contained) |
| Do I need to run any commands to use it? | **No.** Just open the URL/file. |
| Do I need Node/npm? | Only to *rebuild* `index.html` (`node build.js`), never to use it. |
| Where is my progress stored? | In the browser via `localStorage`, per device. |
| Best way on iPhone? | GitHub Pages URL + Add to Home Screen. |
