import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

/* ── Variables oficiales de la oferta ───────────────────────── */
const ORIGINAL_PRICE = '499';
const PRICE = '279';
const CURRENCY = 'MXN';
const DISCOUNT_SAVINGS = '220';
const CHECKOUT_URL = 'https://mpago.la/1B6G1mC';
const CONTACT_EMAIL = 'hola@esencialgym.com';

const STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #0a0a0b;
    --dark: #111114;
    --card: #16161a;
    --card2: #1d1d22;
    --border: rgba(255, 255, 255, 0.11);
    --border2: rgba(255, 255, 255, 0.2);
    --teal: #3ecfb2;
    --teal-dim: rgba(62, 207, 178, 0.14);
    --teal-glow: rgba(62, 207, 178, 0.28);
    --white: #f5f5f3;
    --gray: #cbcbd4;
    --gray2: #9ea2ad;
    --font-display: 'Bebas Neue', Impact, 'Arial Narrow', sans-serif;
    --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 92px;
  }

  body {
    background: var(--black);
    color: var(--white);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* Evitar que insignias externas tapen el botón inferior o controles en móvil */
  #lovable-badge {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.35;
  }

  .wrapper {
    position: relative;
    z-index: 1;
    padding-bottom: calc(88px + env(safe-area-inset-bottom, 0px));
  }
  @media (min-width: 760px) {
    .wrapper { padding-bottom: 0; }
  }

  /* ── CABECERA COMPACTA (Cero Encimamiento y Más Espacio Útil en Móvil) ── */
  .site-header {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(10, 10, 11, 0.96);
    backdrop-filter: blur(14px);
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.55);
  }

  .top-banner {
    background: linear-gradient(90deg, #190505 0%, #2c0909 50%, #190505 100%);
    color: var(--white);
    padding: 5px 10px;
    border-bottom: 1px solid rgba(239, 68, 68, 0.4);
  }
  @media (min-width: 760px) {
    .top-banner { padding: 7px 16px; }
  }

  .banner-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    flex-wrap: nowrap;
    font-size: 11.5px;
    text-align: center;
    line-height: 1.2;
    max-width: 960px;
    margin: 0 auto;
  }
  @media (min-width: 400px) {
    .banner-content { gap: 8px; font-size: 12px; }
  }
  @media (min-width: 760px) {
    .banner-content { gap: 12px; font-size: 13px; }
  }

  .top-banner .badge-save {
    background: #dc2626;
    color: #ffffff;
    font-weight: 700;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .banner-text {
    color: #fecaca;
    font-weight: 400;
    white-space: nowrap;
  }
  .banner-text strong {
    color: #ffffff;
    font-weight: 700;
  }
  .banner-save-inline {
    display: none;
  }
  @media (min-width: 420px) {
    .banner-save-inline { display: inline; }
  }

  .banner-timer {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #fca5a5;
    font-weight: 600;
    font-size: 11px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .banner-timer-label {
    display: none;
  }
  @media (min-width: 380px) {
    .banner-timer-label { display: inline; }
  }

  .timer-red-pill {
    font-family: var(--font-display);
    font-size: 15px;
    letter-spacing: 0.07em;
    color: #ffffff;
    background: #dc2626;
    padding: 1px 7px;
    border-radius: 4px;
    border: 1px solid #f87171;
    display: inline-block;
    line-height: 1.15;
    font-variant-numeric: tabular-nums;
  }
  @media (min-width: 760px) {
    .timer-red-pill { font-size: 17px; padding: 2px 9px; }
  }

  /* ── NAVEGACIÓN ── */
  .main-nav {
    padding: 7px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--border);
    max-width: 1040px;
    margin: 0 auto;
  }
  @media (min-width: 760px) {
    .main-nav { padding: 10px 24px; gap: 16px; }
  }

  .nav-brand {
    text-decoration: none;
    display: flex;
    flex-direction: column;
  }

  .nav-logo {
    font-family: var(--font-display);
    font-size: 20px;
    letter-spacing: 0.06em;
    color: var(--teal);
    line-height: 1;
  }
  @media (min-width: 760px) {
    .nav-logo { font-size: 22px; }
  }

  .nav-tag {
    display: none;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gray2);
    margin-top: 2px;
  }
  @media (min-width: 760px) {
    .nav-tag { display: block; }
  }

  .nav-links-desktop {
    display: none;
    align-items: center;
    gap: 20px;
  }
  @media (min-width: 760px) {
    .nav-links-desktop { display: flex; }
  }
  .nav-links-desktop a {
    font-size: 13px;
    font-weight: 500;
    color: var(--gray);
    text-decoration: none;
    transition: color 0.15s;
  }
  .nav-links-desktop a:hover {
    color: var(--teal);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-menu-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--card);
    color: var(--white);
    border: 1px solid var(--border2);
    border-radius: 4px;
    padding: 6px 10px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    min-height: 34px;
  }
  @media (min-width: 760px) {
    .nav-menu-btn { display: none; }
  }

  .nav-cta {
    background: var(--teal);
    color: #06110e;
    font-family: var(--font-body);
    font-size: 12.5px;
    font-weight: 700;
    padding: 7px 12px;
    border-radius: 4px;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.15s;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    min-height: 34px;
  }
  @media (min-width: 760px) {
    .nav-cta { font-size: 13.5px; padding: 9px 16px; min-height: 38px; }
  }
  .nav-cta:hover { opacity: 0.9; }
  .nav-cta:active { transform: scale(0.98); }
  .nav-cta span {
    font-size: 11.5px;
    font-weight: 700;
    opacity: 0.85;
  }

  .mobile-nav-drawer {
    background: var(--dark);
    border-bottom: 1px solid var(--border2);
    padding: 10px 14px 12px;
    display: none;
    flex-wrap: wrap;
    gap: 8px;
  }
  .mobile-nav-drawer.open {
    display: flex;
  }
  @media (min-width: 760px) {
    .mobile-nav-drawer, .mobile-nav-drawer.open { display: none; }
  }
  .mobile-nav-drawer a {
    flex: 1 1 calc(50% - 8px);
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 9px 10px;
    color: var(--white);
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    text-align: center;
  }

  /* ── SECCIONES Y TIPOGRAFÍA (Contraste WCAG AA Mejorado) ── */
  .sec {
    padding: 42px 18px;
    max-width: 960px;
    margin: 0 auto;
  }
  @media (min-width: 760px) {
    .sec { padding: 62px 24px; }
  }

  .section-label {
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--teal);
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .section-label::before {
    content: '';
    display: block;
    width: 18px;
    height: 2px;
    background: var(--teal);
    flex-shrink: 0;
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(34px, 7.5vw, 56px);
    line-height: 0.98;
    letter-spacing: 0.015em;
    margin-bottom: 12px;
    color: var(--white);
  }
  .section-title .teal { color: var(--teal); }

  .section-intro {
    font-size: 15.5px;
    font-weight: 400;
    color: var(--gray);
    line-height: 1.65;
    max-width: 640px;
  }
  .section-intro strong {
    color: var(--white);
    font-weight: 600;
  }

  /* ── HERO (En móvil: texto breve + primer botón -> render 3D -> badges) ── */
  .hero {
    padding: 84px 18px 34px;
    max-width: 960px;
    margin: 0 auto;
  }
  @media (min-width: 760px) {
    .hero { padding: 126px 24px 58px; }
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
    align-items: center;
  }
  @media (min-width: 820px) {
    .hero-grid {
      grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
      column-gap: 44px;
      row-gap: 18px;
    }
    .hero-main {
      grid-column: 1;
      grid-row: 1;
    }
    .hero-foot {
      grid-column: 1;
      grid-row: 2;
    }
    .hero-visual {
      grid-column: 2;
      grid-row: 1 / span 2;
      justify-self: center;
    }
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 6px;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background: var(--teal);
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(42px, 11vw, 86px);
    line-height: 0.91;
    letter-spacing: 0.01em;
    color: var(--white);
    margin-bottom: 10px;
  }
  .hero-title span { display: block; }
  .hero-title .accent { color: var(--teal); }

  .hero-desc {
    font-size: 14.5px;
    font-weight: 400;
    color: var(--gray);
    max-width: 540px;
    margin-bottom: 8px;
    line-height: 1.54;
  }
  @media (min-width: 760px) {
    .hero-desc { font-size: 16.5px; line-height: 1.62; margin-bottom: 10px; }
  }
  .hero-desc strong {
    color: var(--white);
    font-weight: 600;
  }

  .hero-route-pill {
    font-size: 13.5px;
    font-weight: 500;
    color: var(--white);
    background: rgba(62, 207, 178, 0.1);
    border-left: 3px solid var(--teal);
    padding: 6px 10px;
    border-radius: 0 4px 4px 0;
    max-width: 520px;
    margin-bottom: 11px;
    line-height: 1.42;
  }
  @media (min-width: 760px) {
    .hero-route-pill { font-size: 14.5px; padding: 7px 11px; margin-bottom: 18px; }
  }

  .hero-cta-group {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
  @media (min-width: 480px) {
    .hero-cta-group { align-items: flex-start; gap: 8px; }
  }

  .btn-primary {
    background: var(--teal);
    color: #06110e;
    font-family: var(--font-body);
    font-size: 15.5px;
    font-weight: 700;
    padding: 12px 22px;
    border-radius: 4px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: opacity 0.2s, transform 0.15s;
    border: none;
    cursor: pointer;
    min-height: 44px;
  }
  .btn-primary:hover { opacity: 0.92; transform: translateY(-1px); }
  .btn-primary:active { transform: scale(0.98); }

  .price-note {
    font-size: 12.5px;
    color: var(--gray);
    line-height: 1.35;
  }
  .price-note-hi {
    color: var(--teal);
    font-weight: 700;
  }
  .price-note del {
    color: var(--gray2);
  }

  /* Render 3D con espacio reservado (aspect-ratio 4/5) para cero saltos al cargar */
  .hero-visual {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .hero-book-wrap {
    width: 100%;
    max-width: 154px;
    aspect-ratio: 4 / 5;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  @media (min-width: 400px) {
    .hero-book-wrap { max-width: 172px; }
  }
  @media (min-width: 820px) {
    .hero-book-wrap { max-width: 300px; }
  }

  .hero-book-wrap::before {
    content: '';
    position: absolute;
    inset: 10%;
    background: radial-gradient(circle, rgba(62, 207, 178, 0.2) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .hero-book-img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 5;
    object-fit: contain;
    display: block;
    filter: drop-shadow(0 14px 24px rgba(0, 0, 0, 0.65));
  }

  .hero-book-caption {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--white);
    background: var(--card);
    border: 1px solid var(--border2);
    border-radius: 4px;
    padding: 4px 10px;
    text-align: center;
    letter-spacing: 0.01em;
  }
  .hero-book-caption span {
    color: var(--teal);
    margin-right: 4px;
  }

  .trust-mini {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .trust-mini span {
    font-size: 12.5px;
    color: var(--gray);
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 5px 10px;
    display: inline-flex;
    gap: 6px;
    align-items: center;
  }
  .trust-mini span::before {
    content: '✓';
    color: var(--teal);
    font-weight: 700;
    font-size: 12px;
  }

  /* ── GRIDS Y TARJETAS ── */
  .grid-2 { display: grid; grid-template-columns: 1fr; gap: 14px; margin-top: 24px; }
  .grid-3 { display: grid; grid-template-columns: 1fr; gap: 14px; margin-top: 24px; }
  .grid-4 { display: grid; grid-template-columns: 1fr; gap: 14px; margin-top: 24px; }
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
    border-radius: 6px;
    padding: 18px;
    transition: border-color 0.2s, background 0.2s;
  }
  .card:hover { border-color: var(--border2); background: var(--card2); }
  .card.featured-card {
    border-color: rgba(62, 207, 178, 0.45);
    background: linear-gradient(180deg, rgba(62, 207, 178, 0.08) 0%, var(--card) 100%);
  }

  .card-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--teal);
    margin-bottom: 6px;
  }

  .card h4 {
    font-family: var(--font-display);
    font-size: 20px;
    letter-spacing: 0.04em;
    color: var(--white);
    margin-bottom: 6px;
    line-height: 1.1;
  }
  .card p {
    font-size: 14px;
    color: var(--gray);
    font-weight: 400;
    line-height: 1.55;
  }

  .card-num {
    font-family: var(--font-display);
    font-size: 24px;
    color: var(--teal);
    letter-spacing: 0.06em;
    margin-bottom: 6px;
    display: block;
    line-height: 1;
  }

  /* ── BLOQUE COMPARATIVO DE RUTINAS (3 DÍAS PRINCIPAL + 4 DÍAS OPCIONAL) ── */
  .routine-banner {
    margin-top: 22px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }
  @media (min-width: 680px) {
    .routine-banner { grid-template-columns: 1.15fr 0.85fr; }
  }
  .routine-box {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 18px;
  }
  .routine-box.primary {
    border-color: var(--teal);
    background: rgba(62, 207, 178, 0.06);
  }
  .routine-badge {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 3px;
    margin-bottom: 8px;
  }
  .routine-box.primary .routine-badge {
    background: var(--teal);
    color: #06110e;
  }
  .routine-box.secondary .routine-badge {
    background: rgba(255, 255, 255, 0.12);
    color: var(--white);
  }
  .routine-box h3 {
    font-family: var(--font-display);
    font-size: 24px;
    letter-spacing: 0.03em;
    color: var(--white);
    margin-bottom: 6px;
    line-height: 1.05;
  }
  .routine-box p {
    font-size: 14px;
    color: var(--gray);
    line-height: 1.55;
  }

  .highlight {
    margin-top: 26px;
    font-family: var(--font-display);
    font-size: clamp(28px, 5.5vw, 42px);
    line-height: 1.02;
    letter-spacing: 0.02em;
  }
  .highlight .teal { color: var(--teal); display: block; }

  .note-text {
    font-size: 14.5px;
    color: var(--gray);
    font-weight: 400;
    line-height: 1.65;
    margin-top: 20px;
    max-width: 640px;
  }
  .note-text strong { color: var(--white); font-weight: 600; }

  /* ── MUESTRAS AUTÉNTICAS AMPLIABLES ("No compres a ciegas") ── */
  .samples-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 24px;
  }
  @media (min-width: 720px) {
    .samples-grid { grid-template-columns: repeat(3, 1fr); }
  }

  .sample-card {
    background: var(--card);
    border: 1px solid var(--border2);
    border-radius: 6px;
    padding: 14px;
    text-align: left;
    color: var(--white);
    font-family: var(--font-body);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: border-color 0.2s, transform 0.15s, background 0.2s;
    width: 100%;
  }
  .sample-card:hover {
    border-color: var(--teal);
    background: var(--card2);
  }
  .sample-card:active {
    transform: scale(0.99);
  }

  .sample-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  .sample-tag {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--teal);
  }
  .sample-zoom-pill {
    font-size: 11.5px;
    font-weight: 700;
    color: #06110e;
    background: var(--teal);
    padding: 3px 9px;
    border-radius: 3px;
    white-space: nowrap;
  }

  .sample-title {
    font-family: var(--font-display);
    font-size: 22px;
    letter-spacing: 0.03em;
    line-height: 1.05;
    color: var(--white);
  }
  .sample-subtitle {
    font-size: 12.5px;
    color: var(--gray2);
    margin-top: -4px;
  }

  .sample-img-wrap {
    width: 100%;
    aspect-ratio: 480 / 680;
    background: #ffffff;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.15);
    position: relative;
  }
  .sample-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }

  .sample-caption {
    font-size: 13.5px;
    color: var(--gray);
    line-height: 1.5;
  }

  .sample-security-note {
    margin-top: 14px;
    font-size: 13px;
    color: var(--gray2);
    line-height: 1.5;
  }

  /* ── MODAL DE LECTURA AMPLIADA DE MUESTRAS ── */
  .sample-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 250;
    background: rgba(5, 5, 7, 0.94);
    backdrop-filter: blur(8px);
    display: none;
    flex-direction: column;
  }
  .sample-modal-backdrop.open {
    display: flex;
  }

  .sample-modal-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 14px;
    background: var(--dark);
    border-bottom: 1px solid var(--border2);
    flex-shrink: 0;
  }

  .sample-modal-title {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--white);
    line-height: 1.25;
  }
  .sample-modal-title span {
    display: block;
    font-size: 11px;
    color: var(--teal);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .sample-modal-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .modal-btn {
    background: var(--card2);
    color: var(--white);
    border: 1px solid var(--border2);
    border-radius: 4px;
    padding: 7px 11px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    min-height: 38px;
    white-space: nowrap;
  }
  .modal-btn.active {
    background: var(--teal-dim);
    border-color: var(--teal);
    color: var(--teal);
  }
  .modal-btn.close-btn {
    background: #dc2626;
    border-color: #ef4444;
    color: #ffffff;
  }

  .sample-modal-tabs {
    display: flex;
    gap: 6px;
    padding: 8px 14px;
    background: var(--black);
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    flex-shrink: 0;
  }
  .sample-tab-btn {
    background: var(--card);
    color: var(--gray);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 6px 11px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    min-height: 34px;
  }
  .sample-tab-btn.current {
    background: var(--teal);
    color: #06110e;
    border-color: var(--teal);
    font-weight: 700;
  }

  .sample-modal-body {
    flex: 1;
    overflow: auto;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    -webkit-overflow-scrolling: touch;
  }
  .sample-modal-body.zoomed-mode {
    justify-content: flex-start;
  }
  @media (min-width: 760px) {
    .sample-modal-body, .sample-modal-body.zoomed-mode {
      justify-content: center;
      padding: 20px;
    }
  }

  .sample-modal-img {
    display: block;
    height: auto;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
    cursor: zoom-in;
  }
  .sample-modal-img.fit {
    width: 100%;
    max-width: 760px;
  }
  .sample-modal-img.zoomed {
    width: 168%;
    max-width: none;
    cursor: zoom-out;
  }
  @media (min-width: 760px) {
    .sample-modal-img.zoomed {
      width: 1080px;
    }
  }

  .sample-modal-footer {
    padding: 8px 14px calc(8px + env(safe-area-inset-bottom, 0px));
    background: var(--dark);
    border-top: 1px solid var(--border);
    text-align: center;
    font-size: 12px;
    color: var(--gray);
    flex-shrink: 0;
  }

  /* ── BENEFICIOS ── */
  .benefits-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1px;
    margin-top: 24px;
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
    background: var(--border);
  }
  @media (min-width: 700px) {
    .benefits-grid { grid-template-columns: 1fr 1fr; }
  }

  .benefit-item {
    padding: 20px 18px;
    background: var(--card);
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .benefit-check {
    width: 22px; height: 22px; min-width: 22px;
    border-radius: 4px;
    background: var(--teal-dim);
    border: 1px solid var(--teal);
    display: flex; align-items: center; justify-content: center;
    margin-top: 2px;
  }
  .benefit-check svg { width: 12px; height: 12px; color: var(--teal); }
  .benefit-text h4 { font-size: 15px; font-weight: 600; color: var(--white); margin-bottom: 4px; }
  .benefit-text p { font-size: 14px; color: var(--gray); line-height: 1.55; font-weight: 400; }

  /* ── PARA QUIÉN ES ── */
  .forwho-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 20px;
  }
  .forwho-card.yes { border-color: rgba(62, 207, 178, 0.3); }
  .forwho-card.no { border-color: rgba(248, 113, 113, 0.25); }
  .forwho-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .forwho-dot { width: 8px; height: 8px; border-radius: 50%; }
  .yes .forwho-dot { background: var(--teal); }
  .no .forwho-dot { background: #f87171; }
  .forwho-title { font-family: var(--font-display); font-size: 21px; letter-spacing: 0.04em; }
  .yes .forwho-title { color: var(--teal); }
  .no .forwho-title { color: #f87171; }
  .forwho-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .forwho-list li {
    font-size: 14px;
    color: var(--gray);
    font-weight: 400;
    padding-left: 16px;
    position: relative;
    line-height: 1.55;
  }
  .forwho-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--teal);
    font-weight: 700;
  }
  .no .forwho-list li::before {
    color: #f87171;
  }

  /* ── CREDIBILIDAD Y TESTIMONIOS ── */
  .badges { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
  .badges span {
    border: 1px solid var(--border2);
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 13px;
    color: var(--gray);
    background: var(--card);
  }

  .link-teal {
    color: var(--teal);
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid rgba(62, 207, 178, 0.45);
    display: inline-block;
    margin-top: 16px;
  }
  .link-teal:hover { border-color: var(--teal); }

  .sec.credibility-strip, .sec.references-compact { padding-top: 32px; padding-bottom: 32px; }
  .credibility-strip .badges { margin-top: 0; }

  .t-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .t-card p { font-size: 14.5px; color: var(--white); font-weight: 400; line-height: 1.6; }
  .t-card .t-label { font-size: 12px; color: var(--gray2); margin-top: 14px; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 600; }
  .t-stars { color: var(--teal); font-size: 13px; letter-spacing: 2px; margin-bottom: 10px; }

  /* ── FAQ ── */
  .faq-list { margin-top: 22px; border-top: 1px solid var(--border); }
  details.faq {
    border-bottom: 1px solid var(--border);
  }
  details.faq summary {
    list-style: none;
    cursor: pointer;
    padding: 16px 36px 16px 0;
    position: relative;
    font-family: var(--font-display);
    font-size: 19px;
    letter-spacing: 0.04em;
    color: var(--white);
    line-height: 1.15;
  }
  details.faq summary::-webkit-details-marker { display: none; }
  details.faq summary::after {
    content: '+';
    position: absolute; right: 4px; top: 50%; transform: translateY(-50%);
    color: var(--teal); font-size: 20px; font-family: var(--font-body); font-weight: 700;
  }
  details.faq[open] summary::after { content: '−'; }
  details.faq p {
    font-size: 14.5px;
    color: var(--gray);
    font-weight: 400;
    line-height: 1.65;
    padding: 0 12px 18px 0;
  }

  /* ── RESUMEN DE COMPRA / PRECIO ── */
  .price-box {
    background: var(--card);
    border: 1px solid var(--border2);
    border-radius: 8px;
    padding: 24px 18px;
    margin-top: 22px;
    position: relative;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  }
  @media (min-width: 640px) {
    .price-box { padding: 30px 26px; }
  }

  .price-badge-save {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--teal-dim);
    border: 1px solid var(--teal);
    color: var(--teal);
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 4px;
    margin-bottom: 14px;
  }
  .price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 4px; }
  .price-old { font-family: var(--font-display); font-size: 28px; line-height: 1; color: var(--gray2); text-decoration: line-through; }
  .price-main { font-family: var(--font-display); font-size: 56px; line-height: 1; color: var(--white); }
  .price-cur { font-size: 14px; color: var(--gray); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600; }
  .price-sub { font-size: 14px; color: var(--teal); margin-bottom: 16px; font-weight: 600; }

  .timer-card {
    background: rgba(220, 38, 38, 0.09);
    border: 1px solid rgba(239, 68, 68, 0.5);
    border-radius: 6px;
    padding: 14px 12px;
    margin-bottom: 20px;
    text-align: center;
  }
  .timer-card-title {
    font-size: 11.5px;
    color: #fca5a5;
    letter-spacing: 0.07em;
    margin-bottom: 8px;
    text-transform: uppercase;
    font-weight: 700;
  }
  .timer-clock {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-family: var(--font-display);
  }
  .timer-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
    background: rgba(0, 0, 0, 0.6);
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid rgba(239, 68, 68, 0.4);
    min-width: 60px;
  }
  .timer-unit span:first-child {
    font-size: 34px;
    color: #ffffff;
    font-family: var(--font-display);
    letter-spacing: 0.04em;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .timer-unit span:last-child {
    font-size: 10px;
    font-family: var(--font-body);
    color: #fecaca;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 4px;
    font-weight: 600;
  }
  .timer-sep {
    font-family: var(--font-display);
    font-size: 28px;
    color: #ef4444;
    font-weight: 700;
    margin-top: -12px;
  }

  .includes { display: flex; flex-direction: column; gap: 10px; margin-bottom: 22px; }
  .includes div {
    display: flex;
    gap: 10px;
    font-size: 14px;
    color: var(--gray);
    align-items: flex-start;
    line-height: 1.5;
  }
  .includes div strong { color: var(--white); font-weight: 600; }
  .includes div::before {
    content: '✓';
    color: var(--teal);
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .includes div.bonus-line {
    color: var(--white);
    background: rgba(62, 207, 178, 0.08);
    border: 1px solid rgba(62, 207, 178, 0.3);
    padding: 8px 10px;
    border-radius: 4px;
  }

  .btn-full {
    display: block;
    width: 100%;
    background: var(--teal);
    color: #06110e;
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 700;
    padding: 15px 20px;
    border-radius: 4px;
    text-decoration: none;
    text-align: center;
    transition: opacity 0.2s, transform 0.15s;
    border: none;
    cursor: pointer;
    min-height: 50px;
  }
  .btn-full:hover { opacity: 0.92; transform: translateY(-1px); }
  .btn-full:active { transform: scale(0.99); }

  .price-foot {
    font-size: 12.5px;
    color: var(--gray);
    margin-top: 12px;
    text-align: center;
    line-height: 1.5;
  }
  .price-foot a {
    color: var(--teal);
    text-decoration: underline;
  }

  /* ── SECCIÓN CONDICIONES DE COMPRA ── */
  .conditions-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 22px;
  }
  @media (min-width: 680px) {
    .conditions-grid { grid-template-columns: 1fr 1fr; }
  }
  .cond-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 18px;
  }
  .cond-card h4 {
    font-family: var(--font-display);
    font-size: 19px;
    letter-spacing: 0.04em;
    color: var(--white);
    margin-bottom: 6px;
  }
  .cond-card p {
    font-size: 13.5px;
    color: var(--gray);
    line-height: 1.6;
  }
  .cond-card p strong {
    color: var(--white);
    font-weight: 600;
  }
  .cond-card a {
    color: var(--teal);
    text-decoration: underline;
  }

  /* ── REFERENCIAS ── */
  .refs-list { list-style: none; margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }
  .refs-list li {
    font-size: 13.5px;
    color: var(--gray);
    font-weight: 400;
    padding-left: 16px;
    position: relative;
    line-height: 1.55;
  }
  .refs-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--teal);
  }

  /* ── PIE DE PÁGINA ── */
  footer {
    border-top: 1px solid var(--border);
    padding: 36px 18px 44px;
    text-align: center;
    max-width: 960px;
    margin: 0 auto;
  }
  .footer-logo { font-family: var(--font-display); font-size: 24px; letter-spacing: 0.08em; color: var(--teal); }
  .footer-tag { font-size: 13px; color: var(--gray); letter-spacing: 0.06em; margin-top: 4px; }
  .footer-links { display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; margin-top: 18px; }
  .footer-links a { font-size: 13.5px; color: var(--gray); text-decoration: underline; text-underline-offset: 3px; }
  .footer-links a:hover { color: var(--teal); }
  footer p.legal {
    font-size: 12.5px;
    color: var(--gray2);
    line-height: 1.65;
    margin-top: 16px;
    max-width: 620px;
    margin-left: auto;
    margin-right: auto;
  }

  /* ── BOTÓN INFERIOR FIJO EN MÓVIL ── */
  .sticky-cta {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    z-index: 90;
    background: rgba(10, 10, 11, 0.96);
    backdrop-filter: blur(14px);
    border-top: 1px solid var(--border2);
    padding: 9px 14px calc(9px + env(safe-area-inset-bottom, 0px));
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  @media (min-width: 760px) { .sticky-cta { display: none; } }
  .sticky-cta .s-price { font-family: var(--font-display); font-size: 22px; line-height: 1; color: var(--white); }
  .sticky-cta .s-old { font-size: 13px; text-decoration: line-through; color: var(--gray2); margin-left: 4px; }
  .sticky-cta .s-note { font-size: 11.5px; color: var(--gray); letter-spacing: 0.02em; margin-top: 2px; }
  .sticky-cta a {
    background: var(--teal);
    color: #06110e;
    text-decoration: none;
    font-size: 14px;
    font-weight: 700;
    padding: 11px 18px;
    border-radius: 4px;
    white-space: nowrap;
    min-height: 42px;
    display: inline-flex;
    align-items: center;
  }

  .divider { border: none; border-top: 1px solid var(--border); margin: 0; }
`;

const BODY = `
<header class="site-header">
  <div class="top-banner">
    <div class="banner-content">
      <span class="badge-save">Oferta hoy</span>
      <span class="banner-text">
        <strong><del>$${ORIGINAL_PRICE}</del> $${PRICE} ${CURRENCY}</strong><span class="banner-save-inline"> · Ahorras $${DISCOUNT_SAVINGS}</span>
      </span>
      <div class="banner-timer" aria-label="Tiempo restante de la oferta">
        <span class="banner-timer-label">Termina en:</span>
        <strong id="top-timer" class="timer-red-pill">07:45:00</strong>
      </div>
    </div>
  </div>

  <nav class="main-nav" aria-label="Navegación principal">
    <a href="#" class="nav-brand">
      <span class="nav-logo">Esencial Gym</span>
      <span class="nav-tag">Menos ruido. Más claridad.</span>
    </a>

    <div class="nav-links-desktop">
      <a href="#incluye">Lo que recibes</a>
      <a href="#muestras">Muestras reales</a>
      <a href="#comprar">Precio</a>
      <a href="#faq">Preguntas</a>
      <a href="#condiciones">Condiciones</a>
    </div>

    <div class="nav-actions">
      <button type="button" id="mobile-menu-btn" class="nav-menu-btn" aria-expanded="false" aria-controls="mobile-nav-menu">
        ☰ Menú
      </button>
      <a href="${CHECKOUT_URL}" class="nav-cta" target="_blank" rel="noopener noreferrer">
        Comprar <span>$${PRICE}</span>
      </a>
    </div>
  </nav>

  <div id="mobile-nav-menu" class="mobile-nav-drawer">
    <a href="#incluye" class="mobile-nav-link">Lo que recibes</a>
    <a href="#muestras" class="mobile-nav-link">Muestras reales</a>
    <a href="#comprar" class="mobile-nav-link">Resumen de compra</a>
    <a href="#faq" class="mobile-nav-link">Preguntas frecuentes</a>
    <a href="#condiciones" class="mobile-nav-link">Condiciones de compra</a>
    <a href="#referencias" class="mobile-nav-link">Referencias</a>
  </div>
</header>

<main class="wrapper">
  <!-- HERO -->
  <section class="hero">
    <div class="hero-grid">
      <div class="hero-main">
        <div class="hero-eyebrow">Para principiantes en el gimnasio</div>
        <h1 class="hero-title">
          <span>Deja de</span>
          <span class="accent">improvisar</span>
          <span>en el gym</span>
        </h1>
        <p class="hero-desc">
          Un sistema simple para saber <strong>qué entrenar, cómo progresar y qué registrar</strong> desde tu primera visita, sin rutinas al azar ni promesas milagro.
        </p>
        <div class="hero-route-pill">
          <strong>Empieza con tres días por semana.</strong> Incluye una alternativa de cuatro días.
        </div>
        <div class="hero-cta-group">
          <a href="${CHECKOUT_URL}" class="btn-primary" target="_blank" rel="noopener noreferrer">
            Quiero empezar con un plan <span>→</span>
          </a>
          <span class="price-note">
            <strong class="price-note-hi">$${PRICE} ${CURRENCY}</strong> · <del>$${ORIGINAL_PRICE}</del> (Ahorras $${DISCOUNT_SAVINGS}) · Pago único en Mercado Pago
          </span>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-book-wrap">
          <img
            src="/images/guia-3d-render-sm.png"
            srcset="/images/guia-3d-render-sm.png 420w, /images/guia-3d-render.png 600w"
            sizes="(max-width: 819px) 200px, 300px"
            width="600"
            height="750"
            alt="Render 3D de La Guía Definitiva para Empezar en el Gimnasio · Esencial Gym"
            fetchpriority="high"
            decoding="async"
            class="hero-book-img"
          />
        </div>
        <div class="hero-book-caption">
          <span>●</span>Guía digital descargable · PDFs y plantillas
        </div>
      </div>

      <div class="hero-foot">
        <div class="trust-mini">
          <span>Ruta principal: 3 días (Push–Pull–Legs · 5 ejercicios)</span>
          <span>Ruta opcional incluida: 4 días (Torso–Pierna)</span>
          <span>Para consultar desde tu celular</span>
        </div>
      </div>
    </div>
  </section>

  <hr class="divider" />

  <!-- EL PROBLEMA -->
  <section class="sec">
    <div class="section-label">El problema</div>
    <h2 class="section-title">
      Empezar en el gym<br />no debería ser <span class="teal">tan confuso</span>
    </h2>
    <div class="grid-4">
      <div class="card">
        <span class="card-num">01</span>
        <h4>Rutinas sin criterio</h4>
        <p>Cambiar de rutina cada semana copiando videos sueltos sin estructura.</p>
      </div>
      <div class="card">
        <span class="card-num">02</span>
        <h4>Consejos opuestos</h4>
        <p>Demasiada información técnica que contradice lo anterior y te paraliza.</p>
      </div>
      <div class="card">
        <span class="card-num">03</span>
        <h4>Adivinar el peso</h4>
        <p>Sentarte en la máquina sin saber cómo ajustarla ni qué carga usar.</p>
      </div>
      <div class="card">
        <span class="card-num">04</span>
        <h4>Entrenar a ciegas</h4>
        <p>Pasar semanas asistiendo sin registrar cargas ni saber si realmente avanzas.</p>
      </div>
    </div>
    <div class="highlight">
      Menos información suelta.
      <span class="teal">Más dirección en tu sesión.</span>
    </div>
  </section>

  <hr class="divider" />

  <!-- LO QUE RECIBES (Oferta de rutinas unificada) -->
  <section class="sec" id="incluye">
    <div class="section-label">Lo que recibes en el kit</div>
    <h2 class="section-title">
      Todo listo para empezar <span class="teal">con un plan</span>
    </h2>
    <p class="section-intro">
      <strong>Empieza con tres días por semana. Incluye una alternativa de cuatro días.</strong> Todos los documentos vienen en formato PDF y plantilla de texto para abrir en segundos desde tu celular.
    </p>

    <div class="routine-banner" id="rutinas">
      <div class="routine-box primary">
        <span class="routine-badge">Ruta principal recomendada</span>
        <h3>3 Días por semana · Push–Pull–Legs</h3>
        <p>
          Cinco ejercicios por sesión (Empuje, Tracción y Pierna). Diseñada para tus primeras 8 semanas con días completos de recuperación y sesiones de 45 a 55 minutos.
        </p>
      </div>
      <div class="routine-box secondary">
        <span class="routine-badge">Ruta opcional incluida</span>
        <h3>4 Días por semana · Torso–Pierna</h3>
        <p>
          Alternativa estructurada de cuatro sesiones semanales (cinco ejercicios por sesión) incluida en el mismo kit por si prefieres dividir el entrenamiento en cuatro días.
        </p>
      </div>
    </div>

    <div class="grid-4">
      <div class="card">
        <span class="card-tag">Paso inicial</span>
        <h4>Empieza aquí y Primera visita</h4>
        <p>Orden de lectura en 3 minutos, qué llevar en tu mochila y práctica en 3 máquinas guiadas.</p>
      </div>
      <div class="card featured-card">
        <span class="card-tag">Ruta principal</span>
        <h4>Rutina de 3 días (PPL)</h4>
        <p>Push–Pull–Legs con cinco ejercicios por sesión, series, repeticiones, esfuerzo RIR y descanso.</p>
      </div>
      <div class="card">
        <span class="card-tag">Ruta opcional</span>
        <h4>Alternativa de 4 días</h4>
        <p>Esquema Torso–Pierna incluido para cuando cuatro sesiones encajen mejor en tu semana.</p>
      </div>
      <div class="card">
        <span class="card-tag">Seguimiento</span>
        <h4>Registro de 8 semanas</h4>
        <p>Hojas semana a semana para 3 y 4 días + plantilla lista para la app de Notas del celular.</p>
      </div>
      <div class="card">
        <span class="card-tag">Reglas claras</span>
        <h4>Progresión y conceptos</h4>
        <p>Cómo elegir tu peso inicial y saber cuándo mantener o subir la carga en la siguiente sesión.</p>
      </div>
      <div class="card">
        <span class="card-tag">18 ejercicios</span>
        <h4>Sustituciones y técnica</h4>
        <p>Tres claves técnicas por movimiento, video demostrativo y cambio si una máquina está ocupada.</p>
      </div>
      <div class="card">
        <span class="card-tag">Comida real</span>
        <h4>Dudas y alimentación</h4>
        <p>Bases prácticas con comida cotidiana en México, descanso y qué hacer si faltas un día.</p>
      </div>
      <div class="card">
        <span class="card-tag">Consulta + IA</span>
        <h4>Guía maestra + Bonus IA</h4>
        <p>Compendio de consulta de 50 páginas y 8 asistentes de IA para resolver dudas en vivo.</p>
      </div>
    </div>
  </section>

  <hr class="divider" />

  <!-- MUESTRAS AUTÉNTICAS AMPLIABLES ("No compres a ciegas") -->
  <section class="sec" id="muestras">
    <div class="section-label">Mira el interior real del kit</div>
    <h2 class="section-title">
      No compres <span class="teal">a ciegas</span>
    </h2>
    <p class="section-intro">
      Estas son <strong>capturas auténticas de los PDFs finales</strong> que recibirás (primera visita, rutina y registro). <strong>Toca cualquier página para ampliarla</strong> y leerla con nitidez desde tu celular.
    </p>

    <div class="samples-grid">
      <button type="button" class="sample-card" data-sample-index="0" aria-label="Ampliar muestra: Primera visita al gimnasio">
        <div class="sample-header">
          <span class="sample-tag">Muestra 01 · PDF Oficial</span>
          <span class="sample-zoom-pill">+ Ampliar</span>
        </div>
        <div class="sample-title">Primera visita al gimnasio</div>
        <div class="sample-subtitle">Guía de familiarización (Pág. 1 de 3)</div>
        <div class="sample-img-wrap">
          <img
            src="/samples/muestra-primera-visita-thumb.png"
            width="480"
            height="680"
            loading="lazy"
            decoding="async"
            alt="Captura auténtica del PDF Primera Visita al Gimnasio de Esencial Gym"
            class="sample-img"
          />
        </div>
        <div class="sample-caption">Qué llevar en tu mochila, paso a paso desde recepción y calentamiento.</div>
      </button>

      <button type="button" class="sample-card" data-sample-index="1" aria-label="Ampliar muestra: Rutina principal de 3 días">
        <div class="sample-header">
          <span class="sample-tag">Muestra 02 · PDF Oficial</span>
          <span class="sample-zoom-pill">+ Ampliar</span>
        </div>
        <div class="sample-title">Rutina principal de 3 días</div>
        <div class="sample-subtitle">Push–Pull–Legs · 5 ejercicios (Pág. 1 de 18)</div>
        <div class="sample-img-wrap">
          <img
            src="/samples/muestra-rutina-3-dias-thumb.png"
            width="480"
            height="680"
            loading="lazy"
            decoding="async"
            alt="Captura auténtica del PDF de Rutina Principal de 3 días Push Pull Legs de Esencial Gym"
            class="sample-img"
          />
        </div>
        <div class="sample-caption">Estructura oficial de 3 días (y ruta opcional de 4 días) con series, reps, RIR y descanso.</div>
      </button>

      <button type="button" class="sample-card" data-sample-index="2" aria-label="Ampliar muestra: Registro de 8 semanas">
        <div class="sample-header">
          <span class="sample-tag">Muestra 03 · PDF Oficial</span>
          <span class="sample-zoom-pill">+ Ampliar</span>
        </div>
        <div class="sample-title">Registro de 8 semanas</div>
        <div class="sample-subtitle">Instrucciones y ejemplo de llenado (Pág. 4 de 18)</div>
        <div class="sample-img-wrap">
          <img
            src="/samples/muestra-registro-8-semanas-thumb.png"
            width="480"
            height="680"
            loading="lazy"
            decoding="async"
            alt="Captura auténtica del PDF Registro de Entrenamiento de 8 Semanas de Esencial Gym"
            class="sample-img"
          />
        </div>
        <div class="sample-caption">Cómo anotar ajuste, carga por mancuerna o placa, sensación y decisión para la siguiente sesión.</div>
      </button>
    </div>

    <p class="sample-security-note">
      * Muestras reales de páginas individuales (1 página por documento). Los archivos completos del kit se entregan únicamente tras la compra.
    </p>
  </section>

  <hr class="divider" />

  <!-- BENEFICIOS -->
  <section class="sec">
    <div class="section-label">Beneficios prácticos</div>
    <h2 class="section-title">
      Lo que vas <span class="teal">a lograr</span>
    </h2>
    <div class="benefits-grid">
      <div class="benefit-item">
        <div class="benefit-check" aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,6 5,9 10,3"/></svg></div>
        <div class="benefit-text"><h4>Sabrás qué hacer desde el primer día</h4><p>Tendrás un recorrido guiado para tu primera visita y cinco ejercicios claros por sesión.</p></div>
      </div>
      <div class="benefit-item">
        <div class="benefit-check" aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,6 5,9 10,3"/></svg></div>
        <div class="benefit-text"><h4>Empezarás con 3 días bien estructurados</h4><p>Con la ruta Push–Pull–Legs y una alternativa incluida de 4 días (Torso–Pierna).</p></div>
      </div>
      <div class="benefit-item">
        <div class="benefit-check" aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,6 5,9 10,3"/></svg></div>
        <div class="benefit-text"><h4>Entenderás cuándo subir el peso</h4><p>Reglas simples de progresión para dejar de adivinar cargas en mancuernas y máquinas.</p></div>
      </div>
      <div class="benefit-item">
        <div class="benefit-check" aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,6 5,9 10,3"/></svg></div>
        <div class="benefit-text"><h4>Llevarás control real durante 8 semanas</h4><p>Sabrás qué peso usaste en la sesión anterior y cuál es tu meta del día en el celular.</p></div>
      </div>
      <div class="benefit-item">
        <div class="benefit-check" aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,6 5,9 10,3"/></svg></div>
        <div class="benefit-text"><h4>Resolverás qué hacer si un aparato está ocupado</h4><p>Cada ejercicio incluye su alternativa equivalente y claves puntuales de postura.</p></div>
      </div>
      <div class="benefit-item">
        <div class="benefit-check" aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,6 5,9 10,3"/></svg></div>
        <div class="benefit-text"><h4>Ahorrarás semanas de confusión</h4><p>La información esencial ya está filtrada, ordenada y lista para aplicarse.</p></div>
      </div>
    </div>
    <p class="note-text">
      No necesitas una rutina secreta. Necesitas <strong>claridad, constancia y una forma simple de medir</strong> si estás avanzando.
    </p>
  </section>

  <hr class="divider" />

  <!-- PARA QUIÉN ES -->
  <section class="sec">
    <div class="section-label">Para quién es</div>
    <h2 class="section-title">¿Es para ti?</h2>
    <div class="grid-2">
      <div class="forwho-card yes">
        <div class="forwho-header"><div class="forwho-dot"></div><div class="forwho-title">Sí es para ti si</div></div>
        <ul class="forwho-list">
          <li>Quieres empezar en el gimnasio, pero no sabes por dónde iniciar.</li>
          <li>Ya vas al gym, pero sientes que improvisas cada semana.</li>
          <li>Buscas empezar con tres días por semana (con opción a cuatro días).</li>
          <li>Quieres un sistema claro para registrar tus pesos desde el celular.</li>
          <li>Prefieres explicaciones directas sin tecnicismos innecesarios.</li>
        </ul>
      </div>
      <div class="forwho-card no">
        <div class="forwho-header"><div class="forwho-dot"></div><div class="forwho-title">No es para ti si</div></div>
        <ul class="forwho-list">
          <li>Ya dominas programación intermedia/avanzada y sobrecarga progresiva.</li>
          <li>Necesitas un plan de nutrición clínica o médica personalizada.</li>
          <li>Buscas rehabilitación médica para tratar una lesión activa.</li>
          <li>Buscas preparación específica para competencia deportiva.</li>
          <li>Esperas promesas de transformaciones milagro en pocos días.</li>
        </ul>
      </div>
    </div>
  </section>

  <hr class="divider" />

  <!-- CREDIBILIDAD -->
  <section class="sec credibility-strip">
    <div class="badges">
      <span>Fuentes públicas visibles</span>
      <span>Lenguaje claro para principiantes</span>
      <span>Sin promesas milagro</span>
      <span>Sin suscripciones ocultas</span>
    </div>
    <a href="#referencias" class="link-teal">Ver referencias utilizadas</a>
  </section>

  <hr class="divider" />

  <!-- TESTIMONIOS VERIFICADOS -->
  <section class="sec">
    <div class="section-label">Testimonios verificados</div>
    <h2 class="section-title">
      Lo que dicen quienes <span class="teal">ya lo usaron</span>
    </h2>
    <div class="grid-3">
      <div class="t-card">
        <div>
          <div class="t-stars" aria-label="5 de 5 estrellas">★★★★★</div>
          <p>“Me gustó porque te explica las cosas sin complicarlas. Terminas entendiendo qué hacer y por qué hacerlo.”</p>
        </div>
        <div class="t-label">Usuario beta · Principiante</div>
      </div>
      <div class="t-card">
        <div>
          <div class="t-stars" aria-label="5 de 5 estrellas">★★★★★</div>
          <p>“Está explicado mucho más simple que la mayoría del contenido que había visto.”</p>
        </div>
        <div class="t-label">Usuario beta · Principiante</div>
      </div>
      <div class="t-card">
        <div>
          <div class="t-stars" aria-label="5 de 5 estrellas">★★★★★</div>
          <p>“Por fin entendí qué debía registrar y qué revisar en mi siguiente sesión.”</p>
        </div>
        <div class="t-label">Usuario beta · Principiante</div>
      </div>
    </div>
  </section>

  <hr class="divider" />

  <!-- CÓMO USARLO -->
  <section class="sec">
    <div class="section-label">Cómo funciona</div>
    <h2 class="section-title">Empieza en <span class="teal">4 pasos</span></h2>
    <div class="grid-4">
      <div class="card">
        <span class="card-num">1</span>
        <h4>Lee “Empieza aquí”</h4>
        <p>Revisa el mapa de lectura rápida y la guía para tu primera visita de familiarización.</p>
      </div>
      <div class="card">
        <span class="card-num">2</span>
        <h4>Empieza con 3 días</h4>
        <p>Usa la ruta principal de tres días (Push–Pull–Legs, 5 ejercicios). Incluye una alternativa de cuatro días.</p>
      </div>
      <div class="card">
        <span class="card-num">3</span>
        <h4>Entrena y registra</h4>
        <p>Anota carga, repeticiones y sensación en el registro de 8 semanas o en Notas del celular.</p>
      </div>
      <div class="card">
        <span class="card-num">4</span>
        <h4>Revisa y progresa</h4>
        <p>Aplica la regla de progresión para decidir cuándo mantener el peso y cuándo subirlo.</p>
      </div>
    </div>
  </section>

  <hr class="divider" />

  <!-- RESUMEN DE COMPRA Y PRECIO -->
  <section class="sec" id="comprar" style="max-width:660px">
    <div class="section-label">Acceso al kit completo</div>
    <h2 class="section-title">Kit <span class="teal">Esencial Gym</span></h2>
    <p class="section-intro">
      <strong>Empieza con tres días por semana. Incluye una alternativa de cuatro días.</strong> Guía digital descargable (PDFs y plantillas) con pago único.
    </p>

    <div class="price-box">
      <div class="price-badge-save">Ahorras $${DISCOUNT_SAVINGS} ${CURRENCY} (44% OFF) · Oferta de lanzamiento</div>
      <div class="price-row">
        <div class="price-old"><del>$${ORIGINAL_PRICE}</del></div>
        <div class="price-main">$${PRICE}</div>
        <div class="price-cur">${CURRENCY}</div>
      </div>
      <div class="price-sub">Pago único · Sin mensualidades ni cargos ocultos</div>

      <div class="timer-card">
        <div class="timer-card-title">Oferta de lanzamiento · Termina hoy en:</div>
        <div class="timer-clock">
          <div class="timer-unit"><span id="timer-h">07</span><span>Horas</span></div>
          <div class="timer-sep">:</div>
          <div class="timer-unit"><span id="timer-m">45</span><span>Minutos</span></div>
          <div class="timer-sep">:</div>
          <div class="timer-unit"><span id="timer-s">00</span><span>Segundos</span></div>
        </div>
      </div>

      <div class="includes">
        <div><span><strong>Ruta principal de 3 días (Push–Pull–Legs):</strong> 5 ejercicios por sesión, pensada para empezar con tres días por semana.</span></div>
        <div><span><strong>Ruta opcional incluida de 4 días (Torso–Pierna):</strong> alternativa estructurada de cuatro días por semana.</span></div>
        <div><span><strong>Guía “Empieza aquí” y Primera Visita:</strong> protocolo paso a paso y familiarización en 3 máquinas guiadas.</span></div>
        <div><span><strong>Registro de 8 semanas (PDF + Plantilla Notas):</strong> tablas completas de seguimiento para las rutas de 3 y 4 días.</span></div>
        <div><span><strong>Sustituciones y demostraciones:</strong> 18 ejercicios con 3 claves técnicas, video de referencia y alternativa directa.</span></div>
        <div><span><strong>Dudas, alimentación cotidiana y conceptos (RIR):</strong> reglas prácticas de progresión, descanso y comida accesible.</span></div>
        <div><span><strong>Guía Esencial Maestra (50 páginas):</strong> compendio teórico de consulta para principiantes.</span></div>
        <div class="bonus-line"><span><strong>BONUS INCLUIDO · Entrenador de bolsillo con IA:</strong> 8 asistentes listos para copiar y resolver dudas desde tu celular.</span></div>
      </div>

      <a href="${CHECKOUT_URL}" class="btn-full" target="_blank" rel="noopener noreferrer">
        Quiero empezar ahora por $${PRICE} ${CURRENCY} →
      </a>
      <p class="price-foot">
        Pago seguro vía Mercado Pago (tarjeta, SPEI u OXXO) · <a href="#condiciones">Ver condiciones de compra y entrega</a>
      </p>
    </div>
  </section>

  <hr class="divider" />

  <!-- PREGUNTAS FRECUENTES -->
  <section class="sec" id="faq">
    <div class="section-label">Preguntas frecuentes</div>
    <h2 class="section-title">Antes de <span class="teal">comprar</span></h2>
    <div class="faq-list">
      <details class="faq">
        <summary>¿Necesito experiencia previa en el gimnasio?</summary>
        <p>No. El kit está diseñado específicamente para principiantes desde su primer día, incluyendo una guía de familiarización para tu primera visita y cómo ajustar las primeras máquinas.</p>
      </details>
      <details class="faq">
        <summary>¿Cuántos días por semana debo entrenar?</summary>
        <p>Empieza con tres días por semana siguiendo la ruta principal (Push–Pull–Legs, con cinco ejercicios por sesión). Además, el kit incluye una alternativa opcional de cuatro días (Torso–Pierna) por si prefieres entrenar cuatro sesiones semanales.</p>
      </details>
      <details class="faq">
        <summary>¿En qué formato recibo el producto y cómo lo descargo?</summary>
        <p>Es un producto 100% digital compuesto por archivos PDF listos para leer en celular o computadora, una plantilla de texto para la app de Notas y un paquete comprimido (.zip). Tras aprobarse tu pago en Mercado Pago, accedes a la carpeta de descarga en Google Drive.</p>
      </details>
      <details class="faq">
        <summary>¿Incluye una dieta clínica personalizada?</summary>
        <p>No. El módulo de alimentación es educativo y orientativo, enfocado en ejemplos prácticos de comida cotidiana en México sin menús clínicos restrictivos.</p>
      </details>
      <details class="faq">
        <summary>¿Qué métodos de pago acepta Mercado Pago?</summary>
        <p>Puedes pagar $${PRICE} ${CURRENCY} (pago único) con tarjeta de débito o crédito, transferencia SPEI, saldo en Mercado Pago o efectivo en OXXO.</p>
      </details>
      <details class="faq">
        <summary>¿Este producto garantiza resultados físicos específicos?</summary>
        <p>No. Los resultados dependen de la constancia, descanso, alimentación y contexto individual de cada persona. El kit te entrega una estructura clara, medible y aplicable desde la primera semana.</p>
      </details>
    </div>
  </section>

  <hr class="divider" />

  <!-- CONDICIONES DE COMPRA Y ENTREGA -->
  <section class="sec" id="condiciones">
    <div class="section-label">Transparencia comercial</div>
    <h2 class="section-title">Condiciones de <span class="teal">compra y entrega</span></h2>
    <p class="section-intro">
      Información clara sobre qué incluye tu compra digital, cómo se procesa el pago y cómo funciona la entrega y el soporte.
    </p>

    <div class="conditions-grid">
      <div class="cond-card">
        <h4>1. Producto digital descargable</h4>
        <p>
          <strong>Kit Esencial Gym</strong> es un producto <strong>100% digital</strong> integrado por documentos en formato PDF y plantillas de texto (<code>.txt</code>) para uso personal. No incluye productos físicos impresos, envíos por paquetería, aplicaciones móviles con suscripción ni asesorías personalizadas 1 a 1.
        </p>
      </div>

      <div class="cond-card">
        <h4>2. Precio y pasarela de pago</h4>
        <p>
          El precio vigente de lanzamiento es de <strong>$${PRICE} ${CURRENCY}</strong> (pesos mexicanos), en una sola exhibición (pago único, sin cobros automáticos posteriores). El pago se procesa de forma externa y segura mediante <strong>Mercado Pago</strong>.
        </p>
      </div>

      <div class="cond-card">
        <h4>3. Entrega tras aprobación del pago</h4>
        <p>
          Una vez que Mercado Pago aprueba y acredita la transacción, se habilita el acceso al paquete digital descargable (archivos individuales y archivo completo <code>.zip</code>). En pagos con tarjeta o SPEI la acreditación suele ser inmediata; en pagos en efectivo (como OXXO) depende del tiempo de confirmación de la pasarela.
        </p>
      </div>

      <div class="cond-card">
        <h4>4. Soporte, devoluciones y aviso educativo</h4>
        <p>
          Por tratarse de archivos digitales de descarga directa tras la compra, no se aplican reembolsos por cambio de opinión una vez entregado el acceso. Si tienes cualquier inconveniente para descargar o abrir tus archivos tras tu pago, escríbenos a <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> indicando tu comprobante de operación de Mercado Pago para enviarte o reponer tu acceso. El contenido es estrictamente informativo y educativo; no sustituye consulta médica, fisioterapéutica ni nutricional.
        </p>
      </div>
    </div>
  </section>

  <hr class="divider" />

  <!-- REFERENCIAS -->
  <section class="sec references-compact" id="referencias">
    <div class="section-label">Referencias</div>
    <p class="section-intro">
      Contenido educativo elaborado con base en recomendaciones públicas y literatura general sobre entrenamiento de fuerza y nutrición:
    </p>
    <ul class="refs-list">
      <li>American College of Sports Medicine (ACSM) · Guías generales de ejercicio y fuerza.</li>
      <li>Organización Mundial de la Salud (OMS) · Recomendaciones de actividad física para adultos.</li>
      <li>International Society of Sports Nutrition (ISSN) · Posicionamientos sobre proteína y ejercicio.</li>
      <li>Centros para el Control y la Prevención de Enfermedades (CDC) · Señales de seguridad y esfuerzo físico.</li>
    </ul>
  </section>

  <!-- PIE DE PÁGINA CORREGIDO (2025 y enlace a #condiciones) -->
  <footer>
    <div class="footer-logo">Esencial Gym</div>
    <div class="footer-tag">Menos ruido. Más claridad.</div>
    <div class="footer-links">
      <a href="#incluye">Lo que incluye</a>
      <a href="#muestras">Muestras del kit</a>
      <a href="#referencias">Referencias</a>
      <a href="#condiciones">Términos y condiciones de compra</a>
      <a href="mailto:${CONTACT_EMAIL}">Contacto y soporte (${CONTACT_EMAIL})</a>
    </div>
    <p class="legal">
      Aviso educativo: el contenido de Esencial Gym tiene fines exclusivamente informativos y educativos para adultos sanos. No constituye consejo médico, diagnóstico, prescripción nutricional clínica ni rehabilitación física, y no garantiza resultados específicos. Consulta a un profesional de la salud antes de iniciar cualquier programa de ejercicio.
    </p>
    <p class="legal">© 2025 Esencial Gym. Todos los derechos reservados.</p>
  </footer>
</main>

<!-- BARRA INFERIOR FIJA EN MÓVIL -->
<div class="sticky-cta" role="region" aria-label="Compra rápida">
  <div>
    <div class="s-price">
      $${PRICE} ${CURRENCY} <span class="s-old">$${ORIGINAL_PRICE}</span>
    </div>
    <div class="s-note">Empieza con 3 días · Incluye ruta de 4 días</div>
  </div>
  <a href="${CHECKOUT_URL}" target="_blank" rel="noopener noreferrer">
    Empezar ahora →
  </a>
</div>

<!-- VISOR MODAL DE MUESTRAS AMPLIABLES -->
<div id="sample-modal" class="sample-modal-backdrop" role="dialog" aria-modal="true" aria-label="Vista ampliada de muestra del PDF">
  <div class="sample-modal-topbar">
    <div class="sample-modal-title">
      <span id="modal-sample-tag">Muestra 01 · PDF Oficial</span>
      <strong id="modal-sample-title">Primera visita al gimnasio</strong>
    </div>
    <div class="sample-modal-actions">
      <button type="button" id="modal-zoom-btn" class="modal-btn">
        + Zoom lectura
      </button>
      <button type="button" id="modal-close-btn" class="modal-btn close-btn" aria-label="Cerrar muestra">
        ✕ Cerrar
      </button>
    </div>
  </div>

  <div class="sample-modal-tabs" role="tablist" aria-label="Cambiar de muestra">
    <button type="button" class="sample-tab-btn current" data-tab-index="0">1. Primera visita</button>
    <button type="button" class="sample-tab-btn" data-tab-index="1">2. Rutina 3 días</button>
    <button type="button" class="sample-tab-btn" data-tab-index="2">3. Registro 8 semanas</button>
  </div>

  <div id="modal-sample-body" class="sample-modal-body">
    <img
      id="modal-sample-img"
      src="/samples/muestra-primera-visita.png"
      width="1200"
      height="1698"
      alt="Vista ampliada de muestra del PDF"
      class="sample-modal-img fit"
    />
  </div>

  <div id="modal-sample-footer" class="sample-modal-footer">
    Toca “+ Zoom lectura” o toca la página para ampliar el texto y deslizar en tu celular
  </div>
</div>
`;

const SCRIPT = `
(function () {
  /* 1. Temporizador Evergreen */
  function updateCountdown() {
    var now = new Date();
    var midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    var diff = Math.floor((midnight.getTime() - now.getTime()) / 1000);
    if (diff < 0) diff = 0;

    var hours = Math.floor(diff / 3600);
    var minutes = Math.floor((diff % 3600) / 60);
    var seconds = diff % 60;

    var pad = function (n) { return String(n).padStart(2, '0'); };
    var h = pad(hours);
    var m = pad(minutes);
    var s = pad(seconds);

    var topEl = document.getElementById('top-timer');
    if (topEl) topEl.textContent = h + ':' + m + ':' + s;

    var th = document.getElementById('timer-h');
    var tm = document.getElementById('timer-m');
    var ts = document.getElementById('timer-s');
    if (th && tm && ts) {
      th.textContent = h;
      tm.textContent = m;
      ts.textContent = s;
    }
  }
  updateCountdown();
  var timerId = setInterval(updateCountdown, 1000);

  /* 2. Menú móvil compacto */
  var menuBtn = document.getElementById('mobile-menu-btn');
  var menuDrawer = document.getElementById('mobile-nav-menu');
  if (menuBtn && menuDrawer) {
    menuBtn.addEventListener('click', function () {
      var isOpen = menuDrawer.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuBtn.textContent = isOpen ? '✕ Cerrar' : '☰ Menú';
    });
    var navLinks = menuDrawer.querySelectorAll('.mobile-nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        menuDrawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰ Menú';
      });
    });
  }

  /* 3. Visor de Muestras Ampliables */
  var samplesData = [
    {
      tag: 'Muestra 01 · PDF Oficial (Pág. 1 de 3)',
      title: 'Primera visita al gimnasio',
      src: '/samples/muestra-primera-visita.png',
      alt: 'Captura auténtica del PDF Primera Visita al Gimnasio de Esencial Gym'
    },
    {
      tag: 'Muestra 02 · PDF Oficial (Pág. 1 de 18)',
      title: 'Rutina principal de 3 días (Push–Pull–Legs)',
      src: '/samples/muestra-rutina-3-dias.png',
      alt: 'Captura auténtica del PDF de Rutina Principal de 3 días Push Pull Legs de Esencial Gym'
    },
    {
      tag: 'Muestra 03 · PDF Oficial (Pág. 4 de 18)',
      title: 'Registro de entrenamiento de 8 semanas',
      src: '/samples/muestra-registro-8-semanas.png',
      alt: 'Captura auténtica del PDF Registro de Entrenamiento de 8 Semanas de Esencial Gym'
    }
  ];

  var modal = document.getElementById('sample-modal');
  var modalTag = document.getElementById('modal-sample-tag');
  var modalTitle = document.getElementById('modal-sample-title');
  var modalImg = document.getElementById('modal-sample-img');
  var modalBody = document.getElementById('modal-sample-body');
  var modalFooter = document.getElementById('modal-sample-footer');
  var zoomBtn = document.getElementById('modal-zoom-btn');
  var closeBtn = document.getElementById('modal-close-btn');
  var tabBtns = document.querySelectorAll('.sample-tab-btn');
  var sampleCards = document.querySelectorAll('.sample-card');
  var isZoomed = false;

  function applyZoomState(zoom) {
    isZoomed = zoom;
    if (!modalImg || !modalBody || !zoomBtn || !modalFooter) return;
    if (isZoomed) {
      modalImg.classList.remove('fit');
      modalImg.classList.add('zoomed');
      modalBody.classList.add('zoomed-mode');
      zoomBtn.classList.add('active');
      zoomBtn.textContent = 'Ajustar ancho';
      modalFooter.textContent = 'Desliza hacia los lados o abajo para leer cada detalle · Toca la página para ajustar';
    } else {
      modalImg.classList.remove('zoomed');
      modalImg.classList.add('fit');
      modalBody.classList.remove('zoomed-mode');
      zoomBtn.classList.remove('active');
      zoomBtn.textContent = '+ Zoom lectura';
      modalFooter.textContent = 'Toca “+ Zoom lectura” o toca la página para ampliar el texto en tu celular';
    }
  }

  function showSample(index) {
    var item = samplesData[index];
    if (!item || !modal) return;
    if (modalTag) modalTag.textContent = item.tag;
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalImg) {
      modalImg.src = item.src;
      modalImg.alt = item.alt;
    }
    tabBtns.forEach(function (btn, idx) {
      if (idx === index) btn.classList.add('current');
      else btn.classList.remove('current');
    });
    applyZoomState(false);
    if (modalBody) {
      modalBody.scrollTop = 0;
      modalBody.scrollLeft = 0;
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    applyZoomState(false);
  }

  sampleCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var idx = parseInt(card.getAttribute('data-sample-index') || '0', 10);
      showSample(idx);
    });
  });

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var idx = parseInt(btn.getAttribute('data-tab-index') || '0', 10);
      showSample(idx);
    });
  });

  if (zoomBtn) {
    zoomBtn.addEventListener('click', function () {
      applyZoomState(!isZoomed);
    });
  }

  if (modalImg) {
    modalImg.addEventListener('click', function () {
      applyZoomState(!isZoomed);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target === modalBody) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });
})();
`;

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Esencial Gym · Deja de improvisar en el gym' },
      {
        name: 'description',
        content:
          'Empieza con tres días por semana (Push–Pull–Legs, cinco ejercicios por sesión). Incluye una alternativa de cuatro días, guía de primera visita y registro de 8 semanas. Descarga digital por $279 MXN.',
      },
      { property: 'og:title', content: 'Esencial Gym · Deja de improvisar en el gym' },
      {
        property: 'og:description',
        content:
          'Empieza con tres días por semana. Incluye una alternativa de cuatro días, guía de primera visita y registro de 8 semanas. Pago único $279 MXN.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap',
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
