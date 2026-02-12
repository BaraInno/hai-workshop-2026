# Statische Prompt-Review – Workshop-Website

Review aller 13 Prompts: Klarheit, Lücken, Risiken, konkrete Änderungsvorschläge. Du kannst danach gezielt durchtesten und nur dort nachschärfen, wo es sinnvoll ist.

---

## 1. Zielbild – KI-Sparringpartner

**Stärken:** Klare Rolle, nummeriertes Vorgehen, „Starte mit der ersten Frage“ gibt klaren Einstieg. Punkt 3 (einzeln vs. alle 10) und 4 (Spracheingabe) sind workshop-tauglich.

**Risiken / Lücken:**
- „10 Fragen“ in Punkt 3 – die KI könnte sich sklavisch an genau 10 halten oder zu viele/few stellen.
- „Artefakt“ (Punkt 5) – in ChatGPT ist „Artefakt“ ein spezieller Begriff (z.B. Code/Preview); nicht alle Modelle/UI unterstützen das gleich. Die KI könnte eine normale nummerierte Liste liefern statt ein Artefakt zu „erstellen“.

**Vorschläge:**
- Optional: „ca. 8–10 Fragen“ statt „alle 10 Fragen“, damit die KI flexibel bleibt.
- Klarstellen: „Erstelle eine **nummerierte Liste** (als übersichtliche Antwort im Chat, nicht als separates Artefakt, falls du keine Artefakte nutzen kannst).“
- Oder beibehalten, wenn ihr im Workshop explizit mit ChatGPT-Artefakten arbeitet – dann evtl. ergänzen: „Nutze ein Artefakt, wenn deine Oberfläche das anbietet.“

**Fazit:** Klein nachschärfbar (Artefakt vs. Liste, Anzahl Fragen). Sonst gut einsetzbar.

---

## 2. Zielbild – Foto & Listen zusammenführen

**Stärken:** Klare Schritte, klare Markierungen [📝 VON MIR] und [⭐ ÜBERSCHNEIDUNG], Abschluss mit Zusammenfassung.

**Risiken / Lücken:**
- Ohne Foto: Die KI weiß nicht, was „bestehende Liste“ ist (kommt aus dem vorherigen Sparringpartner-Chat). In einem **neuen Chat** ohne Kontext fehlt die Referenz.
- „Füge alle Punkte zu unserer bestehenden Liste hinzu“ – wenn es keine bestehende Liste im Chat gibt, kann die KI raten oder nachfragen.

**Vorschläge:**
- Auf der Website einen Kurzhinweis: „Dieser Prompt gehört in **denselben Chat** wie den Sparringpartner – dort gibt es schon eine Liste.“
- Optional im Prompt ergänzen: „Falls in diesem Chat noch keine Liste existiert, erstelle aus dem Foto eine neue Liste und markiere alle Punkte mit [📝 VON MIR].“

**Fazit:** In der echten Workshop-Folge (gleicher Chat) passt er. Für Tests in neuem Chat: Hinweis oder Fallback-Formulierung einbauen.

---

## 3. Fitness – Erklärbär

**Stärken:** Klare Rolle, „Geheimrezept“ (Analogien), Platzhalter für Hobby, kurze Erklärungen, „frag nach“ bei Unsicherheit. Guter Einstieg mit Vorstellung + Frage.

**Risiken / Lücken:**
- Platzhalter **[HIER DEIN HOBBY ...]** – wenn jemand vergisst zu ersetzen, antwortet die KI evtl. mit generischen Analogien oder fragt nach.
- „max. 3–4 Sätze“ – manche Modelle neigen zu längeren Erklärungen.

**Vorschläge:**
- Auf der Website bei der Prompt-Box deutlich machen: **„Vor dem Kopieren: [HIER DEIN HOBBY ...] durch dein eigenes Hobby ersetzen (z.B. Tennis, Yoga).“**
- Optional im Prompt: „Halte jede Erklärung **strikt** auf max. 3–4 Sätze. Wenn du mehr sagen willst, fasse dich in einem Folgesatz zusammen.“

**Fazit:** Sehr gut nutzbar. Wichtigster Hebel: Teilnehmer darauf hinweisen, den Platzhalter zu ersetzen.

---

## 4.–8. Fitness – Geburtstagskarte (5.1 bis 5.5)

