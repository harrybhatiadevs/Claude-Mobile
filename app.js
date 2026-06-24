/*
 * app.js — Skill Tracker logic
 *
 * Stores progress in localStorage under STORAGE_KEY. The saved shape is:
 *   {
 *     version: 1,
 *     items: { "<itemId>": { status, notes, link } },
 *     ui:    { collapsed: { "<catId>": true } }
 *   }
 *
 * itemId is derived from category + item position in data.js, so progress
 * stays attached to the right task as long as the learning path order is kept.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "skillTracker.v1";

  // Status definitions in learning order. weight feeds the progress bars.
  const STATUSES = [
    { key: "NotStarted", label: "Not Started", weight: 0 },
    { key: "Learning", label: "Learning", weight: 0.34 },
    { key: "Practicing", label: "Practicing", weight: 0.67 },
    { key: "Confident", label: "Confident", weight: 1 }
  ];
  const statusLabel = (key) =>
    (STATUSES.find((s) => s.key === key) || STATUSES[0]).label;
  const statusWeight = (key) =>
    (STATUSES.find((s) => s.key === key) || STATUSES[0]).weight;

  const path = window.LEARNING_PATH || [];

  // ---- State -----------------------------------------------------------

  let state = loadState();

  function defaultState() {
    return { version: 1, items: {}, ui: { collapsed: {} } };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      if (!parsed.items) parsed.items = {};
      if (!parsed.ui) parsed.ui = { collapsed: {} };
      if (!parsed.ui.collapsed) parsed.ui.collapsed = {};
      return parsed;
    } catch (e) {
      console.warn("Could not load saved progress, starting fresh.", e);
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Could not save progress.", e);
      toast("Warning: progress could not be saved.");
    }
  }

  // Get (and lazily create) the record for an item.
  function rec(itemId) {
    if (!state.items[itemId]) {
      state.items[itemId] = { status: "NotStarted", notes: "", link: "" };
    }
    return state.items[itemId];
  }

  function catId(ci) {
    return "c" + ci;
  }
  function itemId(ci, ii) {
    return "c" + ci + "-i" + ii;
  }

  // ---- Progress helpers ------------------------------------------------

  function categoryProgress(ci) {
    const items = path[ci].items;
    if (!items.length) return { pct: 0, confident: 0, total: 0, weighted: 0 };
    let confident = 0;
    let weighted = 0;
    items.forEach((_, ii) => {
      const r = rec(itemId(ci, ii));
      weighted += statusWeight(r.status);
      if (r.status === "Confident") confident++;
    });
    return {
      pct: Math.round((weighted / items.length) * 100),
      confident,
      total: items.length,
      weighted
    };
  }

  function overallProgress() {
    let totalItems = 0;
    let weighted = 0;
    let confident = 0;
    path.forEach((cat, ci) => {
      cat.items.forEach((_, ii) => {
        totalItems++;
        const r = rec(itemId(ci, ii));
        weighted += statusWeight(r.status);
        if (r.status === "Confident") confident++;
      });
    });
    return {
      pct: totalItems ? Math.round((weighted / totalItems) * 100) : 0,
      confident,
      total: totalItems
    };
  }

  // First incomplete (not Confident) task in learning order. Skips the
  // recurring weekly category so it doesn't dominate recommendations.
  function findNextTasks(limit) {
    const out = [];
    for (let ci = 0; ci < path.length; ci++) {
      if (path[ci].type === "weekly") continue;
      const cat = path[ci];
      for (let ii = 0; ii < cat.items.length; ii++) {
        const r = rec(itemId(ci, ii));
        if (r.status !== "Confident") {
          out.push({ ci, ii, task: cat.items[ii].task, catName: cat.name });
          if (limit && out.length >= limit) return out;
        }
      }
    }
    return out;
  }

  // ---- Rendering -------------------------------------------------------

  const elCategories = document.getElementById("categories");

  function render() {
    elCategories.innerHTML = "";
    path.forEach((cat, ci) => elCategories.appendChild(renderCategory(cat, ci)));
    updateProgressUI();
    applySearch();
  }

  function renderCategory(cat, ci) {
    const wrap = document.createElement("section");
    wrap.className = "category";
    wrap.dataset.ci = ci;
    if (state.ui.collapsed[catId(ci)]) wrap.classList.add("collapsed");

    const prog = categoryProgress(ci);

    const header = document.createElement("div");
    header.className = "cat-header";
    header.innerHTML = `
      <span class="cat-caret">▾</span>
      <span class="cat-icon">${escapeHtml(cat.icon || "•")}</span>
      <div class="cat-title-wrap">
        <div class="cat-title">${escapeHtml(cat.name)}</div>
        <div class="cat-goal">${escapeHtml(cat.goal)}</div>
      </div>
      <div class="cat-progress-wrap">
        <div class="cat-progress-bar"><div class="cat-progress-fill" style="width:${prog.pct}%"></div></div>
        <span class="cat-pct">${prog.pct}%</span>
      </div>`;
    header.addEventListener("click", () => toggleCategory(ci, wrap));
    wrap.appendChild(header);

    const body = document.createElement("div");
    body.className = "cat-body";

    if (cat.type === "weekly") {
      const resetWrap = document.createElement("div");
      resetWrap.className = "weekly-reset";
      const btn = document.createElement("button");
      btn.className = "btn";
      btn.textContent = "Reset weekly checklist";
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        resetWeekly(ci);
      });
      resetWrap.appendChild(btn);
      body.appendChild(resetWrap);
    }

    cat.items.forEach((item, ii) => body.appendChild(renderItem(cat, ci, item, ii)));
    wrap.appendChild(body);
    return wrap;
  }

  function renderItem(cat, ci, item, ii) {
    const id = itemId(ci, ii);
    const r = rec(id);

    const el = document.createElement("div");
    el.className = "item";
    el.dataset.id = id;
    el.dataset.task = item.task.toLowerCase();
    if (r.status === "Confident") el.classList.add("done");

    // checkbox
    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "item-check";
    check.checked = r.status === "Confident";
    check.title = "Mark as Confident / done";
    check.addEventListener("change", () => {
      setStatus(id, check.checked ? "Confident" : "NotStarted");
    });

    // content
    const content = document.createElement("div");
    content.className = "item-content";

    const taskLine = document.createElement("div");
    taskLine.className = "item-task";
    taskLine.textContent = item.task;
    content.appendChild(taskLine);

    const tags = document.createElement("div");
    tags.className = "item-tags";
    tags.innerHTML = `
      <span class="badge diff-${item.difficulty}">${item.difficulty}</span>
      <span class="badge status-badge status-${r.status}" data-role="statusBadge">${statusLabel(r.status)}</span>`;
    const expandBtn = document.createElement("button");
    expandBtn.className = "btn-expand";
    expandBtn.textContent = hasDetails(r) ? "Notes ✎" : "Notes +";
    tags.appendChild(expandBtn);
    content.appendChild(tags);

    // details
    const details = document.createElement("div");
    details.className = "item-details collapsed";
    details.innerHTML = `
      <div class="detail-row">
        <div>
          <label class="field-label">Status</label>
          <select class="status-select" data-role="statusSelect"></select>
        </div>
        <div>
          <label class="field-label">Resource / link (optional)</label>
          <input type="url" class="text-input" data-role="link" placeholder="https://..." />
          <a class="resource-link" data-role="linkPreview" target="_blank" rel="noopener"></a>
        </div>
      </div>
      <div>
        <label class="field-label">Notes</label>
        <textarea class="text-input notes-input" data-role="notes" placeholder="What you learned, questions, links..."></textarea>
      </div>`;

    // populate status select
    const sel = details.querySelector('[data-role="statusSelect"]');
    STATUSES.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s.key;
      opt.textContent = s.label;
      if (s.key === r.status) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener("change", () => setStatus(id, sel.value));

    // notes
    const notes = details.querySelector('[data-role="notes"]');
    notes.value = r.notes || "";
    notes.addEventListener("input", () => {
      rec(id).notes = notes.value;
      debouncedSave();
    });

    // link
    const link = details.querySelector('[data-role="link"]');
    const linkPreview = details.querySelector('[data-role="linkPreview"]');
    link.value = r.link || "";
    updateLinkPreview(linkPreview, r.link);
    link.addEventListener("input", () => {
      rec(id).link = link.value.trim();
      updateLinkPreview(linkPreview, link.value.trim());
      expandBtn.textContent = hasDetails(rec(id)) ? "Notes ✎" : "Notes +";
      debouncedSave();
    });

    expandBtn.addEventListener("click", () => {
      details.classList.toggle("collapsed");
    });

    const main = document.createElement("div");
    main.className = "item-main";
    main.appendChild(check);
    main.appendChild(content);

    el.appendChild(main);
    el.appendChild(details);
    return el;
  }

  function updateLinkPreview(anchor, url) {
    if (url) {
      anchor.textContent = url;
      anchor.href = url;
      anchor.style.display = "inline-block";
    } else {
      anchor.textContent = "";
      anchor.removeAttribute("href");
      anchor.style.display = "none";
    }
  }

  function hasDetails(r) {
    return (r.notes && r.notes.trim()) || (r.link && r.link.trim());
  }

  // ---- Mutations -------------------------------------------------------

  function setStatus(id, status) {
    rec(id).status = status;
    saveState();
    refreshItem(id);
    updateProgressUI();
  }

  // Update a single item's visible bits without a full re-render.
  function refreshItem(id) {
    const el = elCategories.querySelector(`.item[data-id="${id}"]`);
    if (!el) return;
    const r = rec(id);
    el.classList.toggle("done", r.status === "Confident");

    const check = el.querySelector(".item-check");
    if (check) check.checked = r.status === "Confident";

    const badge = el.querySelector('[data-role="statusBadge"]');
    if (badge) {
      badge.className = "badge status-badge status-" + r.status;
      badge.textContent = statusLabel(r.status);
    }
    const sel = el.querySelector('[data-role="statusSelect"]');
    if (sel) sel.value = r.status;
  }

  // Circumference of the ring (r=52): 2 * pi * 52
  const RING_C = 2 * Math.PI * 52;

  function updateProgressUI() {
    const o = overallProgress();
    document.getElementById("overallPct").textContent = o.pct + "%";
    const ring = document.getElementById("ringFg");
    if (ring) {
      ring.style.strokeDasharray = RING_C.toFixed(1);
      ring.style.strokeDashoffset = (RING_C * (1 - o.pct / 100)).toFixed(1);
    }
    document.getElementById("overallMeta").textContent =
      `${o.confident} of ${o.total} tasks confident`;

    // per-category bars
    path.forEach((cat, ci) => {
      const wrap = elCategories.querySelector(`.category[data-ci="${ci}"]`);
      if (!wrap) return;
      const prog = categoryProgress(ci);
      const fill = wrap.querySelector(".cat-progress-fill");
      const pct = wrap.querySelector(".cat-pct");
      if (fill) fill.style.width = prog.pct + "%";
      if (pct) pct.textContent = prog.pct + "%";
    });

    updateNextTaskCard();
  }

  function updateNextTaskCard() {
    const next = findNextTasks(1);
    const txt = document.getElementById("nextTaskText");
    if (next.length) {
      txt.textContent = next[0].task;
    } else {
      txt.textContent = "Everything is marked Confident! 🎉";
    }
  }

  function toggleCategory(ci, wrap) {
    wrap.classList.toggle("collapsed");
    state.ui.collapsed[catId(ci)] = wrap.classList.contains("collapsed");
    saveState();
  }

  function resetWeekly(ci) {
    if (!confirm("Reset all weekly checklist items to Not Started?")) return;
    path[ci].items.forEach((_, ii) => {
      rec(itemId(ci, ii)).status = "NotStarted";
    });
    saveState();
    render();
    toast("Weekly checklist reset.");
  }

  // ---- Controls --------------------------------------------------------

  function whatNext() {
    const next = findNextTasks(1);
    const card = document.getElementById("nextTaskCard");
    if (!next.length) {
      toast("No incomplete tasks — you're done!");
      return;
    }
    const { ci } = next[0];
    // expand the category and scroll the item into view
    const wrap = elCategories.querySelector(`.category[data-ci="${ci}"]`);
    if (wrap && wrap.classList.contains("collapsed")) toggleCategory(ci, wrap);
    const el = elCategories.querySelector(`.item[data-id="${itemId(next[0].ci, next[0].ii)}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.style.transition = "background 0.4s";
      el.style.background = "var(--accent-soft)";
      setTimeout(() => (el.style.background = ""), 1200);
    }
    card.classList.remove("flash");
    void card.offsetWidth; // restart animation
    card.classList.add("flash");
  }

  let focusOn = false;
  function toggleFocus() {
    focusOn = !focusOn;
    document.body.classList.toggle("focus-mode", focusOn);
    document.getElementById("btnFocus").classList.toggle("active", focusOn);

    // clear previous focus markers
    elCategories.querySelectorAll(".focus-visible").forEach((e) => e.classList.remove("focus-visible"));
    elCategories.querySelectorAll(".focus-item").forEach((e) => e.classList.remove("focus-item"));

    if (focusOn) {
      const next = findNextTasks(3);
      if (!next.length) {
        toast("Nothing left to focus on — all done!");
        focusOn = false;
        document.body.classList.remove("focus-mode");
        document.getElementById("btnFocus").classList.remove("active");
        return;
      }
      next.forEach((n) => {
        const wrap = elCategories.querySelector(`.category[data-ci="${n.ci}"]`);
        if (wrap) wrap.classList.add("focus-visible");
        const el = elCategories.querySelector(`.item[data-id="${itemId(n.ci, n.ii)}"]`);
        if (el) el.classList.add("focus-item");
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function exportProgress() {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `skill-tracker-progress-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast("Progress exported.");
  }

  function importProgress(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed || typeof parsed !== "object" || !parsed.items) {
          throw new Error("Not a valid progress file.");
        }
        if (!confirm("Importing will replace your current progress. Continue?")) return;
        state = {
          version: 1,
          items: parsed.items || {},
          ui: parsed.ui && parsed.ui.collapsed ? parsed.ui : { collapsed: {} }
        };
        saveState();
        render();
        toast("Progress imported.");
      } catch (e) {
        alert("Could not import file: " + e.message);
      }
    };
    reader.readAsText(file);
  }

  function resetAll() {
    if (!confirm("Reset ALL progress, notes and links? This cannot be undone.")) return;
    state = defaultState();
    saveState();
    render();
    toast("Everything reset.");
  }

  // ---- Search ----------------------------------------------------------

  function applySearch() {
    const q = (document.getElementById("searchInput").value || "").trim().toLowerCase();
    elCategories.querySelectorAll(".item").forEach((el) => {
      const match = !q || el.dataset.task.includes(q);
      el.classList.toggle("hidden", !match);
    });
    // when searching, expand categories that have matches
    if (q) {
      elCategories.querySelectorAll(".category").forEach((wrap) => {
        const anyVisible = wrap.querySelector(".item:not(.hidden)");
        wrap.classList.toggle("collapsed", !anyVisible);
      });
    } else {
      // restore saved collapse state
      path.forEach((_, ci) => {
        const wrap = elCategories.querySelector(`.category[data-ci="${ci}"]`);
        if (wrap) wrap.classList.toggle("collapsed", !!state.ui.collapsed[catId(ci)]);
      });
    }
  }

  // ---- Utilities -------------------------------------------------------

  let saveTimer = null;
  function debouncedSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 400);
  }

  let toastTimer = null;
  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.hidden = true), 2200);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ---- Focus banner injection -----------------------------------------

  function injectFocusBanner() {
    const banner = document.createElement("div");
    banner.className = "focus-banner";
    banner.innerHTML = `<span>Focus Mode — showing your next 3 tasks.</span>`;
    const exit = document.createElement("button");
    exit.className = "btn";
    exit.textContent = "Exit Focus";
    exit.addEventListener("click", toggleFocus);
    banner.appendChild(exit);
    elCategories.parentNode.insertBefore(banner, elCategories);
  }

  // ---- Wire up ---------------------------------------------------------

  function init() {
    if (!path.length) {
      elCategories.innerHTML = "<p>Could not load learning path (data.js missing).</p>";
      return;
    }
    injectFocusBanner();
    render();

    document.getElementById("btnNext").addEventListener("click", whatNext);
    document.getElementById("btnFocus").addEventListener("click", toggleFocus);
    document.getElementById("btnExport").addEventListener("click", exportProgress);
    document.getElementById("btnReset").addEventListener("click", resetAll);

    const importFile = document.getElementById("importFile");
    document.getElementById("btnImport").addEventListener("click", () => importFile.click());
    importFile.addEventListener("change", () => {
      if (importFile.files && importFile.files[0]) importProgress(importFile.files[0]);
      importFile.value = "";
    });

    const search = document.getElementById("searchInput");
    search.addEventListener("input", applySearch);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
