/* ============================================
   HAI 2026 Workshop – FaktorAI
   Shared Application Logic
   ============================================ */

// === Storage Keys ===
const STORAGE_PREFIX = 'hai_workshop_';
const KEY_NAME = STORAGE_PREFIX + 'name';
const KEY_PROGRESS = STORAGE_PREFIX + 'progress';

// === Progress Management ===
function getProgress() {
    try { return JSON.parse(localStorage.getItem(KEY_PROGRESS)) || {}; }
    catch { return {}; }
}
function saveProgress(data) {
    localStorage.setItem(KEY_PROGRESS, JSON.stringify(data));
}
function isStepDone(area, step) {
    const p = getProgress();
    return p[area] && p[area][step] === true;
}
function setStepDone(area, step) {
    const p = getProgress();
    if (!p[area]) p[area] = {};
    p[area][step] = true;
    saveProgress(p);
}
function getAreaStepsDone(area) {
    const p = getProgress();
    if (!p[area]) return 0;
    return Object.values(p[area]).filter(v => v === true).length;
}
function getTotalDone() {
    const p = getProgress();
    let count = 0;
    for (const area of Object.values(p)) {
        count += Object.values(area).filter(v => v === true).length;
    }
    return count;
}

// === Name / Personalization ===
function getUserName() { return localStorage.getItem(KEY_NAME) || ''; }
function setUserName(name) { localStorage.setItem(KEY_NAME, name.trim()); }
function personalize(text) {
    const name = getUserName();
    return name ? text.replace(/\[Name\]/g, name) : text.replace(/,?\s*\[Name\]/g, '');
}
function personalizeAll() {
    document.querySelectorAll('[data-personalize]').forEach(el => {
        el.textContent = personalize(el.getAttribute('data-personalize'));
    });
}

// === Navigation – scroll detection ===
function initNav() {
    const nav = document.querySelector('.top-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
}

// === Steps Accordion ===
function initSteps() {
    const area = document.body.dataset.area;
    if (!area) return;
    const steps = document.querySelectorAll('.step');
    const totalSteps = steps.length;
    let activeIndex = -1;

    // Restore completed state
    steps.forEach((step, i) => {
        const stepId = step.dataset.step;
        if (isStepDone(area, stepId)) {
            step.classList.remove('active', 'locked');
            step.classList.add('completed');
            step.querySelector('.step-number').textContent = '✓';
        }
    });

    // Find first non-completed step
    const firstOpen = [...steps].findIndex(s => !s.classList.contains('completed'));
    if (firstOpen >= 0) {
        activateStep(firstOpen);
    }

    // Allow toggling completed steps
    steps.forEach((step, i) => {
        step.querySelector('.step-header').addEventListener('click', () => {
            if (step.classList.contains('completed')) {
                step.classList.toggle('expanded');
            }
        });
    });

    // Complete buttons
    document.querySelectorAll('.step-complete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const step = btn.closest('.step');
            const stepId = step.dataset.step;
            const idx = [...steps].indexOf(step);
            completeStep(step, stepId, idx);
        });
    });

    function activateStep(index) {
        steps.forEach((s, i) => {
            if (s.classList.contains('completed')) return;
            if (i === index) {
                s.classList.add('active');
                s.classList.remove('locked');
                activeIndex = i;
            } else if (i > index) {
                s.classList.remove('active');
                s.classList.add('locked');
            } else {
                s.classList.remove('active', 'locked');
            }
        });
    }

    function completeStep(stepEl, stepId, index) {
        setStepDone(area, stepId);
        stepEl.classList.remove('active');
        stepEl.classList.add('completed');
        const num = stepEl.querySelector('.step-number');
        num.textContent = '✓';
        num.classList.add('animate-check');

        // Small celebration
        miniCelebrate(stepEl);

        // Update progress
        updateChapterProgress();

        // Check if chapter is complete
        const doneCount = getAreaStepsDone(area);
        if (doneCount >= totalSteps) {
            setTimeout(() => bigCelebrate(), 600);
            return;
        }

        // Open next step
        const next = index + 1;
        if (next < steps.length) {
            setTimeout(() => {
                activateStep(next);
                steps[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);
        }
    }
}

// === Sub-Steps ===
function initSubSteps() {
    document.querySelectorAll('.sub-steps').forEach(container => {
        const area = document.body.dataset.area;
        const parentStep = container.closest('.step');
        const parentStepId = parentStep ? parentStep.dataset.step : '';
        const subs = container.querySelectorAll('.sub-step');

        // Restore state
        subs.forEach(sub => {
            const subId = sub.dataset.substep;
            const fullId = parentStepId + '_' + subId;
            if (isStepDone(area, fullId)) {
                sub.classList.remove('active', 'locked');
                sub.classList.add('completed');
                sub.querySelector('.sub-step-number').textContent = '✓';
            }
        });

        // Activate first non-completed
        const firstOpen = [...subs].findIndex(s => !s.classList.contains('completed'));
        if (firstOpen >= 0) activateSubStep(subs, firstOpen);

        // Complete buttons
        container.querySelectorAll('.sub-step-complete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const sub = btn.closest('.sub-step');
                const subId = sub.dataset.substep;
                const fullId = parentStepId + '_' + subId;
                const idx = [...subs].indexOf(sub);

                setStepDone(area, fullId);
                sub.classList.remove('active');
                sub.classList.add('completed');
                sub.querySelector('.sub-step-number').textContent = '✓';
                miniCelebrate(sub);

                // Check if all sub-steps done
                const allDone = [...subs].every(s => s.classList.contains('completed'));
                if (allDone) {
                    // Auto-complete parent step after brief pause
                    const parentBtn = parentStep.querySelector(':scope > .step-content > .step-complete-btn');
                    if (parentBtn) {
                        setTimeout(() => parentBtn.click(), 500);
                    }
                    return;
                }

                const next = idx + 1;
                if (next < subs.length) {
                    setTimeout(() => activateSubStep(subs, next), 300);
                }
            });
        });
    });

    function activateSubStep(subs, index) {
        subs.forEach((s, i) => {
            if (s.classList.contains('completed')) return;
            if (i === index) {
                s.classList.add('active');
                s.classList.remove('locked');
            } else if (i > index) {
                s.classList.remove('active');
                s.classList.add('locked');
            }
        });
    }
}

