"""Build index.html: inline Leaflet and the city data into one self-contained page."""
import json, pathlib, sys
leaf = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "vendor")
src = pathlib.Path("src/app.html").read_text()
data = json.loads(pathlib.Path("data/preapproved-adu.json").read_text())
out = (src.replace("/*LEAFLET_CSS*/", (leaf / "leaflet.css").read_text())
          .replace("/*LEAFLET_JS*/", (leaf / "leaflet.js").read_text())
          .replace("/*CITY_DATA*/", json.dumps(data)))
pathlib.Path("full.html").write_text(out)
print("wrote index.html", len(out))