**Stärken:** Gute Steigerung (einfach → +Wer → +Wie → +Warum → +⭐). Zeigt das WWW⭐️-Framework sehr klar. 5.5 mit „Was musst du von mir wissen?“ ist ein starkes Beispiel für den ⭐-Teil.

**Risiken / Lücken:**
- 5.1: Sehr knapp – Absicht für den Workshop („schwacher Prompt“), passt.
- 5.3: „genau 4 Zeilen“ – die KI könnte 4 Zeilen + Leerzeile oder 4 „Verse“ mit je mehreren Zeilen liefern. Kleines Interpretationsrisiko.
- 5.5: „Bevor du loslegst“ – manche Modelle antworten trotzdem sofort mit einem Text und stellen die Fragen danach; nicht kritisch, aber im Workshop ggf. erwähnen („Ideal: Erst Fragen, dann Text“).

**Vorschläge:**
- 5.3 optional präzisieren: „Der Text soll **genau 4 Zeilen** haben (4 Zeilen Text, keine Strophen mit mehreren Zeilen).“
- Ansonsten: so lassen und beim Durchtesten schauen, ob die Karte wirklich 4 Zeilen hat.

**Fazit:** Sehr gut für den Workshop. Nur 5.3 bei Bedarf einen Tick präziser machen.

---

## 9. Fitness – Promptmaestro (Systemprompt)

**Stärken:** Klares 5-Schritte-Schema, WWW⭐️ verankert, „erkläre WARUM“ unterstützt Lernen, finale kopierbare Version. Du, Deutsch, freundlich – passt.

**Risiken / Lücken:**
- „ANALYSIERE … identifiziere, was fehlt“ – die KI könnte zu viel ergänzen (Over-Engineering) oder zu wenig. Kein explizites „halte den Prompt nah am User-Wunsch“.
- Schritt 4 und 5: Sollen die ⭐-Fragen **vor** der finalen Version kommen? Das steht so da – gut. Manche Modelle liefern aber sofort einen „finalen“ Prompt und fragen danach; eine kurze Klarstellung hilft.

**Vorschläge:**
- Optional ergänzen nach Schritt 1: „Erfinde nichts dazu, was der User nicht gebraucht haben könnte – ergänze nur, was für **bessere Ergebnisse** sinnvoll ist.“
- Optional bei Schritt 4: „Stelle die ⭐-Fragen **bevor** du die finale Prompt-Version schreibst. Warte auf die Antworten des Users.“

**Fazit:** Sehr gut. Kleine Klarstellungen können Over-Engineering reduzieren und die Reihenfolge (Fragen → dann finale Version) absichern.

---

## 10. Fitness – Custom Instructions

**Stärken:** Klare Themenblöcke, „eine Frage nach der anderen“, Spracheingabe berücksichtigt, 1.500-Zeichen-Limit klar genannt. „Starte mit der ersten Frage“ gibt Richtung.

**Risiken / Lücken:**
- 1.500 Zeichen – bei sehr ausführlichen Antworten könnte die KI am Ende zu viel kürzen oder Prioritäten unklar setzen. „Priorisiere das Wichtigste“ ist schon drin – gut.
- „Fasse das Wichtigste zusammen“ bei Spracheingabe – ausreichend; die KI weiß, dass Transkripte lang sein können.

**Vorschläge:**
- Optional: „Wenn du am Zeichenlimit bist: Bevorzuge **beruflichen Kontext, Aufgaben mit KI und Ton/Format**; weniger wichtige Details weglassen.“
- Ansonsten so lassen und beim Test prüfen: Bleibt die Zusammenfassung unter 1.500 und trotzdem nutzbar?

**Fazit:** Sehr gut. Optional eine Zeile zur Priorisierung bei Zeichenknappheit.

---

## 11. Fitness – Tone-of-Voice: Schreibstil analysieren

**Stärken:** Klare 5 Punkte (Tonalität, Struktur, Wortwahl, Besonderheiten, Muster), „strukturierte Liste“ als Format.

**Risiken / Lücken:**
- „Ich habe dir … angehängt“ – ohne Anhang antwortet die KI oft mit „Bitte E-Mails anhängen“ oder bietet Beispiele an. Das ist in Ordnung für den Workshop (mit Anhang).
- Keine Vorgabe zur Länge: Analyse kann sehr lang werden.

