import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

/* ── Variables fáciles de editar ───────────────────────────── */
const PRICE = '129';
const CURRENCY = 'MXN';
const CHECKOUT_URL = 'https://niwi.gumroad.com/l/guia-gym-principiantes';
const CONTACT_EMAIL = 'hola@esencialgym.com';

const STYLES = `  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #0a0a0b;
    --dark: #111114;
    --card: #161619;
    --card2: #1c1c20;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --teal: #3ecfb2;
    --teal-dim: rgba(62,207,178,0.12);
    --teal-glow: rgba(62,207,178,0.25);
    --white: #f4f4f0;
    --gray: #8a8a8f;
    --gray2: #5a5a60;
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--white);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
    z-index: 0;
  }

  .wrapper { position: relative; z-index: 1; padding-bottom: 76px; }
  @media (min-width: 760px) { .wrapper { padding-bottom: 0; } }

  /* NAV */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    background: rgba(10,10,11,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }

  .nav-logo {
    font-family: var(--font-display);
    font-size: 20px;
    letter-spacing: 0.07em;
    color: var(--teal);
    line-height: 1;
  }

  .nav-tag {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gray2);
    margin-top: 3px;
  }

  .nav-cta {
    background: var(--teal);
    color: #000;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 500;
    padding: 9px 16px;
    border-radius: 4px;
    text-decoration: none;
    transition: opacity 0.2s;
    white-space: nowrap;
    display: inline-flex;
    align-items: baseline;
    gap: 6px;
  }
  .nav-cta:hover { opacity: 0.85; }
  .nav-cta span { font-size: 11px; opacity: 0.7; }

  /* SECTIONS */
  .sec {
    padding: 48px 20px;
    max-width: 900px;
    margin: 0 auto;
  }
  @media (min-width: 760px) { .sec { padding: 60px 24px; } }

  .section-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--teal);
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  .section-label::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: var(--teal);
    flex-shrink: 0;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(34px, 7vw, 60px);
    line-height: 0.98;
    letter-spacing: 0.01em;
    margin-bottom: 12px;
  }
  .section-title .teal { color: var(--teal); }

  .section-intro {
    font-size: 15px;
    font-weight: 300;
    color: var(--gray);
    line-height: 1.7;
    max-width: 620px;
  }

  /* HERO */
  .hero {
    padding: 108px 20px 48px;
    max-width: 900px;
    margin: 0 auto;
  }
  @media (min-width: 760px) { .hero { padding: 140px 24px 64px; } }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 18px;
    opacity: 0;
    animation: fadeUp 0.6s ease forwards;
    animation-delay: 0.1s;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 24px;
    height: 1px;
    background: var(--teal);
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(52px, 13vw, 108px);
    line-height: 0.9;
    letter-spacing: 0.01em;
    color: var(--white);
    margin-bottom: 18px;
    opacity: 0;
    animation: fadeUp 0.7s ease forwards;
    animation-delay: 0.2s;
  }
  .hero-title span { display: block; }
  .hero-title .accent { color: var(--teal); }

  .hero-desc {
    font-size: 16px;
    font-weight: 300;
    color: var(--gray);
    max-width: 560px;
    margin-bottom: 10px;
    line-height: 1.65;
    opacity: 0;
    animation: fadeUp 0.7s ease forwards;
    animation-delay: 0.35s;
  }
  .hero-desc strong { color: var(--white); font-weight: 500; }

  .hero-desc-sm {
    font-size: 13px;
    color: var(--gray2);
    max-width: 520px;
    margin-bottom: 28px;
    opacity: 0;
    animation: fadeUp 0.7s ease forwards;
    animation-delay: 0.42s;
  }

  .hero-cta-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    opacity: 0;
    animation: fadeUp 0.7s ease forwards;
    animation-delay: 0.5s;
  }

  .btn-primary {
    background: var(--teal);
    color: #000;
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 500;
    padding: 15px 28px;
    border-radius: 4px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }
  .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-primary .arrow { transition: transform 0.2s; }
  .btn-primary:hover .arrow { transform: translateX(3px); }

  .price-note { font-size: 12px; color: var(--gray); letter-spacing: 0.04em; }

  .trust-mini {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 26px;
    opacity: 0;
    animation: fadeUp 0.7s ease forwards;
    animation-delay: 0.6s;
  }
  .trust-mini span {
    font-size: 12px;
    color: var(--gray);
    border: 1px solid var(--border2);
    border-radius: 20px;
    padding: 5px 12px;
    display: inline-flex;
    gap: 6px;
    align-items: center;
  }
  .trust-mini span::before { content: '✓'; color: var(--teal); font-size: 11px; }

  /* GENERIC CARD GRID */
  .grid-2 { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 28px; }
  .grid-3 { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 28px; }
  .grid-4 { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 28px; }
  @media (min-width: 640px) {
    .grid-2 { grid-template-columns: 1fr 1fr; }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-4 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 900px) {
    .grid-4 { grid-template-columns: repeat(4, 1fr); }
  }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 20px;
    transition: border-color 0.25s, background 0.25s, transform 0.25s;
  }
  .card:hover { border-color: var(--border2); background: var(--card2); }

  .card h4 {
    font-family: var(--font-display);
    font-size: 18px;
    letter-spacing: 0.05em;
    color: var(--white);
    margin-bottom: 6px;
    line-height: 1.1;
  }
  .card p { font-size: 13px; color: var(--gray); font-weight: 300; line-height: 1.55; }

  .card-icon {
    width: 34px; height: 34px;
    border-radius: 8px;
    background: var(--teal-dim);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    margin-bottom: 12px;
  }

  .card-num {
    font-family: var(--font-display);
    font-size: 22px;
    color: var(--teal);
    letter-spacing: 0.06em;
    margin-bottom: 8px;
    display: block;
  }

  /* HIGHLIGHT LINE */
  .highlight {
    margin-top: 28px;
    font-family: var(--font-display);
    font-size: clamp(26px, 5vw, 42px);
    line-height: 1;
    letter-spacing: 0.02em;
  }
  .highlight .teal { color: var(--teal); display: block; }

  .note-text {
    font-size: 14px;
    color: var(--gray);
    font-weight: 300;
    line-height: 1.7;
    margin-top: 22px;
    max-width: 620px;
  }
  .note-text strong { color: var(--white); font-weight: 500; }

  /* PREVIEW SLIDER */
  .preview-track {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 28px 20px 8px;
    margin: 0 -20px;
    -webkit-overflow-scrolling: touch;
  }
  .preview-track::-webkit-scrollbar { height: 4px; }
  .preview-track::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }

  .preview-item {
    scroll-snap-align: start;
    flex: 0 0 190px;
  }
  @media (min-width: 760px) { .preview-item { flex: 0 0 220px; } }

  .preview-frame {
    aspect-ratio: 3/4;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .preview-frame::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 55%, rgba(10,10,11,0.85) 100%);
    pointer-events: none;
  }
  .pv-tag {
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 2px;
  }
  .pv-h {
    font-family: var(--font-display);
    font-size: 17px;
    letter-spacing: 0.04em;
    line-height: 1;
    color: var(--white);
    margin-bottom: 6px;
  }
  .pv-line { height: 6px; border-radius: 3px; background: rgba(255,255,255,0.08); }
  .pv-line.s { width: 55%; }
  .pv-line.m { width: 78%; }
  .pv-row { display: flex; gap: 5px; }
  .pv-row .pv-line { flex: 1; }
  .pv-cell { height: 14px; border-radius: 3px; background: rgba(255,255,255,0.05); flex: 1; }
  .pv-cell.on { background: var(--teal-dim); }

  .preview-caption {
    font-size: 12px;
    color: var(--gray);
    margin-top: 8px;
    letter-spacing: 0.02em;
  }

  /* BENEFITS */
  .benefits-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1px;
    margin-top: 28px;
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    background: var(--border);
  }
  @media (min-width: 700px) { .benefits-grid { grid-template-columns: 1fr 1fr; } }

  .benefit-item {
    padding: 22px 20px;
    background: var(--card);
    display: flex;
    gap: 14px;
    align-items: flex-start;
    transition: background 0.2s;
  }
  .benefit-item:hover { background: var(--card2); }

  .benefit-check {
    width: 22px; height: 22px; min-width: 22px;
    border-radius: 50%;
    background: var(--teal-dim);
    border: 1px solid var(--teal);
    display: flex; align-items: center; justify-content: center;
    margin-top: 2px;
  }
  .benefit-check svg { width: 11px; height: 11px; color: var(--teal); }
  .benefit-text h4 { font-size: 14px; font-weight: 500; color: var(--white); margin-bottom: 4px; }
  .benefit-text p { font-size: 13px; color: var(--gray); line-height: 1.5; font-weight: 300; }

  /* FOR WHO */
  .forwho-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 22px;
  }
  .forwho-card.yes { border-color: rgba(62,207,178,0.2); }
  .forwho-card.no { border-color: rgba(255,80,80,0.15); }
  .forwho-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .forwho-dot { width: 8px; height: 8px; border-radius: 50%; }
  .yes .forwho-dot { background: var(--teal); }
  .no .forwho-dot { background: #ff5050; }
  .forwho-title { font-family: var(--font-display); font-size: 19px; letter-spacing: 0.05em; }
  .yes .forwho-title { color: var(--teal); }
  .no .forwho-title { color: #ff5050; }
  .forwho-list { list-style: none; display: flex; flex-direction: column; gap: 9px; }
  .forwho-list li {
    font-size: 13px; color: var(--gray); font-weight: 300;
    padding-left: 14px; position: relative; line-height: 1.5;
  }
  .forwho-list li::before {
    content: '—'; position: absolute; left: 0; color: var(--gray2); font-size: 12px;
  }

  /* TRUST BADGES */
  .badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
  .badges span {
    border: 1px solid var(--border2);
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 12px;
    color: var(--gray);
  }

  .link-teal {
    color: var(--teal);
    font-size: 13px;
    text-decoration: none;
    border-bottom: 1px solid rgba(62,207,178,0.35);
    display: inline-block;
    margin-top: 20px;
  }
  .link-teal:hover { border-color: var(--teal); }

  .sec.credibility-strip, .sec.references-compact { padding-top: 28px; padding-bottom: 28px; }
  .credibility-strip .badges { margin-top: 0; }
  .credibility-strip .link-teal { margin-top: 12px; }
  .benefit-closing { margin-top: 20px; }

  .t-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 20px; }
  .t-card p { font-size: 14px; color: var(--white); font-weight: 300; line-height: 1.6; }
  .t-card .t-label { font-size: 11px; color: var(--gray2); margin-top: 14px; letter-spacing: 0.08em; text-transform: uppercase; }
  .t-stars { color: var(--teal); font-size: 12px; letter-spacing: 2px; margin-bottom: 10px; }

  /* FAQ */
  .faq-list { margin-top: 26px; border-top: 1px solid var(--border); }
  details.faq {
    border-bottom: 1px solid var(--border);
  }
  details.faq summary {
    list-style: none;
    cursor: pointer;
    padding: 16px 32px 16px 0;
    position: relative;
    font-family: var(--font-display);
    font-size: 17px;
    letter-spacing: 0.05em;
    color: var(--white);
  }
  details.faq summary::-webkit-details-marker { display: none; }
  details.faq summary::after {
    content: '+';
    position: absolute; right: 4px; top: 50%; transform: translateY(-50%);
    color: var(--teal); font-size: 18px; font-family: var(--font-body);
  }
  details.faq[open] summary::after { content: '−'; }
  details.faq p {
    font-size: 14px; color: var(--gray); font-weight: 300;
    line-height: 1.7; padding: 0 8px 18px 0;
  }

  /* PRICE */
  .price-box {
    background: var(--card);
    border: 1px solid var(--border2);
    border-radius: 12px;
    padding: 26px 22px;
    margin-top: 26px;
  }
  .price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 6px; }
  .price-main { font-family: var(--font-display); font-size: 56px; line-height: 1; color: var(--white); }
  .price-cur { font-size: 13px; color: var(--gray); letter-spacing: 0.1em; text-transform: uppercase; }
  .price-sub { font-size: 13px; color: var(--teal); margin-bottom: 20px; }

  .includes { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
  .includes div { display: flex; gap: 10px; font-size: 13px; color: var(--gray); align-items: flex-start; line-height: 1.5; }
  .includes div::before { content: '✓'; color: var(--teal); font-size: 12px; }

  .btn-full {
    display: block; width: 100%;
    background: var(--teal); color: #000;
    font-family: var(--font-body); font-size: 16px; font-weight: 500;
    padding: 16px 24px; border-radius: 6px;
    text-decoration: none; text-align: center;
    transition: all 0.2s; border: none; cursor: pointer;
  }
  .btn-full:hover { opacity: 0.9; transform: translateY(-2px); }
  .price-foot { font-size: 12px; color: var(--gray2); margin-top: 12px; text-align: center; }

  /* REFERENCES */
  .refs-list { list-style: none; margin-top: 18px; display: flex; flex-direction: column; gap: 8px; }
  .refs-list li { font-size: 13px; color: var(--gray); font-weight: 300; padding-left: 14px; position: relative; line-height: 1.5; }
  .refs-list li::before { content: '—'; position: absolute; left: 0; color: var(--gray2); }

  /* FOOTER */
  footer {
    border-top: 1px solid var(--border);
    padding: 32px 20px 40px;
    text-align: center;
  }
  .footer-logo { font-family: var(--font-display); font-size: 22px; letter-spacing: 0.08em; color: var(--teal); }
  .footer-tag { font-size: 12px; color: var(--gray); letter-spacing: 0.08em; margin-top: 4px; }
  .footer-links { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 20px; }
  .footer-links a { font-size: 12px; color: var(--gray); text-decoration: none; }
  .footer-links a:hover { color: var(--teal); }
  footer p.legal { font-size: 11px; color: var(--gray2); line-height: 1.7; margin-top: 18px; max-width: 560px; margin-left: auto; margin-right: auto; }

  /* STICKY MOBILE CTA */
  .sticky-cta {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    z-index: 90;
    background: rgba(10,10,11,0.92);
    backdrop-filter: blur(16px);
    border-top: 1px solid var(--border);
    padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  @media (min-width: 760px) { .sticky-cta { display: none; } }
  .sticky-cta .s-price { font-family: var(--font-display); font-size: 22px; line-height: 1; color: var(--white); }
  .sticky-cta .s-note { font-size: 10px; color: var(--gray2); letter-spacing: 0.06em; }
  .sticky-cta a {
    background: var(--teal); color: #000; text-decoration: none;
    font-size: 14px; font-weight: 500; padding: 11px 20px; border-radius: 4px;
    white-space: nowrap;
  }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  .divider { border: none; border-top: 1px solid var(--border); margin: 0; }
`;

