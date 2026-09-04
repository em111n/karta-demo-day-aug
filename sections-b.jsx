/* Karta - Investor Deck · sections 5-7: Solution, How it works, Traction */
const { useState: bS, useEffect: bE, useRef: bR } = React;

/* ============================================================
   05 - SOLUTION
   ============================================================ */
const CAPS = [
{ t: "Store", d: "Self-custody MPC wallet. Stablecoin-denominated. Your keys, always.", tag: "live" },
{ t: "Receive", d: "Crypto on any chain · USD/EUR virtual accounts · local rails (PIX, PromptPay, UAE) → auto-converted to stablecoins.", tag: "live" },
{ t: "Spend", d: "Visa Signature: Virtual and Physical cards (Holographic Plastic and Metal LED). Apple/Google Pay and ATM Withdrawals. High limits across 150+ countries.", tag: "live" },
{ t: "Send", d: "22 networks, 6 tokens and 7 Fiat Virtual Accounts for bank transfers. QR Payments coming in 2026.", tag: "live" },
{ t: "Earn", d: "Referral Program live, Yield coming in 2026.", tag: "roadmap" }];

const CAP_ICONS = ["store", "receive", "spend", "send", "earn"];
/* per-capability app screen - all default to the home screen; swap individually when more screens arrive */
const CAP_SCREENS = {
  Receive: "assets/app-home.jpg",
  Store: "assets/app-home.jpg",
  Spend: "assets/app-home.jpg",
  Send: "assets/app-home.jpg",
  Earn: "assets/app-home.jpg"
};

function CapRow({ c, i, active, onSelect }) {
  const [hov, setHov] = bS(false);
  const borderC = active ? "var(--pp-acid)" : hov ? "rgba(255,255,255,.18)" : "var(--pp-line)";
  return (
    <Reveal variant="left" delay={i * 0.06}>
      <button onClick={onSelect} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      aria-pressed={active}
      style={{ width: "100%", textAlign: "left", cursor: "pointer", font: "inherit", color: "inherit", display: "flex", gap: 20, alignItems: "flex-start", padding: "20px 22px", background: "var(--pp-card)", border: "1px solid " + borderC, borderRadius: 12, transition: "border-color .35s ease, background .35s ease" }}>
        <span style={{ position: "relative", width: 44, height: 44, flex: "0 0 44px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--pp-surface-2)", border: "1px solid " + (active ? "rgba(204,255,0,.3)" : "var(--pp-line)"), borderRadius: 12, transition: "background .35s ease, border-color .35s ease" }}>
          <AnimatedIcon name={CAP_ICONS[i]} play={hov || active} size={22} />
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <h3 className="pp-h3" style={{ margin: 0, fontSize: 22 }}>{c.t}</h3>
            <span style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", fontFamily: "var(--pp-font-display)", fontWeight: 600, padding: "3px 8px", borderRadius: 100, background: c.tag === "live" ? "rgba(204,255,0,.14)" : "var(--pp-control)", color: c.tag === "live" ? "var(--pp-acid)" : "var(--pp-fg-3)" }}>{c.tag}</span>
            <span style={{ marginLeft: "auto", color: "var(--pp-acid)", opacity: active ? 1 : 0, transform: active ? "none" : "translateX(-4px)", transition: "opacity .3s ease, transform .3s ease", fontSize: 18, lineHeight: 1 }}>→</span>
          </div>
          <p className="pp-body" style={{ margin: 0, fontSize: 14.5 }}>{c.d}</p>
        </div>
      </button>
    </Reveal>);

}
function Solution() {
  const [active, setActive] = bS(0);
  return (
    <React.Fragment>
      <SectionHero id="solution" num="04" kicker="solution" align="left"
      parts={[{ t: "Karta - " }, { t: "one wallet for every payment", hi: true }, { t: ", anywhere." }]}
      lead="Stablecoins as the spine, familiar UX on top. Five money jobs, one app - the user never has to know it's crypto." />
      <Section tightTop dataLabel="04 Solution · detail">
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.82fr) minmax(0,1fr)", gap: 36, alignItems: "center" }} className="solution-grid">
        {/* capabilities list + proof line */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CAPS.map((c, i) =>
              <CapRow key={c.t} c={c} i={i} active={active === i} onSelect={() => setActive(i)} />
              )}
          </div>
          <Reveal delay={0.05}>
            <div style={{ borderTop: "1px solid var(--pp-line)", paddingTop: 16 }}>
              <p className="pp-body" style={{ margin: 0, fontSize: 14 }}>
                300+ pre-sold at up to <span style={{ color: "var(--pp-fg)" }}>$300/card</span> · <span style={{ color: "var(--pp-acid)" }}>$90K+ pre-revenue</span>, zero marketing.
              </p>
            </div>
          </Reveal>
        </div>
        {/* bare iPhone mockup - screen follows the selected capability */}
        <Reveal variant="right" delay={0.1}>
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PhoneMockup vh={70}>
              {CAPS.map((c, i) =>
                <img key={c.t} src={CAP_SCREENS[c.t]} alt={c.t + " screen"}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center",
                  opacity: active === i ? 1 : 0, transition: "opacity .4s ease", pointerEvents: "none" }} />
                )}
            </PhoneMockup>
          </div>
        </Reveal>
      </div>
    </Section>
    </React.Fragment>);

}

/* ============================================================
   05 - HOW IT WORKS - two principles + vertical pipeline (layout B)
   ============================================================ */
const HIW_DUE = "assets/partners/due.svg", HIW_RAIN = "assets/partners/rain.svg",
      HIW_TEMPO = "assets/partners/tempo.svg", HIW_SUMSUB = "assets/partners/sumsub.svg";
