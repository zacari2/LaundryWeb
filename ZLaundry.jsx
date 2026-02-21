import { useState } from "react";
import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --black: #0a0a0a;
    --white: #ffffff;
    --off-white: #f4f4f4;
    --green: #3ddc6e;
    --nav-bg: #d4d4d0;
    --border: #ddd;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--white);
    color: var(--black);
    overflow-x: hidden;
  }

  /* ── NAV ── */
  .zl-nav {
    background: var(--nav-bg);
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 28px;
    position: sticky; top: 0; z-index: 100;
  }

  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem; letter-spacing: 0.03em;
    color: var(--black); text-decoration: none;
    position: relative; display: inline-block;
    -webkit-text-stroke: 1.5px var(--black);
  }
  .nav-logo::after {
    content: '';
    position: absolute; bottom: -6px; left: -8px; right: -8px; height: 11px;
    border-bottom: 2.5px solid var(--black);
    border-radius: 0 0 55% 55% / 0 0 18px 18px;
  }

  .nav-links { display: flex; gap: 6px; }
  .nav-links a {
    font-size: 0.75rem; font-weight: 500; text-decoration: none;
    color: var(--white); background: var(--black);
    padding: 5px 16px; border-radius: 999px;
    transition: background 0.15s;
  }
  .nav-links a:hover { background: #333; }

  .nav-icons { display: flex; align-items: center; gap: 10px; }
  .nav-icon {
    width: 32px; height: 32px; border-radius: 50%;
    background: var(--black); color: var(--white);
    display: grid; place-items: center;
    font-size: 0.9rem; border: none; cursor: pointer;
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    min-height: calc(100vh - 54px);
    overflow: hidden;
    display: flex; flex-direction: column; justify-content: center;
  }

  .hero-bg-image {
    position: absolute; inset: 0;
    background: #7a9ca0;
    z-index: 0;
  }
  .hero-bg-image img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: blur(4px);
  }
  .hero-bg-ph {
    position: absolute; inset: 0; display: grid; place-items: center;
    font-size: 0.75rem; color: rgba(255,255,255,0.45);
    text-transform: uppercase; letter-spacing: 0.06em;
  }

  .hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.1) 100%);
    z-index: 1;
  }

  .hero-text-overlay {
    position: relative; z-index: 2;
    padding: 0px 50px 0;
    max-width: 550px;
  }

  .hero-text-overlay h1 {
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 700; line-height: 1.25;
    color: var(--white);
    text-shadow: 0 2px 12px rgba(0,0,0,0.3);
    margin-bottom: 10px;
  }

  .hero-text-overlay p {
    font-size: 1.1rem; color: rgba(255,255,255,0.88);
    line-height: 1.6; margin-bottom: 20px;
    text-shadow: 0 1px 6px rgba(0,0,0,0.25);
  }

  .btn-book {
    display: inline-block; padding: 9px 26px;
    background: var(--green); color: var(--black);
    font-weight: 700; font-size: 0.82rem;
    border-radius: 6px; text-decoration: none; border: none;
    cursor: pointer; width: fit-content;
    transition: opacity 0.15s;
  }
  .btn-book:hover { opacity: 0.85; }

  .hero-center-img {
    position: absolute; z-index: 2;
    top: 50%; right: 8%;
    transform: translateY(-50%);
    width: 590px; max-width: 52%;
    border-radius: 10px; overflow: hidden;
    box-shadow: 0 8px 40px rgba(0,0,0,0.35);
    background: #ccc;
    aspect-ratio: 16/9;
  }
  .hero-center-img img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .hero-ph {
    position: absolute; inset: 0; display: grid; place-items: center;
    font-size: 0.7rem; color: #888;
    text-transform: uppercase; letter-spacing: 0.05em;
  }

  /* ── TAGLINE STRIP ── */
  .tagline-strip {
    background: var(--black);
    padding: 28px 40px;
    display: flex; align-items: center; justify-content: center;
  }
  .tagline-strip h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3.5rem, 10vw, 8rem);
    line-height: 1;
    color: var(--white);
    letter-spacing: 0.01em;
    text-align: center;
  }

  /* ── HOW IT WORKS ── */
  .how-section {
    background: var(--black);
    padding: 0 40px 40px;
  }

  .how-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border: 1px solid #222;
  }

  .how-step {
    padding: 28px 24px;
    border-right: 1px solid #222;
    display: flex; flex-direction: column; align-items: center;
    gap: 12px; text-align: center;
    position: relative;
  }
  .how-step:last-child { border-right: none; }
  .how-step:not(:last-child)::after {
    content: '→';
    position: absolute; right: -14px; top: 36px;
    color: #444; font-size: 1rem; z-index: 2;
  }

  .how-circle {
    width: 64px; height: 64px; border-radius: 50%;
    background: #1a1a1a; border: 2px solid #333;
    display: grid; place-items: center;
  }
  .how-circle-inner {
    width: 38px; height: 38px; border-radius: 50%;
    background: #2a2a2a;
  }

  .how-step h3 { font-size: 0.82rem; font-weight: 600; color: var(--white); line-height: 1.3; }
  .how-step p  { font-size: 0.72rem; color: #666; line-height: 1.5; }

  /* ── FEATURES / CARDS ── */
  .features-section {
    background: var(--white);
    padding: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .feat-card {
    background: var(--off-white);
    border-radius: 12px;
    padding: 28px 24px;
    display: flex; flex-direction: column; align-items: center;
    text-align: center; gap: 12px;
    border: 1px solid var(--border);
    transition: box-shadow 0.2s;
  }
  .feat-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }

  .feat-icon-wrap {
    width: 56px; height: 56px; border-radius: 50%;
    background: var(--white); border: 1.5px solid #ddd;
    display: grid; place-items: center;
  }
  .feat-icon-wrap svg { width: 26px; height: 26px; }

  .feat-card h3 { font-size: 0.95rem; font-weight: 700; }
  .feat-card p  { font-size: 0.78rem; color: #666; line-height: 1.6; }

  /* ── BOTTOM DARK ── */
  .bottom-dark { background: var(--black); color: var(--white); }

  .tagline-bottom {
    padding: 40px 40px 28px;
    text-align: center;
    border-bottom: 1px solid #1a1a1a;
  }
  .tagline-bottom h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3rem, 9vw, 7.5rem);
    line-height: 1; letter-spacing: 0.01em;
    color: var(--white);
  }

  /* 4-step circles */
  .steps-circles {
    display: flex; justify-content: center; align-items: center;
    gap: 0; padding: 40px;
    border-bottom: 1px solid #1a1a1a;
  }

  .step-circle-wrap {
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    flex: 1; text-align: center;
  }

  .step-circle {
    width: 80px; height: 80px; border-radius: 50%;
    background: #1c1c1c; border: 2px solid #333;
    display: grid; place-items: center;
  }
  .step-circle svg { width: 32px; height: 32px; stroke: #aaa; fill: none; stroke-width: 1.5; }

  .step-arrow { font-size: 1.2rem; color: #333; padding: 0 8px; margin-bottom: 36px; }

  .step-circle-wrap h4 { font-size: 0.78rem; font-weight: 600; color: var(--white); }
  .step-circle-wrap p  { font-size: 0.68rem; color: #666; line-height: 1.5; max-width: 110px; }

  /* WHY CHOOSE */
  .why-section {
    display: grid; grid-template-columns: 1fr 1.4fr;
    gap: 0; align-items: center;
  }

  .why-image {
    aspect-ratio: 3/4; background: #1a1a1a;
    position: relative; overflow: hidden;
  }
  .why-image img { width: 100%; height: 100%; object-fit: cover; }
  .why-image .hero-ph { color: #333; }

  .why-text { padding: 48px 44px; }
  .why-text h2 { font-size: 1.5rem; font-weight: 700; line-height: 1.3; margin-bottom: 16px; }
  .why-text p  { font-size: 0.82rem; color: #888; line-height: 1.8; }

  /* FOOTER */
  .zl-footer {
    background: #050505; color: #444;
    text-align: center; padding: 20px;
    font-size: 0.75rem;
    border-top: 1px solid #111;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .hero-center-img { width: 260px; right: 4%; }
    .how-grid { grid-template-columns: 1fr 1fr; }
    .how-step:nth-child(2) { border-right: none; }
    .how-step:nth-child(2)::after { display: none; }
    .how-step { border-top: 1px solid #222; }
    .features-section { grid-template-columns: 1fr; }
    .steps-circles { flex-wrap: wrap; gap: 20px; }
    .why-section { grid-template-columns: 1fr; }
    .why-image { aspect-ratio: 16/9; }
  }

  @media (max-width: 768px) {
    .zl-nav { padding: 8px 16px; }
    .nav-links { display: none; }
    .hero { min-height: 60vw; }
    .hero-center-img { width: 180px; right: 3%; }
    .hero-text-overlay { padding: 28px 20px 0; }
    .hero-text-overlay h1 { font-size: 1.4rem; }
    .tagline-strip h2 { font-size: 2.8rem; }
    .how-grid { grid-template-columns: 1fr 1fr; }
    .how-step:nth-child(2) { border-right: none; }
    .how-step:nth-child(2)::after { display: none; }
    .features-section { grid-template-columns: 1fr; padding: 24px 16px; }
    .steps-circles { flex-wrap: wrap; gap: 16px; padding: 24px 16px; }
    .step-arrow { display: none; }
    .step-circle-wrap { flex: 0 0 calc(50% - 8px); }
    .why-section { grid-template-columns: 1fr; }
    .why-image { aspect-ratio: 16/9; }
    .why-text { padding: 28px 20px; }
    .tagline-bottom { padding: 24px 16px 20px; }
    .tagline-bottom h2 { font-size: 2.5rem; }
  }

  @media (max-width: 600px) {
    .hero-center-img { display: none; }
    .tagline-strip, .tagline-bottom, .how-section,
    .features-section, .steps-circles, .why-text { padding-left: 20px; padding-right: 20px; }
    .hero-text-overlay { padding: 32px 20px; }
    .nav-links { display: none; }
  }

  @media (max-width: 480px) {
    .nav-logo { font-size: 1.4rem; }
    .how-grid { grid-template-columns: 1fr; }
    .how-step::after { display: none; }
    .step-circle-wrap { flex: 0 0 100%; }
    .hero-center-img { display: none; }
    .hero-text-overlay h1 { font-size: 1.2rem; }
    .tagline-strip h2 { font-size: 2rem; }
  }
`;

export default function LandingPage() {
  return (
    <>
      <style>{styles}</style>

      {/* ── NAV ── */}
      <nav className="zl-nav">
        <Link className="nav-logo" to="/">ZLaundry</Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/machines">Book Laundry</Link>
          <Link to="/status">Status</Link>
          <Link to="/login">Login</Link>
        </div>
        <div className="nav-icons">
          <button className="nav-icon">🔔</button>
          <button className="nav-icon">👤</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        {/* Full background */}
        <div className="hero-bg-image">
          <img src="/Laundry Girl.jpg" alt="Girl with laundry" />
        </div>

        <div className="hero-overlay" />

        {/* Text top-left */}
        <div className="hero-text-overlay">
          <h1>Welcome, User!</h1>
          <p>A convenient laundry booking and tracking system designed for efficiency and ease of use.</p>
          <Link to="/login" className="btn-book">Book now!</Link>
        </div>

        {/* Floating image */}
        <div className="hero-center-img">
          <img src="/Hu tao.avif" alt="Girl by machine" />
        </div>
      </section>

      {/* ── TAGLINE STRIP ── */}
      <div className="tagline-strip">
        <h2>Fast.&nbsp;&nbsp;Simple.&nbsp;&nbsp;Fresh.</h2>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section">
        <div className="how-grid">
          {[
            { title: "Create an Account", desc: "Users register with their info to start using the app." },
            { title: "Book Laundry",      desc: "Users select service type, detergent, and schedule a wash." },
            { title: "Track Progress",    desc: "Users monitor the status of their laundry in real-time." },
            { title: "Pickup / Delivery", desc: "Users choose to have laundry picked up or delivered once done." },
          ].map((step) => (
            <div className="how-step" key={step.title}>
              <div className="how-circle"><div className="how-circle-inner" /></div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section className="features-section">
        <div className="feat-card">
          <div className="feat-icon-wrap">
            <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <circle cx="12" cy="15" r="3" />
              <line x1="12" y1="6" x2="12" y2="6" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
          <h3>Book Laundry</h3>
          <p>Schedule your laundry service in just a few steps.</p>
        </div>

        <div className="feat-card">
          <div className="feat-icon-wrap">
            <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <h3>Pickup &amp; Delivery</h3>
          <p>Get notified when your laundry is ready or on the way.</p>
        </div>

        <div className="feat-card">
          <div className="feat-icon-wrap">
            <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
          </div>
          <h3>Real-Time Tracker</h3>
          <p>Monitor remaining time and laundry status until it's ready.</p>
        </div>
      </section>

      {/* ── BOTTOM DARK ── */}
      <div className="bottom-dark">

        {/* Big tagline */}
        <div className="tagline-bottom">
          <h2>Fast. Simple. Fresh.</h2>
        </div>

        {/* 4-step circles */}
        <div className="steps-circles">
          <div className="step-circle-wrap">
            <div className="step-circle">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <h4>Create an Account</h4>
            <p>Users register with their info to start using the app.</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-circle-wrap">
            <div className="step-circle">
              <svg viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M8 2v4M16 2v4M4 10h16" />
              </svg>
            </div>
            <h4>Book Laundry</h4>
            <p>Users select service type, detergent, and schedule a wash.</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-circle-wrap">
            <div className="step-circle">
              <svg viewBox="0 0 24 24">
                <polyline points="22 7 13 16 9 12 2 18" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </div>
            <h4>Track Progress</h4>
            <p>Users monitor the status of their laundry in real-time.</p>
          </div>

          <div className="step-arrow">→</div>

          <div className="step-circle-wrap">
            <div className="step-circle">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <circle cx="12" cy="14" r="2" />
              </svg>
            </div>
            <h4>Pickup / Delivery</h4>
            <p>Users choose to have laundry picked up or delivered once done.</p>
          </div>
        </div>

        {/* WHY CHOOSE */}
        <div className="why-section">
          <div className="why-image">
            {/* <img src="/why-image.jpg" alt="" /> */}
            <span className="hero-ph">Image</span>
          </div>
          <div className="why-text">
            <h2>Why Choose Smart Laundry?</h2>
            <p>Smart Laundry is designed to make laundry day effortless. With our intuitive app, you can schedule your laundry, choose your preferred detergent, and track your order in real-time. Once your clothes are clean, you can choose to pick them up yourself or have them delivered straight to your doorstep, saving you time and hassle. Whether you're busy with work, school, or other commitments, Smart Laundry ensures your laundry is handled efficiently and reliably, so you can focus on what really matters.</p>
          </div>
        </div>

      </div>

      {/* ── FOOTER ── */}
      <footer className="zl-footer">
        &copy; 2026 Smart Laundry. All rights reserved.
      </footer>
    </>
  );
}