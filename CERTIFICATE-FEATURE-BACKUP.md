# Certificate Feature – Backup für zukünftige Projekte

Diese Funktion generiert ein Workshop-Zertifikat als Canvas-Bild (1200×675 px),
das als PNG heruntergeladen oder auf LinkedIn geteilt werden kann.

## Was es macht
- Generiert ein personalisiertes Zertifikat mit Name, Datum, Fortschritt
- Download als PNG
- Share-Button für LinkedIn
- Zeigt die drei Säulen (Zielbild, Fitness, Leidenschaft) mit individuellem Fortschritt

## HTML (in dashboard.html einfügen)

```html
<!-- Section: Certificate -->
<div class="certificate-section scroll-animate">
    <h3>Dein HAI-Zertifikat 🎓</h3>
    <p>Erstelle ein Zertifikat deiner Workshop-Teilnahme – perfekt zum Teilen auf LinkedIn!</p>
    <button class="btn btn-primary btn-lg" id="generateCertBtn">Zertifikat erstellen 🎓</button>
    <div class="mt-3">
        <canvas id="certificate-canvas" class="hidden"></canvas>
    </div>
    <div class="btn-group mt-2" style="justify-content:center;">
        <button class="btn btn-primary hidden" id="downloadCertBtn" onclick="downloadCertificate()">💾 Als Bild speichern</button>
        <button class="btn btn-secondary hidden" id="shareCertBtn" onclick="shareCertificate()">🔗 Auf LinkedIn teilen</button>
    </div>
</div>
```

## JavaScript (in app.js einfügen)

### Initialisierung (im DOMContentLoaded aufrufen)
```javascript
if (document.body.dataset.page === 'dashboard') { initDashboard(); initCertificate(); }
```

### Funktionen

```javascript
// === Certificate Generator ===
function initCertificate() {
    const btn = document.getElementById('generateCertBtn');
    if (!btn) return;
    btn.addEventListener('click', generateCertificate);
}

function generateCertificate() {
    const canvas = document.getElementById('certificate-canvas');
    if (!canvas) return;
    canvas.width = 1200;
    canvas.height = 675;
    canvas.classList.remove('hidden');
    const ctx = canvas.getContext('2d');

    const name = getUserName() || 'Teilnehmer:in';
    const done = getTotalDone();
    const total = 24;
    const today = new Date().toLocaleDateString('de-AT', { year: 'numeric', month: 'long', day: 'numeric' });

    // Background
    ctx.fillStyle = '#FAF8F6';
    ctx.fillRect(0, 0, 1200, 675);

    // Top bar
    ctx.fillStyle = '#0D5F6F';
    ctx.fillRect(0, 0, 1200, 6);

    // Gold accent line
    ctx.fillStyle = '#F5A623';
    ctx.fillRect(80, 160, 60, 4);

    // Title
    ctx.font = '700 18px Work Sans';
    ctx.fillStyle = '#6B6B6B';
    ctx.textAlign = 'left';
    ctx.fillText('HAI 2026 WORKSHOP', 80, 120);

    ctx.font = '400 48px DM Serif Display, Georgia, serif';
    ctx.fillStyle = '#2C2C2C';
    ctx.fillText('Workshop Zertifikat', 80, 220);

    // Name
    ctx.font = '400 36px DM Serif Display, Georgia, serif';
    ctx.fillStyle = '#0D5F6F';
    ctx.fillText(name, 80, 300);

    // Description
    ctx.font = '400 16px Work Sans';
    ctx.fillStyle = '#6B6B6B';
    ctx.fillText(`hat am HAI 2026 Workshop erfolgreich teilgenommen`, 80, 350);
    ctx.fillText(`und ${done} von ${total} Schritten abgeschlossen.`, 80, 378);

    // Date
    ctx.fillText(today, 80, 430);

    // Three pillars
    const pillars = [
        { emoji: '🎯', label: 'KI-Zielbild', done: getAreaStepsDone('zielbild'), total: 7 },
        { emoji: '💪', label: 'KI-Fitness', done: getAreaStepsDone('fitness'), total: 12 },
        { emoji: '🔥', label: 'Leidenschaft', done: getAreaStepsDone('leidenschaft'), total: 5 },
    ];
    let px = 80;
    pillars.forEach(p => {
        ctx.font = '28px serif';
        ctx.fillText(p.emoji, px, 510);
        ctx.font = '600 14px Work Sans';
        ctx.fillStyle = '#2C2C2C';
        ctx.fillText(p.label, px + 40, 505);
        ctx.font = '400 13px Work Sans';
        ctx.fillStyle = '#6B6B6B';
        ctx.fillText(`${p.done}/${p.total} Schritte`, px + 40, 525);
        px += 200;
    });

    // Equation at bottom
    ctx.font = 'italic 400 18px DM Serif Display, Georgia, serif';
    ctx.fillStyle = '#0D5F6F';
    ctx.textAlign = 'center';
    ctx.fillText('HAI = Ich × FaktorAI', 600, 620);

    // Bottom bar
    ctx.fillStyle = '#F5A623';
    ctx.fillRect(0, 669, 1200, 6);

    // Right side decoration
    ctx.fillStyle = 'rgba(245,166,35,0.08)';
    ctx.beginPath();
    ctx.arc(1100, 300, 250, 0, Math.PI * 2);
    ctx.fill();

    // Show download button
    const dlBtn = document.getElementById('downloadCertBtn');
    if (dlBtn) dlBtn.classList.remove('hidden');
    const shareBtn = document.getElementById('shareCertBtn');
    if (shareBtn) shareBtn.classList.remove('hidden');
}

function downloadCertificate() {
    const canvas = document.getElementById('certificate-canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `HAI2026-Zertifikat-${getUserName() || 'Workshop'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function shareCertificate() {
    const name = getUserName() || '';
    const text = encodeURIComponent(`Ich habe gerade den HAI 2026 Workshop abgeschlossen! 🎯💪🔥 FaktorAI = Zielbild × Fitness × Leidenschaft #HAI2026 #KI #Workshop`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&title=${text}`, '_blank');
}
```

## CSS (certificate-section Styles)

```css
.certificate-section {
    text-align: center;
    padding: 3rem 2rem;
    background: var(--teal-light);
    border-radius: var(--radius-lg);
    margin: 2rem 0;
}
.certificate-section canvas {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    margin-top: 1rem;
}
```

## Abhängigkeiten
- `getUserName()` – liest den Namen aus localStorage
- `getTotalDone()` – zählt alle erledigten Schritte
- `getAreaStepsDone(area)` – zählt erledigte Schritte pro Bereich
- Google Fonts: DM Serif Display, Work Sans (müssen geladen sein für Canvas-Rendering)

## Anpassung für andere Projekte
- Farben in den `ctx.fillStyle` Werten ändern
- Texte anpassen (Workshop-Name, Beschreibung, Pillars)
- `total` und `pillars`-Array an die Projekt-Struktur anpassen
- LinkedIn-Share-Text anpassen