const BODY = `
<nav>
  <div>
    <div class="nav-logo">Esencial Gym</div>
    <div class="nav-tag">Menos ruido. Más claridad.</div>
  </div>
  <a href="${CHECKOUT_URL}" class="nav-cta" target="_blank" rel="noopener">Empezar ahora <span>$${PRICE}</span></a>
</nav>

<div class="wrapper">

  <!-- HERO -->
  <section class="hero">
    <div class="hero-eyebrow">Para principiantes</div>
    <h1 class="hero-title">
      <span>Deja de</span>
      <span class="accent">improvisar</span>
      <span>en el gym</span>
    </h1>
    <p class="hero-desc">
      Un sistema simple para que sepas <strong>qué entrenar, cómo progresar y qué registrar</strong> durante tus primeras semanas en el gimnasio.
    </p>
    <p class="hero-desc-sm">
      Sin rutinas random. Sin consejos contradictorios. Sin transformaciones milagro.
    </p>
    <div class="hero-cta-group">
      <a href="${CHECKOUT_URL}" class="btn-primary" target="_blank" rel="noopener">
        Quiero empezar con un plan <span class="arrow">→</span>
      </a>
      <span class="price-note">Pago único · Acceso inmediato</span>
    </div>
    <div class="trust-mini">
      <span>Para principiantes</span>
      <span>Aplicable desde tu primera semana</span>
      <span>Sin dietas extremas</span>
    </div>
  </section>

  <hr class="divider">

  <!-- PROBLEMA -->
  <section class="sec reveal">
    <div class="section-label">El problema</div>
    <h2 class="section-title">Empezar en el gym<br>no debería ser<br><span class="teal">tan confuso</span></h2>
    <div class="grid-4">
      <div class="card">
        <div class="card-icon">🔀</div>
        <h4>Rutinas random</h4>
        <p>Una rutina distinta cada semana y ningún criterio para elegir.</p>
      </div>
      <div class="card">
        <div class="card-icon">💬</div>
        <h4>Consejos contradictorios</h4>
        <p>Cada video dice lo contrario del anterior.</p>
      </div>
      <div class="card">
        <div class="card-icon">⚖️</div>
        <h4>No saber cuánto peso usar</h4>
        <p>Empezar la serie adivinando la carga.</p>
      </div>
      <div class="card">
        <div class="card-icon">📉</div>
        <h4>No saber si progresas</h4>
        <p>Entrenas semanas sin una forma de medirlo.</p>
      </div>
    </div>
    <p class="note-text">
      Cuando eres principiante, tener más información no siempre ayuda.
      <strong>Necesitas saber qué hacer hoy.</strong>
    </p>
    <div class="highlight">
      Menos información.
      <span class="teal">Más dirección.</span>
    </div>
  </section>

  <hr class="divider">

  <!-- LO QUE RECIBES -->
  <section class="sec reveal">
    <div class="section-label">Lo que recibes</div>
    <h2 class="section-title">Todo lo que necesitas<br>para empezar<br><span class="teal">con un plan</span></h2>
    <div class="grid-4">
      <div class="card"><div class="card-icon">🚀</div><h4>Empieza aquí</h4><p>Qué leer, qué preparar y cómo afrontar tu primera sesión.</p></div>
      <div class="card"><div class="card-icon">🏋️</div><h4>Rutina de 4 días</h4><p>Ejercicios, series, repeticiones y una estructura clara para progresar.</p></div>
      <div class="card"><div class="card-icon">📆</div><h4>Rutina de 3 días</h4><p>Alternativa para cuando cuatro sesiones no encajan en tu semana.</p></div>
      <div class="card"><div class="card-icon">📋</div><h4>Registro de 8 semanas</h4><p>Peso, repeticiones, esfuerzo y próxima decisión.</p></div>
      <div class="card"><div class="card-icon">📈</div><h4>Progresión</h4><p>Cómo saber cuándo mantener, subir o ajustar una carga.</p></div>
      <div class="card"><div class="card-icon">🔁</div><h4>Sustituciones</h4><p>Qué hacer cuando un ejercicio no está disponible o no te funciona.</p></div>
      <div class="card"><div class="card-icon">🥗</div><h4>Alimentación básica</h4><p>Calorías, proteína, carbohidratos y ejemplos sencillos sin dietas absurdas.</p></div>
      <div class="card"><div class="card-icon">📘</div><h4>Guía esencial</h4><p>La guía principal con los conceptos que sí necesitas entender.</p></div>
      <div class="card"><div class="card-icon">❓</div><h4>FAQ</h4><p>Problemas comunes de las primeras semanas y cómo resolverlos.</p></div>
    </div>
  </section>

  <hr class="divider">

  <!-- PREVIEW -->
  <section class="sec reveal" style="max-width:900px">
    <div class="section-label">Mira lo que recibes</div>
    <h2 class="section-title">No compres <span class="teal">a ciegas</span></h2>
    <div class="preview-track">

      <div class="preview-item">
        <div class="preview-frame">
          <div class="pv-tag">Portada</div>
          <div class="pv-h">Esencial<br>Gym</div>
          <div class="pv-line m"></div>
          <div class="pv-line s"></div>
          <div style="flex:1"></div>
          <div class="pv-line s"></div>
        </div>
        <div class="preview-caption">Portada de la guía</div>
      </div>

      <div class="preview-item">
        <div class="preview-frame">
          <div class="pv-tag">Día 1 · Empuje</div>
          <div class="pv-h">Rutina</div>
          <div class="pv-row"><div class="pv-cell on"></div><div class="pv-cell"></div><div class="pv-cell"></div></div>
          <div class="pv-row"><div class="pv-cell"></div><div class="pv-cell on"></div><div class="pv-cell"></div></div>
          <div class="pv-row"><div class="pv-cell on"></div><div class="pv-cell"></div><div class="pv-cell"></div></div>
          <div class="pv-line m"></div>
          <div class="pv-line s"></div>
        </div>
        <div class="preview-caption">Página de rutina</div>
      </div>

      <div class="preview-item">
        <div class="preview-frame">
          <div class="pv-tag">Semana 3</div>
          <div class="pv-h">Registro</div>
          <div class="pv-row"><div class="pv-cell"></div><div class="pv-cell"></div><div class="pv-cell on"></div><div class="pv-cell"></div></div>
          <div class="pv-row"><div class="pv-cell"></div><div class="pv-cell on"></div><div class="pv-cell"></div><div class="pv-cell"></div></div>
          <div class="pv-row"><div class="pv-cell on"></div><div class="pv-cell"></div><div class="pv-cell"></div><div class="pv-cell on"></div></div>
          <div class="pv-row"><div class="pv-cell"></div><div class="pv-cell"></div><div class="pv-cell on"></div><div class="pv-cell"></div></div>
        </div>
        <div class="preview-caption">Ejemplo del registro</div>
      </div>

      <div class="preview-item">
        <div class="preview-frame">
          <div class="pv-tag">Reglas</div>
          <div class="pv-h">Progresión</div>
          <div class="pv-line"></div>
          <div class="pv-line m"></div>
          <div class="pv-line s"></div>
          <div class="pv-line m"></div>
          <div class="pv-line"></div>
        </div>
        <div class="preview-caption">Página de progresión</div>
      </div>

    </div>
  </section>

  <hr class="divider">

  <!-- BENEFICIOS -->
  <section class="sec reveal">
    <div class="section-label">Beneficios</div>
    <h2 class="section-title">Lo que vas<br>a lograr</h2>
    <div class="benefits-grid">
      ${[
        ['Sabrás qué hacer en tu siguiente sesión', 'No vas a depender de improvisar o buscar otra rutina cada semana.'],
        ['Tendrás una rutina lista para usar', 'Ejercicios, series y rangos de repeticiones claros.'],
        ['Entenderás cómo progresar', 'Sabrás cuándo mantener una carga y cuándo intentar subirla.'],
        ['Tendrás claridad sobre tu objetivo', 'Pérdida de grasa, ganancia muscular o recomposición explicadas sin extremos.'],
        ['Entenderás una base de alimentación', 'Sin dietas rígidas ni reglas absurdas.'],
        ['Ahorrarás semanas de investigación', 'La información importante ya está seleccionada y organizada.'],
      ]
        .map(
          ([h, p]) => `<div class="benefit-item">
        <div class="benefit-check"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,6 5,9 10,3"/></svg></div>
        <div class="benefit-text"><h4>${h}</h4><p>${p}</p></div>
      </div>`,
        )
        .join('\n')}
    </div>
    <p class="note-text benefit-closing">No necesitas una rutina secreta. Necesitas claridad, constancia y una forma de medir si estás avanzando.</p>
  </section>

  <hr class="divider">

  <!-- PARA QUIÉN -->
  <section class="sec reveal">
    <div class="section-label">Para quién es</div>
    <h2 class="section-title">¿Es para ti?</h2>
    <div class="grid-2">
      <div class="forwho-card yes">
        <div class="forwho-header"><div class="forwho-dot"></div><div class="forwho-title">Sí es para ti si</div></div>
        <ul class="forwho-list">
          <li>Quieres empezar, pero no sabes por dónde.</li>
          <li>Ya entrenas, pero sientes que improvisas.</li>
          <li>Estás cansado de consejos contradictorios.</li>
          <li>Quieres mejorar tu físico con un enfoque claro.</li>
          <li>Quieres empezar a aplicarlo esta semana.</li>
        </ul>
      </div>
      <div class="forwho-card no">
        <div class="forwho-header"><div class="forwho-dot"></div><div class="forwho-title">No es para ti si</div></div>
        <ul class="forwho-list">
          <li>Dominas progresión y nutrición básica y buscas un plan avanzado.</li>
          <li>Necesitas una dieta clínica personalizada.</li>
          <li>Buscas rehabilitación de una lesión.</li>
          <li>Buscas preparación para competir.</li>
          <li>Esperas resultados garantizados en pocas semanas.</li>
        </ul>
      </div>
    </div>
  </section>

  <hr class="divider">

  <!-- CREDIBILIDAD -->
  <section class="sec credibility-strip reveal">
    <div class="badges">
      <span>Fuentes visibles</span>
      <span>Lenguaje para principiantes</span>
      <span>Sin resultados garantizados</span>
      <span>Sin dietas personalizadas</span>
    </div>
    <a href="#referencias" class="link-teal">Ver referencias</a>
  </section>

  <hr class="divider">

  <!-- PRUEBA SOCIAL -->
  <section class="sec reveal">
    <div class="section-label">Testimonios</div>
    <div class="grid-3">
      <div class="t-card">
        <div class="t-stars">★★★★★</div>
        <p>“Me gustó porque te explica las cosas sin complicarlas. Terminas entendiendo qué hacer y por qué hacerlo.”</p>
        <div class="t-label">Usuario beta · Principiante</div>
      </div>
      <div class="t-card">
        <div class="t-stars">★★★★★</div>
        <p>“Está explicado mucho más simple que la mayoría del contenido que había visto.”</p>
        <div class="t-label">Usuario beta · Principiante</div>
      </div>
      <div class="t-card">
        <div class="t-stars">★★★★★</div>
        <p>“Por fin entendí qué debía registrar y qué revisar en mi siguiente sesión.”</p>
        <div class="t-label">Usuario beta · Principiante</div>
      </div>
    </div>
  </section>

  <hr class="divider">

  <!-- CÓMO USARLO -->
  <section class="sec reveal">
    <div class="section-label">Cómo usarlo</div>
    <h2 class="section-title">Empieza en <span class="teal">4 pasos</span></h2>
    <div class="grid-4">
      <div class="card"><span class="card-num">1</span><h4>Lee “Empieza aquí”</h4><p>Entiende el sistema antes de tu primera sesión.</p></div>
      <div class="card"><span class="card-num">2</span><h4>Elige 3 o 4 días</h4><p>Usa la rutina que mejor encaje con tu semana.</p></div>
      <div class="card"><span class="card-num">3</span><h4>Entrena y registra</h4><p>Anota carga, repeticiones y esfuerzo.</p></div>
      <div class="card"><span class="card-num">4</span><h4>Revisa y ajusta</h4><p>Usa las reglas de progresión para decidir qué hacer después.</p></div>
    </div>
  </section>

  <hr class="divider">

  <!-- PRECIO -->
  <section class="sec reveal" id="comprar" style="max-width:640px">
    <div class="section-label">Empieza con un plan</div>
    <h2 class="section-title">Kit <span class="teal">esencial</span></h2>
    <p class="section-intro">Pago único · acceso inmediato</p>
    <div class="price-box">
      <div class="price-row">
        <div class="price-main">$${PRICE}</div>
        <div class="price-cur">${CURRENCY}</div>
      </div>
      <div class="price-sub">Precio temporal de lanzamiento</div>
      <div class="includes">
        <div>Guía Esencial</div>
        <div>Rutina de 4 días</div>
        <div>Rutina de 3 días</div>
        <div>Registro de 8 semanas</div>
        <div>Progresión y sustituciones</div>
        <div>Alimentación básica</div>
        <div>FAQ</div>
      </div>
      <a href="${CHECKOUT_URL}" class="btn-full" target="_blank" rel="noopener">Quiero empezar ahora →</a>
      <p class="price-foot">Pago único · Acceso inmediato · Sin suscripción</p>
    </div>
  </section>

  <hr class="divider">

  <hr class="divider">

  <!-- FAQ -->
  <section class="sec reveal">
    <div class="section-label">Preguntas frecuentes</div>
    <h2 class="section-title">Antes de <span class="teal">comprar</span></h2>
    <div class="faq-list">
      ${[
        ['¿Necesito experiencia previa?', 'No. El producto está hecho para principiantes.'],
        ['¿Tengo que entrenar 4 días?', 'No. El kit también incluye una rutina de 3 días.'],
        ['¿Es una dieta personalizada?', 'No. El contenido de alimentación es educativo y general.'],
        ['¿En qué formato lo recibo?', 'Archivos digitales descargables (PDF) disponibles inmediatamente después de la compra.'],
        ['¿Esto garantiza resultados?', 'No. Los resultados dependen de múltiples factores. El producto te da una estructura clara y aplicable.'],
      ]
        .map(([q, a]) => `<details class="faq"><summary>${q}</summary><p>${a}</p></details>`)
        .join('\n')}
    </div>
  </section>

  <hr class="divider">

  <!-- REFERENCIAS -->
  <section class="sec references-compact reveal" id="referencias">
    <div class="section-label">Referencias</div>
    <p class="section-intro">Contenido educativo basado en recomendaciones públicas y literatura de entrenamiento y nutrición.</p>
    <ul class="refs-list">
      <li>ACSM</li>
      <li>OMS</li>
      <li>ISSN</li>
      <li>Literatura general sobre entrenamiento de fuerza</li>
    </ul>
    <a href="#referencias" class="link-teal">Ver referencias completas</a>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-logo">Esencial Gym</div>
    <div class="footer-tag">Menos ruido. Más claridad.</div>
    <div class="footer-links">
      <a href="#referencias">Referencias</a>
      <a href="mailto:${CONTACT_EMAIL}">Contacto y soporte</a>
      <a href="${CHECKOUT_URL}" target="_blank" rel="noopener">Términos y política de compra</a>
    </div>
    <p class="legal">
      Aviso educativo: el contenido de Esencial Gym tiene fines informativos y educativos. No constituye consejo médico,
      nutricional ni de rehabilitación, y no garantiza resultados. Consulta a un profesional de la salud antes de iniciar
      un programa de ejercicio. La política de reembolso y los términos de compra aplican los del checkout.
    </p>
    <p class="legal">© ${new Date().getFullYear()} Esencial Gym</p>
  </footer>

</div>

<div class="sticky-cta">
  <div>
    <div class="s-price">$${PRICE} ${CURRENCY}</div>
    <div class="s-note">Pago único</div>
  </div>
  <a href="${CHECKOUT_URL}" target="_blank" rel="noopener">Empezar ahora →</a>
</div>
`;

const SCRIPT = `  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
`;

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Esencial Gym — Deja de improvisar en el gym' },
      {
        name: 'description',
        content:
          'Un sistema simple para principiantes: qué entrenar, cómo progresar y qué registrar en tus primeras semanas de gimnasio. Menos ruido. Más claridad.',
      },
      { property: 'og:title', content: 'Esencial Gym — Deja de improvisar en el gym' },
      {
        property: 'og:description',
        content:
          'Rutina, registro y reglas de progresión para tus primeras semanas en el gimnasio. Pago único, acceso inmediato.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap',
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const s = document.createElement('script');
    s.textContent = SCRIPT;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: BODY }} />
    </>
  );
}
