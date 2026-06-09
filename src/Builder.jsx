// Builder — persistent live cake preview + packaging / flavor / toppings / message / theme steps.
// Renders either the mobile column layout or a desktop two-pane layout (desktop prop).
(function () {
  const { Button, ChoiceCard, CakePreview, Badge, Toast, Drip, Input } = window.BakeSpaceDSCakeYourStory_aae867;
  const { FloatingStickers, Progress, Logo } = window.CYSUI;
  const { CakeStage } = window;
  const D = window.CYS;

  const STEPS = [
    { id: 'pack',     kicker: 'Step 1',  title: 'Choose packaging',    sub: 'How should we serve your cake?' },
    { id: 'base',     kicker: 'Step 2',  title: 'Pick your flavor',     sub: 'The taste that sets the mood.' },
    { id: 'toppings', kicker: 'Step 3',  title: 'Decorate your cake',   sub: 'Drag a topping onto the cake 🍓 — stack, move, or tap to remove.' },
    { id: 'message',  kicker: 'Step 4',  title: 'Add your message',    sub: 'What should the icing say?' },
    { id: 'theme',    kicker: 'Step 5',  title: 'Pick a vibe',         sub: 'Optional — set a seasonal scene.' },
  ];

  function Builder({ cake, setCake, subStep, setSubStep, onReveal, onExit, tw = {}, desktop = false }) {
    const motion = tw.motion !== false;
    const stickers = tw.stickers !== false;
    const [toast, setToast] = React.useState(null);
    const toastTimer = React.useRef(null);
    const fireToast = (emoji, msg, tone = 'choco') => {
      clearTimeout(toastTimer.current);
      setToast({ emoji, msg, tone, k: Date.now() });
      toastTimer.current = setTimeout(() => setToast(null), 1700);
    };

    // ---- cake-decorating game: free-placement toppings --------
    const PLACE_MAX = 16;
    const placements = cake.placements || [];
    const distinct = (list) => [...new Set(list.map((p) => p.id))];
    const cakeRef = React.useRef(null);
    const ghostElRef = React.useRef(null);
    const dragRef = React.useRef(null);
    const [dragInfo, setDragInfo] = React.useState({ active: false, over: false, mode: null });
    const [dimUid, setDimUid] = React.useState(null);

    // migrate older saves (toppingIds but no placements) into placed pieces
    React.useEffect(() => {
      if ((!cake.placements || !cake.placements.length) && (cake.toppingIds || []).length) {
        const seedSpots = [{ x: 0.5, y: 0.40 }, { x: 0.36, y: 0.45 }, { x: 0.64, y: 0.45 }, { x: 0.43, y: 0.36 }, { x: 0.57, y: 0.36 }];
        const seeded = cake.toppingIds.map((id, i) => {
          const t = D.toppings.find((x) => x.id === id); const s = seedSpots[i % seedSpots.length];
          return { uid: `${id}-seed-${i}`, id, emoji: t ? t.emoji : '🍒', x: s.x, y: s.y };
        });
        setCake((c) => ({ ...c, placements: seeded }));
      }
    }, []); // eslint-disable-line

    React.useEffect(() => () => { if (ghostElRef.current) { ghostElRef.current.remove(); ghostElRef.current = null; } }, []);

    const ensureGhost = () => {
      if (!ghostElRef.current) {
        const g = document.createElement('div');
        g.style.cssText = 'position:fixed;top:0;left:0;z-index:9999;pointer-events:none;font-size:42px;line-height:1;' +
          'will-change:transform;filter:drop-shadow(0 9px 0 rgba(58,35,20,.22)) drop-shadow(0 12px 14px rgba(58,35,20,.2));';
        document.body.appendChild(g);
        ghostElRef.current = g;
      }
      return ghostElRef.current;
    };

    const overCake = (x, y) => {
      const r = cakeRef.current && cakeRef.current.getBoundingClientRect();
      if (!r) return false;
      const pad = 22;
      return x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad;
    };

    const packField = () => {
      const L = (D.packLayout && (D.packLayout[cake.packagingId] || D.packLayout.none)) || null;
      return (L && L.field) || { x0: 0.13, x1: 0.87, y0: 0.27, y1: 0.70 };
    };
    const relPos = (cx, cy) => {
      const r = cakeRef.current.getBoundingClientRect();
      const x = Math.max(0.02, Math.min(0.98, (cx - r.left) / r.width));
      const y = Math.max(0.02, Math.min(0.98, (cy - r.top) / r.height));
      return { x, y };
    };

    const addPlacement = (t, x, y) => {
      if (placements.length >= PLACE_MAX) { fireToast('🙅', 'Cake’s loaded — that’s plenty!', 'cherry'); return; }
      const uid = `${t.id}-${Date.now()}-${Math.round(Math.random() * 9999)}`;
      setCake((c) => {
        const next = [...(c.placements || []), { uid, id: t.id, emoji: t.emoji, x, y }];
        return { ...c, placements: next, toppingIds: distinct(next) };
      });
      fireToast(t.emoji, `${t.label} dropped on! 🎉`, 'matcha');
    };
    const movePlacement = (uid, x, y) => setCake((c) => {
      const next = (c.placements || []).map((p) => (p.uid === uid ? { ...p, x, y } : p));
      return { ...c, placements: next, toppingIds: distinct(next) };
    });
    const removePlacement = (uid) => setCake((c) => {
      const next = (c.placements || []).filter((p) => p.uid !== uid);
      return { ...c, placements: next, toppingIds: distinct(next) };
    });
    const clearAll = () => { setCake((c) => ({ ...c, placements: [], toppingIds: [] })); fireToast('🧽', 'Cleared the cake!', 'choco'); };

    // unified drag: payload = { mode:'new', t } (from tray) | { mode:'move', p } (placed piece)
    const startDrag = (e, payload, disabled) => {
      if (disabled || (e.button != null && e.button !== 0)) return;
      e.stopPropagation();
      const emoji = payload.mode === 'new' ? payload.t.emoji : payload.mode === 'msg' ? '✍️' : payload.p.emoji;
      const sx = e.clientX, sy = e.clientY;
      dragRef.current = { ...payload, active: false, over: false, sx, sy };
      const paint = (x, y) => {
        const g = ghostElRef.current;
        if (g) g.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) rotate(-8deg) scale(1.18)`;
      };
      const move = (ev) => {
        const d = dragRef.current; if (!d) return;
        const x = ev.clientX, y = ev.clientY;
        if (!d.active) {
          if (Math.hypot(x - d.sx, y - d.sy) > 7) {
            d.active = true;
            if (d.mode !== 'msg') {
              const g = ensureGhost(); g.textContent = emoji; g.style.display = 'block';
              paint(x, y);
            }
            document.body.style.userSelect = 'none';
            if (d.mode === 'move') setDimUid(d.p.uid);
            setDragInfo({ active: true, over: overCake(x, y), mode: d.mode });
          }
        } else {
          if (d.mode === 'msg') {
            const pos = relPos(x, y);
            setCake((c) => ({ ...c, msgX: pos.x, msgY: pos.y }));
          } else {
            paint(x, y);
            const ov = overCake(x, y);
            if (ov !== d.over) { d.over = ov; setDragInfo((s) => ({ ...s, over: ov })); }
          }
          ev.preventDefault();
        }
      };
      const up = (ev) => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        window.removeEventListener('pointercancel', up);
        document.body.style.userSelect = '';
        const d = dragRef.current; dragRef.current = null;
        if (ghostElRef.current) ghostElRef.current.style.display = 'none';
        setDragInfo({ active: false, over: false, mode: null });
        setDimUid(null);
        if (!d) return;
        const x = ev.clientX, y = ev.clientY;
        if (d.active) {
          if (d.mode === 'new') {
            if (d.over) { const pos = relPos(x, y); addPlacement(d.t, pos.x, pos.y); }
          } else if (d.mode === 'msg') {
            const pos = relPos(x, y);
            setCake((c) => ({ ...c, msgX: pos.x, msgY: pos.y }));
          } else { // move
            if (d.over) { const pos = relPos(x, y); movePlacement(d.p.uid, pos.x, pos.y); }
            else { removePlacement(d.p.uid); fireToast('🗑️', 'Topping removed', 'choco'); }
          }
        } else { // tap
          if (d.mode === 'new') {
            addPlacement(d.t, 0.2 + Math.random() * 0.6, 0.2 + Math.random() * 0.6);
          } else if (d.mode !== 'msg') { removePlacement(d.p.uid); }
        }
      };
      window.addEventListener('pointermove', move, { passive: false });
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);
    };

    const themeObj = D.themes.find((t) => t.id === (cake.themeId || 'none')) || D.themes[0];
    const msgText = (cake.messageText || '').trim();

    const step = STEPS[subStep];
    const placeCount = placements.length;

    const pickPackaging = (p) => setCake((c) => ({ ...c, packagingId: p.id }));
    const pickBase = (b) => setCake((c) => ({ ...c, baseId: b.id }));
    const setMessage = (text) => setCake((c) => ({ ...c, messageText: text }));
    const pickTheme = (t) => setCake((c) => ({ ...c, themeId: t.id }));

    const canNext = {
      pack: !!cake.packagingId,
      base: !!cake.baseId,
      toppings: placements.length > 0,
      message: msgText.length > 0,
      theme: true,
    }[step.id];

    const isLast = subStep === STEPS.length - 1;
    const goNext = () => { if (isLast) onReveal(); else setSubStep(subStep + 1); };
    const goBack = () => { if (subStep === 0) onExit(); else setSubStep(subStep - 1); };

    const ta = desktop ? 'left' : 'center';
    const cakeW = desktop ? 400 : (step.id === 'toppings' ? 280 : 216);

    // ---------- shared pieces ----------
    const backBtn = (
      <button onClick={goBack} aria-label="Back" style={{
        width: '40px', height: '40px', flex: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer',
        background: 'var(--cream-000)', color: 'var(--choco-700)', fontSize: '20px',
        border: 'var(--bw-ink) solid var(--border-ink)', borderRadius: '999px', boxShadow: 'var(--elev-sm)',
      }}>
        <i className="ph-bold ph-arrow-left"></i>
      </button>
    );

    const progressRow = (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {backBtn}
        <div style={{ flex: 1 }}><Progress step={subStep} total={STEPS.length} /></div>
        <div style={{ width: '40px', flex: 'none', textAlign: 'right', fontFamily: 'var(--font-numeric)', fontWeight: 700, fontSize: '15px', color: 'var(--choco-700)' }}>
          {subStep + 1}/{STEPS.length}
        </div>
      </div>
    );

    const previewWithRef = (
      <div ref={cakeRef} style={{ position: 'relative', display: 'inline-block', borderRadius: 'var(--radius-xl)' }}>
        <CakeStage
          baseId={cake.baseId}
          packagingId={cake.packagingId}
          placements={placements}
          interactive={step.id === 'toppings'}
          onPlacementDown={(e, p) => startDrag(e, { mode: 'move', p })}
          dimUid={dimUid}
          name={msgText ? cake.messageText : null}
          msgX={cake.msgX ?? 0.5}
          msgY={cake.msgY ?? null}
          onMsgDown={step.id === 'message' && msgText ? (e) => startDrag(e, { mode: 'msg' }) : null}
          packagingOnly={step.id === 'pack'}
          width={cakeW}
          height={cakeW}
          toppingSize={64}
        />
        {dragInfo.active && (
          <div style={{
            position: 'absolute', inset: '-12px', borderRadius: 'calc(var(--radius-xl) + 12px)',
            border: `3px dashed ${dragInfo.over ? 'var(--glow-pink)' : (dragInfo.mode === 'move' ? 'var(--cherry-500)' : 'var(--frosting-500)')}`,
            background: dragInfo.over ? 'rgba(255,143,177,.14)' : (dragInfo.mode === 'move' ? 'rgba(217,4,41,.10)' : 'rgba(162,210,255,.10)'),
            display: 'grid', placeItems: 'start center', paddingTop: '14px', pointerEvents: 'none',
            transform: dragInfo.over ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform var(--dur-fast) var(--ease-spring), background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '13px',
              color: 'var(--cream-000)', background: dragInfo.over ? 'var(--cherry-500)' : 'var(--choco-700)',
              border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-pill)',
              padding: '6px 14px', boxShadow: 'var(--elev-md)', whiteSpace: 'nowrap',
            }}>{dragInfo.over
                ? (dragInfo.mode === 'move' ? 'Drop it here ✦' : 'Drop it on! 🍒')
                : (dragInfo.mode === 'move' ? 'Let go to remove 🗑️' : 'Drag onto the cake ✦')}</span>
          </div>
        )}
      </div>
    );

    const stepHeaderEl = (
      <div style={{ textAlign: ta }}>
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--cherry-500)' }}>{step.kicker}</span>
        <h2 style={{ margin: '4px 0 3px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: desktop ? '30px' : '24px', color: 'var(--text-strong)' }}>{step.title}</h2>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: desktop ? '15px' : '14px', color: 'var(--text-muted)' }}>{step.sub}</p>
      </div>
    );

    const stepBodyEl = (
      <React.Fragment>
        {step.id === 'pack' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', padding: '12px 4px 4px 12px' }}>
            {D.packaging.map((p) => (
              <ChoiceCard key={p.id}
                emoji={
                  <div style={{ width: '100%', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', background: '#FDF0E0', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', overflow: 'hidden' }}>
                    <img src={p.img} alt={p.en} draggable="false" style={{
                      maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto',
                    }} />
                  </div>
                }
                label={p.label} caption={p.caption}
                selected={cake.packagingId === p.id} onClick={() => pickPackaging(p)}
                style={{ minHeight: '180px', justifyContent: 'flex-start', background: '#FDF0E0' }} />
            ))}
          </div>
        )}

        {step.id === 'base' && (() => {
          const pkgImg = (b) => cake.packagingId === 'cup' ? b.cupImg : cake.packagingId === 'box' ? b.boxImg : cake.packagingId === 'simple' ? b.simpleImg : null;
          const hasImg = !!pkgImg(D.flavors[0]);
          return hasImg ? (
            <div style={{ display: 'grid', gridTemplateColumns: desktop ? '1fr 1fr 1fr' : '1fr 1fr', gap: '12px', padding: '12px 4px 4px 12px' }}>
              {D.flavors.map((b) => (
                <ChoiceCard key={b.id}
                  emoji={<img src={pkgImg(b)} alt={b.en} draggable="false" style={{
                    display: 'block', width: '100%', borderRadius: '0',
                  }} />}
                  label={null}
                  selected={cake.baseId === b.id} onClick={() => pickBase(b)}
                  style={{ minHeight: 'auto', padding: '0', gap: '0', overflow: 'hidden', background: '#fbefe4' }} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: desktop ? '1fr 1fr 1fr' : '1fr 1fr', gap: '12px' }}>
              {D.flavors.map((b) => (
                <ChoiceCard key={b.id} emoji={b.emoji} label={b.label} caption={b.caption}
                  selected={cake.baseId === b.id} onClick={() => pickBase(b)} style={{ minHeight: '128px' }} />
              ))}
            </div>
          );
        })()}

        {step.id === 'toppings' && (
          <React.Fragment>
            <div style={{ display: 'flex', justifyContent: desktop ? 'flex-start' : 'center', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Badge tone={placeCount ? 'matcha' : 'gold'} icon={placeCount ? '🎂' : '🍒'}>
                {placeCount ? `${placeCount} on your cake` : 'Your cake is bare'}
              </Badge>
              {placeCount > 0 && (
                <button onClick={clearAll} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '12px', color: 'var(--choco-700)',
                  background: 'var(--cream-000)', border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-pill)',
                  padding: '5px 12px', boxShadow: 'var(--elev-sm)',
                }}>
                  <i className="ph-bold ph-eraser"></i> Clear
                </button>
              )}
            </div>

            {/* compact topping tray — a baker's palette you pick & drag from */}
            <div style={{
              display: 'flex', flexWrap: desktop ? 'wrap' : 'nowrap', gap: '10px', overflowX: desktop ? 'visible' : 'auto', padding: '12px',
              background: 'var(--cream-000)', border: 'var(--bw-ink) solid var(--border-ink)',
              borderRadius: 'var(--radius-xl)', boxShadow: 'var(--elev-md)',
              scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
            }}>
              {D.toppings.map((t) => {
                const onCake = placements.filter((p) => p.id === t.id).length;
                return (
                  <div key={t.id}
                    onPointerDown={(e) => startDrag(e, { mode: 'new', t })}
                    style={{
                      position: 'relative', flex: desktop ? '1 0 76px' : '0 0 auto', width: desktop ? 'auto' : '60px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                      touchAction: 'none', cursor: 'grab', WebkitTapHighlightColor: 'transparent',
                    }}>
                    <div style={{
                      position: 'relative', width: desktop ? '62px' : '54px', height: desktop ? '62px' : '54px', display: 'grid', placeItems: 'center',
                      fontSize: desktop ? '32px' : '28px', lineHeight: 1,
                      background: 'var(--cream-100)', border: 'var(--bw-ink) solid var(--border-ink)',
                      borderRadius: '999px', boxShadow: 'var(--elev-sm)',
                      filter: 'drop-shadow(0 2px 0 rgba(58,35,20,.12))',
                    }}>
                      {t.img
                        ? <img src={t.img} alt={t.label} draggable="false" style={{ width: '72%', height: '72%', objectFit: 'contain', pointerEvents: 'none', userSelect: 'none' }} />
                        : <span style={{ pointerEvents: 'none' }}>{t.emoji}</span>}
                      {onCake > 0 && (
                        <span style={{
                          position: 'absolute', top: '-6px', right: '-6px', minWidth: '20px', height: '20px', padding: '0 5px',
                          display: 'grid', placeItems: 'center', fontFamily: 'var(--font-numeric)', fontWeight: 700, fontSize: '12px',
                          color: 'var(--cream-000)', background: 'var(--cherry-500)', border: '2px solid var(--border-ink)',
                          borderRadius: '999px', boxShadow: 'var(--elev-sm)',
                        }}>{onCake}</span>
                      )}
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '11px', color: 'var(--choco-700)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%',
                    }}>{t.label}</span>
                  </div>
                );
              })}
            </div>
            <p style={{ margin: '10px 2px 0', textAlign: ta, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '12px', color: 'var(--text-muted)' }}>
              {desktop ? 'Drag a topping over to the cake — or click to drop one on 🍒' : 'Drag a topping up onto the cake — or tap it to drop one on 🍒'}
            </p>
          </React.Fragment>
        )}

        {step.id === 'message' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: desktop ? 'stretch' : 'center', paddingTop: '4px' }}>
            <div style={{ width: '100%', maxWidth: desktop ? 'none' : '320px' }}>
              <Input label="Write on the cake" placeholder={cake.packagingId === 'cup' ? 'Tip: use an emoji 🎂' : 'e.g. Happy birthday 🎂'} iconLeft="🎂"
                value={cake.messageText || ''} maxLength={40}
                onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: desktop ? 'flex-start' : 'center', maxWidth: desktop ? 'none' : '330px' }}>
              {D.messages.map((m) => {
                const sel = (cake.messageText || '').trim() === m.text;
                return (
                  <button key={m.id} onClick={() => setMessage(m.text)} style={{
                    cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '13px',
                    color: sel ? 'var(--cream-000)' : 'var(--choco-700)',
                    background: sel ? 'var(--cherry-500)' : 'var(--cream-000)',
                    border: `2px solid ${sel ? 'var(--glow-pink)' : 'var(--border-ink)'}`,
                    borderRadius: 'var(--radius-pill)', padding: '7px 14px',
                    boxShadow: sel ? 'var(--glow-selected)' : 'var(--elev-sm)',
                    transition: 'all var(--dur-base) var(--ease-spring)',
                  }}>{m.text}</button>
                );
              })}
            </div>
            <p style={{ margin: 0, textAlign: ta, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '12px', color: 'var(--text-muted)' }}>
              Tap a suggestion or write your own ✦
            </p>
          </div>
        )}

        {step.id === 'theme' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {D.themes.map((t) => (
              <ChoiceCard key={t.id} emoji={t.emoji} label={t.label}
                caption={t.id === 'none' ? 'Default' : 'Seasonal'}
                selected={(cake.themeId || 'none') === t.id} onClick={() => pickTheme(t)} style={{ minHeight: '116px' }} />
            ))}
          </div>
        )}
      </React.Fragment>
    );

    const ctaButton = (
      <Button variant="cherry" size="lg" full iconRight={isLast ? '✦' : '→'} disabled={!canNext} onClick={goNext}>
        {isLast ? 'Reveal my story' : 'Next'}
      </Button>
    );

    const toastEl = toast && (
      <div key={toast.k} style={{ position: 'absolute', left: '50%', bottom: '92px', transform: 'translateX(-50%)', zIndex: 30, whiteSpace: 'nowrap' }}>
        <Toast emoji={toast.emoji} tone={toast.tone}>{toast.msg}</Toast>
      </div>
    );

    // ---------- DESKTOP: two-pane (stage + control panel) ----------
    if (desktop) {
      return (
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'row', background: themeObj.bg, transition: 'background var(--dur-slow) var(--ease-out)' }}>
          {/* left: the live stage */}
          <div style={{ position: 'relative', flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2 }}>
              <Drip color={themeObj.drip} height={42} />
            </div>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.9 }}>
              {stickers && <FloatingStickers stickers={themeObj.stickers} motion={motion} />}
            </div>
            <div style={{ position: 'relative', zIndex: 3, padding: '34px 0 0 44px' }}>
              <Logo size="sm" byline={false} />
            </div>
            <div style={{ position: 'relative', zIndex: 3, flex: 1, display: 'grid', placeItems: 'center', padding: '8px 40px 40px' }}>
              {previewWithRef}
            </div>
          </div>

          {/* right: the control panel */}
          <div style={{
            position: 'relative', zIndex: 4, width: '516px', flex: 'none', display: 'flex', flexDirection: 'column',
            background: 'var(--cream-000)', borderLeft: 'var(--bw-ink-bold) solid var(--border-ink)', boxShadow: '-18px 0 50px -30px rgba(58,35,20,.5)',
          }}>
            <div style={{ padding: '30px 36px 4px' }}>{progressRow}</div>
            <div style={{ padding: '18px 36px 14px' }}>{stepHeaderEl}</div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '4px 36px 18px' }}>{stepBodyEl}</div>
            <div style={{ padding: '16px 36px 26px', borderTop: '2px solid var(--cream-300)' }}>{ctaButton}</div>
          </div>

          {toastEl}
        </div>
      );
    }

    // ---------- MOBILE: single column ----------
    return (
      <div style={{ position: 'relative', minHeight: '100%', display: 'flex', flexDirection: 'column', background: themeObj.bg, transition: 'background var(--dur-slow) var(--ease-out)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2 }}>
          <Drip color={themeObj.drip} height={38} />
        </div>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.9 }}>
          {stickers && <FloatingStickers stickers={themeObj.stickers} motion={motion} />}
        </div>

        <div style={{ position: 'relative', zIndex: 3, padding: '34px 18px 8px' }}>{progressRow}</div>

        <div style={{ position: 'relative', zIndex: 3, display: 'grid', placeItems: 'center', padding: '6px 0 4px' }}>
          {previewWithRef}
        </div>

        <div style={{ position: 'relative', zIndex: 3, padding: '8px 22px 12px' }}>{stepHeaderEl}</div>

        <div style={{ position: 'relative', zIndex: 3, padding: '2px 18px 14px', flex: 1 }}>{stepBodyEl}</div>

        <div style={{
          position: 'sticky', bottom: 0, zIndex: 4, display: 'flex', gap: '12px', alignItems: 'center',
          padding: '14px 18px calc(16px + env(safe-area-inset-bottom))',
          background: 'linear-gradient(to top, var(--cream-000) 76%, transparent)',
        }}>{ctaButton}</div>

        {toastEl}
      </div>
    );
  }

  window.Builder = Builder;
})();
