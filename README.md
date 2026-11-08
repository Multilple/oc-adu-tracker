# Backyard Fit

> See in 30 seconds if one of Santa Ana's free pre-approved ADU designs fits your backyard.

🏆 **First Place, Claude Impact Lab: UCI × SoCal Affordable Housing (November 7, 2026)**

**Team:** Bagelz
**Members:** William Martinez, Ethan Nguyen, Lucas Jimenez-Suselo, Kevin Bora Cetin, King Michael Vergara
**Lanes:** 1 Find it (OC Site Finder) + 2 Clear it (Backyard Fit)
**Built at:** Paul Merage School of Business, UC Irvine

**Live demo:** <https://multilple.github.io/oc-adu-tracker/>

## The real user

A Santa Ana homeowner who wants a backyard unit for a parent or to rent out. Since 2025, state law
(AB 1332) makes every California city offer free pre-approved ADU plans, and a project built from one
gets a 30-day city decision clock instead of the usual 60. Most homeowners don't know the plans
exist, and only 9 of Orange County's 34 cities post usable plans of their own. Santa Ana posts 10.

**Before:** the homeowner doesn't know about the free plans, pays an architect to find out what fits,
and waits on the standard 60-day review.
**After:** in 30 seconds they pick a free city design, drop it on their own lot on satellite imagery,
and see if it clears the basic setback and house checks. Using that plan puts them on the 30-day clock.

A nonprofit project manager can use the same page to screen lots before paying for design work.

## What we built

One page, three steps:

1. **Pick a plan.** All 10 of Santa Ana's pre-approved designs (3 studios, 6 one-bedroom, 1 two-bedroom).
2. **Place it.** Either on a sample yard, or on real Esri satellite imagery: search a street or
   intersection, click the lot corners, click the house corners, then drag and turn the ADU.
3. **Result.** Green "Fits our basic checks" or red "Doesn't fit yet" with the reason (for example
   "Only 3.5 ft from a lot line"). The page lists what it checks and what it doesn't.

A "Why it matters" box shows the 30 days saved and what that waiting costs at an editable monthly
carrying cost.

`full.html` is a bigger earlier prototype covering all 34 OC cities. It is the vision for scale,
not the demo.

**Demo video:** uploaded on the hub.

## How the tools connect

This repo holds two tools that share one data set, `data/preapproved-adu.json` (34 OC cities' AB 1332
pre-approved ADU plan status, checked Nov 7, 2026):

1. **OC Site Finder** (`site-finder/index.html`) ranks 1,113 public surplus and Housing Element sites
   across Orange County by homes, livability and city pressure. Its "City pressure" panels now show each
   city's pre-approved ADU line (for example "10 posted · 30-day review (AB 1332)" or "none found"), linked
   to the city's program page, and a filter "City has pre-approved ADU plans" narrows the search to the
   9 cities that post plans.
2. **Backyard Fit** (root `index.html`) answers the next question for one site: does a free Santa Ana
   plan fit this lot? Santa Ana sites in Site Finder get a **Check ADU fit** button that opens
   `index.html?lat=…&lng=…&z=19` on that spot. Other cities with plans show "coming soon".

Site Finder is a single self-contained file with the ADU data embedded as a small script block; nothing
is fetched at runtime.

## How Claude is used

- **Building it:** Claude researched all 34 OC cities' pre-approved ADU programs
  (`data/preapproved-adu.json`), wrote the page, the setback geometry and the tests, and did a
  visual walkthrough in Chrome to fix layout and wording problems.
- **At runtime:** the tool calls no AI. All checks are plain geometry in the browser. A person
  still checks the actual plan sheet and city rules before applying.

## Try it

Fastest: open the live demo link above. To jump straight to a spot on the satellite map, add
`?lat=33.7455&lng=-117.8677&z=19` to the URL.

Run it locally (no install needed to view):

```bash
git clone https://github.com/Multilple/oc-adu-tracker
cd oc-adu-tracker
# open index.html in any browser. The satellite map needs internet; the sample yard works offline.
```

Rebuild and test (needs Python 3 and Node 18 or newer; jsdom is pinned in `package-lock.json`):

