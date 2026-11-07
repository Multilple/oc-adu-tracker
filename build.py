"""Build the self-contained pages.

index.html  <- src/santa-ana.html  (simple Santa Ana demo: plans + sample yard + satellite map)
full.html   <- src/app.html        (bigger 34-city prototype)

Leaflet and the data are inlined so each page is a single file.
"""
import json, pathlib, sys


def read(p):
    return pathlib.Path(p).read_text(encoding="utf-8")  # universal newlines, so CRLF checkouts build the same


leaf = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "vendor")
css, js = read(leaf / "leaflet.css"), read(leaf / "leaflet.js")
cities = json.dumps(json.loads(read("data/preapproved-adu.json")))
thumbs = read("assets/thumbs.json").strip()


def build(src, dst, extra):
    out = read(src).replace("/*LEAFLET_CSS*/", css).replace("/*LEAFLET_JS*/", js)
    for k, v in extra.items():
        out = out.replace(k, v)
    pathlib.Path(dst).write_text(out, encoding="utf-8", newline="\n")
    print("wrote", dst, len(out))


build("src/santa-ana.html", "index.html", {"/*THUMBS*/{}": thumbs})
build("src/app.html", "full.html", {"/*CITY_DATA*/": cities})
