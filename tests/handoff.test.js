// Site Finder -> Backyard Fit handoff: pick 917 N. Bristol St in Site Finder, follow Check ADU fit,
// and Backyard Fit must open with that lot already drawn (no tracing), then link back to the same site.
const {JSDOM}=require("jsdom");const fs=require("fs");const assert=require("assert");const path=require("path");
const bfHtml=fs.readFileSync(process.argv[2]||"index.html","utf8");
const sfHtml=fs.readFileSync(process.argv[3]||path.join(path.dirname(process.argv[2]||"index.html"),"site-finder/index.html"),"utf8")
 .replace(/<script src="https:\/\/cdnjs[^"]*"><\/script>/,"");
const SITE="SLA-40526225", LOT_SQFT=14026;

// Leaflet is loaded from a CDN in Site Finder; stub it (no network, no SVG renderer in jsdom).
const chain=()=>new Proxy(function(){},{get:(t,k)=>k==="then"?undefined:k===Symbol.toPrimitive?(()=>10):k==="eachLayer"?(()=>{}):k==="intersects"?(()=>false):chain(),apply:()=>chain()});
function loadSiteFinder(url){
 return new JSDOM(sfHtml,{url,runScripts:"dangerously",pretendToBeVisual:true,beforeParse(w){
  w.L=chain();w.matchMedia=()=>({matches:false});w.requestAnimationFrame=f=>f();}}).window;
}
// Backyard Fit inlines Leaflet; jsdom can't render its SVG layers, so stub polygon/polyline the moment L is assigned.
function loadBackyardFit(url){
 return new JSDOM(bfHtml,{url,runScripts:"dangerously",pretendToBeVisual:true,beforeParse(w){
  w.Element.prototype.scrollIntoView=()=>{};w.SVGElement.prototype.getScreenCTM=function(){return {inverse:()=>({})}};
  let realL;const stub=()=>({addTo(){return this},on(){return this}});
  Object.defineProperty(w,"L",{configurable:true,get(){return realL},set(v){realL=v;if(v){v.polygon=stub;v.polyline=stub}}});
 }}).window;
}
const ringArea=(pts)=>Math.abs(pts.reduce((s,p,i)=>{const q=pts[(i+1)%pts.length];return s+p.x*q.y-q.x*p.y},0)/2);

setTimeout(()=>{
 // 1. Site Finder: select the site and read the Check ADU fit link.
 const sf=loadSiteFinder("https://example.test/oc-adu-tracker/site-finder/");
 const sd=sf.document;
 sd.querySelector("#only").value="all";sd.querySelector("#size").value="all";sd.querySelector("#only").dispatchEvent(new sf.Event("input"));
 sf.pick(SITE);
 assert.ok(sd.querySelector("#detail h2").textContent.startsWith("917 N. Bristol Street"),"site selected: "+sd.querySelector("#detail h2").textContent);
 const href=sd.querySelector("#detail a.btn").getAttribute("href");
 const u=new URL(href,"https://example.test/oc-adu-tracker/site-finder/");
 assert.strictEqual(u.pathname,"/oc-adu-tracker/index.html");
 assert.strictEqual(u.searchParams.get("site"),SITE);
 assert.strictEqual(u.searchParams.get("z"),"19");
 assert.ok(/^917 N\. Bristol/.test(u.searchParams.get("name")));
 const lotPts=u.searchParams.get("lot").split(";");
 assert.ok(lotPts.length>=4,"lot has points: "+lotPts.length);
 assert.ok(lotPts.every(p=>/^-?\d+\.\d{6},-?\d+\.\d{6}$/.test(p)),"lng,lat with 6 decimals");
 const site=sf.eval("D").sites.find(x=>x.id===SITE);
 assert.strictEqual(site.lot_sqft,LOT_SQFT);

 // 2. Backyard Fit opens with that URL: satellite tab, lot drawn, check already run.
 const bf=loadBackyardFit(u.href);
 const bd=bf.document;
 assert.strictEqual(bd.getElementById("mapWrap").style.display,"block","satellite tab open");
 const status=bd.getElementById("status").textContent;
 assert.notStrictEqual(status,"Not ready yet","status is a real result: "+status);
 assert.ok(/Fits our basic checks|Doesn't fit yet/.test(status),"status: "+status);
 assert.strictEqual(bf.eval("lot.length"),4,"lot has 4 corners (closing point dropped)");
 assert.strictEqual(bd.getElementById("traceLot").textContent,"Adjust the lot");
 assert.ok(bd.getElementById("fromSite").textContent.includes("Lot from Site Finder: 917 N. Bristol Street"));

 // 3. Area of the handed-off lot, in feet, from the page's own conversion.
 const area=ringArea(bf.eval("lot"));
 // Reference: the same ring measured on the WGS84 ellipsoid (metres -> sq ft).
 const ring=site.outline.coordinates[0].slice(0,-1),o=ring[0],R=6378137,c=Math.cos(o[1]*Math.PI/180);
 const geo=ringArea(ring.map(([lng,lat])=>({x:(lng-o[0])*Math.PI/180*R*c*3.28084,y:(lat-o[1])*Math.PI/180*R*3.28084})));
 const offGeo=Math.abs(area-geo)/geo, offNotice=Math.abs(area-LOT_SQFT)/LOT_SQFT;
 assert.ok(offGeo<0.05,`page area ${area.toFixed(0)} vs geodesic ${geo.toFixed(0)} sq ft (${(offGeo*100).toFixed(1)}% off)`);
 // The notice lists 0.322 ac = 14,026 sq ft for the 2 parcels; the county outline ring measures about 15,700 sq ft.
 // That gap is in the source data, not the handoff, so the notice check is a 15% sanity bound.
 assert.ok(offNotice<0.15,`page area ${area.toFixed(0)} vs notice ${LOT_SQFT} sq ft (${(offNotice*100).toFixed(1)}% off)`);

 // 4. Back link returns to the same site.
 assert.strictEqual(bd.getElementById("backSite").getAttribute("href"),"site-finder/#site="+SITE);

 // 5. Site Finder reselects it from the hash (filters widened if needed).
 const sf2=loadSiteFinder("https://example.test/oc-adu-tracker/site-finder/#site="+SITE);
 assert.ok(sf2.document.querySelector("#detail h2").textContent.startsWith("917 N. Bristol Street"),"hash reselects the site");

 console.log(`handoff: ok (lot drawn, ${status}, area ${area.toFixed(0)} sq ft = ${(offGeo*100).toFixed(1)}% off geodesic, ${(offNotice*100).toFixed(1)}% off the notice's ${LOT_SQFT}; back link ok; #site= reselects)`);
 process.exit(0);
},300);
