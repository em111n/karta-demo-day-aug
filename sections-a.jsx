/* Karta - Investor Deck · Header + Hero (3 variants) + sections 2-4 */
const { useState: uS, useEffect: uE, useRef: uR } = React;

/* ============================================================
   NAV - sticky collapsible mega-menu
   ============================================================ */
const SECTIONS = [
  { n: "01", label: "Demo Day", id: "mission" },
  { n: "02", label: "Context", id: "context" },
  { n: "03", label: "Product", id: "product" },
  { n: "04", label: "Delivery", id: "delivery" },
  { n: "05", label: "Marketing", id: "marketing" },
  { n: "06", label: "Design", id: "design" },
  { n: "07", label: "Support", id: "support" },
  { n: "08", label: "HR · Hiring", id: "hr" },
  { n: "09", label: "OPS", id: "ops" },
  { n: "10", label: "Q&A", id: "qa" },
];

function MenuIcon({ open }) {
  const bar = { display: "block", position: "absolute", left: 0, width: 22, height: 2, background: "#fafafa", borderRadius: 4, transition: "transform .4s cubic-bezier(.44,0,.16,1), top .4s cubic-bezier(.44,0,.16,1)" };
  return (
    <span style={{ position: "relative", width: 22, height: 12, display: "inline-block" }}>
      <span style={{ ...bar, top: open ? 5 : 2, transform: open ? "rotate(45deg)" : "none" }} />
      <span style={{ ...bar, top: open ? 5 : 8, transform: open ? "rotate(-45deg)" : "none" }} />
    </span>
  );
}

