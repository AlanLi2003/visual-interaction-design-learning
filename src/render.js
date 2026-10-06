import { families, styles } from "./data/scenes.js";

const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const captionRowSceneIds = new Set(["cartoon-bounce-04", "cartoon-flip-05", "y2k-flip-22", "cartoon-accordion-06", "minimal-accordion-08", "cyberpunk-slide-12", "glass-parallax-13", "glass-zoom-15", "bento-zoom-27", "organic-parallax-29"]);

const artworkMarkup = (scene) => {
  const shape = escapeHTML(scene.shape);
  switch (scene.interactionFamily) {
    case "parallax": {
      const layers = `<i class="depth-orb depth-orb--back"></i><i class="depth-orb depth-orb--mid"></i><i class="depth-orb depth-orb--front"></i>`;
      const tracked = ["glass-parallax-13", "organic-parallax-29"].includes(scene.id);
      const object = tracked
        ? `<div class="art-object parallax-object parallax-object--tracked" aria-hidden="true"><dl class="parallax-telemetry"><div><dt>DEPTH LAYERS</dt><dd>${escapeHTML(scene.scene.depthSummary)}</dd></div><div><dt>CONTEXT</dt><dd>${escapeHTML(scene.scene.parallaxContext)}</dd></div></dl><div class="parallax-canvas">${layers}</div></div>`
        : `<div class="art-object parallax-object" aria-hidden="true">${layers}<span class="art-label">${escapeHTML(scene.scene.focus)}</span></div>`;
      return `${object}<div class="art-caption">${shape}<span>depth layers</span></div>`;
    }
    case "scan":
      return `<div class="art-object scan-object" aria-hidden="true"><i class="scan-grid"></i><i class="scan-line"></i><span class="scan-readout">${scene.style === "cyberpunk" ? `IDENTITY INTEGRITY · ${escapeHTML(scene.scene.focus)}` : escapeHTML(scene.scene.focus)}</span><span class="scan-dot"></span></div><div class="art-caption">${shape}<span class="scan-status">${scene.style === "cyberpunk" ? "identity integrity ready" : "signal locked"}</span></div>`;
    case "orbit":
      return `<div class="art-object orbit-object" aria-hidden="true"><i class="orbit-ring orbit-ring--outer"></i><i class="orbit-ring orbit-ring--inner"></i><i class="orbit-core"></i><i class="orbit-node"></i><span class="orbit-readout">${escapeHTML(scene.scene.focus)}</span></div><div class="art-caption">${shape}<span>connected nodes</span></div>`;
    case "bounce":
      return `<div class="art-object bounce-object" aria-hidden="true"><div class="bounce-character-card"><div class="bounce-avatar"><i class="bounce-ear bounce-ear--left"></i><i class="bounce-ear bounce-ear--right"></i><div class="bounce-head"><i class="bounce-eye bounce-eye--left"></i><i class="bounce-eye bounce-eye--right"></i><i class="bounce-cheek bounce-cheek--left"></i><i class="bounce-cheek bounce-cheek--right"></i><i class="bounce-mouth"></i></div><div class="bounce-body"><i></i></div></div><div class="bounce-card-copy"><span class="bounce-role">${escapeHTML(scene.scene.guideRole)}</span><strong>${escapeHTML(scene.scene.guideName)}</strong><small>${escapeHTML(scene.scene.guideCue)}</small><span class="bounce-streak">${escapeHTML(scene.scene.supporting[0][0])} · ${escapeHTML(scene.scene.supporting[0][1])}</span></div><span class="bounce-spark" aria-hidden="true">✦</span></div></div><div class="art-caption">${shape}<span>meet your guide</span></div>`;
    case "flip":
      return `<div class="art-object flip-object" aria-hidden="true"><div class="flip-card"><div class="flip-face flip-face--front"><span class="flip-face-meta"><span>${escapeHTML(scene.scene.domain)}</span><span>01 / 02</span></span><span class="flip-symbol">${escapeHTML(scene.scene.flipFrontMark || "✳")}</span><strong>${escapeHTML(scene.scene.flipFront || scene.scene.focus)}</strong><small>${escapeHTML(scene.scene.flipFrontMeta || "FRONT · TAP TO TURN")}</small></div><div class="flip-face flip-face--back"><span class="flip-face-meta"><span>${escapeHTML(scene.scene.flipBackLabel || "REVERSE SIDE")}</span><span>02 / 02</span></span><span class="flip-symbol">↗</span><strong>${escapeHTML(scene.scene.flipBack || "Made to be shared")}</strong><small>${escapeHTML(scene.scene.flipBackMeta || "DETAILS REVEALED")}</small></div></div></div><div class="art-caption">${shape}<span>front ↔ reverse</span></div>`;
    case "accordion":
      return `<div class="art-object accordion-object"><div class="accordion-title"><span>${escapeHTML(scene.scene.focus)}</span><span class="accordion-chevron" aria-hidden="true">⌄</span></div><div class="accordion-panel" id="panel-${scene.id}" aria-hidden="true" inert><div class="accordion-panel-content"><p>${escapeHTML(scene.scene.expandedDetail || scene.scene.summary)}</p><span>${escapeHTML(scene.scene.expandedMeta || `${scene.scene.supporting[1][0]} · ${scene.scene.supporting[1][1]}`)}</span></div></div></div><div class="art-caption">${shape}<span>open / close</span></div>`;
    case "reveal":
      return `<div class="art-object reveal-object"><div class="reveal-rule"></div><strong class="reveal-copy">${escapeHTML(scene.scene.focus)}</strong><span class="reveal-note" id="reveal-${scene.id}" aria-hidden="true">${escapeHTML(scene.scene.summary)}</span></div><div class="art-caption">${shape}<span>masked content</span></div>`;
    case "slide": {
      const railItems = scene.scene.railItems || [
        { number: "01", title: scene.scene.focus, meta: scene.scene.domain },
        { number: "02", title: scene.scene.supporting[1][1], meta: "Next in the sequence" },
        { number: "03", title: "One useful next step", meta: "Keep the context in view" },
      ];
      const neonRail = scene.id === "cyberpunk-slide-12";
      return `<div class="art-object slide-object${neonRail ? " rail-object--neon" : ""}">${neonRail ? `<div class="rail-masthead"><span>NEON FREQUENCY · 07</span><span class="rail-live"><i aria-hidden="true"></i> ON AIR</span></div>` : ""}<div class="rail-viewport"><div class="rail-track">${railItems.map((item) => `<div class="rail-item"><span>${escapeHTML(item.number)}</span><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.meta)}</small></div>`).join("")}</div></div><div class="rail-controls"><span class="rail-progress">01 / 03</span><span class="rail-dots" aria-hidden="true">● ○ ○</span></div></div><div class="art-caption">${shape}<span>${neonRail ? "frequency rail" : "content rail"}</span></div>`;
    }
    case "flash":
      return `<div class="art-object flash-object" aria-hidden="true"><i class="flash-streak"></i><span class="flash-icon">✳</span><strong>${escapeHTML(scene.scene.focus)}</strong><small class="flash-status">SYSTEM NOMINAL</small></div><div class="art-caption">${shape}<span>bounded signal</span></div>`;
    case "magnetic":
      return `<div class="art-object magnetic-object"><i class="magnetic-field"></i><div class="magnetic-target"><span>↗</span><strong>${escapeHTML(scene.scene.focus)}</strong></div><div class="magnetic-orbit" aria-hidden="true"></div></div><div class="art-caption">${shape}<span>move pointer to attract</span></div>`;
    case "zoom": {
      const tracked = ["glass-zoom-15", "bento-zoom-27"].includes(scene.id);
      const object = tracked
        ? `<div class="art-object zoom-object zoom-object--tracked"><i class="zoom-backdrop" aria-hidden="true"></i><div class="zoom-context"><span>CONTEXT</span><strong>${escapeHTML(scene.scene.supporting[1][0])} · ${escapeHTML(scene.scene.supporting[1][1])}</strong></div><div class="zoom-target"><span class="zoom-focus-label">FOCUS · ${escapeHTML(scene.scene.supporting[0][0])}</span><strong>${escapeHTML(scene.scene.focus)}</strong><small>${escapeHTML(scene.scene.focusDetail || "compared with previous period")}</small></div></div>`
        : `<div class="art-object zoom-object"><i class="zoom-backdrop" aria-hidden="true"></i><div class="zoom-target"><span>${escapeHTML(scene.scene.supporting[0][0])}</span><strong>${escapeHTML(scene.scene.focus)}</strong><small>${escapeHTML(scene.scene.focusDetail || "compared with previous period")}</small></div><span class="zoom-context">${escapeHTML(scene.scene.supporting[1][0])} · ${escapeHTML(scene.scene.supporting[1][1])}</span></div>`;
      return `${object}<div class="art-caption">${shape}<span>focus / context</span></div>`;
    }
    case "press":
      return `<div class="art-object press-object"><i class="press-orbit"></i><span class="press-label">HOLD TO FEEL</span><span class="press-icon">↓</span><span class="press-shadow"></span></div><div class="art-caption">${shape}<span>touch to compress</span></div>`;
    case "stack":
      return `<div class="art-object stack-object"><div class="stack-card stack-card--back"><span>UP NEXT</span><strong>${escapeHTML(scene.scene.supporting[1][1])}</strong></div><div class="stack-card stack-card--middle"><span>THIS WEEK</span><strong>${escapeHTML(scene.scene.domain)}</strong></div><div class="stack-card stack-card--top"><span>IN FOCUS</span><strong>${escapeHTML(scene.scene.focus)}</strong></div></div><div class="art-caption">${shape}<span>cycle the stack</span></div>`;
    case "morph":
      return `<div class="art-object morph-object"><i class="morph-blob"></i><span class="morph-mark">${escapeHTML(scene.scene.focus)}</span></div><div class="art-caption">${shape}<span>shape in progress</span></div>`;
    case "marquee":
      return `<div class="art-object marquee-object"><div class="marquee-window"><div class="marquee-track"><span>${escapeHTML(scene.scene.focus)}</span><b>✦</b><span>${escapeHTML(scene.scene.supporting[1][1])}</span><b>✦</b><span>Listen closer</span><b>✦</b><span aria-hidden="true">${escapeHTML(scene.scene.focus)}</span><b aria-hidden="true">✦</b><span aria-hidden="true">${escapeHTML(scene.scene.supporting[1][1])}</span><b aria-hidden="true">✦</b><span aria-hidden="true">Listen closer</span><b aria-hidden="true">✦</b></div></div><span class="marquee-caption">${escapeHTML(scene.scene.domain)} · now playing</span></div><div class="art-caption">${shape}<span>seamless movement</span></div>`;
    case "drag":
      return `<div class="art-object drag-object"><div class="drop-zone"><span>DROP TO SORT</span><strong>${escapeHTML(scene.scene.supporting[1][1])}</strong></div><button class="drag-token" type="button" aria-label="Drag idea card into the drop zone">${escapeHTML(scene.scene.focus)}</button><span class="drag-result" aria-live="polite">Drag the card into its next place</span></div><div class="art-caption">${shape}<span>pointer or arrow keys</span></div>`;
    default:
      return `<div class="art-object"><span>${shape}</span></div>`;
  }
};

