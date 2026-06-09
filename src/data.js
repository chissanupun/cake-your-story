/* ============================================================
   Cake Your Story by S&P — content + personality engine
   Plain JS, attached to window. Loaded with a normal <script>.
   ============================================================ */
(function () {
  // ---- STEP 1 · Packaging (select 1) ----------------------
  // Real S&P packshot art (transparent PNGs). `img` is shown in the Step 1
  // choice card and composited into the live CakeStage preview.
  const packaging = [
    { id: 'cup',    emoji: '🥤', img: 'assets/pack-cup-new.webp',   label: 'Cup',     en: 'Cup',     caption: 'Layered cup cake',  tags: ['playful', 'fresh', 'fun'],          trait_en: 'spontaneous and joyfully present' },
    { id: 'box',    emoji: '🎁', img: 'assets/pack-box-new.webp',   label: 'Box',     en: 'Box',     caption: 'Whole cake, boxed', tags: ['celebratory', 'luxe', 'extra'],      trait_en: 'thoughtful and always celebration-ready' },
    { id: 'simple', emoji: '🎂', img: 'assets/pack-board.png', label: 'Classic', en: 'Classic', caption: 'On a cake board',   tags: ['classic', 'minimalist', 'fresh'],    trait_en: 'effortlessly elegant and refreshingly real' },
  ];

  // ---- Packaging compositing layout ----------------------
  // Drives how CakeStage layers the drawn cake against each packshot, and how
  // far toppings can be dropped (`field`, container-fraction bounds). The cup &
  // box images are see-through glass that OVERLAY the cake (vessel); the board
  // sits UNDER the cake. All values are fractions of the square preview box.
  const packLayout = {
    none:   { cakeScale: 1.00, cakeY:  0.00, plate: true,  vessel: null,  board: null,
              msgTop: 0.63, field: { x0: 0.13, x1: 0.87, y0: 0.27, y1: 0.70 } },
    cup:    { cakeScale: 0.50, cakeY:  0.16, plate: false, vessel: { src: 'assets/pack-cup.png',   w: 0.92, top: 0.02 }, board: null,
              msgTop: 0.62, field: { x0: 0.36, x1: 0.64, y0: 0.46, y1: 0.62 } },
    box:    { cakeScale: 0.58, cakeY:  0.12, plate: false, vessel: { src: 'assets/pack-box.png',   w: 0.98, top: 0.13 }, board: null,
              msgTop: 0.58, field: { x0: 0.32, x1: 0.68, y0: 0.42, y1: 0.60 } },
    simple: { cakeScale: 0.80, cakeY: -0.14, plate: false, vessel: null, board: { src: 'assets/pack-board.png', w: 1.00, top: 0.52 },
              msgTop: 0.45, field: { x0: 0.24, x1: 0.76, y0: 0.20, y1: 0.50 } },
  };

  // ---- STEP 2 · Cake flavor (select 1) --------------------
  // `pal` drives the drawn cake preview (sponge + frosting colors). `base` is
  // the glyph shown on the result card. Placeholder emoji — swap for art later.
  const flavors = [
    { id: 'butter-vanilla', emoji: '🍰', label: 'Butter Vanilla',   en: 'Butter vanilla',  caption: 'Buttery & classic',  base: '🍰', tags: ['classic', 'wholesome', 'warm'], trait_en: 'warm, timeless, and quietly confident',
      cupImg: 'assets/cake/cup/with_text/vanilla_butter.webp', stageImg: 'assets/cake/cup/clean/vanilla_butter.webp',
      boxImg: 'assets/cake/box/with_text/vanilla_butter.webp', boxStageImg: 'assets/cake/box/clean/vanilla_butter.webp',
      simpleImg: 'assets/cake/Simple/with_text/vanilla_butter.webp', simpleStageImg: 'assets/cake/Simple/clean/vanilla_butter.webp',
      pal: { sponge: '#F5E0A8', spongeDark: '#E8CE89', frost: '#FFFCF2', frostShade: '#F3E7CF' } },
    { id: 'black-forest', emoji: '🍒', label: 'Black Forest',       en: 'Black forest',    caption: 'Cherry & dark choc', base: '🍒', tags: ['romantic', 'bold', 'luxe'], trait_en: 'passionate, deep, and romantically bold',
      cupImg: 'assets/cake/cup/with_text/black_forest.webp', stageImg: 'assets/cake/cup/clean/black_forest.webp',
      boxImg: 'assets/cake/box/with_text/black_forest.webp', boxStageImg: 'assets/cake/box/clean/black_forest.webp',
      simpleImg: 'assets/cake/Simple/with_text/black_forest.webp', simpleStageImg: 'assets/cake/Simple/clean/black_forest.webp',
      pal: { sponge: '#4A2C1A', spongeDark: '#371F12', frost: '#FFF6F5', frostShade: '#F1D9D6' } },
    { id: 'butter-coffee', emoji: '☕', label: 'Butter Coffee',       en: 'Butter coffee',   caption: 'Roasty coffee butter', base: '☕', tags: ['cozy', 'chic', 'nostalgic'], trait_en: 'grounded, sophisticated, and quietly driven',
      cupImg: 'assets/cake/cup/with_text/coffee_butter.webp', stageImg: 'assets/cake/cup/clean/coffee.webp',
      boxImg: 'assets/cake/box/with_text/coffee_butter.webp', boxStageImg: 'assets/cake/box/clean/coffee_butter.webp',
      simpleImg: 'assets/cake/Simple/with_text/coffee_butter.webp', simpleStageImg: 'assets/cake/Simple/clean/coffee_butter.webp',
      pal: { sponge: '#B98A5E', spongeDark: '#9C7048', frost: '#D8B591', frostShade: '#B98F66' } },
    { id: 'butter-choc', emoji: '🍫', label: 'Butter Chocolate',    en: 'Butter chocolate', caption: 'Rich butter choc',   base: '🍫', tags: ['cozy', 'bold', 'luxe'], trait_en: 'rich, indulgent, and warmly generous',
      cupImg: 'assets/cake/cup/with_text/chocolate_butter.webp', stageImg: 'assets/cake/cup/clean/choclate_butter.webp',
      boxImg: 'assets/cake/box/with_text/chocolate_butter.webp', boxStageImg: 'assets/cake/box/clean/choclate_butter.webp',
      simpleImg: 'assets/cake/Simple/with_text/chocolate_butter.webp', simpleStageImg: 'assets/cake/Simple/clean/chocolate_butter.webp',
      pal: { sponge: '#6E4528', spongeDark: '#5A3720', frost: '#8A5A36', frostShade: '#724523' } },
    { id: 'choc-fudge', emoji: '🟫', label: 'Chocolate Fudge',        en: 'Chocolate fudge', caption: 'Deep dark fudge',    base: '🍩', tags: ['bold', 'luxe', 'extra'], trait_en: 'intense, bold, and unapologetically extra',
      cupImg: 'assets/cake/cup/with_text/chocolate_fudge.webp', stageImg: 'assets/cake/cup/clean/chocolate_fudge.webp',
      boxImg: 'assets/cake/box/with_text/chocolate_fudge.webp', boxStageImg: 'assets/cake/box/clean/chocolate_fudge.webp',
      simpleImg: 'assets/cake/Simple/with_text/chocolate_fudge.webp', simpleStageImg: 'assets/cake/Simple/clean/chocolate_fudge.webp',
      pal: { sponge: '#3E2517', spongeDark: '#2A180E', frost: '#5A3520', frostShade: '#43271A' } },
    { id: 'orange', emoji: '🍊', label: 'Orange',                     en: 'Orange',          caption: 'Bright citrus',      base: '🍊', tags: ['fresh', 'energetic', 'playful'], trait_en: 'bright, energetic, and refreshingly free-spirited',
      cupImg: 'assets/cake/cup/with_text/orange.webp', stageImg: 'assets/cake/cup/clean/orange.webp',
      boxImg: 'assets/cake/box/with_text/orange.webp',   boxStageImg: 'assets/cake/box/clean/orange.webp',
      simpleImg: 'assets/cake/Simple/with_text/orange.webp', simpleStageImg: 'assets/cake/Simple/clean/orange.webp',
      pal: { sponge: '#F4B24E', spongeDark: '#E2992E', frost: '#FFF3DC', frostShade: '#F6E2B8' } },
    { id: 'pandan-layer', emoji: '🍃', label: 'Pandan Layer',         en: 'Pandan layer',    caption: 'Fragrant pandan',    base: '🍃', tags: ['zen', 'fresh', 'minimalist'], trait_en: 'calm, graceful, and beautifully intentional',
      cupImg: 'assets/cake/cup/with_text/pandan.webp', stageImg: 'assets/cake/cup/clean/pandan.webp',
      boxImg: 'assets/cake/box/with_text/pandan.webp',   boxStageImg: 'assets/cake/box/clean/pandan.webp',
      simpleImg: 'assets/cake/Simple/with_text/pandan.webp', simpleStageImg: 'assets/cake/Simple/clean/pandan.webp',
      pal: { sponge: '#8FBF6E', spongeDark: '#73A352', frost: '#EAF5DD', frostShade: '#CDE4B6' } },
    { id: 'vanilla-layer', emoji: '🍦', label: 'Vanilla Layer',       en: 'Vanilla layer',   caption: 'Soft vanilla layers', base: '🍦', tags: ['classic', 'dreamy', 'sweet'], trait_en: 'soft, dreamy, and tenderly sincere',
      cupImg: 'assets/cake/cup/with_text/vanilla_layer.webp', stageImg: 'assets/cake/cup/clean/vanilla_layer.webp',
      boxImg: 'assets/cake/box/with_text/vanilla_layer.webp', boxStageImg: 'assets/cake/box/clean/vanilla_layer.webp',
      simpleImg: 'assets/cake/Simple/with_text/vanilla_layer.webp', simpleStageImg: 'assets/cake/Simple/clean/vanilla_layer.webp',
      pal: { sponge: '#F2DCB6', spongeDark: '#E3C595', frost: '#FFFCF6', frostShade: '#F3E7D4' } },
    { id: 'cookies-cream', emoji: '🍪', label: 'Cookies & Cream', en: 'Cookies & cream white choc', caption: 'Cookies & white choc', base: '🍪', tags: ['playful', 'nostalgic', 'fun'], trait_en: 'playful, nostalgic, and delightfully fun',
      cupImg: 'assets/cake/cup/with_text/cookie_and_cream.webp', stageImg: 'assets/cake/cup/clean/cookie_and_cream.webp',
      boxImg: 'assets/cake/box/with_text/cookie_and_cream.webp', boxStageImg: 'assets/cake/box/clean/cookie_and_cream.webp',
      simpleImg: 'assets/cake/Simple/with_text/cookie_and_cream.webp', simpleStageImg: 'assets/cake/Simple/clean/cookie_and_cream.webp',
      pal: { sponge: '#E5D6BF', spongeDark: '#9E8A6E', frost: '#FFFDF9', frostShade: '#ECE1CF' } },
  ];
  // alias kept so any older reference to `bases` keeps working
  const bases = flavors;

  // ---- STEP 2 · Toppings (select up to 3) -----------------
  const TOPPING_MAX = 3;
  const toppings = [
    { id: 'cherry',     emoji: '🍒', label: 'Cherry',        img: 'assets/Topping/1.png', tags: ['romantic', 'bold', 'extra'],         keyword_en: 'sweetly romantic' },
    { id: 'straw',      emoji: '🍓', label: 'Strawberry',    img: 'assets/Topping/2.png', tags: ['sweet', 'dreamy', 'wholesome'],      keyword_en: 'tenderly wholesome' },
    { id: 'choc',       emoji: '🍫', label: 'Chocolate',     img: 'assets/Topping/3.png', tags: ['cozy', 'nostalgic', 'luxe'],         keyword_en: 'richly nostalgic' },
    { id: 'lotus',      emoji: '🍪', label: 'Lotus',         img: 'assets/Topping/4.png', tags: ['playful', 'nostalgic', 'cozy'],      keyword_en: 'warmly comforting' },
    { id: 'cookies',    emoji: '🍪', label: 'Oreo',          img: 'assets/Topping/5.png', tags: ['playful', 'nostalgic', 'fun'],       keyword_en: 'playfully carefree' },
    { id: 'whip-cream', emoji: '🍦', label: 'Whipped cream', img: 'assets/Topping/6.png', tags: ['sweet', 'classic', 'wholesome'],    keyword_en: 'softly dreamy' },
    { id: 'choc-cream', emoji: '🍫', label: 'Choc cream',    img: 'assets/Topping/7.png', tags: ['cozy', 'bold', 'luxe'],             keyword_en: 'boldly indulgent' },
    { id: 'matcha',     emoji: '🍵', label: 'Matcha',        img: 'assets/Topping/8.png', tags: ['zen', 'fresh', 'minimalist'],       keyword_en: 'serenely balanced' },
  ];
  // map a topping id to the little icing glyph hint on the cake
  const toppingIcing = { cherry: '🍒', straw: '🍓', choc: '🍫', lotus: '🍪', cookies: '🍪', 'whip-cream': '🍦', 'choc-cream': '🍫', matcha: '🍵' };

  // ---- STEP 3 · Cake message (select 1) -------------------
  const messages = [
    { id: 'birthday',  text: 'Happy birthday',       tags: ['celebratory', 'energetic', 'extra'] },
    { id: 'congrats',  text: 'Congrats!',             tags: ['celebratory', 'bold', 'adventurous'] },
    { id: 'thankyou',  text: 'Thank you',             tags: ['sentimental', 'wholesome', 'warm'] },
    { id: 'love',      text: 'I love you',            tags: ['romantic', 'sentimental', 'dreamy'] },
    { id: 'goodluck',  text: 'Good luck',             tags: ['adventurous', 'energetic', 'hopeful'] },
    { id: 'justbcuz',  text: 'Just because',          tags: ['playful', 'mysterious', 'chic'] },
    { id: 'sixseven',  text: '67 67 67 67 67',        tags: ['playful', 'fun', 'extra'] },
    { id: 'birthwme',  text: 'Birth but with me',  tags: ['romantic', 'celebratory', 'bold'] },
  ];

  // ---- STEP 4 · Campaign themes (optional) ----------------
  // Each theme re-skins the builder backdrop, drip + floating stickers
  // WITHOUT touching cake progress.
  const themes = [
    {
      id: 'none', label: 'Classic cream', emoji: '✦', tags: [],
      drip: '#D90429',
      bg: 'radial-gradient(125% 85% at 50% 22%, var(--frosting-100) 0%, var(--cream-100) 60%)',
      stickers: ['🍒', '✦', '🧁', '⭐️', '🍓', '🍩'],
    },
    {
      id: 'pride', label: 'Pride month', emoji: '🏳️‍🌈', tags: ['bold', 'extra', 'celebratory'],
      drip: '#E5484D',
      bg: 'linear-gradient(180deg, #FDEFEF 0%, var(--cream-100) 45%), radial-gradient(120% 70% at 50% 0%, rgba(162,210,255,.35), transparent 60%)',
      stickers: ['🌈', '❤️', '🧡', '💛', '💚', '💜'],
    },
    {
      id: 'grad', label: 'Graduation', emoji: '🎓', tags: ['adventurous', 'celebratory', 'luxe'],
      drip: '#3B2314',
      bg: 'radial-gradient(125% 85% at 50% 18%, #FDEBD8 0%, var(--cream-100) 62%)',
      stickers: ['🎓', '✨', '📜', '⭐️', '🎉', '🦉'],
    },
    {
      id: 'christmas', label: 'Christmas', emoji: '🎄', tags: ['cozy', 'wholesome', 'nostalgic'],
      drip: '#2E8B57',
      bg: 'radial-gradient(125% 85% at 50% 16%, #E9F3EC 0%, var(--cream-100) 60%)',
      stickers: ['🎄', '❄️', '🎁', '⛄', '🔔', '🍪'],
    },
  ];

  // ---- 20 personality archetypes --------------------------
  // matchTags drive scoring; traits + mood are for display.
  const personalities = [
    { id: 'romantic',   emoji: '🍒', title: 'The Romantic',        accent: 'var(--cherry-500)',   match: ['romantic', 'dreamy', 'sentimental'], traits: ['Soft-hearted', 'Devoted', 'A little extra'], mood: 'Cherry-kissed & warm', desc: 'You love loudly and bake like it. Every layer is a love letter — sweet, a touch dramatic, impossible not to adore.' },
    { id: 'maincharacter', emoji: '⭐️', title: 'The Main Character', accent: 'var(--gold-500)',  match: ['bold', 'extra', 'celebratory'], traits: ['Magnetic', 'Bold', 'Unforgettable'], mood: 'Spotlight sparkle', desc: 'The room shifts when you walk in. Your cake doesn’t sit on the table — it makes an entrance, just like you.' },
    { id: 'comfort',    emoji: '🍫', title: 'The Comfort Icon',     accent: 'var(--choco-700)',    match: ['cozy', 'nostalgic', 'wholesome'], traits: ['Grounding', 'Loyal', 'Cosy'], mood: 'Deep chocolate hug', desc: 'You’re everyone’s safe place. Your cake tastes like a long hug and a “you’ve got this.”' },
    { id: 'zen',        emoji: '🍵', title: 'The Zen Aesthete',     accent: 'var(--matcha-500)',   match: ['zen', 'minimalist', 'chic'], traits: ['Calm', 'Intentional', 'Refined'], mood: 'Matcha & quiet luxe', desc: 'Less, but better. You design with calm hands and impeccable taste — a cake that whispers instead of shouts.' },
    { id: 'dreamer',    emoji: '🍓', title: 'The Sweet Dreamer',    accent: 'var(--cherry-300)',   match: ['sweet', 'dreamy', 'wholesome'], traits: ['Tender', 'Hopeful', 'Gentle'], mood: 'Strawberry daydream', desc: 'Head in the clouds, heart full of sugar. Your cake is a soft pink wish you’re quietly making come true.' },
    { id: 'party',      emoji: '🎉', title: 'The Life of the Party',accent: 'var(--cherry-500)',   match: ['celebratory', 'energetic', 'extra'], traits: ['Electric', 'Generous', 'Fun'], mood: 'Confetti overload', desc: 'No occasion too small for cake. You turn a Tuesday into a celebration and hand everyone a slice.' },
    { id: 'nostalgia',  emoji: '🍪', title: 'The Nostalgia Lover',  accent: 'var(--gold-500)',     match: ['nostalgic', 'playful', 'cozy'], traits: ['Sentimental', 'Playful', 'Warm'], mood: 'Cookies & cream rewind', desc: 'You keep the receipts, the playlists, the inside jokes. Your cake tastes like a memory you never want to lose.' },
    { id: 'luxe',       emoji: '🥂', title: 'The Quiet Luxe',       accent: 'var(--choco-700)',    match: ['luxe', 'chic', 'minimalist'], traits: ['Polished', 'Discerning', 'Effortless'], mood: 'Understated decadence', desc: 'You don’t chase trends; they chase you. Your cake is expensive-feeling restraint, finished to the gram.' },
    { id: 'freespirit', emoji: '🦋', title: 'The Free Spirit',      accent: 'var(--frosting-500)', match: ['adventurous', 'fresh', 'playful'], traits: ['Curious', 'Open', 'Breezy'], mood: 'Fresh-air whimsy', desc: 'Rules are suggestions. You mix flavours nobody asked for and somehow it’s genius — light, fresh, unbothered.' },
    { id: 'sweetheart', emoji: '💌', title: 'The Hopeless Sweetheart', accent: 'var(--cherry-300)', match: ['sentimental', 'romantic', 'warm'], traits: ['Caring', 'Soft', 'Generous'], mood: 'Hand-written love', desc: 'You remember birthdays and how everyone takes their coffee. Your cake is a thank-you note you can eat.' },
    { id: 'trailblazer',emoji: '🔥', title: 'The Bold Trailblazer', accent: 'var(--cherry-500)',   match: ['bold', 'adventurous', 'energetic'], traits: ['Driven', 'Fearless', 'First'], mood: 'Cherry-bomb heat', desc: 'You go first so others can follow. Your cake is loud, confident, and a little dangerous — exactly the point.' },
    { id: 'homebody',   emoji: '🧸', title: 'The Cozy Homebody',    accent: 'var(--gold-500)',     match: ['cozy', 'wholesome', 'classic'], traits: ['Soft', 'Steady', 'Homey'], mood: 'Warm-kitchen classic', desc: 'Soft socks, slow mornings, the good blanket. Your cake is comfort baked into a perfect, familiar slice.' },
    { id: 'trickster',  emoji: '🃏', title: 'The Playful Trickster',accent: 'var(--frosting-500)', match: ['playful', 'mysterious', 'fun'], traits: ['Witty', 'Spontaneous', 'Surprising'], mood: 'Sweet plot twist', desc: 'Just when they think they’ve got you figured out — surprise. Your cake hides a grin and a wink in every layer.' },
    { id: 'optimist',   emoji: '✨', title: 'The Golden Optimist',  accent: 'var(--gold-500)',     match: ['hopeful', 'energetic', 'celebratory'], traits: ['Bright', 'Warm', 'Encouraging'], mood: 'Good-luck gold', desc: 'You find the bright side and frost it gold. Your cake is a little “you’ve got this” for everyone who needs one.' },
    { id: 'classic',    emoji: '🤍', title: 'The Classic Soul',     accent: 'var(--choco-700)',    match: ['classic', 'chic', 'wholesome'], traits: ['Timeless', 'Graceful', 'Sincere'], mood: 'Clean cream elegance', desc: 'Trends fade; you don’t. Your cake is the little white dress of desserts — simple, sincere, always right.' },
    { id: 'maximalist', emoji: '💅', title: 'The Extra Maximalist', accent: 'var(--cherry-500)',   match: ['extra', 'bold', 'luxe'], traits: ['Lavish', 'Daring', 'More-is-more'], mood: 'Everything, all at once', desc: 'Why pick one topping? You picked all of them. Your cake is gloriously, unapologetically too much — perfect.' },
    { id: 'minimalist', emoji: '🌿', title: 'The Fresh Minimalist', accent: 'var(--matcha-500)',   match: ['fresh', 'minimalist', 'zen'], traits: ['Clear', 'Light', 'Precise'], mood: 'Crisp & green', desc: 'Clean lines, clear head, clutter-free. Your cake is a breath of fresh air with nothing it doesn’t need.' },
    { id: 'daydreamer', emoji: '☁️', title: 'The Daydreamer',       accent: 'var(--frosting-500)', match: ['dreamy', 'sweet', 'romantic'], traits: ['Imaginative', 'Soft', 'Floaty'], mood: 'Cotton-candy clouds', desc: 'You live three stories ahead in the best way. Your cake is a soft, sugary daydream you finally got to keep.' },
    { id: 'bestie',     emoji: '🤗', title: 'The Wholesome Bestie', accent: 'var(--matcha-500)',   match: ['wholesome', 'warm', 'sentimental'], traits: ['Supportive', 'Kind', 'Present'], mood: 'Group-hug sweet', desc: 'You’re the one who shows up. Your cake is made for sharing, because joy was never meant to be eaten alone.' },
    { id: 'muse',       emoji: '🌙', title: 'The Mysterious Muse',  accent: 'var(--choco-900)',    match: ['mysterious', 'chic', 'luxe'], traits: ['Intriguing', 'Cool', 'Magnetic'], mood: 'Midnight & velvet', desc: 'A little unknowable, endlessly interesting. Your cake keeps its secrets — dark, elegant, impossible to forget.' },
  ];

  // ---- Personality scoring --------------------------------
  function hashStr(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0);
  }

  function computePersonality(cake) {
    const packObj = packaging.find((p) => p.id === cake.packagingId);
    const baseObj = flavors.find((b) => b.id === cake.baseId);
    const topObjs = (cake.toppingIds || []).map((id) => toppings.find((t) => t.id === id)).filter(Boolean);
    const msgObj = messages.find((m) => m.id === cake.messageId);
    const themeObj = themes.find((t) => t.id === (cake.themeId || 'none'));

    const tagBag = [];
    if (packObj) tagBag.push(...packObj.tags);
    if (baseObj) tagBag.push(...baseObj.tags);
    topObjs.forEach((t) => tagBag.push(...t.tags));
    if (msgObj) tagBag.push(...msgObj.tags);
    if (themeObj) tagBag.push(...themeObj.tags);

    const counts = {};
    tagBag.forEach((t) => { counts[t] = (counts[t] || 0) + 1; });

    const sig = [cake.packagingId, cake.baseId, [...(cake.toppingIds || [])].sort().join('-'), cake.messageId, cake.themeId].join('|');
    const jitter = hashStr(sig);

    let best = null, bestScore = -1;
    personalities.forEach((p, idx) => {
      let score = 0;
      p.match.forEach((tag) => { score += (counts[tag] || 0) * 3; });
      // deterministic tie-break + light spread so all archetypes stay reachable
      score += ((jitter >> idx) & 7) * 0.13;
      if (score > bestScore) { bestScore = score; best = p; }
    });
    return best || personalities[0];
  }

  function joinAnd(arr) {
    if (!arr.length) return '';
    if (arr.length === 1) return arr[0];
    return arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1];
  }

  function generateStory(cake) {
    const flavorObj = flavors.find((f) => f.id === cake.baseId);
    const pkgObj    = packaging.find((p) => p.id === cake.packagingId);
    const topObjs   = (cake.toppingIds || []).map((id) => toppings.find((t) => t.id === id)).filter(Boolean);
    if (!flavorObj || !pkgObj) return null;

    const toppingKeywords = topObjs.map((t) => t.keyword_en).filter(Boolean);
    const toppingNames    = topObjs.map((t) => t.label);

    const toppingTrait = toppingKeywords.length ? joinAnd(toppingKeywords) : 'effortlessly simple and authentic';
    const toppingNamesStr = toppingNames.length ? joinAnd(toppingNames) : 'no extra toppings';

    const story = `You are a true ${flavorObj.en} soul! Deep down, you are known to be ${flavorObj.trait_en}, while naturally embracing life as someone who is ${pkgObj.trait_en}. On top of that, you carry a beautiful hidden side of being ${toppingTrait}. This exact combination — a ${flavorObj.en} served in a ${pkgObj.en} topped with ${toppingNamesStr} — is a perfect reflection of your unique vibe.`;

    return { story, flavorName: flavorObj.en, pkgName: pkgObj.en, toppingNamesStr };
  }

  window.CYS = {
    packaging, packLayout, flavors, bases, toppings, toppingIcing, TOPPING_MAX, messages, themes, personalities,
    computePersonality, generateStory,
  };
})();
