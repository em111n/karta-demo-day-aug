/* Karta - Investor Deck · sections 8-12: Market, Vision, Team, Roadmap, Ask + Footer */
const { useState: cS, useEffect: cE, useRef: cR } = React;

/* 08 - MARKET lives in market-section.jsx (ported bento layout) */

/* ============================================================
   08 - VISION
   ============================================================ */
const HORIZONS = [
  { y: "5",  unit: "years", tagline: "Near term",
    t: "Primary financial home for 10M+ borderless people.",
    d: "The default place where global income lands, gets spent globally, sent globally, and earns yield natively.",
    tag: "A neobank-scale business on stablecoin rails." },
  { y: "10", unit: "years", tagline: "Infrastructure",
    t: "Stablecoins become the infrastructure of money.",
    d: "Like TCP/IP for the internet - invisible, universal, default.",
    tag: "Karta is one of the consumer interfaces that won that transition." },
  { y: "∞",  unit: "bigger bet", tagline: "The worldview",
    t: "Borderless living isn't a niche - it's where the world is going.",
    d: "Remote work. Creator economy. Global teams. Distributed families. The financial system has to adapt.",
    tag: "We're building it.", acid: true },
];
/* crescendo card - big top-pinned ghost number (+ gray "years" to its right) */
function CCard({ h, half }) {
  const fd = "var(--pp-font-display)";
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 12, border: `1px solid ${h.acid ? "rgba(204,255,0,.28)" : "var(--pp-line)"}`, padding: "clamp(24px,2.6vw,38px)", height: "100%", minHeight: "clamp(200px,19vw,264px)", display: "flex", flexDirection: "column", justifyContent: "center",
      background: h.acid ? "radial-gradient(120% 130% at 88% 50%, rgba(204,255,0,.14), transparent 60%), var(--pp-card)" : "var(--pp-card)" }}>
      <div aria-hidden="true" style={{ position: "absolute", right: half ? "clamp(-2px,.6vw,14px)" : "clamp(-4px,1vw,22px)", top: half ? "clamp(-14px,-1.2vw,0px)" : "50%", transform: half ? "none" : "translateY(-50%)", display: "flex", flexDirection: "row", alignItems: "flex-end", gap: "0.06em", lineHeight: 0.8, pointerEvents: "none", userSelect: "none" }}>
        <span style={{ fontFamily: fd, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: half ? "clamp(120px,15vw,200px)" : "clamp(116px,15vw,224px)", lineHeight: 0.78, letterSpacing: "-.04em", color: "transparent", WebkitTextStroke: `1.4px ${h.acid ? "rgba(204,255,0,.5)" : "#1f1f1f"}` }}>{h.y}</span>
        {h.y !== "∞" && <span style={{ fontFamily: fd, fontWeight: 600, fontStretch: "125%", fontVariationSettings: "'wght' 600,'wdth' 125", fontSize: half ? "clamp(15px,1.7vw,26px)" : "clamp(22px,2.6vw,40px)", letterSpacing: ".02em", marginBottom: "0.22em", color: "rgba(255,255,255,.1)" }}>years</span>}
      </div>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 11, maxWidth: half ? "none" : 720, paddingRight: half ? "clamp(96px,14vw,250px)" : 0 }}>
        <span style={{ fontFamily: fd, fontWeight: 600, fontSize: 12.5, letterSpacing: ".16em", textTransform: "uppercase", color: h.acid ? "var(--pp-acid)" : "var(--pp-fg-4)" }}>{h.tagline} · {h.unit === "bigger bet" ? "the long bet" : h.y + " " + h.unit}</span>
        <h3 style={{ margin: 0, fontFamily: fd, fontWeight: 700, fontStretch: "125%", fontSize: "clamp(22px,2.6vw,34px)", lineHeight: 1.16, letterSpacing: "-.025em", color: "var(--pp-fg)" }}>{h.t}</h3>
        <p className="pp-body" style={{ margin: 0, fontSize: 15, maxWidth: 580 }}>{h.d}</p>
        <span style={{ fontFamily: fd, fontWeight: 600, fontSize: 15.5, color: h.acid ? "var(--pp-acid)" : "var(--pp-fg-2)" }}>{h.tag}</span>
      </div>
    </div>);
}
function Vision() {
  return (
    <React.Fragment>
      <SectionHero
        id="vision" num="08" kicker="vision" align="left" glow
        parts={[
          { t: "Karta becomes the default " },
          { t: "financial home", hi: true },
          { t: " for a whole generation." },
        ]}
        lead="The generation that doesn't fit one country anymore." />
      <Section tightTop dataLabel="08 Vision · detail">
        {/* 5y + 10y side by side, ∞ full-width below */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch" }}>
            <Reveal variant="scale" style={{ height: "100%" }}><CCard h={HORIZONS[0]} half /></Reveal>
            <Reveal variant="scale" delay={0.07} style={{ height: "100%" }}><CCard h={HORIZONS[1]} half /></Reveal>
          </div>
          <Reveal variant="scale" delay={0.12}><CCard h={HORIZONS[2]} /></Reveal>
        </div>

        <Reveal>
          <div style={{ borderTop: "1px solid var(--pp-line)", paddingTop: "clamp(40px,5vw,64px)", display: "flex", justifyContent: "center" }}>
            <p style={{ margin: 0, maxWidth: 900, textAlign: "center", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(22px,2.8vw,36px)", lineHeight: 1.3, letterSpacing: "-.01em", color: "var(--pp-fg)" }}>
              We're not betting on crypto. We're betting on <span style={{ color: "var(--pp-acid)" }}>people who don't fit into one country anymore.</span>
            </p>
          </div>
        </Reveal>
      </Section>
    </React.Fragment>
  );
}

/* ============================================================
   10 - TEAM
   ============================================================ */
const LINE = "var(--pp-line)";
const AVATAR = "assets/user-avatar.png";

const HEADCOUNT = [
  ["Engineering", "13 (13.5 FTE)", "[FILL: validated with CTO]"],
  ["Product & Discovery", "3", "[FILL]"],
  ["Marketing", "9 (~7.5 FTE)", "~27 FTE (per roadmap)"],
  ["Compliance / Risk", "onboarding", "[FILL]"],
  ["Business / Ops", "~10 (Finance, Ops, Support, HR)", "[FILL]"],
];
const HEADCOUNT_TOTAL = ["Total", "~35+", "~57+ (per hiring plan)"];
const OPEN_ROLE_GROUPS = [
  { name: "AI", count: 8, accent: true,
    roles: "Head of AI Infrastructure · AI Engineers · ML Engineer · SecDevOps · AI Compliance · AI Backend · Data Engineer" },
  { name: "Product", count: 4,
    roles: "Mobile (iOS / Android) · Backend · Design" },
  { name: "Marketing", count: 19,
    roles: "Performance · Brand · Content · Growth - Q2 2026 → Q1 2027" },
];
const OPEN_ROLES_TOTAL = OPEN_ROLE_GROUPS.reduce((a, g) => a + g.count, 0);
/* render a headcount cell - [FILL...] placeholders show dimmed */
function Cell({ v, head, total }) {
  const fill = typeof v === "string" && v.indexOf("[FILL") === 0;
  return <span style={{ fontFamily: total ? FD : FB, fontWeight: total ? 700 : 400, fontSize: head ? 11 : 13.5, letterSpacing: head ? ".14em" : 0, textTransform: head ? "uppercase" : "none", color: head ? FG4 : (fill ? "#4a4a4a" : (total ? FG : FG2)), fontStyle: fill ? "italic" : "normal" }}>{v}</span>;
}
function HeadcountTable() {
  const cols = "minmax(0,1.2fr) minmax(0,1.4fr) minmax(0,1.4fr)";
  return (
    <div style={{ border: `1px solid ${LINE}`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 18, padding: "13px 20px", borderBottom: `1px solid ${LINE}`, background: "#0c0c0c" }}>
        {["Function", "Now", "EOY 2026 plan"].map((h, i) => <Cell key={i} v={h} head />)}
      </div>
      {HEADCOUNT.map((r, ri) => (
        <div key={ri} style={{ display: "grid", gridTemplateColumns: cols, gap: 18, padding: "13px 20px", borderBottom: `1px solid #141414`, alignItems: "center" }}>
          {r.map((c, ci) => <Cell key={ci} v={c} />)}
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 18, padding: "15px 20px", alignItems: "center", background: "linear-gradient(90deg, rgba(204,255,0,.06), transparent 70%)" }}>
        {HEADCOUNT_TOTAL.map((c, ci) => <Cell key={ci} v={c} total />)}
      </div>
    </div>);
}
function OpenRoles() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {OPEN_ROLE_GROUPS.map((g) => (
        <div key={g.name} style={{ display: "flex", flexDirection: "column", gap: 8, padding: "14px 16px", borderRadius: 12, border: `1px solid ${g.accent ? "rgba(204,255,0,.28)" : "var(--pp-line)"}`, background: g.accent ? "linear-gradient(155deg, rgba(204,255,0,.07), rgba(204,255,0,.015) 60%)" : "var(--pp-surface-2)" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
            <span style={{ fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontSize: 17, letterSpacing: "-.01em", color: g.accent ? ACID : FG }}>{g.name}</span>
            <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontSize: 22, color: g.accent ? ACID : FG }}>{g.count}<span style={{ fontSize: 12, fontWeight: 500, color: FG4, marginLeft: 4 }}>open</span></span>
          </div>
          <p style={{ margin: 0, fontFamily: FB, fontSize: 13, lineHeight: 1.45, color: FG3 }}>{g.roles}</p>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingTop: 8, borderTop: "1px solid var(--pp-line)" }}>
        <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: FG4 }}>Total seed-funded hires</span>
        <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontSize: 20, color: FG }}>{OPEN_ROLES_TOTAL}</span>
      </div>
    </div>);
}

