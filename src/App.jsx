// App — orchestrates Hero → Builder → Reveal → Share with persistent cake state.
(function () {
  const D = window.CYS;
  const { Hero, Builder, Reveal, Share } = window;
  const { useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakSlider, TweakSelect } = window;

  const STORE_KEY = 'cys_state_v1';
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

  const clearToppingsMsg = (c) => ({ ...c, toppingIds: [], placements: [], messageId: null, messageText: '', msgX: 0.5, msgY: null });

  function App() {
    const saved = React.useMemo(load, []);
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const [screen, setScreen] = React.useState(saved ? saved.screen : 'hero');
    const [subStep, setSubStep] = React.useState(saved ? (saved.subStep || 0) : 0);
    const [cake, setCake] = React.useState(saved
      ? { ...defaultCake, ...saved.cake }
      : { ...defaultCake, themeId: TWEAK_DEFAULTS.startVibe });
    const [dir, setDir] = React.useState(1);

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

    const motion = t.motion !== false;
    const tw = { motion, stickers: t.stickers !== false, confetti: t.confetti };

    let content = null;
    if (screen === 'hero') content = <Hero onStart={() => { setSubStep(0); go('builder', 1); }} tw={tw} desktop={isDesktop} />;
    else if (screen === 'builder') content = (
      <Builder cake={cake} setCake={setCake} subStep={subStep} setSubStep={setSubStep}
        onReveal={() => go('reveal', 1)} onExit={() => { setCake(clearToppingsMsg); go('hero', -1); }} tw={tw} desktop={isDesktop} />
    );
    else if (screen === 'reveal') content = (
      <Reveal cake={cake} personality={personality}
        onShare={() => go('share', 1)} onRemix={() => { setCake(clearToppingsMsg); setSubStep(2); go('builder', -1); }} tw={tw} desktop={isDesktop} />
    );
    else if (screen === 'share') content = (
      <Share cake={cake} personality={personality}
        onRemix={() => { setCake(clearToppingsMsg); setSubStep(2); go('builder', -1); }} onRestart={restart} tw={tw} desktop={isDesktop} />
    );

    return (
      <React.Fragment>
        <div key={screen} className="screen-anim" data-dir={dir > 0 ? 'fwd' : 'back'} style={{ minHeight: '100%' }}>
          {content}
        </div>
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
