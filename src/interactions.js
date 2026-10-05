export const nativeBaselineFamilies = Object.freeze(["parallax", "scan", "orbit", "bounce", "flip", "accordion", "reveal", "slide", "flash", "magnetic", "zoom", "press", "stack", "morph", "marquee", "drag"]);
const nativeAnimations = new Map();
const cardsById = new Map();
let userPaused = false;
let pageHidden = document.hidden;
let intersectionObserver;

const cardAnimations = (card) => {
  if (!nativeAnimations.has(card)) nativeAnimations.set(card, new Set());
  return nativeAnimations.get(card);
};

const trackAnimation = (card, animation) => {
  cardAnimations(card).add(animation);
  animation.addEventListener("finish", () => cardAnimations(card).delete(animation), { once: true });
  return animation;
};

const canAnimate = (card) => !userPaused && !pageHidden && card.dataset.visible === "true" && !matchMedia("(prefers-reduced-motion: reduce)").matches;

const announce = (card, message) => {
  const feedback = card.querySelector(".scene-feedback");
  if (feedback) feedback.textContent = message;
};

const playEntrance = (card) => {
  if (card.dataset.entered === "true") return;
  card.dataset.entered = "true";
  card.classList.add("is-entered");
  if (!canAnimate(card)) return;
  const layout = card.querySelector(".scene-layout");
  const animation = layout.animate(
    [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 560, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" },
  );
  trackAnimation(card, animation);
};

const revealCard = (card) => {
  card.dataset.visible = "true";
  card.classList.add("is-visible");
  playEntrance(card);
  if (canAnimate(card)) {
    cardAnimations(card).forEach((animation) => {
      if (animation.playState === "paused") animation.play();
    });
  }
  if (card._enhancement) card._enhancement.resume();
  window.dispatchEvent(new CustomEvent("atlas:scene-visible", { detail: { card } }));
};

const pauseCard = (card) => {
  card.dataset.visible = "false";
  card.classList.remove("is-visible");
  cardAnimations(card).forEach((animation) => animation.pause());
  if (card._enhancement) card._enhancement.pause();
};

const pulseClass = (element, className, duration = 1100) => {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
  window.setTimeout(() => element.classList.remove(className), duration);
};

const initializeDrag = (card) => {
  const artwork = card.querySelector(".drag-object");
  const token = card.querySelector(".drag-token");
  const zone = card.querySelector(".drop-zone");
  const result = card.querySelector(".drag-result");
  if (!artwork || !token || !zone) return;
  let drag = null;
  let keyboardOffset = { x: 0, y: 0 };
  const setOffset = (x, y) => {
    const bounds = artwork.getBoundingClientRect();
    const maxX = Math.max(8, bounds.width * 0.4);
    const maxY = Math.max(8, bounds.height * 0.34);
    keyboardOffset = { x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) };
    token.style.setProperty("--drag-x", `${keyboardOffset.x}px`);
    token.style.setProperty("--drag-y", `${keyboardOffset.y}px`);
  };
  const reset = (message = "Drag the card into its next place") => {
    token.classList.remove("is-dragging", "is-dropped");
    artwork.classList.remove("has-drop");
    token.style.removeProperty("--drag-x");
    token.style.removeProperty("--drag-y");
    keyboardOffset = { x: 0, y: 0 };
    result.textContent = message;
    card.dataset.dropResolved = "false";
  };
  token.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 && event.pointerType !== "touch") return;
    drag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, start: keyboardOffset };
    token.setPointerCapture(event.pointerId);
    token.classList.add("is-dragging");
    artwork.classList.add("is-drag-active");
  });
  token.addEventListener("pointermove", (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    setOffset(drag.start.x + event.clientX - drag.x, drag.start.y + event.clientY - drag.y);
  });
  token.addEventListener("pointerup", (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const zoneBounds = zone.getBoundingClientRect();
    const tokenBounds = token.getBoundingClientRect();
    const centerX = tokenBounds.left + tokenBounds.width / 2;
    const centerY = tokenBounds.top + tokenBounds.height / 2;
    const landed = centerX >= zoneBounds.left && centerX <= zoneBounds.right && centerY >= zoneBounds.top && centerY <= zoneBounds.bottom;
    drag = null;
    token.classList.remove("is-dragging");
    artwork.classList.remove("is-drag-active");
    if (landed) {
      token.classList.add("is-dropped");
      artwork.classList.add("has-drop");
      card.dataset.dropResolved = "true";
      result.textContent = "Sorted into the launch board";
      announce(card, "Idea card placed in the drop zone.");
    } else {
      result.textContent = "Not quite—move it into the outlined area";
      window.setTimeout(() => setOffset(0, 0), 80);
    }
  });
  token.addEventListener("pointercancel", () => { drag = null; reset(); });
  token.addEventListener("keydown", (event) => {
    const step = event.shiftKey ? 22 : 12;
    const deltas = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (deltas[event.key]) {
      event.preventDefault();
      token.classList.add("is-dragging");
      setOffset(keyboardOffset.x + deltas[event.key][0], keyboardOffset.y + deltas[event.key][1]);
      result.textContent = "Position the card, then press Enter to place it";
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      token.classList.remove("is-dragging");
      token.classList.add("is-dropped");
      artwork.classList.add("has-drop");
      card.dataset.dropResolved = "true";
      result.textContent = "Sorted into the launch board";
      announce(card, "Idea card placed in the drop zone.");
    } else if (event.key === "Escape") {
      reset();
    }
  });
  card._resetDrag = reset;
};