const PEOPLE = [
  { name: "Nik Zimarkov", role: "Founder & CEO", initials: "NZ", li: "https://www.linkedin.com",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    short: "Serial entrepreneur since 2013. Co-founded SWIPE (Thailand) - scaled the team 20→100, $1M revenue in two months. Founded Karta in 2021.",
    bio: "Serial entrepreneur since 2013. Co-founded SWIPE (Thailand) - raised seed from FRII, scaled the team 20→100, $1M revenue in two months. Led business development at DataLead managing $0.5M+ enterprise accounts. Founded Karta in 2021 to build stablecoin-native payment infrastructure for borderless people." },
  { name: "Ron Lieberman", role: "Co-Founder", initials: "RL", li: "https://www.linkedin.com",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    short: "Venture builder & serial entrepreneur. Co-founded Karta in 2022. Built Kometa.Black and Raketa.Fit; Managing Partner at Boson Kicks.",
    bio: "Venture builder and serial entrepreneur. Co-founded Karta in July 2022. Previously founded and scaled Kometa.Black - a concept fitness and social club that became a category icon in Moscow. CEO of Raketa.Fit. Managing Partner at Boson Kicks - a VC and acceleration fund focused on IT, e-commerce and SaaS. Board Member at Cosmic Solutions OÜ (Estonia)." },
  { name: "Matvey Aliev", role: "Co-Founder & CTO", initials: "MA", li: "https://www.linkedin.com",
    photo: "https://randomuser.me/api/portraits/men/41.jpg",
    short: "Engineer & AI systems builder. 120× gains at Haute Coupure; launched Supastore solo. Owns Karta's AI-agent architecture.",
    bio: "Engineer and AI systems builder. Built algorithmic financial-strategy systems at Haute Coupure - 120× performance gains, 3rd place in U.S. Financial Competitions (2023). Founded and launched Supastore solo (full-stack e-commerce, 2024). At Karta, defined the end-to-end AI-agent architecture and shipped the first production finance assistant with stateful memory and compliance guardrails." },
];

/* circular avatar with initials fallback */
function Avatar({ p, size }) {
  return (
    <div style={{ position: "relative", flex: "none", width: size, height: size, borderRadius: "50%", overflow: "hidden", background: "linear-gradient(150deg,#161616,#0c0c0c)", border: `1px solid ${LINE}` }}>
      <img src={AVATAR} alt={p.name} draggable={false} loading="lazy"
        onError={(e) => { e.target.style.display = "none"; }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", transform: "scale(0.84)" }} />
    </div>);
}
function LinkedIn({ href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", fontFamily: FD, fontWeight: 600, fontSize: 12.5, letterSpacing: ".02em", color: FG3, transition: "color .2s" }}
      onMouseEnter={(e) => { e.currentTarget.style.color = ACID; }} onMouseLeave={(e) => { e.currentTarget.style.color = FG3; }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 23, height: 23, borderRadius: 12, background: "#1a1a1a", border: `1px solid ${LINE}` }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.25 8.25h4.5V24h-4.5V8.25Zm7.5 0h4.31v2.15h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-6.99c0-1.67-.03-3.81-2.32-3.81-2.32 0-2.68 1.81-2.68 3.69V24h-4.5V8.25Z" /></svg>
      </span>
      LinkedIn
    </a>);
}
function NameRole({ p, nameSize = 19 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
      <span style={{ fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontSize: nameSize, letterSpacing: "-.01em", color: FG, lineHeight: 1.1 }}>{p.name}</span>
      <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12.5, letterSpacing: ".04em", color: ACID }}>{p.role}</span>
    </div>);
}

/* ============================================================
   A - COMPACT CARDS (3 columns, small avatar, short bio)
   ============================================================ */
function Team() {
  return (
    <React.Fragment>
      <SectionHero id="team" num="06" kicker="team" align="left" glow
        parts={[{ t: "The team that " }, { t: "wins this market.", hi: true }]}
        lead="Track record, execution muscle, disciplined hiring." />
    <Section tightTop dataLabel="09 Team">
      <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch" }}>
        {PEOPLE.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.07} style={{ height: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%", padding: 24, borderRadius: 12, border: `1px solid ${LINE}`, background: "var(--pp-card)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Avatar p={p} size={56} />
                <NameRole p={p} nameSize={18} />
              </div>
              <p className="pp-body" style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>{p.short}</p>
              <div style={{ marginTop: "auto", paddingTop: 2 }}><LinkedIn href={p.li} /></div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* headcount summary band - 35 → 57 */}
      <Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(24px,4vw,56px)", flexWrap: "wrap", padding: "clamp(28px,3.5vw,44px) clamp(28px,3.5vw,48px)", border: `1px solid ${LINE}`, borderRadius: 12, background: "linear-gradient(100deg, rgba(204,255,0,.06), transparent 60%), var(--pp-card)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: "none" }}>
            <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12.5, letterSpacing: ".16em", textTransform: "uppercase", color: FG4 }}>Teammates</span>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(56px,8vw,104px)", lineHeight: 1, letterSpacing: "-.02em", color: ACID }}>35</span>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: FG4 }}>Now</span>
              </div>
              <span style={{ fontFamily: FD, fontWeight: 400, fontSize: "clamp(26px,3vw,42px)", color: FG4, lineHeight: 1, marginTop: "clamp(18px,2.6vw,34px)" }}>→</span>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(56px,8vw,104px)", lineHeight: 1, letterSpacing: "-.02em", color: ACID }}>57</span>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: FG4 }}>End of 2026 · Plan</span>
              </div>
            </div>
          </div>
          <p style={{ margin: 0, flex: "1 1 360px", minWidth: 300, fontFamily: FD, fontWeight: 600, fontStretch: "125%", fontVariationSettings: "'wght' 600,'wdth' 125", fontSize: "clamp(17px,1.7vw,23px)", lineHeight: 1.38, letterSpacing: "-.01em", color: FG2 }}>
            <span style={{ color: FG }}>Headcount now → EOY 2026.</span> Round funds 31 hires across AI, Product and Marketing.</p>
        </div>
      </Reveal>

      {/* headcount table + open roles, side by side */}
      <div className="founder-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 36, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Reveal><Label>headcount · april 2026</Label></Reveal>
          <Reveal delay={0.04}><HeadcountTable /></Reveal>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Reveal><Label variant="acid">open roles - seed-funded</Label></Reveal>
          <Reveal delay={0.04}><OpenRoles /></Reveal>
        </div>
      </div>
    </Section>
    </React.Fragment>);
}

/* ============================================================
   11 - ROADMAP → SERIES A
   ============================================================ */
