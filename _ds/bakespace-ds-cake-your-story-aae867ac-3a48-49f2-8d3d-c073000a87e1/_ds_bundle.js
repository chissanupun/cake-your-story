/* @ds-bundle: {"format":3,"namespace":"BakeSpaceDSCakeYourStory_aae867","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"CakePreview","sourcePath":"components/cake/CakePreview.jsx"},{"name":"DRIP_COLORS","sourcePath":"components/decor/Drip.jsx"},{"name":"Drip","sourcePath":"components/decor/Drip.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"ChoiceCard","sourcePath":"components/selection/ChoiceCard.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"f890151dfca2","components/cake/CakePreview.jsx":"e720e27a7956","components/decor/Drip.jsx":"eae6e86bff5b","components/feedback/Badge.jsx":"b00894c4558d","components/feedback/Toast.jsx":"0f117a483a53","components/forms/Input.jsx":"a07fadf5bc9f","components/forms/Switch.jsx":"52b6e85f2370","components/selection/ChoiceCard.jsx":"f5ee5db78672","ui_kits/microsite/Builder.jsx":"b15d4dd81e3e","ui_kits/microsite/Landing.jsx":"7d4c01a7c934","ui_kits/microsite/Share.jsx":"09c7a0f119ba","ui_kits/microsite/data.js":"cb9a8462a997"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BakeSpaceDSCakeYourStory_aae867 = window.BakeSpaceDSCakeYourStory_aae867 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the high-conversion, tactile CTA.
 * Pill-shaped with a hard chocolate "drop edge" that compresses on press.
 */
function Button({
  children,
  variant = 'cherry',
  // cherry | choco | frosting | cream | ghost
  size = 'md',
  // sm | md | lg
  iconLeft = null,
  iconRight = null,
  full = false,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const heights = {
    sm: 'var(--control-h-sm)',
    md: 'var(--control-h-md)',
    lg: 'var(--control-h-lg)'
  };
  const pads = {
    sm: '0 18px',
    md: '0 26px',
    lg: '0 34px'
  };
  const fontSizes = {
    sm: 'var(--fs-sm)',
    md: 'var(--fs-md)',
    lg: 'var(--fs-lg)'
  };
  const palettes = {
    cherry: {
      bg: 'var(--cherry-500)',
      fg: 'var(--cream-000)',
      edge: 'var(--cherry-900)'
    },
    choco: {
      bg: 'var(--choco-700)',
      fg: 'var(--cream-000)',
      edge: 'var(--choco-900)'
    },
    frosting: {
      bg: 'var(--frosting-500)',
      fg: 'var(--choco-700)',
      edge: '#5E97D6'
    },
    cream: {
      bg: 'var(--cream-000)',
      fg: 'var(--choco-700)',
      edge: '#D8C9AE'
    },
    ghost: {
      bg: 'transparent',
      fg: 'var(--choco-700)',
      edge: 'transparent'
    }
  };
  const p = palettes[variant] || palettes.cherry;
  const base = {
    appearance: 'none',
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: full ? '100%' : 'auto',
    minHeight: heights[size],
    padding: pads[size],
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-extra)',
    fontSize: fontSizes[size],
    lineHeight: 1,
    letterSpacing: '0.01em',
    color: p.fg,
    background: p.bg,
    border: variant === 'ghost' ? 'none' : `var(--bw-ink) solid var(--border-ink)`,
    borderRadius: 'var(--radius-pill)',
    boxShadow: variant === 'ghost' ? 'none' : `0 var(--press-shift) 0 ${p.edge}, var(--elev-sm)`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transform: 'translateY(0)',
    transition: 'transform var(--dur-fast) var(--ease-spring), box-shadow var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out)',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    ...style
  };
  const onDown = e => {
    if (disabled) return;
    e.currentTarget.style.transform = `translateY(var(--press-shift))`;
    if (variant !== 'ghost') e.currentTarget.style.boxShadow = `0 0 0 ${p.edge}, var(--elev-sm)`;
  };
  const onUp = e => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(0)';
    if (variant !== 'ghost') e.currentTarget.style.boxShadow = `0 var(--press-shift) 0 ${p.edge}, var(--elev-sm)`;
  };
  const onEnter = e => {
    if (!disabled && variant !== 'ghost') e.currentTarget.style.filter = 'brightness(1.04)';
  };
  const onLeave = e => {
    if (disabled) return;
    e.currentTarget.style.filter = 'none';
    onUp(e);
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: base,
    onMouseDown: onDown,
    onMouseUp: onUp,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onTouchStart: onDown,
    onTouchEnd: onUp
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: '1.15em'
    }
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: '1.15em'
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/cake/CakePreview.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CakePreview — the live, layered cake rendering stage.
 * Stacks asset layers (plate → base → icing → toppings → name banner)
 * inside a rounded, claymorphic "spotlight" box. Toppings animate in
 * with the drop-on keyframe.
 */