const handleAction = (card) => {
  const family = card.dataset.family;
  const artwork = card.querySelector(".artwork");
  const trigger = card.querySelector("[data-scene-action]");
  switch (family) {
    case "parallax":
      pulseClass(artwork, "is-depth-pulse", 800);
      announce(card, "Pointer movement shifts each depth layer at a different rate.");
      break;
    case "scan": {
      const target = artwork.querySelector(".scan-object");
      pulseClass(target, "is-scanning", 1050);
      window.setTimeout(() => {
        target.querySelector(".scan-readout").textContent = "CLEAR · 42";
        announce(card, "Scan complete. Air quality is good.");
      }, 620);
      break;
    }
    case "orbit":
      artwork.classList.toggle("is-selected");
      announce(card, artwork.classList.contains("is-selected") ? "Relay selected. The orbital route is highlighted." : "Relay selection cleared.");
      break;
    case "bounce":
      pulseClass(artwork.querySelector(".bounce-object"), "is-bouncing", 900);
      announce(card, "Lesson is ready. The guide has bounced into focus.");
      break;
    case "flip": {
      const flipped = artwork.classList.toggle("is-flipped");
      trigger.setAttribute("aria-pressed", String(flipped));
      announce(card, flipped ? "The reverse side is now in view." : "Returned to the front side.");
      break;
    }
    case "accordion": {
      const open = artwork.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(open));
      const panel = artwork.querySelector(".accordion-panel");
      panel.setAttribute("aria-hidden", String(!open));
      panel.toggleAttribute("inert", !open);
      announce(card, open ? "Additional details expanded." : "Additional details collapsed.");
      break;
    }
    case "reveal": {
      const shown = artwork.classList.toggle("is-revealed");
      trigger.setAttribute("aria-expanded", String(shown));
      artwork.querySelector(".reveal-note").setAttribute("aria-hidden", String(!shown));
      announce(card, shown ? "The full story is revealed." : "The story is masked again.");
      break;
    }
    case "slide": {
      const track = artwork.querySelector(".rail-track");
      const next = (Number(artwork.dataset.slideIndex || 0) + 1) % 3;
      artwork.dataset.slideIndex = String(next);
      track.style.setProperty("--slide-index", next);
      artwork.querySelector(".rail-progress").textContent = `${String(next + 1).padStart(2, "0")} / 03`;
      artwork.querySelector(".rail-dots").textContent = [0, 1, 2].map((step) => step === next ? "●" : "○").join(" ");
      announce(card, `Slide ${next + 1} of 3 is active.`);
      break;
    }
    case "flash":
      pulseClass(artwork.querySelector(".flash-object"), "is-flashing", 750);
      artwork.querySelector(".flash-status").textContent = "THREAT CONTAINED";
      window.setTimeout(() => { artwork.querySelector(".flash-status").textContent = "SYSTEM NOMINAL"; }, 850);
      announce(card, "Alert inspected. Threat contained.");
      break;
    case "magnetic": {
      const active = artwork.classList.toggle("is-magnetic-active");
      trigger.setAttribute("aria-pressed", String(active));
      announce(card, active ? "Magnetic attraction is active. Move the pointer over the target." : "Magnetic target returned to center.");
      break;
    }
    case "zoom": {
      const focused = artwork.classList.toggle("is-focused");
      trigger.setAttribute("aria-pressed", String(focused));
      announce(card, focused ? "Metric brought into focus; comparison remains available." : "Returned to the full metric context.");
      break;
    }
    case "press": {
      const target = artwork.querySelector(".press-object");
      pulseClass(target, "is-pressed", 320);
      announce(card, "The tactile control compressed and returned.");
      break;
    }
    case "stack": {
      const step = (Number(artwork.dataset.stackStep || 0) + 1) % 3;
      artwork.dataset.stackStep = String(step);
      artwork.style.setProperty("--stack-step", step);
      announce(card, `Stack cycled. ${step === 0 ? "Current focus" : `Layer ${step + 1}`} is on top.`);
      break;
    }
    case "morph": {
      const morphed = artwork.classList.toggle("is-morphed");
      trigger.setAttribute("aria-pressed", String(morphed));
      announce(card, morphed ? "The base silhouette morphed into a new shape." : "The original silhouette is restored.");
      break;
    }
    case "marquee": {
      const paused = artwork.classList.toggle("is-marquee-paused");
      trigger.setAttribute("aria-pressed", String(paused));
      announce(card, paused ? "Release strip paused." : "Release strip is moving again.");
      break;
    }
    case "drag":
      card._resetDrag?.("Drag the card into its next place");
      announce(card, "Drag the idea card with a pointer or arrow keys.");
      break;
    default:
      announce(card, "Interaction is ready.");
  }
};