// === Prompt Copy ===
function initPromptCopy() {
    document.querySelectorAll('.prompt-copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const box = btn.closest('.prompt-box');
            const content = box.querySelector('.prompt-box-content');
            const text = content.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                const original = btn.innerHTML;
                btn.innerHTML = '✓ Kopiert!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(() => {
                // Fallback
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                const original = btn.innerHTML;
                btn.innerHTML = '✓ Kopiert!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    });
}

// === Chapter Progress ===
function updateChapterProgress() {
    const area = document.body.dataset.area;
    if (!area) return;
    const total = document.querySelectorAll('.step').length;
    const done = getAreaStepsDone(area);

    // Update progress bar
    const fill = document.querySelector('.chapter-progress-fill');
    const text = document.querySelector('.chapter-progress-text');
    if (fill) fill.style.width = `${(done / total) * 100}%`;
    if (text) text.textContent = `${done}/${total} Schritte`;

    // Update nav progress
    const navText = document.querySelector('.top-nav-progress-text');
    if (navText) navText.textContent = `${done}/${total}`;

    // Update progress ring
    updateProgressRing(done, total);
}

function updateProgressRing(done, total) {
    const ring = document.querySelector('.ring-fill');
    if (!ring) return;
    const radius = ring.getAttribute('r');
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (done / total) * circumference;
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = offset;
}

// === Celebrations ===
function miniCelebrate(element) {
    // Quick green pulse effect
    const pulse = document.createElement('div');
    pulse.style.cssText = `
        position: absolute; top: 50%; left: 50%;
        width: 60px; height: 60px;
        background: rgba(76,175,80,0.3);
        border-radius: 50%;
        transform: translate(-50%,-50%) scale(0);
        animation: celebPulse 0.6s ease forwards;
        pointer-events: none; z-index: 10;
    `;
    element.style.position = 'relative';
    element.appendChild(pulse);
    setTimeout(() => pulse.remove(), 700);
}

function bigCelebrate() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const particles = [];
    const colors = ['#F5A623', '#0D5F6F', '#4CAF50', '#E85D3A', '#FB2576', '#8ACBA8'];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2,
            rot: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
        });
    }

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05;
            p.rot += p.rotSpeed;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rot * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });
        frame++;
        if (frame < 180) requestAnimationFrame(animate);
        else canvas.remove();
    }
    animate();
}