const HLogo = ({ src, h = 18 }) => <img src={src} alt="" style={{ height: h, width: "auto", objectFit: "contain", opacity: .62, display: "block" }} />;
const HDot = () => <span style={{ color: "var(--pp-fg-4)", fontSize: 16 }}>·</span>;
const HIW_ROWS = [
  { tag: "IN",   note: "Virtual accounts",    logos: <React.Fragment><HLogo src={HIW_DUE} /><HDot /><HLogo src={HIW_RAIN} /></React.Fragment> },
  { tag: "OUT",  note: "Payouts",             logos: <HLogo src={HIW_DUE} /> },
  { tag: "CARD", note: "Card issuing",        logos: <HLogo src={HIW_RAIN} /> },
  { tag: "STBL", note: "Stablecoin issuance", logos: <HLogo src={HIW_TEMPO} /> },
  { tag: "KYC",  note: "Identity & AML",      logos: <HLogo src={HIW_SUMSUB} h={20} /> },
];
const HIW_ICON = {
  IN:   <React.Fragment><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" /><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /></React.Fragment>,
  OUT:  <React.Fragment><path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" /><path d="M17 17l5-5-5-5" /><path d="M21 12H9" /></React.Fragment>,
  CARD: <React.Fragment><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h3" /></React.Fragment>,
  STBL: <React.Fragment><circle cx="12" cy="12" r="9" /><path d="M12 7v10" /><path d="M14.6 9.4c0-1-1.1-1.6-2.6-1.6s-2.6.7-2.6 1.8c0 2.4 5.2 1.2 5.2 3.6 0 1.1-1.1 1.8-2.6 1.8s-2.6-.7-2.6-1.7" /></React.Fragment>,
  KYC:  <React.Fragment><path d="M12 21s7-3.5 7-9V5.5L12 3 5 5.5V12c0 5.5 7 9 7 9z" /><path d="M9 12l2 2 4-4" /></React.Fragment>,
};
const HIcon = ({ tag }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--pp-acid)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>{HIW_ICON[tag]}</svg>;
const HIW_CONN = { fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 12.5, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", lineHeight: 1.45 };
const HIW_TITLE = { fontFamily: "var(--pp-font-display)", fontWeight: 700, fontSize: 20, lineHeight: 1.1, color: "var(--pp-fg)", letterSpacing: "-.01em" };
const HIW_SUB = { fontFamily: "var(--pp-font-body)", fontSize: 16, color: "var(--pp-fg-3)", lineHeight: 1.4 };
function HArrowDn({ h = 30 }) {
  return <svg width="12" height={h} viewBox={"0 0 12 " + h} fill="none" stroke="var(--pp-acid)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={"M6 1v" + (h - 7) + "M1.5 " + (h - 10) + "L6 " + (h - 5) + "l4.5-5"} /></svg>;
}
function HElbow() {
  return <svg width="26" height="34" viewBox="0 0 30 40" fill="none" stroke="var(--pp-acid)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 4 L5 14 Q5 20 11 20 L24 20" /><path d="M18 14 L25 20 L18 26" /></svg>;
}
const HSurface = (on) => ({
  border: "1px solid " + (on ? "rgba(204,255,0,.5)" : "rgba(255,255,255,.12)"),
  borderRadius: 12,
  background: on ? "linear-gradient(155deg, rgba(204,255,0,.12), rgba(204,255,0,.02) 60%)" : "rgba(255,255,255,.06)",
  backdropFilter: "blur(22px) saturate(165%)", WebkitBackdropFilter: "blur(22px) saturate(165%)",
  boxShadow: on ? "inset 0 1px 0 rgba(255,255,255,.14), 0 20px 50px -40px rgba(204,255,0,.45)" : "inset 0 1px 0 rgba(255,255,255,.10)",
});
const HStageRow = (on) => ({ ...HSurface(on), display: "flex", alignItems: "center", gap: 24, padding: "20px 28px" });
const HStageLab = (on) => ({ width: 84, flexShrink: 0, fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 13, letterSpacing: ".18em", color: on ? "var(--pp-acid)" : "var(--pp-fg-2)" });
function HConn({ label }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 0 8px 48px" }}><HArrowDn />{label && <span style={{ ...HIW_CONN, marginLeft: 63 }}>{label}</span>}</div>;
}
const HIW_PLABEL = { fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 19, letterSpacing: ".01em", color: "var(--pp-acid)" };

function HowItWorks() {
  return (
    <React.Fragment>
      <SectionHero id="how" num="05" kicker="how it works" align="left" titleMax={1240}
      parts={[{ t: "Self-custody", hi: true }, { t: " by design." }, { br: true }, { t: "Compliance by architecture." }]} />
      <Section tightTop dataLabel="05 How it works · detail">
        <Reveal variant="scale">
          <div className="hiw-b" style={{ display: "flex", flexDirection: "row-reverse", gap: 56, alignItems: "center", maxWidth: 1180, margin: 0, width: "100%" }}>
            {/* LEFT - two principles */}
            <div className="hiw-b-col" style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: 26 }}>
              <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 27, lineHeight: 1.2, letterSpacing: "-.01em", color: "var(--pp-fg)" }}>Two principles. One architecture.</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, borderTop: "1px solid #161616", paddingTop: 24 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <span style={{ ...HIW_PLABEL, fontSize: 22 }}>1 - Self-custody by design</span>
                  <p style={{ margin: 0, ...HIW_SUB, fontSize: 20, lineHeight: 1.5 }}>Customers hold their own keys via Privy - we never custody. Karta orchestrates; assets never touch our balance sheet, keeping us outside the custodial regulatory perimeter by design.</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <span style={{ ...HIW_PLABEL, fontSize: 22 }}>2 - Stablecoins in the middle</span>
                  <p style={{ margin: 0, ...HIW_SUB, fontSize: 20, lineHeight: 1.5 }}>Stablecoins are always the settlement layer. Fiat moves in and out through partners (Due, Rain, local PSPs) - we never touch fiat directly.</p>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #161616", paddingTop: 18, display: "flex", flexDirection: "column", gap: 11 }}>
                <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--pp-fg-4)", display: "inline-flex", gap: ".5em" }}>
                  <span style={{ color: "var(--pp-acid)" }}>[</span>the result<span style={{ color: "var(--pp-acid)" }}>]</span>
                </span>
                <p style={{ margin: 0, fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 25, lineHeight: 1.25, letterSpacing: "-.015em", color: "var(--pp-fg)" }}>
                  Cross-border money moves at the <span style={{ color: "var(--pp-acid)" }}>cost and speed of a domestic transfer.</span>
                </p>
              </div>
            </div>
            {/* RIGHT - architecture, wrapped in a frosted acid-glass frame */}
            <div className="hiw-b-col" style={{ flex: "1.18 1 0", minWidth: 0, position: "relative" }}>
              {/* acid glow behind the glass so the frosted surface has something to refract */}
              {/* frosted acid-glass frame */}
              <div style={{ position: "relative", zIndex: 1, borderRadius: 24, padding: "clamp(22px, 2.6vw, 34px)", background: "linear-gradient(155deg, rgba(204,255,0,0.09), rgba(204,255,0,0.02) 46%, rgba(255,255,255,0.028))", border: "1px solid rgba(204,255,0,0.34)", backdropFilter: "blur(16px) saturate(135%)", WebkitBackdropFilter: "blur(16px) saturate(135%)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 0 0 1px rgba(204,255,0,0.05), 0 30px 70px -50px rgba(204,255,0,0.30)", overflow: "hidden", display: "flex", flexDirection: "column", gap: 18 }}>
                {/* acid glow centred behind the Karta logo, clipped to the frame */}
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(42% 46% at 15% 33%, rgba(204,255,0,0.40), rgba(204,255,0,0.10) 48%, transparent 76%)", pointerEvents: "none" }} />
                {/* top sheen */}
                <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "42%", background: "linear-gradient(180deg, rgba(255,255,255,0.07), transparent)", pointerEvents: "none" }} />
                {/* frame label */}
                <span style={{ position: "relative", marginLeft: 137, fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 12.5, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", display: "inline-block" }}>Customers</span>
                <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
              <div style={HStageRow(false)}>
                <span style={{ width: 84, flexShrink: 0, alignSelf: "stretch", position: "relative" }}>
                  <img src="assets/platforms/user-full.png?v=2" alt="User" style={{ position: "absolute", left: "50%", bottom: -20, transform: "translateX(calc(-50% - 16px))", height: 72, width: "auto", display: "block", pointerEvents: "none" }} />
                </span>
                <span style={{ ...HIW_TITLE, fontWeight: 600 }}>Telegram App / Mobile App</span>
                <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 13, flexShrink: 0 }}>
                  <img src="assets/platforms/telegram-glyph.png" alt="Telegram" style={{ height: 16, width: "auto", display: "block", opacity: .9, position: "relative", top: 1 }} />
                  <img src="assets/platforms/apple.png" alt="iOS" style={{ height: 19, width: "auto", display: "block", opacity: .9, filter: "brightness(0) invert(1)" }} />
                  <img src="assets/platforms/android.svg" alt="Android" style={{ height: 20, width: "auto", display: "block", opacity: .9, position: "relative", top: 1 }} />
                </span>
              </div>
              <HConn label="karta orchestrates" />
              <div style={HStageRow(true)}>
                <span style={{ width: 84, flexShrink: 0 }}>
                  <img src="assets/karta-symbol-acid-emboss.svg" alt="Karta" style={{ display: "block", width: 50, height: 50, borderRadius: 12, boxShadow: "0 6px 16px -6px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.18)" }} />
                </span>
                <span style={{ ...HIW_TITLE, fontWeight: 700 }}>Self-Custody Wallet</span>
                <span style={{ marginLeft: "auto", flexShrink: 0 }}>
                  <img src="assets/partners/privy.svg" alt="Privy" style={{ height: 16, width: "auto", display: "block", opacity: .9 }} />
                </span>
              </div>
              <HConn label="executes via partners" />
              <div style={{ ...HSurface(false), overflow: "hidden" }}>
                {HIW_ROWS.map((r, i) =>
                  <div key={r.tag} style={{ display: "flex", alignItems: "center", gap: 20, padding: "0 26px", height: 56, borderBottom: i < HIW_ROWS.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                    <span style={{ width: 92, flexShrink: 0, display: "flex", alignItems: "center", gap: 11 }}>
                      <window.AnimatedIcon name={({ IN: "receive", OUT: "send", CARD: "spend", STBL: "earn", KYC: "store" })[r.tag]} size={18} />
                      <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 15, letterSpacing: ".06em", color: "var(--pp-acid)" }}>{r.tag}</span>
                    </span>
                    <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 700, fontSize: 16, color: "var(--pp-fg)", whiteSpace: "nowrap", letterSpacing: "-.01em" }}>{r.note}</span>
                    <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>{r.logos}</span>
                  </div>)}
              </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </React.Fragment>);
}

