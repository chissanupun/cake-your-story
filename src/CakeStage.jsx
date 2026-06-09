// CakeStage — a drawn (SVG) base cake whose sponge + frosting reflect the chosen
// base (white cream / chocolate), with toppings sitting ON the frosting and an
// optional icing message banner. Replaces the emoji-only preview so there's
// always a real cake to show and toppings clearly land on top.
(function () {
  // base palette fallback (vanilla cream) — real palettes come from the chosen
  // flavor in window.CYS.flavors[].pal
  const DEFAULT_PAL = { sponge: '#F2DCB6', spongeDark: '#E3C595', frost: '#FFFCF6', frostShade: '#F3E7D4' };
  function palFor(baseId) {
    const list = (window.CYS && window.CYS.flavors) || [];
    const f = list.find((x) => x.id === baseId);
    return (f && f.pal) ? f.pal : DEFAULT_PAL;
  }
  const INK = '#3B2314';

  // topping resting spots on the frosting dome (as % of the box) — fallback only
  const SLOTS = [
    { l: '50%', t: '40%' }, { l: '35%', t: '45%' }, { l: '65%', t: '45%' },
    { l: '42%', t: '37%' }, { l: '58%', t: '37%' },
  ];

  // stable per-piece rotation so each placed topping has its own playful tilt
  function rotForUid(uid) {
    let h = 0; const s = String(uid);
    for (let i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) >>> 0; }
    return (h % 27) - 13;
  }

  function CakeSVG({ pal, showPlate = true }) {
    return (
      <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        {/* plate */}
        {showPlate && <ellipse cx="100" cy="164" rx="78" ry="15" fill="#FFFFFF" stroke={INK} strokeWidth="4" />}
        {showPlate && <ellipse cx="100" cy="161" rx="78" ry="13" fill={pal.frostShade} opacity="0.5" />}
        {/* sponge body */}
        <path d="M46 96 L46 150 C46 161 154 161 154 150 L154 96 Z" fill={pal.sponge} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        {/* sponge layer lines */}
        <path d="M48 122 C70 130 130 130 152 122" fill="none" stroke={pal.spongeDark} strokeWidth="3" strokeLinecap="round" />
        <path d="M48 138 C70 146 130 146 152 138" fill="none" stroke={pal.spongeDark} strokeWidth="3" strokeLinecap="round" />
        {/* frosting cap with drips */}
        <path d="M42 98 C42 70 64 58 100 58 C136 58 158 70 158 98
                 C156 108 150 110 147 120 C143 110 137 110 133 120
                 C128 131 120 131 115 120 C111 110 105 110 101 120
                 C96 131 88 131 83 120 C79 110 73 110 69 120
                 C65 110 59 110 55 120 C51 110 46 108 42 98 Z"
          fill={pal.frost} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        {/* frosting sheen */}
        <path d="M58 84 C66 74 86 70 100 71" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      </svg>
    );
  }

  function CakeStage({ baseId, packagingId = null, toppings = [], placements = null, interactive = false, onPlacementDown = null, dimUid = null, name = null, msgX = 0.5, msgY = null, onMsgDown = null, width = 216, height = 216, packagingOnly = false, toppingSize = 44, style, ...rest }) {
    const pal = palFor(baseId);
    const LAY = (window.CYS && window.CYS.packLayout) || {};
    const lay = LAY[packagingId] || LAY.none || { cakeScale: 1, cakeY: 0, plate: true, msgTop: 0.63 };

    // Packaging-selection mode: show ONLY the chosen package (no cake / toppings /
    // message), centered and scaled down so it reads as an empty vessel to fill.
    if (packagingOnly) {
      const pack = lay.vessel || lay.board || null;
      return (
        <div style={{
          position: 'relative', width, height,
          background: 'radial-gradient(120% 100% at 50% 16%, var(--frosting-100) 0%, var(--cream-300) 72%)',
          border: 'var(--bw-ink-bold) solid var(--border-ink)', borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--elev-lg)', overflow: 'hidden', ...style,
        }} {...rest}>
          <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)', width: '74%', height: '74%', borderRadius: '999px', background: 'radial-gradient(circle, rgba(255,255,255,.9) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />
          <span style={{ position: 'absolute', top: '13%', left: '15%', fontSize: '20px', color: 'var(--gold-500)', animation: 'twinkle 2.2s var(--ease-in-out) infinite' }}>✦</span>
          <span style={{ position: 'absolute', top: '20%', right: '13%', fontSize: '15px', color: 'var(--gold-500)', animation: 'twinkle 1.7s var(--ease-in-out) infinite .4s' }}>✦</span>
          {pack ? (
            <div style={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
              width: `${Math.round(pack.w * 70)}%`, zIndex: 2, pointerEvents: 'none',
            }}>
              <img src={pack.src} alt="" aria-hidden="true" draggable="false" style={{
                display: 'block', width: '100%', userSelect: 'none',
                animation: 'float-idle 6s var(--ease-in-out) infinite',
                filter: 'drop-shadow(0 10px 12px rgba(58,35,20,.14))',
              }} />
            </div>
          ) : (
            <div style={{
              position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center',
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', color: 'var(--text-muted)', padding: '24px',
            }}>Pick a package below ✦</div>
          )}
        </div>
      );
    }
    // icing-message size scales with the cake (and shrinks when the cake is
    // tucked inside a cup/box) so it reads on the cake front at any size
    const msgSize = Math.max(10, Math.round(width * 0.076 * Math.min(1, lay.cakeScale + 0.18)));
    // pieces to render: prefer free placements; else fall back to slotted toppings
    const pieces = (placements && placements.length)
      ? placements
      : toppings.slice(0, SLOTS.length).map((t, i) => ({
          uid: t.id ?? i, id: t.id, emoji: t.emoji,
          x: parseFloat(SLOTS[i].l) / 100, y: parseFloat(SLOTS[i].t) / 100,
        }));

    // lookup topping image assets by id
    const toppingDefs = (window.CYS && window.CYS.toppings) || [];
    const toppingImgFor = (id) => { const t = toppingDefs.find((x) => x.id === id); return t && t.img ? t.img : null; };

    // ---------- PHOTO MODE (cup / box / simple) ----------
    // When packaging + flavor both selected, swap SVG cake for the product photo.
    const flavorList = (window.CYS && window.CYS.flavors) || [];
    const flavorObj = flavorList.find((x) => x.id === baseId);
    const photoSrc = (() => {
      if (!flavorObj) return null;
      if (packagingId === 'cup')    return flavorObj.stageImg      || null;
      if (packagingId === 'box')    return flavorObj.boxStageImg   || null;
      if (packagingId === 'simple') return flavorObj.simpleStageImg || null;
      return null;
    })();

    if (photoSrc) {
      const toppingEls = pieces.map((p) => {
        const tImg = toppingImgFor(p.id);
        return (
          <span key={p.uid}
            onPointerDown={interactive && onPlacementDown ? (e) => onPlacementDown(e, p) : undefined}
            style={{
              position: 'absolute', zIndex: 3, left: `${p.x * 100}%`, top: `${p.y * 100}%`,
              transform: `translate(-50%,-50%) rotate(${rotForUid(p.uid)}deg)`,
              fontSize: `${Math.round(toppingSize * 0.61)}px`, lineHeight: 1, filter: 'drop-shadow(0 4px 0 rgba(58,35,20,.22))',
              animation: 'topping-land var(--dur-slow) var(--ease-spring)',
              opacity: dimUid === p.uid ? 0.25 : 1,
              cursor: interactive ? 'grab' : 'default',
              pointerEvents: interactive ? 'auto' : 'none',
              touchAction: 'none', userSelect: 'none', WebkitTapHighlightColor: 'transparent',
              transition: 'opacity var(--dur-fast) var(--ease-out)',
            }}>
            {tImg
              ? <img src={tImg} alt="" draggable="false" style={{ display: 'block', width: `${toppingSize}px`, height: `${toppingSize}px`, objectFit: 'contain', pointerEvents: 'none', userSelect: 'none' }} />
              : p.emoji}
          </span>
        );
      });
      return (
        <div style={{
          position: 'relative', width, height, background: '#fbefe4',
          border: 'var(--bw-ink-bold) solid var(--border-ink)', borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--elev-lg)', overflow: 'hidden', ...style,
        }} {...rest}>
          <img src={photoSrc} alt="" aria-hidden="true" draggable="false" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'contain', userSelect: 'none', pointerEvents: 'none',
            animation: 'float-idle 6s var(--ease-in-out) infinite',
          }} />
          {toppingEls}
          {name && (
            <div onPointerDown={onMsgDown || undefined} style={{
              position: 'absolute', left: `${msgX * 100}%`, top: `${(msgY !== null ? msgY : (lay.msgTop || 0.62)) * 100}%`, transform: 'translate(-50%,-50%)',
              width: `${Math.round(52 * Math.min(1, lay.cakeScale + 0.32))}%`, textAlign: 'center', zIndex: 4,
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: `${msgSize}px`, lineHeight: 1.08,
              color: 'var(--cherry-500)', wordBreak: 'break-word', touchAction: 'none', userSelect: 'none',
              cursor: onMsgDown ? 'grab' : 'default', pointerEvents: onMsgDown ? 'auto' : 'none',
              textShadow: '-1.4px -1.4px 0 #FFFCF6, 1.4px -1.4px 0 #FFFCF6, -1.4px 1.4px 0 #FFFCF6, 1.4px 1.4px 0 #FFFCF6, 0 1.4px 0 #FFFCF6, 0 2px 2px rgba(58,35,20,.22)',
            }}>{name}</div>
          )}
        </div>
      );
    }

    return (
      <div style={{
        position: 'relative', width, height,
        background: 'radial-gradient(120% 100% at 50% 16%, var(--frosting-100) 0%, var(--cream-300) 72%)',
        border: 'var(--bw-ink-bold) solid var(--border-ink)', borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--elev-lg)', overflow: 'hidden', ...style,
      }} {...rest}>
        {/* spotlight */}
        <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)', width: '74%', height: '74%', borderRadius: '999px', background: 'radial-gradient(circle, rgba(255,255,255,.9) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }} />
        {/* ambient sparkles */}
        <span style={{ position: 'absolute', top: '13%', left: '15%', fontSize: '20px', color: 'var(--gold-500)', animation: 'twinkle 2.2s var(--ease-in-out) infinite' }}>✦</span>
        <span style={{ position: 'absolute', top: '20%', right: '13%', fontSize: '15px', color: 'var(--gold-500)', animation: 'twinkle 1.7s var(--ease-in-out) infinite .4s' }}>✦</span>

        {/* packaging behind the cake — the board the cake sits ON (z-1) */}
        {lay.board && (
          <img src={lay.board.src} alt="" aria-hidden="true" draggable="false" style={{
            position: 'absolute', left: '50%', top: `${lay.board.top * 100}%`, transform: 'translateX(-50%)',
            width: `${lay.board.w * 100}%`, zIndex: 1, pointerEvents: 'none', userSelect: 'none',
            filter: 'drop-shadow(0 10px 10px rgba(58,35,20,.14))',
          }} />
        )}

        {/* the drawn cake (gently floats), scaled/positioned per packaging (z-2) */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          transform: `translateY(${lay.cakeY * 100}%) scale(${lay.cakeScale})`,
          transformOrigin: 'center center',
          animation: 'float-idle 6s var(--ease-in-out) infinite',
          filter: 'drop-shadow(0 8px 0 rgba(58,35,20,.10))',
        }}>
          <CakeSVG pal={pal} showPlate={lay.plate !== false} />
        </div>

        {/* toppings sitting ON the frosting — free-positioned, optionally draggable (z-3) */}
        {pieces.map((p) => {
          const tImg = toppingImgFor(p.id);
          return (
            <span key={p.uid}
              onPointerDown={interactive && onPlacementDown ? (e) => onPlacementDown(e, p) : undefined}
              style={{
                position: 'absolute', zIndex: 3, left: `${p.x * 100}%`, top: `${p.y * 100}%`,
                transform: `translate(-50%,-50%) rotate(${rotForUid(p.uid)}deg)`,
                fontSize: `${Math.round(toppingSize * 0.61)}px`, lineHeight: 1, filter: 'drop-shadow(0 4px 0 rgba(58,35,20,.22))',
                animation: 'topping-land var(--dur-slow) var(--ease-spring)',
                opacity: dimUid === p.uid ? 0.25 : 1,
                cursor: interactive ? 'grab' : 'default',
                pointerEvents: interactive ? 'auto' : 'none',
                touchAction: 'none', userSelect: 'none', WebkitTapHighlightColor: 'transparent',
                transition: 'opacity var(--dur-fast) var(--ease-out)',
              }}>
              {tImg
                ? <img src={tImg} alt="" draggable="false" style={{ display: 'block', width: `${toppingSize}px`, height: `${toppingSize}px`, objectFit: 'contain', pointerEvents: 'none', userSelect: 'none' }} />
                : p.emoji}
            </span>
          );
        })}

        {/* icing message — piped across the FRONT of the cake (z-4, under glass) */}
        {name && (
          <div onPointerDown={onMsgDown || undefined} style={{
            position: 'absolute', left: `${msgX * 100}%`, top: `${(msgY !== null ? msgY : (lay.msgTop || 0.63)) * 100}%`, transform: 'translate(-50%,-50%)',
            width: `${Math.round(52 * Math.min(1, lay.cakeScale + 0.32))}%`, textAlign: 'center', zIndex: 4,
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: `${msgSize}px`, lineHeight: 1.08,
            color: 'var(--cherry-500)', wordBreak: 'break-word', touchAction: 'none', userSelect: 'none',
            cursor: onMsgDown ? 'grab' : 'default', pointerEvents: onMsgDown ? 'auto' : 'none',
            textShadow: '-1.4px -1.4px 0 #FFFCF6, 1.4px -1.4px 0 #FFFCF6, -1.4px 1.4px 0 #FFFCF6, 1.4px 1.4px 0 #FFFCF6, 0 1.4px 0 #FFFCF6, 0 2px 2px rgba(58,35,20,.22)',
          }}>{name}</div>
        )}

        {/* packaging in FRONT of the cake — transparent glass cup/box overlay
            (z-6). pointerEvents:none so toppings stay grabbable through it. */}
        {lay.vessel && (
          <img src={lay.vessel.src} alt="" aria-hidden="true" draggable="false" style={{
            position: 'absolute', left: '50%', top: `${lay.vessel.top * 100}%`, transform: 'translateX(-50%)',
            width: `${lay.vessel.w * 100}%`, zIndex: 6, pointerEvents: 'none', userSelect: 'none',
            filter: 'drop-shadow(0 8px 9px rgba(58,35,20,.10))',
          }} />
        )}
      </div>
    );
  }

  window.CakeStage = CakeStage;
})();
