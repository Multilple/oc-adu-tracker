# Ship Backyard Fit (Santa Ana) for the 2:30 PM submission: live map, template README, video, form

**Date:** 2026-11-07
**Status:** PLANNED
**Bead(s):** none
**Epic:** UCI Claude Impact Lab: Affordable Housing, Lane 2 "Clear it"
**Chain:** `standalone-3dfcb2ca` seq `1` (copied from the paired handoff)
**Context:** See `HANDOFF_santa-ana-backyard-fit_2026-11-07.md` for session data, test results and prior approaches.

---

## Problem Statement

The demo is built and tested, but nothing is submitted yet. The deadline is **2:30 PM Pacific**, with about 2.5 h left at handoff.

Four things stand between the demo and a valid, competitive entry:
1. **No real satellite map yet.** It needs a normal host, and GitHub Pages is not enabled.
2. **The README doesn't follow** `templates/TEAM-README.md`.
3. **No demo video.**
4. **No submitted form.**

The judging rubric weights "Works on real data with sources shown" equally with Impact, Scale and Innovation. Finalists must show a live demo at 3:00 PM. See Evidence & Data in the handoff for the rubric, the 34-city data and the test baseline.

## Key Findings

- Satellite tiles are blocked in the claude.ai artifact and work on a normal host. → drives Phase 1 (GitHub Pages)
- Only 9 of 34 OC cities post usable plans; Santa Ana has 10. This is the headline number. → drives Phases 3 and 4
- Only 2 Santa Ana sizes are confirmed (399, 677). Everything else is labeled. → keep as is; document in Phase 3 "real vs mocked"
- Judges reward a real, public OC lot and one named user with a before and after. → drives Phase 2
- Submission rules: public repo, main branch pushed by 2:30, a "Try it" section with exact commands, pinned versions, no personal info, every made-up number labeled ASSUMPTION. → drives Phase 3
- `npm test` passes at the handoff commit. Use it as the regression gate after any edit. → all phases

## Anti-Goals (What NOT To Do)

- **No new features or more cities.** Billy explicitly wanted one city and "one small thing executed". The 34-city flow (`full.html`) stays as the vision only.
- **Don't invent plan sizes or footprints** for the 7 "Size not listed" plans.
- **Don't use a private person's home address,** voter rolls or owner names anywhere: page, video, README or the search box on stage.
- **Don't scrape santa-ana.gov** or hammer Nominatim. One search per click is fine.
- **Don't flip repo settings or submit forms on Billy's behalf** without his explicit OK in chat.

## Plan

### Phase 1: Live satellite version on GitHub Pages (15 min)

**Goal:** `https://multilple.github.io/oc-adu-tracker/` serves `index.html` with real Esri imagery.

**Why this approach:** The artifact CSP blocks tiles (handoff, Errors table), and Pages is free, fast and already the target of the page's "Open the live map version" button.

- Billy enables it: repo → Settings → Pages → Build and deployment → Source "Deploy from a branch" → Branch `main`, folder `/ (root)` → Save. Or he approves Claude doing it in his browser.
- Wait about 1 minute, then open the URL. Expect the Step 1 grid with 10 thumbnails.
- Click "Satellite map". Expect imagery to load and no "Satellite tiles can't load" overlay.
- Search an intersection (for example "Bristol St & 1st St"), zoom to 19-20, and run Trace the lot → 4 clicks → Finish → Trace the house → Finish.
- Drag the ADU near a lot line and confirm it turns red with "Only X ft". Move it back and confirm green.
- If tiles fail on Pages too, check the browser console for mixed content or CSP. The Esri URL is https, so that should not happen. Fallback: open `index.html` locally while online.
- Optional, 2 min: add the Pages URL to the README top and the repo About field.

**Files:** none (repo setting). Optionally `README.md`.
**Validates with:** the Pages URL loads tiles; manual trace and check matches the expectations in the handoff's test table.
**Rollback:** disable Pages; present the sample yard.