const QUARTERS = [
  { q: "Q2 2026", range: "Apr-Jun", items: ["Self-custody migration (Privy)", "Metal LED card + US launch", "Pay In / Pay Out (VA + local rails)"], milestone: "Foundation set, self-custody live" },
  { q: "Q3 2026", range: "Jul-Sep", items: ["iOS + Android apps live", "Visa Direct", "Earn - yield on balance"], milestone: "Mobile distribution unlocked, yield enabled" },
  { q: "Q4 2026", range: "Oct-Dec", items: ["Karat Loyalty + Cashback", "Karta Card launch", "QR Payments"], milestone: "Monetization & retention live" },
  { q: "Q1 2027", range: "Jan-Mar", items: ["Credit Line launch", "Family Banking (shared accounts)", "Series A close"], milestone: "Series A close · ~$14M ARR", hero: true },
];
const SCENARIOS = [
  { metric: "Spending MAU", neg: "9,500", neu: "24,000", pos: "95,000" },
  { metric: "Monthly GTV", neg: "$19M", neu: "$55M", pos: "$250M" },
  { metric: "ARR (2.9% take)", neg: "$6.6M", neu: "$19M", pos: "$87M" },
];
function Roadmap() {
  return (
    <React.Fragment>
      <SectionHero id="roadmap" num="10" kicker="roadmap → series a" align="left"
        parts={[{ t: "Twelve months. " }, { t: "One destination.", hi: true }]}
        lead="Each quarter compounds on the last. The seed accelerates the path; the path is the same." />
      <Section tightTop dataLabel="10 Roadmap · detail">
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 36, alignItems: "stretch" }} className="grid-2 roadmap-c-row">
          {/* LEFT — quarter rail */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
            <div aria-hidden="true" style={{ position: "absolute", left: 22, top: 24, bottom: 24, width: 1, background: "linear-gradient(180deg, var(--pp-line), rgba(204,255,0,.4))" }} />
            {QUARTERS.map((qq, i) => (
              <Reveal key={qq.q} delay={i * 0.07}>
                <div style={{ display: "grid", gridTemplateColumns: "45px 1fr", gap: 18, padding: "20px 0", borderTop: i > 0 ? "1px solid var(--pp-line)" : "none", alignItems: "flex-start" }}>
                  <div style={{ position: "relative", paddingTop: 6 }}>
                    <span style={{ display: "block", width: 14, height: 14, borderRadius: 100, marginLeft: 15, background: qq.hero ? "var(--pp-acid)" : "#1a1a1a", border: "2px solid " + (qq.hero ? "var(--pp-acid)" : "var(--pp-line)"), boxShadow: qq.hero ? "0 0 0 6px rgba(204,255,0,.12)" : "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                      <span className="pp-stat" style={{ fontSize: 34, lineHeight: 1, color: qq.hero ? "var(--pp-acid)" : "var(--pp-fg)", fontStretch: "125%", letterSpacing: "-.02em" }}>{qq.q}</span>
                      <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--pp-fg-4)" }}>{qq.range}</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {qq.items.map((it, ii) => (
                        <span key={ii} style={{ display: "inline-block", maxWidth: "100%", padding: "6px 12px", borderRadius: 100, border: "1px solid " + (qq.hero ? "rgba(204,255,0,.32)" : "var(--pp-line)"), background: qq.hero ? "rgba(204,255,0,.06)" : "var(--pp-surface-2)", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 13, lineHeight: 1.2, color: "var(--pp-fg-2)", overflowWrap: "break-word" }}>{it}</span>
                      ))}
                    </div>
                    <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 13, letterSpacing: ".02em", color: qq.hero ? "var(--pp-acid)" : "var(--pp-fg-3)" }}>{qq.milestone}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          {/* RIGHT — Series A anchor */}
          <Reveal variant="scale" delay={0.15}>
            <HCard hover style={{ padding: "clamp(24px, 5vw, 40px)", display: "flex", flexDirection: "column", gap: 20, justifyContent: "center", height: "100%", background: "radial-gradient(120% 90% at 70% 110%, rgba(204,255,0,.16), rgba(204,255,0,.04) 50%, var(--pp-card))", borderColor: "rgba(204,255,0,.34)" }}>
              <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--pp-acid)" }}>[ The anchor ]</span>
              <span className="pp-stat" style={{ fontSize: "clamp(32px, 8vw, 88px)", lineHeight: 1, color: "var(--pp-fg)", fontStretch: "125%", letterSpacing: "-.03em", whiteSpace: "nowrap" }}>~$14M <span style={{ color: "var(--pp-acid)" }}>ARR</span></span>
              <p style={{ margin: 0, fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 22, lineHeight: 1.35, color: "var(--pp-fg-2)" }}>Q1 2027 · Series A close, neutral case. <span style={{ color: "var(--pp-fg)" }}>49%</span> of the 3-5yr SOM target already at run-rate.</p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 16, display: "flex", justifyContent: "space-between", gap: 14, fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 14, color: "var(--pp-fg-3)" }}>
                <span>Profitable 4 months</span>
                <span>·</span>
                <span>49% of SOM achieved</span>
              </div>
            </HCard>
          </Reveal>
        </div>

        {/* scenarios — single strip with three big columns */}
        <Reveal><Label variant="acid">december 2026 projections</Label></Reveal>
        <Reveal variant="scale">
          <div style={{ border: "1px solid var(--pp-line)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "20px 28px", background: "#080808", borderBottom: "1px solid var(--pp-line)" }} className="proj-head">
              <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--pp-fg-4)" }}>Metric</span>
              <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--pp-fg-4)", textAlign: "right" }}>Negative · 7% m/m</span>
              <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--pp-acid)", textAlign: "right" }}>★ Neutral · 17% m/m</span>
              <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--pp-fg-4)", textAlign: "right" }}>Positive · 35% m/m</span>
            </div>
            {SCENARIOS.map((row, ri) => (
              <Reveal key={row.metric} delay={ri * 0.06}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "22px 28px", borderTop: ri > 0 ? "1px solid var(--pp-line)" : "none", alignItems: "baseline" }} className="proj-row">
                  <span style={{ fontFamily: "var(--pp-font-body)", fontSize: 15, color: "var(--pp-fg-2)" }}>{row.metric}</span>
                  <span style={{ textAlign: "right", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 22, color: "var(--pp-fg-3)", fontStretch: "125%" }}>{row.neg}</span>
                  <span style={{ textAlign: "right", fontFamily: "var(--pp-font-display)", fontWeight: 800, fontSize: 32, color: "var(--pp-acid)", fontStretch: "125%", letterSpacing: "-.02em" }}>{row.neu}</span>
                  <span style={{ textAlign: "right", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 22, color: "var(--pp-fg-3)", fontStretch: "125%" }}>{row.pos}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p className="pp-body" style={{ margin: 0, fontSize: 16, maxWidth: 820 }}>
            <span style={{ color: "var(--pp-fg)" }}>We commit to Neutral.</span> Positive if compounding holds; Negative is the floor.
          </p>
        </Reveal>
    </Section>
    </React.Fragment>
  );
}

/* ============================================================
   12 - ASK + USE OF FUNDS + CLOSE
   ============================================================ */
const BUCKETS = [
  { t: "Growth", pct: "[ 50% ]", d: "Paid acquisition. 20K+ MAU by Q1 2027." },
  { t: "Team", pct: "[ 35% ]", d: "Mobile, AI/Eng, compliance hires." },
  { t: "Product & Compliance", pct: "[ 15% ]", d: "Karta Stablecoin, US licensing, infra." },
];
const STEPS = [
  { t: "Data room", d: "within 1 week" },
  { t: "Term sheet", d: "4-6 weeks" },
  { t: "Contact", d: "[ Nik · email + Telegram ]" },
];
function Ask() {
  return (
    <React.Fragment>
      <SectionHero id="ask" num="07" kicker="the ask" align="center" glow
        parts={[{ t: "Raising " }, { t: "$5M", hi: true }, { t: " seed - to accelerate, not to survive." }]}
        lead="Profitable four months. The round accelerates Series A; it doesn't buy runway." />
      <Section tightTop dataLabel="11 The ask · detail" style={{ paddingBottom: 80 }}>
      {/* use of funds */}
      <Reveal>
        <Label variant="acid">use of funds</Label>
      </Reveal>

      {/* buckets */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="grid-3">
        {BUCKETS.map((b, i) => (
          <Reveal key={b.t} delay={i * 0.08}>
            <HCard hover style={{ minHeight: 200, justifyContent: "space-between", gap: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 className="pp-h3" style={{ margin: 0, fontSize: 24 }}>{b.t}</h3>
                <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontSize: 22, color: "var(--pp-acid)", whiteSpace: "nowrap", flexShrink: 0 }}>{b.pct}</span>
              </div>
              <p className="pp-body" style={{ margin: 0 }}>{b.d}</p>
            </HCard>
          </Reveal>
        ))}
      </div>

      {/* next steps */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="grid-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.06}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid var(--pp-line)", paddingTop: 18 }}>
              <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontSize: 13, color: "var(--pp-fg-4)" }}>0{i + 1}</span>
              <h4 style={{ margin: 0, fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 18, color: "var(--pp-fg)" }}>{s.t}</h4>
              <span className="pp-caption">{s.d}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* investor form */}
      <Reveal><InvestorForm /></Reveal>
    </Section>
    </React.Fragment>
  );
}

/* ===== Investor form ===== */
function InvestorForm() {
  const { useState } = React;
  const [f, setF] = useState({ name: "", email: "", type: "", amount: "", message: "" });
  const [sent, setSent] = useState(false);
  const upd = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = "Karta seed · " + (f.name || "investor interest");
    const body = [
      "Name: " + f.name,
      "Email: " + f.email,
      "Investor type: " + f.type,
      "Investment amount: " + f.amount,
      "",
      "Message:",
      f.message,
    ].join("\n");
    window.location.href = "mailto:invest@karta.io?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    setSent(true);
  };
  const FIELD = {
    width: "100%", padding: "13px 16px", borderRadius: 12,
    background: "var(--pp-surface-2)", border: "1px solid var(--pp-line)",
    color: "var(--pp-fg)", fontFamily: "var(--pp-font-body)", fontSize: 15, lineHeight: 1.4,
    outline: "none", transition: "border-color .2s var(--pp-ease), background .2s var(--pp-ease)",
  };
  const LABEL = { fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--pp-fg-3)" };
  return (
    <HCard style={{ marginTop: 8, padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Label variant="acid">become an investor</Label>
        <h3 className="pp-h3" style={{ margin: 0, fontSize: 28 }}>Join the seed round.</h3>
        <p className="pp-body" style={{ margin: 0, maxWidth: 580 }}>Leave your details and we will follow up within one business day with data-room access.</p>
      </div>
      <form onSubmit={onSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="investor-form-grid">
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={LABEL}>Full name</span>
          <input required type="text" value={f.name} onChange={upd("name")} placeholder="Jane Doe" style={FIELD} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={LABEL}>Email</span>
          <input required type="email" value={f.email} onChange={upd("email")} placeholder="jane@fund.vc" style={FIELD} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={LABEL}>Investor type</span>
          <select required value={f.type} onChange={upd("type")} style={FIELD}>
            <option value="">Select one</option>
            <option value="Angel">Angel</option>
            <option value="VC">Venture fund</option>
            <option value="Family Office">Family office</option>
            <option value="Strategic">Strategic / corporate</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={LABEL}>Investment amount</span>
          <select required value={f.amount} onChange={upd("amount")} style={FIELD}>
            <option value="">Select range</option>
            <option value="$25K - $100K">$25K - $100K</option>
            <option value="$100K - $250K">$100K - $250K</option>
            <option value="$250K - $500K">$250K - $500K</option>
            <option value="$500K - $1M">$500K - $1M</option>
            <option value="$1M+">$1M+</option>
          </select>
        </label>
        <label style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={LABEL}>Message <span style={{ color: "var(--pp-fg-4)", textTransform: "none", letterSpacing: 0 }}>(optional)</span></span>
          <textarea value={f.message} onChange={upd("message")} placeholder="Anything we should know about your firm or thesis." rows={4} style={{ ...FIELD, resize: "vertical", minHeight: 96, fontFamily: "var(--pp-font-body)" }} />
        </label>
        <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 4, flexWrap: "wrap" }}>
          <p className="pp-caption" style={{ margin: 0, color: "var(--pp-fg-4)" }}>{sent ? "Your email draft is open - send it from your client." : "Submitting opens your email client with the details pre-filled."}</p>
          <PillButton type="submit" variant="accent" glyph="arrow">Submit interest</PillButton>
        </div>
      </form>
    </HCard>
  );
}

