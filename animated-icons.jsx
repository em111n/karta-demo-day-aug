/* Karta - animated Lucide icons (Path A: hand-ported, no framer-motion).
   Lucide geometry (24×24, 2px round stroke, currentColor), restrained micro-motion.
   Triggers: hover the host (play prop) + a one-time pulse when scrolled into view.
   Static / print / reduced-motion always shows the fully-drawn icon. */
const { useState: icS, useEffect: icE, useRef: icR } = React;

/* one-time style injection (keeps index.html clean) */
(function injectIconCSS() {
  if (document.getElementById("aicon-css")) return;
  const s = document.createElement("style");
  s.id = "aicon-css";
  s.textContent = `
  .aicon{display:inline-flex;align-items:center;justify-content:center;color:var(--pp-acid);line-height:0}
  .aicon svg{width:var(--ai-size,22px);height:var(--ai-size,22px);display:block;overflow:visible;fill:none;stroke:currentColor}
  .aicon g,.aicon path,.aicon line,.aicon rect{transform-box:fill-box;transform-origin:center;stroke:currentColor}
  /* draw paths sit fully-drawn at rest (offset 0); the pulse runs 1 -> 0 */
  .aicon [data-draw]{stroke-dasharray:1;stroke-dashoffset:0}

  .aicon--on .recv-move{animation:aiRecv .6s cubic-bezier(.44,0,.16,1)}
  @keyframes aiRecv{0%{transform:translateY(-4px);opacity:.35}60%{transform:translateY(1px);opacity:1}100%{transform:translateY(0)}}

  .aicon--on .store-check{animation:aiDraw .6s cubic-bezier(.44,0,.16,1)}
  .aicon--on .card-stripe{animation:aiDraw .5s cubic-bezier(.44,0,.16,1)}
  .aicon--on .earn-line{animation:aiDraw .72s cubic-bezier(.44,0,.16,1)}
  @keyframes aiDraw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}

  .aicon--on .send-move{animation:aiSend .62s cubic-bezier(.44,0,.16,1)}
  @keyframes aiSend{0%{transform:translate(0,0)}45%{transform:translate(3px,-3px)}100%{transform:translate(0,0)}}

  @media (prefers-reduced-motion: reduce){
    .aicon--on .recv-move,.aicon--on .store-check,.aicon--on .card-stripe,
    .aicon--on .earn-line,.aicon--on .send-move{animation:none !important}
  }`;
  document.head.appendChild(s);
})();

const ICON_GLYPHS = {
  /* arrow-down-to-line */
  receive: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="21" x2="19" y2="21" />
      <g className="recv-move"><path d="M12 17V3" /><path d="m6 11 6 6 6-6" /></g>
    </svg>
  ),
  /* shield-check */
  store: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path className="store-check" data-draw pathLength="1" d="m9 12 2 2 4-4" />
    </svg>
  ),
  /* credit-card */
  spend: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line className="card-stripe" data-draw pathLength="1" x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  /* send */
  send: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <g className="send-move">
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
        <path d="m21.854 2.147-10.94 10.939" />
      </g>
    </svg>
  ),
  /* trending-up */
  earn: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path className="earn-line" data-draw pathLength="1" d="m22 7-8.5 8.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </svg>
  ),
};

/* play = parent-controlled (e.g. row hover); also self-pulses once on reveal */
function AnimatedIcon({ name, play = false, size = 22 }) {
  const ref = icR(null);
  const [pulse, setPulse] = icS(false);
  icE(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) {
        setPulse(true);
        setTimeout(() => setPulse(false), 820);
        io.disconnect();
      }
    }, { threshold: 0.7 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const on = play || pulse;
  return (
    <span ref={ref} className={"aicon" + (on ? " aicon--on" : "")} style={{ "--ai-size": size + "px" }}>
      {ICON_GLYPHS[name] || null}
    </span>
  );
}

window.AnimatedIcon = AnimatedIcon;
