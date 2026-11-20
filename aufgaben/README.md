# Aufgaben für die Lernpfade

Ein Lernpfad läuft so ab: **Leuchtatem → 3 Aufgaben → Spiel → 3 Aufgaben → Spiel → 3 Aufgaben → Ergebnis.**
Block 1 nutzt Stufe 1, Block 2 Stufe 2, Block 3 Stufe 3. Was beim ersten Versuch nicht klappt, kommt im nächsten Block als Erstes noch einmal (neue Zahlen, gleicher Typ).

Einstellbar oben im Lernpfad-Abschnitt von `index.html`: `BLOECKE`, `PRO_BLOCK`, `SPIELFOLGE`.

## Neues Thema anlegen

1. Datei in `aufgaben/` anlegen, z. B. `aufgaben/plus-minus-1000.js`.
2. In `index.html` vor dem Hauptskript einbinden:
   `<script src="aufgaben/plus-minus-1000.js"></script>`
3. Fertig – das Thema erscheint als Karte unter „Lernpfade“, Sterne und Verlauf laufen automatisch mit.

```js
(function(){
const THEMEN = window.LW_THEMEN = window.LW_THEMEN || [];
const r=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
THEMEN.push({
  id:"plusminus",                 // eindeutig, nie mehr ändern (Verlauf hängt daran)
  name:"Plus und Minus bis 1000",
  klasse:"Mathe 3. Klasse",
  beschreibung:"Rechnen mit Hundertern und Zehnern.",
  icon:'<text x="50" y="62" text-anchor="middle" font-size="32" fill="#ffd45c">+−</text>',
  typen:[
    { id:"hplus", name:"Hunderter plus",
      erzeuge(stufe){             // stufe = 1, 2 oder 3
        const a=r(1,5)*100, b=r(1,4)*100;
        return { frage:"Rechne.", vorlage:`${a} + ${b} = {0}`, loesung:[a+b],
                 tipp:"Rechne mit den Hundertern wie mit Einern: 3 H + 2 H = 5 H.",
                 erklaerung:`${a} + ${b} = ${a+b}` };
      } }
  ]
});
})();
```

## Was `erzeuge(stufe)` zurückgeben kann

| Feld | Bedeutung |
|---|---|
| `frage` | Aufgabentext (HTML erlaubt) |
| `bild` | optional: HTML/SVG über der Eingabe |
| `art` | `"eingabe"` (Standard), `"wahl"` oder `"reihe"` |
| `vorlage` | bei `eingabe`: Text mit Platzhaltern `{0}`, `{1}` … für Eingabefelder (Standard `"{0}"`) |
| `loesung` | `eingabe`: Zahlen je Feld · `wahl`: Index der richtigen Option · `reihe`: richtige Reihenfolge |
| `beliebig` | bei `eingabe`: `true`, wenn die Reihenfolge der Felder egal ist (z. B. Zerlegen) |
| `optionen` | bei `wahl`: Liste der Antworttexte |
| `items` | bei `reihe`: Zahlen zum Antippen |
| `tipp` | erscheint nach dem ersten Fehlversuch |
| `erklaerung` | erscheint nach dem zweiten Fehlversuch zusammen mit der Lösung |
| `vorlesen` | optional: Text für den Vorlesen-Knopf (sonst `frage` ohne HTML) |

Fertige Bausteine zum Abschauen in `zahlen-bis-1000.js`: Mehrsystemblöcke (`mab`), Stellenwerttafel mit Plättchen (`swt`), Zahlenkarten (`karten`), Zahlenstrahl (`strahl`), Zahlwörter (`zahlwort`).