### Phase 2: Pick the public demo lot and set the default view (15 min)

**Goal:** One real, public Santa Ana lot to show on stage and in the video, opened in one click.

**Why this approach:** "What helps" in `docs/judging.md`: a tool working on a real, public case in OC. Real imagery plus a privacy-safe lot covers Works and the ground rules.

- Billy picks the lot. Good options:
  - a vacant or for-sale lot from a public listing,
  - a city-owned parcel,
  - a generic block shown without naming any address.
- Get its approximate lat/lng (from the map, by clicking).
- Optional code change in `src/santa-ana.html`: support `?lat=..&lng=..&z=..` URL parameters in `initMap()`:
  - Before: `setView([33.7455,-117.8677],17)`.
  - After: read `new URLSearchParams(location.search)`, use the parameters if valid numbers, else the default.
  - Keep the default unchanged.
- Do not put any owner name or street address in the page text.
- Rebuild (`npm run build`), run `npm test`, commit, push. Pages redeploys automatically.
- Practice the trace on that lot twice; note how many clicks it takes.

**Files:** `src/santa-ana.html` (optional URL parameters), `index.html` (rebuilt).
**Validates with:** `npm test` still passes; `.../oc-adu-tracker/?lat=…&lng=…&z=19` opens on the lot.
**Rollback:** `git revert` the commit; search the intersection by hand on stage.

### Phase 3: README to the event template (30 min)

**Goal:** A judge who isn't on the team can understand it, see sources and assumptions, and run it.

**Why this approach:** Required by `docs/submission.md` repo rules 4, 6 and 7 and the "Before you submit" checklist.

Restructure `README.md` using the headings in `templates/TEAM-README.md` (read that file from the challenge repo first):

- **Title plus one-liner:** "Backyard Fit: see in 30 seconds if one of Santa Ana's free pre-approved ADU designs fits your backyard."
- **The real user:** a Santa Ana homeowner (and a nonprofit PM), with a before and after taken from the handoff's Demo Script Notes.
- **What we built:** 3 steps (pick, place, result) and the 30-day box. Note that `full.html` holds the 34-city vision.
- **How Claude is used:**
  - Claude researched all 34 cities, built and tested the page, and ran a Chrome walkthrough.
  - At runtime the tool calls no AI. A person checks the plan sheet and city rules.
- **Try it:**
  - Live URL.
  - Or `git clone …`, then open `index.html` in a browser (no install).
  - To rebuild and test: Python 3 and Node 18+, then `npm install && npm run build && npm test`.
- **Sources and assumptions:**
  - The law table and the Santa Ana page, from the handoff's Evidence.
  - ASSUMPTION list: footprint shapes (16×25, 21×32, 20×30, 24×30), $3,000 per month carrying cost, the made-up sample lot 50×110 with house 36×45, and 364,000 ft per degree.
- **Real vs mocked:**
  - Real: plans, sizes shown, imagery, law, 34-city data.
  - Mocked: sample lot, footprint shapes, carrying cost.