function CakePreview({
  base = '🎂',
  icing = null,
  // emoji glyph layered over the base
  toppings = [],
  // array of { id, emoji } — rendered as dropped stickers
  name = null,
  // optional cake name shown on a banner
  width = 320,
  height = 320,
  style,
  ...rest
}) {
  // deterministic-ish scatter for toppings around the cake
  const slots = [{
    left: '50%',
    top: '30%'
  }, {
    left: '32%',
    top: '40%'
  }, {
    left: '68%',
    top: '40%'
  }, {
    left: '40%',
    top: '24%'
  }, {
    left: '60%',
    top: '24%'
  }, {
    left: '50%',
    top: '46%'
  }, {
    left: '26%',
    top: '30%'
  }, {
    left: '74%',
    top: '30%'
  }];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      width,
      height,
      background: 'radial-gradient(120% 100% at 50% 18%, var(--frosting-100) 0%, var(--cream-300) 70%)',
      border: 'var(--bw-ink-bold) solid var(--border-ink)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--elev-lg)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '48%',
      transform: 'translate(-50%,-50%)',
      width: '70%',
      height: '70%',
      borderRadius: '999px',
      background: 'radial-gradient(circle, rgba(255,255,255,.9) 0%, rgba(255,255,255,0) 70%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '14%',
      left: '16%',
      fontSize: '20px',
      color: 'var(--gold-500)',
      animation: 'twinkle 2.2s var(--ease-in-out) infinite'
    }
  }, "\u2726"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '22%',
      right: '14%',
      fontSize: '15px',
      color: 'var(--gold-500)',
      animation: 'twinkle 1.7s var(--ease-in-out) infinite .4s'
    }
  }, "\u2726"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '52%',
      transform: 'translate(-50%,-50%)',
      fontSize: Math.round(height * 0.42),
      lineHeight: 1,
      filter: 'drop-shadow(0 10px 0 rgba(58,35,20,.14))',
      animation: 'float-idle 6s var(--ease-in-out) infinite'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-block'
    }
  }, base, icing && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '14%',
      transform: 'translateX(-50%)',
      fontSize: '0.5em'
    }
  }, icing))), toppings.slice(0, slots.length).map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: t.id ?? i,
    style: {
      position: 'absolute',
      left: slots[i].left,
      top: slots[i].top,
      transform: 'translate(-50%,-50%)',
      fontSize: '30px',
      lineHeight: 1,
      filter: 'drop-shadow(0 4px 0 rgba(58,35,20,.18))',
      animation: 'drop-on var(--dur-slow) var(--ease-spring)'
    }
  }, t.emoji)), name && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      bottom: '16px',
      transform: 'translateX(-50%)',
      maxWidth: '82%',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: '18px',
      color: 'var(--cream-000)',
      background: 'var(--cherry-500)',
      border: 'var(--bw-ink) solid var(--border-ink)',
      borderRadius: 'var(--radius-pill)',
      padding: '6px 18px',
      boxShadow: 'var(--elev-md)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, name));
}
Object.assign(__ds_scope, { CakePreview });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cake/CakePreview.jsx", error: String((e && e.message) || e) }); }