/* mission close + footer */
function Close() {
  return (
    <footer style={{ position: "relative", zIndex: 1, background: "radial-gradient(120% 140% at 50% 120%, rgba(204,255,0,.12), transparent 60%), #050505", padding: "120px 24px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 1440, display: "flex", flexDirection: "column", gap: 64 }}>
        <Reveal>
          <h2 style={{ margin: 0, fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(34px,6vw,84px)", lineHeight: 1.0, letterSpacing: "-.03em", color: "var(--pp-fg)", maxWidth: 980 }}>
            To make money as <span style={{ color: "var(--pp-acid)" }}>free as the people</span> who use it.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: "clamp(20px, 3vw, 40px)", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid var(--pp-line)", paddingTop: "clamp(28px, 3vw, 40px)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--pp-fg-4)" }}>Contact</span>
              <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 600, fontStretch: "125%", fontSize: "clamp(20px, 2.4vw, 28px)", color: "var(--pp-acid)", letterSpacing: "-.01em" }}>Jana Olsamo</span>
              <a href="mailto:olsamo@karta.io" className="inl-link" style={{ fontFamily: "var(--pp-font-body)", fontSize: 16, color: "var(--pp-fg-2)", letterSpacing: "-.005em" }}>olsamo@karta.io</a>
            </div>
            <img src="assets/karta-logo-white.svg" alt="Karta" style={{ height: 34, opacity: .9 }} />
          </div>
        </Reveal>
        <p className="pp-caption" style={{ margin: 0, color: "var(--pp-fg-4)" }}>Figures April 2026 (Manifest Beautiful Table, Mixpanel).</p>
      </div>
    </footer>
  );
}

Object.assign(window, { Market, Vision, Team, Roadmap, Ask, Close });


/* ===== Market (bento) - merged from market-section.jsx for deterministic load order ===== */
/* Market - SCROLL-context section layouts (full-width, tall, Karta site).
   Three ways to tell the "borderless money market" story as a real
   vertical-scroll chapter - each uses the world map differently:
     A - Map-led: full-bleed map centerpiece with regional callouts
     B - Editorial spec-sheet: numbered beats, converging-markets table → map band → SAM/SOM
     C - TAM → SAM → SOM: structured around the bottom-up funnel, map is the "where we play" wedge
   Reuses the site's real components (Reveal, Label, HCard, Bar, Hi, Section, SectionHero). */

const { useState: mS, useEffect: mE } = React;
const ACID = "var(--pp-acid)", ROAD = "#FF7A1A";
const FG = "var(--pp-fg)", FG2 = "var(--pp-fg-2)", FG3 = "var(--pp-fg-3)", FG4 = "var(--pp-fg-4)";
const FD = "var(--pp-font-display)", FB = "var(--pp-font-body)";

/* ---------------- data ---------------- */
const SRC_RM = "https://www.researchandmarkets.com/reports/6191058/crypto-powered-remittances-market-report";
const SRC_CHAIN = "https://www.chainalysis.com/reports/the-new-rails/";
const SRC_ARTEMIS = "https://research.artemisanalytics.com/p/stablecoin-payments-at-scale-how";
const SRC_COINDESK = "https://www.coindesk.com/business/2026/01/16/crypto-card-spending-hits-usd18-billion-annualized-as-stablecoin-use-shifts-to-everyday-payments";
const SRC_VISA = "https://intellectia.ai/news/stock/visa-reports-167-trillion-in-payment-volume-for-fiscal-2025-strong-profitability";
const SRC_WB = "https://blogs.worldbank.org/en/peoplemove/in-2024--remittance-flows-to-low--and-middle-income-countries-ar";
const MARKETS = [
  { l: "Global remittances",      a: "$905B",  b: "$1.14T", cagr: "4.7%",  srcParts: [{ t: "World Bank", href: SRC_WB }, ", 2024"], w: 0.50 },
  { l: "Crypto-powered subset",   a: "$27.9B", b: "$85.8B", cagr: "25.2%", srcParts: [{ t: "Research & Markets", href: SRC_RM }, ", 2026"], w: 0.22, sub: true },
  { l: "Stablecoin tx volume",    a: "$33T",   b: "~$140T", cagr: "~38%",  srcParts: [{ t: "Chainalysis", href: SRC_CHAIN }, ", 2025"], w: 1.00, hero: true },
  { l: "Crypto card spend",       a: "$18B",   b: "n/d",    cagr: "106%",  srcParts: [{ t: "Artemis", href: SRC_ARTEMIS }, " / ", { t: "CoinDesk", href: SRC_COINDESK }, ", Jan 2026"], w: 0.14, note: "Too early to model reliably; we don't extrapolate triple-digit growth." },
];
const REGIONS = [
  { id: "mena",  p: "#1", r: "UAE / MENA", k: "UAE · Saudi Arabia",                     stat: "$56B+ received · +33% YoY",            why: "#1 MENA crypto adoption · Rain HQ in region · expat hub",              live: true },
  { id: "latam", p: "#2", r: "LATAM",      k: "Argentina · Brazil · Mexico · Colombia", stat: "63% YoY adoption · 92M wallets",        why: "Stablecoin-as-savings · inflation hedge",                              live: true },
  { id: "usaeu", p: "#3", r: "USA / EU",   k: "USA · EU",                               stat: "40M holders in US · top ARPPU",        why: "Largest crypto-wealth concentration · remote workers paid in USD/EUR", live: false },
  { id: "sea",   p: "#4", r: "SEA",        k: "Indonesia · Philippines · Vietnam",      stat: "69% YoY · 350M wallets (43% global)",  why: "Remittance-heavy corridors",                                           live: true },
];
const SIZE_FRAME = [
  { v: "$190T",  l: "Global cross-border payment volume" },
  { v: "$150B+", l: "Annual revenue pool" },
  { v: "$53B+",  l: "Annual border tax on remittances" },
];
/* map markers - base grid 201×97 (matches the site's GeoMap) */
const GEO = [
  { id: "usa",   x: 17.5, y: 33.0, lx: 17.5, ly: 7,  side: "top",    live: false, label: "USA" },
  { id: "eu",    x: 50.0, y: 28.0, lx: 50.0, ly: 7,  side: "top",    live: false, label: "EU" },
  { id: "mena",  x: 63.0, y: 33.0, lx: 66.0, ly: 7,  side: "top",    live: true,  label: "UAE / MENA" },
  { id: "sea",   x: 82.0, y: 58.0, lx: 82.0, ly: 92, side: "bottom", live: true,  label: "SE Asia" },
  { id: "latam", x: 28.0, y: 62.0, lx: 32.0, ly: 92, side: "bottom", live: true,  label: "LATAM" },
];

/* ---------------- shared bits ---------------- */
function GlowDot({ live = true, size = 11 }) {
  const c = live ? ACID : ROAD, g = live ? "rgba(204,255,0,.55)" : "rgba(255,122,26,.5)";
  return <span style={{ flex: "none", display: "inline-block", width: size, height: size, borderRadius: "50%", background: c, boxShadow: `0 0 7px 2px ${g}, 0 0 15px 4px ${g}` }} />;
}
function geoLabel(pos) {
  const base = { position: "absolute", whiteSpace: "nowrap", fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontVariationSettings: "'wght' 700,'wdth' 125", fontSize: "clamp(12px,1vw,17px)", letterSpacing: "-.01em", color: FG, textShadow: "0 1px 6px rgba(0,0,0,.85),0 0 2px rgba(0,0,0,.9)" };
  if (pos === "top")    return { ...base, left: "50%", bottom: "calc(100% + 10px)", transform: "translateX(-50%)" };
  if (pos === "bottom") return { ...base, left: "50%", top: "calc(100% + 10px)", transform: "translateX(-50%)" };
  if (pos === "right")  return { ...base, left: "calc(100% + 12px)", top: "50%", transform: "translateY(-50%)" };
  return base;
}
/* origin dot - small marker sitting on the region itself */
function OriginDot({ x, y, live }) {
  const c = live ? ACID : ROAD, g = live ? "rgba(204,255,0,.6)" : "rgba(255,122,26,.6)";
  return <span style={{ position: "absolute", left: x + "%", top: y + "%", transform: "translate(-50%,-50%)", width: 5, height: 5, borderRadius: "50%", background: c, boxShadow: `0 0 4px 1px ${g}`, pointerEvents: "none" }} />;
}
/* leader dot - the glowing pinging dot + label out in the black area */
function LeaderDot({ lx, ly, live, delay, label, side }) {
  const c = live ? ACID : ROAD, g = live ? "rgba(204,255,0,.55)" : "rgba(255,122,26,.5)";
  return (
    <span style={{ position: "absolute", left: lx + "%", top: ly + "%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
      <span className="geo-ping" style={{ position: "absolute", left: "50%", top: "50%", width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `1.5px solid ${c}`, animationDelay: delay + "s" }} />
      <span className="geo-ping" style={{ position: "absolute", left: "50%", top: "50%", width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `1.5px solid ${c}`, animationDelay: (delay + 1.1) + "s" }} />
      <span className="geo-core" style={{ position: "relative", display: "block", width: 11, height: 11, borderRadius: "50%", background: c, boxShadow: `0 0 8px 2px ${g}, 0 0 18px 5px ${g}`, animationDelay: delay + "s" }} />
      <span style={geoLabel(side)}>{label}</span>
    </span>);
}
function Marker({ x, y, live, delay, label, pos, showLabel }) {
  const c = live ? ACID : ROAD, g = live ? "rgba(204,255,0,.55)" : "rgba(255,122,26,.5)";
  return (
    <span style={{ position: "absolute", left: x + "%", top: y + "%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
      <span className="geo-ping" style={{ position: "absolute", left: "50%", top: "50%", width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `1.5px solid ${c}`, animationDelay: delay + "s" }} />
      <span className="geo-ping" style={{ position: "absolute", left: "50%", top: "50%", width: 14, height: 14, marginLeft: -7, marginTop: -7, borderRadius: "50%", border: `1.5px solid ${c}`, animationDelay: (delay + 1.1) + "s" }} />
      <span className="geo-core" style={{ position: "relative", display: "block", width: 11, height: 11, borderRadius: "50%", background: c, boxShadow: `0 0 8px 2px ${g}, 0 0 18px 5px ${g}`, animationDelay: delay + "s" }} />
      {showLabel && <span style={geoLabel(pos)}>{label}</span>}
    </span>);
}
/* the world map + pins.
   - `callouts` overlays region stat cards (variant A)
   - `inline` keeps the pulsing pin ON the country with a dashed leader line
     to a floating label (Olsamo variant)
   - default leader-line + off-map pulsing dot (variants B/C) */
function GeoMap({ maxWidth = 1180, callouts = false, showLabels = true, inline = false }) {
  const leader = !inline && showLabels && !callouts;
  const showLines = leader || inline;
  return (
    <div className="geo-map" style={{ position: "relative", width: "100%", maxWidth, margin: "0 auto" }}>
      <img src="assets/world-map-dots-sm.svg" alt="World map - Karta active regions" draggable={false}
        style={{ display: "block", width: "100%", height: "auto", filter: "saturate(0) brightness(1.05)", opacity: 0.82 }} />
      {showLines && (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
          {GEO.map((m) => (
            <line key={m.id} x1={m.x} y1={m.y} x2={m.lx} y2={m.ly} stroke={m.live ? ACID : ROAD} strokeWidth="1" strokeDasharray="2.5 2.5" vectorEffect="non-scaling-stroke" opacity=".55" />
          ))}
        </svg>
      )}
      <div style={{ position: "absolute", inset: 0 }}>
        {leader
          ? GEO.map((m, i) => <React.Fragment key={m.id}><OriginDot x={m.x} y={m.y} live={m.live} /><LeaderDot {...m} delay={i * 0.3} /></React.Fragment>)
          : inline
            ? GEO.map((m, i) => (
                <React.Fragment key={m.id}>
                  <Marker x={m.x} y={m.y} live={m.live} delay={i * 0.3} label={m.label} showLabel={false} />
                  <span style={{ position: "absolute", left: m.lx + "%", top: m.ly + "%", transform: "translate(-50%, -50%)", fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontVariationSettings: "'wght' 700,'wdth' 125", fontSize: "clamp(12px,1vw,17px)", letterSpacing: "-.01em", color: FG, textShadow: "0 1px 6px rgba(0,0,0,.85),0 0 2px rgba(0,0,0,.9)", pointerEvents: "none", whiteSpace: "nowrap" }}>{m.label}</span>
                </React.Fragment>
              ))
            : GEO.map((m, i) => <Marker key={m.id} {...m} delay={i * 0.3} showLabel={false} />)}
        {callouts && (
          <React.Fragment>
            <RegionCallout region={REGIONS[2]} place={{ left: "0%",  top: "0%" }} />
            <RegionCallout region={REGIONS[0]} place={{ right: "0%", top: "16%" }} />
            <RegionCallout region={REGIONS[3]} place={{ right: "0%", top: "64%" }} />
            <RegionCallout region={REGIONS[1]} place={{ left: "0%",  top: "70%" }} />
          </React.Fragment>
        )}
      </div>
    </div>);
}
function RegionCallout({ region, place }) {
  const c = region.live ? ACID : ROAD;
  return (
    <div style={{ position: "absolute", width: 234, padding: "13px 15px", background: "rgba(8,8,8,.78)", backdropFilter: "blur(4px)", border: `1px solid ${region.live ? "rgba(204,255,0,.3)" : "rgba(255,122,26,.3)"}`, borderRadius: 4, display: "flex", flexDirection: "column", gap: 5, ...place }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontSize: 14, color: c }}>{region.p}</span>
        <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 16, color: FG, letterSpacing: "-.01em" }}>{region.r}</span>
        {!region.live && <span style={{ marginLeft: "auto", fontFamily: FD, fontWeight: 600, fontSize: 9.5, letterSpacing: ".12em", color: ROAD }}>SOON</span>}
      </div>
      <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 13.5, color: region.live ? ACID : "#ffb27a", letterSpacing: "-.01em" }}>{region.stat}</span>
      <span style={{ fontFamily: FB, fontSize: 12, lineHeight: 1.4, color: FG3 }}>{region.why}</span>
    </div>);
}
function MapLegend({ center = true }) {
  return (
    <div style={{ display: "flex", gap: 48, justifyContent: center ? "center" : "flex-start", flexWrap: "wrap", alignItems: "center" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 11, fontFamily: FB, fontSize: 16, color: FG }}>
        <GlowDot live /><span><span style={{ color: FG3 }}>Live today&nbsp;·&nbsp;</span>MENA · LATAM · SE&nbsp;Asia</span></span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 11, fontFamily: FB, fontSize: 16, color: FG2 }}>
        <GlowDot live={false} /><span><span style={{ color: FG3 }}>On roadmap&nbsp;·&nbsp;</span>USA · EU</span></span>
    </div>);
}

