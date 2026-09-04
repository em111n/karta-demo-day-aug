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
          <span style={{ color: ACID }}><Stagger text="August" base={0.5} step={0.06} /></span>
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
        parts={[{ t: "Tier A · 69% выручки. " }, { t: "База растёт вширь.", hi: true }]}
        lead="Исследование хайспендеров и опрос 203 рефереров — узнали, что таргет должен быть top-10%, а не top-20%, и что реферальная петля рвётся на выплате." />
      <Section tightTop dataLabel="02 Context">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(14px, 1.6vw, 22px)" }}>
          <StatBlock label="Tier A · доля GTV" value="69%" sub="top-10% платящих" accent big />
          <StatBlock label="LTV12 разрыв" value="247×" sub="Tier A vs нижний дециль" />
          <StatBlock label="Топ-10 · доля GTV" value="24.6 → 13.3%" sub="концентрация падает — здоровый сигнал" />
          <StatBlock label="Рефереры · клейм" value="17%" sub="из 203 когорты доходят до выплаты" />
        </div>

        {/* Что выяснили в августе — два симметричных блока */}
        <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)", marginTop: "clamp(20px, 2.4vw, 30px)" }}>
          {[
            {
              title: ["Исследование", "хайспендеров"],
              meta: "DIS-80 · 11.08",
              items: [
                "Естественная отсечка — <b>top-10% (Tier A)</b>, не top-20%",
                "Tier A даёт <b>69% выручки</b>, разрыв LTV12 с нижним децилем — <b>247×</b>",
                "Концентрация в топе снижается: доля топ-10 клиентов в GTV <b>24.6% → 13.3%</b>",
                "База растёт вширь — здоровый сигнал",
              ],
              accent: true,
            },
            {
              title: ["Опрос", "рефереров"],
              meta: "203 респондента · 7–10.08",
              items: [
                "Приглашают <b>из любви к продукту</b> (60%)",
                "Петля рвётся на выплате — до клейма доходят только <b>17%</b>",
                "Киты (10+ приглашённых) — снижение порога <b>2 000 Karats</b> запрос №1 (57%)",
                "Кандидат №1 в roadmap: <b>2 000 → 500 Karats</b>",
              ],
            },
          ].map((b, i) => (
            <div key={i} style={{ padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: b.accent ? "1px solid rgba(204,255,0,.28)" : `1px solid ${LINE}`, background: b.accent ? "linear-gradient(135deg, rgba(204,255,0,.06), rgba(204,255,0,.015) 70%)" : "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)", display: "flex", flexDirection: "column", gap: "clamp(20px, 2.4vw, 30px)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(28px, 3.4vw, 44px)", letterSpacing: "-.025em", lineHeight: .95, textTransform: "uppercase", color: b.accent ? ACID : FG }}>
                  {b.title[0]}<br />{b.title[1]}
                </h3>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: "clamp(11px, 1.15vw, 13px)", letterSpacing: ".22em", textTransform: "uppercase", color: FG4, textAlign: "right", paddingTop: 8 }}>{b.meta}</span>
              </div>
              <div style={{ borderTop: `1px solid ${b.accent ? "rgba(204,255,0,.18)" : LINE}` }} />
              <BulletList items={b.items} />
            </div>
          ))}
        </div>

        {/* Roadmap Q3 — big H1 */}
        <Reveal delay={0.08}>
          <div style={{ marginTop: "clamp(32px, 4vw, 56px)" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: "clamp(20px, 2.4vw, 32px)" }}>
              <h2 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(48px, 6.4vw, 88px)", letterSpacing: "-.035em", lineHeight: .95, color: FG }}>
                Roadmap · <span style={{ color: ACID }}>Q3</span>
              </h2>
              <span style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(13px, 1.4vw, 16px)", color: FG3, paddingBottom: 12 }}>согласовано с командой</span>
            </div>
            <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "clamp(14px, 1.8vw, 22px)" }}>
              <ColBlock title="Product" items={[
                "Retention M1 новичка <b>30% → 35%</b> — самый дорогой узел дерева",
                "Tx старой базы <b>+30%</b> (35 → 45.5 tx/мес на юзера)",
                "Retention Tier A <b>95% → 97%</b>",
                "Subscription — go/no-go к октябрю",
              ]} accent />
              <ColBlock title="Marketing" items={[
                "Воронка KYC → платящий <b>8.8% → 13.2%</b>",
                "Affiliate-программа <b>с нуля</b>",
                "Инфлюенс-тест — <b>11 интеграций/мес</b> к сентябрю",
                "Все три с дедлайном <b>30.09</b>",
              ]} />
              <ColBlock title="Ops" items={[
                "Единый дашборд компании — план/факт по 5 ключевым KPI",
                "Linear — операционный хребет",
                "Org Structure 2.0 — разделение B2C / B2B / Andgate",
              ]} />
            </div>
          </div>
        </Reveal>
      </Section>
    </React.Fragment>
  );
}

/* ==============================================================
   03 · BIZDEV — hidden in August (kept as dead code for future)
   ============================================================== */