/* ============================================================
   07 - TRACTION (hero numbers + animated growth chart)
   ============================================================ */
/* GTV trajectory ($M): Sep '25, Dec '25, Apr '26 - drawn as a rising line */
function GrowthChart() {
  const ref = bR(null);
  const pts = [
  { label: "Sep '25", gtv: 0.86 },
  { label: "Dec '25", gtv: 5.16 },
  { label: "Apr '26", gtv: 8.56 }];

  const W = 560,H = 380,padL = 22,padR = 22,padT = 34,padB = 46;
  const bandL = 78;
  const maxV = 9;
  const n = pts.length;
  const band = (W - bandL - padR) / n;
  const barW = Math.min(124, band * 0.64);
  const cx = (i) => bandL + band * (i + 0.5);
  const yFor = (v) => padT + (1 - v / maxV) * (H - padT - padB);
  const baseY = H - padB;
  bE(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {node.querySelectorAll(".pp-bar,.pp-dot").forEach((n) => n.classList.add("in"));io.disconnect();}
    }, { threshold: 0.3 });
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ width: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <defs>
          <linearGradient id="gtvBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ccff00" stopOpacity=".92" />
            <stop offset="100%" stopColor="#ccff00" stopOpacity=".3" />
          </linearGradient>
        </defs>
        {[0, 3, 6, 9].map((g) =>
        <g key={g}>
            <line x1={padL} y1={yFor(g)} x2={W - padR} y2={yFor(g)} stroke="#161616" strokeWidth="1" />
            <text x={padL} y={yFor(g) - 7} fill="#919191" fontSize="15" fontWeight="500" fontFamily="var(--pp-font-display)">${g}M</text>
          </g>
        )}
        {pts.map((p, i) =>
        <g key={i}>
            <rect className="pp-bar" x={cx(i) - barW / 2} y={yFor(p.gtv)} width={barW} height={Math.max(0, baseY - yFor(p.gtv))} rx="8" fill="url(#gtvBar)" style={{ transformBox: "fill-box", transformOrigin: "bottom", transitionDelay: i * 0.12 + "s" }} />
            <text x={cx(i)} y={yFor(p.gtv) - 14} fill="#fafafa" fontSize="20" fontWeight="700" textAnchor="middle" fontFamily="var(--pp-font-display)">${p.gtv}M</text>
            <text x={cx(i)} y={H - 12} fill="#ababab" fontSize="15" fontWeight="500" textAnchor="middle" fontFamily="var(--pp-font-display)">{p.label}</text>
          </g>
        )}
      </svg>
    </div>);

}