- **Where it gets things wrong:** traced lines are by eye; front setback, easements, utilities, flood and historic district are not checked; mouse only; concave lots get no setback line.
- **Next steps:** the other 8 cities with plans; reading real footprints from plan sheets; a city-side compliance view.
- **Data and privacy:** no personal data; streets or intersections only; nothing sent to the city.
- **License:** MIT.
- Keep it short. Avoid em dashes (Billy's preference).

**Files:** `README.md`.
**Validates with:** open the repo in a private window signed out: README renders, links work, and the checklist in `docs/submission.md` is all ticked.
**Rollback:** `git checkout HEAD~1 -- README.md`.

### Phase 4: 30-second demo video (30 min)

**Goal:** An MP4 or MOV of 2 minutes or less (aim for 30 s): one user, one problem, the tool working, the result.

**Why this approach:** Required by the submission. "Made with Claude's help" is satisfied by the script plus the Claude-built demo.

- **Script** (about 70 words), from the beats in the handoff's Demo Script Notes:
  1. Headline number.
  2. Pick the Craftsman.
  3. Satellite lot.
  4. Red at 3.5 ft.
  5. Green.
  6. 30 days, about $2,961 (assumption).
  7. Sources on screen.
- **Record** with macOS Cmd+Shift+5 (or any recorder) on the Pages URL at 100% zoom. Use the Phase 2 lot.
- **Trim** to under 45 s.
- **Upload** the file on the form. If the upload struggles, use YouTube unlisted or Drive with link sharing, checked signed out.

**Files:** none in the repo (keep the video out of git; it's big).
**Validates with:** watch once end to end; the link opens signed out.
**Rollback:** re-record; fallback is a screen recording of the sample yard only.

### Phase 5: Submit and prep the finalist demo (by 2:20 PM)

**Goal:** Form submitted with margin; the live demo is rehearsed.

- Run `npm test`, then `git status` (clean), then `git push`. Confirm `main` on GitHub has the latest commit before 2:30.
- Form at `https://claudesocal.com/uci-impact-lab#submit`, filled from the README:
  - Lane 2.
  - One-liner.
  - User before and after.
  - What it does.
  - Sources and assumptions.
  - Repo main-page URL.
  - Video.
  - Live demo URL (Pages).
- **Finalist prep for 3:00:**
  - Tabs ready: Pages URL, sample-yard fallback, repo.
  - A one-line answer on CrossBeam: "it checks plan sets for cities; we answer the homeowner's first question and show compliance."
  - Say "not legal advice".

**Validates with:** the form shows submitted; the repo opens signed out.
**Rollback:** the form can be updated until 2:30. Judges see the latest version.

## Dependencies & Order

- Phase 1 comes before Phases 2 and 4: the video needs real imagery.
- Phase 3 can run in parallel with Phases 1 and 2. It's README only, so no conflicts.
- Phase 4 depends on Phases 1 and 2. Phase 5 depends on 3 and 4.
- Hard stop: start Phase 5 by 2:05 PM whatever state the others are in.

## Risks & Mitigations

- **Pages slow or broken (low risk).** Present `index.html` from a local file online, or use the sample yard.
- **Trace looks clumsy on stage (medium risk).** Rehearse twice on the Phase 2 lot. The sample yard is a one-click backup.
- **Running out of time (medium risk).** Phase 2's URL-parameter code is optional; skip it first. Then shorten the README sections.
- **A judge asks where the sizes come from (likely).** Point at the "Size not listed" and ASSUMED labels, then the footer source.
- **Nominatim fails during the live demo (low risk).** Pan the map by hand, or use the URL parameters from Phase 2.

## Success Criteria

- **Minimum:** form submitted before 2:30 with a public repo URL, a template README and a video. `npm test` passes (10 plans, the checks match the handoff baseline).
- **Full:**
  - Pages URL live with satellite imagery on a public Santa Ana lot.
  - A video of 45 s or less showing red then green.
  - Every ASSUMPTION labeled in both the page and the README.
  - Finalist demo rehearsed.

## Quick Start

```bash
# Restore full context
git clone https://github.com/Multilple/oc-adu-tracker && cd oc-adu-tracker
cat plans/handoffs/HANDOFF_santa-ana-backyard-fit_2026-11-07.md

# Key source files
src/santa-ana.html   build.py   README.md   tests/*.js

# Challenge rules (separate repo)
git clone https://github.com/travcjohnson/claude-impact-lab-uci ../challenge
cat ../challenge/docs/submission.md ../challenge/templates/TEAM-README.md

# Verify starting state
npm install && npm run build && npm test

# First concrete action
# Ask Billy to enable GitHub Pages (Settings → Pages → main / root),
# then open https://multilple.github.io/oc-adu-tracker/ and confirm tiles load.
```
