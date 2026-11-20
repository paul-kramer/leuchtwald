/* Leuchtwald · Lernpfad-Thema „Zahlen bis 1000“ (3. Klasse, NRW)
   Passend zu den Arbeitsblättern: Zahldarstellung mit Hundertern/Zehnern/Einern, Stellenwerttafel,
   Zahlenkarten und Zahlwörter, Plättchen in der Stellenwerttafel, Tausenderstreifen,
   Zahlenstrahl, Ordnen, Vorgänger und Nachfolger.
   Aufbau eines Aufgabentyps: siehe aufgaben/README.md */
(function(){
"use strict";
const THEMEN = window.LW_THEMEN = window.LW_THEMEN || [];

/* ---------- Hilfen ---------- */
const r=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const mischen=a=>{for(let k=a.length-1;k>0;k--){const j=Math.floor(Math.random()*(k+1));[a[k],a[j]]=[a[j],a[k]]}return a};
const FARBE={H:"#ffb54a",Z:"#5fb0e6",E:"#ff8f70"};          // Hunderter orange, Zehner blau, Einer rot (wie die Zahlenkarten im Heft)
const STELLE={H:"Hunderter",Z:"Zehner",E:"Einer"};
const zer=n=>[Math.floor(n/100),Math.floor(n/10)%10,n%10];
const bunt=(t,s)=>`<b style="color:${FARBE[s]}">${t}</b>`;

/* ---------- Zahlwörter ---------- */
const EIN=["","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun"];
const ZIG=["","zehn","zwanzig","dreißig","vierzig","fünfzig","sechzig","siebzig","achtzig","neunzig"];
const TEEN={13:"drei",14:"vier",15:"fünf",16:"sech",17:"sieb",18:"acht",19:"neun"};
function wortTeile(n){
  if(n===1000) return [["eintausend",null]];
  const [h,z,e]=zer(n), rest=n%100, out=[];
  if(h) out.push([h===1?"ein":EIN[h],"H"],["hundert",null]);
  if(!rest) return out;
  if(rest<10) out.push([EIN[e],"E"]);
  else if(rest===10) out.push(["zehn","Z"]);
  else if(rest===11) out.push(["elf","Z"]);
  else if(rest===12) out.push(["zwölf","Z"]);
  else if(rest<20) out.push([TEEN[rest],"E"],["zehn","Z"]);
  else { if(e) out.push([e===1?"ein":EIN[e],"E"],["und",null]); out.push([ZIG[z],"Z"]); }
  return out;
}
const zahlwort=n=>wortTeile(n).map(p=>p[0]).join("");
const wortBunt=n=>wortTeile(n).map(([t,s])=>s?bunt(t,s):`<span>${t}</span>`).join("");

/* ---------- Bilder ---------- */
let gitter="", streifen="";
for(let k=1;k<10;k++){const p=(1+k*4.8).toFixed(1);gitter+=`M${p} 1V49M1 ${p}H49`;streifen+=`M1 ${p}H9`}
const PLATTE=`<svg class="mh" viewBox="0 0 50 50" aria-hidden="true"><rect x="1" y="1" width="48" height="48" rx="2" fill="${FARBE.H}"/><path d="${gitter}" stroke="rgba(15,42,46,.35)" stroke-width=".7"/></svg>`;
const STANGE=`<svg class="mz" viewBox="0 0 10 50" aria-hidden="true"><rect x="1" y="1" width="8" height="48" rx="1.5" fill="${FARBE.Z}"/><path d="${streifen}" stroke="rgba(15,42,46,.35)" stroke-width=".7"/></svg>`;
const WUERFEL=`<svg class="me" viewBox="0 0 10 10" aria-hidden="true"><rect x="1" y="1" width="8" height="8" rx="1.5" fill="${FARBE.E}"/></svg>`;
function mab(h,z,e){
  const g=(n,s,c)=>n?`<div class="g ${c}">${s.repeat(n)}</div>`:"";
  return `<div class="mab" role="img" aria-label="Hunderterplatten, Zehnerstangen und Einerwürfel">${g(h,PLATTE,"h")}${g(z,STANGE,"z")}${g(e,WUERFEL,"e")}</div>`;
}
function swt(h,z,e,mark){            // Stellenwerttafel mit Plättchen; mark = {s:"Z", art:"dazu"|"weg"}
  const zelle=(n,s)=>{
    const m=mark&&mark.s===s; let d="";
    for(let k=0;k<n;k++) d+=`<i${m&&mark.art==="weg"&&k===n-1?' class="weg"':""}></i>`;
    if(m&&mark.art==="dazu") d+=`<i class="neu"></i>`;
    return `<div class="sz${m?" hl":""}"><div class="dots">${d}</div></div>`;
  };
  return `<div class="swt" role="img" aria-label="Stellenwerttafel mit Plättchen"><div class="sk">H</div><div class="sk">Z</div><div class="sk">E</div>${zelle(h,"H")}${zelle(z,"Z")}${zelle(e,"E")}</div>`;
}
function karten(h,z,e){              // übereinandergelegte Zahlenkarten
  const c=(ds,cls,top)=>`<span class="kc ${cls}" style="top:${top}px">${ds.map(d=>`<i>${d}</i>`).join("")}</span>`;
  return `<div class="karten" aria-hidden="true">${c([h,0,0],"kh",0)}${z?c([z,0],"kz",10):""}${e?c([e],"ke",20):""}</div>`;
}
function strahl(von,bis,schritt,beschrift,ziel){
  const W=600,L=26,R=574,y=62,x=v=>L+(v-von)/(bis-von)*(R-L);
  let s="";
  for(let v=von;v<=bis;v+=schritt){
    const big=(v-von)%beschrift===0, half=!big&&(v-von)%(beschrift/2)===0, h=big?14:half?10:6;
    s+=`<line x1="${x(v)}" x2="${x(v)}" y1="${y-h}" y2="${y+h}" stroke="#eaf3ec" stroke-width="${big?2.5:half?1.8:1.1}"/>`;
    if(big) s+=`<text x="${x(v)}" y="${y+36}" text-anchor="middle" font-size="17" fill="#eaf3ec" font-family="Fredoka,sans-serif">${v}</text>`;
  }
  const zx=x(ziel);
  return `<svg class="strahl" viewBox="0 0 ${W} 110" role="img" aria-label="Zahlenstrahl von ${von} bis ${bis} mit einem Pfeil">
    <line x1="${L-12}" x2="${R+12}" y1="${y}" y2="${y}" stroke="#eaf3ec" stroke-width="2.5"/>${s}
    <path d="M${zx} ${y-15} l-10 -16 h20 z" fill="#ffd45c"/><circle cx="${zx}" cy="${y-44}" r="13" fill="#ffd45c"/>
    <text x="${zx}" y="${y-38}" text-anchor="middle" font-size="18" font-weight="700" fill="#0f2a2e" font-family="Fredoka,sans-serif">?</text></svg>`;
}

/* ---------- Aufgabentypen ---------- */
const TYPEN=[
{
  id:"bloecke", name:"Hunderter, Zehner, Einer",
  erzeuge(st){
    const h=r(1,st===1?4:9), z=r(st===1?1:0,st===1?6:9), e=r(st===1?1:0,st===1?6:9), n=h*100+z*10+e;
    return {frage:"Wie heißt die Zahl?", bild:mab(h,z,e), loesung:[n],
      tipp:"Zähle zuerst die großen Platten (Hunderter), dann die Stangen (Zehner), dann die kleinen Würfel (Einer).",
      erklaerung:`${h} Hunderter, ${z} Zehner, ${e} Einer = ${n}`};
  }
},
{
  id:"kuerzel", name:"H Z E lesen",
  erzeuge(st){
    if(st>=2&&Math.random()<.35){
      const n=r(101,999), [h,z,e]=zer(n);
      return {frage:`Zerlege <b>${n}</b> in Hunderter, Zehner und Einer.`,
        vorlage:`{0} ${bunt("H","H")} {1} ${bunt("Z","Z")} {2} ${bunt("E","E")}`, loesung:[h,z,e],
        tipp:"Die erste Ziffer sagt die Hunderter, die zweite die Zehner, die letzte die Einer.",
        erklaerung:`${n} = ${h} H ${z} Z ${e} E`};
    }
    const h=r(1,9); let z=r(1,9), e=r(1,9);
    if(st>=2&&Math.random()<.6){ if(Math.random()<.5) z=0; else e=0; }
    if(st===3&&Math.random()<.2){ z=0; e=r(1,9); }
    const teile=[[h,"H"],[z,"Z"],[e,"E"]].filter(p=>p[0]);
    if(st===3) mischen(teile);
    const n=h*100+z*10+e;
    return {frage:"Welche Zahl ist das?", bild:`<div class="kz">${teile.map(([v,s])=>bunt(v+s,s)).join(" ")}</div>`, loesung:[n],
      vorlesen:"Welche Zahl ist das? "+teile.map(([v,s])=>v+" "+STELLE[s]).join(", "),
      tipp:(z===0||e===0)?"Fehlt eine Stelle, schreibst du dort eine 0.":"H heißt Hunderter, Z Zehner, E Einer. Geschrieben wird immer in der Reihenfolge H, Z, E.",
      erklaerung:`${h} H ${z} Z ${e} E = ${n}`};
  }
},
{
  id:"zahlwort", name:"Zahlwörter",
  erzeuge(st){
    if(st===1||Math.random()<.5){
      const h=r(1,9), z=st===1?r(2,9):r(0,9), e=st===1?r(1,9):r(0,9), n=h*100+z*10+e;
      return {frage:"Wie heißt die Zahl?", bild:`<div class="wort">${wortBunt(n)}</div>`, loesung:[n],
        vorlesen:"Wie heißt die Zahl? "+zahlwort(n),
        tipp:"Lies das Wort in Teilen. Zuerst kommen die Hunderter. Danach hörst du die Einer und erst am Ende die Zehner.",
        erklaerung:`${zahlwort(n)} = ${n}`};
    }
    let h,z,e; do{h=r(1,9);z=r(2,9);e=r(1,9)}while(z===e);
    const n=h*100+z*10+e, opts=new Set([n,h*100+e*10+z]);
    while(opts.size<3) opts.add(pick([(h%9+1)*100+z*10+e, z*100+h*10+e, h*100+z*10+(e%9+1)]));
    const optionen=mischen([...opts]).map(zahlwort);
    return {art:"wahl", frage:`Welches Zahlwort passt zu <b>${n}</b>?`, optionen, loesung:optionen.indexOf(zahlwort(n)),
      vorlesen:`Welches Zahlwort passt? Lies die drei Wörter genau.`,
      tipp:`Bei ${n} sagst du zuerst die Einer (${e}) und dann die Zehner (${z*10}).`,
      erklaerung:`${n} = ${zahlwort(n)}`};
  }
},
{
  id:"zerlegen", name:"Zahlenkarten zerlegen",
  erzeuge(st){
    let h=r(1,9), z=r(1,9), e=r(1,9);
    if(st>=2&&Math.random()<.4){ if(Math.random()<.5) z=0; else e=0; }
    const n=h*100+z*10+e, teile=[h*100,z*10,e].filter(Boolean);
    if(st>=2&&Math.random()<.4){
      const m=mischen([...teile]);
      return {frage:"Setze die Zahl zusammen.", vorlage:`${m.join(" + ")} = {0}`, loesung:[n],
        tipp:"Suche zuerst die Hunderter, dann die Zehner, dann die Einer.", erklaerung:`${m.join(" + ")} = ${n}`};
    }
    if(st===1) return {frage:`Zerlege <b>${n}</b> in Hunderter, Zehner und Einer.`, bild:karten(h,z,e),
      vorlage:`${n} = ${h*100} + {0} + {1}`, loesung:[z*10,e], beliebig:true,
      tipp:`Die Zehner-Karte zeigt ${z}0, die Einer-Karte ${e}.`, erklaerung:`${n} = ${teile.join(" + ")}`};
    return {frage:`Zerlege <b>${n}</b> wie mit Zahlenkarten.`, bild:karten(h,z,e),
      vorlage:`${n} = `+teile.map((_,i)=>`{${i}}`).join(" + "), loesung:teile, beliebig:true,
      tipp:teile.length<3?"Eine Null schreibst du nicht als eigenen Teil.":"Erst die Hunderter, dann die Zehner, dann die Einer.",
      erklaerung:`${n} = ${teile.join(" + ")}`};
  }
},
{
  id:"plaettchen", name:"Plättchen in der Stellenwerttafel",
  erzeuge(st){
    const max=st===1?5:8, h=r(1,st===1?4:7), z=r(st===1?1:0,max), e=r(st===1?1:0,max), n=h*100+z*10+e;
    if(st===1||Math.random()<.4) return {frage:"Wie heißt die Zahl?", bild:swt(h,z,e), loesung:[n],
      tipp:"Zähle die Plättchen in jeder Spalte. Jede Spalte ist eine Ziffer, eine leere Spalte ist eine 0.",
      erklaerung:`${h} H, ${z} Z, ${e} E = ${n}`};
    const s=pick(["H","Z","E"]), wert={H:100,Z:10,E:1}[s], anz={H:h,Z:z,E:e}[s];
    let art=Math.random()<.5?"dazu":"weg"; if(anz===0) art="dazu";
    const neu=n+(art==="dazu"?wert:-wert);
    return {frage:art==="dazu"?`Lege ein Plättchen zu den ${STELLE[s]}n. Welche Zahl entsteht?`:`Nimm ein Plättchen bei den ${STELLE[s]}n weg. Welche Zahl entsteht?`,
      bild:swt(h,z,e,{s,art}), loesung:[neu],
      tipp:`Ein Plättchen bei den ${STELLE[s]}n ist ${wert} ${art==="dazu"?"mehr":"weniger"}.`,
      erklaerung:`${n} ${art==="dazu"?"+":"−"} ${wert} = ${neu}`};
  }
},
{
  id:"nachbarn", name:"Nachbarzahlen & Zahlenkreuz",
  erzeuge(st){
    if(st>=2&&Math.random()<.5){
      let n=r(1,9)*100+r(1,8)*10+(st===3?pick([0,9]):r(1,8));
      return {frage:"Fülle das Zahlenkreuz aus dem Tausenderstreifen.",
        vorlage:`<div class="kreuz"><span></span>{0}<span></span>{1}<b>${n}</b>{2}<span></span>{3}<span></span></div>`,
        loesung:[n-10,n-1,n+1,n+10],
        tipp:"Links 1 weniger, rechts 1 mehr. Oben 10 weniger, unten 10 mehr.",
        erklaerung:`oben ${n-10}, links ${n-1}, rechts ${n+1}, unten ${n+10}`};
    }
    const n = st===1 ? r(1,9)*100+r(1,8)*10+r(1,8)
      : pick([r(1,9)*100, r(1,9)*100+r(1,9)*10, r(1,9)*100+r(0,9)*10+9]);
    return {frage:"Wie heißen Vorgänger und Nachfolger?",
      vorlage:`<div class="vn"><small>Vorgänger</small><small>Zahl</small><small>Nachfolger</small>{0}<b>${n}</b>{1}</div>`,
      loesung:[n-1,n+1], tipp:"Der Vorgänger ist 1 kleiner, der Nachfolger ist 1 größer.",
      erklaerung:`${n-1} – ${n} – ${n+1}`};
  }
},
{
  id:"zaehlen", name:"Weiterzählen",
  erzeuge(st){
    let start,step=1,dir=1;
    if(st===1){ start=r(1,9)*100+r(0,8)*10+r(5,7); }
    else if(st===2){ if(Math.random()<.5){dir=-1;start=r(1,9)*100+r(1,9)*10+r(2,3)} else {step=10;start=r(1,8)*100+r(5,7)*10+r(0,9)} }
    else { const v=r(1,3);
      if(v===1){dir=-1;start=r(2,9)*100+r(1,2)}
      else if(v===2){dir=-1;start=1000}
      else {dir=-1;step=10;start=r(2,9)*100+r(2,3)*10+r(0,9)} }
    const s=[0,1,2,3,4,5].map(k=>start+dir*step*k);
    return {frage:`Zähle ${dir>0?"vorwärts":"rückwärts"}${step===10?" in Zehnerschritten":""}.`,
      vorlage:`${s[0]}, ${s[1]}, ${s[2]}, {0}, {1}, {2}`, loesung:s.slice(3),
      tipp:dir>0?`Jede Zahl ist ${step} größer. Achte auf den Sprung über den Zehner oder Hunderter.`:`Jede Zahl ist ${step} kleiner. Achte auf den Sprung über den Zehner oder Hunderter.`,
      erklaerung:s.join(", ")};
  }
},
{
  id:"strahl", name:"Zahlenstrahl",
  erzeuge(st){
    let bild,ziel;
    if(st===1){ ziel=(2*r(0,9)+1)*50; bild=strahl(0,1000,10,100,ziel); }
    else if(st===2){ const a=r(0,9)*100; ziel=a+10*r(1,9); bild=strahl(a,a+100,10,100,ziel); }
    else { const a=r(0,8)*100; let k; do{k=r(1,19)}while(k===10); ziel=a+10*k; bild=strahl(a,a+200,10,100,ziel); }
    return {frage:"Welche Zahl zeigt der Pfeil?", bild, loesung:[ziel],
      tipp:st===1?"Zwischen zwei großen Strichen liegen 100. Der mittlere Strich ist die Hälfte: 50.":"Jeder kleine Strich ist 10 weiter. Zähle vom großen Strich davor in Zehnerschritten.",
      erklaerung:`Der Pfeil zeigt auf ${ziel}.`};
  }
},
{
  id:"ordnen", name:"Der Größe nach ordnen",
  erzeuge(st){
    let items;
    if(st===1||Math.random()<.5){
      const [a,b,c]=mischen([1,2,3,4,5,6,7,8,9]).slice(0,3);
      const perms=[[a,b,c],[a,c,b],[b,a,c],[b,c,a],[c,a,b],[c,b,a]].map(p=>p[0]*100+p[1]*10+p[2]);
      items=mischen(perms).slice(0,st===1?3:4); items.push(pick([a*10+b,b*10+c,c*10+a]));
    } else {
      const base=r(2,9)*100; items=[base,base-r(1,9),base+r(1,9),r(100,base-100),r(10,99)];
    }
    items=mischen([...new Set(items)]);
    const sortiert=[...items].sort((x,y)=>x-y);
    return {art:"reihe", frage:"Tippe die Zahlen der Größe nach an. Beginne mit der kleinsten.", items, loesung:sortiert,
      tipp:"Vergleiche zuerst die Hunderter. Sind sie gleich, vergleiche die Zehner. Zweistellige Zahlen sind kleiner als dreistellige.",
      erklaerung:sortiert.join(" &lt; ")};
  }
}
];

THEMEN.push({
  id:"zahlen1000", name:"Zahlen bis 1000", klasse:"Mathe 3. Klasse",
  beschreibung:"Zahlen lesen, darstellen, zerlegen, ordnen und am Zahlenstrahl finden.",
  icon:'<text x="50" y="61" text-anchor="middle" font-family="Fredoka,sans-serif" font-size="27" font-weight="600" fill="#ffd45c">1000</text>',
  typen:TYPEN
});
})();