/* source citation with external links (Karta dark style) */
function SourceCite({ parts, fontSize = 10.5 }) {
  return (
    <span className="pp-caption" style={{ fontSize }}>
      {(parts || []).map((p, i) => typeof p === "string"
        ? <React.Fragment key={i}>{p}</React.Fragment>
        : <a key={i} className="src-link" href={p.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textDecorationColor: "rgba(204,255,0,.45)", textUnderlineOffset: 2 }}>{p.t}<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 3, marginBottom: 1 }}><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg></a>)}
    </span>);
}
/* info icon + hover tooltip (Karta dark style) */
function InfoTip({ text }) {
  const [h, setH] = mS(false);
  const c = h ? ACID : FG4;
  return (
    <span style={{ position: "relative", display: "inline-flex", verticalAlign: "middle", marginLeft: 7 }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <svg width="15" height="15" viewBox="0 0 18 18" fill="none" style={{ display: "block", cursor: "help" }}>
        <circle cx="9" cy="9" r="7.3" stroke={c} strokeWidth="1.4" />
        <circle cx="9" cy="5.7" r="0.95" fill={c} />
        <path d="M9 8.1v4.3" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {h && (
        <span style={{ position: "absolute", bottom: "calc(100% + 10px)", right: -7, width: 230, padding: "11px 13px", background: "var(--pp-surface-2)", border: "1px solid #2a2a2a", borderRadius: 4, zIndex: 40, fontFamily: FB, fontWeight: 400, fontSize: 12.5, lineHeight: 1.45, color: FG2, textAlign: "left", whiteSpace: "normal", letterSpacing: 0, boxShadow: "0 12px 34px rgba(0,0,0,.55)" }}>
          {text}
          <span style={{ position: "absolute", top: "100%", right: 13, width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid var(--pp-surface-2)" }} />
        </span>
      )}
    </span>);
}
/* converging-markets data table (bento card) - matches the site's canonical
   Key-metrics table: right-aligned numeric columns, muted metric name, acid
   last column, hairline row dividers. fr columns so rows align. */
function MiniMarketList() {
  const COLS = "minmax(0,1.85fr) .82fr .82fr .6fr";
  const hd = (right, acid) => ({ textAlign: right ? "right" : "left", fontFamily: FD, fontWeight: 600, fontSize: 11.5, letterSpacing: ".08em", textTransform: "uppercase", color: acid ? ACID : FG4, whiteSpace: "nowrap" });
  const numv = (m) => ({ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: 15.5, color: m.sub ? FG2 : FG, textAlign: "right", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", letterSpacing: "-.01em" });
  const cagrv = (m) => ({ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: 17, color: m.sub ? FG2 : ACID, textAlign: "right", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" });
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "grid", gridTemplateColumns: COLS, columnGap: 10, padding: "0 0 10px", borderBottom: "1px solid #1c1c1c" }}>
        <span style={hd(false)}>MARKET</span>
        <span style={hd(true)}>2025</span>
        <span style={hd(true)}>2030E</span>
        <span style={hd(true, true)}>CAGR</span>
      </div>
      {MARKETS.map((m, ri) => {
        const mainNo = MARKETS.slice(0, ri + 1).filter((x) => !x.sub).length;
        return (
        <div key={m.l} style={{ display: "grid", gridTemplateColumns: COLS, columnGap: 10, alignItems: "baseline", padding: m.sub ? "11px 0" : "14px 0", ...(m.hero
          ? { border: "1px solid rgba(204,255,0,.6)", borderRadius: 12, marginLeft: -26, marginRight: -26, paddingLeft: 26, paddingRight: 26, marginTop: 5, marginBottom: 5 }
          : { borderBottom: ri < MARKETS.length - 1 ? "1px solid #141414" : "none" }) }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, paddingLeft: m.sub ? 14 : 0, minWidth: 0 }}>
            <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: m.sub ? 13 : 15.5, color: m.sub ? FG2 : FG, lineHeight: 1.2, letterSpacing: "-.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%", display: "block" }}>{m.sub ? <span style={{ color: FG4, marginRight: 6 }}>↳</span> : <span style={{ color: ACID, marginRight: 9 }}>{mainNo}</span>}{m.l}</span>
            <SourceCite parts={m.srcParts} fontSize={13} />
          </div>
          <span style={numv(m)}>{m.a}</span>
          <span style={numv(m)}>{m.b}{m.note && <InfoTip text={m.note} />}</span>
          <span style={cagrv(m)}>{m.cagr}</span>
        </div>
        );
      })}
    </div>);
}
/* compact priority-region tiles (name + headline stat only) */
function RegionStrip() {
  return (
    <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      {REGIONS.map((r, i) => (
        <Reveal key={r.id} delay={(i % 4) * 0.06}>
          <HCard hover style={{ gap: 10, padding: 22, minHeight: 0, borderColor: r.live ? "var(--pp-line)" : "rgba(255,122,26,.22)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <GlowDot live={r.live} size={9} />
              <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontSize: 16, color: r.live ? ACID : ROAD }}>{r.p}</span>
              <h3 className="pp-h3" style={{ margin: 0, fontSize: 19 }}>{r.r}</h3>
            </div>
            <div style={{ fontFamily: FD, fontWeight: 600, fontSize: 13.5, color: r.live ? ACID : "#ffb27a" }}>{r.stat}</div>
            <div style={{ fontFamily: FB, fontSize: 11.5, color: FG3, lineHeight: 1.35 }}>{r.k}</div>
          </HCard>
        </Reveal>
      ))}
    </div>);
}

/* ============================================================
   MARKET - Bento dashboard (ported into the main deck).
   Hero + market sizing in number cards; map is its own block.
   ============================================================ */
function Market() {
  return (
    <React.Fragment>
      <SectionHero id="market" num="07" kicker="market" align="left" glow
        parts={[{ t: "We're building " }, { t: "borderless money.", hi: true }]}
        lead={<React.Fragment><span style={{ color: ACID }}>The market</span> where remittances, stablecoins, and card spend become one.</React.Fragment>}
        leadStyle={{ fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontVariationSettings: "'wght' 700,'wdth' 125", letterSpacing: "-.02em", lineHeight: 1.12, fontSize: "clamp(24px,2.6vw,32px)" }} />
    <Section tightTop dataLabel="07 Market" style={{ overflowX: "clip", overflowY: "visible" }}>
      {/* ---------- the market, by the numbers (bento) ---------- */}
      <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
        {/* large planet - anchored to the section's right edge, behind the blocks */}
        <video src="assets/planet.webm" autoPlay loop muted playsInline aria-hidden="true" className="market-planet" style={{
          position: "absolute", top: "calc(clamp(-280px, -16vw, -150px) - 80px)", right: "clamp(20px, 2.5vw, 56px)",
          width: "clamp(422px, 42vw, 669px)", height: "auto", objectFit: "contain",
          pointerEvents: "none", zIndex: 0,
        }} />
        <Reveal style={{ position: "relative", zIndex: 1 }}><h3 style={{ margin: 0, fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontVariationSettings: "'wght' 700,'wdth' 125", fontSize: "clamp(19px,2vw,26px)", letterSpacing: "-.02em", color: FG }}>Three converging markets <span style={{ color: FG4 }}>(TAM)</span></h3></Reveal>

        {/* row 1 - $33T proof + converging markets */}
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch", position: "relative", zIndex: 1 }}>
          <Reveal variant="up" style={{ height: "100%" }}>
            <HCard style={{ gap: 18, padding: 26, justifyContent: "center", height: "100%" }}>
              <MiniMarketList />
            </HCard>
          </Reveal>
          <Reveal variant="up" delay={0.06} style={{ height: "100%" }}>
            <HCard style={{ gap: 16, padding: 36, justifyContent: "center", height: "100%", background: "linear-gradient(135deg, rgba(204,255,0,.08), var(--pp-card) 62%)", borderColor: "rgba(204,255,0,.24)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <span className="pp-h3" style={{ fontSize: 20 }}>Stablecoin tx volume</span>
                <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 700, color: "var(--pp-acid)", fontSize: 15, whiteSpace: "nowrap" }}>~38% CAGR</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
                <span className="pp-stat" style={{ fontSize: 84, lineHeight: 1, fontStretch: "125%" }}>$33T</span>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 18, letterSpacing: "-.01em", color: FG3, whiteSpace: "nowrap" }}><span style={{ color: FG4 }}>2025</span> → <span style={{ color: FG2 }}>~$140T</span> <span style={{ color: FG4 }}>2030E</span></span>
              </div>
              <p className="pp-body" style={{ margin: 0, fontSize: 15, lineHeight: 1.55, maxWidth: 470, position: "relative", zIndex: 1 }}>In 2025, stablecoin transaction volume surpassed Visa - <span style={{ color: FG }}>Stablecoin's $33T</span> vs. <a className="inl-link" href={SRC_VISA} target="_blank" rel="noopener noreferrer">Visa's $16.7T<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 3, marginBottom: 1 }}><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg></a> fiscal year. This is no longer a niche: stablecoins are becoming <span style={{ color: FG }}>core payment infrastructure</span>. For Karta, that's the tailwind - the rails our product runs on are now at global scale.</p>
            </HCard>
          </Reveal>
        </div>

        {/* row 2 - size frame ×3 */}
        <Reveal style={{ position: "relative", zIndex: 1, marginTop: 10 }}><h3 style={{ margin: 0, fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontVariationSettings: "'wght' 700,'wdth' 125", fontSize: "clamp(19px,2vw,26px)", letterSpacing: "-.02em", color: FG4 }}>TAM <span style={{ color: FG4 }}>·</span> Top-Down</h3></Reveal>
        <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {SIZE_FRAME.map((s, i) => (
            <Reveal key={s.v} delay={i * 0.06}>
              <HCard style={{ gap: 10, padding: 28 }}>
                <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: 46, lineHeight: 1, color: FG }}>{s.v}</span>
                <span className="pp-body" style={{ margin: 0, fontSize: 14 }}>{s.l}</span>
              </HCard>
            </Reveal>
          ))}
        </div>

        {/* row 3 - SAM + SOM, each with its own heading above */}
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontVariationSettings: "'wght' 700,'wdth' 125", fontSize: "clamp(19px,2vw,26px)", letterSpacing: "-.02em", color: FG4 }}>SAM <span style={{ color: FG4 }}>·</span> Bottom-Up</h3>
              <HCard style={{ gap: 14, minHeight: 214, justifyContent: "space-between", padding: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span className="pp-stat" style={{ fontSize: 54 }}>$1.41B</span>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 12.5, letterSpacing: ".12em", color: FG4 }}>GTV / YR</span>
                  </div>
                  <div style={{ fontFamily: FD, fontWeight: 600, fontSize: 17, color: FG2 }}>→ <span style={{ color: ACID }}>$40.9M</span> revenue @ 2.9% take</div>
                </div>
                <p className="pp-body" style={{ margin: 0, fontSize: 13.5 }}>965K visitors → 7% conversion → 67.6K paying × $1,738/mo GTV per user.</p>
              </HCard>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h3 style={{ margin: 0, fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontVariationSettings: "'wght' 700,'wdth' 125", fontSize: "clamp(19px,2vw,26px)", letterSpacing: "-.02em", color: FG4 }}>SOM <span style={{ color: FG4 }}>·</span> 3-5yr target</h3>
              <HCard style={{ gap: 14, minHeight: 214, justifyContent: "space-between", padding: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span className="pp-stat" style={{ fontSize: 54 }}>$211M</span>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 12.5, letterSpacing: ".12em", color: FG4 }}>GTV / YR</span>
                  </div>
                  <div style={{ fontFamily: FD, fontWeight: 600, fontSize: 17, color: FG2 }}>→ <span style={{ color: ACID }}>$6.1M</span> revenue @ 2.9% take</div>
                </div>
                <p className="pp-body" style={{ margin: 0, fontSize: 13.5 }}>15% of SAM · 49% already at run-rate ($102.8M GTV). Three methods converge.</p>
              </HCard>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---------- where we operate (map - geography only) ---------- */}
      <div style={{ display: "flex", flexDirection: "column", gap: 30, textAlign: "center" }}>
        <Reveal><h3 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(32px,4.4vw,56px)", lineHeight: 1.04, letterSpacing: "-.025em", color: ACID }}>Where we operate</h3></Reveal>
        <Reveal delay={0.04}>
          <h3 className="pp-h3" style={{ margin: "0 auto", maxWidth: 780, fontWeight: 500, fontSize: 23, color: FG2 }}>
            Concrete markets, validated by team analysis - <span style={{ color: FG }}>live across MENA, LATAM and SE Asia</span>, with USA &amp; EU on the roadmap.</h3>
        </Reveal>
        <Reveal variant="scale"><GeoMap maxWidth={1320} /></Reveal>
        <Reveal delay={0.05}><MapLegend /></Reveal>
        <RegionStrip />
      </div>
    </Section>
    </React.Fragment>);
}

