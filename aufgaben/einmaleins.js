/* Leuchtwald · Lernpfad-Thema „Einmaleins“ (Wiederholung, 3. Klasse)
   Kurzes zweites Thema – zeigt auch, wie wenig Code ein neues Thema braucht. */
(function(){
"use strict";
const THEMEN = window.LW_THEMEN = window.LW_THEMEN || [];
const r=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const KERN=[1,2,5,10];

THEMEN.push({
  id:"einmaleins", name:"Einmaleins", klasse:"Wiederholung",
  beschreibung:"Mal- und Geteiltaufgaben, Nachbaraufgaben.",
  icon:'<text x="50" y="62" text-anchor="middle" font-family="Fredoka,sans-serif" font-size="32" font-weight="600" fill="#86cfa2">1·1</text>',
  typen:[
    { id:"mal", name:"Malaufgaben",
      erzeuge(st){
        let a=st===1?pick(KERN):r(2,9), b=st===1?r(1,10):r(2,10);
        if(Math.random()<.5) [a,b]=[b,a];
        return {frage:"Rechne.", vorlage:`${a} · ${b} = {0}`, loesung:[a*b], vorlesen:`${a} mal ${b}`,
          tipp:"Nutze eine leichte Aufgabe: mal 2, mal 5 oder mal 10 – und rechne von dort weiter.",
          erklaerung:`${a} · ${b} = ${a*b}`};
      } },
    { id:"geteilt", name:"Geteiltaufgaben",
      erzeuge(st){
        const a=st===1?pick([2,5,10]):r(2,9), b=r(1,10), p=a*b;
        return {frage:"Rechne.", vorlage:`${p} : ${a} = {0}`, loesung:[b], vorlesen:`${p} geteilt durch ${a}`,
          tipp:`Denk an die Malaufgabe: Welche Zahl mal ${a} ergibt ${p}?`,
          erklaerung:`${p} : ${a} = ${b}, denn ${b} · ${a} = ${p}`};
      } },
    { id:"nachbar", name:"Nachbaraufgaben",
      erzeuge(st){
        const a=st===1?r(2,5):r(3,9);
        return {frage:"Rechne. Die zweite Aufgabe ist die Nachbaraufgabe.",
          vorlage:`<span class="zl">${a} · ${a} = {0}</span><span class="zl">${a+1} · ${a} = {1}</span>`,
          loesung:[a*a,(a+1)*a], tipp:`Die zweite Aufgabe ist genau ${a} mehr als die erste.`,
          erklaerung:`${a} · ${a} = ${a*a}, also ${a+1} · ${a} = ${a*a} + ${a} = ${(a+1)*a}`};
      } }
  ]
});
})();