function Header({ active }) {
  const [open, setOpen] = uS(false);
  const [solid, setSolid] = uS(false);
  const [copied, setCopied] = uS(false);
  const pillRef = uR(null);
  const copyEmail = () => { try { navigator.clipboard.writeText("olsamo@karta.io"); } catch (e) {} setCopied(true); setTimeout(() => setCopied(false), 1800); };
  uE(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  uE(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        if (document.activeElement && typeof document.activeElement.blur === "function") {
          document.activeElement.blur();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  uE(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (pillRef.current && !pillRef.current.contains(e.target)) {
        setOpen(false);
        if (document.activeElement && typeof document.activeElement.blur === "function") {
          document.activeElement.blur();
        }
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);
  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const sticky = getComputedStyle(el).position === "sticky";
    const target = (sticky && el.nextElementSibling) ? el.nextElementSibling : el;
    const dest = target.getBoundingClientRect().top + window.scrollY - 90;
    const distance = Math.abs(dest - window.scrollY);
    if (distance < window.innerHeight * 1.5) {
      window.scrollTo({ top: dest, behavior: "smooth" });
      return;
    }
    let overlay = document.getElementById("__nav_fade");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "__nav_fade";
      overlay.style.cssText = "position:fixed;inset:0;background:#040404;z-index:9999;opacity:0;pointer-events:none;transition:opacity .22s ease";
      document.body.appendChild(overlay);
    }
    overlay.style.opacity = "0";
    requestAnimationFrame(() => requestAnimationFrame(() => { overlay.style.opacity = "1"; }));
    setTimeout(() => {
      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, dest);
      html.style.scrollBehavior = prev;
      setTimeout(() => { overlay.style.opacity = "0"; }, 30);
    }, 240);
  };
  return (
    <header style={{ position: "fixed", top: 16, left: 0, right: 0, zIndex: 60, width: "min(100% - 28px, 1000px)", margin: "0 auto" }}>
      <div ref={pillRef} style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: open ? "min(100%, 900px)" : "min(100%, 300px)",
        background: "rgba(20,20,20,0.55)",
        backdropFilter: "blur(22px) saturate(165%)", WebkitBackdropFilter: "blur(22px) saturate(165%)",
        border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, overflow: "hidden",
        boxShadow: open
          ? "0 30px 80px rgba(0,0,0,.55)"
          : (solid ? "0 8px 30px rgba(0,0,0,.35)" : "none"),
        transition: "width .55s cubic-bezier(.44,0,.16,1), box-shadow .4s, background .4s",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 58, pointerEvents: "none", background: "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0) 70%)" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 58 }}>
          <a href="#mission" onClick={(e) => { e.preventDefault(); go("mission"); }} style={{ display: "flex", alignItems: "center" }}>
            <img src="assets/karta-logo-white.svg" alt="Karta" style={{ height: 19 }} />
          </a>
          <button onClick={() => setOpen(!open)} aria-expanded={open}
            style={{ display: "flex", alignItems: "center", gap: 11, background: "transparent", border: "none", cursor: "pointer", color: "#fafafa", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 17 }}>
            <MenuIcon open={open} />
            <span>{open ? "Close" : "Menu"}</span>
          </button>
        </div>
        <div style={{ maxHeight: open ? 620 : 0, opacity: open ? 1 : 0, overflow: "hidden", transition: open
          ? "max-height .55s cubic-bezier(.44,0,.16,1) .05s, opacity .35s ease"
          : "max-height .3s cubic-bezier(.55,0,.4,1) .08s, opacity .2s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 14, padding: "6px 16px 18px" }}>
            <nav style={{ background: "rgba(13,13,13,0.5)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 10px", display: "grid", gridTemplateColumns: "1fr 1fr", gridAutoFlow: "column", gridTemplateRows: "repeat(7, auto)", gap: "2px 14px", alignContent: "start" }}>
              {SECTIONS.map((it, i) => {
                const on = active === it.id;
                return (
                  <button key={it.id} onClick={() => go(it.id)}
                    style={{ textAlign: "left", background: "transparent", border: "none", cursor: "pointer", padding: "9px 12px", borderRadius: 8, display: "flex", alignItems: "baseline", gap: 12,
                      color: on ? "var(--pp-acid)" : "#fafafa", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 19, letterSpacing: "-.01em",
                      whiteSpace: "nowrap",
                      transition: "color .2s, background .2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; if (!on) e.currentTarget.style.color = "var(--pp-acid)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; if (!on) e.currentTarget.style.color = "#fafafa"; }}>
                    <span style={{ fontSize: 12, color: on ? "var(--pp-acid)" : "var(--pp-fg-4)", fontVariantNumeric: "tabular-nums" }}>{it.n}</span>
                    {it.label}
                  </button>
                );
              })}
            </nav>
            <div style={{ padding: "12px 8px", display: "flex", flexDirection: "column", gap: 18, transform: open ? "translateY(0)" : "translateY(6px)", opacity: open ? 1 : 0, transition: open
              ? "transform .5s cubic-bezier(.44,0,.16,1) .12s, opacity .5s ease .12s"
              : "transform .22s ease-in, opacity .18s ease-in" }}>
              <h3 style={{ margin: 0, fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 26, color: "#fafafa", letterSpacing: "-.01em" }}>Get in touch.</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <p className="pp-body" style={{ margin: 0, fontSize: 14 }}>Jana Olsamo · Karta</p>
                <button onClick={copyEmail} style={{ display: "inline-flex", alignItems: "center", gap: 10, alignSelf: "flex-start", background: "var(--pp-control)", border: "none", borderRadius: 8, padding: "9px 13px", cursor: "pointer" }}>
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="#fafafa" strokeWidth="1.5"><rect x="6" y="6" width="8" height="8" rx="1.5"/><path d="M11.5 6V5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 5v5A1.5 1.5 0 0 0 5 11.5h1"/></svg>
                  <span className="pp-body" style={{ color: "#fafafa", fontSize: 14 }}>{copied ? "Email copied" : "olsamo@karta.io"}</span>
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <p className="pp-body" style={{ margin: 0, fontSize: 14 }}>Join Karta</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    { k: "ig", label: "Instagram", url: "https://www.instagram.com/karta.personal" },
                    { k: "tg", label: "@karta_news", url: "https://t.me/karta_news" },
                    { k: "x", label: "X", url: "https://x.com/Karta_Personal" },
                    { k: "in", label: "LinkedIn", url: "https://www.linkedin.com/company/joinkarta/" },
                  ].map(s => (
                    <a key={s.k} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      style={{ width: 44, height: 44, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", color: "#fafafa", borderRadius: 999, textDecoration: "none", transition: "background .2s, border-color .2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(204,255,0,.08)"; e.currentTarget.style.borderColor = "rgba(204,255,0,.35)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; }}>
                      <svg width="20" height="20" viewBox="0 0 18 18" fill="#fafafa"><path d={socials[s.k]} /></svg>
                    </a>
                  ))}
                </div>
              </div>
              <a href="https://t.me/karta" target="_blank" rel="noopener noreferrer"
                style={{ marginTop: 4, display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 10, background: "var(--pp-acid)", color: "#0a0a0a", borderRadius: 999, padding: "12px 22px", textDecoration: "none", fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 15, letterSpacing: "-.01em" }}>
                <svg width="22" height="12" viewBox="43 93 202 104" fill="none" aria-hidden="true">
                  <path d="M234.659 93C242.077 93.0008 245.789 101.965 240.544 107.203L208.596 139.111C205.348 142.355 205.339 147.628 208.596 150.877L240.537 182.793C245.78 188.031 242.064 196.993 234.645 196.993L181.527 197C179.319 196.994 177.201 196.122 175.641 194.565L128.471 147.44C126.912 145.88 124.797 145.003 122.586 145.006H51.3258C46.7329 145.006 43.0004 141.288 43 136.688V101.329C43.003 96.7399 46.7247 93.0119 51.3325 93.009H117.709C122.302 93.0149 126.032 96.7307 126.035 101.331V124.924C126.036 132.336 135.008 136.047 140.253 130.809L175.646 95.4526C177.205 93.8931 179.325 93.0188 181.536 93.0157L234.654 93.009V93H234.659Z" fill="#0a0a0a"/>
                </svg>
                Karta App
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   HERO - sticky recede stage (shared by A & C)
   ============================================================ */
function useHeroRecede(cardRef, secRef) {
  uE(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, startY = 0;
    const measure = () => { if (secRef.current) startY = secRef.current.getBoundingClientRect().top + window.scrollY; };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!cardRef.current || reduce) return;
        const vh = window.innerHeight;
        const p = Math.min(Math.max((window.scrollY - startY) / (vh * 0.85), 0), 1);
        cardRef.current.style.transform = `rotateX(${p * 9}deg) scale(${1 - p * 0.14}) translateY(${p * -5}%)`;
        cardRef.current.style.opacity = String(1 - p * 0.5);
      });
    };
    setTimeout(measure, 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { measure(); onScroll(); });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
}

