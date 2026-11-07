# oc-adu-tracker

**How long does it take to build an ADU in your city, and what does the waiting cost?**

Built at the Claude Impact Lab: Affordable Housing (UC Irvine, Nov 7, 2026), Lane 2: Clear it.

## The problem

Since January 1, 2025, state law (AB 1332, Gov Code 65852.27) has required every California city to run a
program for pre-approved ADU plans and post those plans online. A detached ADU built from a pre-approved
plan, or from a plan identical to one the city already approved, gets a 30-day decision clock.

Nobody has checked which of Orange County's 34 cities actually comply.

## Who it's for

- A homeowner adding an ADU: "Does my city have plans I can just use?"
- A nonprofit project manager: "Which city gets me to a permit faster?"
- A city permit tech: "Are we in compliance?"

## What it does (in progress)

1. **Tracker:** each OC city, whether it has a pre-approved program, a link, the plan count and the date checked.
2. **Finder:** enter a city, see its plans, or "none found" plus nearby options.
3. **Cost of delay:** days saved times monthly carrying cost. Every assumption is labeled.

## Data

- `data/preapproved-adu.json`: the 34 cities. `null` means not checked yet, never "no".
- Seed rows come from the organizers' Lane 2 data sources and are re-verified before use.

## Rules we follow

- No personal information. No profiling owners.
- No heavy scraping of city sites. Each page is checked once and cached.
- Unknown is shown as unknown. Assumed numbers are labeled as assumptions.
- Not legal advice.

## License

MIT

## Demo

`index.html` is the presentation demo: **Will a free Santa Ana ADU design fit my backyard?**
Pick one of Santa Ana's 10 pre-approved designs, then place it either on a made-up sample lot or on real Esri satellite imagery (trace the lot and house by clicking corners). The ADU turns green or red against the 4 ft side and rear setback and the house.

- Sizes are shown only where Santa Ana's plan title states them (studios 399 sq ft, JGA Craftsman 677 sq ft). Every other size says "Size not listed", and every footprint shape is labeled ASSUMED. You can type a real footprint from the plan sheet.
- The sample yard works offline. The satellite map needs internet and a host that allows map tiles (GitHub Pages works; sandboxed previews don't, and the page says so).

`full.html` is the bigger prototype (all 34 cities). Build both pages with `python3 build.py vendor`.