/* Market is rendered by app.jsx in the main deck. */

/* ============================================================
   07b - MARKET PITCH (Jana's variant — 3 blocks, no details)
   Used by /pitch/ route. Block 1: Moment (stablecoins overtook
   Visa). Block 2: Our slice (SAM / SOM). Block 3: Where we are
   (live in MENA/LATAM/SEA, USA + EU on roadmap).
   ============================================================ */
function MarketPitch() {
  return (
    <React.Fragment>
      <SectionHero id="market" num="07" kicker="market" align="left" glow
        parts={[{ t: "We're building " }, { t: "borderless money.", hi: true }]}
        lead="Three things investors need to know — everything else is in the data room." />
      <Section tightTop dataLabel="07 Market · pitch" style={{ overflowX: "clip", overflowY: "visible" }}>

        {/* Block 1 — The moment */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, position: "relative" }}>
          <Reveal><Label variant="acid">[ 01 · the moment ]</Label></Reveal>
          <Reveal variant="scale">
            <HCard style={{ padding: "clamp(28px, 4vw, 48px)", display: "flex", flexDirection: "column", gap: 24, background: "linear-gradient(135deg, rgba(204,255,0,.10), var(--pp-card) 60%)", borderColor: "rgba(204,255,0,.32)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(20px, 4vw, 56px)", flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span className="pp-stat" style={{ fontSize: "clamp(56px, 9vw, 140px)", lineHeight: 1, color: ACID, fontStretch: "125%", letterSpacing: "-.03em", whiteSpace: "nowrap" }}>$33T</span>
                  <span style={{ fontFamily: FD, fontWeight: 500, fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", color: FG3 }}>Stablecoin tx volume · 2025</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span className="pp-stat" style={{ fontSize: "clamp(36px, 6vw, 88px)", lineHeight: 1, color: FG2, fontStretch: "125%", letterSpacing: "-.03em", whiteSpace: "nowrap" }}>$16.7T</span>
                  <span style={{ fontFamily: FD, fontWeight: 500, fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", color: FG4 }}>Visa · fiscal year</span>
                </div>
              </div>
              <p style={{ margin: 0, fontFamily: FD, fontWeight: 600, fontStretch: "125%", fontSize: "clamp(22px, 3vw, 36px)", lineHeight: 1.2, letterSpacing: "-.02em", color: FG, maxWidth: 820 }}>
                Stablecoin volume <span style={{ color: ACID }}>overtook Visa.</span> The rails we built on are now global infrastructure.
              </p>
            </HCard>
          </Reveal>
        </div>

        {/* Block 2 — Our slice */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, position: "relative" }}>
          <Reveal><Label variant="acid">[ 02 · our slice ]</Label></Reveal>
          <div className="grid-2 pitch-slice" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Reveal variant="up">
              <HCard style={{ padding: "clamp(24px, 3.5vw, 40px)", display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: FG4 }}>SAM · serviceable</span>
                <span className="pp-stat" style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1, color: FG, fontStretch: "125%", letterSpacing: "-.025em", whiteSpace: "nowrap" }}>$1.41B</span>
                <span style={{ fontFamily: FD, fontWeight: 500, fontSize: 14, color: FG3 }}>GTV per year</span>
                <div style={{ marginTop: "auto", borderTop: "1px solid var(--pp-line)", paddingTop: 14, display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ color: ACID, fontFamily: FD, fontWeight: 700, fontSize: 18 }}>→</span>
                  <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 18, color: FG }}>$40.9M revenue</span>
                  <span style={{ fontFamily: FB, fontSize: 13, color: FG4 }}>@ 2.9% take</span>
                </div>
              </HCard>
            </Reveal>
            <Reveal variant="up" delay={0.06}>
              <HCard style={{ padding: "clamp(24px, 3.5vw, 40px)", display: "flex", flexDirection: "column", gap: 14, height: "100%", background: "linear-gradient(135deg, rgba(204,255,0,.07), var(--pp-card) 70%)", borderColor: "rgba(204,255,0,.24)" }}>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: ACID }}>SOM · 3-5yr target</span>
                <span className="pp-stat" style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1, color: ACID, fontStretch: "125%", letterSpacing: "-.025em", whiteSpace: "nowrap" }}>$211M</span>
                <span style={{ fontFamily: FD, fontWeight: 500, fontSize: 14, color: FG3 }}>GTV per year</span>
                <div style={{ marginTop: "auto", borderTop: "1px solid var(--pp-line)", paddingTop: 14, display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ color: ACID, fontFamily: FD, fontWeight: 700, fontSize: 18 }}>→</span>
                  <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 18, color: FG }}>$6.1M revenue</span>
                  <span style={{ fontFamily: FB, fontSize: 13, color: FG4 }}>@ 2.9% take</span>
                </div>
              </HCard>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p style={{ margin: 0, fontFamily: FD, fontWeight: 600, fontStretch: "125%", fontSize: "clamp(20px, 2.6vw, 30px)", lineHeight: 1.25, letterSpacing: "-.015em", color: FG, maxWidth: 820 }}>
              <span style={{ color: ACID }}>49%</span> of the 3-5yr SOM target already at current run-rate.
            </p>
          </Reveal>
        </div>

        {/* Block 3 — Where we are */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, position: "relative" }}>
          <Reveal><Label variant="acid">[ 03 · where we are ]</Label></Reveal>
          <Reveal variant="scale">
            <GeoMap maxWidth={1180} callouts={false} showLabels={true} />
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ display: "flex", gap: "clamp(20px, 4vw, 56px)", flexWrap: "wrap", alignItems: "baseline" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: ACID, display: "inline-block", boxShadow: "0 0 14px rgba(204,255,0,.55)" }} />
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 16, color: FG }}>Live today</span>
                <span style={{ fontFamily: FB, fontSize: 15, color: FG3 }}>MENA · LATAM · SEA</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: ROAD, display: "inline-block", boxShadow: "0 0 14px rgba(255,122,26,.55)" }} />
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 16, color: FG }}>On roadmap</span>
                <span style={{ fontFamily: FB, fontSize: 15, color: FG3 }}>USA · EU</span>
              </div>
            </div>
          </Reveal>
        </div>

      </Section>
    </React.Fragment>);
}
Object.assign(window, { MarketPitch });

