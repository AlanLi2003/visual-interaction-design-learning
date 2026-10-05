import { assertAtlasIntegrity, families, scenes, styles } from "./data/scenes.js";
import { enhanceScene } from "./enhancements.js";
import { getCardById, initializeInteractionRuntime, nativeBaselineFamilies, setGlobalMotionPaused } from "./interactions.js";
import { familyOptions, sceneCardMarkup, styleOptions } from "./render.js";
import "./styles.css";

const nativeOnly = new URLSearchParams(location.search).has("native");
const integrity = assertAtlasIntegrity();
if (nativeBaselineFamilies.length !== integrity.families || families.some(({ id }) => !nativeBaselineFamilies.includes(id))) {
  throw new Error("Native interaction baseline coverage must match all 16 approved families.");
}
const app = document.querySelector("#app");

app.innerHTML = `
  <div class="app-frame">
    <header class="topbar">
      <a class="brand" href="#top" aria-label="Visual Interaction Atlas home"><span class="brand-glyph" aria-hidden="true"><i></i><i></i><i></i></span><span>INTERACTION ATLAS</span></a>
      <div class="topbar-meta"><span class="edition-tag">FIELD GUIDE <b>01—36</b></span><button id="motion-toggle" class="motion-toggle" type="button" aria-pressed="false"><span aria-hidden="true">Ⅱ</span> Pause motion</button></div>
    </header>

    <main id="top">
      <section class="intro-section" aria-labelledby="page-title">
        <div class="intro-copy"><p class="kicker"><span class="kicker-dot"></span> A LIVING LIBRARY OF DIGITAL FEELING</p><h1 id="page-title">Shape the way<br /><em>it responds.</em></h1><p class="intro-summary">Explore 36 carefully composed mini scenes where visual language meets meaningful interaction. Pick a style, then feel the pattern.</p><div class="intro-notes"><span>12 visual grammars</span><span>16 interaction families</span><span>36 original scenes</span></div></div>
        <aside class="featured-scene" aria-label="Featured live scene">${sceneCardMarkup(scenes[0], { featured: true })}</aside>
      </section>

      <section class="library-section" aria-labelledby="library-title">
        <div class="library-heading"><div><p class="section-kicker">THE SCENE LIBRARY</p><h2 id="library-title">A study in response.</h2></div><div class="library-count"><strong id="result-count">36</strong><span>SCENES</span></div></div>
        <div class="filter-bar" role="group" aria-label="Filter mini scenes">
          <label class="filter-field"><span>VISUAL STYLE</span><select id="style-filter"><option value="all">All visual styles</option>${styleOptions()}</select></label>
          <label class="filter-field"><span>INTERACTION FAMILY</span><select id="family-filter"><option value="all">All interaction families</option>${familyOptions()}</select></label>
          <label class="filter-field search-field"><span>FIND A SCENE</span><input id="scene-search" type="search" placeholder="Try a shape, product, or pattern" autocomplete="off" /></label>
          <button class="clear-filters" id="clear-filters" type="button">Reset filters <span aria-hidden="true">↺</span></button>
        </div>
        <div class="library-subline"><p>SELECT A SCENE TO PLAY ITS NATIVE INTERACTION</p><span id="motion-status" class="runtime-status"><i></i> NATIVE BASELINE READY</span></div>
        <div id="scene-grid" class="scene-grid">${scenes.slice(1).map((scene) => sceneCardMarkup(scene)).join("")}</div>
        <div class="empty-state" id="empty-state" hidden><span class="empty-mark">∅</span><h3>No scenes match that combination.</h3><p>Clear a filter to return to the full collection.</p><button id="empty-reset" type="button">Show all 36 scenes</button></div>
      </section>
    </main>

    <footer class="page-footer"><a class="brand brand--footer" href="#top"><span class="brand-glyph" aria-hidden="true"><i></i><i></i><i></i></span><span>INTERACTION ATLAS</span></a><span>Built for curiosity. Designed to keep moving.</span><span class="footer-count">${integrity.scenes} scenes · ${integrity.families} families</span></footer>
  </div>`;

