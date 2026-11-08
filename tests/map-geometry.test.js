const {JSDOM}=require("jsdom");const fs=require("fs");const assert=require("assert");
const dom=new JSDOM(fs.readFileSync(process.argv[2],"utf8"),{runScripts:"dangerously",pretendToBeVisual:true,beforeParse(w){w.Element.prototype.scrollIntoView=()=>{};
 let realL;const stub=()=>({addTo(){return this},on(){return this}});
 Object.defineProperty(w,"L",{configurable:true,get(){return realL},set(v){realL=v;if(v){v.polygon=stub;v.polyline=stub}}});}});
const w=dom.window,d=w.document,$=id=>d.getElementById(id);
setTimeout(()=>{
 w.eval(`map.removeLayer=()=>{};`);
 $("traceLot").click();
 // first click becomes origin=center; place points in feet with the page's own conversion
 w.eval("origin=map.getCenter()");
 const ft=(x,y)=>w.eval(`toLL({x:${x},y:${y}})`);
 const click=([x,y])=>w.eval("map").fire("click",{latlng:ft(x,y)});
 [[0,0],[50,0],[50,110],[0,110]].forEach(click);
 $("finish").click();
 console.log("lot only:",$("status").textContent,"|",$("why").textContent);
 $("traceHouse").click();
 [[7,5],[43,5],[43,50],[7,50]].forEach(click);
 $("finish").click();
 console.log("with house:",$("status").textContent,"|",$("why").textContent);
 w.eval("mp.cx=25;mp.cy=88;draw()");
 assert.match($("status").textContent,/Fits/);console.log("moved to back:",$("why").textContent);
 w.eval("mp.cx=14;draw()");
 assert.match($("status").textContent,/Doesn't fit/);console.log("near side:",$("why").textContent);
 // 1 degree of latitude near Santa Ana is about 364,000 ft
 const fl=w.eval("ftLat()");assert.ok(Math.abs(fl-363950)<200,"ft per degree latitude: "+fl);
 console.log("map geometry: ok");
 process.exit(0)},300);
