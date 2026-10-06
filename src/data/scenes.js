export const styles = [
  { id: "futuristic", label: "科幻", name: "Futuristic", mood: "Signal / precision", grammar: { composition: "Asymmetric command center with one large data field and compact telemetry.", typography: "Geometric sans with monospace microcopy.", material: "Smoked glass, hairline borders, cyan and violet light over deep space.", density: "Medium-high, precisely aligned.", motion: "Measured scan, orbit, and depth movement.", avoid: "Generic neon dashboard or excessive bloom." } },
  { id: "cartoon", label: "卡通", name: "Cartoon", mood: "Play / personality", grammar: { composition: "Playful asymmetry with a character or object as the focal point.", typography: "Rounded display with friendly UI sans.", material: "Satin surfaces, sticker edges, confident outlines.", density: "Medium.", motion: "Elastic bounce, squash, and playful reveals.", avoid: "Childish clutter or random rainbow gradients." } },
  { id: "minimal", label: "极简", name: "Minimal", mood: "Quiet / considered", grammar: { composition: "Strong whitespace and one clear editorial axis.", typography: "Restrained neo-grotesk.", material: "Flat surfaces, subtle borders, nearly invisible shadow.", density: "Low-medium.", motion: "Quiet reveal, accordion, and slide.", avoid: "Ornamental motion or decorative glass." } },
  { id: "cyberpunk", label: "赛博朋克", name: "Cyberpunk", mood: "Voltage / signal", grammar: { composition: "Fractured diagonals and offset technical framing.", typography: "Condensed display with mono metadata.", material: "Black-violet field with bounded cyan-magenta scan light.", density: "Medium-high.", motion: "Brief glitch, security scan, and rail motion.", avoid: "Constant flashing or gaming-template overload." } },
  { id: "glass", label: "玻璃", name: "Glassmorphism", mood: "Depth / clarity", grammar: { composition: "Layered depth planes around a floating central island.", typography: "Clean modern sans.", material: "Translucency, blur, inner highlight, and visible background depth.", density: "Medium-low.", motion: "Layer parallax, magnetic focus, and soft zoom.", avoid: "Transparent rectangles without depth cues." } },
  { id: "clay", label: "黏土", name: "Claymorphism", mood: "Tactile / warm", grammar: { composition: "Centered tactile object with supporting soft cards.", typography: "Friendly rounded sans.", material: "Soft clay volume with directional light and nested shadows.", density: "Low-medium.", motion: "Physical press, soft stack, and organic morph.", avoid: "Flat gradients pretending to be clay." } },
  { id: "editorial", label: "编辑", name: "Editorial", mood: "Culture / story", grammar: { composition: "Typography-led asymmetric columns and art-directed crop.", typography: "High-contrast serif with neutral sans.", material: "Paper field, thin rules, and restrained effects.", density: "Medium, led by content.", motion: "Editorial reveal, image depth, and column slide.", avoid: "Dashboard or card-grid composition." } },
  { id: "y2k", label: "Y2K", name: "Y2K Retro", mood: "Chrome / optimism", grammar: { composition: "Retro desktop and window logic with modern spacing.", typography: "Techno display with utility sans.", material: "Pearl chrome, translucent plastic, and glossy controls.", density: "Medium.", motion: "Window flip, chrome marquee, and pop-up flash.", avoid: "Nostalgia without hierarchy." } },
  { id: "bento", label: "Bento", name: "Bento", mood: "Modular / useful", grammar: { composition: "One dominant tile with clearly subordinate modules.", typography: "Compact product sans.", material: "Matte panels, subtle borders, and one accent gradient.", density: "Medium-high but organized.", motion: "Tile magnet, module stack, and metric focus.", avoid: "Equal-weight tile soup." } },
  { id: "organic", label: "自然有机", name: "Organic", mood: "Flow / ease", grammar: { composition: "Soft asymmetry with flowing negative space and curved paths.", typography: "Humanist sans or soft serif.", material: "Warm matte, natural grain, and gentle gradients.", density: "Low-medium.", motion: "Organic morph, leaf depth, and soft drag.", avoid: "Clinical UI grids." } },
  { id: "brutal", label: "新粗野", name: "Neo Brutalism", mood: "Direct / bold", grammar: { composition: "Bold blocks, visible structure, and deliberate collision.", typography: "Heavy grotesk display.", material: "Solid color, thick black stroke, and hard offset shadow.", density: "Medium-high.", motion: "Hard slide, physical press, and block accordion.", avoid: "Soft blur or invisible hierarchy." } },
  { id: "spatial", label: "空间未来", name: "Spatial", mood: "Orbit / presence", grammar: { composition: "Spatial focal object surrounded by a layered depth shell.", typography: "Sparse geometric sans with micro labels.", material: "Volumetric glow, transparent layers, and atmospheric depth.", density: "Low-medium.", motion: "Orbit, depth focus, and spatial parallax.", avoid: "Flat 2D card UI on a dark background." } },
];

