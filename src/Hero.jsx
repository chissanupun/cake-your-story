// Hero screen — logo, floating cake + piping bag, headline, springy CTA.
(function () {
  const { Button, Badge, Drip } = window.BakeSpaceDSCakeYourStory_aae867;
  const { Logo, FloatingStickers } = window.CYSUI;
  const { CakeStage } = window;

  function Hero({ onStart, tw = {}, desktop = false }) {
    const motion = tw.motion !== false;
    const stickers = tw.stickers !== false;

    if (desktop) {
      return (
        <div style={{
          position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '64px', padding: '40px 72px', overflow: 'hidden',
          background: 'radial-gradient(120% 90% at 50% 18%, var(--frosting-100) 0%, var(--cream-100) 60%)',
        }}>
          {stickers && <FloatingStickers stickers={['🍒', '✦', '🧁', '⭐️', '🍓', '🍩']} motion={motion} />}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2 }}><Drip color="#D90429" height={46} /></div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2 }}><Drip color="#D90429" height={46} flip /></div>

          {/* left: copy + CTA */}
          <div style={{ position: 'relative', zIndex: 3, maxWidth: '480px', flex: 'none' }}>
            <Badge tone="gold" icon="✦">Summer drop · limited</Badge>
            <div style={{ margin: '22px 0 0' }}><Logo size="lg" /></div>
            <h1 style={{ margin: '26px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '46px', lineHeight: 1.06, color: 'var(--text-strong)' }}>
              Design your cake.<br /><span style={{ color: 'var(--cherry-500)' }}>Discover your story.</span>
            </h1>
            <p style={{ margin: '20px 0 0', maxWidth: '42ch', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '18px', lineHeight: 1.5, color: 'var(--text-body)' }}>
              Pick your flavour, pile on toppings, write your message — then unbox the cake personality that’s <em>so</em> you.
            </p>
            <div style={{ margin: '32px 0 0', display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
              <Button variant="cherry" size="lg" iconRight="→" onClick={onStart} className="springy-cta" style={{ minWidth: '220px' }}>Start creating</Button>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', color: 'var(--text-muted)' }}>9 flavours · 3 packagings</span>
            </div>
          </div>

          {/* right: sample cake teaser */}
          <div style={{ position: 'relative', zIndex: 3, display: 'grid', placeItems: 'center', flex: 'none', animation: motion ? 'float-idle 5.5s var(--ease-in-out) infinite' : 'none' }}>
            <span style={{ position: 'absolute', left: '-6%', top: '8%', fontSize: '28px', color: 'var(--gold-500)', animation: motion ? 'twinkle 2s var(--ease-in-out) infinite' : 'none' }}>✦</span>
            <span style={{ position: 'absolute', right: '-2%', bottom: '16%', fontSize: '20px', color: 'var(--gold-500)', animation: motion ? 'twinkle 1.6s var(--ease-in-out) infinite .5s' : 'none' }}>✦</span>
            <CakeStage baseId="vanilla-layer"
              toppings={[{ id: 'cherry', emoji: '🍒' }, { id: 'straw', emoji: '🍓' }, { id: 'choc', emoji: '🍫' }]}
              width={380} height={380}
              style={{ background: 'transparent', border: 'none', boxShadow: 'none', overflow: 'visible' }} />
          </div>
        </div>
      );
    }

    return (
      <div style={{
        position: 'relative', minHeight: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start', textAlign: 'center',
        padding: '20px 26px 40px', overflow: 'hidden',
        background: 'radial-gradient(125% 78% at 50% 26%, var(--frosting-100) 0%, var(--cream-100) 60%)'
      }}>
        {stickers && <FloatingStickers stickers={['🍒', '✦', '🧁', '⭐️', '🍓', '🍩']} motion={motion} />}

        {/* top sauce drip */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2 }}>
          <Drip color="#D90429" height={40} />
        </div>

        <Badge tone="gold" icon="✦" style={{ position: 'relative', zIndex: 3, marginTop: '46px' }}>Summer drop · limited</Badge>

        {/* flexible spacer drifts the logo + headline cluster down toward center */}
        <div style={{ flex: '0.7 1 auto', minHeight: '20px' }} />

        {/* Logo centerpiece (the hero visual) */}
        <div style={{ position: 'relative', zIndex: 3, width: '320px', height: '218px', margin: '0 0 6px', display: 'grid', placeItems: 'center' }}>
          <div style={{ animation: motion ? 'float-idle 5.5s var(--ease-in-out) infinite' : 'none' }}>
            <Logo size="xl" />
          </div>
          <span style={{ position: 'absolute', left: '2%', top: '14%', fontSize: '24px', color: 'var(--gold-500)', animation: motion ? 'twinkle 2s var(--ease-in-out) infinite' : 'none' }}>✦</span>
          <span style={{ position: 'absolute', right: '4%', top: '60%', fontSize: '17px', color: 'var(--gold-500)', animation: motion ? 'twinkle 1.6s var(--ease-in-out) infinite .5s' : 'none' }}>✦</span>
          <span style={{ position: 'absolute', right: '12%', top: '6%', fontSize: '15px', color: 'var(--cherry-300)', animation: motion ? 'twinkle 1.9s var(--ease-in-out) infinite .8s' : 'none' }}>✦</span>
        </div>

        {/* Headline */}
        <h1 style={{
          position: 'relative', zIndex: 3, margin: '8px 0 0', maxWidth: '14ch',
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '30px', lineHeight: 1.12,
          color: 'var(--text-strong)'
        }}>
          Design your cake.<br /><span style={{ color: 'var(--cherry-500)' }}>Discover your story.</span>
        </h1>
        <p style={{
          position: 'relative', zIndex: 3, margin: '18px 0 0', maxWidth: '24ch',
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '16px', lineHeight: 1.5, color: 'var(--text-body)'
        }}>Pick your flavours, name your vibe, and unbox the cake personality that’s <em>so</em> you.</p>

        {/* flexible spacer pushes the CTA lower down the screen */}
        <div style={{ flex: '1 1 auto', minHeight: '28px' }} />

        <Button variant="cherry" size="lg" iconRight="→" onClick={onStart}
        style={{ position: 'relative', zIndex: 3, minWidth: '230px' }}
        className="springy-cta">
          Start creating
        </Button>

        <div style={{
          position: 'relative', zIndex: 3, margin: '20px 0 8px', display: 'flex', alignItems: 'center', gap: '8px',
          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '13px', color: 'var(--text-muted)'
        }}>
          <span style={{ fontFamily: 'var(--font-numeric)', fontSize: '19px', color: 'var(--cherry-500)' }}></span>
          <span style={{ fontWeight: 600 }}>stories baked this week 🎂</span>
        </div>

        {/* bottom sauce drip */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2 }}>
          <Drip color="#D90429" height={40} flip />
        </div>
      </div>);

  }

  window.Hero = Hero;
})();