const bindCard = (card) => {
  cardsById.set(card.dataset.sceneId, card);
  card.querySelector("[data-scene-action]").addEventListener("click", () => handleAction(card));
  if (card.dataset.family === "parallax") {
    const artwork = card.querySelector(".artwork");
    const layers = [...artwork.querySelectorAll(".depth-orb")];
    artwork.addEventListener("pointermove", (event) => {
      const bounds = artwork.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      layers.forEach((layer, index) => {
        const factor = (index + 1) * 3;
        layer.style.translate = `${x * factor}px ${y * factor}px`;
      });
    });
    artwork.addEventListener("pointerleave", () => layers.forEach((layer) => { layer.style.translate = ""; }));
  }
  if (card.dataset.family === "magnetic") {
    const artwork = card.querySelector(".artwork");
    const object = artwork.querySelector(".magnetic-object");
    const target = object.querySelector(".magnetic-target");
    object.addEventListener("pointermove", (event) => {
      if (!artwork.classList.contains("is-magnetic-active")) return;
      const rect = object.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const strength = Math.max(0, 1 - distance / Math.max(rect.width, rect.height)) * 18;
      target.style.translate = `${(dx / (distance || 1)) * strength}px ${(dy / (distance || 1)) * strength}px`;
    });
    object.addEventListener("pointerleave", () => { target.style.translate = ""; });
  }
  if (card.dataset.family === "press") {
    const target = card.querySelector(".press-object");
    target.tabIndex = 0;
    target.setAttribute("role", "button");
    target.setAttribute("aria-label", "Press the tactile capsule");
    target.addEventListener("pointerdown", () => target.classList.add("is-pressed"));
    ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => target.addEventListener(eventName, () => target.classList.remove("is-pressed")));
    target.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); pulseClass(target, "is-pressed", 320); }
    });
  }
  if (card.dataset.family === "drag") initializeDrag(card);
};

export const initializeInteractionRuntime = (root = document) => {
  const cards = [...root.querySelectorAll(".scene-card")];
  cards.forEach(bindCard);
  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) revealCard(target);
      else pauseCard(target);
    });
  }, { rootMargin: "160px 0px", threshold: 0.01 });
  cards.forEach((card) => intersectionObserver.observe(card));
  document.addEventListener("visibilitychange", () => {
    pageHidden = document.hidden;
    cards.forEach((card) => {
      if (pageHidden || userPaused) pauseCard(card);
      else if (card.getBoundingClientRect().bottom > 0 && card.getBoundingClientRect().top < innerHeight) revealCard(card);
    });
  });
  return cards;
};

export const setGlobalMotionPaused = (paused) => {
  userPaused = paused;
  document.documentElement.classList.toggle("motion-paused", paused);
  cardsById.forEach((card) => {
    if (paused) pauseCard(card);
    else if (card.getBoundingClientRect().bottom > 0 && card.getBoundingClientRect().top < innerHeight) revealCard(card);
  });
};

export const getCardById = (id) => cardsById.get(id);
