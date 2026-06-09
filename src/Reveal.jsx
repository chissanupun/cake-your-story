// Reveal — confetti on entry + framed personality result card.
(function () {
  const { Button, Badge, Drip, CakePreview, Toast } = window.BakeSpaceDSCakeYourStory_aae867;
  const { FloatingStickers } = window.CYSUI;
  const D = window.CYS;

  function Reveal({ cake, personality, onShare, onRemix, tw = {}, desktop = false }) {
    const motion = tw.motion !== false;
    const stickers = tw.stickers !== false;
    const confettiCount = tw.confetti || 110;
    const hostRef = React.useRef(null);
    const confRef = React.useRef(null);
    const [shown, setShown] = React.useState(false);
    const [toast, setToast] = React.useState(null);
    const tRef = React.useRef(null);
    const fireToast = (emoji, msg, tone = 'cherry') => {
      clearTimeout(tRef.current);
      setToast({ emoji, msg, tone, k: Date.now() });
      tRef.current = setTimeout(() => setToast(null), 2000);
    };
    const order = () => fireToast('🎂', 'Opening the S&P shop…', 'cherry');

    const packObj = D.packaging.find((p) => p.id === cake.packagingId);
    const baseObj = D.flavors.find((b) => b.id === cake.baseId);
    const topObjs = cake.toppingIds.map((id) => D.toppings.find((t) => t.id === id)).filter(Boolean);
    const icing = baseObj ? baseObj.base : null;
    const p = personality;
    const storyObj = D.generateStory ? D.generateStory(cake) : null;

    React.useEffect(() => {
      const t1 = setTimeout(() => setShown(true), 80);
      let t2;
      if (hostRef.current && window.CYSConfetti) {
        confRef.current = window.CYSConfetti.create(hostRef.current);
        t2 = setTimeout(() => {
          confRef.current.burst({ x: hostRef.current.clientWidth / 2, y: hostRef.current.clientHeight * 0.30, count: confettiCount });
          confRef.current.rain(1300);
        }, 260);
      }
      return () => {clearTimeout(t1);clearTimeout(t2);if (confRef.current) confRef.current.destroy();};
    }, []);

    const replay = () => {
      if (confRef.current) {
        confRef.current.burst({ x: hostRef.current.clientWidth / 2, y: hostRef.current.clientHeight * 0.30, count: confettiCount });
      }
    };

    if (desktop) {
      const traitChip = (t) => (
        <span key={t} style={{
          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '13px', color: 'var(--choco-700)',
          background: 'var(--cream-300)', border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-pill)', padding: '5px 13px',
        }}>{t}</span>
      );
      return (
        <div ref={hostRef} style={{
          position: 'relative', height: '100%', display: 'grid', placeItems: 'center', padding: '40px', overflow: 'hidden',
          background: 'radial-gradient(130% 80% at 50% 0%, var(--frosting-100) 0%, var(--cream-100) 55%)',
        }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.85 }}>
            {stickers && <FloatingStickers stickers={['✦', '⭐️', '🎉', '🍒', '🧁', '✨']} motion={motion} />}
          </div>
          <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '100%', maxWidth: '780px' }}>
            <Badge tone="gold" icon="✦">Your cake personality</Badge>
            <div style={{
              display: 'flex', width: '100%', background: 'var(--cream-000)',
              border: 'var(--bw-ink-bold) solid var(--border-ink)', borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--elev-lg)', overflow: 'hidden',
              transform: shown ? 'translateY(0) scale(1)' : 'translateY(16px) scale(.97)',
              transition: 'transform var(--dur-slow) var(--ease-spring)',
            }}>
              <div style={{ width: '42%', flex: 'none', background: p.accent, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '40px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: '92px', lineHeight: 1, filter: 'drop-shadow(0 6px 0 rgba(58,35,20,.22))', animation: motion ? 'float-idle 4.5s var(--ease-in-out) infinite' : 'none' }}>{p.emoji}</div>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '12px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--cream-000)', opacity: 0.9 }}>You are</span>
                <h2 className="sticker-text" style={{ margin: 0, fontSize: '32px', color: 'var(--cream-000)', WebkitTextStrokeWidth: '3px' }}>{p.title}</h2>
              </div>
              <div style={{ flex: 1, padding: '34px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '17px', lineHeight: 1.55, color: 'var(--text-body)' }}>{p.desc}</p>
                {storyObj && (
                  <div style={{
                    padding: '12px 14px',
                    background: 'var(--frosting-100)', border: 'var(--bw-ink) solid var(--border-ink)', borderRadius: 'var(--radius-lg)',
                  }}>
                    <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', lineHeight: 1.6, color: 'var(--text-body)' }}>{storyObj.story}</p>
                  </div>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{p.traits.map(traitChip)}</div>
                <div style={{
                  marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left',
                  background: 'var(--frosting-100)', border: 'var(--bw-ink) solid var(--border-ink)', borderRadius: 'var(--radius-lg)', padding: '12px 14px',
                }}>
                  <span style={{ fontSize: '32px', lineHeight: 1, flex: 'none' }}>{baseObj ? baseObj.base : '🎂'}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', lineHeight: 1.2 }}>Recommended cake mood</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', lineHeight: 1.2, color: 'var(--text-strong)' }}>{p.mood}</div>
                    {(baseObj || packObj) && (
                      <div style={{ marginTop: '4px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '12px', lineHeight: 1.3, color: 'var(--text-muted)' }}>
                        {[baseObj && baseObj.label, packObj && `• ${packObj.label}`].filter(Boolean).join(' ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '560px' }}>
              <Button variant="cherry" size="lg" full iconLeft={<i className="ph-bold ph-storefront"></i>} onClick={order}>Order my cake</Button>
              <Button variant="frosting" size="lg" full iconLeft={<i className="ph-bold ph-share-network"></i>} onClick={onShare}>Share</Button>
              <Button variant="cream" size="lg" full iconLeft="↺" onClick={onRemix}>Remix</Button>
            </div>
          </div>
          {toast &&
            <div key={toast.k} style={{ position: 'absolute', left: '50%', bottom: '22px', transform: 'translateX(-50%)', zIndex: 40, whiteSpace: 'nowrap' }}>
              <Toast emoji={toast.emoji} tone={toast.tone}>{toast.msg}</Toast>
            </div>
          }
        </div>
      );
    }

    return (
      <div ref={hostRef} style={{
        position: 'relative', minHeight: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', padding: '30px 22px 30px', overflow: 'hidden',
        background: 'radial-gradient(130% 80% at 50% 0%, var(--frosting-100) 0%, var(--cream-100) 55%)'
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.85 }}>
          {stickers && <FloatingStickers stickers={['✦', '⭐️', '🎉', '🍒', '🧁', '✨']} motion={motion} />}
        </div>

        <Badge tone="gold" icon="✦" style={{ position: 'relative', zIndex: 3, marginTop: '8px' }}>Your cake personality</Badge>

        {/* Result card */}
        <div style={{
          position: 'relative', zIndex: 3, width: '100%', maxWidth: '330px', marginTop: '18px',
          background: 'var(--cream-000)', border: 'var(--bw-ink-bold) solid var(--border-ink)',
          borderRadius: 'var(--radius-xl)', boxShadow: 'var(--elev-lg)', overflow: 'hidden',
          transform: shown ? 'translateY(0) scale(1)' : 'translateY(16px) scale(.97)',
          transition: 'transform var(--dur-slow) var(--ease-spring)'
        }}>
          {/* sauce header band */}
          <div style={{ position: 'relative', background: p.accent, padding: '20px 18px 30px', textAlign: 'center' }}>
            <div style={{ fontSize: '64px', lineHeight: 1, filter: 'drop-shadow(0 6px 0 rgba(58,35,20,.22))', animation: motion ? 'float-idle 4.5s var(--ease-in-out) infinite' : 'none' }}>{p.emoji}</div>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: '-1px' }}>
              <Drip color="#FFFFFF" height={26} flip />
            </div>
          </div>

          <div style={{ padding: '14px 20px 22px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 2px', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '12px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>You are</p>
            <h2 className="sticker-text" style={{ ...{ margin: '2px 0 12px', fontSize: '30px', color: p.accent, WebkitTextStrokeWidth: '3px' }, color: "rgb(255, 255, 255)" }}>{p.title}</h2>
            <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '15px', lineHeight: 1.5, color: 'var(--text-body)' }}>{p.desc}</p>

            {/* personalised story */}
            {storyObj && (
              <div style={{
                margin: '0 0 16px', padding: '12px 14px', textAlign: 'left',
                background: 'var(--frosting-100)', border: 'var(--bw-ink) solid var(--border-ink)', borderRadius: 'var(--radius-lg)',
              }}>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '13px', lineHeight: 1.6, color: 'var(--text-body)' }}>{storyObj.story}</p>
              </div>
            )}

            {/* traits */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
              {p.traits.map((t) =>
              <span key={t} style={{
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '13px', color: 'var(--choco-700)',
                background: 'var(--cream-300)', border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-pill)', padding: '5px 13px'
              }}>{t}</span>
              )}
            </div>

            {/* recommended cake mood */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left',
              background: 'var(--frosting-100)', border: 'var(--bw-ink) solid var(--border-ink)',
              borderRadius: 'var(--radius-lg)', padding: '12px 14px'
            }}>
              <span style={{ fontSize: '30px', lineHeight: 1 }}>{baseObj ? baseObj.base : '🎂'}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Recommended cake mood</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '17px', color: 'var(--text-strong)' }}>{p.mood}</div>
                {(baseObj || packObj) && (
                  <div style={{ marginTop: '4px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '12px', color: 'var(--text-muted)' }}>
                    {[baseObj && baseObj.label, packObj && `• ${packObj.label}`].filter(Boolean).join(' ')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* actions */}
        <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', marginTop: '20px', width: '100%', maxWidth: '330px' }}>
          <Button variant="cherry" size="lg" full iconLeft={<i className="ph-bold ph-storefront"></i>} iconRight="→" onClick={order}>Order my cake</Button>
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <Button variant="frosting" size="md" full iconLeft={<i className="ph-bold ph-share-network"></i>} onClick={onShare}>Share my story</Button>
            <Button variant="cream" size="md" full iconLeft="↺" onClick={onRemix}>Remix</Button>
          </div>
        </div>

        {toast &&
        <div key={toast.k} style={{ position: 'absolute', left: '50%', bottom: '22px', transform: 'translateX(-50%)', zIndex: 40, whiteSpace: 'nowrap' }}>
          <Toast emoji={toast.emoji} tone={toast.tone}>{toast.msg}</Toast>
        </div>
        }
      </div>);

  }

  window.Reveal = Reveal;
})();