```bash
npm install
npm run build   # builds index.html and full.html from src/
npm test        # headless checks: 10 plans, sample-yard and map fit checks, URL params
```

No API keys or environment variables.

## Sources and assumptions

| Item | Source or assumption | Date checked |
|---|---|---|
| Santa Ana's 10 plans: names, designers, thumbnails | [Santa Ana pre-approved ADU plans page](https://santa-ana.gov/pre-approved-adu-plans/) | 2026-11-07 |
| Studio size 399 sq ft, JGA Craftsman 677 sq ft | Santa Ana plan titles (only sizes the city lists) | 2026-11-07 |
| Santa Ana designs range 399 to 749 sq ft | Santa Ana plans page | 2026-11-07 |
| Pre-approved plan program required; 30-day decision clock | AB 1332, Gov Code 65852.27 ([SANDAG summary](https://www.sandag.org/projects-and-programs/regional-initiatives/housing-and-land-use/housing-acceleration-program/-/media/CF0D23A5205A44ABAEA8A4A8BAE45141.ashx)) | 2026-11-07 |
| 60-day standard ADU decision clock | Gov Code 66317 (state ADU law) | 2026-11-07 |
| 4 ft max side and rear setback | State ADU law, [HCD ADU Handbook](https://www.hcd.ca.gov/sites/default/files/docs/policy-and-research/adu-handbook-update.pdf) | 2026-11-07 |
| 9 of 34 OC cities post usable plans | Our city-by-city check, `data/preapproved-adu.json` | 2026-11-07 |
| Satellite imagery | Esri World Imagery | live |
| Footprint shapes: studios 16 × 25 ft, Craftsman 21 × 32, other 1BR 20 × 30, 2BR 24 × 30 | ASSUMPTION (the city doesn't publish footprints; you can type the real one from the plan sheet) | |
| 6 of 10 plan sizes | Unknown. Shown as "Size not listed" | |
| $3,000 per month carrying cost (loan, tax, insurance while waiting) | ASSUMPTION, editable on the page | |
| Saved ≈ monthly cost × 30 / 30.4, so about $2,961 at $3,000 | Math on the ASSUMPTION above | |
| Sample yard: 50 × 110 ft lot, 36 × 45 ft house | ASSUMPTION (made-up lot, not a real address) | |
| 364,000 ft per degree of latitude (times cos(latitude) for longitude) | ASSUMPTION, close enough for one backyard | |

Every number we made up is labelled ASSUMPTION here and in the tool.

## What is real and what is mocked

| Part | Status |
|---|---|
| Santa Ana's 10 plans, names, designers, images | Working, real |
| Plan sizes | Real for 3 studios and the Craftsman; "Size not listed" for the other 6 |
| Plan footprint shapes | Mocked (ASSUMPTION), user can enter real ones |
| Satellite map, address search, lot and house tracing | Working, real imagery |
| Setback and house-overlap check | Working (side and rear 4 ft only) |
| Sample yard | Mocked lot |
| Carrying cost | Mocked (ASSUMPTION), editable |
| 34-city program data | Real, checked by hand from city sites |

## Where it gets things wrong

- Lot lines are traced by eye from imagery, so distances are rough (a foot or two).
- It does not check the front setback, easements, utilities, flood zone, historic district, height,
  max square footage or building separation from the house (it only checks for overlap).
- Footprints are assumed for every plan until someone types in the plan sheet's real size.
- Dragging works with a mouse or trackpad, not touch.
- Lots with an inward corner (concave) get no dashed setback line, though the check still runs.
- Green means it passes our basic checks, not that the city will approve it. Not legal advice.

## Next steps

- Read the real footprints from Santa Ana's plan sheets (needs the PDFs from the city).
- Add the other 8 OC cities that post plans; the data is already in `data/preapproved-adu.json`.
- Export a draft site plan the homeowner can bring to the counter.
- A city-side view showing which cities comply with AB 1332.
- With one more week: test with a Santa Ana homeowner and a Habitat project manager.

## Data and privacy

This project uses only public data. It contains no personal information about real tenants, buyers
or residents. The address search is for streets and intersections, not someone's home address.
Nothing is sent to any city, and it does not file applications or contact anyone.

## License

MIT, see the LICENSE file in this repo.