const allCards = initializeInteractionRuntime(document);
const styleFilter = document.querySelector("#style-filter");
const familyFilter = document.querySelector("#family-filter");
const search = document.querySelector("#scene-search");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const sceneGrid = document.querySelector("#scene-grid");
const featuredScene = document.querySelector(".scene-card--featured");
const motionToggle = document.querySelector("#motion-toggle");
const runtimeStatus = document.querySelector("#motion-status");

const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
const filterScenes = () => {
  const term = normalize(search.value.trim());
  let visible = 0;
  allCards.forEach((card) => {
    const matchStyle = styleFilter.value === "all" || card.dataset.style === styleFilter.value;
    const matchFamily = familyFilter.value === "all" || card.dataset.family === familyFilter.value;
    const matchText = !term || normalize(card.textContent).includes(term);
    const match = matchStyle && matchFamily && matchText;
    card.hidden = !match;
    if (match) visible += 1;
    if (!match && card.dataset.visible === "true") card.dataset.visible = "false";
  });
  resultCount.textContent = String(visible).padStart(2, "0");
  emptyState.hidden = visible !== 0;
  sceneGrid.hidden = !allCards.some((card) => card !== featuredScene && !card.hidden);
  document.dispatchEvent(new CustomEvent("atlas:filters-changed", { detail: { visible } }));
};

styleFilter.addEventListener("change", filterScenes);
familyFilter.addEventListener("change", filterScenes);
search.addEventListener("input", filterScenes);
const resetFilters = () => { styleFilter.value = "all"; familyFilter.value = "all"; search.value = ""; filterScenes(); };
document.querySelector("#clear-filters").addEventListener("click", resetFilters);
document.querySelector("#empty-reset").addEventListener("click", resetFilters);

motionToggle.addEventListener("click", () => {
  const paused = motionToggle.getAttribute("aria-pressed") !== "true";
  motionToggle.setAttribute("aria-pressed", String(paused));
  motionToggle.innerHTML = `<span aria-hidden="true">${paused ? "▶" : "Ⅱ"}</span> ${paused ? "Resume motion" : "Pause motion"}`;
  setGlobalMotionPaused(paused);
});

const handleVisibleScene = ({ detail: { card } }) => {
  if (nativeOnly) return;
  enhanceScene(card).then(() => {
    if (card.dataset.enhanced === "true") {
      runtimeStatus.classList.add("runtime-status--enhanced");
      runtimeStatus.innerHTML = "<i></i> LOCAL ENHANCEMENTS READY";
    } else if (card.dataset.enhancementFailed === "true" && ![...allCards].some((scene) => scene.dataset.enhanced === "true")) {
      runtimeStatus.classList.remove("runtime-status--enhanced");
      runtimeStatus.innerHTML = "<i></i> NATIVE BASELINE · ENHANCEMENTS UNAVAILABLE";
    }
  });
};
window.addEventListener("atlas:scene-visible", handleVisibleScene);
if (nativeOnly) {
  runtimeStatus.classList.add("runtime-status--native");
  runtimeStatus.innerHTML = "<i></i> NATIVE-ONLY MODE · NO ENHANCEMENTS";
} else {
  runtimeStatus.innerHTML = "<i></i> NATIVE BASELINE · LOCAL ENHANCEMENTS LOADING";
}

matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change", (event) => {
  document.documentElement.classList.toggle("prefers-reduced-motion", event.matches);
  allCards.forEach((card) => {
    if (event.matches) card._enhancement?.pause();
    else if (card.dataset.visible === "true") card._enhancement?.resume();
  });
});

window.__atlasDebug = {
  integrity,
  styles: styles.map(({ id }) => id),
  families: families.map(({ id }) => id),
  nativeBaselineFamilies,
  cards: allCards,
  getCardById,
  setMotionPaused: setGlobalMotionPaused,
  nativeOnly,
};
