# Santa Ana "Backyard Fit" ADU demo for the UCI Claude Impact Lab hackathon: moving from the claude.ai app to Claude Code CLI

**Date:** 2026-11-07 (Saturday, Pacific time)
**Written at:** 11:55 AM PST. Submissions close at 2:30 PM PST, so about 2h35m remained at handoff.
**Status:** IN PROGRESS
**Bead(s):** none (bd not installed in the app workspace)
**Epic:** UCI Claude Impact Lab: Affordable Housing, Lane 2 "Clear it"
**Chain:** `standalone-3dfcb2ca` seq `1`
**Parent:** `none - first in chain`
**Prior chain:** none - first in chain

---

## Reference Documents

- `README.md` (repo root): project pitch, Demo section, data rules. Needs to be restructured to the event's TEAM-README template before 2:30 (see Where We're Going).
- Challenge repo `travcjohnson/claude-impact-lab-uci` (public on GitHub). Key files:
  - `docs/submission.md`: what to submit and the repo rules judges check.
  - `docs/judging.md`: the four scoring areas.
  - `docs/ground-rules.md`: no personal info, light scraping, label assumptions.
  - `templates/TEAM-README.md`: required README structure.
  - `lanes/2-clear-it/`: lane brief and data sources.
- claude.ai Project "uci" has two docs: "Live project transcription" (kickoff talk transcript) and "mike convo" (Billy's recorded conversation with Mike). These live in claude.ai, not on disk. The CLI session cannot read them unless Billy pastes them in.

## The Goal

Billy Martinez is a Chapman finance freshman who knows Python. He is competing at the UCI Claude Impact Lab: Affordable Housing hackathon, Lane 2 "Clear it", which is about speeding up permits and approvals.

The project is **Backyard Fit**: a homeowner picks one of their city's free, state-required pre-approved ADU designs and drops it into their backyard, then sees right away whether it clears the basic setback and house-overlap checks.

The case for it:
- Pre-approved plans get a 30-day city decision clock instead of 60 (AB 1332).
- Only 9 of Orange County's 34 cities post usable plans of their own.

Billy deliberately narrowed it to **one city (Santa Ana)**. He said the demo "doesnt need to be god level advanced.. it just needs to show one small thing can be executed."

End state by 2:30 PM:
- The public repo follows the event's README template.
- A live demo URL that shows real satellite imagery (GitHub Pages).
- A 30-second demo video.
- A submitted form.

He is moving this work from the claude.ai app to Claude Code CLI on his own laptop.

## Where We Are

**Repo:** `https://github.com/Multilple/oc-adu-tracker`. Public, MIT license, branch `main`, HEAD `3292127` at handoff (plus this session's handoff commit).

**`index.html`** is the presentation demo, about 254 KB with Leaflet and thumbnails inlined. It is built from `src/santa-ana.html` by `build.py`.
- **Step 1, plan picker.** All 10 Santa Ana plans with thumbnail images, grouped Studio (3), 1 Bedroom (6), 2 Bedroom (1), all on one row on desktop.
  - Sizes are shown only where the city lists them: studios 399 sq ft and the JGA Craftsman 677 sq ft. The other 7 show "Size not listed."
  - Every footprint shape is labeled ASSUMED.
  - A "Have the plan sheet? Enter its real footprint" input with a "Use this size" button.
- **Step 2, two tabs.**
  - "Sample yard": a pure SVG yard. Made-up 50 × 110 ft lot, 36 × 45 ft house, 5 ft grid. The ADU is draggable, with Rotate 90° and Reset.
  - "Satellite map": Leaflet 1.9.4 with Esri World Imagery and a Nominatim search box (appends ", Santa Ana, CA").
    - Trace the lot by clicking corners, then Finish shape. Then trace the house (optional).
    - Drag the ADU polygon. A "Turn" slider runs 0-179°.
    - A dashed 4 ft setback line is drawn inside the traced lot when the lot is convex.
- **Step 3, result.** A green "✓ Fits our basic checks", red "✗ Doesn't fit yet", or grey "Not ready yet" banner with reasons.
  - Lists what is checked and what is not (front setback, easements, utilities, flood zone, historic district).
- **"Why it matters" box.** "30 days", an editable monthly carrying cost (default $3000, labeled ASSUMPTION), and "≈ $2,961 less spent waiting."
- **Footer** cites the Santa Ana plans page, AB 1332 (SANDAG summary), state ADU law in the HCD Handbook, Esri imagery, and the 9-of-34 data.

**Fallback.** In sandboxed previews (claude.ai artifacts) Esri tiles are blocked. After 3 tile errors with 0 successes, an overlay appears:
- "Satellite tiles can't load in this preview."
- An "Open the live map version" button linking to `https://multilple.github.io/oc-adu-tracker/`.
- A "Use the sample yard" button.
- Verified visually in Chrome. Button styling was fixed in `3292127`.

**`full.html`** is the older, bigger 3-screen prototype (City / Design / Yard) covering all 34 cities. It is built from `src/app.html` and kept as a "vision" artifact, not the demo.

**`data/preapproved-adu.json`** holds all 34 OC cities, checked 2026-11-07, plus `about`, `law`, `status_key` and `county_unincorporated` (6 plans).

**`assets/thumbs.json`** maps 10 keys to 240×136 JPEG data URIs. They were cropped from Billy's screenshot of Santa Ana's plan page. The matching `assets/*.jpg` files are committed too.

**Tests.** `tests/ui.test.js` and `tests/map-geometry.test.js` were added in this handoff commit, along with `package.json` (jsdom 24.1.3 pinned) and a `.gitignore` entry for `node_modules/`. `npm test` passes; output is in the Evidence section.

**Artifacts on claude.ai:**
- Santa Ana demo: `https://claude.ai/artifact/18N3ULRyeDPZtz8LXyH1VP`, slug `01072ca2-be07-4f80-a842-ddc2b007446e`, version `1794081282-3f16`, private (read: owner). Updated live; Billy authorized live updates.
- Old full demo: `https://claude.ai/artifact/3KapQfnD6BcNp23nY7EXMd`, slug `12ca8181-6fe7-4097-8307-65be4b5810ec`, version `1794079856-39bb`. Billy made it PUBLIC. Titled "Backyard Fit: OC pre-approved ADU planner". Not updated since the Santa Ana pivot.

**GitHub Pages is NOT enabled yet.** The live map link 404s until Billy enables Settings → Pages → Deploy from branch `main` / root. This is the top blocker for showing real map data on stage.

**Not done yet:**
- README in the template format.
- Demo video.
- Submission form.
- No real public case lot has been picked for the satellite demo.

**Skills.** handoff and handoffplan were installed via the propose_skills card and are now listed as available. be-ambitious was installed earlier the same way. The claude-handoff repo's `hooks/precompact-handoff.sh` and `mods/compact-handoff*` were NOT installed; they are Claude Code features. Billy can install them in the CLI from `https://github.com/REMvisual/claude-handoff` if he wants.

## What We Tried (Chronological)

1. **Kickoff analysis.** I read the "Live project transcription" project doc and the challenge repo `lanes/`. Lane 2 "Clear it" matched Billy's long-held idea of speeding up permits.
2. **"Mike already did this, should that discourage us?"** Mike's company, CrossBeam, does ADU plan pre-check and has won before.
   - Conclusion: no. CrossBeam checks plan sets for cities. We aim at the homeowner's first question ("will a free plan fit my yard?") and at city compliance with AB 1332.
   - Buena Park already offers free CrossBeam Plan PreCheck, which shows the space is real but not owned end to end.
3. **Questions for Mike.** I separated what's answerable from his public site from what's worth asking him in person. Billy recorded the talk (with Mike's permission) and the transcript became the "mike convo" project doc.
4. **Mike's suggestion.** Pick one jurisdiction, list its pre-approved plan footprints, trace the lot on a satellite map, drag the footprint with red/green inside a 4 ft buffer, and export a site plan PDF.
   - Mike also floated using voter rolls to find homeowners. **Flagged and rejected:** it violates the event's no-personal-information ground rule.
5. **Judge research (be-ambitious).** Judges: Ed Coulson, Michael Imerman, Noah Samuels (Habitat LA), Jason Bigman (Anthropic), Travis Johnson (organizer, owns the challenge repo).
   - Detailed findings were in pre-compaction context and are not reproduced here.
   - Takeaway that shaped the build: the rubric rewards "Works on real data with sources shown" and "a believable path to the next 100", and Habitat LA wants a tool a nonprofit could use next month.
6. **Lane choice plus LLM council.** Lane 2 was confirmed as the best fit. The council pressure-tested it, and the result was the city-compliance plus homeowner-fit angle.
7. **34-city sweep, first pass.** Web search for each OC city's pre-approved ADU program, saved in `data/preapproved-adu.json` (commit `173a7ea`).
   - Problem: about 14 cities came back not_found.
8. **Second pass.** Site-restricted searches for the 14 not-found cities (`124ae1d`). Final counts are in Evidence.
9. **Competitor check.** `adu-plan-finder.pages.dev` shows 0 plans for Laguna Hills, Laguna Niguel and Westminster, which do have plans. It doesn't track compliance or cost of delay. That's our differentiation.
10. **Explanations for Billy.** "Like I'm 12", a team pitch, guardrails, and how it works. All in chat; none saved to files.
11. **Full demo v1** (`ddf56ed`): `src/app.html` → `index.html`.
    - 3 screens: city status, design picker, and yard fit with Leaflet tracing, Nominatim lookup, and a draft site plan SVG with download.
    - Stats bug: borrowed plans were counted as "usable" (11 vs 9). Fixed in `a06fa86` by counting own and borrowed separately.
12. **Claude in Chrome walkthrough** for polish. Fixed:
    - Scroll wheel zoomed the map (now `scrollWheelZoom:false`).
    - Lot outline was hard to see (now a dark outline plus inset setback line).
    - "Studio bed" wording.
    - Status before tracing was unclear (added "Not ready yet").
    - Yard was too tall for one screen.
    - "orange box" wording when the box is green or red.
    - Plus: hero number, 4-column stats, scrollIntoView on city pick, street tooltip, and the download button hidden inside iframes.
13. **Billy pushback:** "im not a fan of how cimplicated it is now.. i thinkk we strat with one city."
    - Built a single-screen Santa Ana demo (`2493196`): pure SVG, 2 plans (Studio 399, Craftsman 677), sample yard.
    - Moved the old page to `full.html`. Published as a NEW private artifact, because republishing the public one was blocked (see Errors).
14. **Billy, with a screenshot:** "you can update thsi page live.. rule was only for the math ones.. santa anas site is buns and doesnt wanna let me download. also implement actual map data not just blank canvas."
    - Cropped 10 thumbnails from the screenshot into `assets/thumbs.json`.
15. **Interrupted** by "install this: https://github.com/REMvisual/claude-handoff".
    - Cloned it, read the SKILL.md files and 4 reference files, and folded the references into one handoff skill plus a handoffplan skill.
    - Proposed both via propose_skills. Saved.
16. **Santa Ana v2** (`5e16549`):
    - All 10 plans with thumbnails, a satellite map tab reusing the geometry from `src/app.html`, and a fallback overlay.
    - `build.py` now builds both pages.
    - jsdom tests passed. Published to the Santa Ana artifact. Checked in Chrome:
      - The studio group wrapped onto 2 rows. Fixed by changing grid columns to `3fr 6fr 1.1fr` and card `minmax(94px,1fr)`.
      - The fallback overlay buttons were stretched and unstyled. Fixed in `3292127`: overlay is flex column, `a.btn` styled, `.go` color `!important` to beat Leaflet's link color.
17. **This handoff.** Added the tests to the repo and wrote this file plus the plan.

## Key Decisions

- **One city, Santa Ana.** Chosen over all 34, and over Tustin or Orange, which have no plans (not_found). Santa Ana has the most plans of any OC city (10) and Billy has family ties to Santa Ana politics. Rejected: the 34-city 3-screen flow, too complicated per Billy.
- **Never invent plan sizes.** Only 399 (studios) and 677 (JGA Craftsman) are confirmed from the city's plan titles. The other sizes are "Size not listed", with an ASSUMED footprint the user can overwrite.
  - Assumed footprints: studios 16×25, Craftsman 21×32, other 1BR 20×30, 2BR 24×30 (720 sq ft, inside the city's stated 399-749 range).
  - Rejected: guessing per-plan sizes.
- **4 ft side and rear setback, front not checked.** State ADU law (Gov Code 66310-66342) caps side and rear setbacks at 4 ft. Front setback is city-specific and left as "check city rules".
- **All geometry in feet.** Lat/lng is converted at 364,000 ft per degree of latitude, times cos(lat) for longitude, with the origin at the first traced point (map center at first click). Good enough for a backyard; the page labels traced distances "rough".
- **Satellite where allowed, sample yard where not.** The artifact CSP blocks remote images and fetch, so real tiles only work on a normal host (GitHub Pages). The page detects tile errors and says so instead of showing a blank map. Rejected: embedding tiles as data URIs (no route to fetch them from the workspace; licensing).
- **Address search uses streets or intersections only.** On-page note: "not someone's home address". This respects the no-personal-info rule.
- **Voter-roll targeting rejected.** Personal information.
- **Nothing is submitted to any city. Not legal advice.** The banner is on the page.
- **Keep `full.html` as the "vision" and `index.html` as the demo.** The judges' "Scale" criterion can point to the 34-city data as the path to the next 100 projects.

## Evidence & Data

### OC cities' pre-approved ADU status (data/preapproved-adu.json, checked 2026-11-07)

| Status | Count | Cities |
|---|---:|---|
| plans_posted | 9 | Santa Ana 10, Anaheim 4 (224-1,199 sf), Garden Grove 4, Laguna Hills 3 (389/499/789 sf), Laguna Niguel 3 (350/532/757 sf), Los Alamitos 2, Huntington Beach 1 (3 styles), San Juan Capistrano 1 (BOXABL Studio Casita), Westminster (count not confirmed) |
| program_designer_only | 7 | Brea, Dana Point, Irvine, San Clemente, Yorba Linda, Mission Viejo, Villa Park |
| program_unclear | 4 | Costa Mesa ("coming soon"), Newport Beach, Lake Forest, Laguna Beach |
| program_no_plans | 3 | Cypress, Placentia, Seal Beach |
| borrows_other_agency | 2 | La Habra (San Diego County plans), Aliso Viejo (San Diego County + Newport Beach) |
| in_progress | 1 | Fullerton (RRM Design Group contract) |
| not_found | 8 | Buena Park (offers CrossBeam PreCheck), Fountain Valley, La Palma, Laguna Woods, Orange, Rancho Santa Margarita, Stanton, Tustin (handbook "coming soon") |
| **Total** | **34** | plus unincorporated OC County: 6 plans |

Santa Ana's note in the data: "Over the counter, paper only."

### Santa Ana's 10 plans (from Billy's screenshot of santa-ana.gov/pre-approved-adu-plans)

| Key | Type | Style | Designer | Size (city) | Footprint used (ASSUMED) |
|---|---|---|---|---|---|
| sa-st-ranch | Studio | Ranch | Design Path Studio | 399 sf | 16 × 25 |
| sa-st-spanish | Studio | Spanish | Design Path Studio | 399 sf | 16 × 25 |
| sa-st-trad | Studio | Traditional | Design Path Studio | 399 sf | 16 × 25 |
| sa-1b-ranch | 1BR | Ranch | Design Path Studio | not listed | 20 × 30 |
| sa-1b-spanish | 1BR | Spanish | Design Path Studio | not listed | 20 × 30 |
| sa-1b-trad | 1BR | Traditional | Design Path Studio | not listed | 20 × 30 |
| sa-1b-contemp | 1BR | Contemporary | Design Path Studio | not listed | 20 × 30 |
| sa-1b-craftsman | 1BR | Craftsman | James Gartner & Associates | 677 sf | 21 × 32 |
| sa-1b-jga-spanish | 1BR | Spanish | James Gartner & Associates | not listed | 20 × 30 |
| sa-2b-contemp | 2BR | Contemporary | Design Path Studio | not listed | 24 × 30 |

The city's stated range across its designs is 399-749 sf. Santa Ana's site fails WebFetch and wouldn't let Billy download plan sheets, so the per-plan sizes and footprints are unknown.

### Law used

| Rule | Source | Used for |
|---|---|---|
| Pre-approved plan program required by Jan 1, 2025; 30-day clock for pre-approved or identical plans; agencies may admit other agencies' plans with architect consent | AB 1332, Gov Code 65852.27 (SANDAG summary) | "30 days" box, "9 of 34" framing, borrows_other_agency status |
| 60-day standard ADU decision clock | Gov Code 66317 (state ADU law 66310-66342, renumbered from 65852.2) | "instead of the usual 60" |
| 4 ft max side/rear setback | State ADU law, HCD ADU Handbook | Fit check |

### Cost-of-delay math

- Days saved = 60 - 30 = 30.
- Saved ≈ monthly carrying cost × 30 / 30.4.
- At the ASSUMED $3,000 per month: 3000 × 30 / 30.4 = 2960.5, shown as "≈ $2,961 less spent waiting".

### Headless test results (npm test, jsdom 24.1.3) at commit 3292127 plus tests

```
plans: 10 imgs: 10
groups: Studio · 3 designs | 1 Bedroom · 6 designs | 2 Bedroom · 1 design
placing: 1 Bedroom Craftsman · 677 sq ft · 21 × 32 ft footprint ASSUMED
status: ✓ Fits | 14.0 ft nearest side, 10.0 ft back, 13.0 ft from house
2BR: size not listed · 24 × 30 ASSUMED | ✓ Fits
studio: 399 sq ft · 16 × 25 | ✓ Fits | 15.0 side, 10.0 back, 20.0 house
custom 30x50: 1500 sq ft | ✗ It overlaps the house
map tab: Not ready yet | Trace the lot first. leaflet: true   errors: []
map, lot 50x110 traced, ADU 21x32 at centre: ✓ 14.5 ft nearest lot line, house not traced
+ house traced (7..43, 5..50): ✗ overlaps the house
ADU moved to cy=88: ✓ 6.0 ft lot line, 22.0 ft house
ADU moved to cx=14: ✗ Only 3.5 ft from a lot line
```

Every number was checked by hand. For example, cx=14 with w=21 puts the left edge at x=3.5.

### Sample yard constants (src/santa-ana.html)

```
LOT={w:50,l:110}  HOUSE={x:7,y:55,w:36,l:45}  SET=4  S=5 px/ft  PAD=15
y=0 is the back lot line; the street is at the bottom
default ADU position {x:15,y:10}; drag snaps to 0.5 ft; SVG viewBox 0 0 330 600
yard/map height calc(100vh - 250px), min 420px
default selected plan: PLANS[7] (JGA Craftsman 677)
```

### Commit log

| Hash | Summary |
|---|---|
| e6ecf19 | Initial commit |
| 6198b3c | Project README and 34-city tracker seed |
| 173a7ea | Fill all 34 OC cities from web search |
| 124ae1d | Second pass: site-restricted checks for 14 not-found cities |
| ddf56ed | Backyard Fit demo v1 (3 screens) |
| a06fa86 | Count own vs borrowed plans separately |
| 2493196 | Simplify to Santa Ana; full prototype → full.html |
| 5e16549 | All 10 Santa Ana plans with images, satellite map tab |
| 3292127 | Fix fallback button styling |
| (this) | session: handoff, plan, tests, package.json |

### Artifact versions (Santa Ana demo)

| Version | Change |
|---|---|
| 1794080191-3f57 | First Santa Ana publish |
| 1794080227-2e98 | Small fixes ("orange box" wording, height) |
| 1794081195-e816 | 10 plans plus satellite tab |
| 1794081222-0ff1 | Plans on one row |
| 1794081282-3f16 | Fallback styling (current) |

### Event timing (Pacific, Nov 7, 2026)

| Time | What |
|---|---|
| 2:30 PM | Submissions close; main branch must be pushed |
| 3:00 PM | Top 10 finalists announced, live demos in the auditorium |
| 4:00 PM | Judges deliberate |
| 4:15 PM | Winners |

### Judging rubric (docs/judging.md, equal weights, ties go to Impact)

| Area | Question | Our answer |
|---|---|---|
| Impact | Would a nonprofit or city use it next month? | Homeowner or nonprofit PM checks fit before paying an architect; city sees its own compliance |
| Works | Live demo on real data, sources shown? | Real Santa Ana plans plus real satellite imagery (once Pages is on), sources in the footer |
| Scale | Believable path to the next 100? | Same page works for any of the 9 cities with plans; 34-city data already collected |
| Innovation | New way to see the problem? | Turns a compliance mandate (AB 1332) into a 30-second homeowner check |

"What helps": one named user with a before and after, a real public OC lot, sources and assumptions on screen, "Unknown" where unknown.

## Code Analysis

- `build.py`: `build(src, dst, extra)` replaces `/*LEAFLET_CSS*/` and `/*LEAFLET_JS*/` with `vendor/leaflet.*`.
  - `index.html` also gets `/*THUMBS*/{}` replaced with `assets/thumbs.json`.
  - `full.html` gets `/*CITY_DATA*/` replaced with the JSON.
  - Run it as `python3 build.py vendor`. The argument is the Leaflet directory; it defaults to `vendor`.
- `src/santa-ana.html` main pieces:
  - `PLANS[]` with `{id,bed,style,by,sf,w,l}`.
  - `renderPlans()` builds the grouped cards. Clicking a card calls `pick(p)` and scrolls `#work` into view.
  - `placingText()` writes the "Placing: …" line.
  - `pick(p)` updates both `sq` (sample) and `mp` (map) dimensions.
  - `show(res)` renders `{ok:true|false|null, lines[]}` to `#status`/`#why`.
  - `draw()` dispatches on `mode` ("sample" or "map").
- **Sample yard:** `checkSample()` compares axis-aligned rectangles. It fails if the ADU is outside the lot, closer than 4 ft to the left, right or back edge, or overlapping the house. On a pass it reports gaps. Drag uses pointer events and `getScreenCTM().inverse()`.
- **Map:** `initMap()` is lazy and runs on the first Satellite tab click.
  - `map=L.map("map",{maxZoom:22,scrollWheelZoom:false}).setView([33.7455,-117.8677],17)`, which is central Santa Ana.
  - Esri layer `maxNativeZoom:19`.
  - Tile counters `tileOk`/`tileErr` show `#blocked` (display flex) when `!tileOk && tileErr>=3`.
- **Map geometry helpers** (copied from `src/app.html`): `toFt`, `toLL`, `aduPoly()` (rotated rectangle from `mp.cx,cy,w,l,rot`), `inPoly`, `cross`, `edges`, `edgesCross`, `dSeg`, `minDist`, `overlap`, `insetPoly(P,d)` (convex only, returns null otherwise, so no setback line for concave lots).
- `checkMap()` passes only if:
  - all 4 ADU corners are inside the lot and no edges cross,
  - `minDist(A,lot) >= 4`,
  - and, if a house is traced, it doesn't overlap and `minDist` to the house is reported.
  - It always appends "Lot lines are traced by eye…".
- **Tracing:** `startTrace("lot")` resets origin, lot and house. Map clicks push `toFt(latlng)` into `temp`. `Finish` assigns `lot` or `house`. On lot finish the ADU is centered at the lot centroid and the house button is enabled.
- **Drag on the map:** a polygon `mousedown` disables map dragging, `mousemove` shifts `mp.cx/cy`, and `mouseup` re-enables dragging. **Mouse only; touch is not handled.**
- **Not checked anywhere:** distance between the ADU and the house as a building-code separation (the code reports it but enforces only no overlap), front setback, easements, utilities, flood, historic district, max sq ft or height.

## Errors Hit and Gotchas (so the CLI session doesn't rediscover them)

| Problem | What happened | Fix or workaround |
|---|---|---|
| gh CLI | Token invalid in the app workspace | Plain `git push` over the proxy worked. On the laptop, use Billy's own git or gh auth |
| Repo creation | Classifier blocked Claude clicking "Create repository" (public surface) | Billy clicked it himself |
| GitHub Pages | Settings change, needs Billy's OK or click | Not done yet; step 1 of the plan |
| WebFetch on GitHub | Blocked by robots | Used `git clone` |
| WebFetch on santa-ana.gov | Fails; Billy couldn't download plan sheets either | Used Billy's screenshot for names, designers and thumbnails |
| raw.githack preview | Interstitial page in the built-in browser | Tested with jsdom and Chrome instead |
| Artifact CSP | Blocks remote images (tiles), fetch, window.print, downloads; scripts allowed from cdnjs/unpkg; CSS must be inline | Inline Leaflet via build.py; tile-error fallback overlay |
| Republishing the PUBLIC artifact | First a 422 (needs `shared_live: "public"`), then classifier denied it (Permission Grant) | Published the Santa Ana demo as a new private artifact. Billy later authorized live updates |
| jsdom | No SVG renderer for Leaflet vectors; no `scrollIntoView` | Tests stub `L.polygon`/`L.polyline` and `Element.prototype.scrollIntoView` |
| Running node on challenge-repo JSON | Classifier blocked it (external code) | Read the files with the Read tool instead |
| Leaflet CSS | `.leaflet-container a` color overrides link buttons inside the map area | `.go,a.go{color:#fff!important}` |
| CSS grid overlay | `display:grid` stretched the overlay's buttons to full width | Overlay uses flex column with `align-items:center` |

Commit identity used throughout: author `Billy Martinez <alphashock15@gmail.com>`. Every commit message ends with:
- `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`
- `Claude-Session: https://claude.ai/code/session_019QsKUiS1F3vcANnTJphqdJ`

## Demo Script Notes (from the pitch work, for the video and the live demo)

- **The named user:** a Santa Ana homeowner who wants a backyard unit for a parent or to rent. This is the pitch Claude drafted in chat:
  - **Before:** the homeowner doesn't know the city has free plans, pays an architect, and waits 60 days.
  - **After:** in 30 seconds they see that a free city plan fits, and that using it means a 30-day clock.
- **Beats:**
  1. "Only 9 of 34 OC cities post their own plans. Santa Ana has 10."
  2. Pick the Craftsman.
  3. Drop it on a real lot (satellite).
  4. Drag it too close to the fence: red, "Only 3.5 ft".
  5. Move it back: green.
  6. "30 days, about $2,961 less spent waiting (assumption, editable)."
  7. Point at the sources in the footer.
- **Say out loud:** "Green means it passes our basic checks, not that the city will approve it. Not legal advice."
- **Scale line:** "The same page works for every city with plans; we already checked all 34."

## Files Changed

### Source code
- `src/santa-ana.html`: rewritten this session (10 plans, tabs, satellite map, fallback). Then grid tweak and overlay styling.
- `src/app.html`: unchanged this session (full 34-city prototype).
- `build.py`: now builds `index.html` and `full.html` and inlines thumbnails.

### Built outputs (committed)
- `index.html`: the Santa Ana demo, about 254 KB.
- `full.html`: the 34-city prototype, about 203 KB.

### Data & assets
- `assets/thumbs.json`: 10 plan thumbnails as data URIs (about 70 KB).
- `assets/*.jpg`: the same 10 thumbnails as files.
- `data/preapproved-adu.json`: unchanged this session.

### Tests and config
- `tests/ui.test.js`: picker, placing text, sample-yard checks, map tab init.
- `tests/map-geometry.test.js`: simulated lot and house tracing with stubbed `L.polygon`/`L.polyline`, 4 placements.
- `package.json`: jsdom 24.1.3 dev dependency, plus `npm run build` and `npm test`.
- `.gitignore`: `node_modules/`.

### Docs
- `README.md`: Demo section updated for the 10 plans and the satellite tab.
- `plans/handoffs/HANDOFF_santa-ana-backyard-fit_2026-11-07.md` (this file) and `PLAN_santa-ana-backyard-fit_2026-11-07.md`.

## User Feedback & Preferences

- "im not a fan of how cimplicated it is now.. i thinkk we strat with one city.. tustin, santa ana, orange, etc the demo doesnt need to be god level advanved.. it just needs to show one small thing can be executed." **Keep it simple.**
- "you can update thsi page live.. rule was only for the math ones." Billy authorizes live updates of the published artifacts. The "rule" he means applies only to his math/calc study pages.
- "santa anas site is buns and doesnt wanna let me download." Don't expect plan PDFs from Santa Ana.
- "also implement actual map data not just blank canvas." **Real satellite imagery matters to him.**
- "use claude in chrome.. do a full walthrough. make this near perfect for presnetation." He values a visual walkthrough before presenting.
- "make your own repo using my github acc." He signed in to GitHub himself and clicked "Create repository" when the classifier blocked it.
- "simple terms, like im 12." Wants plain explanations.
- Saved preferences:
  - Condensed responses, no filler.
  - ADHD-friendly: short chunks, one step at a time.
  - No em dashes.
  - Pacific time.
  - Run `date` before anything time-dependent.
  - Documents as PDF.
- He was moving the chat to Claude Code CLI: "/handoff moving this chat to claude code cli rather than app."

## Where We're Going

1. **Enable GitHub Pages** (Billy clicks: repo Settings → Pages → Deploy from a branch → `main` / `/ (root)` → Save). Then verify `https://multilple.github.io/oc-adu-tracker/` loads satellite tiles, and do the trace, drag and check flow on a real Santa Ana street.
2. **Pick a real, public Santa Ana case lot** for the demo, so it isn't anyone's private home. The judging doc suggests "a publicly listed small building or lot in Orange County."
   - Options: a lot from a public for-sale listing, or a city-owned parcel.
   - Do not show an address tied to a private person.
3. **Rewrite `README.md` to `templates/TEAM-README.md`**: The real user, What we built, How Claude is used, Try it (exact commands), Sources and assumptions, What is real vs mocked, Where it gets things wrong, Next steps, Data and privacy, License. Add the live demo URL.
4. **Record a 30-second demo video**: one user, one problem, tool working, result. Script it first.
5. **Submit the form** at `https://claudesocal.com/uci-impact-lab#submit` before 2:30 PM. Check the repo signed out (private window) first.
6. **Prep for finalists at 3:00**: rehearse the live demo from the Pages URL, with the sample yard as backup.

## Risks & Blockers

- **Pages not enabled** means no real map. Fallback: present the sample yard, or open `index.html` from a local file (Leaflet is inlined; tiles load from Esri when online).
- **Time.** About 2.5 h at handoff, for README, video and form. Do not add features.
- **Touch drag on the map doesn't work.** Present on a laptop with a mouse or trackpad.
- **Nominatim** rate limits (1 request per second policy) and may miss intersections. Panning by hand always works.
- **Concave lots** have no dashed setback line (`insetPoly` returns null), but the check still works.
- **Mike/CrossBeam overlap.** Have a one-line answer ready: CrossBeam checks plan sets for cities; we answer the homeowner's first question and show city compliance.

## Open Questions

- Which exact public lot to use on stage? (Billy decides.)
- Does Billy have teammates submitting, or is he solo? The submission uses the registered team email.
- Should the old public artifact (full demo) be updated to point to the Pages URL, or left alone?
- Plan sheet footprints for the 7 "Size not listed" plans remain unknown. Leave them labeled.

## Quick Start for Next Session

```bash
# Get the code on the laptop
git clone https://github.com/Multilple/oc-adu-tracker && cd oc-adu-tracker
cat plans/handoffs/PLAN_santa-ana-backyard-fit_2026-11-07.md

# Key files
src/santa-ana.html  build.py  README.md  data/preapproved-adu.json

# Verify
npm install && npm run build && npm test   # expect 10 plans, all checks as in Evidence
open index.html                             # macOS; tiles load when online

# Next action
# Billy enables GitHub Pages (Settings → Pages → main / root), then check
# https://multilple.github.io/oc-adu-tracker/ shows satellite tiles
```