function HeroShaderBg({ intensity = 1, blur = 95, bias }) {
  const ref = uR(null);
  uE(() => {
    let h;
    if (ref.current && window.KartaHeroShader) h = window.KartaHeroShader.mount(ref.current, { acid: "#ccff00", blur, intensity, bias, interactive: true });
    return () => h && h.destroy();
  }, []);
  return <div ref={ref} style={{ position: "absolute", inset: 0 }} />;
}

/* ---- Variant A - Aurora (centered, reference-style) ---- */
function HeroAurora() {
  const cardRef = uR(null), secRef = uR(null);
  useHeroRecede(cardRef, secRef);
  return (
    <section id="mission" data-screen-label="01 Mission" ref={secRef} style={{ position: "sticky", top: 0, zIndex: 0, height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, perspective: "1400px", perspectiveOrigin: "50% 0%" }}>
      <div ref={cardRef} style={{ position: "relative", width: "100%", height: "100%", borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30, padding: 48, background: "#040404", transformOrigin: "50% 0%", willChange: "transform, opacity" }}>
        <HeroShaderBg intensity={1} />
        <img src="assets/karta-logo-white.svg" alt="Karta" style={{ position: "absolute", top: 36, height: 22, opacity: .92 }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 26, maxWidth: 1000 }}>
          <span className="pp-rise" style={{ animationDelay: ".05s" }}><Label variant="light">demo day · July 10 2026</Label></span>
          <h1 style={{ margin: 0, textAlign: "center", fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(40px,6.6vw,92px)", lineHeight: 1.02, letterSpacing: "-.025em", color: "#fafafa" }}>
            <Stagger text="Money as borderless" base={0.15} /><br />
            <Stagger text="as the people who use it." base={0.5} />
          </h1>
          <h2 className="pp-rise pp-lead" style={{ animationDelay: "1.15s", margin: 0, textAlign: "center", maxWidth: 640, fontSize: "clamp(20px,2.4vw,30px)" }}>
            One wallet to earn, hold, spend and send - anywhere.
          </h2>
          <div className="pp-rise" style={{ animationDelay: "1.35s", display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 6 }}>
            <Button href="https://t.me/karta" target="_blank" rel="noopener noreferrer">Launch app</Button>
            <Button href="#problem" onClick={scrollToCb("problem")} variant="ghost">Explore the round</Button>
            <Button href="#ask" onClick={scrollToCb("ask")} variant="ghost" arrow={false}>The ask</Button>
          </div>
        </div>
        <p className="pp-rise pp-caption" style={{ animationDelay: "1.5s", position: "absolute", bottom: 30, margin: 0, letterSpacing: ".04em" }}>Our mission - to make money as free as the people who use it.</p>
      </div>
    </section>
  );
}

/* ---- Variant B - Split editorial (headline + product slot) ---- */
function HeroSplit() {
  const cardRef = uR(null), secRef = uR(null);
  useHeroRecede(cardRef, secRef);
  return (
    <section id="mission" data-screen-label="01 Mission" ref={secRef} style={{ position: "sticky", top: 0, zIndex: 0, height: "100dvh", display: "flex", alignItems: "center", padding: 0, overflow: "hidden", perspective: "1400px", perspectiveOrigin: "50% 0%" }}>
      <div ref={cardRef} style={{ position: "relative", width: "100%", height: "100%", borderRadius: 0, overflow: "hidden", display: "flex", alignItems: "center", padding: "clamp(32px,4.5vw,84px) 24px", background: "#040404", transformOrigin: "50% 0%", willChange: "transform, opacity" }}>
      <HeroShaderBg intensity={.85} bias="right" />
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(0,.85fr)", gap: 56, alignItems: "center" }} className="hero-split-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <span className="pp-rise" style={{ animationDelay: ".05s" }}><Label variant="acid">demo day · July 10 2026</Label></span>
          <h1 style={{ margin: 0, fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(44px,5.6vw,86px)", lineHeight: 1.0, letterSpacing: "-.03em", color: "#fafafa" }}>
            <Stagger text="Money as borderless" base={0.12} step={0.02} /><br /><Stagger text="as the people" base={0.45} step={0.02} /> <span style={{ color: "var(--pp-acid)" }}><Stagger text="who use it." base={0.7} step={0.03} /></span>
          </h1>
          <p className="pp-rise pp-body hero-desc" style={{ animationDelay: "1.0s", margin: 0, fontSize: 20 }}>
            One wallet to earn, hold, spend and send across any country.
          </p>
          <div className="pp-rise" style={{ animationDelay: "1.15s", display: "flex", gap: 12, flexWrap: "wrap" }}>
            <PillButton href="#problem" onClick={scrollToCb("problem")} variant="accent" glyph="arrow">Explore the round</PillButton>
            <PillButton href="#traction" onClick={scrollToCb("traction")} glyph="trend">See traction</PillButton>
          </div>
        </div>
        <div aria-hidden="true" />
      </div>
      <img className="pp-rise" src="assets/karta-hand-hero.webp" alt="Karta app in hand" style={{ animationDelay: ".6s", position: "absolute", right: "clamp(0px,3vw,70px)", bottom: "calc(-12vh - 20px)", height: "102vh", width: "auto", maxWidth: "54%", objectFit: "contain", objectPosition: "top center", zIndex: 1, pointerEvents: "none", filter: "drop-shadow(0 36px 90px rgba(0,0,0,.6))" }} />
      <PartnerMarquee />
      </div>
    </section>
  );
}

/* running partner / ecosystem strip - white logos on charcoal chips, pinned to the hero's bottom edge */
const PARTNERS = [
  { src: "assets/partners/tempo.svg", alt: "Tempo", h: 22 },
  { src: "assets/partners/privy.svg", alt: "Privy", h: 19 },
  { src: "assets/partners/rain.svg", alt: "Rain", h: 22 },
  { src: "assets/partners/visa.svg", alt: "Visa", h: 21 },
  { src: "assets/partners/sumsub.svg", alt: "Sumsub", h: 21 },
  { src: "assets/partners/due.svg", alt: "Due", h: 24 },
];
function PartnerMarquee() {
  /* Duplicate enough times so the rail covers Apple Studio (2560px+) viewports.
     The animation translates by -50%, so two halves are required at minimum;
     triple+ the source list gives generous overflow at all sizes. */
  const row = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <div className="hero-partners pp-rise" style={{ animationDelay: "1.5s", position: "absolute", left: 0, right: 0, bottom: "clamp(8px,1.5vw,22px)", zIndex: 4, display: "flex", flexDirection: "column", gap: 14, pointerEvents: "none" }}>
      <div style={{ padding: "0 clamp(32px,4.5vw,84px)", width: "100%", boxSizing: "border-box" }}>
        <span style={{ display: "block", maxWidth: 1440, width: "100%", margin: "0 auto", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--pp-fg-4)" }}>
          <span style={{ color: "var(--pp-acid)" }}>[</span>&nbsp;Karta Ecosystem&nbsp;<span style={{ color: "var(--pp-acid)" }}>]</span>
        </span>
      </div>
      <div style={{ width: "100%", overflow: "hidden", maskImage: "linear-gradient(90deg, transparent 0, #000 2%, #000 98%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 2%, #000 98%, transparent 100%)" }}>
        <div className="pp-partner-marquee" style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", minWidth: "200%" }}>
          {row.map((p, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 60, padding: "0 clamp(28px,3vw,52px)", flexShrink: 0 }}>
              <img src={p.src} alt={p.alt} style={{ height: p.h, width: "auto", objectFit: "contain", opacity: .7, display: "block" }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
function HeroStatement() {
  const cardRef = uR(null), secRef = uR(null);
  useHeroRecede(cardRef, secRef);
  return (
    <section id="mission" data-screen-label="01 Mission" ref={secRef} style={{ position: "sticky", top: 0, zIndex: 0, height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, perspective: "1500px", perspectiveOrigin: "50% 0%" }}>
      <div ref={cardRef} style={{ position: "relative", width: "100%", height: "100%", borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(32px,5vw,72px)", background: "#040404", transformOrigin: "50% 0%", willChange: "transform, opacity" }}>
        <HeroShaderBg intensity={.55} blur={105} />
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <img src="assets/karta-logo-white.svg" alt="Karta" style={{ height: 22, opacity: .92 }} />
          <span className="pp-rise" style={{ animationDelay: ".1s" }}><Label variant="light">demo day · July 10 2026</Label></span>
        </div>
        <h1 style={{ position: "relative", margin: 0, maxWidth: 1100, fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontVariationSettings: "'wght' 800,'wdth' 125", fontSize: "clamp(44px,8.2vw,128px)", lineHeight: .98, letterSpacing: "-.035em", color: "#fafafa" }}>
          <Stagger text="Money as" base={0.15} /> <span style={{ color: "var(--pp-acid)" }}><Stagger text="free" base={0.45} /></span><br />
          <Stagger text="as the people" base={0.65} /><br />
          <Stagger text="who use it." base={1.0} />
        </h1>
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
          <p className="pp-rise pp-body" style={{ animationDelay: "1.3s", margin: 0, maxWidth: 460, fontSize: 18, color: "var(--pp-fg-2)" }}>
            A self-custody money app for people without borders. Borderless as the people who use it.
          </p>
          <div className="pp-rise" style={{ animationDelay: "1.4s" }}>
            <Button href="#problem" onClick={scrollToCb("problem")}>Explore the round</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function scrollToCb(id) {
  return (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const sticky = getComputedStyle(el).position === "sticky";
    const target = (sticky && el.nextElementSibling) ? el.nextElementSibling : el;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
  };
}

function Hero({ variant }) {
  if (variant === "split") return <HeroSplit />;
  if (variant === "statement") return <HeroStatement />;
  return <HeroAurora />;
}

/* spacer so sticky hero scrolls away naturally for A & C */
function HeroSpacer({ variant }) {
  if (variant === "split") return null;
  return <div style={{ height: "10vh" }} />;
}

/* ============================================================
   02 - WHO WE SERVE
   ============================================================ */
const BEHAVIORS = [
  { k: "Earn", rest: " in any currency", who: "Freelancers, remote workers, Web3 contributors, creators, influencers", v: "earn" },
  { k: "Spend", rest: " in any country", who: "Digital nomads, frequent travelers, expats", v: "spend" },
  { k: "Send", rest: " to anyone", who: "Migrants, distributed families, cross-border senders", v: "send" },
];
function WhoWeServe() {
  const heroRef = uR(null);
  const cardsRef = uR(null);
  const [heroShown, setHeroShown] = uS(false);
  uE(() => {
    const node = cardsRef.current;
    if (!node) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setHeroShown(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setHeroShown(true); io.unobserve(e.target); }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <React.Fragment>
      <SectionHero id="who" num="02" kicker="target audience" align="left"
        parts={[{ t: "Built for" }, { br: true }, { t: "borderless people.", hi: true }]}
        lead="They earn in one currency, live in another and send to a third." />
      <Section tightTop dataLabel="02 Target audience · detail">
      <img ref={heroRef} src="assets/man-2.webp" alt="" aria-hidden="true" className="hero-media" style={{
        position: "absolute", top: -296, right: "max(24px, calc(50% - 720px))",
        width: "clamp(243px, 24.32vw, 380px)", objectFit: "contain", objectPosition: "top right",
        pointerEvents: "none", zIndex: 0,
        opacity: heroShown ? 1 : 0,
        transform: heroShown ? "translate3d(0, 0, 0) scale(1)" : "translate3d(46px, -28px, 0) scale(.94)",
        filter: heroShown ? "blur(0)" : "blur(6px)",
        transition: "opacity 1.1s cubic-bezier(.22, .61, .36, 1), transform 1.2s cubic-bezier(.22, .61, .36, 1), filter .9s cubic-bezier(.22, .61, .36, 1)",
        willChange: "opacity, transform, filter",
      }} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
      <div ref={cardsRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="grid-3">
        {BEHAVIORS.map((b, i) => (
          <Reveal key={b.k} delay={i * 0.08}>
            <HCard hover style={{ minHeight: 240, justifyContent: "space-between", gap: 28 }}>
              <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%", fontSize: 13, color: "var(--pp-fg-4)", letterSpacing: ".08em" }}>0{i + 1}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <h3 className="pp-h3" style={{ margin: 0, fontSize: 26 }}><span style={{ color: "var(--pp-acid)" }}>{b.k}</span>{b.rest}</h3>
                <p className="pp-body" style={{ margin: 0, minHeight: "2.9em" }}>{b.who}</p>
              </div>
            </HCard>
          </Reveal>
        ))}
      </div>
      </div>

      <Reveal delay={0.1}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }} className="ratio-block">
          <span className="pp-stat" style={{ flexShrink: 0, fontSize: 150, lineHeight: 0.85, fontStretch: "125%", color: "var(--pp-acid)" }}>2<span style={{ color: "var(--pp-fg-4)", fontSize: 72 }}>/3</span></span>
          <div className="ratio-rule" style={{ width: 1, alignSelf: "stretch", background: "var(--pp-line)" }}></div>
          <h3 className="pp-h3" style={{ margin: 0, fontFamily: "var(--pp-font-body)", fontWeight: 400, fontSize: 26, lineHeight: 1.3, color: "var(--pp-fg)" }}>
            do at least two of the three -<br /><span style={{ color: "var(--pp-acid)", fontFamily: "var(--pp-font-display)", fontWeight: 800, fontStretch: "125%" }}>so we built a bank that fits them.</span>
          </h3>
        </div>
      </Reveal>
      </Section>
    </React.Fragment>
  );
}

/* ============================================================
   03 - PROBLEM
   ============================================================ */
const PRODUCT_LOGOS = {
  "MetaMask": "assets/logo-metamask.webp",
  "Trust Wallet": "assets/logo-trustwallet-cropped.webp",
  "Phantom": "assets/logo-phantom.webp",
  "Wise": "assets/logo-wise.webp",
  "NBD": "assets/logo-nbd.webp",
  "N26": "assets/logo-n26.webp",
  "Revolut": "assets/logo-revolut.webp",
  "Wise card": "assets/logo-wise.webp",
  "Remitly": "assets/logo-remitly.webp",
  "Western Union": "assets/logo-westernunion.webp",
  "WorldRemit": "assets/logo-worldremit.webp",
  "Coinbase": "assets/logo-coinbase.webp",
  "Binance": "assets/logo-binance.webp",
  "eToro": "assets/logo-etoro.webp",
};
const FIVE_APPS = [
  { t: "Receive", d: "Crypto wallet for stablecoins", ex: ["MetaMask", "Trust Wallet", "Phantom"] },
  { t: "Deposit fiat", d: "Local bank account", ex: ["Wise", "NBD", "N26"] },
  { t: "Spend abroad", d: "Multi-currency card", ex: ["Revolut", "Wise card", "N26"] },
  { t: "Send to family", d: "Remittance app", ex: ["Remitly", "Western Union", "WorldRemit"] },
  { t: "Hold value", d: "Broker / stablecoin app", ex: ["Coinbase", "Binance", "eToro"] },
];
const PAINS = [
  { t: "Complex", d: "Moving money across borders takes five separate tools. Five apps, five logins, five support lines - none of them talk to each other." },
  { t: "Slow", d: "Money still moves at the speed of borders. SWIFT takes days, local rails stop at the edge, and crypto breaks the moment it hits cash-out." },
  { t: "Expensive", d: "There's a cut on both sides. Banks and transfer operators take a fee on fiat - and crypto P2P charges a premium just to move in or out." },
];
function Problem() {
  return (
    <React.Fragment>
      <SectionHero id="problem" num="02" kicker="problem" align="left"
        parts={[{ t: "The world has people without borders. " }, { t: "Money still has them.", hi: true }]}
        lead={<React.Fragment>Banks are simple but trapped. Crypto is global but complex. Borderless people stitch <span style={{ color: "var(--pp-acid)", fontWeight: 700 }}>five apps</span> together - and pay a border tax on every move.</React.Fragment>} />
      <Section tightTop dataLabel="03 Problem · detail">
      {/* five fragmented apps */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }} className="grid-5">
        {FIVE_APPS.map((a, i) => (
          <Reveal key={a.t} delay={i * 0.07} style={{ height: "100%" }}>
            <div style={{ background: "var(--pp-card)", border: "1px solid #1a1a1a", borderRadius: 12, height: "100%", minHeight: 150, display: "flex", overflow: "hidden" }}>
              <div style={{ flex: "0 0 44px", display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 20, borderRight: "1px solid #1e1e1e", fontFamily: "var(--pp-font-display)", fontWeight: 700, fontSize: 17, lineHeight: 1.3, color: "var(--pp-acid)" }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14, flex: 1, minWidth: 0 }}>
                <div>
                  <h4 style={{ margin: 0, fontFamily: "var(--pp-font-display)", fontWeight: 600, fontSize: 17, lineHeight: 1.3, color: "var(--pp-fg)" }}>{a.t}</h4>
                  <p style={{ margin: "6px 0 0", fontSize: 16, lineHeight: 1.5, color: "var(--pp-fg-3)" }}>{a.d}</p>
                </div>
                <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                  {a.ex.some((p) => PRODUCT_LOGOS[p]) && (
                    <div style={{ display: "flex" }}>
                      {a.ex.filter((p) => PRODUCT_LOGOS[p]).map((p, idx) => (
                        <img key={p} src={PRODUCT_LOGOS[p]} alt={p} title={p}
                          style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", background: "#fff", border: "2px solid var(--pp-card)", marginLeft: idx === 0 ? 0 : -11, position: "relative", zIndex: 10 - idx }} />
                      ))}
                    </div>
                  )}
                  {a.ex.filter((p) => !PRODUCT_LOGOS[p]).map((p) => (
                    <span key={p} style={{ display: "inline-flex", alignItems: "center", padding: "3px 9px", borderRadius: 4, background: "#141414", border: "1px solid #242424", fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 12, color: "var(--pp-fg-3)" }}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* three pains */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="grid-3">
        {PAINS.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.08}>
            <HCard hover style={{ minHeight: 200, justifyContent: "space-between", gap: 20 }}>
              <h3 className="pp-h3" style={{ margin: 0, fontSize: 24, color: "var(--pp-acid)" }}>{p.t}</h3>
              <p className="pp-body" style={{ margin: 0 }}>{p.d}</p>
            </HCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.05}>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 4vw, 36px)", flexWrap: "wrap", background: "var(--pp-card)", border: "1px solid var(--pp-line)", borderRadius: 12, padding: "clamp(22px, 5vw, 32px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: "0 0 auto" }}>
            <span className="pp-stat" style={{ fontSize: "clamp(48px, 13vw, 80px)", lineHeight: 1, whiteSpace: "nowrap" }}><CountUp to={15} dur={1400} format={(v) => "5-" + Math.round(v) + "%"} /></span>
            <span style={{ fontFamily: "var(--pp-font-display)", fontWeight: 500, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--pp-fg-4)" }}>of every transfer</span>
          </div>
          <h3 className="pp-h3" style={{ margin: 0, fontWeight: 500, maxWidth: 560, fontSize: "clamp(17px, 4.4vw, 22px)", lineHeight: 1.35, color: "var(--pp-fg-2)", flex: "1 1 200px", minWidth: 0 }}>
            Lost to fees, FX spreads, and hidden markups.
          </h3>
        </div>
      </Reveal>
      </Section>
    </React.Fragment>
  );
}

Object.assign(window, { Header, Hero, HeroSpacer, SECTIONS, WhoWeServe, Problem, scrollToCb });
