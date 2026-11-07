// ?lat=..&lng=..&z=.. opens the satellite tab on that spot; bad values fall back to the default view.
const {JSDOM}=require("jsdom");const fs=require("fs");const assert=require("assert");
const html=fs.readFileSync(process.argv[2],"utf8");
function load(search){
 return new JSDOM(html,{url:"https://example.test/"+search,runScripts:"dangerously",pretendToBeVisual:true,beforeParse(w){
  w.Element.prototype.scrollIntoView=()=>{};w.SVGElement.prototype.getScreenCTM=function(){return {inverse:()=>({})}};}}).window;
}
const view=w=>{const c=w.eval("map&&map.getCenter()"),z=w.eval("map&&map.getZoom()");return c?[+c.lat.toFixed(4),+c.lng.toFixed(4),z]:null};
setTimeout(()=>{
 const a=load("?lat=33.7501&lng=-117.8702&z=20");
 assert.strictEqual(a.document.getElementById("mapWrap").style.display,"block");
 assert.deepStrictEqual(view(a),[33.7501,-117.8702,20]);
 const b=load("?lat=33.7501&lng=-117.8702");
 assert.deepStrictEqual(view(b),[33.7501,-117.8702,19]);
 const c=load("?lat=abc&lng=-117.87");
 assert.strictEqual(view(c),null,"bad params: map stays lazy, sample yard shown");
 const d=load("");
 assert.strictEqual(view(d),null);
 d.document.getElementById("tMap").click();
 assert.deepStrictEqual(view(d),[33.7455,-117.8677,17]);
 console.log("url params: ok (lat/lng/z, default zoom 19, bad input ignored, default view unchanged)");
 process.exit(0);
},200);
