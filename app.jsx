/* Karta - Investor Deck · app shell: assembles sections, scroll-spy */
const { useState: aS, useEffect: aE, useRef: aRf } = React;

/* ONE shared mesh shader behind the whole deck (fixed, pointer-through). */
/* scroll progress bar - DOM-driven (no React re-render per scroll frame) */
function Progress() {
  const ref = aRf(null);
  aE(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (ref.current) ref.current.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} style={{ position: "fixed", top: 0, left: 0, height: 2, width: "0%", background: "var(--pp-acid)", zIndex: 80, transition: "width .1s linear" }} />;
}

function App() {
  const [active, setActive] = aS("mission");

  /* On-mount: scroll to hash target (Babel finishes compiling after
     the browser has already tried the native jump — do it ourselves) */
  aE(() => {
    const hash = window.location.hash?.slice(1);
    if (!hash) return;
    let tries = 0;
    const tick = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ block: "start", behavior: "instant" });
      } else if (tries++ < 20) {
        setTimeout(tick, 80);
      }
    };
    tick();
  }, []);

  /* scroll-spy (rAF-throttled) */
  aE(() => {
    const ids = SECTIONS.map((s) => s.id);
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const mid = window.scrollY + window.innerHeight * 0.35;
        let cur = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top + window.scrollY <= mid) cur = id;
        }
        setActive(cur);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <React.Fragment>
      <Progress />
      <Header active={active} />
      <div className="chapter" style={{ position: "relative" }}><DemoHero /></div>
      <div className="chapter" style={{ position: "relative" }}><DemoContext /></div>
      <div className="chapter" style={{ position: "relative" }}><DemoProduct /></div>
      <div className="chapter" style={{ position: "relative" }}><DemoDelivery /></div>
      <div className="chapter" style={{ position: "relative" }}><DemoMarketing /></div>
      <div className="chapter" style={{ position: "relative" }}><DemoDesign /></div>
      <div className="chapter" style={{ position: "relative" }}><DemoSupport /></div>
      <div className="chapter" style={{ position: "relative" }}><DemoHR /></div>
      <div className="chapter" style={{ position: "relative" }}><DemoOPS /></div>
      <div className="chapter" style={{ position: "relative" }}><DemoQA /></div>
      <DemoOutro />
      <Lightbox />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