// components/decor/Drip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Drip — the signature "strawberry sauce" edge. A seamless, organic wavy
 * band with hanging drips + detached droplets that cuts cherry red through
 * the cream base. Tiles horizontally at any width with no distortion.
 *
 * Because it renders as an SVG data-URI background, `color` must be a
 * CONCRETE color (hex/rgb) — not a CSS custom property. Use the presets.
 */
const DRIP_COLORS = {
  cherry: '#D90429',
  cherryDeep: '#A80320',
  choco: '#3B2314',
  gold: '#F4A261',
  frosting: '#A2D2FF'
};
function Drip({
  color = DRIP_COLORS.cherry,
  height = 56,
  flip = false,
  // true = drips point UP (bottom-of-section sauce)
  style,
  ...rest
}) {
  // Tile: solid band across the top, wavy dripping bottom edge + 3 droplets.
  const path = 'M0 0 H240 V30 ' + 'C232 52 218 52 208 30 ' + 'C198 44 184 44 172 30 ' + 'C156 72 124 72 108 30 ' + 'C98 45 84 45 72 30 ' + 'C60 56 42 56 30 30 ' + 'C22 44 10 44 0 30 Z';
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='80' viewBox='0 0 240 80'>` + `<path fill='${color}' d='${path}'/>` + `<circle cx='150' cy='62' r='5.5' fill='${color}'/>` + `<circle cx='92' cy='55' r='3.5' fill='${color}'/>` + `<circle cx='216' cy='52' r='3' fill='${color}'/>` + `</svg>`;
  const uri = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      width: '100%',
      height,
      backgroundImage: uri,
      backgroundRepeat: 'repeat-x',
      backgroundPosition: flip ? 'bottom center' : 'top center',
      backgroundSize: `auto 100%`,
      transform: flip ? 'scaleY(-1)' : 'none',
      pointerEvents: 'none',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { DRIP_COLORS, Drip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/decor/Drip.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — a chunky outlined pill for labels, counts & status.
 */
function Badge({
  children,
  tone = 'cherry',
  // cherry | choco | frosting | matcha | gold | cream
  size = 'md',
  // sm | md
  icon = null,
  style,
  ...rest
}) {
  const tones = {
    cherry: {
      bg: 'var(--cherry-500)',
      fg: 'var(--cream-000)'
    },
    choco: {
      bg: 'var(--choco-700)',
      fg: 'var(--cream-000)'
    },
    frosting: {
      bg: 'var(--frosting-500)',
      fg: 'var(--choco-700)'
    },
    matcha: {
      bg: 'var(--matcha-500)',
      fg: 'var(--cream-000)'
    },
    gold: {
      bg: 'var(--gold-500)',
      fg: 'var(--choco-700)'
    },
    cream: {
      bg: 'var(--cream-000)',
      fg: 'var(--choco-700)'
    }
  };
  const t = tones[tone] || tones.cherry;
  const dims = size === 'sm' ? {
    padding: '2px 9px',
    fontSize: '11px',
    borderWidth: '2px'
  } : {
    padding: '4px 13px',
    fontSize: 'var(--fs-xs)',
    borderWidth: 'var(--bw-ink)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-extra)',
      letterSpacing: '0.03em',
      lineHeight: 1.4,
      color: t.fg,
      background: t.bg,
      border: `${dims.borderWidth} solid var(--border-ink)`,
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--elev-sm)',
      padding: dims.padding,
      fontSize: dims.fontSize,
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Toast — a celebratory pop-in notification (e.g. "Added to your cake!").
 */
function Toast({
  children,
  emoji = '🎉',
  tone = 'choco',
  // choco | cherry | matcha
  visible = true,
  style,
  ...rest
}) {
  const tones = {
    choco: {
      bg: 'var(--choco-700)',
      fg: 'var(--cream-000)'
    },
    cherry: {
      bg: 'var(--cherry-500)',
      fg: 'var(--cream-000)'
    },
    matcha: {
      bg: 'var(--matcha-500)',
      fg: 'var(--cream-000)'
    }
  };
  const t = tones[tone] || tones.choco;
  if (!visible) return null;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-sm)',
      color: t.fg,
      background: t.bg,
      border: 'var(--bw-ink) solid var(--border-ink)',
      borderRadius: 'var(--radius-pill)',
      padding: '12px 20px',
      boxShadow: 'var(--elev-md)',
      animation: 'pop-in var(--dur-slow) var(--ease-spring)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '20px',
      lineHeight: 1,
      animation: 'wobble 0.9s var(--ease-in-out)'
    }
  }, emoji), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — friendly rounded text field with thick outline and frosting focus ring.
 */
function Input({
  value,
  onChange,
  placeholder,
  label,
  hint,
  iconLeft = null,
  maxLength,
  disabled = false,
  invalid = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const borderCol = invalid ? 'var(--cherry-500)' : focus ? 'var(--frosting-500)' : 'var(--border-ink)';
  const ring = focus && !invalid ? '0 0 0 4px var(--frosting-100)' : invalid ? '0 0 0 4px var(--cherry-050)' : 'none';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'var(--cream-000)',
      border: `var(--bw-ink) solid ${borderCol}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: ring,
      padding: '0 16px',
      minHeight: 'var(--control-h-md)',
      opacity: disabled ? 0.5 : 1,
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: '18px',
      color: 'var(--text-muted)'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    maxLength: maxLength,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-medium)',
      fontSize: 'var(--fs-md)',
      color: 'var(--text-body)',
      padding: '12px 0',
      minWidth: 0
    }
  }, rest))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      color: invalid ? 'var(--cherry-600)' : 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Switch — plump pill toggle with a springy chocolate-outlined knob.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  style,
  ...rest
}) {
  const toggle = () => {
    if (!disabled && onChange) onChange(!checked);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", _extends({
    role: "switch",
    "aria-checked": checked,
    onClick: toggle,
    style: {
      position: 'relative',
      width: '60px',
      height: '34px',
      flex: 'none',
      background: checked ? 'var(--matcha-500)' : 'var(--cream-500)',
      border: 'var(--bw-ink) solid var(--border-ink)',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'inset 0 2px 5px rgba(58,35,20,.18)',
      transition: 'background var(--dur-base) var(--ease-out)'
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '2px',
      left: checked ? '28px' : '2px',
      width: '26px',
      height: '26px',
      background: 'var(--cream-000)',
      border: 'var(--bw-ink) solid var(--border-ink)',
      borderRadius: '999px',
      boxShadow: 'var(--elev-sm)',
      transition: 'left var(--dur-base) var(--ease-spring)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-md)',
      color: 'var(--text-strong)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/selection/ChoiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ChoiceCard — selectable card for picking cake bases & toppings.
 * States: default, selected (soft pink glow + lift), disabled.
 */
function ChoiceCard({
  emoji = '🍰',
  label,
  caption,
  selected = false,
  disabled = false,
  badge = null,
  // e.g. "Popular" | "New"
  onClick,
  style,
  ...rest
}) {
  const wrap = {
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    minHeight: '128px',
    padding: '18px 14px 16px',
    background: selected ? 'var(--cream-000)' : 'var(--surface-card)',
    border: `var(--bw-ink-bold) solid ${selected ? 'var(--glow-pink)' : 'var(--border-ink)'}`,
    borderRadius: 'var(--radius-lg)',
    boxShadow: selected ? 'var(--glow-selected)' : 'var(--elev-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    filter: disabled ? 'grayscale(0.6)' : 'none',
    transform: selected ? 'translateY(-3px)' : 'translateY(0)',
    transition: 'transform var(--dur-base) var(--ease-spring), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
    userSelect: 'none',
    textAlign: 'center',
    ...style
  };
  const emojiStyle = {
    fontSize: '40px',
    lineHeight: 1,
    display: 'block',
    transform: selected ? 'scale(1.06)' : 'scale(1)',
    transition: 'transform var(--dur-base) var(--ease-spring)',
    filter: 'drop-shadow(0 3px 0 rgba(58,35,20,.16))'
  };
  const onEnter = e => {
    if (!disabled && !selected) e.currentTarget.style.transform = 'translateY(-2px)';
  };
  const onLeave = e => {
    if (!disabled && !selected) e.currentTarget.style.transform = 'translateY(0)';
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "button",
    "aria-pressed": selected,
    "aria-disabled": disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    style: wrap
  }, rest), badge && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '-12px',
      right: '-8px',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-extra)',
      fontSize: '11px',
      letterSpacing: '0.03em',
      color: 'var(--choco-700)',
      background: 'var(--gold-500)',
      border: 'var(--bw-ink) solid var(--border-ink)',
      borderRadius: 'var(--radius-pill)',
      padding: '3px 10px',
      boxShadow: 'var(--elev-sm)',
      transform: 'rotate(6deg)'
    }
  }, badge), selected && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '-12px',
      left: '-8px',
      width: '28px',
      height: '28px',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--glow-pink)',
      color: 'var(--cream-000)',
      border: 'var(--bw-ink) solid var(--border-ink)',
      borderRadius: '999px',
      fontSize: '15px',
      fontWeight: 800,
      boxShadow: 'var(--elev-sm)',
      animation: 'pop-in var(--dur-slow) var(--ease-spring)'
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    style: emojiStyle
  }, emoji), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--fs-md)',
      color: 'var(--text-strong)'
    }
  }, label), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-muted)'
    }
  }, caption));
}
Object.assign(__ds_scope, { ChoiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/ChoiceCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/microsite/Builder.jsx
try { (() => {
// Builder screen — live cake preview + base/frosting/topping pickers + name.
function Builder({
  cake,
  setCake,
  onShare
}) {
  const {
    Button,
    ChoiceCard,
    CakePreview,
    Input,
    Toast,
    Drip
  } = window.BakeSpaceDSCakeYourStory_aae867;
  const D = window.CYS_DATA;
  const [tab, setTab] = React.useState('base');
  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);
  const fireToast = (emoji, msg) => {
    clearTimeout(toastTimer.current);
    setToast({
      emoji,
      msg,
      k: Date.now()
    });
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  };
  const baseObj = D.bases.find(b => b.id === cake.baseId);
  const frostObj = D.frostings.find(f => f.id === cake.frostingId);
  const toppingObjs = cake.toppingIds.map(id => D.toppings.find(t => t.id === id)).filter(Boolean);
  const pickBase = b => setCake(c => ({
    ...c,
    baseId: b.id
  }));
  const pickFrost = f => setCake(c => ({
    ...c,
    frostingId: f.id
  }));
  const toggleTopping = t => setCake(c => {
    const has = c.toppingIds.includes(t.id);
    if (!has) fireToast(t.emoji, `${t.label} dropped on!`);
    return {
      ...c,
      toppingIds: has ? c.toppingIds.filter(x => x !== t.id) : [...c.toppingIds, t.id]
    };
  });
  const tabs = [{
    id: 'base',
    label: 'Base',
    emoji: '🎂'
  }, {
    id: 'frosting',
    label: 'Frosting',
    emoji: '🍦'
  }, {
    id: 'toppings',
    label: 'Toppings',
    emoji: '🍒'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 0
    }
  }, /*#__PURE__*/React.createElement(Drip, {
    color: "#D90429",
    height: 42
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '40px 22px 10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "sticker-text",
    style: {
      fontSize: '22px',
      color: 'var(--cherry-500)'
    }
  }, "Build it"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: '13px',
      color: 'var(--text-muted)'
    }
  }, "Step 1 of 2")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      placeItems: 'center',
      padding: '6px 0 14px'
    }
  }, /*#__PURE__*/React.createElement(CakePreview, {
    base: baseObj ? baseObj.base : '🎂',
    icing: frostObj ? frostObj.icing : null,
    toppings: toppingObjs.map(t => ({
      id: t.id,
      emoji: t.emoji
    })),
    name: cake.name || null,
    width: 250,
    height: 250
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      padding: '0 18px 14px',
      justifyContent: 'center'
    }
  }, tabs.map(t => {
    const active = tab === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => setTab(t.id),
      style: {
        flex: 1,
        maxWidth: '130px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        fontFamily: 'var(--font-body)',
        fontWeight: 800,
        fontSize: '14px',
        color: active ? 'var(--cream-000)' : 'var(--text-body)',
        background: active ? 'var(--cherry-500)' : 'var(--cream-000)',
        border: 'var(--bw-ink) solid var(--border-ink)',
        borderRadius: 'var(--radius-pill)',
        padding: '9px 10px',
        boxShadow: active ? 'var(--elev-sm)' : 'none',
        transition: 'all var(--dur-fast) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("span", null, t.emoji), t.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 18px 12px',
      flex: 1
    }
  }, tab === 'base' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px'
    }
  }, D.bases.map(b => /*#__PURE__*/React.createElement(ChoiceCard, {
    key: b.id,
    emoji: b.emoji,
    label: b.label,
    caption: b.caption,
    badge: b.badge,
    selected: cake.baseId === b.id,
    onClick: () => pickBase(b)
  }))), tab === 'frosting' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px'
    }
  }, D.frostings.map(f => /*#__PURE__*/React.createElement(ChoiceCard, {
    key: f.id,
    emoji: f.emoji,
    label: f.label,
    selected: cake.frostingId === f.id,
    onClick: () => pickFrost(f)
  }))), tab === 'toppings' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 12px',
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      color: 'var(--text-muted)',
      textAlign: 'center'
    }
  }, "Tap to drop toppings on \u2014 mix as many as you like \uD83C\uDF53"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '12px'
    }
  }, D.toppings.map(t => /*#__PURE__*/React.createElement(ChoiceCard, {
    key: t.id,
    emoji: t.emoji,
    label: t.label,
    disabled: t.disabled,
    selected: cake.toppingIds.includes(t.id),
    onClick: () => toggleTopping(t)
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '14px 18px 18px',
      background: 'linear-gradient(to top, var(--cream-000) 70%, transparent)',
      borderTop: '0'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Name your cake\u2026",
    iconLeft: "\uD83C\uDF70",
    value: cake.name,
    onChange: e => setCake(c => ({
      ...c,
      name: e.target.value
    })),
    maxLength: 22
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "cherry",
    size: "lg",
    full: true,
    iconRight: "\u2192",
    onClick: onShare
  }, "Name it & share")), toast && /*#__PURE__*/React.createElement("div", {
    key: toast.k,
    style: {
      position: 'fixed',
      left: '50%',
      bottom: '110px',
      transform: 'translateX(-50%)',
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    emoji: toast.emoji,
    tone: "choco"
  }, toast.msg)));
}
window.Builder = Builder;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/microsite/Builder.jsx", error: String((e && e.message) || e) }); }