const HERO_STATS = [
{ v: 30000, fmt: (n) => Math.round(n / 1000) + "K+", l: "KYC approved" },
{ v: 4926, fmt: (n) => Math.round(n).toLocaleString(), l: "Actively spending" },
{ v: 103, fmt: (n) => "$" + Math.round(n) + "M", l: "Annualized GTV run-rate" },
{ v: 4.8, fmt: (n) => "$" + n.toFixed(1) + "M", l: "Annualized revenue run-rate" }];

const TRACTION_TABLE = {
  head: ["Metric", "Sep '25", "Dec '25", "Apr '26", "7-mo"],
  rows: [
    ["Spending MAU", "890", "2,992", "4,926", "5.5×"],
    ["YES users (Spend ≥$400)", "156", "888", "1,962", "12.6×"],
    ["High spenders (≥$4K/mo)", "42", "270", "468", "11.1×"],
    ["GTV / User", "$967", "$1,726", "$1,738", "1.8×"],
    ["Annualized GTV", "$10.3M", "$61.9M", "$102.8M", "10×"],
    ["Annualized revenue", "$299K", "$1.80M", "$4.8M", "16×"],
  ],
};
const MT_COLS = "1.55fr .78fr .78fr .92fr .6fr";
function MTCell({ children, head, idx }) {
  return (
    <span style={{
      textAlign: idx === 0 ? "left" : "right",
      fontFamily: idx === 0 && !head ? "var(--pp-font-body)" : "var(--pp-font-display)",
      fontWeight: head ? 600 : idx === 0 ? 400 : idx === 4 ? 700 : 500,
      fontSize: head ? 11.5 : idx === 0 ? 13 : 14,
      letterSpacing: head ? ".08em" : "0",
      textTransform: head ? "uppercase" : "none",
      lineHeight: 1.25,
      color: head ? "var(--pp-fg-4)" : idx === 0 ? "var(--pp-fg-2)" : idx === 4 ? "var(--pp-acid)" : "var(--pp-fg)",
      fontVariantNumeric: "tabular-nums",
      whiteSpace: idx === 0 ? "normal" : "nowrap",
    }}>{children}</span>);
}
function MetricsTable() {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
      <div style={{ display: "grid", gridTemplateColumns: MT_COLS, columnGap: 10, padding: "0 0 10px", borderBottom: "1px solid #1c1c1c" }}>
        {TRACTION_TABLE.head.map((c, i) => <MTCell key={i} head idx={i}>{c}</MTCell>)}
      </div>
      {TRACTION_TABLE.rows.map((r, ri) =>
        <div key={ri} style={{ display: "grid", gridTemplateColumns: MT_COLS, columnGap: 10, alignItems: "center", padding: "10px 0", borderBottom: ri < TRACTION_TABLE.rows.length - 1 ? "1px solid #141414" : "none" }}>
          {r.map((c, i) => <MTCell key={i} idx={i}>{c}</MTCell>)}
        </div>
      )}
    </div>);
}

