// App — orchestrates Hero → Builder → Reveal → Share with persistent cake state.
(function () {
  const D = window.CYS;
  const { AgeGate, Hero, Builder, Reveal, Share, Board } = window;
  const { useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakSlider, TweakSelect } = window;

  const STORE_KEY = 'cys_state_v1';
  const AGE_KEY = 'cys_age_v1';
  const BOARD_KEY = 'cys_board_v1';
  const DESKTOP_MQ = window.matchMedia('(min-width: 1024px)');
  const defaultCake = { packagingId: null, baseId: 'butter-vanilla', toppingIds: [], placements: [], messageId: null, messageText: '', msgX: 0.5, msgY: null, themeId: 'none' };

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "motion": true,
    "stickers": true,
    "confetti": 110,
    "startVibe": "none"
  }/*EDITMODE-END*/;

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s || !s.cake) return null;
      s.cake = { ...s.cake, toppingIds: [], placements: [], messageId: null, messageText: '', msgX: 0.5, msgY: null };
      return s;
    } catch (e) { return null; }
  }

  function loadBoard() {
    try { return JSON.parse(localStorage.getItem(BOARD_KEY)) || []; } catch (e) { return []; }
  }

  function saveBoard(b) {
    try { localStorage.setItem(BOARD_KEY, JSON.stringify(b)); } catch (e) {}
  }

  function decodeSharedCake() {
    try {
      const hash = location.hash;
      if (!hash.startsWith('#cake=')) return null;
      return JSON.parse(decodeURIComponent(escape(atob(hash.slice(6)))));
    } catch (e) { return null; }
  }

  const clearToppingsMsg = (c) => ({ ...c, toppingIds: [], placements: [], messageId: null, messageText: '', msgX: 0.5, msgY: null });

  function App() {
    const saved = React.useMemo(load, []);
    const sharedCake = React.useMemo(decodeSharedCake, []);
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const hasAge = React.useMemo(() => { try { return !!localStorage.getItem(AGE_KEY); } catch (e) { return false; } }, []);
    const [showAgeModal, setShowAgeModal] = React.useState(!hasAge);
    const [screen, setScreen] = React.useState(sharedCake ? 'reveal' : (saved ? saved.screen : 'hero'));
    const [subStep, setSubStep] = React.useState(saved ? (saved.subStep || 0) : 0);
    const [cake, setCake] = React.useState(
      sharedCake ? { ...defaultCake, ...sharedCake }
      : saved ? { ...defaultCake, ...saved.cake }
      : { ...defaultCake, themeId: TWEAK_DEFAULTS.startVibe }
    );
    const [dir, setDir] = React.useState(1);
    const [board, setBoard] = React.useState(loadBoard);

    // Clear hash after loading shared cake
    React.useEffect(() => {
      if (sharedCake) history.replaceState(null, '', location.pathname);
    }, []);

    // Reactive desktop detection — switches layout without page reload on resize
    const [isDesktop, setIsDesktop] = React.useState(DESKTOP_MQ.matches);
    React.useEffect(() => {
      const handler = (e) => setIsDesktop(e.matches);
      DESKTOP_MQ.addEventListener('change', handler);
      return () => DESKTOP_MQ.removeEventListener('change', handler);
    }, []);

    // if the user changes the starting vibe tweak while still on a fresh cake, reflect it
    const prevVibe = React.useRef(t.startVibe);
    React.useEffect(() => {
      if (t.startVibe !== prevVibe.current) {
        prevVibe.current = t.startVibe;
        setCake((c) => ({ ...c, themeId: t.startVibe }));
      }
    }, [t.startVibe]);

    React.useEffect(() => {
      try { localStorage.setItem(STORE_KEY, JSON.stringify({ screen, subStep, cake })); } catch (e) {}
    }, [screen, subStep, cake]);

    const personality = React.useMemo(() => D.computePersonality(cake), [cake]);
    const go = (next, direction = 1) => { setDir(direction); setScreen(next); };
    const restart = () => { setCake({ ...defaultCake, themeId: t.startVibe }); setSubStep(0); go('hero', -1); };

    const addToBoard = (c, p) => {
      const entry = { id: Date.now(), cake: c, personality: p, savedAt: new Date().toISOString() };
      setBoard((b) => { const next = [entry, ...b]; saveBoard(next); return next; });
    };

    const removeFromBoard = (id) => {
      setBoard((b) => { const next = b.filter((e) => e.id !== id); saveBoard(next); return next; });
    };

    const toggleLike = (id) => {
      setBoard((b) => { const next = b.map((e) => e.id === id ? { ...e, liked: !e.liked } : e); saveBoard(next); return next; });
    };

    const isSaved = board.some((e) => JSON.stringify(e.cake) === JSON.stringify(cake));

    React.useEffect(() => {
      if (screen === 'reveal' && !isSaved) addToBoard(cake, personality);
    }, [screen]);

    const motion = t.motion !== false;
    const tw = { motion, stickers: t.stickers !== false, confetti: t.confetti };

    const handleAgeSelect = (ageRange) => {
      try { localStorage.setItem(AGE_KEY, ageRange); } catch (e) {}
      try {
        fetch('https://docs.google.com/forms/d/e/1FAIpQLSesD658i-ZRVOhQaLQt6WpTL-41aqQDRfWyQuR90eHzdz41nQ/formResponse', {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ 'entry.366340186': ageRange }),
        });
      } catch (e) {}
      setShowAgeModal(false);
    };

    let content = null;
    if (screen === 'hero') content = <Hero onStart={() => { setSubStep(0); go('builder', 1); }} onBoard={() => go('board', 1)} boardCount={board.length} tw={tw} desktop={isDesktop} />;
    else if (screen === 'builder') content = (
      <Builder cake={cake} setCake={setCake} subStep={subStep} setSubStep={setSubStep}
        onReveal={() => go('reveal', 1)} onExit={() => { setCake(clearToppingsMsg); go('hero', -1); }} tw={tw} desktop={isDesktop} />
    );
    else if (screen === 'reveal') content = (
      <Reveal cake={cake} personality={personality}
        onShare={() => go('share', 1)} onRemix={() => { setCake(clearToppingsMsg); setSubStep(2); go('builder', -1); }}
        onSave={() => addToBoard(cake, personality)} saved={isSaved} onBoard={() => go('board', 1)}
        tw={tw} desktop={isDesktop} />
    );
    else if (screen === 'share') content = (
      <Share cake={cake} personality={personality}
        onRemix={() => { setCake(clearToppingsMsg); setSubStep(2); go('builder', -1); }} onRestart={restart} onBoard={() => go('board', 1)} tw={tw} desktop={isDesktop} />
    );
    else if (screen === 'board') content = (
      <Board board={board} onRemix={(c) => { setCake(clearToppingsMsg(c)); setSubStep(2); go('builder', -1); }} onDelete={removeFromBoard} onLike={toggleLike} onBack={() => go('hero', -1)} />
    );

    return (
      <React.Fragment>
        <div key={screen} className="screen-anim" data-dir={dir > 0 ? 'fwd' : 'back'} style={{ minHeight: '100%' }}>
          {content}
        </div>
        {showAgeModal && <AgeGate onContinue={handleAgeSelect} tw={tw} />}
        <TweaksPanel>
          <TweakSection label="Motion & decor" />
          <TweakToggle label="Springy motion" value={t.motion} onChange={(v) => setTweak('motion', v)} />
          <TweakToggle label="Floating stickers" value={t.stickers} onChange={(v) => setTweak('stickers', v)} />
          <TweakSlider label="Confetti burst" value={t.confetti} min={30} max={200} step={10} unit=" bits"
            onChange={(v) => setTweak('confetti', v)} />
          <TweakSection label="Campaign" />
          <TweakSelect label="Starting vibe" value={t.startVibe}
            options={D.themes.map((x) => ({ value: x.id, label: x.label }))}
            onChange={(v) => setTweak('startVibe', v)} />
        </TweaksPanel>
      </React.Fragment>
    );
  }

  window.CYSApp = App;
})();