/* ============================================================
   07c - MARKET REDESIGN — editorial/Bloomberg-FT take.
   Three chapters separated by hairlines. Each chapter has a
   monumental outline numeral, a real visualisation (bar chart,
   funnel table, world map), and a single-sentence verdict.
   No card wrappers — typography and rules do the layout work.
   ============================================================ */

/* one big outline numeral that sits like an editorial stamp */
function ChapterStamp({ n }) {
  return (
    <span aria-hidden="true" style={{
      position: "absolute", top: "-8px", right: "-4px", lineHeight: 0.78,
      fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125",
      fontSize: "clamp(140px, 18vw, 280px)", letterSpacing: "-0.05em",
      color: "transparent", WebkitTextStroke: "1px #1b1b1b",
      pointerEvents: "none", userSelect: "none", zIndex: 0,
    }}>{n}</span>
  );
}

/* one row inside the funnel table */
function FunnelRow({ stage, label, value, sub, accent, big, mid }) {
  const valueColor = accent ? ACID : (mid ? FG : FG2);
  const stageColor = accent ? ACID : FG4;
  const valueSize = big ? "clamp(54px, 8.4vw, 124px)" : (mid ? "clamp(40px, 5.8vw, 84px)" : "clamp(30px, 4.2vw, 60px)");
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) auto",
      gap: "clamp(16px, 3vw, 48px)", alignItems: "baseline",
      paddingTop: "clamp(22px, 3vw, 38px)", paddingBottom: "clamp(22px, 3vw, 38px)",
      borderTop: "1px solid var(--pp-line)",
    }} className="market-funnel-row">
      <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
        <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: stageColor }}>{stage}</span>
        <span style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(15px, 1.8vw, 19px)", lineHeight: 1.3, color: FG2, letterSpacing: "-.01em" }}>{label}</span>
        {sub && <span style={{ fontFamily: FB, fontSize: 13, color: FG4, fontVariantNumeric: "tabular-nums" }}>{sub}</span>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: "right" }}>
        <span className="pp-stat" style={{
          fontSize: valueSize, lineHeight: 0.95, color: valueColor,
          fontStretch: "125%", letterSpacing: "-.035em", whiteSpace: "nowrap",
          fontVariantNumeric: "tabular-nums",
        }}>{value}</span>
      </div>
    </div>
  );
}