export const families = [
  { id: "parallax", name: "Parallax", states: "Aligned → pointer/camera shift → layers move at distinct ratios → depth resolves → smooth reset" },
  { id: "scan", name: "Scan", states: "Stable target → scan enters → field traverses target → data updates → reset" },
  { id: "orbit", name: "Orbit", states: "Focal core + path → orbit/pointer phase → node travels → selection resolves → continue/reset" },
  { id: "bounce", name: "Bounce", states: "Resting object → entry/action → squash + rise → overshoot and settle → rest" },
  { id: "flip", name: "Flip", states: "Readable front → trigger → perspective rotation → readable back → rotate/reset" },
  { id: "accordion", name: "Accordion", states: "Collapsed item → trigger → content expands → open state → collapse/reset" },
  { id: "reveal", name: "Reveal", states: "Masked content → trigger → directional reveal → fully readable → reverse/reset" },
  { id: "slide", name: "Slide", states: "Track position → trigger → real content rail translates → next item locks → advance/reset" },
  { id: "flash", name: "Flash", states: "Stable object → trigger → bounded flash/displacement → resolved state visible → calm reset" },
  { id: "magnetic", name: "Magnetic", states: "Centered target → pointer enters radius → constrained attraction → hover resolves → spring back" },
  { id: "zoom", name: "Zoom", states: "Normal scale → focus cue → focal object and layers react → focus resolves → reset" },
  { id: "press", name: "Press", states: "Raised target → pointer/touch down → compression + shadow collapse → depressed → release/recover" },
  { id: "stack", name: "Stack", states: "Layered cards → trigger → top card changes depth/order → new order resolves → cycle/reset" },
  { id: "morph", name: "Morph", states: "Base silhouette → trigger/loop → geometry changes → alternate silhouette → return" },
  { id: "marquee", name: "Marquee", states: "Readable strip → continuous track movement → seamless repeat → pause on focus → resume" },
  { id: "drag", name: "Drag", states: "Draggable object → pointer-down → constrained pointer-follow → drop/snap → reset/next" },
];

