// Board — saved cakes grid with share-by-URL and remix.
(function () {
  const { Button, Toast } = window.BakeSpaceDSCakeYourStory_aae867;
  const { CakeStage } = window;
  const D = window.CYS;

  const SHOWCASE = [
    { id: 's1', handle: '@mint.cake', likes: 147,
      cake: { baseId: 'pandan-layer', packagingId: 'simple', toppingIds: ['matcha'], placements: [], messageText: '', themeId: 'none' },
      personality: { emoji: '🍵', title: 'The Zen Aesthete', accent: 'var(--matcha-500)' } },
    { id: 's2', handle: '@ploycake', likes: 203,
      cake: { baseId: 'black-forest', packagingId: 'cup', toppingIds: ['cherry'], placements: [], messageText: '', themeId: 'none' },
      personality: { emoji: '🍒', title: 'The Romantic', accent: 'var(--cherry-500)' } },
    { id: 's3', handle: '@fern.bakes', likes: 89,
      cake: { baseId: 'choc-fudge', packagingId: 'box', toppingIds: ['choc-cream'], placements: [], messageText: '', themeId: 'none' },
      personality: { emoji: '⭐️', title: 'The Main Character', accent: 'var(--gold-500)' } },
    { id: 's4', handle: '@nancakes', likes: 312,
      cake: { baseId: 'butter-coffee', packagingId: 'simple', toppingIds: ['lotus'], placements: [], messageText: '', themeId: 'none' },
      personality: { emoji: '🍪', title: 'The Nostalgia Lover', accent: 'var(--gold-500)' } },
    { id: 's5', handle: '@joybaker', likes: 178,
      cake: { baseId: 'vanilla-layer', packagingId: 'cup', toppingIds: ['straw'], placements: [], messageText: '', themeId: 'none' },
      personality: { emoji: '🍓', title: 'The Sweet Dreamer', accent: 'var(--cherry-300)' } },
    { id: 's6', handle: '@belle.cakery', likes: 241,
      cake: { baseId: 'cookies-cream', packagingId: 'box', toppingIds: ['cookies'], placements: [], messageText: 'Happy birthday', themeId: 'none' },
      personality: { emoji: '🎉', title: 'The Life of the Party', accent: 'var(--cherry-500)' } },
    { id: 's7', handle: '@praesweeet', likes: 95,
      cake: { baseId: 'butter-choc', packagingId: 'box', toppingIds: ['choc'], placements: [], messageText: '', themeId: 'none' },
      personality: { emoji: '🍫', title: 'The Comfort Icon', accent: 'var(--choco-700)' } },
    { id: 's8', handle: '@samluxe', likes: 156,
      cake: { baseId: 'butter-choc', packagingId: 'box', toppingIds: ['choc-cream'], placements: [], messageText: '', themeId: 'none' },
      personality: { emoji: '🥂', title: 'The Quiet Luxe', accent: 'var(--choco-700)' } },
    { id: 's9', handle: '@aimroses', likes: 189,
      cake: { baseId: 'butter-vanilla', packagingId: 'simple', toppingIds: ['whip-cream'], placements: [], messageText: '', themeId: 'none' },
      personality: { emoji: '🍫', title: 'The Comfort Icon', accent: 'var(--choco-700)' } },
    { id: 's10', handle: '@kwanjoy', likes: 267,
      cake: { baseId: 'orange', packagingId: 'cup', toppingIds: ['cherry'], placements: [], messageText: '', themeId: 'none' },
      personality: { emoji: '🎉', title: 'The Life of the Party', accent: 'var(--cherry-500)' } },
  ];

  function encodeShareUrl(cake) {
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(cake))));
    return `${location.origin}${location.pathname}#cake=${encoded}`;
  }

  function cardStyle() {
    return {
      background: 'var(--cream-000)', border: 'var(--bw-ink-bold) solid var(--border-ink)',
      borderRadius: 'var(--radius-xl)', boxShadow: 'var(--elev-sm)', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    };
  }

  function CakePreviewBox({ cake }) {
    const topObjs = (cake.toppingIds || []).map((id) => D.toppings.find((t) => t.id === id)).filter(Boolean);
    return (
      <div style={{ background: 'var(--frosting-100)', position: 'relative', display: 'flex', justifyContent: 'center', padding: '8px 0 0' }}>
        <CakeStage
          baseId={cake.baseId}
          packagingId={cake.packagingId}
          placements={cake.placements || []}
          toppings={topObjs.map((t) => ({ id: t.id, emoji: t.emoji }))}
          name={cake.messageText || null}
          width={130} height={130}
          style={{ background: 'transparent', border: 'none', boxShadow: 'none', overflow: 'visible' }}
        />
      </div>
    );
  }

  function BoardCard({ entry, onShare, onRemix, onDelete, onLike }) {
    const p = entry.personality;
    const { cake } = entry;
    const liked = !!entry.liked;
    const date = new Date(entry.savedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    return (
      <div style={cardStyle()}>
        <div style={{ position: 'relative' }}>
          <CakePreviewBox cake={cake} />
          <button onClick={onLike} style={{
            position: 'absolute', top: '8px', right: '8px',
            background: 'var(--cream-000)', border: 'var(--bw-ink) solid var(--border-ink)',
            borderRadius: '50%', width: '30px', height: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: 'var(--elev-sm)',
            transition: 'transform 0.15s',
            transform: liked ? 'scale(1.15)' : 'scale(1)',
          }}>
            <i className={liked ? 'ph-fill ph-heart' : 'ph ph-heart'} style={{ fontSize: '16px', color: liked ? '#D90429' : 'var(--text-muted)' }} />
          </button>
        </div>
        <div style={{ padding: '8px 10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '16px' }}>{p.emoji}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '12px', color: 'var(--text-strong)', lineHeight: 1.2 }}>{p.title}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '11px', color: 'var(--text-muted)' }}>{date}</div>
          <Button variant="frosting" size="sm" full onClick={onShare}>🔗 Share link</Button>
          <Button variant="cream" size="sm" full onClick={onRemix}>↺ Remix</Button>
          <button onClick={onDelete} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '11px', color: 'var(--text-muted)',
          }}>Remove</button>
        </div>
      </div>
    );
  }

  function ShowcaseCard({ entry, onRemix }) {
    const { cake, personality: p } = entry;
    return (
      <div style={cardStyle()}>
        <div style={{ position: 'relative' }}>
          <CakePreviewBox cake={cake} />
          <div style={{
            position: 'absolute', top: '8px', right: '8px',
            background: 'var(--cream-000)', border: 'var(--bw-ink) solid var(--border-ink)',
            borderRadius: '12px', padding: '3px 7px',
            display: 'flex', alignItems: 'center', gap: '3px',
            boxShadow: 'var(--elev-sm)',
          }}>
            <i className="ph-fill ph-heart" style={{ fontSize: '12px', color: '#D90429' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '11px', color: 'var(--text-strong)' }}>{entry.likes}</span>
          </div>
        </div>
        <div style={{ padding: '8px 10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '16px' }}>{p.emoji}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '12px', color: 'var(--text-strong)', lineHeight: 1.2 }}>{p.title}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '11px', color: 'var(--text-muted)' }}>{entry.handle}</div>
          <Button variant="cream" size="sm" full onClick={() => onRemix(cake)}>↺ Try this</Button>
        </div>
      </div>
    );
  }

  function SectionHeader({ children, badge }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--text-strong)' }}>{children}</span>
        {badge && (
          <span style={{
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '11px', color: 'var(--text-muted)',
            background: 'var(--frosting-100)', border: 'var(--bw-ink) solid var(--border-ink)',
            borderRadius: 'var(--radius-pill)', padding: '2px 8px',
          }}>{badge}</span>
        )}
      </div>
    );
  }

  function Board({ board, onRemix, onDelete, onLike, onBack }) {
    const [toast, setToast] = React.useState(null);
    const tRef = React.useRef(null);
    const fire = (emoji, msg, tone = 'cherry') => {
      clearTimeout(tRef.current);
      setToast({ emoji, msg, tone, k: Date.now() });
      tRef.current = setTimeout(() => setToast(null), 1900);
    };

    const handleShare = (entry) => {
      try {
        const url = encodeShareUrl(entry.cake);
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => fire('🔗', 'Link copied!')).catch(() => fire('🔗', 'Link copied!'));
        } else { fire('🔗', 'Link copied!'); }
      } catch (e) { fire('❌', 'Could not copy', 'choco'); }
    };

    return (
      <div style={{
        position: 'absolute', inset: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column',
        padding: '28px 18px 40px',
        background: 'radial-gradient(125% 78% at 50% 26%, var(--frosting-100) 0%, var(--cream-100) 60%)',
      }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px', position: 'relative', zIndex: 3 }}>
          <Button variant="ghost" size="sm" iconLeft="←" onClick={onBack}>Back</Button>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: 'var(--text-strong)' }}>My Board 🎂</span>
          {board.length > 0 && (
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '12px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
              {board.length} saved
            </span>
          )}
        </div>

        {/* personal board */}
        <div style={{ position: 'relative', zIndex: 3, marginBottom: '28px' }}>
          {board.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
              padding: '22px 16px', textAlign: 'center',
              background: 'var(--cream-000)', border: 'var(--bw-ink) solid var(--border-ink)',
              borderRadius: 'var(--radius-xl)',
            }}>
              <div style={{ fontSize: '36px' }}>🎂</div>
              <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '13px', color: 'var(--text-muted)' }}>
                No saved cakes yet
              </p>
              <Button variant="cherry" size="sm" onClick={onBack}>Build your first cake</Button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              {board.map((entry) => (
                <BoardCard
                  key={entry.id}
                  entry={entry}
                  onShare={() => handleShare(entry)}
                  onRemix={() => onRemix(entry.cake)}
                  onDelete={() => onDelete(entry.id)}
                  onLike={() => onLike(entry.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* divider */}
        <div style={{ position: 'relative', zIndex: 3, height: '1px', background: 'var(--border-ink)', opacity: 0.12, marginBottom: '24px' }} />

        {/* showcase section */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          <SectionHeader badge="Community picks">Featured Cakes ✨</SectionHeader>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            {SHOWCASE.map((entry) => (
              <ShowcaseCard key={entry.id} entry={entry} onRemix={onRemix} />
            ))}
          </div>
        </div>

        {toast && (
          <div key={toast.k} style={{ position: 'fixed', left: '50%', bottom: '20px', transform: 'translateX(-50%)', zIndex: 40, whiteSpace: 'nowrap' }}>
            <Toast emoji={toast.emoji} tone={toast.tone}>{toast.msg}</Toast>
          </div>
        )}
      </div>
    );
  }

  window.Board = Board;
})();