function MarketRedesign() {
  return (
    <React.Fragment>
      {/* injected keyframes + scoped styles for this slide */}
      <style>{`
        @keyframes mktBarGrow { from { transform: scaleX(0); } to { transform: scaleX(var(--w, 1)); } }
        @keyframes mktProgFill { from { transform: scaleX(0); } to { transform: scaleX(.49); } }
        .market-bar-fill { transform: scaleX(0); transform-origin: left center; }
        .reveal.in .market-bar-fill,
        .reveal-scale.in .market-bar-fill { animation: mktBarGrow 1.4s cubic-bezier(.2,.62,.32,1) .15s forwards; }
        .market-prog-fill { transform: scaleX(0); transform-origin: left center; }
        .reveal.in .market-prog-fill { animation: mktProgFill 1.6s cubic-bezier(.2,.62,.32,1) .3s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .market-bar-fill, .market-prog-fill { transform: scaleX(1); animation: none !important; }
        }
        .market-chapter { position: relative; padding-top: clamp(48px, 7vw, 96px); padding-bottom: clamp(48px, 7vw, 96px); }
        .market-chapter + .market-chapter { border-top: 1px solid var(--pp-line); }
        @media (max-width: 720px) {
          .market-funnel-row { grid-template-columns: 1fr !important; gap: 6px !important; }
          .market-funnel-row > div:last-child { text-align: left !important; }
        }
      `}</style>

      <SectionHero id="market" num="07" kicker="market" align="left" glow
        parts={[{ t: "Three numbers, " }, { t: "one story.", hi: true }]}
        lead="A macro shift. A bounded slice. Real geography." />

      <Section tightTop dataLabel="07 Market · redesign" style={{ overflowX: "clip", overflowY: "visible" }}>

        {/* ==================== CHAPTER 01 · THE SHIFT ==================== */}
        <div className="market-chapter">
          <ChapterStamp n="01" />
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "clamp(28px, 4vw, 56px)" }}>
            <Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>
                  <span style={{ color: ACID }}>01 ·</span> &nbsp;The shift
                </span>
                <h2 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125",
                  fontSize: "clamp(34px, 4.6vw, 64px)", lineHeight: 1.04, letterSpacing: "-.03em", color: FG, maxWidth: 1000 }}>
                  Stablecoins <span style={{ color: ACID }}>crossed</span> Visa in 2025.
                </h2>
              </div>
            </Reveal>

            {/* bar chart */}
            <Reveal variant="scale">
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {/* stablecoins bar — full width */}
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 14, alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: ACID, boxShadow: "0 0 16px rgba(204,255,0,.55)" }} />
                      <span style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(13px, 1.4vw, 17px)", letterSpacing: ".04em", textTransform: "uppercase", color: FG }}>Stablecoin tx volume</span>
                      <span style={{ fontFamily: FB, fontSize: 13, color: FG4, fontVariantNumeric: "tabular-nums" }}>· 2025</span>
                    </div>
                    <div style={{ position: "relative", height: "clamp(34px, 4.6vw, 64px)", background: "rgba(204,255,0,.04)", borderRadius: 2, overflow: "hidden" }}>
                      <div className="market-bar-fill" style={{
                        position: "absolute", inset: 0, "--w": 1,
                        background: "linear-gradient(90deg, #ccff00 0%, #c2f000 78%, rgba(204,255,0,.78) 100%)",
                        boxShadow: "0 0 32px rgba(204,255,0,.35), inset 0 1px 0 rgba(255,255,255,.18)",
                      }} />
                    </div>
                  </div>
                  <span className="pp-stat" style={{
                    fontSize: "clamp(52px, 7.6vw, 112px)", lineHeight: .9, color: ACID,
                    fontStretch: "125%", letterSpacing: "-.04em", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap",
                  }}>$33T</span>
                </div>

                {/* visa bar — ~50% width */}
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 14, alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: "#3a3a3a" }} />
                      <span style={{ fontFamily: FD, fontWeight: 700, fontSize: "clamp(13px, 1.4vw, 17px)", letterSpacing: ".04em", textTransform: "uppercase", color: FG2 }}>Visa</span>
                      <span style={{ fontFamily: FB, fontSize: 13, color: FG4, fontVariantNumeric: "tabular-nums" }}>· fiscal year</span>
                    </div>
                    <div style={{ position: "relative", height: "clamp(34px, 4.6vw, 64px)", background: "rgba(255,255,255,.025)", borderRadius: 2, overflow: "hidden" }}>
                      <div className="market-bar-fill" style={{
                        position: "absolute", inset: 0, "--w": 0.506,
                        background: "linear-gradient(90deg, #2c2c2c 0%, #3a3a3a 100%)",
                        borderRight: "1px solid #4a4a4a",
                      }} />
                    </div>
                  </div>
                  <span className="pp-stat" style={{
                    fontSize: "clamp(32px, 4.6vw, 64px)", lineHeight: .9, color: FG3,
                    fontStretch: "125%", letterSpacing: "-.035em", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap",
                  }}>$16.7T</span>
                </div>

              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(19px, 2.2vw, 28px)", lineHeight: 1.35,
                letterSpacing: "-.018em", color: FG2, maxWidth: 880, textWrap: "balance" }}>
                The rails we built on aren't a niche anymore.&nbsp;<span style={{ color: FG }}>They're global payment infrastructure.</span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* ==================== CHAPTER 02 · THE SLICE ==================== */}
        <div className="market-chapter">
          <ChapterStamp n="02" />
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "clamp(24px, 3.4vw, 44px)" }}>
            <Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>
                  <span style={{ color: ACID }}>02 ·</span> &nbsp;The slice
                </span>
                <h2 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125",
                  fontSize: "clamp(34px, 4.6vw, 64px)", lineHeight: 1.04, letterSpacing: "-.03em", color: FG, maxWidth: 1000 }}>
                  How much of that <span style={{ color: ACID }}>is ours.</span>
                </h2>
              </div>
            </Reveal>

            {/* funnel table */}
            <Reveal variant="up" delay={0.05}>
              <div style={{ borderBottom: "1px solid var(--pp-line)" }}>
                <FunnelRow
                  stage="TAM · Total addressable"
                  label="Stablecoin tx volume, all global flows."
                  value="$33T"
                />
                <FunnelRow
                  stage="SAM · Serviceable addressable"
                  label="Karta's reachable slice — borderless people moving money."
                  sub="$40.9M revenue @ 2.9% take rate"
                  value="$1.41B"
                  mid
                />
                <FunnelRow
                  stage="SOM · 3-5yr target"
                  label="What we plan to capture by 2030."
                  sub="$6.1M revenue @ 2.9% take rate"
                  value="$211M"
                  accent
                  big
                />
              </div>
            </Reveal>

            {/* 49% progress bar */}
            <Reveal delay={0.12}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: "clamp(8px, 1.4vw, 18px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>Progress toward SOM</span>
                  <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 13, color: FG3, fontVariantNumeric: "tabular-nums" }}>
                    <span style={{ color: ACID }}>$102.8M</span> current run-rate · <span style={{ color: FG2 }}>$211M target</span>
                  </span>
                </div>
                <div style={{ position: "relative", height: 14, background: "rgba(255,255,255,.04)", borderRadius: 2, overflow: "hidden", border: "1px solid rgba(255,255,255,.05)" }}>
                  <div className="market-prog-fill" style={{
                    position: "absolute", inset: 0, width: "100%",
                    background: "linear-gradient(90deg, #ccff00 0%, #c2f000 100%)",
                    boxShadow: "0 0 24px rgba(204,255,0,.45), inset 0 1px 0 rgba(255,255,255,.18)",
                  }} />
                  {/* tick at 49% */}
                  <span style={{ position: "absolute", left: "49%", top: -6, bottom: -6, width: 1, background: ACID, boxShadow: "0 0 8px rgba(204,255,0,.7)" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontSize: "clamp(38px, 5vw, 72px)", lineHeight: 1, letterSpacing: "-.03em", color: ACID, fontVariantNumeric: "tabular-nums" }}>49%</span>
                  <span style={{ fontFamily: FD, fontWeight: 500, fontSize: "clamp(16px, 2vw, 22px)", lineHeight: 1.35, color: FG2, textAlign: "right", maxWidth: 460 }}>
                    of the 3-5yr SOM target<br /><span style={{ color: FG }}>already at current run-rate.</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ==================== CHAPTER 03 · WHERE WE OPERATE ==================== */}
        <div className="market-chapter">
          <ChapterStamp n="03" />
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "clamp(28px, 4vw, 56px)" }}>
            <Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 12, letterSpacing: ".22em", textTransform: "uppercase", color: FG4 }}>
                  <span style={{ color: ACID }}>03 ·</span> &nbsp;Where we operate
                </span>
                <h2 style={{ margin: 0, fontFamily: FD, fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125",
                  fontSize: "clamp(34px, 4.6vw, 64px)", lineHeight: 1.04, letterSpacing: "-.03em", color: FG, maxWidth: 1000 }}>
                  Live across <span style={{ color: ACID }}>three regions.</span> Two more next.
                </h2>
              </div>
            </Reveal>

            <Reveal variant="scale" delay={0.05}>
              <GeoMap maxWidth={1200} inline={true} />
            </Reveal>

            {/* legend — two big pills */}
            <Reveal delay={0.1}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "clamp(18px, 2.2vw, 26px) clamp(20px, 2.4vw, 28px)",
                  background: "linear-gradient(135deg, rgba(204,255,0,.07), rgba(204,255,0,.015) 70%)",
                  border: "1px solid rgba(204,255,0,.28)", borderRadius: 12 }}>
                  <span style={{ flex: "none", width: 14, height: 14, borderRadius: "50%", background: ACID, boxShadow: "0 0 18px rgba(204,255,0,.6), 0 0 4px rgba(204,255,0,.9)" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: ACID }}>Live today</span>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontSize: "clamp(19px, 2.2vw, 26px)", letterSpacing: "-.015em", color: FG }}>MENA · LATAM · SE Asia</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "clamp(18px, 2.2vw, 26px) clamp(20px, 2.4vw, 28px)",
                  background: "linear-gradient(135deg, rgba(255,122,26,.06), rgba(255,122,26,.01) 70%)",
                  border: "1px solid rgba(255,122,26,.22)", borderRadius: 12 }}>
                  <span style={{ flex: "none", width: 14, height: 14, borderRadius: "50%", background: ROAD, boxShadow: "0 0 18px rgba(255,122,26,.55), 0 0 4px rgba(255,122,26,.85)" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: ROAD }}>On roadmap</span>
                    <span style={{ fontFamily: FD, fontWeight: 700, fontStretch: "125%", fontSize: "clamp(19px, 2.2vw, 26px)", letterSpacing: "-.015em", color: FG }}>USA · EU</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <p style={{ margin: 0, fontFamily: FD, fontWeight: 500, fontSize: "clamp(15px, 1.7vw, 20px)", lineHeight: 1.4,
                color: FG3, maxWidth: 760, letterSpacing: "-.01em" }}>
                Concrete markets, not aspirational TAM. Validated by team analysis and existing partner coverage.
              </p>
            </Reveal>
          </div>
        </div>

      </Section>
    </React.Fragment>
  );
}
Object.assign(window, { MarketRedesign });

