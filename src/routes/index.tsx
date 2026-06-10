import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

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

  /* NOISE TEXTURE */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  /* GRID LINES */
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

  .wrapper { position: relative; z-index: 1; }

  /* NAV */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(10,10,11,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }

  .nav-logo {
    font-family: var(--font-display);
    font-size: 20px;
    letter-spacing: 0.05em;
    color: var(--teal);
  }

  .nav-cta {
    background: var(--teal);
    color: #000;
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 500;
    padding: 8px 18px;
    border-radius: 4px;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .nav-cta:hover { opacity: 0.85; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 120px 24px 80px;
    max-width: 900px;
    margin: 0 auto;
    position: relative;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 24px;
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
    font-size: clamp(64px, 10vw, 120px);
    line-height: 0.92;
    letter-spacing: 0.01em;
    color: var(--white);
    margin-bottom: 12px;
    opacity: 0;
    animation: fadeUp 0.7s ease forwards;
    animation-delay: 0.2s;
  }

  .hero-title .accent {
    color: var(--teal);
    display: block;
  }

  .hero-subtitle {
    font-family: var(--font-display);
    font-size: clamp(32px, 5vw, 56px);
    line-height: 1;
    letter-spacing: 0.04em;
    color: var(--gray);
    margin-bottom: 32px;
    opacity: 0;
    animation: fadeUp 0.7s ease forwards;
    animation-delay: 0.3s;
  }

  .hero-desc {
    font-size: 17px;
    font-weight: 300;
    color: var(--gray);
    max-width: 560px;
    margin-bottom: 48px;
    line-height: 1.7;
    opacity: 0;
    animation: fadeUp 0.7s ease forwards;
    animation-delay: 0.4s;
  }

  .hero-desc strong { color: var(--white); font-weight: 500; }

  .hero-cta-group {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
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
    padding: 16px 36px;
    border-radius: 4px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }
  .btn-primary:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  .btn-primary .arrow { font-size: 18px; transition: transform 0.2s; }
  .btn-primary:hover .arrow { transform: translateX(3px); }

  .price-display {
    display: flex;
    flex-direction: column;
  }
  .price-amount {
    font-family: var(--font-display);
    font-size: 36px;
    color: var(--white);
    line-height: 1;
  }
  .price-note {
    font-size: 12px;
    color: var(--gray);
    margin-top: 2px;
  }

  .hero-scroll-hint {
    position: absolute;
    bottom: 32px;
    left: 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--gray2);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0;
    animation: fadeUp 0.6s ease forwards;
    animation-delay: 1s;
  }

  .scroll-line {
    width: 40px;
    height: 1px;
    background: var(--gray2);
    position: relative;
    overflow: hidden;
  }
  .scroll-line::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: var(--teal);
    animation: slideLine 2s ease infinite;
    animation-delay: 1.5s;
  }

  /* BOOK PREVIEW */
  .book-section {
    padding: 60px 24px 80px;
    max-width: 900px;
    margin: 0 auto;
  }

  .pages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
    margin-top: 32px;
  }

  .page-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    aspect-ratio: 3/4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 12px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s, transform 0.3s;
    cursor: default;
  }
  .page-card:hover {
    border-color: var(--border2);
    transform: translateY(-4px);
  }

  .page-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--teal);
    transform: scaleX(0);
    transition: transform 0.3s;
    transform-origin: left;
  }
  .page-card:hover::before { transform: scaleX(1); }

  .page-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--teal-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
  }

  .page-label {
    font-family: var(--font-display);
    font-size: 16px;
    letter-spacing: 0.05em;
    text-align: center;
    color: var(--white);
    line-height: 1.2;
  }

  .page-desc {
    font-size: 11px;
    color: var(--gray);
    text-align: center;
    line-height: 1.4;
  }

  .page-num {
    position: absolute;
    top: 10px;
    right: 12px;
    font-size: 10px;
    color: var(--gray2);
    font-weight: 500;
    letter-spacing: 0.06em;
  }

  /* SECTION TITLE */
  .section-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--teal);
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }
  .section-label::before {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: var(--teal);
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(40px, 6vw, 72px);
    line-height: 0.95;
    letter-spacing: 0.01em;
    margin-bottom: 16px;
  }

  /* BENEFITS */
  .benefits-section {
    padding: 80px 24px;
    max-width: 900px;
    margin: 0 auto;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2px;
    margin-top: 48px;
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  .benefit-item {
    padding: 28px 24px;
    background: var(--card);
    display: flex;
    gap: 16px;
    align-items: flex-start;
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    transition: background 0.2s;
  }
  .benefit-item:hover { background: var(--card2); }

  .benefit-check {
    width: 24px;
    height: 24px;
    min-width: 24px;
    border-radius: 50%;
    background: var(--teal-dim);
    border: 1px solid var(--teal);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
  }
  .benefit-check svg { width: 12px; height: 12px; color: var(--teal); }

  .benefit-text h4 {
    font-size: 14px;
    font-weight: 500;
    color: var(--white);
    margin-bottom: 4px;
  }
  .benefit-text p {
    font-size: 13px;
    color: var(--gray);
    line-height: 1.5;
    font-weight: 300;
  }

  /* FOR WHO */
  .forwho-section {
    padding: 80px 24px;
    max-width: 900px;
    margin: 0 auto;
  }

  .forwho-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 40px;
  }

  @media (max-width: 600px) {
    .forwho-grid { grid-template-columns: 1fr; }
  }

  .forwho-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 24px;
  }

  .forwho-card.yes { border-color: rgba(62,207,178,0.2); }
  .forwho-card.no { border-color: rgba(255,80,80,0.15); }

  .forwho-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .forwho-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
  }
  .yes .forwho-dot { background: var(--teal); }
  .no .forwho-dot { background: #ff5050; }

  .forwho-title {
    font-family: var(--font-display);
    font-size: 20px;
    letter-spacing: 0.04em;
  }
  .yes .forwho-title { color: var(--teal); }
  .no .forwho-title { color: #ff5050; }

  .forwho-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .forwho-list li {
    font-size: 13px;
    color: var(--gray);
    font-weight: 300;
    padding-left: 14px;
    position: relative;
    line-height: 1.5;
  }
  .forwho-list li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: var(--gray2);
    font-size: 12px;
  }

  /* QUOTE SECTION */
  .quote-section {
    padding: 80px 24px;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .quote-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(62,207,178,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  .quote-text {
    font-family: var(--font-display);
    font-size: clamp(36px, 6vw, 72px);
    line-height: 1.05;
    letter-spacing: 0.01em;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .quote-text .line1 { color: var(--white); display: block; }
  .quote-text .line2 { color: var(--teal); display: block; }
  .quote-text .line3 { color: var(--gray); display: block; }

  /* ABOUT */
  .about-section {
    padding: 80px 24px;
    max-width: 900px;
    margin: 0 auto;
  }

  .about-inner {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 48px;
    align-items: start;
    margin-top: 40px;
  }

  @media (max-width: 640px) {
    .about-inner { grid-template-columns: 1fr; gap: 24px; }
  }

  .about-avatar {
    aspect-ratio: 3/4;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .avatar-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: var(--gray2);
  }

  .avatar-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--card2);
    border: 1px solid var(--border2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }

  .avatar-note {
    font-size: 11px;
    color: var(--gray2);
    text-align: center;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    max-width: 120px;
    line-height: 1.4;
  }

  .about-corner {
    position: absolute;
    top: 12px; right: 12px;
    background: var(--teal-dim);
    border: 1px solid rgba(62,207,178,0.3);
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 10px;
    color: var(--teal);
    letter-spacing: 0.08em;
    font-weight: 500;
  }

  .about-content h3 {
    font-family: var(--font-display);
    font-size: 40px;
    letter-spacing: 0.02em;
    margin-bottom: 16px;
    line-height: 1;
  }

  .about-content p {
    font-size: 15px;
    color: var(--gray);
    font-weight: 300;
    line-height: 1.75;
    margin-bottom: 16px;
  }

  .about-content p strong { color: var(--white); font-weight: 500; }

  .about-content p em { font-style: italic; color: var(--teal); }

  .about-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 24px;
  }

  .about-tag {
    border: 1px solid var(--border2);
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 12px;
    color: var(--gray);
    font-weight: 400;
  }

  /* CTA SECTION */
  .cta-section {
    padding: 100px 24px;
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
  }

  .cta-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--teal-dim);
    border: 1px solid rgba(62,207,178,0.25);
    border-radius: 20px;
    padding: 6px 14px;
    font-size: 12px;
    color: var(--teal);
    font-weight: 500;
    margin-bottom: 24px;
    letter-spacing: 0.04em;
  }

  .cta-title {
    font-family: var(--font-display);
    font-size: clamp(52px, 8vw, 88px);
    line-height: 0.95;
    letter-spacing: 0.01em;
    margin-bottom: 20px;
  }

  .cta-title .teal { color: var(--teal); }

  .cta-desc {
    font-size: 16px;
    font-weight: 300;
    color: var(--gray);
    max-width: 480px;
    margin: 0 auto 40px;
    line-height: 1.7;
  }

  .cta-box {
    background: var(--card);
    border: 1px solid var(--border2);
    border-radius: 12px;
    padding: 32px;
    margin-bottom: 16px;
  }

  .cta-price-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .cta-price-main {
    font-family: var(--font-display);
    font-size: 64px;
    color: var(--white);
    line-height: 1;
    letter-spacing: 0.01em;
  }

  .cta-price-details {
    text-align: left;
  }
  .cta-price-label {
    font-size: 12px;
    color: var(--gray);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .cta-price-sub {
    font-size: 13px;
    color: var(--teal);
    margin-top: 4px;
  }

  .cta-includes {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 28px;
    text-align: left;
  }

  .cta-include-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: var(--gray);
  }
  .cta-include-item::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--teal);
    min-width: 6px;
  }

  .btn-full {
    display: block;
    width: 100%;
    background: var(--teal);
    color: #000;
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 500;
    padding: 18px 24px;
    border-radius: 6px;
    text-decoration: none;
    text-align: center;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }
  .btn-full:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  .cta-guarantee {
    font-size: 12px;
    color: var(--gray2);
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .cta-guarantee svg { width: 14px; height: 14px; color: var(--gray2); }

  /* FOOTER */
  footer {
    border-top: 1px solid var(--border);
    padding: 32px 24px;
    text-align: center;
  }

  footer p {
    font-size: 12px;
    color: var(--gray2);
    line-height: 1.7;
  }

  footer a {
    color: var(--gray);
    text-decoration: none;
  }
  footer a:hover { color: var(--teal); }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideLine {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* DIVIDER */
  .divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 0;
  }

  /* MOBILE */
  @media (max-width: 500px) {
    .pages-grid { grid-template-columns: repeat(2, 1fr); }
    .hero-cta-group { flex-direction: column; align-items: flex-start; }
  }
`;
const BODY = `
<!-- NAV -->
<nav>
  <div class="nav-logo">La Guía</div>
  <a href="https://niwi.gumroad.com/l/guia-gym-principiantes" class="nav-cta" target="_blank">Comprar — $129 MXN</a>
</nav>

<div class="wrapper">

  <!-- HERO -->
  <section class="hero">
    <div class="hero-eyebrow">Guía digital para principiantes</div>
    <h1 class="hero-title">
      La guía
      <span class="accent">definitiva</span>
    </h1>
    <p class="hero-subtitle">Para empezar en el gym</p>
    <p class="hero-desc">
      <strong>Deja de perder tiempo.</strong> Todo lo que necesitas saber para empezar, entender tu objetivo y progresar — sin relleno, sin mitos, sin vueltas.
    </p>
    <div class="hero-cta-group">
      <a href="https://niwi.gumroad.com/l/guia-gym-principiantes" class="btn-primary" target="_blank">
        Quiero la guía
        <span class="arrow">→</span>
      </a>
      <div class="price-display">
        <span class="price-amount">$129 MXN</span>
        <span class="price-note">Descarga inmediata · PDF</span>
      </div>
    </div>
    <div class="hero-scroll-hint">
      <span class="scroll-line"></span>
      Scroll
    </div>
  </section>

  <!-- BOOK PREVIEW -->
  <section class="book-section reveal">
    <div class="section-label">Lo que incluye</div>
    <h2 class="section-title">37 páginas.<br>Todo lo esencial.</h2>
    <div class="pages-grid">

      <div class="page-card">
        <div class="page-num">Cap. 1</div>
        <div class="page-icon">📘</div>
        <div class="page-label">Introducción</div>
        <div class="page-desc">Por qué la información no es el problema</div>
      </div>

      <div class="page-card">
        <div class="page-num">Cap. 2</div>
        <div class="page-icon">⚡</div>
        <div class="page-label">Conceptos básicos</div>
        <div class="page-desc">Series, reps, fallo, sobrecarga progresiva</div>
      </div>

      <div class="page-card">
        <div class="page-num">Cap. 3</div>
        <div class="page-icon">🎯</div>
        <div class="page-label">Tu objetivo</div>
        <div class="page-desc">Cut, bulk o recomposición — cómo elegir</div>
      </div>

      <div class="page-card">
        <div class="page-num">Cap. 4</div>
        <div class="page-icon">🏋️</div>
        <div class="page-label">Rutina 4 días</div>
        <div class="page-desc">Lista para empezar el lunes</div>
      </div>

      <div class="page-card">
        <div class="page-num">Cap. 5</div>
        <div class="page-icon">🥗</div>
        <div class="page-label">Alimentación</div>
        <div class="page-desc">Calorías, proteína y lo que sí importa</div>
      </div>

      <div class="page-card">
        <div class="page-num">Cap. 6</div>
        <div class="page-icon">🚫</div>
        <div class="page-label">Errores comunes</div>
        <div class="page-desc">Los que frenan a la mayoría</div>
      </div>

      <div class="page-card">
        <div class="page-num">Cap. 7</div>
        <div class="page-icon">❓</div>
        <div class="page-label">FAQ</div>
        <div class="page-desc">Las dudas más frecuentes respondidas</div>
      </div>

      <div class="page-card" style="border-color: rgba(62,207,178,0.3);">
        <div class="page-num" style="color: var(--teal)">Bonus</div>
        <div class="page-icon" style="background: var(--teal-glow)">📋</div>
        <div class="page-label" style="color: var(--teal)">Tracker</div>
        <div class="page-desc">Hoja de seguimiento semanal imprimible</div>
      </div>

    </div>
  </section>

  <hr class="divider">

  <!-- BENEFITS -->
  <section class="benefits-section reveal">
    <div class="section-label">Beneficios</div>
    <h2 class="section-title">Lo que vas<br>a lograr</h2>
    <div class="benefits-grid">

      <div class="benefit-item">
        <div class="benefit-check">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2,6 5,9 10,3"/>
          </svg>
        </div>
        <div class="benefit-text">
          <h4>Sabrás exactamente qué hacer</h4>
          <p>Desde el primer día, sin adivinar ni improvisar rutinas de YouTube.</p>
        </div>
      </div>

      <div class="benefit-item">
        <div class="benefit-check">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2,6 5,9 10,3"/>
          </svg>
        </div>
        <div class="benefit-text">
          <h4>Rutina lista para el lunes</h4>
          <p>4 días estructurados, con ejercicios, series y reps concretos.</p>
        </div>
      </div>

      <div class="benefit-item">
        <div class="benefit-check">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2,6 5,9 10,3"/>
          </svg>
        </div>
        <div class="benefit-text">
          <h4>Claridad sobre tu objetivo</h4>
          <p>Entenderás si te conviene cortar grasa, ganar masa o hacer recomposición.</p>
        </div>
      </div>

      <div class="benefit-item">
        <div class="benefit-check">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2,6 5,9 10,3"/>
          </svg>
        </div>
        <div class="benefit-text">
          <h4>Alimentación sin dietas raras</h4>
          <p>La base real: calorías, proteína y cómo comer para tu objetivo.</p>
        </div>
      </div>

      <div class="benefit-item">
        <div class="benefit-check">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2,6 5,9 10,3"/>
          </svg>
        </div>
        <div class="benefit-text">
          <h4>Evitas los errores que frenan a todos</h4>
          <p>Los que hacen que la gente pase meses en el gym sin ver resultados.</p>
        </div>
      </div>

      <div class="benefit-item">
        <div class="benefit-check">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2,6 5,9 10,3"/>
          </svg>
        </div>
        <div class="benefit-text">
          <h4>Todo en 90 minutos de lectura</h4>
          <p>37 páginas visuales y directas. Sin relleno ni capítulos de motivación vacía.</p>
        </div>
      </div>

    </div>
  </section>

  <hr class="divider">

  <!-- QUOTE -->
  <section class="quote-section reveal">
    <div class="quote-bg"></div>
    <div class="quote-text">
      <span class="line1">Progresar en el gym</span>
      <span class="line2">es simple,</span>
      <span class="line3">pero no necesariamente fácil.</span>
    </div>
  </section>

  <hr class="divider">

  <!-- FOR WHO -->
  <section class="forwho-section reveal">
    <div class="section-label">Para quién es</div>
    <h2 class="section-title">¿Es para ti?</h2>
    <div class="forwho-grid">
      <div class="forwho-card yes">
        <div class="forwho-header">
          <div class="forwho-dot"></div>
          <div class="forwho-title">Sí es para ti</div>
        </div>
        <ul class="forwho-list">
          <li>Quieres empezar en el gym pero no sabes por dónde</li>
          <li>Llevas tiempo buscando info y estás más confundido que antes</li>
          <li>Quieres bajar grasa, ganar músculo o ambas cosas</li>
          <li>Quieres una guía clara, no más consejos contradictorios</li>
          <li>Buscas algo que puedas empezar a aplicar esta semana</li>
        </ul>
      </div>
      <div class="forwho-card no">
        <div class="forwho-header">
          <div class="forwho-dot"></div>
          <div class="forwho-title">No es para ti</div>
        </div>
        <ul class="forwho-list">
          <li>Ya llevas 1–2 años entrenando con consistencia</li>
          <li>Buscas una rutina avanzada con periodización compleja</li>
          <li>Quieres un plan de dieta personalizado con macros exactos</li>
          <li>Esperas una fórmula mágica para transformarte en 2 semanas</li>
        </ul>
      </div>
    </div>
  </section>

  <hr class="divider">

  <!-- ABOUT -->
  <section class="about-section reveal">
    <div class="section-label">De dónde viene esto</div>
    <div style="max-width: 640px;">
      <h2 class="section-title" style="margin-bottom: 28px;">Hecha por alguien<br><span style="color:var(--teal)">que estuvo ahí.</span></h2>
      <p style="font-size: 16px; color: var(--gray); font-weight: 300; line-height: 1.85; margin-bottom: 18px;">
        Esta guía no la hizo un entrenador certificado ni alguien con miles de seguidores.
        La hizo alguien que pasó meses entrenando mal — siguiendo rutinas de YouTube que no tenían sentido, probando suplementos que no necesitaba, sin entender por qué no veía resultados.
      </p>
      <p style="font-size: 16px; color: var(--gray); font-weight: 300; line-height: 1.85; margin-bottom: 18px;">
        Con tiempo y entrenando en serio, aprendió lo que realmente funciona. No desde la teoría — desde haberlo vivido.
        Y lo único que faltaba era tenerlo todo organizado en un solo lugar, claro y sin relleno.
      </p>
      <p style="font-size: 16px; color: var(--white); font-weight: 400; line-height: 1.85; margin-bottom: 28px;">
        <em style="font-style: normal; color: var(--teal);">Eso es esta guía.</em> Lo que ojalá hubiera existido cuando empezó.
      </p>
      <div class="about-tags">
        <span class="about-tag">Experiencia real</span>
        <span class="about-tag">Sin títulos inventados</span>
        <span class="about-tag">Basado en evidencia</span>
        <span class="about-tag">Sin agenda de suplementos</span>
        <span class="about-tag">Sin promesas de 4 semanas</span>
      </div>
    </div>
  </section>

  <!-- CTA FINAL -->
  <section class="cta-section reveal">
    <div class="cta-badge">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="5"/></svg>
      Disponible ahora — descarga inmediata
    </div>
    <h2 class="cta-title">
      Deja de<br>
      <span class="teal">perder tiempo</span>
    </h2>
    <p class="cta-desc">Una sola mensualidad de gym cuesta más. Una sesión con entrenador, el doble. Esta guía vale lo que ahorras en meses de confusión.</p>

    <div class="cta-box">
      <div class="cta-price-row">
        <div class="cta-price-main">$129</div>
        <div class="cta-price-details">
          <div class="cta-price-label">MXN · Pago único</div>
          <div class="cta-price-sub">+ Bonus: Tracker semanal</div>
        </div>
      </div>

      <div class="cta-includes">
        <div class="cta-include-item">Guía completa en PDF — 37 páginas</div>
        <div class="cta-include-item">Rutina de 4 días lista para empezar</div>
        <div class="cta-include-item">Guía de cut, bulk y recomposición</div>
        <div class="cta-include-item">Alimentación básica sin dietas raras</div>
        <div class="cta-include-item">Bonus: Hoja de seguimiento semanal</div>
        <div class="cta-include-item">Acceso de por vida · Una sola compra</div>
      </div>

      <a href="https://niwi.gumroad.com/l/guia-gym-principiantes" class="btn-full" target="_blank">
        Quiero la guía ahora →
      </a>

      <p class="cta-guarantee">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M8 1L10.5 5.5L15 6.27L11.5 9.73L12.36 14L8 11.77L3.64 14L4.5 9.73L1 6.27L5.5 5.5L8 1Z"/>
        </svg>
        Acceso inmediato tras la compra · PDF descargable
      </p>
    </div>

    <p style="font-size:12px; color: var(--gray2); margin-top:16px; line-height:1.6">
      Esta guía tiene fines educativos e informativos. No sustituye el consejo de un médico o profesional de la salud.
    </p>
  </section>

  <!-- FOOTER -->
  <footer>
    <p>
      © 2025 La Guía Definitiva Para Empezar en el Gym ·
      <a href="https://niwi.gumroad.com/l/guia-gym-principiantes">Comprar</a>
    </p>
    <p style="margin-top: 6px;">Hecho con intención, no con promesas.</p>
  </footer>

</div>

`;
const SCRIPT = `  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
`;

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'La Guía Definitiva Para Empezar en el Gimnasio' },
      { name: 'description', content: 'Guía definitiva para empezar en el gimnasio.' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap' },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const s = document.createElement('script');
    s.textContent = SCRIPT;
    document.body.appendChild(s);
    return () => { s.remove(); };
  }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: BODY }} />
    </>
  );
}
