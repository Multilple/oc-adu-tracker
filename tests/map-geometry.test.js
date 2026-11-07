const {JSDOM}=require("jsdom");const fs=require("fs");
const dom=new JSDOM(fs.readFileSync(process.argv[2],"utf8"),{runScripts:"dangerously",pretendToBeVisual:true,beforeParse(w){w.Element.prototype.scrollIntoView=()=>{};}});
const w=dom.window,d=w.document,$=id=>d.getElementById(id);
setTimeout(()=>{
 w.eval(`const stub=()=>({addTo(){return this},on(){return this}});L.polygon=stub;L.polyline=stub;map=null;`);
 $("tMap").click();
 w.eval(`map.removeLayer=()=>{};`);
 $("traceLot").click();
 const c=w.eval("map.getCenter()");
 const ft=(x,y)=>w.eval(`L.latLng(${c.lat}+${y}/364000,${c.lng}+${x}/(364000*Math.cos(${c.lat}*Math.PI/180)))`);
 // 50 x 110 lot; first click becomes origin=center
 for(const [x,y] of [[0,0],[50,0],[50,110],[0,110]])w.eval("map").fire("click",{latlng:ft(x,y)});
 $("finish").click();
 console.log("lot only:",$("status").textContent,"|",$("why").textContent);
 $("traceHouse").click();
 for(const [x,y] of [[7,5],[43,5],[43,50],[7,50]])w.eval("map").fire("click",{latlng:ft(x,y)});
 $("finish").click();
 console.log("with house (ADU at centre, overlaps):",$("status").textContent,"|",$("why").textContent);
 w.eval("mp.cx=25;mp.cy=88;draw()");
 console.log("moved to back:",$("status").textContent,"|",$("why").textContent);
 w.eval("mp.cx=14;draw()");
 console.log("near side:",$("status").textContent,"|",$("why").textContent);
 process.exit(0)},300);