const TRACTION_PANELS = [
  { t: "Profitable for four straight months - and accelerating.",
    d: "Net income hit $64.6K in April 2026 (13.9% net margin), 16× March's $3.9K. Net-positive every month Jan-Apr 2026.",
    imp: "We scale marketing by choice, not necessity." },
  { t: "Premium product-market fit, proven with zero marketing.",
    d: "164 Metal LED + 557 plastic cards pre-sold - $79K pre-revenue in fees, fully organic.",
    imp: "Real brand pull at the premium tier, before a dollar of acquisition." },
  { t: "4× the spend depth of our nearest comparable.",
    d: "$22K yearly GTV per spending user vs. ~$5K at KAST ($5B yearly GTV / 1M users).",
    imp: "High-intent crypto spenders with genuine transaction depth." },
  { t: "A multi-revenue platform, not a single-interchange play.",
    d: "April 2026 mix: Card 83.9% · FX & Payments 3.4% · Crypto on/off-ramp 9.1% · Account & Platform 7%.",
    imp: "Four independent revenue lines, not one fee stream. With more to go." },
  { t: "2.9× revenue growth year over year.",
    d: "$159K (Apr 2025) → $464K (Apr 2026); +18.8% MoM Mar → Apr.",
    imp: "" },
  { t: "PMF concentrated in high-value crypto spenders.",
    d: "High spenders (>$4K/mo) are 9.4% of MAU but drive 73.2% of GTV - ~$14.1K monthly GTV per high-spender.",
    imp: "" },
  { t: "Self-funded since inception. Four consecutive profitable months, accelerating.",
    d: "",
    imp: "" },
];
function CarBtn({ dir, onClick }) {
  return (
    <button onClick={onClick} aria-label={dir < 0 ? "Previous" : "Next"}
      className="pp-pill-btn pp-pill-btn--icon">
      <svg className="ic" viewBox="0 0 24 24" fill="none" style={{ transform: dir < 0 ? "scaleX(-1)" : "none" }}>
        <path d="M4 12h13M12.5 6l6 6-6 6" stroke="#fafafa" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>);
}
function TractionCarousel() {
  const ref = bR(null);
  const PANELS = TRACTION_PANELS;
  const [active, setActive] = bS(0);
  const activeRef = bR(0);
  const pausedRef = bR(false);
  const n = PANELS.length;
  const setIdx = (i) => { activeRef.current = i; setActive(i); };
  const goTo = (i, smooth = true) => {
    const el = ref.current; if (!el) return;
    const idx = ((i % n) + n) % n;
    const child = el.children[idx]; if (!child) return;
    const delta = child.getBoundingClientRect().left - el.getBoundingClientRect().left;
    el.scrollBy({ left: delta, behavior: smooth ? "smooth" : "auto" });
    setIdx(idx);
  };
  bE(() => {
    const id = setInterval(() => { if (!pausedRef.current) goTo(activeRef.current + 1); }, 2000);
    return () => clearInterval(id);
  }, []);
  const onScroll = () => {
    const el = ref.current; if (!el) return;
    const cl = el.getBoundingClientRect().left;
    let best = 0, bestD = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs(c.getBoundingClientRect().left - cl);
      if (d < bestD) { bestD = d; best = i; }
    });
    if (best !== activeRef.current) setIdx(best);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}
      onMouseEnter={() => pausedRef.current = true} onMouseLeave={() => pausedRef.current = false}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
          <h3 className="pp-h3" style={{ margin: 0, fontSize: 22 }}>Proof points</h3>
          <div style={{ display: "flex", gap: 16 }}>
            {PANELS.map((_, i) =>
              <button key={i} onClick={() => goTo(i)} aria-label={`Go to proof ${i + 1}`}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0,
                  color: i === active ? "var(--pp-acid)" : "var(--pp-fg-4)",
                  fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 15, fontVariantNumeric: "tabular-nums",
                  transition: "color .2s" }}
                onMouseEnter={(e) => { if (i !== active) e.currentTarget.style.color = "var(--pp-fg-2)"; }}
                onMouseLeave={(e) => { if (i !== active) e.currentTarget.style.color = "var(--pp-fg-4)"; }}>
                {i + 1}
              </button>)}
          </div>
        </div>
        <div style={{ display: "flex", gap: 9 }}><CarBtn dir={-1} onClick={() => goTo(activeRef.current - 1)} /><CarBtn dir={1} onClick={() => goTo(activeRef.current + 1)} /></div>
      </div>
      <div style={{ overflow: "hidden" }}>
        <div ref={ref} onScroll={onScroll} style={{ display: "flex", gap: 18, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 22, marginBottom: -22, scrollbarWidth: "none" }}>
          {PANELS.map((p, i) =>
            <div key={i} style={{ scrollSnapAlign: "start", flex: "0 0 clamp(280px, 84%, 660px)", background: "var(--pp-card)", border: "1px solid var(--pp-line)", borderRadius: 12, padding: "clamp(22px, 5vw, 36px)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 22, minHeight: 320 }}>
              <span style={{ position: "absolute", top: -28, right: 8, fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800, 'wdth' 125", fontSize: 200, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px #1c1c1c", pointerEvents: "none", userSelect: "none", fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="pp-h3" style={{ margin: 0, fontSize: i === 6 ? "clamp(26px, 7.5vw, 45px)" : "clamp(22px, 6.5vw, 30px)", color: "var(--pp-acid)", lineHeight: 1.15, maxWidth: i === 6 ? 560 : 416, position: "relative" }}>
                {i === 6
                  ? <React.Fragment>Self-funded since inception. <span style={{ color: "var(--pp-fg)" }}>Four consecutive profitable months, accelerating.</span></React.Fragment>
                  : p.t}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative", maxWidth: 540 }}>
                {p.d && <p className="pp-body" style={{ margin: 0, fontSize: 16 }}>{p.d}</p>}
                {p.imp &&
                  <p className="pp-body" style={{ margin: 0, fontSize: 14.5, color: "var(--pp-fg-3)", display: "flex", gap: 9 }}>
                    <span style={{ color: "var(--pp-acid)", flex: "0 0 auto", fontWeight: 600 }}>→</span><span>{p.imp}</span>
                  </p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);
}

function Traction() {
  return (
    <React.Fragment>
      <SectionHero id="traction" num="04" kicker="traction" align="left"
      parts={[{ t: "Profitable and " }, { t: "growing", hi: true }, { t: " every month." }]} />
      <Section tightTop dataLabel="06 Traction · detail">

      {/* hero numbers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }} className="grid-4">
        {HERO_STATS.map((s, i) =>
          <Reveal key={s.l} delay={i * 0.08}>
            <div style={{ borderTop: "2px solid var(--pp-acid)", paddingTop: 18, display: "flex", flexDirection: "column", gap: 6 }}>
              <span className="pp-stat" style={{ fontSize: 50, lineHeight: 1 }}><CountUp to={s.v} format={s.fmt} dur={1600} /></span>
              <span className="pp-caption">{s.l}</span>
            </div>
          </Reveal>
          )}
      </div>

      {/* metrics table + Monthly GTV (bars) */}
      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 18, alignItems: "stretch" }} className="trac-grid">
        <Reveal variant="left">
          <HCard style={{ gap: 16, height: "100%", minHeight: 440 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="pp-h3" style={{ fontSize: 20 }}>Key metrics</span>
              <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 700, color: "var(--pp-acid)", fontSize: 15 }}>Sep '25 → Apr '26 (7 months)</span>
            </div>
            <MetricsTable />
          </HCard>
        </Reveal>
        <Reveal variant="right" delay={0.08}>
          <HCard style={{ gap: 18, height: "100%", minHeight: 440, justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h3 className="pp-h3" style={{ margin: 0, fontSize: 20 }}>Monthly GTV</h3>
              <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 700, color: "var(--pp-acid)", fontSize: 15 }}>10× in 7 months</span>
            </div>
            <GrowthChart />
          </HCard>
        </Reveal>
      </div>

      {/* proof points carousel */}
      <Reveal><TractionCarousel /></Reveal>

      <Reveal>
        <p className="pp-caption" style={{ margin: 0, textAlign: "center" }}>
          Data as of April 2026 · raising seed to scale validated acquisition channels.
        </p>
      </Reveal>
    </Section>
    </React.Fragment>);

}

/* ============================================================
   05b - SOLUTION (hand-phone variant) - real hand photo with the
   screen cut to transparency; app screens swap underneath as the
   capability rows are selected. Pinned flush to the right edge.
   ============================================================ */
/* Each capability maps to one or more 987×1203 screen PNGs. Multiple → auto-swipe carousel. */
const CAP_HAND_SCREENS = {
  Store: ["assets/screen-store.webp"],
  Receive: ["assets/recieve-main.webp", "assets/recieve-usd.webp", "assets/recieve-usdt.webp"],
  Spend: ["assets/screen-spend.png"],
  Send: ["assets/screen-send.png", "assets/screen-send-contact.png"],
  Earn: ["assets/screen-earn.png"]
};
function SolutionHand() {
  const [active, setActive] = bS(0);
  const capKey = CAPS[active].t;
  const screens = CAP_HAND_SCREENS[capKey] || ["assets/screen-1.webp"];
  return (
    <React.Fragment>
      <SectionHero id="solution" num="04" kicker="solution" align="left"
      parts={[{ t: "Karta - " }, { t: "one wallet for every payment", hi: true }, { t: ", anywhere." }]}
      lead="Stablecoins as the spine, familiar UX on top. Five money jobs, one app - the user never has to know it's crypto." />
      {/* full-width detail section so the photo can pin to the viewport's right edge */}
      <section id="solution-hand-detail" data-screen-label="04 Solution (hand) · detail"
      style={{ position: "relative", zIndex: 1, background: "var(--pp-page)", padding: "56px 0 120px", overflow: "hidden", minHeight: "calc(90vh + 120px)", display: "flex", alignItems: "center" }}>
        {/* hand-phone with swappable screen - pinned to the right edge, vertically centered */}
        <div className="hand-pin" style={{ position: "absolute", top: "50%", right: "-3%", transform: "translateY(-50%)", zIndex: 0, pointerEvents: "none" }}>
          <HandScreen screens={screens} vh={90} />
        </div>
        {/* content column, left-aligned to the deck grid */}
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, width: "100%" }}>
          <div className="hand-col" style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CAPS.map((c, i) =>
              <CapRow key={c.t} c={c} i={i} active={active === i} onSelect={() => setActive(i)} />
              )}
            </div>
            <Reveal delay={0.05}>
              <div style={{ borderTop: "1px solid var(--pp-line)", paddingTop: 16 }}>
                <p className="pp-body" style={{ margin: 0, fontSize: 14 }}>
                  300+ pre-sold at up to <span style={{ color: "var(--pp-fg)" }}>$300/card</span> · <span style={{ color: "var(--pp-acid)" }}>$90K+ pre-revenue</span>, zero marketing.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </React.Fragment>);

}