const rows = [
  ["futuristic", "parallax", "Pointer Parallax", "Floating Glass Dashboard", "AI operations", "Every model, one live signal.", "Track inference health across your workspace without losing the big picture.", "Open signal map", ["Requests / min", "2,840"], ["Latency p95", "184 ms"]],
  ["futuristic", "scan", "Scanning Loop", "Cut HUD", "Climate intelligence", "Read the atmosphere in real time.", "A clear scan turns shifting air-quality data into a decision you can act on.", "Run air scan", ["Air quality", "Good · 42"], ["Next pass", "00:18"]],
  ["futuristic", "orbit", "Orbital Navigation", "Radial Ring", "Satellite planning", "Keep every relay in view.", "Follow a live satellite path and inspect the next handoff window.", "Select relay", ["Relay 04", "Online"], ["Pass window", "6 min"]],
  ["cartoon", "bounce", "Elastic Bounce", "Character Card", "Learning studio", "Small lessons, big momentum.", "Meet a friendly guide that keeps a daily language practice moving.", "Start today’s lesson", ["Daily streak", "12 days"], ["Lesson time", "08 min"], { guideName: "Pip", guideRole: "YOUR LANGUAGE BUDDY", guideCue: "Ready for today’s word?" }],
  ["cartoon", "flip", "Playful Flip", "Bubble Window", "Community garden", "Grow something together.", "Turn a seed card to discover a neighbor’s seasonal planting tip.", "Reveal the tip", ["Seeds shared", "128"], ["Local growers", "36"], { flipFront: "Seed swap", flipFrontMeta: "COMMUNITY GARDEN · 01", flipFrontMark: "✿", flipBackLabel: "GROWER NOTE", flipBack: "Peas thrive in cool soil.", flipBackMeta: "ZONE 6 · PLANTING TIP" }],
  ["cartoon", "accordion", "Candy Accordion", "Pill List", "Wellness", "A gentler start to your day.", "Open a short breathing routine and choose a pace that feels right.", "View breathing routine", ["Session", "04 min"], ["Pace", "Easy"], { expandedDetail: "Inhale for four, hold for two, then exhale for six. Repeat at an easy pace for four minutes.", expandedMeta: "FOUR-MINUTE RESET · EASY PACE" }],
  ["minimal", "reveal", "Masked Reveal", "Split Editorial Panel", "Creative portfolio", "Make the work speak first.", "A quiet case-study cover reveals the thinking behind a finished identity.", "Read the case study", ["Project", "Fieldnotes"], ["Year", "2025"]],
  ["minimal", "accordion", "Quiet Accordion", "Sidebar List", "Personal finance", "Know where the month goes.", "Expand a spending category to see a calm, useful breakdown.", "Review categories", ["Spent", "$1,284"], ["Budget left", "$716"], { expandedDetail: "Groceries: $284 used of a $420 monthly category budget, leaving $136 for the rest of the month.", expandedMeta: "GROCERIES · $420 CATEGORY PLAN" }],
  ["minimal", "slide", "Silent Slider", "Long Card", "Reading list", "Pick up where you left off.", "Move through saved essays with the context and reading time intact.", "Continue reading", ["Next up", "The Shape of a Day"], ["Reading time", "08 min"], { railItems: [{ number: "01", title: "A Room for Attention", meta: "Current read · 06 min" }, { number: "02", title: "The Shape of a Day", meta: "Next in your list · 08 min" }, { number: "03", title: "A Practice of Looking", meta: "Saved essay · 05 min" }] }],
  ["cyberpunk", "flash", "Glitch Flash", "Bevel Panel", "Security operations", "Catch a threat before it spreads.", "A bounded alert pulse highlights the device that needs attention.", "Inspect alert", ["Risk", "Contained"], ["Devices", "03 flagged"]],
  ["cyberpunk", "scan", "Security Scan", "HUD Frame", "Digital identity", "Verify the signal, not the noise.", "Run a local integrity check and review each verified layer.", "Start integrity scan", ["Identity integrity", "98.6%"], ["Verified layers", "04"]],
  ["cyberpunk", "slide", "Neon Rail", "Hard Card", "Music discovery", "Follow the night frequency.", "Browse a curated line-up of independent electronic radio sets.", "Explore broadcasts", ["On air", "Channel 07"], ["Listeners", "1.2k"], { railItems: [{ number: "07", title: "Midnight Circuit", meta: "NOW PLAYING · CHANNEL 07" }, { number: "08", title: "Soft Collision", meta: "NEXT ON AIR · 23:40" }, { number: "09", title: "Glass City Afterdark", meta: "UP NEXT · 00:15" }] }],
  ["glass", "parallax", "Layer Parallax", "Glass Island", "Creative cloud", "Your ideas, in their own orbit.", "Separate active drafts, shared references, and finished work at a glance.", "Open workspace", ["Active boards", "08"], ["Synced", "Just now"], { depthSummary: "03 floating planes", parallaxContext: "Active workspace" }],
  ["glass", "magnetic", "Magnetic CTA", "Glass Capsule", "Travel planning", "Make room for a slower trip.", "Shape a flexible itinerary around places worth staying a little longer.", "Build an itinerary", ["Trip length", "5 days"], ["Saved places", "12"]],
  ["glass", "zoom", "Focus Zoom", "Floating Card", "Product analytics", "Find the moment users stay.", "Bring one meaningful activation metric into focus without hiding its context.", "Inspect activation", ["Activation", "+18.4%"], ["Window", "7 days"]],
  ["clay", "press", "Tactile Press", "Soft Capsule", "Mindful routines", "Make the pause feel possible.", "A soft, pressable breathing cue gives a short reset room to begin.", "Begin a reset", ["Breaths", "04 cycles"], ["Time", "60 sec"]],
  ["clay", "stack", "Soft Stack", "Clay Card", "Recipe notebook", "Keep the recipes worth repeating.", "Sort family recipes into a tactile stack for the week ahead.", "Shuffle this week’s menu", ["Saved recipes", "42"], ["Plan", "5 dinners"]],
  ["clay", "morph", "Blob Morph", "Soft Blob", "Art practice", "Let a rough idea take shape.", "A changing color study makes room for play before the final mark.", "Try another study", ["Palette", "Warm dusk"], ["Studies", "09"]],
  ["editorial", "reveal", "Editorial Reveal", "Split Frame", "Cultural journal", "The city changes after rain.", "A field note opens onto the people and places behind a neighborhood archive.", "Read field note", ["Issue", "No. 08"], ["Read", "4 min"]],
  ["editorial", "parallax", "Image Parallax", "Cropping Frame", "Travel journal", "Light moves through the valley.", "A considered crop follows the landscape without pulling focus from the story.", "Explore the route", ["Region", "Dolomites"], ["Season", "Autumn"]],
  ["editorial", "slide", "Column Slide", "Magazine Strip", "Independent magazine", "Ideas move across disciplines.", "A column rail connects essays on craft, culture, and the tools between them.", "Browse the issue", ["Edition", "Autumn 25"], ["Stories", "18"], { railItems: [{ number: "01", title: "Materials for a Changing City", meta: "Feature · Autumn 25" }, { number: "02", title: "Listening as Research", meta: "Culture · Essay" }, { number: "03", title: "Tools for the Common Good", meta: "Craft · 9 min read" }] }],
  ["y2k", "flip", "Window Flip", "Bubble Window", "Digital collectibles", "A little future, saved.", "Turn the collectible window to see its maker note and edition history.", "Open collection", ["Edition", "042 / 500"], ["Creator", "Mina Park"], { flipFront: "Starlight No. 042", flipFrontMeta: "MINA PARK · MOON GARDEN", flipFrontMark: "✧", flipBackLabel: "MAKER NOTE", flipBack: "Signed by Mina Park · edition 042 of 500.", flipBackMeta: "COLLECTIBLE · SERIES 01" }],
  ["y2k", "marquee", "Chrome Marquee", "Pill Strip", "Music archive", "A soundtrack for new beginnings.", "A smooth chrome strip carries the latest releases across a small listening room.", "Browse new releases", ["New this week", "24 tracks"], ["Curated by", "Studio FM"]],
  ["y2k", "flash", "Pop-up Flash", "Retro Window", "Personal library", "Your next favorite is waiting.", "A brief pop-up surfaces a book from your reading history, then settles.", "Open recommendation", ["Picked for you", "The Creative Act"], ["Why this", "Saved topic"]],
  ["bento", "magnetic", "Tile Magnet", "Grid Tile", "Team analytics", "One clear view of team health.", "Bring the metric tile you need closer while keeping the dashboard balanced.", "Open team overview", ["Projects on track", "86%"], ["Updated", "Today"]],
  ["bento", "stack", "Module Stack", "Bento Card", "Commerce operations", "Know what needs a hand.", "Prioritize inventory, orders, and returns with one shifting module stack.", "Review open tasks", ["Open orders", "216"], ["Returns", "08"]],
  ["bento", "zoom", "Metric Focus", "Data Tile", "Sustainable commerce", "See the footprint behind each choice.", "Focus one product impact metric alongside the context that shaped it.", "Explore impact", ["Packaging saved", "1.8 t"], ["This quarter", "+12%"]],
  ["organic", "morph", "Organic Morph", "Blob Container", "Plant care", "Help each plant find its rhythm.", "A soft growth shape responds as watering and light needs change.", "Check plant care", ["Monstera", "Needs light"], ["Next water", "2 days"]],
  ["organic", "parallax", "Leaf Parallax", "Ellipse Layer", "Outdoor wellness", "Take the long way back.", "A gentle layered route preview invites a walk through nearby green space.", "Find a walking route", ["Distance", "2.4 km"], ["Green space", "78%"], { depthSummary: "03 leaf planes", parallaxContext: "Trail preview" }],
  ["organic", "drag", "Soft Drag", "Rounded Card", "Creative planning", "Move your ideas into place.", "Drag a thought card toward the part of the project where it belongs.", "Organize the board", ["Ideas", "16 cards"], ["Board", "Spring launch"]],
  ["brutal", "slide", "Hard Slide", "Bold Card", "Independent commerce", "Make the next move obvious.", "A direct product rail puts the featured release ahead of the noise.", "View the release", ["Drop", "Studio No. 04"], ["Available", "Now"]],
  ["brutal", "press", "Physical Press", "Hard Button", "Event booking", "Put the date on the calendar.", "A tactile confirm button makes the selected workshop booking feel final.", "Reserve your place", ["Workshop", "Type & Form"], ["Places left", "06"]],
  ["brutal", "accordion", "Block Accordion", "Sidebar Block", "Learning platform", "Build the skill one block at a time.", "Expand a course module to see the next exercise and its time estimate.", "View course modules", ["Course", "Design systems"], ["Progress", "64%"]],
  ["spatial", "orbit", "Orbital Motion", "Radial Ring", "Spatial computing", "Navigate knowledge in every direction.", "Orbit around connected research nodes and open the source that matters.", "Explore the network", ["Nodes", "128"], ["Connections", "406"]],
  ["spatial", "zoom", "Depth Focus", "Floating Orb", "Immersive workspace", "Bring a room into focus.", "Focus Room 08 while its twelve spatial objects hold their distance.", "Enter Room 08", ["Focused room", "Room 08"], ["Spatial objects", "12"], { focusDetail: "room-scale view" }],
  ["spatial", "parallax", "Spatial Parallax", "Depth Island", "Spatial audio", "See the sound move around you.", "A layered listening space maps a mix to a focal object and its orbiting tracks.", "Open the listening space", ["Active layers", "05"], ["Listening mode", "Spatial"]],
];