const statMarkup = ([label, value]) => `<div class="scene-stat"><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></div>`;

export const sceneCardMarkup = (scene, { featured = false } = {}) => {
  const style = styles.find(({ id }) => id === scene.style);
  const family = families.find(({ id }) => id === scene.interactionFamily);
  const actionAccessibility = scene.interactionFamily === "accordion"
    ? `aria-expanded="false" aria-controls="panel-${scene.id}"`
    : scene.interactionFamily === "reveal"
      ? `aria-expanded="false" aria-controls="reveal-${scene.id}"`
      : "";
  return `<article class="scene-card${featured ? " scene-card--featured" : ""} style-${scene.style} family-${scene.interactionFamily}" data-scene-id="${scene.id}" data-style="${scene.style}" data-family="${scene.interactionFamily}" aria-labelledby="title-${scene.id}">
    <div class="scene-card-topline"><span class="scene-number">${scene.scene.number}</span><span class="scene-domain">${escapeHTML(scene.scene.domain)}</span><span class="live-mark"><i aria-hidden="true"></i> LIVE SCENE</span></div>
    <div class="scene-layout" data-style="${scene.style}">
      <section class="scene-copy">
        <p class="scene-eyebrow">${escapeHTML(scene.scene.eyebrow)}</p>
        <h2 id="title-${scene.id}">${escapeHTML(scene.scene.headline)}</h2>
        <p class="scene-description">${escapeHTML(scene.scene.summary)}</p>
        <button class="scene-cta" type="button" data-scene-action ${actionAccessibility}>${escapeHTML(scene.scene.action)} <span aria-hidden="true">↗</span></button>
        <p class="scene-feedback" aria-live="polite">Ready to explore</p>
      </section>
      <div class="scene-stage" role="group" aria-label="${escapeHTML(scene.shape)} interactive scene">
        <div class="stage-topline"><span>${escapeHTML(style.mood)}</span><span class="stage-index">${scene.scene.number} / 36</span></div>
        <div class="artwork${captionRowSceneIds.has(scene.id) ? " artwork--caption-row" : ""}" data-artwork data-shape="${escapeHTML(scene.shape)}">${artworkMarkup(scene)}</div>
        <div class="scene-stats">${scene.scene.supporting.map(statMarkup).join("")}</div>
      </div>
    </div>
    <div class="scene-card-meta"><div><span class="meta-kicker">INTERACTION FAMILY</span><strong>${escapeHTML(family.name)}</strong><small>${escapeHTML(scene.interactionVariant)}</small></div><div class="shape-chip"><span class="meta-kicker">SHAPE LANGUAGE</span><strong>${escapeHTML(scene.shape)}</strong></div></div>
    <details class="prompt-disclosure"><summary>View structured prompt</summary><div class="prompt-content"><dl>${Object.entries(scene.prompt).map(([key, value]) => `<div><dt>${escapeHTML(key)}</dt><dd>${escapeHTML(value)}</dd></div>`).join("")}</dl></div></details>
  </article>`;
};

export const styleOptions = () => styles.map(({ id, name, label }) => `<option value="${id}">${label} ${name}</option>`).join("");
export const familyOptions = () => families.map(({ id, name }) => `<option value="${id}">${name}</option>`).join("");