/* ============================================================
   05c - SOLUTION (hand-phone variant V2) - large title-only buttons
   in a narrow column; the selected row reveals its description to the
   RIGHT of the buttons, then the phone. Layout: buttons · text · phone.
   ============================================================ */
function CapButtonLg({ c, i, active, onSelect, duration, paused }) {
  const [hov, setHov] = bS(false);
  const live = c.tag === "live";
  return (
    <button onClick={onSelect} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    aria-pressed={active}
    style={{ width: "100%", textAlign: "left", cursor: "pointer", font: "inherit",
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", gap: "clamp(12px,1vw,16px)",
      padding: "clamp(10px,1.5vh,16px) clamp(15px,1.2vw,20px)", borderRadius: 8,
      background: active ? "var(--pp-acid)" : "var(--pp-card)",
      color: active ? "#030303" : "var(--pp-fg)",
      border: "1px solid " + (active ? "var(--pp-acid)" : hov ? "rgba(255,255,255,.22)" : "var(--pp-line)"),
      transition: "background .3s ease, border-color .3s ease, color .3s ease" }}>
      <span style={{ flex: "0 0 auto", width: "clamp(34px,4vh,42px)", height: "clamp(34px,4vh,42px)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8,
        background: active ? "#0b0b0b" : "var(--pp-surface-2)", border: "1px solid " + (active ? "rgba(3,3,3,.4)" : "var(--pp-line)") }}>
        <AnimatedIcon name={CAP_ICONS[i]} play={hov || active} size={20} />
      </span>
      <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontSize: "clamp(19px,2.3vh,26px)", letterSpacing: "-.02em" }}>{c.t}</span>
      <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "clamp(8px,0.7vw,12px)" }}>
        <span style={{ fontSize: "clamp(9px,1vh,11px)", letterSpacing: ".06em", textTransform: "uppercase", fontFamily: "var(--pp-font-display)", fontWeight: 600, padding: "3px 9px", borderRadius: 100,
          background: active ? "rgba(3,3,3,.12)" : live ? "rgba(204,255,0,.14)" : "var(--pp-control)",
          color: active ? "#030303" : live ? "var(--pp-acid)" : "var(--pp-fg-3)" }}>{live ? "Live" : "Roadmap"}</span>
        <span style={{ fontSize: 18, lineHeight: 1, opacity: active ? 1 : hov ? .6 : .3, transition: "opacity .3s" }}>→</span>
      </span>
      {active && duration > 0 && (
        <span key={duration} className="cap-progress" aria-hidden="true" style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: 2,
          background: "rgba(3,3,3,.85)", transformOrigin: "left",
          transform: "scaleX(0)",
          animation: `capProgressFill ${duration}ms linear forwards`,
          animationPlayState: paused ? "paused" : "running",
          pointerEvents: "none",
        }} />
      )}
    </button>);

}
/* HandScreen carousel interval (ms) — must mirror the default in <HandScreen> */
const HAND_SCREEN_INTERVAL = 4000;
/* Single-screen caps still get a base dwell so they don't feel rushed */
const SINGLE_SCREEN_DWELL = 5000;
/* After a user click, hold the active cap at least this long before auto-advancing */
const POST_CLICK_HOLD = 9000;