const byStyle = new Map(styles.map((item) => [item.id, item]));
const byFamily = new Map(families.map((item) => [item.id, item]));

export const scenes = rows.map(([styleId, familyId, variant, shape, domain, headline, summary, action, statA, statB, content = {}], index) => {
  const style = byStyle.get(styleId);
  const family = byFamily.get(familyId);
  const number = String(index + 1).padStart(2, "0");
  const id = `${styleId}-${familyId}-${number}`;
  const scene = {
    number,
    domain,
    eyebrow: `${style.name} · ${variant}`,
    headline,
    summary,
    action,
    ...content,
    focus: statA[1],
    supporting: [statA, statB],
    familyStates: family.states,
  };
  return {
    id,
    style: styleId,
    interactionFamily: familyId,
    interactionVariant: variant,
    shape,
    scene,
    prompt: {
      goal: `Create a believable ${domain.toLowerCase()} product moment in the ${style.name} visual language.`,
      composition: style.grammar.composition,
      typography: style.grammar.typography,
      material: style.grammar.material,
      interaction: `${variant}: ${family.states}.`,
      content: `Use the headline “${headline}”, one concise supporting sentence, a clear action, and two supporting data points.`,
      shapeLanguage: `${shape} must define the geometry and grouping of the focal object.`,
      constraints: `Responsive reflow below 600px; preserve the focal hierarchy and readable copy. Avoid ${style.grammar.avoid.toLowerCase()}`,
    },
  };
});

export const assertAtlasIntegrity = () => {
  const ids = new Set(scenes.map((scene) => scene.id));
  const variants = new Set(scenes.map((scene) => scene.interactionVariant));
  const countByStyle = new Map(styles.map(({ id }) => [id, scenes.filter((scene) => scene.style === id).length]));
  const familiesUsed = new Set(scenes.map((scene) => scene.interactionFamily));
  const valid = scenes.length === 36 && ids.size === 36 && variants.size === 36 &&
    countByStyle.size === 12 && [...countByStyle.values()].every((count) => count === 3) &&
    familiesUsed.size === 16 && scenes.every((scene) => byStyle.has(scene.style) && byFamily.has(scene.interactionFamily));
  if (!valid) throw new Error("Atlas data failed the approved 36-path consistency checks.");
  return { scenes: scenes.length, styles: countByStyle.size, families: familiesUsed.size, uniqueVariants: variants.size };
};
