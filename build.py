"""Build the self-contained pages.

index.html  <- src/santa-ana.html  (simple Santa Ana demo: plans + sample yard + satellite map)
full.html   <- src/app.html        (bigger 34-city prototype)

Leaflet and the data are inlined so each page is a single file.
"""
import json, pathlib, sys

leaf = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "vendor")
css, js = (leaf / "leaflet.css").read_text(), (leaf / "leaflet.js").read_text()
cities = json.dumps(json.loads(pathlib.Path("data/preapproved-adu.json").read_text()))
thumbs = pathlib.Path("assets/thumbs.json").read_text().strip()


def build(src, dst, extra):
    out = pathlib.Path(src).read_text().replace("/*LEAFLET_CSS*/", css).replace("/*LEAFLET_JS*/", js)
    for k, v in extra.items():
        out = out.replace(k, v)
    pathlib.Path(dst).write_text(out)
    print("wrote", dst, len(out))


build("src/santa-ana.html", "index.html", {"/*THUMBS*/{}": thumbs})
build("src/app.html", "full.html", {"/*CITY_DATA*/": cities})
