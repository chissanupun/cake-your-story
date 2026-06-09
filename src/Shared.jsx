// Shared UI bits for Cake Your Story — logo lockup, floating stickers, progress.
(function () {
  const { Badge } = window.BakeSpaceDSCakeYourStory_aae867;

  // The sticker wordmark lockup.  size: 'sm' | 'md' | 'lg'
  function Logo({ size = 'md', byline = true }) {
    const scale = { sm: 0.5, md: 0.78, lg: 1, xl: 1.2 }[size] || 0.78;
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1, userSelect: 'none' }}>
        <div className="sticker-text" style={{ fontSize: `${30 * scale}px`, color: 'var(--cherry-500)', transform: 'rotate(-3deg)' }}>Cake your</div>
        <div className="sticker-text" style={{ fontSize: `${64 * scale}px`, color: 'var(--cream-000)', marginTop: `${-6 * scale}px` }}>Story</div>
        {byline && (
          <span style={{
            marginTop: `${8 * scale}px`, fontFamily: 'var(--font-body)', fontWeight: 800,
            fontSize: `${12 * scale + 2}px`, letterSpacing: '.18em', textTransform: 'uppercase',
            color: 'var(--choco-700)', display: 'inline-flex', alignItems: 'center', gap: '7px',
          }}>
            <span style={{ width: '18px', height: '2px', background: 'var(--choco-300)', borderRadius: '2px' }} />
            by S&amp;P
            <span style={{ width: '18px', height: '2px', background: 'var(--choco-300)', borderRadius: '2px' }} />
          </span>
        )}
      </div>
    );
  }

  // Floating sticker-bomb layer. `stickers` = array of emoji glyphs.
  function FloatingStickers({ stickers, motion = true }) {
    const slots = [
      { top: '11%', left: '7%',  sz: 44, dur: 5.2, anim: 'float-idle',  rot: -8 },
      { top: '16%', left: '85%', sz: 30, dur: 6.4, anim: 'float-drift', rot: 10 },
      { top: '34%', left: '90%', sz: 40, dur: 7.1, anim: 'float-idle',  rot: 6 },
      { top: '60%', left: '5%',  sz: 34, dur: 6.0, anim: 'float-drift', rot: -10 },
      { top: '74%', left: '88%', sz: 42, dur: 5.6, anim: 'float-idle',  rot: 8 },
      { top: '85%', left: '12%', sz: 36, dur: 6.8, anim: 'float-drift', rot: -6 },
    ];
    return (
      <React.Fragment>
        {stickers.map((e, i) => {
          const s = slots[i % slots.length];
          return (
            <span key={i} aria-hidden="true" style={{
              position: 'absolute', top: s.top, left: s.left, fontSize: s.sz, lineHeight: 1, zIndex: 1,
              '--rot': `${s.rot}deg`, transform: `rotate(${s.rot}deg)`,
              filter: 'drop-shadow(0 5px 0 rgba(58,35,20,.16)) drop-shadow(0 7px 11px rgba(58,35,20,.16))',
              animation: motion ? `${s.anim} ${s.dur}s var(--ease-in-out) infinite` : 'none',
              pointerEvents: 'none',
            }}>{e}</span>
          );
        })}
      </React.Fragment>
    );
  }

  // Step progress — chunky chocolate-outlined dots with a cherry fill.
  function Progress({ step, total, labels }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
        {Array.from({ length: total }).map((_, i) => {
          const done = i < step, active = i === step;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: active ? '30px' : '12px', height: '12px',
                borderRadius: '999px',
                background: done || active ? 'var(--cherry-500)' : 'var(--cream-000)',
                border: '2px solid var(--border-ink)',
                transition: 'width var(--dur-base) var(--ease-spring), background var(--dur-fast) var(--ease-out)',
              }} />
            </div>
          );
        })}
      </div>
    );
  }

  window.CYSUI = { Logo, FloatingStickers, Progress };
})();
