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

Open `index.html` in a browser (or GitHub Pages) for the full version with satellite imagery and address lookup.
Build it from source with `python3 build.py vendor` (inlines Leaflet 1.9.4, BSD-2, and the city data).

Three screens:
1. **City:** all 34 OC cities, colored by pre-approved plan status.
2. **Design:** swipe through pre-approved plans (square footage from each agency; footprint shape is assumed and labeled).
3. **Yard:** trace the lot and house, drag the ADU, and see red or green against a 4 ft side and rear setback. Get a draft site plan.
