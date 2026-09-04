/* Karta — Demo Day 10.07.2026 · internal team review slides (v2, expanded) */
const FD = "var(--pp-font-display)";
const FB = "var(--pp-font-body)";
const FG = "var(--pp-fg)";
const FG2 = "var(--pp-fg-2)";
const FG3 = "var(--pp-fg-3)";
const FG4 = "var(--pp-fg-4)";
const ACID = "var(--pp-acid)";
const LINE = "var(--pp-line)";

/* ---------- primitives ---------- */
function StatBlock({ value, label, sub, accent, big }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "clamp(20px, 2.4vw, 32px)", background: accent ? "linear-gradient(135deg, rgba(204,255,0,.08), rgba(204,255,0,.02) 70%)" : "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)", border: `1px solid ${accent ? "rgba(204,255,0,.32)" : LINE}`, borderRadius: 14 }}>
      <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: accent ? ACID : FG4 }}>{label}</span>
      <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "115%", fontVariationSettings: "'wght' 800,'wdth' 115", fontSize: big ? "clamp(38px, 4.2vw, 58px)" : "clamp(28px, 3vw, 42px)", lineHeight: 1.05, color: accent ? ACID : FG, letterSpacing: "-.025em", fontVariantNumeric: "tabular-nums", overflowWrap: "break-word" }}>{value}</span>
      {sub && <span style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(13px, 1.3vw, 15px)", color: FG3, marginTop: 4 }}>{sub}</span>}
    </div>
  );
}

function BulletList({ items, dense }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: dense ? 8 : "clamp(10px, 1.2vw, 14px)" }}>
      {items.map((t, i) => (
        <li key={i} style={{ display: "flex", alignItems: "baseline", gap: 12, fontFamily: FD, fontWeight: 500, fontSize: dense ? "clamp(14px, 1.4vw, 16px)" : "clamp(16px, 1.7vw, 20px)", lineHeight: 1.45, color: FG, letterSpacing: "-.008em" }}>
          <span style={{ color: ACID, fontWeight: 700, fontSize: "1.15em", lineHeight: 1, flex: "none" }}>·</span>
          <span dangerouslySetInnerHTML={{ __html: t }} />
        </li>
      ))}
    </ul>
  );
}

function ColBlock({ title, items, accent, kicker }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "clamp(24px, 2.8vw, 36px)", background: accent ? "linear-gradient(135deg, rgba(204,255,0,.06), rgba(204,255,0,.015) 70%)" : "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)", border: `1px solid ${accent ? "rgba(204,255,0,.28)" : LINE}`, borderRadius: 14 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, paddingBottom: 14, borderBottom: `1px solid ${accent ? "rgba(204,255,0,.18)" : LINE}` }}>
        {kicker && <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: FG4 }}>{kicker}</span>}
        <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(18px, 1.7vw, 24px)", letterSpacing: ".05em", textTransform: "uppercase", color: accent ? ACID : FG, lineHeight: 1.1 }}>{title}</h3>
      </div>
      <BulletList items={items} dense />
    </div>
  );
}

/* vertical-bar funnel chart (Notion-style) */
function Funnel({ title, subtitle, steps, overall, accent }) {
  const max = steps[0]?.value || 1;
  const BAR_H = 260;
  const barColor = accent ? "#ccff00" : "#7c6bff";
  const barShadow = accent ? "linear-gradient(180deg, #ccff00 0%, #c2f000 100%)" : "linear-gradient(180deg, #9b8fff 0%, #7c6bff 60%, #6455e8 100%)";
  return (
    <div style={{ padding: "clamp(20px, 2.4vw, 30px)", borderRadius: 14, border: `1px solid ${accent ? "rgba(204,255,0,.28)" : LINE}`, background: accent ? "linear-gradient(135deg, rgba(204,255,0,.06), rgba(204,255,0,.015) 70%)" : "rgba(255,255,255,.02)", display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: accent ? ACID : FG4 }}>{title}</div>
          {subtitle && <div style={{ fontFamily: FD, fontWeight: 500, fontSize: 13, color: FG3, marginTop: 4 }}>{subtitle}</div>}
        </div>
        {overall && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: accent ? "rgba(204,255,0,.14)" : "rgba(124,107,255,.14)", border: `1px solid ${accent ? "rgba(204,255,0,.35)" : "rgba(124,107,255,.35)"}` }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: barColor }} />
            <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: accent ? ACID : "#9b8fff" }}>Overall · {overall}</span>
          </div>
        )}
      </div>

      {/* Bars row */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: "clamp(6px, 0.8vw, 12px)", alignItems: "end", height: BAR_H }}>
        {steps.map((s, i) => {
          const h = Math.max((s.value / max) * 100, 4);
          return (
            <div key={i} style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              {/* value tooltip */}
              <div style={{ position: "absolute", bottom: `calc(${h}% + 8px)`, left: "50%", transform: "translateX(-50%)", padding: "6px 10px", background: "rgba(10,10,10,.85)", border: `1px solid ${LINE}`, borderRadius: 6, display: "flex", flexDirection: "column", alignItems: "center", whiteSpace: "nowrap", zIndex: 2 }}>
                <span style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(11px, 1.2vw, 14px)", color: FG, fontVariantNumeric: "tabular-nums", lineHeight: 1.1 }}>{s.pct}</span>
                <span style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(10px, 1vw, 12px)", color: FG3, fontVariantNumeric: "tabular-nums", lineHeight: 1.1, marginTop: 2 }}>{s.value.toLocaleString()}</span>
              </div>
              {/* bar */}
              <div style={{ height: `${h}%`, borderRadius: "4px 4px 0 0", background: barShadow, boxShadow: accent ? "0 0 24px rgba(204,255,0,.25)" : "0 0 24px rgba(124,107,255,.25)" }} />
            </div>
          );
        })}
      </div>

      {/* Labels row */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: "clamp(6px, 0.8vw, 12px)", paddingTop: 10, borderTop: `1px solid ${LINE}` }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(10px, 1vw, 12px)", letterSpacing: ".14em", color: FG4 }}>{i + 1}</span>
            <span style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(11px, 1.15vw, 13px)", color: FG2, lineHeight: 1.25, overflow: "hidden", textOverflow: "ellipsis" }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Notion source image — clickable → opens Lightbox */
function NImg({ n, cap, tall, w }) {
  const src = `assets/notion/img_${String(n).padStart(2, "0")}.png`;
  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
      <img src={src} alt={cap || `Notion image ${n}`} data-lightbox-src={src} data-lightbox-cap={cap || ""} style={{ width: w || "100%", maxWidth: "100%", height: "auto", maxHeight: tall ? "none" : 480, objectFit: "contain", borderRadius: 10, border: `1px solid ${LINE}`, background: "#0a0a0a", cursor: "zoom-in", transition: "transform .2s, border-color .2s" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(204,255,0,.35)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = LINE; }} />
      {cap && <figcaption style={{ fontFamily: FD, fontWeight: 500, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: FG4 }}>{cap}</figcaption>}
    </figure>
  );
}

/* ==============================================================
   LIGHTBOX — click any Notion image → modal, arrows to navigate
   ============================================================== */
function Lightbox() {
  const [idx, setIdx] = uS(-1);
  const [items, setItems] = uS([]);

  uE(() => {
    const onClick = (e) => {
      const el = e.target.closest("[data-lightbox-src]");
      if (!el) return;
      e.preventDefault();
      const all = [...document.querySelectorAll("[data-lightbox-src]")];
      const i = all.indexOf(el);
      setItems(all.map(x => ({ src: x.dataset.lightboxSrc, cap: x.dataset.lightboxCap || "" })));
      setIdx(i);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  uE(() => {
    if (idx < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIdx(-1);
      else if (e.key === "ArrowLeft") setIdx(i => (i - 1 + items.length) % items.length);
      else if (e.key === "ArrowRight") setIdx(i => (i + 1) % items.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [idx, items.length]);

  if (idx < 0 || !items[idx]) return null;
  const cur = items[idx];
  const close = () => setIdx(-1);
  const go = (d) => setIdx(i => (i + d + items.length) % items.length);

  const arrowStyle = {
    position: "absolute", top: "50%", transform: "translateY(-50%)", width: 52, height: 52, borderRadius: 999,
    background: "rgba(255,255,255,.08)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,.14)", color: "#fafafa", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    transition: "background .2s, border-color .2s",
  };

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(3,3,3,.92)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", display: "flex", flexDirection: "column", padding: "clamp(20px, 3vw, 40px)" }}>

      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flex: "none" }}>
        <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 13, letterSpacing: ".22em", textTransform: "uppercase", color: FG4, fontVariantNumeric: "tabular-nums" }}>
          {idx + 1} / {items.length}
        </span>
        <button onClick={close} aria-label="Close" style={{ width: 44, height: 44, borderRadius: 999, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", color: "#fafafa", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4L14 14M14 4L4 14" /></svg>
        </button>
      </div>

      {/* image + arrows */}
      <div onClick={(e) => { if (e.target === e.currentTarget) close(); }} style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }}>
        <button onClick={() => go(-1)} aria-label="Previous"
          style={{ ...arrowStyle, left: 0 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(204,255,0,.14)"; e.currentTarget.style.borderColor = "rgba(204,255,0,.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.14)"; }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        {/\.(mp4|mov|webm)$/i.test(cur.src)
          ? <video key={cur.src} src={cur.src} controls autoPlay playsInline style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 10, boxShadow: "0 40px 100px rgba(0,0,0,.6)", background: "#000" }} />
          : <img src={cur.src} alt={cur.cap} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 10, boxShadow: "0 40px 100px rgba(0,0,0,.6)" }} />
        }
        <button onClick={() => go(1)} aria-label="Next"
          style={{ ...arrowStyle, right: 0 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(204,255,0,.14)"; e.currentTarget.style.borderColor = "rgba(204,255,0,.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.14)"; }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>

      {/* caption — big, prominent */}
      {cur.cap && (
        <div style={{ flex: "none", marginTop: 20, textAlign: "center" }}>
          <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "115%", fontVariationSettings: "'wght' 800,'wdth' 115", fontSize: "clamp(22px, 2.6vw, 34px)", letterSpacing: "-.015em", color: "#fafafa", lineHeight: 1.2 }}>{cur.cap}</span>
        </div>
      )}
    </div>
  );
}

/* ==============================================================
   01 · HERO
   ============================================================== */
