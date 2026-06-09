// Share — 1080×1920 story-card preview + share / download / order CTAs.
(function () {
  const { Button, CakePreview, Badge, Drip, Toast } = window.BakeSpaceDSCakeYourStory_aae867;
  const { Logo } = window.CYSUI;
  const { CakeStage } = window;
  const D = window.CYS;

  function StoryCard({ cake, personality, baseObj, topObjs, icing, themeObj, motion }) {
    // Renders at a fixed 9:16 design size (270×480 ≈ 1080×1920).
    const p = personality;
    return (
      <div style={{
        position: 'relative', width: '270px', height: '480px', flex: 'none',
        background: themeObj.bg, backgroundColor: 'var(--cream-100)',
        border: 'var(--bw-ink-bold) solid var(--border-ink)', borderRadius: '26px',
        boxShadow: 'var(--elev-lg)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}>
          <Drip color={themeObj.drip} height={40} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, marginTop: '30px' }}>
          <Logo size="sm" byline={false} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, marginTop: '10px' }}>
          <CakeStage
            baseId={cake.baseId}
            packagingId={cake.packagingId}
            placements={cake.placements}
            toppings={topObjs.map((t) => ({ id: t.id, emoji: t.emoji }))}
            name={cake.messageText ? cake.messageText : null}
            width={172} height={172}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginTop: '12px', padding: '0 16px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '10px', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>My cake personality</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', marginTop: '5px' }}>
            <span style={{ fontSize: '26px' }}>{p.emoji}</span>
            <span className="sticker-text" style={{ fontSize: '21px', color: p.accent, WebkitTextStrokeWidth: '2.5px' }}>{p.title}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', marginTop: '11px' }}>
            {p.traits.map((t) => (
              <span key={t} style={{
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '10px', color: 'var(--cream-000)',
                background: p.accent, border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-pill)', padding: '3px 9px',
              }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, textAlign: 'center', zIndex: 2 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '11px', color: 'var(--cherry-500)' }}>cakeyourstory.sandp.co</div>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Bake yours · #CakeYourStory</div>
        </div>
      </div>
    );
  }

  function Share({ cake, personality, onRemix, onRestart, tw = {}, desktop = false }) {
    const motion = tw.motion !== false;
    const [toast, setToast] = React.useState(null);
    const [dl, setDl] = React.useState(false);
    const tRef = React.useRef(null);
    const fire = (emoji, msg, tone = 'choco') => {
      clearTimeout(tRef.current);
      setToast({ emoji, msg, tone, k: Date.now() });
      tRef.current = setTimeout(() => setToast(null), 1900);
    };

    const baseObj = D.flavors.find((b) => b.id === cake.baseId);
    const topObjs = cake.toppingIds.map((id) => D.toppings.find((t) => t.id === id)).filter(Boolean);
    const themeObj = D.themes.find((t) => t.id === (cake.themeId || 'none')) || D.themes[0];
    const icing = baseObj ? baseObj.base : null;

    const doShare = () => {
      if (navigator.share) {
        navigator.share({ title: 'Cake Your Story by S&P', text: `I'm ${personality.title}! Bake your cake story →`, url: 'https://cakeyourstory.sandp.co' }).catch(() => {});
      } else { fire('🔗', 'Share link copied!', 'cherry'); }
    };
    const doDownload = () => {
      if (dl) return;
      setDl(true);
      setTimeout(() => { setDl(false); fire('🎉', 'Saved to your story!', 'matcha'); }, 1100);
    };

    const shareTargets = [
      { id: 'ig', icon: 'ph-instagram-logo', label: 'Story', tone: 'var(--cherry-500)' },
      { id: 'tt', icon: 'ph-tiktok-logo', label: 'TikTok', tone: 'var(--choco-700)' },
      { id: 'tw', icon: 'ph-x-logo', label: 'Post', tone: 'var(--frosting-500)' },
      { id: 'lk', icon: 'ph-link', label: 'Copy', tone: 'var(--matcha-500)' },
    ];

    const shareTargetsRow = (
      <div style={{ display: 'flex', gap: '14px' }}>
        {shareTargets.map((s) => (
          <button key={s.id} onClick={s.id === 'lk' ? () => fire('🔗', 'Link copied!', 'cherry') : doShare} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer',
            background: 'transparent', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '11px', color: 'var(--text-body)',
          }}>
            <span style={{
              width: '50px', height: '50px', display: 'grid', placeItems: 'center', color: s.tone,
              background: 'var(--cream-000)', border: 'var(--bw-ink) solid var(--border-ink)', borderRadius: '999px',
              boxShadow: 'var(--elev-sm)', fontSize: '24px',
            }}><i className={`ph-fill ${s.icon}`}></i></span>
            {s.label}
          </button>
        ))}
      </div>
    );

    if (desktop) {
      return (
        <div style={{
          position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '60px', padding: '40px 64px', overflow: 'hidden',
          background: 'radial-gradient(130% 78% at 50% 0%, var(--frosting-100) 0%, var(--cream-100) 55%)',
        }}>
          <div style={{ position: 'relative', zIndex: 3, flex: 'none' }}>
            <span style={{ position: 'absolute', top: '-8px', left: '-16px', fontSize: '32px', zIndex: 3, transform: 'rotate(-14deg)', animation: motion ? 'float-idle 5s var(--ease-in-out) infinite' : 'none' }}>🍒</span>
            <span style={{ position: 'absolute', bottom: '28px', right: '-14px', fontSize: '28px', zIndex: 3, transform: 'rotate(12deg)', animation: motion ? 'float-drift 6s var(--ease-in-out) infinite' : 'none' }}>✦</span>
            <StoryCard {...{ cake, personality, baseObj, topObjs, icing, themeObj, motion }} />
          </div>

          <div style={{ position: 'relative', zIndex: 3, width: '380px', flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Badge tone="gold" icon="✦">Ready to share</Badge>
            <h2 style={{ margin: '16px 0 4px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '36px', color: 'var(--text-strong)' }}>Share your story 🎉</h2>
            <p style={{ margin: '0 0 22px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <i className="ph-bold ph-device-mobile"></i> 1080 × 1920 · Story / Reels
            </p>
            {shareTargetsRow}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', marginTop: '24px' }}>
              <Button variant="cherry" size="lg" full iconLeft={<i className="ph-bold ph-storefront"></i>} onClick={() => fire('🎂', 'Opening S&P shop…', 'cherry')}>
                Order with S&amp;P
              </Button>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="frosting" size="md" full iconLeft={<i className="ph-bold ph-share-network"></i>} onClick={doShare}>Share result</Button>
                <Button variant="cream" size="md" full iconLeft={<i className={`ph-bold ${dl ? 'ph-spinner' : 'ph-download-simple'}`}></i>} onClick={doDownload}>
                  {dl ? 'Saving…' : 'Download'}
                </Button>
              </div>
              <Button variant="ghost" size="sm" iconLeft="↺" onClick={onRestart} style={{ alignSelf: 'flex-start', marginTop: '2px' }}>Bake another cake</Button>
            </div>
          </div>

          {toast && (
            <div key={toast.k} style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)', zIndex: 40, whiteSpace: 'nowrap' }}>
              <Toast emoji={toast.emoji} tone={toast.tone}>{toast.msg}</Toast>
            </div>
          )}
        </div>
      );
    }

    return (
      <div style={{
        position: 'relative', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '28px 22px 28px', overflow: 'hidden',
        background: 'radial-gradient(130% 78% at 50% 0%, var(--frosting-100) 0%, var(--cream-100) 55%)',
      }}>
        <Badge tone="gold" icon="✦" style={{ marginBottom: '6px' }}>Ready to share</Badge>
        <h2 style={{ margin: '6px 0 4px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px', color: 'var(--text-strong)' }}>Share your story 🎉</h2>
        <p style={{ margin: '0 0 8px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <i className="ph-bold ph-device-mobile"></i> 1080 × 1920 · Story / Reels
        </p>

        <div style={{ position: 'relative' }}>
          {/* sticker accents around the card */}
          <span style={{ position: 'absolute', top: '-8px', left: '-14px', fontSize: '30px', zIndex: 3, transform: 'rotate(-14deg)', animation: motion ? 'float-idle 5s var(--ease-in-out) infinite' : 'none' }}>🍒</span>
          <span style={{ position: 'absolute', bottom: '24px', right: '-12px', fontSize: '26px', zIndex: 3, transform: 'rotate(12deg)', animation: motion ? 'float-drift 6s var(--ease-in-out) infinite' : 'none' }}>✦</span>
          <StoryCard {...{ cake, personality, baseObj, topObjs, icing, themeObj, motion }} />
        </div>

        {/* share targets */}
        <div style={{ display: 'flex', gap: '14px', margin: '20px 0 16px' }}>
          {shareTargets.map((s) => (
            <button key={s.id} onClick={s.id === 'lk' ? () => fire('🔗', 'Link copied!', 'cherry') : doShare} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer',
              background: 'transparent', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '11px', color: 'var(--text-body)',
            }}>
              <span style={{
                width: '50px', height: '50px', display: 'grid', placeItems: 'center', color: s.tone,
                background: 'var(--cream-000)', border: 'var(--bw-ink) solid var(--border-ink)', borderRadius: '999px',
                boxShadow: 'var(--elev-sm)', fontSize: '24px',
              }}><i className={`ph-fill ${s.icon}`}></i></span>
              {s.label}
            </button>
          ))}
        </div>

        {/* primary CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '330px' }}>
          <Button variant="cherry" size="lg" full iconLeft={<i className="ph-bold ph-storefront"></i>} onClick={() => fire('🎂', 'Opening S&P shop…', 'cherry')}>
            Order with S&amp;P
          </Button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="frosting" size="md" full iconLeft={<i className="ph-bold ph-share-network"></i>} onClick={doShare}>Share result</Button>
            <Button variant="cream" size="md" full iconLeft={<i className={`ph-bold ${dl ? 'ph-spinner' : 'ph-download-simple'}`}></i>} onClick={doDownload}>
              {dl ? 'Saving…' : 'Download'}
            </Button>
          </div>
          <Button variant="ghost" size="sm" iconLeft="↺" onClick={onRestart} style={{ alignSelf: 'center', marginTop: '2px' }}>Bake another cake</Button>
        </div>

        {toast && (
          <div key={toast.k} style={{ position: 'absolute', left: '50%', bottom: '20px', transform: 'translateX(-50%)', zIndex: 40, whiteSpace: 'nowrap' }}>
            <Toast emoji={toast.emoji} tone={toast.tone}>{toast.msg}</Toast>
          </div>
        )}
      </div>
    );
  }

  window.Share = Share;
})();
