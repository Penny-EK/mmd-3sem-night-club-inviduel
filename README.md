# Eksamensopgave – Night Club

Gruppe: Skimmelsvampene
Medlemmer: Penny Vera Weber Kristiansen, Bjørn Sanboli og Meleese Theresa Spoon Kærhavn

Dette repository indeholder vores eksamensopgave Night Club.
Projektet er bygget med React og Next.js og har fokus på komponentbaseret struktur og  gradvis udvidelse med funktionalitet ud over pensum. Vi har desuden stylet sitet ved brug af Tailwind CSS.

README’en fungerer som en kort gennemgang af vores struktur, navngivning og måde at arbejde på, så det er lettere at følge projektet og vores tanker bag.


## Gennemgang af syntax

Herunder er de generelle regler, vi har fulgt i projektet ift. navngivning, mappestruktur og organisering.
Formålet er at give et hurtigt overblik over, hvordan koden er bygget op, og hvordan vi har arbejdet.

### Navngivning

Mappenavne: snake_case

Funktionsnavne: camelCase

Komponenter: PascalCase med .jsx

Dette er gjort for at holde en tydelig forskel mellem funktioner, komponenter og mapper, og for at gøre koden nemmere at læse.

### Mappestruktur

Forsiden ligger i src/app/page.js.
Her importeres de nødvendige komponenter og sammensættes i den rækkefølge, de vises på siden.

Header-komponenten er placeret direkte i page.js, da forsiden har et andet layout end resten af sitet.
Footer-komponenten ligger i layout.js, da den bruges på alle sider.

Hver underside på sitet har sin egen mappe med en page.js.
Dette gælder blandt andet siderne blog, blog-post/[id], contact og tables.
Inde i hver page importeres de komponenter, der hører til den specifikke side.

Komponenterne er opdelt efter, hvem i gruppen der har lavet dem.
Hvert gruppemedlem har en route group (paranteser omkring navnet), så det er nemt at se, hvem der har arbejdet med hvad.

Vores arbejdsproces har været iterativ. Først har vi fokuseret på at få hele sitet til at fungere grundlæggende. Herefter har vi gennemgået løsningen og løbende forbedret og udvidet den med ny viden og funktioner, herunder elementer uden for pensum. Ældre eller erstattede komponenter er flyttet til mappen _archive_, så det stadig er muligt at se tidligere løsninger og udviklingen i vores tilgang.