function DemoHero() {
  const cardRef = uR(null), secRef = uR(null);
  useHeroRecede(cardRef, secRef);
  return (
    <section id="mission" data-screen-label="01 Demo Day" ref={secRef} style={{ position: "sticky", top: 0, zIndex: 0, height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, perspective: "1400px", perspectiveOrigin: "50% 0%" }}>
      <div ref={cardRef} style={{ position: "relative", width: "100%", height: "100%", borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 48, background: "#040404", transformOrigin: "50% 0%", willChange: "transform, opacity" }}>
        <HeroShaderBg intensity={1} />
        <h1 style={{ position: "relative", margin: 0, textAlign: "center", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(72px,14vw,220px)", lineHeight: .95, letterSpacing: "-.035em", color: "#fafafa" }}>
          <Stagger text="DEMO DAY" base={0.1} step={0.04} /><br />
          <span style={{ color: ACID }}><Stagger text="July" base={0.5} step={0.06} /></span>
        </h1>
      </div>
    </section>
  );
}

/* ==============================================================
   02 · CONTEXT / ROADMAP
   ============================================================== */
function DemoContext() {
  return (
    <React.Fragment>
      <SectionHero id="context" num="02" kicker="context · roadmap" align="left" glow
        parts={[{ t: "Перевыпуск карт. " }, { t: "−$0.5M GTV.", hi: true }]}
        lead="Часть карт попала к злоумышленнику. Клиентов поделили на 3 группы — хайспендерам вторая карта, нормалям перевыпуск, ноуспендерам — закрытие." />
      <Section tightTop dataLabel="02 Context">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(14px, 1.6vw, 22px)" }}>
          <StatBlock label="Baseline · week" value="$2.78M" sub="GTV · плато 29.06–19.07" />
          <StatBlock label="Week of reissue" value="−7.7 / −10.5%" sub="$2.57M · $2.49M" accent big />
          <StatBlock label="GTV loss" value="≈ $0.5M" sub="суммарно за 2 недели" />
          <StatBlock label="Card income · week" value="$68K / $66K" sub="было $75.2K/нед" />
        </div>
        <Reveal delay={0.08}>
          <div style={{ borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.04), rgba(255,255,255,.01) 70%)", overflow: "hidden" }}>
            <div style={{ padding: "clamp(16px, 1.8vw, 22px) clamp(20px, 2.2vw, 28px)", borderBottom: `1px solid ${LINE}`, display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>Когорты · перевыпуск карт</span>
              <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, color: FG3 }}>13 247 клиентов · 100% базы</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr .8fr .6fr", fontFamily: FD, fontVariantNumeric: "tabular-nums" }} className="dd-cohort-tbl">
              {[
                ["Когорта", "Критерий", "Users", "% базы"],
              ].map((row, i) => (
                <React.Fragment key={`h${i}`}>
                  {row.map((c, j) => (
                    <div key={j} style={{ padding: "14px clamp(18px, 2vw, 24px)", fontWeight: 700, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: FG4, textAlign: j >= 2 ? "right" : "left", borderBottom: `1px solid ${LINE}` }}>{c}</div>
                  ))}
                </React.Fragment>
              ))}
              {[
                { k: "High spenders", crit: "> $2 000", u: "1 241", p: "9.4%" },
                { k: "Normal spenders", crit: "0 < spend ≤ $2 000, либо рег. 23.05–09.06 без спенда", u: "4 324", p: "32.6%" },
                { k: "No spenders", crit: "≤ 0, рег. до 22.05", u: "7 682", p: "58.0%", accent: true },
              ].map((r, i) => (
                <React.Fragment key={i}>
                  <div style={{ padding: "clamp(14px, 1.6vw, 18px) clamp(18px, 2vw, 24px)", fontWeight: 700, fontSize: "clamp(15px, 1.5vw, 18px)", color: r.accent ? ACID : FG, borderTop: `1px solid ${LINE}` }}>{r.k}</div>
                  <div style={{ padding: "clamp(14px, 1.6vw, 18px) clamp(18px, 2vw, 24px)", fontWeight: 500, fontSize: "clamp(13px, 1.35vw, 15px)", color: FG2, borderTop: `1px solid ${LINE}`, lineHeight: 1.4 }}>{r.crit}</div>
                  <div style={{ padding: "clamp(14px, 1.6vw, 18px) clamp(18px, 2vw, 24px)", fontWeight: 700, fontSize: "clamp(15px, 1.5vw, 18px)", textAlign: "right", color: r.accent ? ACID : FG, borderTop: `1px solid ${LINE}` }}>{r.u}</div>
                  <div style={{ padding: "clamp(14px, 1.6vw, 18px) clamp(18px, 2vw, 24px)", fontWeight: 600, fontSize: "clamp(13px, 1.35vw, 15px)", textAlign: "right", color: r.accent ? ACID : FG3, borderTop: `1px solid ${LINE}` }}>{r.p}</div>
                </React.Fragment>
              ))}
              <div style={{ padding: "clamp(14px, 1.6vw, 18px) clamp(18px, 2vw, 24px)", fontWeight: 800, fontSize: "clamp(15px, 1.5vw, 18px)", color: FG, borderTop: `1px solid ${LINE}`, background: "rgba(255,255,255,.02)" }}>Итого</div>
              <div style={{ borderTop: `1px solid ${LINE}`, background: "rgba(255,255,255,.02)" }} />
              <div style={{ padding: "clamp(14px, 1.6vw, 18px) clamp(18px, 2vw, 24px)", fontWeight: 800, fontSize: "clamp(15px, 1.5vw, 18px)", textAlign: "right", color: FG, borderTop: `1px solid ${LINE}`, background: "rgba(255,255,255,.02)" }}>13 247</div>
              <div style={{ padding: "clamp(14px, 1.6vw, 18px) clamp(18px, 2vw, 24px)", fontWeight: 700, fontSize: "clamp(13px, 1.35vw, 15px)", textAlign: "right", color: FG, borderTop: `1px solid ${LINE}`, background: "rgba(255,255,255,.02)" }}>100%</div>
            </div>
            <style>{`@media (max-width: 720px) { .dd-cohort-tbl { grid-template-columns: 1fr 1fr !important; } .dd-cohort-tbl > *:nth-child(4n+2) { grid-column: 1 / -1 !important; } }`}</style>
          </div>
        </Reveal>
        <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)", marginTop: "clamp(8px, 1vw, 12px)" }}>
          <ColBlock title="Реактивация ноуспендеров" items={[
            "Закрыли карты <b>7 682</b> клиентам — экономия ≈ <b>$3K/мес</b>",
            "Вернулось <b>207</b>, принесли <b>$50K</b> спенда за неделю",
            "Внедряем в CRM — удержание в продукте",
          ]} accent />
          <ColBlock title="Free card эксперимент" items={[
            "Привели <b>203 клиента</b>, совершили более 1 картовой оплаты",
            "Эффект меньше реактивации, но кампания успешная",
            "Продолжаем — виральный движок Q3",
          ]} />
        </div>
      </Section>
    </React.Fragment>
  );
}

/* ==============================================================
   03 · BIZDEV
   ============================================================== */
function DemoBizdev() {
  const rainWins = [
    "Переподписали контракт с Rain — <b>улучшенные коммерческие условия</b>",
    "<b>Июнь = первый месяц с карточным GTV &gt;$10M</b> → по контракту 70% tier",
    "Transaction cost: <b>$0.075 → $0.05</b>",
    "<b>−15%</b> скидка на все Visa Network Fees",
    "Запустили с Rain работу по <b>виртуальным аккаунтам</b>, согласуем лимиты",
    "US программа: согласование, выход в live",
  ];
  const visaBullets = [
    "<b>Visa BIN Sponsorship</b> — Visa заинтересована помочь с банком-партнёром",
    "5 <b>on-ramp провайдеров</b> в работе (банковские карты, Apple Pay, Google Pay)",
    "QR-платежи: <b>3 провайдера</b> в переговорах",
    "Расширение карточной программы обсуждается с Visa напрямую",
  ];
  return (
    <React.Fragment>
      <SectionHero id="bizdev" num="03" kicker="bizdev" align="left" glow
        parts={[{ t: "Rain. Visa. " }, { t: "On-ramps.", hi: true }]}
        lead="Переподписали Rain, вошли в 70% tier, начали QR и Apple Pay." />
      <Section tightTop dataLabel="03 Bizdev">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(12px, 1.4vw, 18px)" }}>
          <StatBlock label="Card GTV · June" value=">$10M" sub="→ 70% interchange tier" accent big />
          <StatBlock label="Tx cost" value="$0.05" sub="было $0.075" />
          <StatBlock label="Visa fees" value="−15%" sub="скидка на network fees" />
        </div>
        <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)", marginTop: "clamp(20px, 2.4vw, 28px)" }}>
          <ColBlock title="Rain · контракт" items={rainWins} />
          <ColBlock title="Visa · on-ramps · QR" items={visaBullets} accent />
        </div>
        <Reveal delay={0.14}>
          <div style={{ marginTop: "clamp(20px, 2.4vw, 30px)", padding: "clamp(20px, 2vw, 28px)", background: "rgba(255,255,255,.03)", border: `1px solid ${LINE}`, borderRadius: 12 }}>
            <p style={{ margin: 0, fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: FG4, marginBottom: 12 }}>Interchange tier · revenue share</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }} className="dd-tier-grid">
              {[["0–5M","60%"], ["5–10M","65%"], ["10–15M","70%","current"], ["15–25M","75%"], ["25M+","80%"]].map(([r, v, c], i) => (
                <div key={i} style={{ padding: "12px 10px", borderRadius: 8, background: c ? "rgba(204,255,0,.08)" : "rgba(255,255,255,.02)", border: `1px solid ${c ? "rgba(204,255,0,.35)" : LINE}`, textAlign: "center" }}>
                  <div style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, color: c ? ACID : FG4, letterSpacing: ".08em" }}>${r}</div>
                  <div style={{ fontFamily: FD, fontWeight: 800, fontSize: "clamp(20px, 2.4vw, 28px)", color: c ? ACID : FG, marginTop: 4, fontVariantNumeric: "tabular-nums" }}>{v}</div>
                  {c && <div style={{ marginTop: 4, fontFamily: FD, fontWeight: 600, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: ACID }}>current</div>}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>
      <style>{`@media (max-width: 900px) { .dd-two-col { grid-template-columns: 1fr !important; } .dd-tier-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
    </React.Fragment>
  );
}

/* ==============================================================
   04 · PRODUCT METRICS
   ============================================================== */
function DemoProduct() {
  return (
    <React.Fragment>
      <SectionHero id="product" num="03" kicker="product metrics" align="left" glow
        parts={[{ t: "GTV $11.85M — " }, { t: "79% плана.", hi: true }]}
        lead="Без one-time клиента прошлого месяца — растём на 7%. Платящих +6.2%, транзакций +8.9%." />
      <Section tightTop dataLabel="03 Product">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(14px, 1.6vw, 22px)" }}>
          <StatBlock label="GTV · July" value="$11.85M" sub="цель $15M · 79% плана" accent big />
          <StatBlock label="MoM growth" value="+7%" sub="без one-time $1.4M клиента" />
          <StatBlock label="Paying users" value="5 941" sub="+6.2% · было 5 592" />
          <StatBlock label="Transactions" value="173K" sub="+8.9% · было 159K" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(14px, 1.6vw, 22px)", marginTop: "clamp(14px, 1.6vw, 22px)" }}>
          <StatBlock label="Median spend / user" value="$182" sub="было $174" />
          <StatBlock label="Plan gap" value="−$3.15M" sub="фокус на GTV/user" />
        </div>
        <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)", marginTop: "clamp(20px, 2.4vw, 28px)" }}>
          <ColBlock title="Опросы" items={[
            "<b>ОАЭ клиенты</b> ждут физкарты, AED-рельсы, мобильное приложение",
            "<b>Оттекшие клиенты</b> просят вернуть US ACH и Wire, кешбэк, физкарту",
            "AED рельсы — августовская доработка",
            "Mobile lead — не найден в июле, эффект с Q4",
          ]} />
          <ColBlock title="Что дальше" items={[
            "<b>Реактивация:</b> когорты + опрос по рефералам — приоритет 170 Tier A ($79K спенда)",
            "<b>Due Pay-in:</b> 25 человек с 4 августа, расширение 11–19, GBP/AED в phase 3",
            "<b>Разбивка деклайнов</b> по причинам — рычаг $14K/мес",
            "Экран Digital Wallet · CRM-триггеры · decline reasons",
          ]} accent />
        </div>
      </Section>
    </React.Fragment>
  );
}

/* ==============================================================
   05 · DELIVERY + DEV + QA
   ============================================================== */
function DemoDelivery() {
  return (
    <React.Fragment>
      <SectionHero id="delivery" num="04" kicker="delivery · dev · qa" align="left" glow
        parts={[{ t: "Rails, карты, " }, { t: "безопасность.", hi: true }]}
        lead="Rain Pay-in, кнопка перевыпуска и вторая карта, Intercom SDK, стрелка QA 55 → 72%." />
      <Section tightTop dataLabel="04 Delivery">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(14px, 1.6vw, 22px)" }}>
          <StatBlock label="Avg SP · July" value="329" sub="план 309 · +6.5%" accent big />
          <StatBlock label="Feature SP" value="280" sub="было 269 в июне" />
          <StatBlock label="Incident SP" value="49" sub="было 59 в июне · −17%" />
          <StatBlock label="QA PassRate" value="72%" sub="стабильность 90%" />
        </div>

        {/* Ship log */}
        <Reveal delay={0.08}>
          <div style={{ marginTop: "clamp(20px, 2.4vw, 30px)", padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)" }}>
            <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(18px, 1.8vw, 24px)", letterSpacing: ".04em", textTransform: "uppercase", color: FG, marginBottom: 20 }}>Ship log · July</h3>
            <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 26px)" }}>
              <ColBlock title="Платёжные rails" items={[
                "<b>01.07</b> — Rain Pay-in, входящие через виртуальные счета (ACH/Wire)",
                "<b>09.07</b> — виртуальные аккаунты Rain и Due на сотрудников (догфудинг)",
                "Первый фиатный рейл на входе — <b>причина №1 оттока</b> в опросе",
              ]} />
              <ColBlock title="Карты" items={[
                "<b>23.07</b> — кнопка перевыпуска и статус Under Review",
                "<b>24.07</b> — вторая карта в интерфейсе",
                "Продуктовая работа июля сделала <b>операционку июля возможной</b>",
              ]} accent />
              <ColBlock title="Безопасность" items={[
                "<b>15.07</b> — Intercom SDK с identity verification — закрыта уязвимость подмены user_id",
                "<b>16.07</b> — закрыта публичная регистрация в CMS <b>за 2 недели до атаки на Strapi</b>",
              ]} />
              <ColBlock title="Growth инфра" items={[
                "<b>15–17.07</b> — синхронизация email/person_id из KYC в Customer.io",
                "<b>22.07</b> — ручная синхронизация рефералов через Keitaro, восстановление после поломки реф-ссылки 01.07",
              ]} accent />
            </div>
          </div>
        </Reveal>

        {/* Delayed + focus */}
        <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)", marginTop: "clamp(20px, 2.4vw, 28px)" }}>
          <ColBlock title="Задержки" items={[
            "<b>Due Pay-in</b> сдвинулся на 6 августа: баг Sumsub, сверка анкеты, рефанды",
          ]} />
          <ColBlock title="Открытые проблемы" items={[
            "Критикал багов меньше — но <b>меньше релизов</b>",
            "Ключевые точки риска: <b>безопасность</b> и <b>интеграции платежек</b>",
            "Стабильность окружений",
          ]} />
        </div>

        {/* Incident dashboards · June vs July */}
        <Reveal delay={0.14}>
          <div style={{ marginTop: "clamp(20px, 2.4vw, 30px)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(14px, 1.8vw, 22px)" }} className="dd-two-col">
            {[
              {
                title: "Incident issues · Июнь", total: 10, max: 4,
                bars: [
                  { label: "Blocker", segs: [{v:2,c:"#4a90e2"},{v:1,c:"#e07a3f"}], total: 3 },
                  { label: "Critical", segs: [{v:1,c:"#4a90e2"},{v:1,c:"#e07a3f"},{v:1,c:"#3ac16f"},{v:1,c:"#a04a5e"}], total: 4 },
                  { label: "Major",    segs: [{v:1,c:"#4a90e2"},{v:1,c:"#e07a3f"},{v:1,c:"#3ac16f"}], total: 3 },
                ],
                legend: [{k:"Personal",c:"#4a90e2"},{k:"Platform",c:"#e07a3f"},{k:"Delivery",c:"#3ac16f"},{k:"Business",c:"#a04a5e"}],
                rows: [
                  ["Blocker", 3, 2, 1, 0, 0],
                  ["Critical", 4, 1, 1, 1, 1],
                  ["Major", 3, 1, 1, 1, 0],
                ],
              },
              {
                title: "Incident issues · Июль", total: 4, max: 4,
                bars: [
                  { label: "Blocker", segs: [{v:1,c:"#3ac16f"}], total: 1 },
                  { label: "Critical", segs: [{v:1,c:"#4a90e2"},{v:2,c:"#3ac16f"}], total: 3 },
                ],
                legend: [{k:"Personal",c:"#4a90e2"},{k:"Delivery",c:"#3ac16f"}],
                rows: [
                  ["Blocker", 1, 0, 1],
                  ["Critical", 3, 1, 2],
                ],
                hi: true,
              },
            ].map((d, i) => (
              <div key={i} style={{ padding: "clamp(18px, 2vw, 22px)", borderRadius: 12, border: d.hi ? "1px solid rgba(204,255,0,.28)" : `1px solid ${LINE}`, background: d.hi ? "linear-gradient(135deg, rgba(204,255,0,.06), rgba(204,255,0,.015) 70%)" : "linear-gradient(165deg, rgba(255,255,255,.04), rgba(255,255,255,.01) 70%)" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(14px, 1.4vw, 17px)", color: d.hi ? ACID : FG }}>{d.title}</span>
                  <span style={{ fontFamily: FD, fontWeight: 800, fontSize: "clamp(22px, 2.4vw, 28px)", color: d.hi ? ACID : FG }}>{d.total}</span>
                </div>
                <div style={{ position: "relative", height: 260, marginBottom: 8, paddingLeft: 4, paddingRight: 28 }}>
                  {Array.from({ length: d.max + 1 }, (_, k) => k).map((y) => (
                    <React.Fragment key={y}>
                      <div style={{ position: "absolute", left: 4, right: 28, bottom: `${(y / d.max) * 100}%`, borderTop: y === 0 ? `1px solid ${LINE}` : `1px dashed rgba(255,255,255,.06)`, height: 0, pointerEvents: "none" }} />
                      <span style={{ position: "absolute", right: 4, bottom: `calc(${(y / d.max) * 100}% - 7px)`, fontFamily: FD, fontWeight: 500, fontSize: 10, color: FG4, fontVariantNumeric: "tabular-nums" }}>{y}</span>
                    </React.Fragment>
                  ))}
                  <div style={{ position: "absolute", inset: "0 28px 0 4px", display: "flex", alignItems: "flex-end", justifyContent: "space-around", gap: 24 }}>
                    {d.bars.map((b, j) => (
                      <div key={j} style={{ display: "flex", flexDirection: "column-reverse", width: 40, height: `${(b.total / d.max) * 100}%`, borderRadius: "3px 3px 0 0", overflow: "hidden" }}>
                        {b.segs.map((s, k) => (
                          <div key={k} style={{ height: `${(s.v / b.total) * 100}%`, background: s.c }} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", gap: 24, paddingLeft: 4, paddingRight: 28, marginBottom: 16 }}>
                  {d.bars.map((b, j) => (
                    <span key={j} style={{ width: 40, textAlign: "center", fontFamily: FD, fontWeight: 600, fontSize: 12, color: FG3 }}>{b.label}</span>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: `1.2fr .8fr repeat(${d.legend.length}, 1fr)`, fontFamily: FD, fontVariantNumeric: "tabular-nums", gap: 0 }}>
                  <div style={{ padding: "12px 14px", fontWeight: 700, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: FG4 }}>Label</div>
                  <div style={{ padding: "12px 14px", fontWeight: 700, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: FG4, textAlign: "right" }}>Count</div>
                  {d.legend.map((l, k) => (
                    <div key={k} style={{ padding: "12px 10px", fontWeight: 700, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: FG4, textAlign: "right", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: l.c }} />{l.k}
                    </div>
                  ))}
                  {d.rows.map((r, k) => (
                    <React.Fragment key={k}>
                      {r.map((c, m) => (
                        <div key={m} style={{ padding: "12px 14px", fontWeight: m === 0 ? 700 : 600, fontSize: m === 1 ? "clamp(15px, 1.5vw, 18px)" : "clamp(13px, 1.35vw, 15px)", color: m === 0 ? FG : (m === 1 ? FG : FG2), textAlign: m === 0 ? "left" : "right", borderTop: `1px solid ${LINE}` }}>{c}</div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>
    </React.Fragment>
  );
}

/* ==============================================================
   06 · MARKETING
   ============================================================== */
function DemoMarketing() {
  return (
    <React.Fragment>
      <SectionHero id="marketing" num="05" kicker="marketing" align="left" glow
        parts={[{ t: "GTV новых пользователей " }, { t: "+80% MoM.", hi: true }]}
        lead="Пересобрали аналитику после двух ударов и получили лучший результат в FB с февраля." />
      <Section tightTop dataLabel="05 Marketing">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(14px, 1.6vw, 22px)" }}>
          <StatBlock label="GTV · new users" value="+80%" sub="MoM · незакрытая когорта" accent big />
          <StatBlock label="vs peak" value="+17%" sub="лучше предыдущего пика" />
          <StatBlock label="Aug target" value="$939K" sub="закрытая когорта · $770K Admin" />
          <StatBlock label="Lead cost" value="$20" sub="было $80 (×4 дешевле)" />
        </div>

        {/* Двойной удар */}
        <Reveal delay={0.08}>
          <div style={{ marginTop: "clamp(20px, 2.4vw, 30px)", padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)" }}>
            <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(18px, 1.8vw, 24px)", letterSpacing: ".04em", textTransform: "uppercase", color: FG, marginBottom: 20 }}>Главный вызов: пересборка аналитики</h3>
            <BulletList items={[
              "<b>Перевыпуск скомпрометированных карт</b> — Card Created события стреляют в Paid как новые пользователи",
              "<b>Дробление SumsubVerification</b> на составные части обнулило Postback в Paid",
              "Инцидент подсветил необходимость <b>единой аналитической структуры</b> внутри компании и маркетинга",
            ]} />
          </div>
        </Reveal>

        {/* GTV +80% MoM chart — programmatic bars */}
        <Reveal delay={0.1}>
          <div style={{ marginTop: "clamp(20px, 2.4vw, 30px)", padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.04), rgba(255,255,255,.01) 70%)" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <h4 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(18px, 1.8vw, 24px)", letterSpacing: "-.012em", color: FG }}>GTV по когортам</h4>
              <div style={{ display: "flex", gap: 20, fontFamily: FD, fontWeight: 600, fontSize: 13, color: FG3 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: "#4a90e2" }} /> GTV Admin</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: ACID }} /> GTV New</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "clamp(10px, 1.4vw, 20px)", alignItems: "end", height: "clamp(220px, 26vw, 320px)" }}>
              {[
                { m: "Фев", a: 478, n: 700 },
                { m: "Мар", a: 444, n: 594 },
                { m: "Апр", a: 491, n: 664 },
                { m: "Май", a: 355, n: 408 },
                { m: "Июн", a: 400, n: 460 },
                { m: "Июл", a: 734, n: 823, hi: true },
              ].map((d, i) => {
                const max = 900;
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%" }}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: "100%", width: "100%", justifyContent: "center" }}>
                      <div style={{ position: "relative", width: "40%", maxWidth: 42, height: `${(d.a / max) * 100}%`, background: "#4a90e2", borderRadius: "4px 4px 0 0", opacity: d.hi ? 1 : .88 }}>
                        <span style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", fontFamily: FD, fontWeight: 700, fontSize: 11, color: FG3, whiteSpace: "nowrap" }}>{d.a}K</span>
                      </div>
                      <div style={{ position: "relative", width: "40%", maxWidth: 42, height: `${(d.n / max) * 100}%`, background: d.hi ? ACID : "#a78bfa", borderRadius: "4px 4px 0 0" }}>
                        <span style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", fontFamily: FD, fontWeight: 700, fontSize: 11, color: d.hi ? ACID : FG, whiteSpace: "nowrap" }}>{d.n}K</span>
                      </div>
                    </div>
                    <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, color: d.hi ? ACID : FG3, letterSpacing: ".04em" }}>{d.m}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Andromeda + attribution */}
        <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)", marginTop: "clamp(20px, 2.4vw, 28px)", alignItems: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ColBlock title="FB · Andromeda" items={[
              "Запустили широкую кампанию по <b>новой структуре Andromeda</b>",
              "<b>Лучший результат с февраля</b> в финансовой категории",
            ]} accent />
            <div style={{ marginTop: 12, padding: "clamp(18px, 2vw, 24px)", borderRadius: 12, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.04), rgba(255,255,255,.01) 70%)", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                {[
                  { l: "Всего за период", v: "556", s: "1 июля — 4 августа" },
                  { l: "Июль", v: "424", s: "13,7 в день" },
                  { l: "Август 1–4", v: "132", s: "33,0 в день", hi: "+141% к темпу июля" },
                  { l: "Пик", v: "42", s: "30 июля" },
                ].map((k, i) => (
                  <div key={i} style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${LINE}`, background: "rgba(255,255,255,.02)" }}>
                    <div style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: FG4, marginBottom: 4 }}>{k.l}</div>
                    <div style={{ fontFamily: FD, fontWeight: 800, fontVariantNumeric: "tabular-nums", fontSize: "clamp(24px, 2.6vw, 32px)", lineHeight: 1, color: FG }}>{k.v}</div>
                    <div style={{ fontFamily: FD, fontWeight: 500, fontSize: 11, color: FG3, marginTop: 4 }}>{k.s}</div>
                    {k.hi && <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, color: ACID, marginTop: 2 }}>↑ {k.hi}</div>}
                  </div>
                ))}
              </div>
              <div style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${LINE}`, background: "rgba(255,255,255,.02)", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: FG4, marginBottom: 10 }}>Карты · создано в день</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, flex: 1, minHeight: 100 }}>
                  {[16,9,16,7,15,4,6,10,13,7,22,5,17,11,15,4,9,16,13,7,15,10,17,12,7,12,4,17,20,42,38,36,32,41,25,22].map((v, i) => (
                    <div key={i} style={{ flex: 1, height: `${(v / 42) * 100}%`, background: i >= 30 ? "#e07a3f" : (i >= 29 ? ACID : "#4a90e2"), borderRadius: "2px 2px 0 0", minHeight: 2 }} />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: FD, fontWeight: 500, fontSize: 10, color: FG4 }}>
                  <span>1 июл</span><span>июль</span><span>1 авг · 4 авг</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ColBlock title="Attribution · FB Ads" items={[
              "Начали активно фиксить <b>проклейку Paid источников</b> в Mixpanel",
              "Вот как изменилась атрибуция FB Ads после <b>сквозной проклейки</b>",
            ]} />
            <div style={{ marginTop: 12, padding: "clamp(18px, 2vw, 24px)", borderRadius: 12, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.04), rgba(255,255,255,.01) 70%)", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: FG4, marginBottom: 18 }}>Регистрации · по источникам · недельно</div>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 4, flex: 1, minHeight: 220, paddingBottom: 4, borderBottom: `1px solid ${LINE}` }}>
                {[
                  { w: "May 4", total: 10, breakdown: [{s:"organic",v:6,c:"#a04a5e"},{s:"paid",v:3,c:"#e0a55e"},{s:"ref",v:1,c:"#4a90e2"}] },
                  { w: "May 11", total: 8, breakdown: [{s:"organic",v:5,c:"#a04a5e"},{s:"paid",v:2,c:"#e0a55e"},{s:"ref",v:1,c:"#4a90e2"}] },
                  { w: "May 18", total: 12, breakdown: [{s:"organic",v:8,c:"#a04a5e"},{s:"paid",v:3,c:"#e0a55e"},{s:"ref",v:1,c:"#4a90e2"}] },
                  { w: "May 25", total: 21, breakdown: [{s:"organic",v:15,c:"#a04a5e"},{s:"paid",v:4,c:"#e0a55e"},{s:"ref",v:2,c:"#4a90e2"}] },
                  { w: "Jun 1", total: 30, breakdown: [{s:"organic",v:23,c:"#a04a5e"},{s:"paid",v:5,c:"#e0a55e"},{s:"ref",v:2,c:"#4a90e2"}] },
                  { w: "Jun 8", total: 37, breakdown: [{s:"organic",v:26,c:"#a04a5e"},{s:"paid",v:6,c:"#e0a55e"},{s:"ref",v:5,c:"#4a90e2"}] },
                  { w: "Jun 15", total: 26, breakdown: [{s:"organic",v:20,c:"#a04a5e"},{s:"paid",v:4,c:"#e0a55e"},{s:"ref",v:2,c:"#4a90e2"}] },
                  { w: "Jun 22", total: 21, breakdown: [{s:"organic",v:16,c:"#a04a5e"},{s:"paid",v:3,c:"#e0a55e"},{s:"ref",v:2,c:"#4a90e2"}] },
                  { w: "Jun 29", total: 22, breakdown: [{s:"organic",v:17,c:"#a04a5e"},{s:"paid",v:3,c:"#e0a55e"},{s:"ref",v:2,c:"#4a90e2"}] },
                  { w: "Jul 6", total: 31, breakdown: [{s:"organic",v:25,c:"#a04a5e"},{s:"paid",v:4,c:"#e0a55e"},{s:"ref",v:2,c:"#4a90e2"}] },
                  { w: "Jul 13", total: 27, breakdown: [{s:"organic",v:21,c:"#a04a5e"},{s:"paid",v:4,c:"#e0a55e"},{s:"ref",v:2,c:"#4a90e2"}] },
                  { w: "Jul 20", total: 31, breakdown: [{s:"organic",v:24,c:"#a04a5e"},{s:"paid",v:5,c:"#e0a55e"},{s:"ref",v:2,c:"#4a90e2"}] },
                  { w: "Jul 27", total: 48, breakdown: [{s:"organic",v:39,c:"#a04a5e"},{s:"paid",v:6,c:"#e0a55e"},{s:"ref",v:3,c:"#4a90e2"}], hi: true },
                  { w: "Aug 3", total: 29, breakdown: [{s:"paid",v:12,c:"#8b6b3a"},{s:"organic",v:10,c:"#5a3540"},{s:"ref",v:7,c:"#4a90e2"}], recent: true },
                ].map((w, i) => {
                  const max = 50;
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", position: "relative" }}>
                      {w.hi && <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, color: ACID, marginBottom: 4 }}>{w.total}</span>}
                      <div style={{ display: "flex", flexDirection: "column-reverse", width: "78%", maxWidth: 36, height: `${(w.total / max) * 100}%`, borderRadius: "3px 3px 0 0", overflow: "hidden", opacity: w.recent ? .55 : 1, outline: w.hi ? `1px solid ${ACID}` : "none", outlineOffset: 1 }}>
                        {w.breakdown.map((b, j) => (
                          <div key={j} style={{ height: `${(b.v / w.total) * 100}%`, background: b.c }} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 4, marginTop: 10 }}>
                {["May 4","May 11","May 18","May 25","Jun 1","Jun 8","Jun 15","Jun 22","Jun 29","Jul 6","Jul 13","Jul 20","Jul 27","Aug 3"].map((label, i) => (
                  <span key={i} style={{ flex: 1, textAlign: "center", fontFamily: FD, fontWeight: 500, fontSize: 10, color: i === 12 ? ACID : FG4, letterSpacing: ".02em", whiteSpace: "nowrap" }}>{label}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, marginTop: 12, flexWrap: "wrap", fontFamily: FD, fontWeight: 500, fontSize: 11, color: FG3 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#a04a5e" }} /> Organic</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#e0a55e" }} /> FB Paid</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "#4a90e2" }} /> Referral</span>
                <span style={{ marginLeft: "auto", color: ACID, fontWeight: 700 }}>Jul 27: пик после Andromeda ↑</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottlenecks */}
        <Reveal delay={0.14}>
          <div style={{ marginTop: "clamp(20px, 2.4vw, 30px)", padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: "1px solid rgba(204,255,0,.32)", background: "linear-gradient(135deg, rgba(204,255,0,.08), rgba(204,255,0,.02) 70%)" }}>
            <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(18px, 1.8vw, 24px)", letterSpacing: ".04em", textTransform: "uppercase", color: ACID, marginBottom: 16 }}>Bottlenecks · country breakdown</h3>
            <BulletList items={[
              "Нет <b>QR платежей</b> для Тайланда и Индонезии",
              "Нет <b>сквозной аналитики</b> по спенду пользователей до ГЕО в компании",
              "Ведём лиды по $20 вместо $80, но не можем ответить <b>как эти пользователи спендят</b>",
            ]} />
            <div style={{ marginTop: 16, borderRadius: 12, border: "1px solid rgba(204,255,0,.2)", overflow: "hidden", background: "rgba(0,0,0,.25)" }}>
              <div style={{ padding: "16px 26px", borderBottom: `1px solid ${LINE}`, fontFamily: FD, fontWeight: 600, fontSize: 14, letterSpacing: ".22em", textTransform: "uppercase", color: FG4, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <span>FB Ads · country breakdown</span>
                <span>Jul 29 – Aug 3, 2026</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.4fr .8fr .8fr .7fr .7fr .8fr .8fr", minWidth: 720, fontFamily: FD, fontVariantNumeric: "tabular-nums" }}>
                  {["Country", "Amount", "Reach", "Leads", "Purch.", "Cost / p.", "Deposit"].map((h, i) => (
                    <div key={i} style={{ padding: "16px 22px", fontWeight: 700, fontSize: 14, letterSpacing: ".2em", textTransform: "uppercase", color: FG4, borderBottom: `1px solid ${LINE}`, textAlign: i === 0 ? "left" : "right", background: "rgba(255,255,255,.02)" }}>{h}</div>
                  ))}
                  {[
                    { c: ["Indonesia", "$211", "31 488", "66", "11", "$19", "46"] },
                    { c: ["Thailand", "$256", "19 383", "37", "10", "$26", "24"] },
                    { c: ["Vietnam", "$168", "19 659", "58", "7", "$24", "18"] },
                    { c: ["Kosovo", "$103", "9 085", "57", "7", "$15", "12"] },
                    { c: ["Serbia", "$278", "25 818", "15", "6", "$46", "162"], hi: true },
                    { c: ["Egypt", "$344", "34 439", "143", "5", "$69", "19"] },
                    { c: ["UAE", "$748", "31 320", "22", "4", "$187", "109"], hi: true },
                    { c: ["Canada", "$155", "5 202", "64", "4", "$39", "11"] },
                    { c: ["Morocco", "$825", "265 741", "67", "4", "$206", "41"] },
                    { c: ["Moldova", "$225", "17 374", "36", "4", "$56", "105"] },
                    { c: ["Bosnia & H.", "$60", "5 738", "20", "3", "$20", "8"] },
                    { c: ["Jordan", "$169", "37 392", "15", "3", "$56", "12"] },
                  ].map((r, i) => (
                    <React.Fragment key={i}>
                      {r.c.map((c, j) => (
                        <div key={j} style={{ padding: "15px 22px", fontWeight: j === 0 ? 700 : 600, fontSize: "clamp(16px, 1.55vw, 20px)", textAlign: j === 0 ? "left" : "right", color: r.hi ? ACID : (j === 0 ? FG : FG2), borderBottom: `1px solid ${LINE}`, background: r.hi ? "rgba(204,255,0,.04)" : "transparent" }}>{c}</div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </React.Fragment>
  );
}

/* ==============================================================
   07 · DESIGN — Product Design sub-block (click-through features)
   ============================================================== */
const PD_FEATURES = [
  { title: "Negative Balance",     desc: "Экран заблокированного аккаунта и карты при отрицательном балансе — CTA Top Up to Unlock.", img: "assets/pd-jul/negative-balance.png" },
  { title: "Referral Code",        desc: "Обновлённая реферальная программа: экран профиля, ввод чужого кода, Invite Friends · Earn Karat.", img: "assets/pd-jul/referral-code.png" },
  { title: "PayOut Design Review", desc: "Design review новой отправки: 30+ экранов, 60+ замечаний по вёрстке и flow.", img: "assets/pd-jul/payout-review.png" },
  { title: "24h Offer",            desc: "Кликабельный прототип оффера — открывается на весь экран.", proto: "https://www.figma.com/proto/jxQnH89kRrFtDB5W1yexHy/Karta-Personal?node-id=32889-289546&viewport=-3416%2C-3295%2C0.83&t=2jMe2pPKQgaz0WbV-8&scaling=scale-down&content-scaling=responsive&starting-point-node-id=32889%3A289546&page-id=32092%3A97584&hide-ui=1" },
];
function ProductDesignBlock() {
  const [active, setActive] = uS(0);
  const [protoOpen, setProtoOpen] = uS(false);
  const protoRef = uR(null);
  const cur = PD_FEATURES[active];

  uE(() => {
    if (!protoOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setProtoOpen(false); };
    const onFsChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        setProtoOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    // Enter fullscreen after the modal element is in the DOM
    const raf = requestAnimationFrame(() => {
      const el = protoRef.current;
      if (!el) return;
      const req = el.requestFullscreen || el.webkitRequestFullscreen;
      if (req) { try { req.call(el); } catch (_) {} }
    });
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
      cancelAnimationFrame(raf);
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        const exit = document.exitFullscreen || document.webkitExitFullscreen;
        if (exit) { try { exit.call(document); } catch (_) {} }
      }
    };
  }, [protoOpen]);

  return (
    <div>
      <div className="pd-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)", gap: "clamp(20px, 2.8vw, 40px)", alignItems: "start" }}>
        {/* Features list */}
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {PD_FEATURES.map((f, i) => {
            const on = i === active;
            return (
              <li key={i}>
                <button onClick={() => setActive(i)}
                  style={{ width: "100%", textAlign: "left", background: on ? "linear-gradient(165deg, rgba(204,255,0,.08), rgba(204,255,0,.02) 70%)" : "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)", border: `1px solid ${on ? "rgba(204,255,0,.4)" : LINE}`, borderRadius: 12, padding: "clamp(18px, 2vw, 26px) clamp(18px, 2vw, 24px)", cursor: "pointer", color: FG, transition: "background .25s, border-color .25s, transform .15s", display: "flex", flexDirection: "column", gap: 6 }}
                  onMouseEnter={(e) => { if (!on) e.currentTarget.style.borderColor = "rgba(204,255,0,.28)"; }}
                  onMouseLeave={(e) => { if (!on) e.currentTarget.style.borderColor = LINE; }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(13px, 1.3vw, 16px)", letterSpacing: ".08em", color: on ? ACID : FG4, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontStretch: "115%", fontVariationSettings: "'wght' 700,'wdth' 115", fontSize: "clamp(16px, 1.7vw, 22px)", letterSpacing: "-.012em", color: FG }}>{f.title}</span>
                    {f.proto && <span style={{ marginLeft: "auto", fontFamily: FD, fontWeight: 700, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: on ? ACID : FG4, padding: "3px 8px", border: `1px solid ${on ? "rgba(204,255,0,.4)" : LINE}`, borderRadius: 999 }}>Figma proto</span>}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Preview */}
        <div style={{ position: "relative", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)", padding: "clamp(20px, 2.4vw, 32px)", minHeight: 380, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
          {cur.proto ? (
            <React.Fragment>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center", maxWidth: 460 }}>
                <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: ACID }}>Figma prototype</span>
                <h4 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(24px, 2.6vw, 34px)", letterSpacing: "-.02em", lineHeight: 1.15, color: FG }}>{cur.title}</h4>
              </div>
              <button onClick={() => setProtoOpen(true)}
                style={{ marginTop: 6, padding: "14px 24px", borderRadius: 999, background: ACID, color: "#0a0a0a", border: "none", cursor: "pointer", fontFamily: FD, fontWeight: 700, fontStretch: "115%", fontVariationSettings: "'wght' 700,'wdth' 115", fontSize: "clamp(15px, 1.5vw, 17px)", letterSpacing: "-.008em", display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 8px 24px rgba(204,255,0,.22)" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="4,2.5 12,8 4,13.5" fill="#0a0a0a" /></svg>
                Открыть прототип
              </button>
              <a href={cur.proto} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FD, fontWeight: 500, fontSize: 12, color: FG4, textDecoration: "underline", textDecorationColor: "rgba(255,255,255,.15)", textUnderlineOffset: 3 }}>
                Открыть в Figma в новой вкладке →
              </a>
            </React.Fragment>
          ) : cur.img ? (
            <img src={cur.img} alt={cur.title} data-lightbox-src={cur.img} data-lightbox-cap={cur.title}
              style={{ maxWidth: "100%", maxHeight: 620, width: "auto", height: "auto", objectFit: "contain", borderRadius: 10, cursor: "zoom-in" }} />
          ) : (
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 10, alignItems: "center", opacity: .7 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", border: `1.5px dashed ${FG4}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={FG4} strokeWidth="1.5"><path d="M3 5h14v10H3z" /><path d="M3 12l4-4 3 3 3-3 4 4" /><circle cx="7" cy="8" r="1" /></svg>
              </div>
              <div style={{ fontFamily: FD, fontWeight: 600, fontSize: "clamp(14px, 1.4vw, 16px)", letterSpacing: ".08em", textTransform: "uppercase", color: FG3 }}>Макетов нет</div>
              <div style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(12px, 1.2vw, 14px)", color: FG4, maxWidth: 320 }}>{cur.note || "работаем по описанию"}</div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen prototype modal */}
      {protoOpen && cur.proto && (
        <div ref={protoRef} onClick={() => setProtoOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,.92)", display: "flex", flexDirection: "column", padding: "clamp(18px, 2vw, 28px)", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, color: FG }}>
            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: FG3 }}>{cur.title} · Figma prototype</span>
            <button onClick={(e) => { e.stopPropagation(); setProtoOpen(false); }}
              style={{ padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,.08)", color: FG, border: `1px solid ${LINE}`, cursor: "pointer", fontFamily: FD, fontWeight: 600, fontSize: 13, letterSpacing: ".04em" }}>
              Закрыть · Esc
            </button>
          </div>
          <div onClick={(e) => e.stopPropagation()} style={{ flex: 1, borderRadius: 12, overflow: "hidden", border: `1px solid ${LINE}`, background: "#1e1e1e" }}>
            <iframe
              src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(cur.proto)}`}
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              allowFullScreen
              title={`${cur.title} prototype`}
            />
          </div>
        </div>
      )}

      <style>{`@media (max-width: 900px) { .pd-grid { grid-template-columns: 1fr !important; } .pd-grid > div:last-child { position: relative !important; top: auto !important; } }`}</style>
    </div>
  );
}

/* ==============================================================
   AI-first Design System (Q3 initiative) — image OR video preview,
   clickable list on the left, fullscreen zoom on right
   ============================================================== */
function VideoAdTile({ item, onOpen }) {
  const vRef = uR(null);
  const donePreview = uR(false);
  const capturePreviewFrame = () => {
    const v = vRef.current;
    if (!v || donePreview.current) return;
    donePreview.current = true;
    // Try seeking first (works when server serves byte ranges).
    try { v.currentTime = 1.0; } catch (_) {}
    // Fallback for servers without Range support: briefly play then pause so
    // decoder is forced to walk past the first frames, then freeze the frame.
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
    setTimeout(() => { try { v.pause(); } catch (_) {} }, 1050);
  };
  return (
    <button onClick={onOpen} aria-label={`Play · ${item.label}`}
      style={{ position: "relative", width: "100%", aspectRatio: item.aspectRatio || "4 / 5", borderRadius: 14, border: `1px solid ${item.accent ? "rgba(204,255,0,.32)" : LINE}`, background: "#0a0a0a", cursor: "pointer", overflow: "hidden", padding: 0, color: FG, display: "block" }}>
      <video ref={vRef} src={item.src} preload="auto" muted playsInline
        onLoadedData={capturePreviewFrame} onCanPlay={capturePreviewFrame}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
      {/* Dim + gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: item.accent
        ? "linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.55) 100%), linear-gradient(135deg, rgba(204,255,0,.18), rgba(204,255,0,.04) 70%)"
        : "linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,.6) 100%)", pointerEvents: "none" }} />
      {/* Foreground */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, textShadow: "0 2px 12px rgba(0,0,0,.6)" }}>
        <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(24px, 2.8vw, 36px)", letterSpacing: "-.02em", color: FG, textAlign: "center", padding: "0 16px" }}>{item.label}</span>
        <span style={{ width: "clamp(72px, 7vw, 96px)", height: "clamp(72px, 7vw, 96px)", borderRadius: "50%", background: ACID, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px rgba(204,255,0,.35), 0 0 0 1px rgba(204,255,0,.5)" }}>
          <svg viewBox="0 0 24 24" width="36" height="36" fill="#0a0a0a"><polygon points="8,5 20,12 8,19" /></svg>
        </span>
      </div>
    </button>
  );
}

function VideoAdsRow({ items, columns = 3 }) {
  const [openIdx, setOpenIdx] = uS(-1);
  const isOpen = openIdx >= 0;
  const prev = () => setOpenIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setOpenIdx((i) => (i + 1) % items.length);

  uE(() => {
    if (!isOpen) return;
    const savedOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setOpenIdx(-1);
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = savedOverflow; window.removeEventListener("keydown", onKey); };
  }, [isOpen]);

  const cur = isOpen ? items[openIdx] : null;

  return (
    <React.Fragment>
      <div className="dd-video-ads" style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "clamp(14px, 1.8vw, 22px)" }}>
        {items.map((it, i) => (
          <VideoAdTile key={i} item={it} onOpen={() => setOpenIdx(i)} />
        ))}
      </div>

      {isOpen && (
        <div onClick={() => setOpenIdx(-1)}
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,.94)", display: "flex", flexDirection: "column", padding: "clamp(18px, 2vw, 28px)", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, color: FG }}>
            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: FG3 }}>{String(openIdx + 1).padStart(2, "0")} · {cur.label}</span>
            <button onClick={(e) => { e.stopPropagation(); setOpenIdx(-1); }}
              style={{ padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,.08)", color: FG, border: `1px solid ${LINE}`, cursor: "pointer", fontFamily: FD, fontWeight: 600, fontSize: 13, letterSpacing: ".04em" }}>
              Закрыть · Esc
            </button>
          </div>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"
              style={{ position: "absolute", left: "clamp(6px, 1.5vw, 24px)", top: "50%", transform: "translateY(-50%)", zIndex: 2, width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: `1px solid ${LINE}`, color: FG, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", transition: "background .18s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.16)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={FG} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,6 9,12 15,18" /></svg>
            </button>
            <video key={cur.src} src={cur.src} autoPlay loop playsInline controls
              style={{ maxWidth: "min(100%, 1400px)", maxHeight: "100%", width: "auto", height: "auto", objectFit: "contain", borderRadius: 10, display: "block" }} />
            <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"
              style={{ position: "absolute", right: "clamp(6px, 1.5vw, 24px)", top: "50%", transform: "translateY(-50%)", zIndex: 2, width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: `1px solid ${LINE}`, color: FG, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", transition: "background .18s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.16)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={FG} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,6 15,12 9,18" /></svg>
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {items.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setOpenIdx(i); }} aria-label={`Slide ${i + 1}`}
                style={{ width: i === openIdx ? 24 : 8, height: 8, borderRadius: 999, background: i === openIdx ? ACID : "rgba(255,255,255,.24)", border: "none", cursor: "pointer", transition: "width .18s, background .18s", padding: 0 }} />
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

const AI_DS_ITEMS = [
  { title: "От Figma к кодовой дизайн-системе. Storybook.", media: "assets/ai-ds/Storybook.mp4" },
  { title: "Правила для AI и совместная работа через GitHub", media: "assets/ai-ds/GitHub.png" },
  { title: "Прототип из готового референса",               media: "assets/ai-ds/ProtoFromReff.mp4" },
  { title: "От скетча к интерактивному прототипу",         media: "assets/ai-ds/ProtoFromSketch.mp4" },
];

function isVideoPath(p) { return /\.(mp4|mov|webm|m4v)$/i.test(p || ""); }

function AiDesignSystemBlock() {
  const [active, setActive] = uS(0);
  const [zoomOpen, setZoomOpen] = uS(false);
  const cur = AI_DS_ITEMS[active];
  const isVideo = isVideoPath(cur.media);
  const prev = () => setActive((i) => (i - 1 + AI_DS_ITEMS.length) % AI_DS_ITEMS.length);
  const next = () => setActive((i) => (i + 1) % AI_DS_ITEMS.length);

  uE(() => {
    if (!zoomOpen) return;
    const savedOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setZoomOpen(false);
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = savedOverflow; window.removeEventListener("keydown", onKey); };
  }, [zoomOpen]);

  return (
    <div>
      <div className="ai-ds-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.35fr)", gap: "clamp(20px, 2.8vw, 40px)", alignItems: "start" }}>
        {/* Clickable items list */}
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {AI_DS_ITEMS.map((f, i) => {
            const on = i === active;
            return (
              <li key={i}>
                <button onClick={() => setActive(i)}
                  style={{ width: "100%", textAlign: "left", background: on ? "linear-gradient(165deg, rgba(204,255,0,.08), rgba(204,255,0,.02) 70%)" : "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)", border: `1px solid ${on ? "rgba(204,255,0,.4)" : LINE}`, borderRadius: 12, padding: "clamp(18px, 2vw, 26px) clamp(18px, 2vw, 24px)", cursor: "pointer", color: FG, transition: "background .25s, border-color .25s", display: "flex", alignItems: "baseline", gap: 12 }}
                  onMouseEnter={(e) => { if (!on) e.currentTarget.style.borderColor = "rgba(204,255,0,.28)"; }}
                  onMouseLeave={(e) => { if (!on) e.currentTarget.style.borderColor = LINE; }}>
                  <span style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(13px, 1.3vw, 16px)", letterSpacing: ".08em", color: on ? ACID : FG4, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontFamily: FD, fontWeight: 700, fontStretch: "115%", fontVariationSettings: "'wght' 700,'wdth' 115", fontSize: "clamp(16px, 1.7vw, 22px)", letterSpacing: "-.012em", color: FG }}>{f.title}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Preview — kicker + title + Play/Open CTA (opens fullscreen) */}
        <div style={{ position: "relative", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)", padding: "clamp(20px, 2.4vw, 32px)", minHeight: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, maxWidth: 520 }}>
            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: ACID }}>
              {isVideo ? "Video" : "Image"}
            </span>
            <h4 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(22px, 2.4vw, 30px)", letterSpacing: "-.02em", lineHeight: 1.2, color: FG }}>
              {cur.title}
            </h4>
          </div>
          <button onClick={() => setZoomOpen(true)} aria-label={isVideo ? "Play" : "Открыть"}
            style={{ width: "clamp(84px, 9vw, 120px)", height: "clamp(84px, 9vw, 120px)", borderRadius: "50%", background: ACID, border: "none", color: "#0a0a0a", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 40px rgba(204,255,0,.28), 0 0 0 1px rgba(204,255,0,.5)", transition: "transform .18s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}>
            {isVideo ? (
              <svg viewBox="0 0 24 24" width="42" height="42" fill="#0a0a0a"><polygon points="8,5 20,12 8,19" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#0a0a0a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h6M4 4v6M20 4h-6M20 4v6M4 20h6M4 20v-6M20 20h-6M20 20v-6" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Fullscreen zoom with prev/next arrows */}
      {zoomOpen && (
        <div onClick={() => setZoomOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,.94)", display: "flex", flexDirection: "column", padding: "clamp(18px, 2vw, 28px)", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, color: FG }}>
            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: FG3 }}>
              {String(active + 1).padStart(2, "0")} · {cur.title}
            </span>
            <button onClick={(e) => { e.stopPropagation(); setZoomOpen(false); }}
              style={{ padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,.08)", color: FG, border: `1px solid ${LINE}`, cursor: "pointer", fontFamily: FD, fontWeight: 600, fontSize: 13, letterSpacing: ".04em" }}>
              Закрыть · Esc
            </button>
          </div>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {/* Prev arrow */}
            <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"
              style={{ position: "absolute", left: "clamp(6px, 1.5vw, 24px)", top: "50%", transform: "translateY(-50%)", zIndex: 2, width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: `1px solid ${LINE}`, color: FG, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", transition: "background .18s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.16)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={FG} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15,6 9,12 15,18" /></svg>
            </button>
            {/* Media */}
            {isVideo ? (
              <video key={cur.media} src={cur.media} autoPlay loop playsInline controls
                style={{ maxWidth: "min(100%, 1400px)", maxHeight: "100%", width: "auto", height: "auto", objectFit: "contain", borderRadius: 10, display: "block" }} />
            ) : (
              <img key={cur.media} src={cur.media} alt={cur.title}
                style={{ maxWidth: "min(100%, 1400px)", maxHeight: "100%", width: "auto", height: "auto", objectFit: "contain", borderRadius: 10, display: "block" }} />
            )}
            {/* Next arrow */}
            <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"
              style={{ position: "absolute", right: "clamp(6px, 1.5vw, 24px)", top: "50%", transform: "translateY(-50%)", zIndex: 2, width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: `1px solid ${LINE}`, color: FG, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", transition: "background .18s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.16)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={FG} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,6 15,12 9,18" /></svg>
            </button>
          </div>
          {/* Position dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {AI_DS_ITEMS.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setActive(i); }} aria-label={`Slide ${i + 1}`}
                style={{ width: i === active ? 24 : 8, height: 8, borderRadius: 999, background: i === active ? ACID : "rgba(255,255,255,.24)", border: "none", cursor: "pointer", transition: "width .18s, background .18s", padding: 0 }} />
            ))}
          </div>
        </div>
      )}

      <style>{`@media (max-width: 900px) { .ai-ds-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

/* ==============================================================
   07 · DESIGN
   ============================================================== */
function DemoDesign() {
  return (
    <React.Fragment>
      <SectionHero id="design" num="06" kicker="design" align="left" glow
        parts={[{ t: "Product Design " }, { t: "Update.", hi: true }]} />
      <Section tightTop dataLabel="06 Design">
        <ProductDesignBlock />

        {/* ===== AI-first Design System (Q3 initiative) ===== */}
        <div style={{ marginTop: "clamp(56px, 7vw, 100px)", paddingTop: "clamp(48px, 6vw, 88px)", borderTop: `1px solid ${LINE}` }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: "clamp(16px, 2vw, 24px)" }}>
            <span style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(13px, 1.3vw, 16px)", letterSpacing: ".22em", textTransform: "uppercase", color: ACID }}>Q3 initiative</span>
          </div>
          <h2 style={{ margin: "0 0 clamp(20px, 2.4vw, 32px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(32px, 4.4vw, 60px)", letterSpacing: "-.03em", lineHeight: 1.02, color: FG }}>
            AI-first <span style={{ color: ACID }}>Design System</span>
          </h2>
          <p style={{ margin: "0 0 clamp(28px, 3.4vw, 44px)", fontFamily: FD, fontWeight: 500, fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.3, color: FG2, maxWidth: 1080 }}>
            Как сделать Karta Design System понятной для AI и позволить быстро создавать на её основе рабочие интерактивные прототипы?
          </p>
          <AiDesignSystemBlock />
        </div>

        {/* ===== Creative Design ===== */}
        <div style={{ marginTop: "clamp(56px, 7vw, 100px)", paddingTop: "clamp(48px, 6vw, 88px)", borderTop: `1px solid ${LINE}` }}>
          <h2 style={{ margin: "0 0 clamp(24px, 2.8vw, 40px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-.03em", lineHeight: 1.02, color: FG }}>
            Creative Design
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 26px)" }}>
            {["creative-1.png","creative-2.png","creative-3.png","creative-4.png"].map((f, i) => (
              <img key={i}
                src={`assets/creative-jul/${f}`}
                alt={`Creative ${i + 1}`}
                data-lightbox-src={`assets/creative-jul/${f}`}
                data-lightbox-cap={`Creative · ${i + 1}`}
                style={{ width: "100%", height: "auto", borderRadius: 12, cursor: "zoom-in", display: "block" }} />
            ))}
          </div>
        </div>

        {/* ===== Video ADs ===== */}
        <div style={{ marginTop: "clamp(56px, 7vw, 100px)", paddingTop: "clamp(48px, 6vw, 88px)", borderTop: `1px solid ${LINE}` }}>
          <h2 style={{ margin: "0 0 clamp(24px, 2.8vw, 40px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-.03em", lineHeight: 1.02, color: FG }}>
            Video ADs
          </h2>
          <VideoAdsRow items={[
            { src: "assets/creative-jul/referral-ad.mp4", label: "Referral AD", aspectRatio: "4 / 5", accent: true },
            { src: "assets/creative-jul/motion-fin.mp4",  label: "Low Fees",    aspectRatio: "4 / 5" },
            { src: "assets/creative-jul/motion-nb.mp4",   label: "Karta Says Yes", aspectRatio: "4 / 5" },
          ]} />
          <style>{`@media (max-width: 900px) { .dd-video-ads { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </Section>
    </React.Fragment>
  );
}

/* eslint-disable */
function _DemoDesign_hidden_July() {
  return (
    <React.Fragment>
      <SectionHero id="design" num="06" kicker="design" align="left" glow
        parts={[{ t: "Инициативы " }, { t: "на Q3.", hi: true }]}
        lead="Три направления работы дизайна на следующий квартал." />
      <Section tightTop dataLabel="06 Design">
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(28px, 3.6vw, 48px)" }}>

          {/* ===== 01 · K-factor ===== */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 24px)" }}>
            <div>
              <h3 style={{ margin: 0, display: "inline-block", padding: "6px 16px 8px", background: ACID, color: "#0a0a0a", borderRadius: 6, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-.022em", lineHeight: 1.15, maxWidth: "100%" }}>
                1. Увеличение K-factor до 0.25+
              </h3>
              <div style={{ marginTop: 8, fontFamily: FD, fontWeight: 500, fontSize: "clamp(14px, 1.4vw, 17px)", color: FG3 }}>сейчас 0.09</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(12px, 1.4vw, 18px)" }}>
              <StatBlock label="K-factor · now" value="0.09" sub="среднее по продукту" />
              <StatBlock label="Target · Q3" value="0.25+" sub="≥ 2.8× текущего" accent big />
              <StatBlock label="Uplift" value="×2.8" sub="baseline" />
            </div>

            <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(14px, 1.8vw, 22px)" }}>
              <div style={{ padding: "clamp(22px, 2.4vw, 32px)", borderRadius: 14, border: "1px solid rgba(204,255,0,.32)", background: "linear-gradient(135deg, rgba(204,255,0,.08), rgba(204,255,0,.02) 70%)", display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: ACID }}>Engine A</span>
                  <h4 style={{ margin: "6px 0 0", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(17px, 1.7vw, 22px)", letterSpacing: "-.015em", lineHeight: 1.2, color: FG }}>
                    Реферальная программа <span style={{ color: ACID }}>с поощрением</span>
                  </h4>
                </div>
                <BulletList items={[
                  "Улучшение <b>UX реферальной программы</b>",
                  "Движок начисления <b>Karat</b>",
                  "<b>Тиры и уровни</b> реферальной программы",
                  "<b>Лидерборд</b> и community-механики",
                ]} dense />
              </div>

              <div style={{ padding: "clamp(22px, 2.4vw, 32px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)", display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>Engine B</span>
                  <h4 style={{ margin: "6px 0 0", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(17px, 1.7vw, 22px)", letterSpacing: "-.015em", lineHeight: 1.2, color: FG }}>
                    Внутренняя продуктовая виральность
                  </h4>
                </div>
                <BulletList items={[
                  "<b>Отправка денег</b> внутри Karta",
                  "<b>Payment Link</b>",
                  "<b>Share</b>-распространение",
                ]} dense />
              </div>
            </div>
          </div>

          {/* ===== 02 · Prototype with AI ===== */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 24px)" }}>
            <div>
              <h3 style={{ margin: 0, display: "inline-block", padding: "6px 16px 8px", background: ACID, color: "#0a0a0a", borderRadius: 6, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-.022em", lineHeight: 1.15, maxWidth: "100%" }}>
                2. Prototype with AI
              </h3>
              <div style={{ marginTop: 8, fontFamily: FD, fontWeight: 500, fontSize: "clamp(14px, 1.4vw, 17px)", color: FG3 }}>baseline 10 дней → target 3–4</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "clamp(12px, 1.4vw, 18px)" }}>
              <StatBlock label="Baseline" value="10д" sub="текущий средний срок" />
              <StatBlock label="Target · Q3" value="3–4д" sub="прототип с AI" accent big />
              <StatBlock label="Speed-up" value="60–70%" sub="сокращение времени" />
            </div>

            <p style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.5, color: FG2, maxWidth: 960 }}>
              Ускоряем путь от идеи до кликабельного прототипа: AI-инструменты в связке с design-system, готовые UX-паттерны, автогенерация состояний.
            </p>
          </div>

          {/* ===== 03 · Brand Guideline v.2 ===== */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 24px)" }}>
            <div>
              <h3 style={{ margin: 0, display: "inline-block", padding: "6px 16px 8px", background: ACID, color: "#0a0a0a", borderRadius: 6, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-.022em", lineHeight: 1.15, maxWidth: "100%" }}>
                3. Brand Guideline v.2
              </h3>
            </div>
            <div style={{ padding: "clamp(24px, 2.6vw, 34px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)" }}>
              <BulletList items={[
                "<b>Философия и миссия</b>",
                "<b>Портреты пользователей</b>",
                "<b>Проблемы</b>, которые решаем продуктом",
              ]} />
            </div>
          </div>

        </div>

        {/* ===== PRODUCT DESIGN — separate block ===== */}
        <div style={{ marginTop: "clamp(48px, 6vw, 90px)", paddingTop: "clamp(60px, 8vw, 120px)", borderTop: `1px solid ${LINE}` }}>
          <h2 style={{ margin: "0 0 clamp(20px, 2.4vw, 32px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-.03em", lineHeight: 1.02, color: FG }}>
            Product Design <span style={{ color: FG4 }}>Upd.</span>
          </h2>
          <ProductDesignBlock />
        </div>

        {/* ===== CREATIVE DESIGN — separate block ===== */}
        <div style={{ marginTop: "clamp(48px, 6vw, 90px)", paddingTop: "clamp(60px, 8vw, 120px)", borderTop: `1px solid ${LINE}` }}>
          <h2 style={{ margin: "0 0 clamp(24px, 2.8vw, 40px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-.03em", lineHeight: 1.02, color: FG }}>
            Creative Design
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 26px)" }}>
            {/* Image 1 */}
            <img src="assets/creative/slide-1.jpg" alt="Karta ads collage" data-lightbox-src="assets/creative/slide-1.jpg" data-lightbox-cap="Karta ads · collage" style={{ width: "100%", height: "auto", borderRadius: 12, cursor: "zoom-in", display: "block" }} />
            {/* Image 2 */}
            <img src="assets/creative/slide-2.jpg" alt="Karta Characters Update" data-lightbox-src="assets/creative/slide-2.jpg" data-lightbox-cap="Karta Characters · Update" style={{ width: "100%", height: "auto", borderRadius: 12, cursor: "zoom-in", display: "block" }} />
            {/* Image 3 */}
            <img src="assets/creative/slide-3.jpg" alt="Builder Guy" data-lightbox-src="assets/creative/slide-3.jpg" data-lightbox-cap="Builder Guy · mosaic" style={{ width: "100%", height: "auto", borderRadius: 12, cursor: "zoom-in", display: "block" }} />
            {/* Videos after image 3 · 2 up */}
            <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(14px, 1.8vw, 22px)" }}>
              <VidThumb src="assets/creative/slide-3-1.mov" cap="Builder Guy · story 1" />
              <VidThumb src="assets/creative/slide-3-2.mov" cap="Builder Guy · story 2" />
            </div>
            {/* Image 4 */}
            <img src="assets/creative/slide-4.jpg" alt="Karta Lab Industries" data-lightbox-src="assets/creative/slide-4.jpg" data-lightbox-cap="Karta Lab Industries" style={{ width: "100%", height: "auto", borderRadius: 12, cursor: "zoom-in", display: "block" }} />
            {/* Video after image 4 */}
            <div style={{ maxWidth: 720 }}>
              <VidThumb src="assets/creative/slide-4-1.mov" cap="Karta Lab · motion" />
            </div>
            {/* Image 5 */}
            <img src="assets/creative/slide-5.jpg" alt="Karta ATM" data-lightbox-src="assets/creative/slide-5.jpg" data-lightbox-cap="Karta ATM · all over the world" style={{ width: "100%", height: "auto", borderRadius: 12, cursor: "zoom-in", display: "block" }} />
            {/* Final video · Karta Unfreezable */}
            <div style={{ marginTop: "clamp(20px, 2.6vw, 32px)" }}>
              <h3 style={{ margin: "0 0 clamp(12px, 1.6vw, 20px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-.022em", lineHeight: 1.1, color: FG }}>
                Karta Unfreezable <span style={{ color: FG4 }}>(GRI)</span>
              </h3>
              <div style={{ maxWidth: 720 }}>
                <VidThumb src="assets/creative/slide-6-1.mp4" cap="Karta Unfreezable (GRI)" />
              </div>
            </div>
          </div>
        </div>

        {/* ===== KARTA WEBSITE — separate block ===== */}
        <div style={{ marginTop: "clamp(48px, 6vw, 90px)", paddingTop: "clamp(60px, 8vw, 120px)", borderTop: `1px solid ${LINE}` }}>
          <h2 style={{ margin: "0 0 clamp(8px, 1vw, 14px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(36px, 5vw, 72px)", letterSpacing: "-.03em", lineHeight: 1.02, color: FG }}>
            Karta Website <span style={{ color: FG4 }}>(GRI)</span>
          </h2>
          <p style={{ margin: "0 0 clamp(24px, 2.8vw, 40px)", fontFamily: FD, fontWeight: 500, fontSize: "clamp(16px, 1.7vw, 22px)", lineHeight: 1.4, color: FG3, maxWidth: 900 }}>
            Съезжаем с Webflow на собственный код.
          </p>

          <div className="dd-migrate" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "clamp(16px, 2vw, 28px)", alignItems: "stretch" }}>
            {/* Webflow · from */}
            <div style={{ padding: "clamp(28px, 3vw, 40px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)", display: "flex", flexDirection: "column", gap: 22 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                <img src="assets/webflow-logo.svg" alt="Webflow" style={{ height: 26, opacity: .85 }} />
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: FG4, padding: "4px 10px", border: `1px solid ${LINE}`, borderRadius: 999 }}>сейчас</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: FG4 }}>Cost · год</span>
                <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "115%", fontVariationSettings: "'wght' 800,'wdth' 115", fontSize: "clamp(30px, 3.4vw, 44px)", color: FG, letterSpacing: "-.025em", lineHeight: 1.05, fontVariantNumeric: "tabular-nums" }}>≈ $4 800</span>
                <span style={{ fontFamily: FD, fontWeight: 500, fontSize: 13, color: FG3 }}>~$400/месяц</span>
              </div>
              <BulletList items={[
                "<b>Bandwidth limit</b> — уже упираемся",
                "Максимум <b>10 локализаций</b>",
                "<b>Ограничения</b> кастомного кода",
              ]} dense />
            </div>

            {/* Arrow · center */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, minWidth: 60 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #ccff00, #c2f000)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 40px rgba(204,255,0,.35)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </div>
              <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>migrate</span>
            </div>

            {/* Karta · to */}
            <div style={{ padding: "clamp(28px, 3vw, 40px)", borderRadius: 14, border: "1px solid rgba(204,255,0,.32)", background: "linear-gradient(135deg, rgba(204,255,0,.08), rgba(204,255,0,.02) 70%)", display: "flex", flexDirection: "column", gap: 22 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <img src="assets/karta-logo-acid.svg" alt="Karta" style={{ height: 26 }} />
                  <a href="https://mediumvioletred-elk-460770.hostingersite.com/" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: FD, fontWeight: 600, fontSize: 13, letterSpacing: "-.005em", color: ACID, textDecoration: "none", padding: "4px 10px", background: "rgba(204,255,0,.12)", border: "1px solid rgba(204,255,0,.35)", borderRadius: 999 }}>
                    karta.io <span style={{ color: "rgba(204,255,0,.6)", fontWeight: 500 }}>(свой)</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.5L7.5 2.5M4 2.5h3.5V6" /></svg>
                  </a>
                </div>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: ACID, padding: "4px 10px", border: "1px solid rgba(204,255,0,.4)", borderRadius: 999 }}>цель</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: ACID }}>Cost · год</span>
                <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "115%", fontVariationSettings: "'wght' 800,'wdth' 115", fontSize: "clamp(30px, 3.4vw, 44px)", color: ACID, letterSpacing: "-.025em", lineHeight: 1.05, fontVariantNumeric: "tabular-nums" }}>$262.36</span>
                <span style={{ fontFamily: FD, fontWeight: 500, fontSize: 13, color: FG3 }}>× 18 дешевле</span>
              </div>
              <BulletList items={[
                "<b>No Limits</b>",
                "<b>∞ локализаций</b> · свой интерфейс",
                "Свой код — <b>удобно и гибко</b>",
                "Своя админка, сайт, блог, локализации и т.д.",
              ]} dense />
            </div>
          </div>

          {/* Status note */}
          <div style={{ marginTop: "clamp(18px, 2.2vw, 28px)", padding: "clamp(18px, 2.2vw, 24px) clamp(20px, 2.4vw, 28px)", borderRadius: 12, border: "1px solid rgba(204,255,0,.22)", background: "rgba(204,255,0,.04)", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 999, background: ACID, flex: "none" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l3 3 5-6" /></svg>
            </span>
            <span style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(14px, 1.5vw, 18px)", lineHeight: 1.5, color: FG }}>
              <b>Сайт, блог, аналитика и админка</b> уже свёрстаны на собственном коде — осталось только купить хостинг <b style={{ color: ACID }}>Hostinger</b>.
            </span>
          </div>
          <style>{`@media (max-width: 900px) { .dd-migrate { grid-template-columns: 1fr !important; } .dd-migrate > div:nth-child(2) { padding: 8px 0; } .dd-migrate > div:nth-child(2) > div:first-child { transform: rotate(90deg); } }`}</style>
        </div>
      </Section>
    </React.Fragment>
  );
}

/* ==============================================================
   08 · SUPPORT
   ============================================================== */
function DemoSupport() {
  const b2c = [["Time to first response","5m 46s","4m 10s"],["Inquiries handled","2 622","2 397"],["CSAT","86%","86.9%"]];
  const b2b = [["Time to first response","1m 2s","2m 6s"],["Inquiries handled","288","171"],["CSAT","83.3%","100%"]];
  const renderTable = (rows, accent) => (
    <table style={{ marginTop: 20, width: "100%", borderCollapse: "collapse", fontFamily: FD, fontSize: "clamp(16px, 1.6vw, 20px)" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", padding: "12px 0", borderBottom: `1px solid ${accent ? "rgba(204,255,0,.18)" : LINE}`, color: FG4, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}>Metric</th>
          <th style={{ textAlign: "right", padding: "12px 0", borderBottom: `1px solid ${accent ? "rgba(204,255,0,.18)" : LINE}`, color: FG4, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}>June</th>
          <th style={{ textAlign: "right", padding: "12px 0", borderBottom: `1px solid ${accent ? "rgba(204,255,0,.18)" : LINE}`, color: accent ? ACID : FG4, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}>July</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([m, a, b], i) => (
          <tr key={i}>
            <td style={{ padding: "14px 0", color: FG2, fontVariantNumeric: "tabular-nums" }}>{m}</td>
            <td style={{ padding: "14px 0", color: FG3, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{a}</td>
            <td style={{ padding: "14px 0", color: FG, textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  return (
    <React.Fragment>
      <SectionHero id="support" num="07" kicker="support" align="left" glow
        parts={[{ t: "B2C CSAT " }, { t: "86 → 86.9%.", hi: true }, { t: " B2B CSAT 100%." }]}
        lead="TFR B2C улучшился до 4m 10s. Меньше запросов и в B2C и в B2B — стабилизация." />
      <Section tightTop dataLabel="07 Support">
        <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)" }}>
          <div style={{ padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: "1px solid rgba(204,255,0,.28)", background: "linear-gradient(135deg, rgba(204,255,0,.06), rgba(204,255,0,.015) 70%)" }}>
            <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(20px, 2vw, 28px)", letterSpacing: ".04em", textTransform: "uppercase", color: ACID }}>B2C</h3>
            {renderTable(b2c, true)}
            <p style={{ margin: "20px 0 0", fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>Top queries · July</p>
            <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontFamily: FD, fontWeight: 500, fontSize: "clamp(15px, 1.6vw, 19px)", lineHeight: 1.45, color: FG2 }}>
              <li>· <b style={{color: FG}}>KYC · verification · registration</b> — 378 (14.4%)</li>
              <li>· <b style={{color: FG}}>Apple Pay / Google Pay</b> — 268 (10.2%)</li>
              <li>· <b style={{color: FG}}>Top-ups / delayed crypto deposits</b> — 187 (7.1%)</li>
            </ul>
          </div>

          <div style={{ padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)" }}>
            <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(20px, 2vw, 28px)", letterSpacing: ".04em", textTransform: "uppercase", color: FG }}>B2B</h3>
            {renderTable(b2b)}
            <p style={{ margin: "20px 0 0", fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>Top queries · July</p>
            <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontFamily: FD, fontWeight: 500, fontSize: "clamp(15px, 1.6vw, 19px)", lineHeight: 1.45, color: FG2 }}>
              <li>· <b style={{color: FG}}>Cards · issuance · limits · activation</b> — 49 (33.8%)</li>
              <li>· <b style={{color: FG}}>Business account · registration · KYB · sandbox</b> — 37 (25.5%)</li>
              <li>· <b style={{color: FG}}>Declined transactions · payments</b> — 23 (15.9%)</li>
            </ul>
          </div>
        </div>

        {/* Theme galleries · July */}
        {[
          { t: "Apple Pay problems", scope: "B2C", imgs: ["apple_-_call.png","apple_-_call2.png","apple_-_call3.png","apple_-_call5.png","apple_-_unsup_.png","Apple_pay_-_unsup.jpg","apple_unsup_2.png","apple_unsup.png"] },
          { t: "Karta AI bot stopped working", scope: "B2C", imgs: ["bot_-_no_reply.png","bot_-_positive.png"] },
          { t: "Closed cards · feedback", scope: "B2C", imgs: ["close_card_-_feedback.png","close_card_-_feedback_2.png"] },
          { t: "Referral link broken", scope: "B2C", imgs: ["ref_link_1.png","ref_link_2.png"] },
          { t: "Feature requests", scope: "B2C", imgs: ["feature_request_-_language_-_arab.png","feature_request_-_statement.png","Feature_request_-_VA.png"] },
          { t: "LaunchDarkly outage · passcode · withdrawals · locked accounts", scope: "B2C", imgs: ["launchDarkly_(_passcode__lock).png","launchDarly_2.png","launchDarkly3.png","launchDarkly4.png"] },
          { t: "Waiting too long", scope: "B2C", imgs: ["long_wait_-_kyc.png","long_wait_-_kyc2.png","long_wait_-_KYB.png"] },
          { t: "Negative feedback", scope: "B2C", imgs: ["negative_-_deposit_stuck_.png","negative.png"] },
          { t: "Memes", scope: "B2C", imgs: ["meme_-_hash.png","meme_-_kyc.png"] },
          { t: "Positive feedback", scope: "B2C", imgs: ["positive2.jpg","positive3.png","positive4.png","positive5.png"], accent: true },
        ].map((g, gi) => (
          <Reveal key={gi} delay={0.04 + gi * 0.02}>
            <div style={{ marginTop: gi === 0 ? "clamp(24px, 2.8vw, 32px)" : "clamp(20px, 2.4vw, 28px)", padding: "clamp(20px, 2.4vw, 30px)", borderRadius: 14, border: `1px solid ${g.accent ? "rgba(204,255,0,.22)" : LINE}`, background: g.accent ? "linear-gradient(135deg, rgba(204,255,0,.04), rgba(204,255,0,.01) 70%)" : "rgba(255,255,255,.025)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: g.accent ? ACID : FG4, padding: "3px 8px", border: `1px solid ${g.accent ? "rgba(204,255,0,.4)" : LINE}`, borderRadius: 4 }}>{g.scope}</span>
                <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 700, fontStretch: "115%", fontVariationSettings: "'wght' 700,'wdth' 115", fontSize: "clamp(15px, 1.6vw, 20px)", letterSpacing: "-.01em", color: FG, lineHeight: 1.2 }}>{g.t}</h3>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
                {g.imgs.map((name) => (
                  <img key={name} src={`assets/notion-jul/${name}`} alt={g.t}
                    data-lightbox-src={`assets/notion-jul/${name}`} data-lightbox-cap={g.t}
                    style={{ width: "100%", height: 220, objectFit: "cover", objectPosition: "top center", borderRadius: 8, border: `1px solid ${LINE}`, background: "#0a0a0a", cursor: "zoom-in", transition: "transform .2s, border-color .2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(204,255,0,.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = LINE; e.currentTarget.style.transform = "translateY(0)"; }} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </Section>
    </React.Fragment>
  );
}

/* ==============================================================
   09 · HR & HIRING
   ============================================================== */
function DemoHR() {
  return (
    <React.Fragment>
      <SectionHero id="hr" num="08"
        kicker="HR · Наём"
        kickerNode={<React.Fragment>HR · На<span style={{ color: "var(--pp-acid)" }}>ё</span>м</React.Fragment>}
        align="left" glow
        parts={[{ t: "CPO B2B · " }, { t: "AI Ops on board.", hi: true }]}
        lead="Два новых senior-найма в июле. Mobile Head — Tech Interview." />
      <Section tightTop dataLabel="08 HR">
        <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)", alignItems: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 1.6vw, 20px)" }}>
            <ColBlock title="Welcome to the team" items={[
              "<b>CPO B2B</b>",
              "<b>AI Ops</b> — Никита HIM",
            ]} accent />
            <ColBlock title="На верном пути" items={[
              "<b>Mobile Head</b>",
            ]} />
          </div>
          <img src="assets/notion-jul/image 3.png" alt="A team you are" data-lightbox-src="assets/notion-jul/image 3.png" data-lightbox-cap="A team you are · work together you must" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12, cursor: "zoom-in", display: "block", border: `1px solid ${LINE}` }} />
        </div>

        {/* What's new */}
        <Reveal delay={0.1}>
          <div style={{ marginTop: "clamp(8px, 1vw, 14px)", padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)" }}>
            <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>What's new</span>
            <h3 style={{ margin: "12px 0 20px", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(22px, 2.6vw, 34px)", lineHeight: 1.1, color: FG }}>
              Автоматизация найма
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 3vw, 36px)" }}>
              {/* Auto weekly analytics */}
              <div>
                <h4 style={{ margin: "0 0 12px", fontFamily: FD, fontWeight: 700, fontStretch: "115%", fontVariationSettings: "'wght' 700,'wdth' 115", fontSize: "clamp(17px, 1.8vw, 22px)", letterSpacing: "-.012em", color: FG }}>
                  Автоматическая недельная аналитика с комментариями в Linear
                </h4>
                <img src="assets/notion-jul/Снимок_экрана__2026-08-03_в_12.15.04.png" alt="Auto weekly analytics" data-lightbox-src="assets/notion-jul/Снимок_экрана__2026-08-03_в_12.15.04.png" data-lightbox-cap="Auto weekly analytics · Linear" style={{ width: "100%", maxWidth: 960, height: "auto", borderRadius: 10, cursor: "zoom-in", display: "block", border: `1px solid ${LINE}` }} />
              </div>

              {/* Auto vacancy drafts */}
              <div>
                <h4 style={{ margin: "0 0 12px", fontFamily: FD, fontWeight: 700, fontStretch: "115%", fontVariationSettings: "'wght' 700,'wdth' 115", fontSize: "clamp(17px, 1.8vw, 22px)", letterSpacing: "-.012em", color: FG }}>
                  Автосоздание черновиков вакансий на основе брифа в Notion
                </h4>
                <BulletList items={[
                  "Бриф в Notion → отбивка в Slack (<b>#hr-team</b>) с указанием, кто и когда заполнил",
                  "Автосоздание карточки вакансии в <b>🎯 Позиции</b>",
                  "Описание позиции (сайт + Telegram + LinkedIn)",
                  "Портрет должности + список HR-вопросов",
                  "Карта поиска + готовые поисковые запросы по каналам",
                ]} dense />
                <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, alignItems: "center" }} className="dd-two-col">
                  <img src="assets/notion-jul/Снимок_экрана__2026-08-03_в_12.35.27.png" alt="Brief in Notion" data-lightbox-src="assets/notion-jul/Снимок_экрана__2026-08-03_в_12.35.27.png" data-lightbox-cap="Brief в Notion" style={{ width: "100%", height: "auto", borderRadius: 10, cursor: "zoom-in", display: "block", border: `1px solid ${LINE}` }} />
                  <img src="assets/notion-jul/Снимок_экрана__2026-08-03_в_12.36.01.png" alt="Auto-created vacancy card" data-lightbox-src="assets/notion-jul/Снимок_экрана__2026-08-03_в_12.36.01.png" data-lightbox-cap="Автосозданная карточка вакансии" style={{ width: "100%", height: "auto", borderRadius: 10, cursor: "zoom-in", display: "block", border: `1px solid ${LINE}` }} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Plans */}
        <Reveal delay={0.14}>
          <div style={{ marginTop: "clamp(20px, 2.4vw, 30px)", padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: "1px solid rgba(204,255,0,.28)", background: "linear-gradient(135deg, rgba(204,255,0,.06), rgba(204,255,0,.015) 70%)" }}>
            <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: ACID }}>Our plans</span>
            <BulletList items={[
              "Месячная аналитика по всем вакансиям и <b>затратам на найм</b> с выгрузкой в Google Sheets",
              "Аудит legacy-блока <b>PeopleForce</b> → автоматическое создание документов на основе пребординга",
              "<b>AI-агент</b> для холодного сбора кандидатов и первичного аутрича",
            ]} />
          </div>
        </Reveal>
      </Section>
    </React.Fragment>
  );
}

/* ==============================================================
   09 · OPS · Org Structure 2.0
   ============================================================== */
function OrgSchema20() {
  const BOX = { borderRadius: 12, padding: "clamp(14px, 1.6vw, 20px)", fontFamily: FD, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 6 };
  const label = (t) => <div style={{ fontFamily: FD, fontWeight: 800, fontStretch: "115%", fontVariationSettings: "'wght' 800,'wdth' 115", fontSize: "clamp(15px, 1.5vw, 18px)", letterSpacing: "-.008em", color: FG, lineHeight: 1.2 }}>{t}</div>;
  const sub   = (t, c) => <div style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(11px, 1.15vw, 13px)", color: c || FG3, lineHeight: 1.4 }}>{t}</div>;
  const arrow = () => (
    <svg viewBox="0 0 12 20" width="12" height="20" style={{ margin: "0 auto", display: "block" }}>
      <line x1="6" y1="0" x2="6" y2="15" stroke={FG4} strokeWidth="1.2" />
      <polyline points="2,13 6,17 10,13" fill="none" stroke={FG4} strokeWidth="1.2" />
    </svg>
  );
  const pill = (t, bg, br, k) => (
    <div key={k} style={{ padding: "10px 14px", borderRadius: 999, border: `1.5px dashed ${br}`, background: bg, textAlign: "center", fontFamily: FD, fontWeight: 700, fontStretch: "115%", fontVariationSettings: "'wght' 700,'wdth' 115", fontSize: "clamp(13px, 1.3vw, 15px)", color: FG }}>{t}</div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "clamp(18px, 2vw, 26px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "#0a0a0a" }}>
      {/* Управляющий слой */}
      <div style={{ ...BOX, background: "#3f3f3f", border: `1px solid #4a4a4a` }}>
        {label("Управляющий слой")}
        {sub("CEO, CTO, COO, Ops, HR, CFO", "#c8c8c8")}
      </div>
      {arrow()}
      {/* AI · Security · Dev ex */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {[
          { t: "AI-отдел", s: "автоматизация, агенты" },
          { t: "Security и инфра", s: "риск, compliance, инциденты" },
          { t: "Dev ex", s: "инструменты разработки" },
        ].map((b, i) => (
          <div key={i} style={{ ...BOX, background: "#2a2a2a", border: `1.5px dashed #4a4a4a` }}>
            {label(b.t)}
            {sub(b.s, "#b8b8b8")}
          </div>
        ))}
      </div>
      {arrow()}
      {/* Andgate */}
      <div style={{ ...BOX, background: "#274c48", border: "1px solid #2e5c56" }}>
        <div style={{ fontFamily: FD, fontWeight: 800, fontStretch: "115%", fontVariationSettings: "'wght' 800,'wdth' 115", fontSize: "clamp(16px, 1.6vw, 20px)", letterSpacing: "-.008em", color: FG, lineHeight: 1.2 }}>Andgate — платформенное ядро</div>
        <div style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(11px, 1.15vw, 13px)", color: "#7dc9b8", lineHeight: 1.4 }}>интеграции, tech support, казначей, юрист, compliance</div>
      </div>
      {arrow()}
      {/* B2C · B2B */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {/* B2C */}
        <div style={{ padding: "clamp(16px, 1.8vw, 22px)", borderRadius: 12, background: "#3a3388", border: "1px solid #4a44a5", display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ fontFamily: FD, fontWeight: 800, fontStretch: "115%", fontVariationSettings: "'wght' 800,'wdth' 115", fontSize: "clamp(15px, 1.5vw, 18px)", color: FG }}>B2C</div>
            <div style={{ fontFamily: FD, fontWeight: 500, fontSize: 12, color: "#c4c1e0" }}>CPO, tech lead, design, HR</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {["Wallet", "Reward", "Payments", "Application", "Activation", "Marketing"].map((t, i) => <React.Fragment key={i}>{pill(t, "transparent", "rgba(255,255,255,.32)")}</React.Fragment>)}
          </div>
        </div>
        {/* B2B */}
        <div style={{ padding: "clamp(16px, 1.8vw, 22px)", borderRadius: 12, background: "#7a3720", border: "1px solid #9a4a2e", display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ fontFamily: FD, fontWeight: 800, fontStretch: "115%", fontVariationSettings: "'wght' 800,'wdth' 115", fontSize: "clamp(15px, 1.5vw, 18px)", color: FG }}>B2B</div>
            <div style={{ fontFamily: FD, fontWeight: 500, fontSize: 12, color: "#e5b8a4" }}>лид направления не назначен</div>
          </div>
          <div style={{ padding: "10px 14px", borderRadius: 10, background: "#a04a2e", border: "1.5px dashed rgba(255,255,255,.32)", textAlign: "center", fontFamily: FD, fontWeight: 700, fontSize: "clamp(13px, 1.3vw, 15px)", color: FG }}>Ядро команды</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {["Marketing", "Support"].map((t, i) => <React.Fragment key={i}>{pill(t, "transparent", "rgba(255,255,255,.32)")}</React.Fragment>)}
          </div>
          <div style={{ fontFamily: FD, fontWeight: 500, fontSize: 11, color: "#e5b8a4", textAlign: "center", marginTop: 4 }}>состав определяется по итогам аудита</div>
        </div>
      </div>
    </div>
  );
}

const OPS_BEFORE_AFTER = [
  ["Команды мешают приоритетам друг друга", "Обособленные команды, каждая отвечает за свой результат"],
  ["Рассинхрон внимания: B2B и B2C тянут в разные стороны", "Каждый продукт работает на своего клиента"],
  ["Владение задачами размыто — непонятно, чей это результат", "У каждого юнита один владелец"],
  ["Метрики общие на всю компанию, персональной ответственности нет", "North Star у каждого юнита"],
  ["Безопасность и compliance — по остаточному принципу", "Security-офис как владелец риска и точка входа по инцидентам"],
  ["Автоматизация и AI — инициатива отдельных энтузиастов", "AI-отдел как сервис для всех трёх продуктов"],
  ["Нанимаем, а потом считаем бюджет и придумываем метрики", "Регламент: метрики → бюджет → найм"],
  ["Бэк-офис и HR размазаны по трём продуктам", "Общие поддерживающие функции, продукты не тратят на них ресурс"],
];
function DemoOPS() {
  return (
    <React.Fragment>
      <SectionHero id="ops" num="09" kicker="ops · org 2.0" align="left" glow
        parts={[{ t: "Org Structure " }, { t: "2.0", hi: true }]}
        lead="Структура, которая работала на этапе роста, начала мешать на этапе масштабирования." />
      <Section tightTop dataLabel="09 OPS">
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 7vw, 100px)" }}>

          {/* Slide 1 — Why change */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20 }}>
              <span style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(13px, 1.3vw, 16px)", letterSpacing: ".14em", color: ACID, fontVariantNumeric: "tabular-nums" }}>01</span>
              <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-.022em", lineHeight: 1.1, color: FG }}>Почему меняем структуру</h3>
            </div>
            <p style={{ margin: "0 0 20px", fontFamily: FD, fontWeight: 500, fontSize: "clamp(17px, 1.8vw, 22px)", lineHeight: 1.45, color: FG2, maxWidth: 960 }}>
              Мы выросли до размера, при котором команды начали <b style={{ color: FG }}>конкурировать за приоритеты</b>, а не за результат.
            </p>
            <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(14px, 1.8vw, 22px)" }}>
              <ColBlock title="Что не работает" items={[
                "Одни и те же люди тянут <b>несколько направлений</b> одновременно",
                "Ответственность за результат <b>размыта</b>",
                "Узкие места вместо скорости",
                "Пошли смотреть, как эту проблему решали другие",
              ]} />
              <ColBlock title="Вдохновение · PostHog" items={[
                "Прошли тот же путь: выросли и упёрлись в общую структуру",
                "Перешли на <b>small teams</b> — каждая владеет своей частью продукта и своими метриками",
                "Принцип: команда <b>≤6 человек</b>, достаточно самостоятельная, чтобы не согласовывать каждый шаг",
              ]} accent />
            </div>
            <div style={{ marginTop: "clamp(16px, 2vw, 24px)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(14px, 1.8vw, 22px)" }} className="dd-two-col">
              <img src="assets/notion-jul/image 5.png" alt="Structured vs spaghetti cabling" data-lightbox-src="assets/notion-jul/image 5.png" data-lightbox-cap="Structured vs Spaghetti cabling" style={{ width: "100%", height: "auto", borderRadius: 12, cursor: "zoom-in", display: "block", border: `1px solid ${LINE}` }} />
              <div style={{ borderRadius: 12, border: `1px solid ${LINE}`, background: "#f4f4f2", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(28px, 4vw, 56px)", cursor: "zoom-in" }} data-lightbox-src="assets/notion-jul/image 4.png" data-lightbox-cap="PostHog · small teams">
                <img src="assets/notion-jul/image 4.png" alt="PostHog" style={{ maxWidth: "60%", maxHeight: 260, height: "auto", width: "auto", display: "block" }} />
              </div>
            </div>
          </div>

          {/* Slide 2 — Structure 2.0 */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20 }}>
              <span style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(13px, 1.3vw, 16px)", letterSpacing: ".14em", color: ACID, fontVariantNumeric: "tabular-nums" }}>02</span>
              <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-.022em", lineHeight: 1.1, color: FG }}>Структура 2.0</h3>
            </div>
            <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "clamp(16px, 2vw, 24px)", alignItems: "start" }}>
              <OrgSchema20 />
              <div>
                <span style={{ display: "block", fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: ACID, marginBottom: 14 }}>Базовые принципы разделения</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 1.2vw, 14px)" }}>
                  {[
                    { h: "Разделение B2C и B2B", s: "свои цели, коммуникации, процессы, back-office" },
                    { h: "Andgate", s: "становится Andgate провайдером" },
                    { h: "Unit-команды", s: "внутри B2C" },
                    { h: "Тонкий поддерживающий слой", s: "AI-отдел · Security-офис" },
                  ].map((p, i) => (
                    <div key={i} style={{ padding: "clamp(16px, 1.8vw, 22px) clamp(18px, 2vw, 24px)", borderRadius: 12, border: "1px solid rgba(204,255,0,.28)", background: "linear-gradient(135deg, rgba(204,255,0,.06), rgba(204,255,0,.015) 70%)" }}>
                      <div style={{ fontFamily: FD, fontWeight: 800, fontStretch: "115%", fontVariationSettings: "'wght' 800,'wdth' 115", fontSize: "clamp(16px, 1.6vw, 20px)", letterSpacing: "-.012em", color: FG, marginBottom: 4, lineHeight: 1.25 }}>{p.h}</div>
                      <div style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(13px, 1.3vw, 15px)", color: FG3, lineHeight: 1.4 }}>{p.s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 — Было → Стало */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20 }}>
              <span style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(13px, 1.3vw, 16px)", letterSpacing: ".14em", color: ACID, fontVariantNumeric: "tabular-nums" }}>03</span>
              <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-.022em", lineHeight: 1.1, color: FG }}>Было → Стало</h3>
            </div>
            <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(14px, 1.8vw, 22px)", marginBottom: 20 }}>
              <div style={{ borderRadius: 12, border: `1px solid ${LINE}`, background: "#0a0a0a", padding: "clamp(24px, 3.5vw, 48px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="assets/notion-jul/image 7.png" alt="Было" data-lightbox-src="assets/notion-jul/image 7.png" data-lightbox-cap="Было" style={{ maxWidth: "70%", height: "auto", borderRadius: 8, cursor: "zoom-in", display: "block" }} />
              </div>
              <div style={{ borderRadius: 12, border: "1px solid rgba(204,255,0,.32)", background: "#0a0a0a", padding: "clamp(24px, 3.5vw, 48px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="assets/notion-jul/image 8.png" alt="Стало" data-lightbox-src="assets/notion-jul/image 8.png" data-lightbox-cap="Стало" style={{ maxWidth: "70%", height: "auto", borderRadius: 8, cursor: "zoom-in", display: "block" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0, alignItems: "stretch", borderRadius: 14, overflow: "hidden", border: `1px solid ${LINE}` }}>
              <div style={{ padding: "clamp(14px, 1.6vw, 22px) clamp(18px, 2vw, 26px)", background: "linear-gradient(165deg, rgba(255,255,255,.05), rgba(255,255,255,.01) 70%)", fontFamily: FD, fontWeight: 700, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: FG4, borderBottom: `1px solid ${LINE}` }}>Было</div>
              <div style={{ background: LINE, width: 1, borderBottom: `1px solid ${LINE}` }} />
              <div style={{ padding: "clamp(14px, 1.6vw, 22px) clamp(18px, 2vw, 26px)", background: "linear-gradient(135deg, rgba(204,255,0,.08), rgba(204,255,0,.02) 70%)", fontFamily: FD, fontWeight: 700, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: ACID, borderBottom: `1px solid ${LINE}` }}>Стало</div>
              {OPS_BEFORE_AFTER.map(([b, a], i) => (
                <React.Fragment key={i}>
                  <div style={{ padding: "clamp(16px, 1.8vw, 22px) clamp(18px, 2vw, 26px)", background: "rgba(255,255,255,.02)", fontFamily: FD, fontWeight: 500, fontSize: "clamp(14px, 1.4vw, 17px)", lineHeight: 1.4, color: FG3, borderTop: i > 0 ? `1px solid ${LINE}` : "none" }}>{b}</div>
                  <div style={{ background: LINE, width: 1 }} />
                  <div style={{ padding: "clamp(16px, 1.8vw, 22px) clamp(18px, 2vw, 26px)", background: "rgba(204,255,0,.03)", fontFamily: FD, fontWeight: 600, fontSize: "clamp(14px, 1.4vw, 17px)", lineHeight: 1.4, color: FG, borderTop: i > 0 ? "1px solid rgba(204,255,0,.08)" : "none" }}>{a}</div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Slide 4 — Phase 1 */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20 }}>
              <span style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(13px, 1.3vw, 16px)", letterSpacing: ".14em", color: ACID, fontVariantNumeric: "tabular-nums" }}>04</span>
              <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-.022em", lineHeight: 1.1, color: FG }}>Phase 1</h3>
            </div>
            <div style={{ position: "relative", height: "clamp(500px, 58vw, 680px)", borderRadius: 14, border: "1px solid rgba(204,255,0,.32)", background: "radial-gradient(60% 70% at 50% 50%, rgba(204,255,0,.16), rgba(204,255,0,.03) 55%, transparent 100%), #050505", overflow: "hidden" }}>
              {/* Vignette gradient overlay */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 90% at 50% 50%, transparent 0%, rgba(0,0,0,.55) 100%)", pointerEvents: "none" }} />
              {/* Center title */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                <h4 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(64px, 11vw, 160px)", lineHeight: .9, letterSpacing: "-.04em", color: ACID, textAlign: "center", textShadow: "0 0 60px rgba(204,255,0,.35)" }}>
                  PHASE 1
                </h4>
              </div>
              {/* Corner pills + top-center — kept clear of center title band */}
              {[
                { t: "Отделение трёх продуктов", pos: { top: "8%",    left: "6%" } },
                { t: "Security-офис launch",      pos: { top: "8%",    left: "50%", transform: "translateX(-50%)" } },
                { t: "B2B сепарация",             pos: { top: "8%",    right: "6%" } },
                { t: "Reward Team",               pos: { bottom: "8%", left: "6%" } },
                { t: "AI-отдел launch",           pos: { bottom: "8%", right: "6%" } },
              ].map((p, i) => (
                <div key={i} className="dd-phase-pill" style={{ position: "absolute", ...p.pos, padding: "clamp(12px, 1.4vw, 18px) clamp(18px, 2vw, 26px)", borderRadius: 999, background: ACID, color: "#0a0a0a", fontFamily: FD, fontWeight: 700, fontStretch: "115%", fontVariationSettings: "'wght' 700,'wdth' 115", fontSize: "clamp(15px, 1.5vw, 19px)", letterSpacing: "-.008em", whiteSpace: "nowrap", boxShadow: "0 8px 32px rgba(204,255,0,.28), 0 0 0 1px rgba(204,255,0,.5)", zIndex: 3 }}>
                  {p.t}
                </div>
              ))}
              <style>{`
                @media (max-width: 900px) {
                  .dd-phase-pill { position: static !important; transform: none !important; white-space: normal !important; margin: 6px !important; text-align: center; }
                }
              `}</style>
            </div>
          </div>

        </div>
      </Section>
    </React.Fragment>
  );
}

/* ==============================================================
   11 · Q&A
   ============================================================== */
function DemoQA() {
  return (
    <React.Fragment>
      <SectionHero id="qa" num="10" kicker="q&a" align="left" glow
        parts={[{ t: "Q&A", hi: true }]}
        lead="Задавайте." />
      <Section tightTop dataLabel="10 Q&A">
        <Reveal>
          <div style={{ display: "flex", justifyContent: "center", padding: "clamp(20px, 3vw, 40px) 0" }}>
            <img src="assets/cat-question.webp" alt="I have a question" data-lightbox-src="assets/cat-question.webp" data-lightbox-cap="I have a question"
              style={{ maxWidth: "min(760px, 100%)", width: "auto", height: "auto", borderRadius: 16, border: `1px solid ${LINE}`, background: "#0a0a0a", cursor: "zoom-in", transition: "transform .2s, border-color .2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(204,255,0,.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = LINE; e.currentTarget.style.transform = "translateY(0)"; }} />
          </div>
        </Reveal>
      </Section>
    </React.Fragment>
  );
}

/* ==============================================================
   12 · OUTRO
   ============================================================== */
function DemoOutro() {
  return (
    <section id="end" data-screen-label="11 The end" style={{ position: "relative", zIndex: 1, minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(48px, 8vw, 120px) 24px", background: "radial-gradient(120% 140% at 50% 100%, rgba(204,255,0,.18), transparent 60%), var(--pp-page)", overflow: "hidden" }}>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "clamp(20px, 3vw, 40px)", maxWidth: 1200 }}>
        <Reveal>
          <h2 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(52px, 10vw, 160px)", lineHeight: .95, letterSpacing: "-.035em", color: FG }}>
            That's all <span style={{ color: ACID }}>Folks</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(20px, 2.6vw, 34px)", lineHeight: 1.35, letterSpacing: "-.015em", color: FG2, maxWidth: 900 }}>
            Take care and see you soon!
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* Video thumbnail — click opens lightbox with big video player */
function VidThumb({ src, cap }) {
  return (
    <button data-lightbox-src={src} data-lightbox-cap={cap} aria-label={cap}
      style={{ padding: 0, border: `1px solid ${LINE}`, borderRadius: 12, overflow: "hidden", background: "#0a0a0a", cursor: "zoom-in", position: "relative", display: "flex", flexDirection: "column", transition: "border-color .2s, transform .15s" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(204,255,0,.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = LINE; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ position: "relative" }}>
        <video src={src} muted playsInline preload="metadata" style={{ width: "100%", height: 200, objectFit: "cover", display: "block", background: "#000", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.15)" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(204,255,0,.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 30px rgba(0,0,0,.45)" }}>
            <svg width="18" height="20" viewBox="0 0 18 20" fill="#0a0a0a"><path d="M0 0v20l18-10z" /></svg>
          </div>
        </div>
      </div>
      <div style={{ padding: "12px 14px 14px", textAlign: "left" }}>
        <span style={{ fontFamily: FD, fontWeight: 600, fontSize: "clamp(13px, 1.3vw, 15px)", color: FG, letterSpacing: "-.008em" }}>{cap}</span>
      </div>
    </button>
  );
}

Object.assign(window, {
  DemoHero, DemoContext, DemoBizdev, DemoProduct, DemoDelivery,
  DemoMarketing, DemoDesign, DemoSupport, DemoHR, DemoOPS, DemoQA, DemoOutro, Lightbox, VidThumb,
});