function SolutionHandV2() {
  const [active, setActive] = bS(0);
  const c = CAPS[active];
  const capKey = c.t;
  const screens = CAP_HAND_SCREENS[capKey] || ["assets/screen-1.webp"];
  const solDivRef = React.useRef(null), solCardRef = React.useRef(null), solNumRef = React.useRef(null);
  const solGhostRef = useReveal({ threshold: 0.2 });
  const [handIn, setHandIn] = bS(false);
  const handObsRef = React.useRef(null);
  /* mobile-only layout when viewport ≤900px — initialize synchronously to avoid double-render */
  const [isMobile, setIsMobile] = bS(() => typeof matchMedia !== "undefined" && matchMedia("(max-width: 900px)").matches);
  bE(() => {
    const mq = matchMedia("(max-width: 900px)");
    const u = () => setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", u); else mq.addListener(u);
    return () => { if (mq.removeEventListener) mq.removeEventListener("change", u); else mq.removeListener(u); };
  }, []);

  /* auto-cycle through CAPS — wait for the current cap's internal screen carousel
     to finish one full loop before advancing. Pauses on hover, in-view-only,
     respects reduced-motion, and post-click hold gives the user time to read. */
  const [hovered, setHovered] = bS(false);
  const [inView, setInView] = bS(false);
  const pausedUntil = React.useRef(0);
  const cycleObsRef = React.useRef(null);
  bE(() => {
    const node = cycleObsRef.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(node);
    return () => io.disconnect();
  }, []);
  bE(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!inView || hovered) return;
    const n = (CAP_HAND_SCREENS[CAPS[active].t] || []).length || 1;
    const baseDuration = n > 1 ? n * HAND_SCREEN_INTERVAL : SINGLE_SCREEN_DWELL;
    const heldRemaining = pausedUntil.current - Date.now();
    const duration = Math.max(baseDuration, heldRemaining);
    const id = setTimeout(() => setActive((p) => (p + 1) % CAPS.length), duration);
    return () => clearTimeout(id);
  }, [active, hovered, inView]);
  const selectCap = (i) => { pausedUntil.current = Date.now() + POST_CLICK_HOLD; setActive(i); };
  bE(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setHandIn(true); return; }
    let raf = 0, done = false;
    const check = () => {
      if (done) return;
      const node = handObsRef.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85 && r.bottom > 0) { done = true; setHandIn(true); window.removeEventListener("scroll", onScroll); }
    };
    const onScroll = () => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; check(); }); };
    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  useSectionRecede(solCardRef, solDivRef, solNumRef);

  /* ─── Mobile layout (≤900px) — vertical stack, no sticky divider ─── */
  if (isMobile) {
    const mobN = (CAP_HAND_SCREENS[capKey] || []).length || 1;
    const mobBase = mobN > 1 ? mobN * HAND_SCREEN_INTERVAL : SINGLE_SCREEN_DWELL;
    const mobHeld = pausedUntil.current - Date.now();
    const mobDuration = inView && !hovered ? Math.max(mobBase, mobHeld) : 0;
    return (
      <section id="solution" data-screen-label="04 Solution · mobile" style={{
        position: "relative", background: "radial-gradient(120% 80% at 50% 100%, rgba(204,255,0,.18), rgba(204,255,0,.04) 40%, transparent 70%), var(--pp-page)",
        padding: "72px 20px 56px", display: "flex", flexDirection: "column", gap: 28,
      }}>
        {/* header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ display: "inline-flex", alignItems: "baseline", gap: ".55em", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 13, letterSpacing: ".04em", textTransform: "capitalize", color: "var(--pp-fg-3)" }}>
            <span style={{ color: "var(--pp-acid)", letterSpacing: 0 }}>[ 04 ]</span>solution
          </span>
          <h2 style={{ margin: 0, fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontSize: "clamp(34px, 9vw, 52px)", lineHeight: 1.04, letterSpacing: "-.03em", color: "var(--pp-fg)" }}>
            Karta - One Wallet,<br /><span style={{ color: "var(--pp-acid)" }}>For Every Move.</span>
          </h2>
          <p style={{ margin: 0, fontFamily: "var(--pp-font-body)", fontSize: 16, lineHeight: 1.5, color: "var(--pp-fg-2)" }}>
            Stablecoins as the spine, familiar UX on top. Five money jobs, one app - the user never has to know it's crypto.
          </p>
        </div>
        {/* phone-mockup — centered, in normal flow */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px 0" }}>
          <div style={{ width: "100%", maxWidth: 320, transform: "translateY(0)" }}>
            <HandScreen screens={screens} vh={56} />
          </div>
        </div>
        {/* capability buttons — full-width vertical stack */}
        <div ref={cycleObsRef}
             onTouchStart={() => setHovered(true)} onTouchEnd={() => setTimeout(() => setHovered(false), 200)}
             style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {CAPS.map((cap, i) =>
            <CapButtonLg key={cap.t} c={cap} i={i} active={active === i} onSelect={() => selectCap(i)}
              duration={active === i ? mobDuration : 0} paused={hovered} />
          )}
        </div>
        {/* active description */}
        <div key={capKey} className="hand-screen-fade" style={{ display: "flex", flexDirection: "column", gap: 10, borderTop: "1px solid var(--pp-line)", paddingTop: 18 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", fontFamily: "var(--pp-font-display)", fontWeight: 600, color: c.tag === "live" ? "var(--pp-acid)" : "var(--pp-fg-3)" }}>
            <span style={{ width: 18, height: 1, background: "currentColor", display: "inline-block" }} />{c.tag === "live" ? "Live" : "Roadmap"}
          </span>
          <p style={{ margin: 0, fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 17, lineHeight: 1.4, letterSpacing: "-.01em", color: "var(--pp-fg)", textWrap: "pretty" }}>{c.d}</p>
        </div>
      </section>
    );
  }

  return (
    <React.Fragment>
      {/* sticky divider - the big "solution" word (consistent with other sections) */}
      <section id="solution" data-screen-label="04 Solution" ref={solDivRef} style={{
        position: "sticky", top: 0, zIndex: 0, height: "88vh", minHeight: 640, overflow: "hidden",
        background: "var(--pp-page)",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <div ref={solCardRef} style={{
          position: "absolute", inset: 0, overflow: "hidden",
          background: "radial-gradient(125% 95% at 50% 118%, rgba(204,255,0,.6), rgba(204,255,0,.28) 40%, rgba(204,255,0,.07) 64%, transparent 82%), var(--pp-page)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transformOrigin: "50% 0%", willChange: "transform, opacity"
        }}>
          <div ref={solNumRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", willChange: "transform" }}>
            <span ref={solGhostRef} aria-hidden="true" className="pp-ghostnum sec-num"
            style={{ top: "7%", right: "3%", left: "auto", WebkitTextStroke: "1.5px #262626", fontSize: "clamp(190px,27vw,360px)" }}>04</span>
          </div>
          <StaggerTitle parts={[{ t: "solution" }]} base={0.12} step={0.05} className="pp-h1"
          style={{ position: "relative", zIndex: 1, fontSize: "clamp(48px,8vw,112px)", lineHeight: 1.0, letterSpacing: "-.035em", textTransform: "capitalize", maxWidth: 1440, textAlign: "center", padding: "0 24px" }} />
        </div>
      </section>
      {/* content slide - narrow title + buttons + phone, all risen to the top */}
      <section id="solution-detail" data-screen-label="04 Solution · detail"
      style={{ position: "relative", zIndex: 1, background: "var(--pp-page)", height: "100dvh", minHeight: 600, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* hand-phone pinned right, sized to fit the viewport height */}
      <div className="hand-pin" style={{ position: "absolute", top: "50%", right: "-3%", transform: "translateY(-50%)", zIndex: 0, pointerEvents: "none" }}>
        <div ref={handObsRef} style={{
          transformOrigin: "55% 60%", willChange: "transform, opacity, filter",
          transition: "transform 1.3s cubic-bezier(.2,.62,.32,1), opacity 1.1s ease, filter 1.2s ease",
          opacity: handIn ? 1 : 0,
          transform: handIn ? "translateX(0) rotate(0deg)" : "translateX(34%) rotate(25deg)",
          filter: handIn ? "brightness(1)" : "brightness(0.25)",
        }}>
          <HandScreen screens={screens} vh={84} />
        </div>
      </div>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "clamp(40px,8vh,96px) 24px clamp(20px,4vh,48px)", position: "relative", zIndex: 1, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "clamp(24px,4vh,44px)" }}>
        {/* narrow header - capped width so it clears the phone */}
        <div style={{ flex: "0 0 auto", maxWidth: 760, display: "flex", flexDirection: "column", gap: "clamp(8px,1.3vh,14px)" }}>
          <span style={{ display: "inline-flex", alignItems: "baseline", gap: ".55em", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 14, letterSpacing: ".04em", textTransform: "capitalize", color: "var(--pp-fg-3)" }}>
            <span style={{ color: "var(--pp-acid)", letterSpacing: 0 }}>[ 04 ]</span>solution
          </span>
          <h2 style={{ margin: 0, fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontSize: "clamp(40px,6.2vh,72px)", lineHeight: 1.04, letterSpacing: "-.03em", color: "var(--pp-fg)", whiteSpace: "nowrap" }}>
            Karta - One Wallet,<br /><span style={{ color: "var(--pp-acid)" }}>For Every Move.</span>
          </h2>
          <p style={{ margin: 0, maxWidth: 580, fontFamily: "var(--pp-font-body)", fontSize: "clamp(17px,2.3vh,24px)", lineHeight: 1.5, color: "var(--pp-fg-2)" }}>Stablecoins as the spine, familiar UX on top.<br />Five money jobs, one app - the user never has to know it's crypto.</p>
        </div>
        {/* buttons · description */}
        <div className="solv2-row" style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "clamp(22px,2.6vw,44px)" }}>
          {/* title-only buttons with icon — auto-cycles, pauses on hover/click */}
          <div ref={cycleObsRef}
               onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
               style={{ flex: "0 0 clamp(240px,24vw,330px)", maxWidth: 330, display: "flex", flexDirection: "column", gap: "clamp(8px,1.1vh,11px)" }}>
            {(() => {
              const n = (CAP_HAND_SCREENS[CAPS[active].t] || []).length || 1;
              const baseDuration = n > 1 ? n * HAND_SCREEN_INTERVAL : SINGLE_SCREEN_DWELL;
              const heldRemaining = pausedUntil.current - Date.now();
              const activeDuration = inView && !hovered ? Math.max(baseDuration, heldRemaining) : 0;
              return CAPS.map((cap, i) =>
                <CapButtonLg key={cap.t} c={cap} i={i} active={active === i} onSelect={() => selectCap(i)}
                  duration={active === i ? activeDuration : 0} paused={hovered} />
              );
            })()}
          </div>
          {/* active description, to the right of the buttons */}
          <div style={{ flex: "1 1 0", maxWidth: 340, minWidth: 0 }}>
            <div key={capKey} className="hand-screen-fade" style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.5vh,14px)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", fontFamily: "var(--pp-font-display)", fontWeight: 600, color: c.tag === "live" ? "var(--pp-acid)" : "var(--pp-fg-3)" }}>
                <span style={{ width: 18, height: 1, background: "currentColor", display: "inline-block" }} />{c.tag === "live" ? "Live" : "Roadmap"}
              </span>
              <p style={{ margin: 0, fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: "clamp(17px,2.1vh,24px)", lineHeight: 1.4, letterSpacing: "-.01em", color: "var(--pp-fg)", textWrap: "pretty" }}>{c.d}</p>
            </div>
          </div>
        </div>
      </div>
      </section>
    </React.Fragment>);

}

Object.assign(window, { Solution, SolutionHand, SolutionHandV2, HowItWorks, Traction });