/* eslint-disable */
function _DemoBizdev_hidden_August() {
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
        parts={[{ t: "GTV $12.24M — " }, { t: "49% плана.", hi: true }]}
        lead="Tier A даёт 69% выручки при LTV/CAC 133×. Ключевой рычаг Q3 — Digital Wallet и Tx старой базы." />
      <Section tightTop dataLabel="03 Product">
        {/* GTV hero block with +3.3% chip */}
        <div style={{ padding: "clamp(24px, 2.8vw, 40px)", borderRadius: 14, border: "1px solid rgba(204,255,0,.28)", background: "linear-gradient(135deg, rgba(204,255,0,.06), rgba(204,255,0,.015) 70%)", display: "flex", flexDirection: "column", gap: "clamp(16px, 2vw, 24px)" }}>
          <div className="dd-gtv-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)", alignItems: "stretch" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <span style={{ display: "block", fontFamily: FD, fontWeight: 700, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: ACID, marginBottom: 8 }}>GTV · август</span>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
                <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(48px, 6.4vw, 96px)", letterSpacing: "-.035em", lineHeight: .95, color: FG, fontVariantNumeric: "tabular-nums" }}>$12.24M</h3>
                <span style={{ marginTop: "clamp(6px, .8vw, 12px)", padding: "8px 16px", borderRadius: 999, background: ACID, color: "#0a0a0a", fontFamily: FD, fontWeight: 800, fontStretch: "115%", fontVariationSettings: "'wght' 800,'wdth' 115", fontSize: "clamp(16px, 1.8vw, 22px)", letterSpacing: "-.005em", lineHeight: 1, whiteSpace: "nowrap" }}>+3.3%</span>
              </div>
              <span style={{ display: "block", marginTop: 8, fontFamily: FD, fontWeight: 500, fontSize: "clamp(13px, 1.35vw, 15px)", color: FG3 }}>цель $24M · 49% плана</span>
            </div>
            <div style={{ padding: "clamp(20px, 2.4vw, 28px)", border: `1px solid ${LINE}`, borderRadius: 12, background: "rgba(255,255,255,.03)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
              <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>Годовая цель</div>
              <div style={{ fontFamily: FD, fontWeight: 700, fontStretch: "115%", fontVariationSettings: "'wght' 700,'wdth' 115", fontSize: "clamp(20px, 2.2vw, 28px)", lineHeight: 1.25, letterSpacing: "-.012em", color: FG2 }}>
                <b style={{ color: FG }}>$55M/мес к декабрю</b> требует <b style={{ color: FG }}>25.8% MoM</b> — отстаём <b style={{ color: ACID }}>на 2 месяца</b>
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 900px) { .dd-gtv-row { grid-template-columns: 1fr !important; } }`}</style>
          <div style={{ borderTop: "1px solid rgba(204,255,0,.15)" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "clamp(12px, 1.4vw, 18px)" }}>
            <StatBlock label="Paying users" value="5 984" sub="+1% · было 5 924" />
            <StatBlock label="Transactions" value="245 190" sub="+1% · было 243 109" />
            <StatBlock label="Median spend / user" value="$189" sub="было $184" />
          </div>
        </div>

        {/* Tier A hero block */}
        <Reveal delay={0.08}>
          <div style={{ marginTop: "clamp(24px, 3vw, 40px)", padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
              <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: ACID }}>Tier A · top-10% платящих</span>
              <span style={{ fontFamily: FD, fontWeight: 500, fontSize: 13, color: FG3 }}>824 человека</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "clamp(12px, 1.4vw, 18px)" }}>
              <StatBlock label="m1 GTV avg" value="$10 912" sub="средний за месяц 1" />
              <StatBlock label="LTV12" value="$2 664" sub="за 12 месяцев" />
              <StatBlock label="ARPU / мес" value="$225" sub="стабильный" />
              <StatBlock label="Payback" value="< нед" sub="LTV/CAC 133×" accent />
            </div>
            <p style={{ margin: "clamp(16px, 2vw, 24px) 0 0", fontFamily: FD, fontWeight: 500, fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.5, color: FG2 }}>
              Лучший leading indicator — <b style={{ color: FG }}>Digital Wallet в Apple/Google Pay</b>: конверсия в платящего <b style={{ color: ACID }}>82%</b> против <b>1.3%</b> без него.
            </p>
          </div>
        </Reveal>

        {/* Что дальше — крупный основной блок */}
        <Reveal delay={0.12}>
          <div style={{ marginTop: "clamp(32px, 4vw, 56px)" }}>
            <h2 style={{ margin: "0 0 clamp(20px, 2.4vw, 32px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(48px, 6.4vw, 88px)", letterSpacing: "-.035em", lineHeight: .95, color: FG }}>
              Что <span style={{ color: ACID }}>дальше</span>
            </h2>
            <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)" }}>
              {[
                { k: "01", title: "Tx старой базы", accent: true,
                  metric: "+30%",
                  sub: "35 → 45.5 tx/мес на юзера",
                  bullet: "= <b>+$788 GTV/юзер</b> в месяц",
                  extra: "DW-экран в онбординге · QR-payments · физкарты на поток" },
                { k: "02", title: "Retention M1",
                  metric: "30 → 35%",
                  sub: "самый дорогой узел дерева",
                  bullet: "Онбординг · DW-фича · триггеры возврата",
                  extra: null },
                { k: "03", title: "Реферальный порог",
                  metric: "2 000 → 500",
                  sub: "Karats · тормоз №1 (57% рефереров)",
                  bullet: "Считаем экономику — самый дешёвый рычаг",
                  extra: null },
                { k: "04", title: "Subscription",
                  metric: "go / no-go",
                  sub: "к октябрю",
                  bullet: "Модель монетизации Tier A — <b>$225 ARPU/мес</b>",
                  extra: null },
              ].map((it, i) => (
                <div key={i} style={{ padding: "clamp(24px, 2.8vw, 34px)", borderRadius: 14, border: it.accent ? "1px solid rgba(204,255,0,.32)" : `1px solid ${LINE}`, background: it.accent ? "linear-gradient(135deg, rgba(204,255,0,.06), rgba(204,255,0,.015) 70%)" : "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)", display: "flex", flexDirection: "column", gap: "clamp(12px, 1.4vw, 18px)" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 13, letterSpacing: ".22em", color: it.accent ? ACID : FG4, fontVariantNumeric: "tabular-nums" }}>{it.k}</span>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontStretch: "115%", fontVariationSettings: "'wght' 700,'wdth' 115", fontSize: "clamp(18px, 1.9vw, 22px)", letterSpacing: "-.012em", color: FG }}>{it.title}</span>
                  </div>
                  <div style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(40px, 5.2vw, 68px)", letterSpacing: "-.03em", lineHeight: .95, color: it.accent ? ACID : FG, fontVariantNumeric: "tabular-nums" }}>
                    {it.metric}
                  </div>
                  <div style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(13px, 1.35vw, 15px)", color: FG3 }}>{it.sub}</div>
                  <div style={{ borderTop: `1px solid ${it.accent ? "rgba(204,255,0,.18)" : LINE}` }} />
                  <div style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.5, color: FG2 }} dangerouslySetInnerHTML={{ __html: it.bullet }} />
                  {it.extra && (
                    <div style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(13px, 1.35vw, 15px)", lineHeight: 1.45, color: FG3, fontStyle: "italic" }}>{it.extra}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
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
        parts={[{ t: "Август 2026 — " }, { t: "итоги и ключевые вехи.", hi: true }]}
        lead="309 sp удержаны, passrate 75.6%, безопасность выдержала атаку. Pay In Due и Virtual Account Rain — в продакшн." />
      <Section tightTop dataLabel="04 Delivery">

        {/* 1. Метрики и производительность */}
        <div>
          <h3 style={{ margin: "0 0 clamp(16px, 2vw, 22px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-.025em", lineHeight: 1.02, color: FG }}>
            Метрики и <span style={{ color: ACID }}>производительность</span>
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(14px, 1.6vw, 22px)" }}>
            <StatBlock label="Avg SP · август" value="309" sub="capacity 309 sp · 100%" accent big />
            <StatBlock label="QA PassRate" value="75.6%" sub="было 72% · рост" />
            <StatBlock label="Автотесты · KYC моки" value="99.9%" sub="без переключения вебхуков" />
            <StatBlock label="Безопасность" value="Атака отражена" sub="действия сведены к нулю" />
          </div>
          <p style={{ margin: "clamp(14px, 1.6vw, 20px) 0 0", fontFamily: FD, fontWeight: 500, fontSize: "clamp(14px, 1.4vw, 16px)", lineHeight: 1.5, color: FG3 }}>
            Уровень предыдущих спринтов сохранён. Внедрены <b style={{ color: FG }}>новая система приоритетов</b> и <b style={{ color: FG }}>новая система планирования</b> — курс на ускорение доставки фичей.
          </p>
        </div>

        {/* 2. Релизы (Август) */}
        <Reveal delay={0.06}>
          <div style={{ marginTop: "clamp(32px, 4vw, 56px)" }}>
            <h3 style={{ margin: "0 0 clamp(16px, 2vw, 22px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-.025em", lineHeight: 1.02, color: FG }}>
              Релизы <span style={{ color: FG4, fontWeight: 600 }}>(Август)</span>
            </h3>
            <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)" }}>
              <ColBlock title="Выпущено" items={[
                "<b>Pay In Due</b>",
                "<b>Virtual Account Rain</b>",
                "Новые маркетинговые ивенты (KYC и др.)",
              ]} accent />
              <ColBlock title="В работе (Финишная прямая)" items={[
                "<b>New Payment Channels</b>",
                "<b>Pay Out</b>",
                "<b>DWH</b>",
              ]} />
            </div>
          </div>
        </Reveal>

        {/* 3. Следующие запланированные вехи */}
        <Reveal delay={0.08}>
          <div style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
            <h3 style={{ margin: "0 0 clamp(16px, 2vw, 22px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-.025em", lineHeight: 1.02, color: FG }}>
              Следующие <span style={{ color: ACID }}>запланированные вехи</span>
            </h3>
            <div className="dd-milestones" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(12px, 1.4vw, 18px)" }}>
              {[
                { t: "Доставка физкарт" },
                { t: "Переезд на Andgate" },
                { t: "Реализация Card Offer" },
                { t: "Задачи рефералки" },
              ].map((m, i) => (
                <div key={i} style={{ padding: "clamp(20px, 2.4vw, 28px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)", display: "flex", flexDirection: "column", gap: 10, minHeight: 130 }}>
                  <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 12, letterSpacing: ".22em", color: FG4, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontFamily: FD, fontWeight: 700, fontStretch: "115%", fontVariationSettings: "'wght' 700,'wdth' 115", fontSize: "clamp(17px, 1.85vw, 22px)", letterSpacing: "-.012em", color: FG, lineHeight: 1.2 }}>{m.t}</span>
                </div>
              ))}
            </div>
            <style>{`@media (max-width: 900px) { .dd-milestones { grid-template-columns: 1fr 1fr !important; } }`}</style>
          </div>
        </Reveal>

        {/* 4. Стабильность и инциденты — color-coded */}
        <Reveal delay={0.1}>
          <div style={{ marginTop: "clamp(32px, 4vw, 56px)" }}>
            <h3 style={{ margin: "0 0 clamp(16px, 2vw, 22px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-.025em", lineHeight: 1.02, color: FG }}>
              Стабильность и <span style={{ color: ACID }}>инциденты</span>
            </h3>
            <p style={{ margin: "0 0 clamp(20px, 2.4vw, 28px)", fontFamily: FD, fontWeight: 500, fontSize: "clamp(14px, 1.4vw, 16px)", lineHeight: 1.5, color: FG3 }}>
              Внешние сбои провайдеров + рост нагрузки от новых фичей. Успешно отражена <b style={{ color: FG }}>атака на инфраструктуру</b> — предыдущее обновление свело действия атакующего к нулю.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: FD, fontVariantNumeric: "tabular-nums" }}>
              {[
                { id: "DEL-324",  severity: "massive", tag: "атака",         title: "Ошибка регистрации" },
                { id: "KPE-2181", severity: "few",     tag: "сторона Rain",  title: "Проблемы с карточными платежами" },
                { id: "KPL-1427", severity: "few",     tag: "откат девопс",  title: "Выгрузка из админки" },
                { id: "KBU-1062", severity: "single",  tag: "исправлено",    title: "3DS на старую почту" },
                { id: "KBU-1079", severity: "single",  tag: "блокировка",    title: "Прохождение KYC не на себя" },
                { id: "KBU-1038", severity: "single",  tag: null,            title: "Угон аккаунта" },
                { id: "KBU-1098", severity: "single",  tag: null,            title: "Компания не попала в Rain" },
              ].map((it, i) => {
                const sev = {
                  massive: { bg: "rgba(224,66,66,.14)", bd: "rgba(224,66,66,.4)",  fg: "#ff6a6a" },
                  few:     { bg: "rgba(255,178,0,.12)", bd: "rgba(255,178,0,.35)", fg: "#ffb200" },
                  single:  { bg: "rgba(90,192,111,.10)", bd: "rgba(90,192,111,.32)", fg: "#5ac06f" },
                }[it.severity];
                return (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "center", padding: "clamp(14px, 1.6vw, 18px) clamp(18px, 2vw, 22px)", borderRadius: 12, background: "rgba(255,255,255,.02)", border: `1px solid ${LINE}` }}>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(13px, 1.35vw, 15px)", letterSpacing: ".05em", color: FG3 }}>{it.id}</span>
                    <span style={{ fontFamily: FD, fontWeight: 600, fontSize: "clamp(15px, 1.55vw, 18px)", color: FG }}>{it.title}</span>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: sev.bg, border: `1px solid ${sev.bd}` }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: sev.fg }} />
                      <span style={{ fontFamily: FD, fontWeight: 800, fontSize: "clamp(12px, 1.3vw, 14px)", letterSpacing: ".08em", textTransform: "uppercase", color: sev.fg }}>{it.severity}</span>
                      {it.tag && <span style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(12px, 1.25vw, 13px)", color: FG3 }}>· {it.tag}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* 5. Автотесты · качество */}
        <Reveal delay={0.12}>
          <div style={{ marginTop: "clamp(32px, 4vw, 56px)", padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: "1px solid rgba(204,255,0,.28)", background: "linear-gradient(135deg, rgba(204,255,0,.06), rgba(204,255,0,.015) 70%)" }}>
            <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(18px, 1.8vw, 24px)", letterSpacing: ".04em", textTransform: "uppercase", color: ACID, marginBottom: 20 }}>Автотесты · качество</h3>
            <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 26px)" }}>
              <ColBlock title="Что улучшили" items={[
                "Passrate <b>72% → 75.6%</b>",
                "<b>Моки KYC</b> — аккаунты и компании без вебхуков (99.9% автотестов)",
                "Отдельный набор для <b>интеграций</b> (требуют хуки)",
                "B2C: создание аккаунтов, KYC, транзакции Rain/Due через сендбокс",
              ]} />
              <ColBlock title="Следующие шаги" items={[
                "<b>B2C Rain/Due</b> — мок транзакций через API",
                "<b>B2C UI</b> — сценарий User Flow на Playwright",
              ]} />
            </div>
          </div>
        </Reveal>

        {/* 6. Статистика Pay In */}
        <Reveal delay={0.14}>
          <div style={{ marginTop: "clamp(32px, 4vw, 56px)" }}>
            <h3 style={{ margin: "0 0 clamp(16px, 2vw, 22px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-.025em", lineHeight: 1.02, color: FG }}>
              Статистика <span style={{ color: ACID }}>Pay In</span>
            </h3>
            <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "clamp(16px, 2vw, 24px)", alignItems: "start" }}>
              {/* Overall stats table */}
              <div style={{ borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.04), rgba(255,255,255,.01) 70%)", overflow: "hidden" }}>
                <div style={{ padding: "16px 22px", borderBottom: `1px solid ${LINE}`, fontFamily: FD, fontWeight: 700, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>Общая статистика · август</div>
                <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", fontFamily: FD, fontVariantNumeric: "tabular-nums" }}>
                  {[
                    { k: "Всего транзакций", v: "121" },
                    { k: "Уникальных пользователей", v: "61" },
                    { k: "Общий объём", v: "$56 073.15" },
                    { k: "Средний депозит (на транзакцию)", v: "$463.41", accent: true },
                    { k: "Средний объём на пользователя", v: "≈ $919.24" },
                  ].map((r, i) => (
                    <React.Fragment key={i}>
                      <div style={{ padding: "clamp(14px, 1.6vw, 18px) 22px", fontFamily: FD, fontWeight: r.accent ? 700 : 500, fontSize: "clamp(14px, 1.45vw, 16px)", color: r.accent ? FG : FG2, borderTop: `1px solid ${LINE}`, lineHeight: 1.4 }}>{r.k}</div>
                      <div style={{ padding: "clamp(14px, 1.6vw, 18px) 22px", fontFamily: FD, fontWeight: 800, fontSize: "clamp(15px, 1.55vw, 18px)", color: r.accent ? ACID : FG, textAlign: "right", borderTop: `1px solid ${LINE}` }}>{r.v}</div>
                    </React.Fragment>
                  ))}
                </div>
                <div style={{ padding: "12px 22px", borderTop: `1px solid ${LINE}`, background: "rgba(255,255,255,.02)", fontFamily: FD, fontWeight: 500, fontSize: 12, color: FG4 }}>~2 транзакции на юзера</div>
              </div>

              {/* Channels bar chart */}
              <div style={{ padding: "clamp(18px, 2vw, 24px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.04), rgba(255,255,255,.01) 70%)" }}>
                <div style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: FG4, marginBottom: 14 }}>Каналы · users</div>
                {[
                  { k: "SEPA", v: 61, hi: true },
                  { k: "ACH", v: 29 },
                  { k: "PIX", v: 17 },
                  { k: "Wire", v: 8 },
                  { k: "SPEI (Мексика)", v: 8 },
                ].map((r, i) => {
                  const max = 61;
                  return (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr auto", gap: 14, alignItems: "center", padding: "10px 0", borderTop: i > 0 ? `1px solid ${LINE}` : "none" }}>
                      <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 14, color: r.hi ? ACID : FG }}>{r.k}</span>
                      <div style={{ height: 10, background: "rgba(255,255,255,.04)", borderRadius: 6, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(r.v/max)*100}%`, background: r.hi ? ACID : "#4a90e2" }} />
                      </div>
                      <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 16, color: r.hi ? ACID : FG, fontVariantNumeric: "tabular-nums" }}>{r.v}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* 7. DUE funnel */}
        <Reveal delay={0.16}>
          <div style={{ marginTop: "clamp(32px, 4vw, 56px)" }}>
            <h3 style={{ margin: "0 0 clamp(16px, 2vw, 22px)", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(28px, 3.6vw, 44px)", letterSpacing: "-.025em", lineHeight: 1.02, color: FG }}>
              DUE · <span style={{ color: ACID }}>воронка активации</span>
            </h3>
            <div style={{ borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.04), rgba(255,255,255,.01) 70%)", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.6fr .8fr .8fr .8fr", fontFamily: FD, fontVariantNumeric: "tabular-nums" }}>
                {["Шаг", "Кол-во польз.", "% от начавших POA", "% от предыдущего шага"].map((h, i) => (
                  <div key={i} style={{ padding: "16px 22px", fontFamily: FD, fontWeight: 700, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: FG4, textAlign: i === 0 ? "left" : "right", borderBottom: `1px solid ${LINE}`, background: "rgba(255,255,255,.02)" }}>{h}</div>
                ))}
                {[
                  { k: "1. Начали POA", n: "813", p1: "100%", p2: "—" },
                  { k: "2. Прошли POA (APPROVED)", n: "520", p1: "64%", p2: "64%" },
                  { k: "3. Получили VA (Due approved)", n: "401", p1: "49%", p2: "77%" },
                  { k: "4. Сделали Payin-транзакцию (любую, PAYIN)", n: "100", p1: "12%", p2: "25%", accent: true },
                ].map((r, i) => (
                  <React.Fragment key={i}>
                    <div style={{ padding: "clamp(14px, 1.6vw, 18px) 22px", fontFamily: FD, fontWeight: r.accent ? 700 : 600, fontSize: "clamp(14px, 1.45vw, 16px)", color: r.accent ? ACID : FG, borderTop: `1px solid ${LINE}` }}>{r.k}</div>
                    <div style={{ padding: "clamp(14px, 1.6vw, 18px) 22px", fontFamily: FD, fontWeight: 800, fontSize: "clamp(15px, 1.55vw, 18px)", color: r.accent ? ACID : FG, textAlign: "right", borderTop: `1px solid ${LINE}` }}>{r.n}</div>
                    <div style={{ padding: "clamp(14px, 1.6vw, 18px) 22px", fontFamily: FD, fontWeight: 700, fontSize: "clamp(14px, 1.45vw, 16px)", color: r.accent ? ACID : FG2, textAlign: "right", borderTop: `1px solid ${LINE}` }}>{r.p1}</div>
                    <div style={{ padding: "clamp(14px, 1.6vw, 18px) 22px", fontFamily: FD, fontWeight: 700, fontSize: "clamp(14px, 1.45vw, 16px)", color: r.accent ? ACID : FG2, textAlign: "right", borderTop: `1px solid ${LINE}` }}>{r.p2}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
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
        parts={[{ t: "GTV new users " }, { t: "второй за всю историю.", hi: true }]}
        lead="+37% GTV при +3.7% бюджета. 15 843 регистрации (+32%). ОАЭ и Британия — выключенные регионы вернули $ и плательщиков." />
      <Section tightTop dataLabel="05 Marketing">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(14px, 1.6vw, 22px)" }}>
          <StatBlock label="GTV new users" value="$1.13M" sub="было $823K · +37%" accent big />
          <StatBlock label="Бюджет" value="+3.7%" sub="эффективность выросла" />
          <StatBlock label="Регистрации" value="15 843" sub="+32% MoM" />
          <StatBlock label="Клиент · LTV" value="$1 185" sub="максимум за 15 месяцев" />
        </div>

        {/* GTV chart from Notion */}
        <Reveal delay={0.06}>
          <div style={{ marginTop: "clamp(20px, 2.4vw, 30px)", padding: "clamp(20px, 2.4vw, 28px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.04), rgba(255,255,255,.01) 70%)" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 14, flexWrap: "wrap", marginBottom: 12 }}>
              <h4 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(18px, 1.8vw, 24px)", letterSpacing: "-.012em", color: FG }}>GTV new users · трек за 3 месяца</h4>
              <span style={{ fontFamily: FD, fontWeight: 500, fontSize: 13, color: FG3 }}>август — второй за всю историю по незакрытой когорте</span>
            </div>
            <img src="assets/notion-aug/marketing-gtv-new-users.png" alt="GTV new users chart" data-lightbox-src="assets/notion-aug/marketing-gtv-new-users.png" data-lightbox-cap="GTV новых пользователей · трек" style={{ width: "100%", height: "auto", borderRadius: 10, cursor: "zoom-in", display: "block", border: `1px solid ${LINE}` }} />
          </div>
        </Reveal>

        {/* Attracted users growth chart */}
        <Reveal delay={0.08}>
          <div style={{ marginTop: "clamp(16px, 2vw, 24px)", padding: "clamp(20px, 2.4vw, 28px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.04), rgba(255,255,255,.01) 70%)" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 14, flexWrap: "wrap", marginBottom: 12 }}>
              <h4 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(18px, 1.8vw, 24px)", letterSpacing: "-.012em", color: FG }}>Привлечённые пользователи</h4>
              <span style={{ fontFamily: FD, fontWeight: 500, fontSize: 13, color: FG3 }}>с июня <b style={{ color: ACID }}>+20%</b></span>
            </div>
            <img src="assets/notion-aug/marketing-attracted-growth.png" alt="Attracted users growth" data-lightbox-src="assets/notion-aug/marketing-attracted-growth.png" data-lightbox-cap="Рост привлечённых пользователей" style={{ width: "100%", height: "auto", borderRadius: 10, cursor: "zoom-in", display: "block", border: `1px solid ${LINE}` }} />
          </div>
        </Reveal>

        {/* Funnel table: regs / KYC / deposits / cards */}
        <Reveal delay={0.1}>
          <div style={{ marginTop: "clamp(16px, 2vw, 24px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.04), rgba(255,255,255,.01) 70%)", overflow: "hidden" }}>
            <div style={{ padding: "clamp(16px, 1.8vw, 22px) clamp(20px, 2.2vw, 28px)", borderBottom: `1px solid ${LINE}`, display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>Воронка · регистрации → карты</span>
              <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, color: FG3 }}>по месяцам</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", fontFamily: FD, fontVariantNumeric: "tabular-nums" }}>
              {["Месяц", "Регистрации", "KYC", "Депозиты", "Карты"].map((h, i) => (
                <div key={i} style={{ padding: "16px 22px", fontWeight: 700, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: FG4, borderBottom: `1px solid ${LINE}`, textAlign: i === 0 ? "left" : "right", background: "rgba(255,255,255,.02)" }}>{h}</div>
              ))}
              {[
                { c: ["май 26", "4 890", "1 383", "473", "430"] },
                { c: ["июн 26", "3 818", "1 167", "435", "672"] },
                { c: ["июл 26", "3 158", "943", "420", "374"] },
                { c: ["авг 26", "7 889", "2 008", "574", "531"], hi: true },
              ].map((r, i) => (
                <React.Fragment key={i}>
                  {r.c.map((c, j) => (
                    <div key={j} style={{ padding: "16px 22px", fontWeight: j === 0 ? 700 : 600, fontSize: "clamp(15px, 1.5vw, 18px)", textAlign: j === 0 ? "left" : "right", color: r.hi ? ACID : (j === 0 ? FG : FG2), borderBottom: `1px solid ${LINE}`, background: r.hi ? "rgba(204,255,0,.04)" : "transparent" }}>{c}</div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Reveal>

        {/* What we did + Regions */}
        <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)", marginTop: "clamp(20px, 2.4vw, 30px)" }}>
          <ColBlock title="Что сделали" items={[
            "Реструктуризация <b>Paid источников</b>",
            "Подключили <b>Email канал</b> в CRM",
            "Новые <b>креативы</b> с ресайзами на новые сегменты",
            "Запустили <b>новые регионы</b> и расширили верх воронки",
            "<b>61 страна</b> в продвижении на бюджете $45.5K",
          ]} />
          <ColBlock title="Регионы · выключенные вернули $" kicker="wins" items={[
            "<b>ОАЭ:</b> бюджет $8.3K → $4.2K, оборот <b>$182K → $480K</b>",
            "<b>Британия:</b> $23K → $148K + <b>25 плательщиков</b> при нулевом бюджете",
            "<b>Индонезия:</b> 104 плательщика по $12.67",
            "Топовый крео: $1.7K расхода → <b>$119K</b> оборота (×70)",
          ]} accent />
        </div>

        {/* Meta results */}
        <Reveal delay={0.14}>
          <div style={{ marginTop: "clamp(20px, 2.4vw, 30px)", padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: "1px solid rgba(204,255,0,.28)", background: "linear-gradient(135deg, rgba(204,255,0,.06), rgba(204,255,0,.015) 70%)" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(18px, 1.8vw, 24px)", letterSpacing: ".04em", textTransform: "uppercase", color: ACID }}>Meta · максимум с мая</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(12px, 1.4vw, 18px)" }}>
              <StatBlock label="Регистрации" value="7 889" sub="максимум с мая" />
              <StatBlock label="Депозиты" value="574" sub="максимум с мая" />
              <StatBlock label="Cost per payer" value="$36.07" sub="было $37.93 · дешевле при бόльшем объёме" />
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
  const b2c = [
    ["Time to first response", "4m 10s", "3m 21s"],
    ["Inquiries handled",      "2 397",  "2 969"],
    ["AI Agent resolution",    "—",      "61%"],
    ["CSAT",                    "86.9%", "91% (1 702)"],
  ];
  const b2b = [
    ["Time to first response", "2m 6s", "2m 33s"],
    ["Inquiries handled",      "171",   "171"],
    ["CSAT",                    "100%", "90%"],
  ];
  const renderTable = (rows, accent) => (
    <table style={{ marginTop: 20, width: "100%", borderCollapse: "collapse", fontFamily: FD, fontSize: "clamp(16px, 1.6vw, 20px)" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", padding: "12px 0", borderBottom: `1px solid ${accent ? "rgba(204,255,0,.18)" : LINE}`, color: FG4, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}>Metric</th>
          <th style={{ textAlign: "right", padding: "12px 0", borderBottom: `1px solid ${accent ? "rgba(204,255,0,.18)" : LINE}`, color: FG4, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}>July</th>
          <th style={{ textAlign: "right", padding: "12px 0", borderBottom: `1px solid ${accent ? "rgba(204,255,0,.18)" : LINE}`, color: accent ? ACID : FG4, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}>August</th>
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
        parts={[{ t: "B2C CSAT " }, { t: "86.9 → 91%.", hi: true }, { t: " AI Agent 61%." }]}
        lead="TFR B2C — 3m 21s (было 4m 10s). AI Agent закрывает 61% обращений. B2B TFR немного вырос при том же объёме." />
      <Section tightTop dataLabel="07 Support">
        <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)" }}>
          <div style={{ padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: "1px solid rgba(204,255,0,.28)", background: "linear-gradient(135deg, rgba(204,255,0,.06), rgba(204,255,0,.015) 70%)" }}>
            <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(20px, 2vw, 28px)", letterSpacing: ".04em", textTransform: "uppercase", color: ACID }}>B2C</h3>
            {renderTable(b2c, true)}
            <p style={{ margin: "20px 0 0", fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>Top queries · August</p>
            <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontFamily: FD, fontWeight: 500, fontSize: "clamp(15px, 1.6vw, 19px)", lineHeight: 1.45, color: FG2 }}>
              <li>· <b style={{color: FG}}>Apple Pay / Google Pay</b> — 346 (11.5%)</li>
              <li>· <b style={{color: FG}}>KYC · verification · registration</b> — 281 (9.4%)</li>
              <li>· <b style={{color: FG}}>Top-ups / delayed crypto deposits & withdrawals</b> — 272 (9.1%)</li>
            </ul>
          </div>

          <div style={{ padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)" }}>
            <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(20px, 2vw, 28px)", letterSpacing: ".04em", textTransform: "uppercase", color: FG }}>B2B</h3>
            {renderTable(b2b)}
            <p style={{ margin: "20px 0 0", fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>Top queries · August</p>
            <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontFamily: FD, fontWeight: 500, fontSize: "clamp(15px, 1.6vw, 19px)", lineHeight: 1.45, color: FG2 }}>
              <li>· <b style={{color: FG}}>Business account · registration · KYB</b> — 54 (22.9%)</li>
              <li>· <b style={{color: FG}}>Virtual accounts · Bank top-up</b> — 50 (21.2%)</li>
              <li>· <b style={{color: FG}}>Top-ups · delayed crypto deposits</b> — 23 (9.7%)</li>
            </ul>
          </div>
        </div>

        {/* Feedbacks galleries · August */}
        {[
          { t: "Apple Pay", scope: "B2C", imgs: ["support-applepay-1.png","support-applepay-2.png","support-applepay-3.png"] },
          { t: "Rhino delays", scope: "B2C", imgs: ["support-rhino-delays.png"] },
          { t: "KYC / KYB", scope: "B2C · B2B", imgs: ["support-kyc-kyb-1.png","support-kyc-kyb-2.png","support-kyc-kyb-3.png"] },
          { t: "Positive feedback", scope: "B2C", imgs: ["support-positive-1.png","support-positive-2.png","support-positive-3.png"], accent: true },
        ].map((g, gi) => (
          <Reveal key={gi} delay={0.04 + gi * 0.02}>
            <div style={{ marginTop: gi === 0 ? "clamp(24px, 2.8vw, 32px)" : "clamp(20px, 2.4vw, 28px)", padding: "clamp(20px, 2.4vw, 30px)", borderRadius: 14, border: `1px solid ${g.accent ? "rgba(204,255,0,.22)" : LINE}`, background: g.accent ? "linear-gradient(135deg, rgba(204,255,0,.04), rgba(204,255,0,.01) 70%)" : "rgba(255,255,255,.025)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: g.accent ? ACID : FG4, padding: "3px 8px", border: `1px solid ${g.accent ? "rgba(204,255,0,.4)" : LINE}`, borderRadius: 4 }}>{g.scope}</span>
                <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 700, fontStretch: "115%", fontVariationSettings: "'wght' 700,'wdth' 115", fontSize: "clamp(15px, 1.6vw, 20px)", letterSpacing: "-.01em", color: FG, lineHeight: 1.2 }}>{g.t}</h3>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                {g.imgs.map((name) => (
                  <img key={name} src={`assets/notion-aug/${name}`} alt={g.t}
                    data-lightbox-src={`assets/notion-aug/${name}`} data-lightbox-cap={g.t}
                    style={{ width: "100%", height: 280, objectFit: "cover", objectPosition: "top center", borderRadius: 8, border: `1px solid ${LINE}`, background: "#0a0a0a", cursor: "zoom-in", transition: "transform .2s, border-color .2s" }}
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
        parts={[{ t: "5 новых " }, { t: "на борту.", hi: true }]}
        lead="Marketing Analytics, PM, Mobile Head, Compliance, SMM. Preboarding в PeopleForce и Career Page — в проде." />
      <Section tightTop dataLabel="08 HR">
        <div className="dd-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(16px, 2vw, 24px)", alignItems: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 1.6vw, 20px)" }}>
            <ColBlock title="Welcome on board" items={[
              "<b>Marketing Analytics</b> — Дмитрий SDD",
              "<b>Marketing Project Manager</b> — Виктория VIK",
              "<b>Mobile Lead</b> — Дмитрий VDI",
              "<b>Compliance Specialist</b> — Варвара",
              "<b>SMM</b> — Гавриил",
            ]} accent />
            <ColBlock title="On track" items={[
              "<b>Lead Platform Engineer</b> — Posting / HR Screening",
            ]} />
          </div>
          <img src="assets/notion-aug/hr-sasha-vacation.png" alt="Саша в отпуске" data-lightbox-src="assets/notion-aug/hr-sasha-vacation.png" data-lightbox-cap="Саша в отпуске" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12, cursor: "zoom-in", display: "block", border: `1px solid ${LINE}` }} />
        </div>

        {/* What's new */}
        <Reveal delay={0.1}>
          <div style={{ marginTop: "clamp(20px, 2.4vw, 30px)", padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: `1px solid ${LINE}`, background: "linear-gradient(165deg, rgba(255,255,255,.06), rgba(255,255,255,.015) 70%)" }}>
            <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>What's new on track</span>
            <h3 style={{ margin: "12px 0 20px", fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(22px, 2.6vw, 34px)", lineHeight: 1.1, color: FG }}>
              Автоматизация процессов
            </h3>
            <BulletList items={[
              "Настраиваем процесс <b>пребординга</b> новых сотрудников → автогенерация документов и подписание напрямую в <b>People Force</b>",
              "Тестируем <b>Career Page</b> для откликов и выводим в прод (спасибо, Гриша!)",
            ]} />
          </div>
        </Reveal>

        {/* Hires photo / team overview */}
        <Reveal delay={0.12}>
          <img src="assets/notion-aug/hr-team.png" alt="HR overview" data-lightbox-src="assets/notion-aug/hr-team.png" data-lightbox-cap="HR · команда" style={{ marginTop: "clamp(16px, 2vw, 24px)", width: "100%", height: "auto", borderRadius: 12, cursor: "zoom-in", display: "block", border: `1px solid ${LINE}` }} />
        </Reveal>

        {/* Plans */}
        <Reveal delay={0.14}>
          <div style={{ marginTop: "clamp(20px, 2.4vw, 30px)", padding: "clamp(24px, 2.8vw, 36px)", borderRadius: 14, border: "1px solid rgba(204,255,0,.28)", background: "linear-gradient(135deg, rgba(204,255,0,.06), rgba(204,255,0,.015) 70%)" }}>
            <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: ACID }}>Plans</span>
            <BulletList items={[
              "<b>Месячная аналитика</b> по всем вакансиям и затратам на найм с выгрузкой в Dashboard",
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
  DemoHero, DemoContext, DemoProduct, DemoDelivery,
  DemoMarketing, DemoDesign, DemoSupport, DemoHR, DemoOPS, DemoQA, DemoOutro, Lightbox, VidThumb,
});