// ui_kits/microsite/Landing.jsx
try { (() => {
// Landing screen — cream base, strawberry-sauce top drip, floating stickers + CTA.
function Landing({
  onStart
}) {
  const {
    Button,
    Badge,
    Drip
  } = window.BakeSpaceDSCakeYourStory_aae867;
  const stickers = [{
    e: '🍒',
    top: '15%',
    left: '9%',
    sz: 46,
    dur: 5,
    anim: 'float-idle'
  }, {
    e: '✦',
    top: '20%',
    left: '84%',
    sz: 26,
    dur: 1.8,
    anim: 'twinkle'
  }, {
    e: '🧁',
    top: '30%',
    left: '80%',
    sz: 42,
    dur: 7,
    anim: 'float-drift'
  }, {
    e: '⭐️',
    top: '62%',
    left: '7%',
    sz: 32,
    dur: 6,
    anim: 'float-idle'
  }, {
    e: '🍓',
    top: '72%',
    left: '83%',
    sz: 44,
    dur: 5.5,
    anim: 'float-idle'
  }, {
    e: '🍩',
    top: '84%',
    left: '15%',
    sz: 38,
    dur: 6.5,
    anim: 'float-drift'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '88px 26px 40px',
      overflow: 'hidden',
      background: 'radial-gradient(120% 80% at 50% 30%, var(--frosting-100) 0%, var(--cream-100) 62%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(Drip, {
    color: "#D90429",
    height: 86
  })), stickers.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      position: 'absolute',
      top: s.top,
      left: s.left,
      fontSize: s.sz,
      lineHeight: 1,
      zIndex: 2,
      filter: 'drop-shadow(0 6px 0 rgba(58,35,20,.16)) drop-shadow(0 8px 12px rgba(58,35,20,.18))',
      animation: `${s.anim} ${s.dur}s var(--ease-in-out) infinite`,
      pointerEvents: 'none'
    }
  }, s.e)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    icon: "\u2726",
    style: {
      marginBottom: '22px'
    }
  }, "S&P \xB7 Summer drop"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sticker-text",
    style: {
      fontSize: '34px',
      color: 'var(--cherry-500)'
    }
  }, "Cake your"), /*#__PURE__*/React.createElement("div", {
    className: "sticker-text",
    style: {
      fontSize: '68px',
      color: 'var(--cream-000)',
      lineHeight: '1'
    }
  }, "Story")), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: '20ch',
      margin: '18px 0 30px',
      color: 'var(--text-body)',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: '17px',
      lineHeight: 1.5
    }
  }, "Design a cake that\u2019s ", /*#__PURE__*/React.createElement("em", null, "so"), " you, then share it to your story."), /*#__PURE__*/React.createElement(Button, {
    variant: "cherry",
    size: "lg",
    iconRight: "\u2192",
    onClick: onStart,
    style: {
      minWidth: '220px'
    }
  }, "Start baking"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '26px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: '14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-numeric)',
      fontSize: '20px',
      color: 'var(--cherry-500)'
    }
  }, "128k"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500
    }
  }, "cakes baked this week \uD83C\uDF82"))));
}
window.Landing = Landing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/microsite/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/microsite/Share.jsx
try { (() => {
// Share screen — finished cake on a shareable story card + share actions.
function Share({
  cake,
  onRestart
}) {
  const {
    Button,
    CakePreview,
    Badge,
    Drip
  } = window.BakeSpaceDSCakeYourStory_aae867;
  const D = window.CYS_DATA;
  const baseObj = D.bases.find(b => b.id === cake.baseId);
  const frostObj = D.frostings.find(f => f.id === cake.frostingId);
  const toppingObjs = cake.toppingIds.map(id => D.toppings.find(t => t.id === id)).filter(Boolean);
  const [copied, setCopied] = React.useState(false);
  const shareTargets = [{
    id: 'ig',
    icon: 'ph-instagram-logo',
    label: 'Story',
    tone: 'var(--cherry-500)'
  }, {
    id: 'tt',
    icon: 'ph-tiktok-logo',
    label: 'TikTok',
    tone: 'var(--choco-700)'
  }, {
    id: 'dl',
    icon: 'ph-download-simple',
    label: 'Save',
    tone: 'var(--matcha-500)'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '26px 22px 30px',
      overflow: 'hidden',
      background: 'radial-gradient(120% 80% at 50% 0%, var(--frosting-100) 0%, var(--cream-100) 60%)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    icon: "\u2726",
    style: {
      marginBottom: '14px'
    }
  }, "Your cake is ready"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 18px',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '26px',
      color: 'var(--text-strong)',
      textAlign: 'center'
    }
  }, "Share your story \uD83C\uDF89"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: '320px',
      background: 'var(--cream-000)',
      border: 'var(--bw-ink-bold) solid var(--border-ink)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--elev-lg)',
      padding: '64px 18px 20px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0
    }
  }, /*#__PURE__*/React.createElement(Drip, {
    color: "#D90429",
    height: 58
  })), /*#__PURE__*/React.createElement("div", {
    className: "sticker-text",
    style: {
      fontSize: '20px',
      color: 'var(--cherry-500)',
      position: 'relative'
    }
  }, "Cake your Story"), /*#__PURE__*/React.createElement(CakePreview, {
    base: baseObj ? baseObj.base : '🎂',
    icing: frostObj ? frostObj.icing : null,
    toppings: toppingObjs.map(t => ({
      id: t.id,
      emoji: t.emoji
    })),
    width: 236,
    height: 236,
    style: {
      background: 'radial-gradient(120% 100% at 50% 18%, #fff 0%, var(--frosting-100) 75%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '22px',
      color: 'var(--cherry-500)',
      textAlign: 'center',
      lineHeight: 1.1
    }
  }, cake.name || 'My dream cake'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: '12px',
      color: 'var(--text-muted)',
      letterSpacing: '.08em',
      textTransform: 'uppercase'
    }
  }, "baked by you \xB7 S&P")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '14px',
      margin: '22px 0 16px'
    }
  }, shareTargets.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '7px',
      cursor: 'pointer',
      background: 'transparent',
      border: 'none',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: '12px',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '54px',
      height: '54px',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--cream-000)',
      color: s.tone,
      border: 'var(--bw-ink) solid var(--border-ink)',
      borderRadius: '999px',
      boxShadow: 'var(--elev-sm)',
      fontSize: '26px'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph-fill ${s.icon}`
  })), s.label))), /*#__PURE__*/React.createElement(Button, {
    variant: "cherry",
    size: "md",
    iconLeft: /*#__PURE__*/React.createElement("i", {
      className: "ph-bold ph-link"
    }),
    onClick: () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    },
    style: {
      marginBottom: '10px'
    }
  }, copied ? 'Link copied!' : 'Copy share link'), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconLeft: "\u21BA",
    onClick: onRestart
  }, "Make another"));
}
window.Share = Share;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/microsite/Share.jsx", error: String((e && e.message) || e) }); }

// ui_kits/microsite/data.js
try { (() => {
// Shared sample data for the Cake Your Story microsite (attached to window).
window.CYS_DATA = {
  bases: [{
    id: 'choc',
    emoji: '🍫',
    label: 'Chocolate',
    caption: 'Classic',
    base: '🎂'
  }, {
    id: 'vanilla',
    emoji: '🍰',
    label: 'Vanilla',
    caption: 'Light & fluffy',
    base: '🍰'
  }, {
    id: 'straw',
    emoji: '🍓',
    label: 'Strawberry',
    caption: '+ $2',
    base: '🎂',
    badge: 'Popular'
  }, {
    id: 'matcha',
    emoji: '🍵',
    label: 'Matcha',
    caption: 'New',
    base: '🍵',
    badge: 'New'
  }],
  frostings: [{
    id: 'cream',
    emoji: '🍦',
    label: 'Vanilla cream',
    icing: '🍦'
  }, {
    id: 'choco',
    emoji: '🟤',
    label: 'Choc drip',
    icing: '🍫'
  }, {
    id: 'pink',
    emoji: '🌸',
    label: 'Berry swirl',
    icing: '🌸'
  }, {
    id: 'none',
    emoji: '🚫',
    label: 'No frosting',
    icing: null
  }],
  toppings: [{
    id: 'cherry',
    emoji: '🍒',
    label: 'Cherries'
  }, {
    id: 'berry',
    emoji: '🍓',
    label: 'Strawberry'
  }, {
    id: 'blue',
    emoji: '🫐',
    label: 'Blueberry'
  }, {
    id: 'star',
    emoji: '⭐️',
    label: 'Gold stars'
  }, {
    id: 'choc',
    emoji: '🍫',
    label: 'Choc chunks'
  }, {
    id: 'spark',
    emoji: '✦',
    label: 'Sparkles'
  }, {
    id: 'candle',
    emoji: '🕯️',
    label: 'Candle',
    disabled: true
  }, {
    id: 'donut',
    emoji: '🍩',
    label: 'Mini donut'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/microsite/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CakePreview = __ds_scope.CakePreview;

__ds_ns.DRIP_COLORS = __ds_scope.DRIP_COLORS;

__ds_ns.Drip = __ds_scope.Drip;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.ChoiceCard = __ds_scope.ChoiceCard;

})();
