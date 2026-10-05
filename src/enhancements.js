let dependencies;
const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const loadDependencies = () => {
  if (!dependencies) {
    dependencies = Promise.all([import("gsap"), import("motion")]).then(([gsapModule, motionModule]) => ({
      gsap: gsapModule.gsap,
      animate: motionModule.animate,
    }));
  }
  return dependencies;
};


export const enhanceScene = async (card) => {
  if (card._enhancement || card.dataset.enhancementFailed === "true") return;
  try {
    const { gsap, animate } = await loadDependencies();
    const art = card.querySelector(".artwork");
    const index = card.querySelector(".stage-index");
    const gsapLoop = gsap.to(art, { "--enhance-lift": "-3px", duration: 1.9, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true });
    const motionEntry = animate(index, { opacity: [0.48, 1], scale: [0.94, 1] }, { duration: 0.46, ease: "easeOut" });
    const spatial = card.dataset.style === "spatial"
      ? await (await import("./three-enhancement.js")).addSpatialDepth(card)
      : null;
    card.dataset.enhanced = "true";
    const handle = {
      pause: () => { gsapLoop.pause(); motionEntry.pause(); spatial?.pause(); },
      resume: () => {
        if (reduceMotion() || card.dataset.visible !== "true" || document.hidden || document.documentElement.classList.contains("motion-paused")) return;
        gsapLoop.play(); motionEntry.play(); spatial?.resume();
      },
      dispose: () => { gsapLoop.kill(); motionEntry.stop(); spatial?.dispose(); },
    };
    card._enhancement = handle;
    handle.resume();
  } catch {
    card.dataset.enhancementFailed = "true";
    card.dataset.enhanced = "false";
  }
};

export const enhancementStatus = () => loadDependencies().then(() => "enhanced").catch(() => "native");