**Vorschläge:**
- Optional: „Halte die Analyse auf **ca. 1 Seite** (übersichtlich, aber vollständig).“
- Auf der Website: Kurz hinweisen, dass 5 echte E-Mails als Anhang mitgeschickt werden sollen.

**Fazit:** Gut. Mit Anhang passt er; optional Länge begrenzen.

---

## 12. Fitness – Tone-of-Voice: Systemprompt erstellen

**Stärken:** „Basierend auf deiner Analyse“ verknüpft mit Step 11. Klare Anforderungen (Merkmale, 2–3 Beispiele, kopierbar). Format „direkt in GPT-Assistent“ ist klar.

**Risiken / Lücken:**
- Ohne vorherige Analyse im Chat: Die KI hat keinen Stil-Kontext und wird nach Analyse oder Beispielen fragen – erwartbar und in Ordnung.
- „Kompakt genug“ – unbestimmt; manche Modelle liefern sehr lange Systemprompts.

**Vorschläge:**
- Optional: „Der Systemprompt soll **max. 300–400 Wörter** haben, damit er als Anweisung gut nutzbar bleibt.“
- Oder: „Priorisiere die 5–7 wichtigsten Stilmerkmale; nicht jeden Satz aus der Analyse übernehmen.“

**Fazit:** Gut. Optional Wort- oder Längenlimit, damit der Systemprompt nicht ausufert.

---

## 13. Leidenschaft – Leidenschafts-Verstärker

**Stärken:** Klare Rolle, 3 Einstiegsfragen (eine nach der anderen), konkrete Erwartungen (5 Wege, 3 Mini-Projekte, erster Schritt HEUTE). „Nicht nur träumen – machen“ und „konkret und umsetzbar“ sind stark. Deutsch, Du.

**Risiken / Lücken:**
- „DIESE WOCHE“ und „HEUTE“ – wenn jemand am Freitag testet, könnte die KI zu wörtlich „diese Woche“ nehmen (nur 2–3 Tage). Kein grober Fehler.
- „eine nach der anderen, warte auf meine Antwort“ – manche Modelle stellen trotzdem alle 3 Fragen auf einmal; eine kurze Wiederholung kann helfen.

**Vorschläge:**
- Optional bei den 3 Fragen: „Stelle **nur die erste Frage** und warte auf meine Antwort. Dann die nächste.“
- Ansonsten so lassen; die Formulierung ist schon klar.

**Fazit:** Sehr gut. Nur wenn die KI alle 3 Fragen auf einmal stellt, die „eine nach der anderen“-Zeile verstärken.

---

## Übersicht: Wo lohnt sich Nachschärfen?

| # | Prompt | Priorität Anpassung | Empfehlung |
|---|--------|----------------------|------------|
| 1 | Sparringpartner | Niedrig | Optional: „Artefakt“ vs. „Liste“ klären, „ca. 8–10 Fragen“. |
| 2 | Foto & Listen | Niedrig | Hinweis auf Website: „Gleicher Chat wie Sparringpartner“. Optional Fallback wenn keine Liste da. |
| 3 | Erklärbär | Mittel | Auf Website: „Platzhalter [HOBBY] vor dem Kopieren ersetzen.“ |
| 4–8 | Geburtstagskarte | Niedrig | Optional 5.3: „genau 4 Zeilen“ präzisieren. |
| 9 | Promptmaestro | Niedrig | Optional: „Fragen vor finale Version“ + „nicht over-engineeren“. |
| 10 | Custom Instructions | Niedrig | Optional: Priorisierung bei Zeichenlimit. |
| 11 | ToV Analyse | Niedrig | Optional: „ca. 1 Seite“. Website: Hinweis auf Anhang. |
| 12 | ToV Systemprompt | Niedrig | Optional: max. 300–400 Wörter. |
| 13 | Leidenschafts-Verstärker | Niedrig | Optional: „Nur erste Frage, dann warten.“ |

---

**Kurzfassung:** Keine Prompts sind „kaputt“. Die meisten Änderungen sind optional und machen das Verhalten etwas vorhersehbarer (Artefakt/Liste, Platzhalter ersetzen, Länge/Priorisierung). Beim Durchtesten kannst du besonders auf **1 (Liste vs. Artefakt), 2 (gleicher Chat), 3 (Platzhalter)** und **5.3 (4 Zeilen)** achten – der Rest kann so bleiben oder mit den optionalen Tipps verfeinert werden.