// Pulse keyframe (injected once)
if (!document.getElementById('celebStyles')) {
    const style = document.createElement('style');
    style.id = 'celebStyles';
    style.textContent = `
        @keyframes celebPulse {
            0% { transform: translate(-50%,-50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%,-50%) scale(3); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// === Scroll Animations ===
function initScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
}

// === Hub Page ===
function initHub() {
    const nameInput = document.getElementById('nameInput');
    const nameBtn = document.getElementById('nameBtn');
    const nameWrap = document.querySelector('.name-input-wrap');
    const greetingEl = document.getElementById('hubGreeting');
    const changeLink = document.getElementById('changeName');

    if (!nameInput) return;

    const existingName = getUserName();
    if (existingName) {
        showGreeting(existingName);
    }

    nameBtn.addEventListener('click', () => submitName());
    nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitName(); });

    if (changeLink) {
        changeLink.addEventListener('click', e => {
            e.preventDefault();
            nameWrap.classList.remove('hidden');
            greetingEl.classList.remove('visible');
            greetingEl.classList.add('hidden');
            nameInput.value = getUserName();
            nameInput.focus();
        });
    }

    function submitName() {
        const name = nameInput.value.trim();
        if (!name) return;
        setUserName(name);
        showGreeting(name);
    }

    function showGreeting(name) {
        greetingEl.innerHTML = `Hey ${name}, schön dass du da bist! 👋`;
        nameWrap.classList.add('hidden');
        greetingEl.classList.remove('hidden');
        if (changeLink) changeLink.classList.remove('hidden');
        setTimeout(() => greetingEl.classList.add('visible'), 50);
    }

    // Update hub card progress
    updateHubCards();
}

function updateHubCards() {
    const areas = {
        zielbild: { total: 7, selector: '.hub-card-gold' },
        fitness: { total: 12, selector: '.hub-card-teal' },
        leidenschaft: { total: 5, selector: '.hub-card-orange' },
    };
    for (const [area, config] of Object.entries(areas)) {
        const done = getAreaStepsDone(area);
        const card = document.querySelector(config.selector);
        if (!card) continue;
        const progressText = card.querySelector('.card-progress-text');
        const progressFill = card.querySelector('.card-progress-fill');
        if (progressText) progressText.textContent = `${done}/${config.total} Schritte`;
        if (progressFill) progressFill.style.width = `${(done / config.total) * 100}%`;
        if (done >= config.total) card.classList.add('completed');
        // Update button text
        const btn = card.querySelector('.btn');
        if (btn && done > 0 && done < config.total) btn.textContent = 'Fortsetzen →';
        if (btn && done >= config.total) btn.textContent = 'Nochmal ansehen →';
    }
}

// === Dashboard ===
function initDashboard() {
    personalizeAll();
    renderTaskOverview();
    renderLearningTags();
}

function renderTaskOverview() {
    const areas = {
        zielbild: ['step1','step2','step3','step4','step5','step6','step7'],
        fitness: ['step1','step2','step3','step4','step5','step6','step7','step8','step9','step10','step11','step12'],
        leidenschaft: ['step1','step2','step3','step4','step5'],
    };
    for (const [area, steps] of Object.entries(areas)) {
        const col = document.querySelector(`.task-column[data-area="${area}"]`);
        if (!col) continue;
        const list = col.querySelector('.task-list');
        if (!list) continue;
        list.querySelectorAll('.task-item').forEach((item, i) => {
            const stepId = steps[i];
            const check = item.querySelector('.task-check');
            if (!check) return;
            if (isStepDone(area, stepId)) {
                check.classList.add('done');
                check.classList.remove('pending');
                check.textContent = '✓';
            } else {
                check.classList.add('pending');
                check.textContent = '○';
            }
        });
    }
}

function renderLearningTags() {
    // Tags are static in HTML – but we could highlight completed ones
}

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

// === Init on Page Load ===
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initSteps();
    initSubSteps();
    initPromptCopy();
    initScrollAnimations();
    personalizeAll();

    // Page-specific init
    if (document.body.dataset.page === 'hub') initHub();
    if (document.body.dataset.page === 'dashboard') { initDashboard(); initCertificate(); }

    // Update chapter progress on page load
    updateChapterProgress();
});
