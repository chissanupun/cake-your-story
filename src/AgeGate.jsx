// AgeGate — cute modal popup shown once per visitor, stores age range to localStorage.
(function () {
  const { Button, Badge, Drip } = window.BakeSpaceDSCakeYourStory_aae867;

  const AGE_RANGES = [
    { id: 'under-18', label: 'Under 18' },
    { id: '18-24', label: '18–24' },
    { id: '25-34', label: '25–34' },
    { id: '35-44', label: '35–44' },
    { id: '45+', label: '45+' },
  ];

  function AgeGate({ onContinue, tw = {} }) {
    const motion = tw.motion !== false;
    const [selected, setSelected] = React.useState(null);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const t = setTimeout(() => setVisible(true), 320);
      return () => clearTimeout(t);
    }, []);

    const handleContinue = () => {
      if (!selected) return;
      const range = AGE_RANGES.find((r) => r.id === selected);
      onContinue(range ? range.label : selected);
    };

    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        background: 'rgba(58, 35, 20, 0.45)',
        backdropFilter: 'blur(4px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          position: 'relative', width: '100%', maxWidth: '380px',
          background: 'var(--cream-000)',
          border: 'var(--bw-ink-bold) solid var(--border-ink)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--elev-lg)',
          overflow: 'hidden',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
          transition: 'transform 0.35s var(--ease-spring)',
          textAlign: 'center',
        }}>
          {/* top drip */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}>
            <Drip color="#D90429" height={36} />
          </div>

          {/* cake emoji header band */}
          <div style={{ background: 'var(--frosting-100)', padding: '44px 20px 16px', position: 'relative', zIndex: 0 }}>
            <div style={{
              fontSize: '52px', lineHeight: 1,
              animation: motion ? 'float-idle 4s var(--ease-in-out) infinite' : 'none',
              filter: 'drop-shadow(0 4px 0 rgba(58,35,20,.18))',
            }}>🎂</div>
          </div>

          <div style={{ padding: '18px 24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
            <Badge tone="gold" icon="✦">Quick survey</Badge>

            <p style={{
              margin: '14px 0 4px', maxWidth: '28ch',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '14px', lineHeight: 1.5,
              color: 'var(--text-muted)',
            }}>Please fill out this quick survey before entering!</p>

            <p style={{
              margin: '4px 0 18px',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', lineHeight: 1.1,
              color: 'var(--text-strong)',
            }}>How old are you? 🎈</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px', justifyContent: 'center', marginBottom: '22px' }}>
              {AGE_RANGES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  style={{
                    fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px',
                    padding: '9px 18px',
                    border: '2.5px solid var(--border-ink)',
                    borderRadius: 'var(--radius-pill)',
                    cursor: 'pointer',
                    transition: 'background 0.14s, color 0.14s, transform 0.14s, box-shadow 0.14s',
                    background: selected === r.id ? 'var(--cherry-500)' : 'var(--cream-100)',
                    color: selected === r.id ? 'var(--cream-000)' : 'var(--text-strong)',
                    boxShadow: selected === r.id ? 'var(--elev-sm)' : 'none',
                    transform: selected === r.id ? 'scale(1.07)' : 'scale(1)',
                  }}
                >{r.label}</button>
              ))}
            </div>

            <Button
              variant="cherry"
              size="lg"
              iconRight="→"
              onClick={handleContinue}
              style={{ minWidth: '200px', opacity: selected ? 1 : 0.4, pointerEvents: selected ? 'auto' : 'none' }}
              className={selected ? 'springy-cta' : ''}
            >
              Let's go!
            </Button>
          </div>
        </div>
      </div>
    );
  }

  window.AgeGate = AgeGate;
})();
