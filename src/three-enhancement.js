import {
  AmbientLight,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  TorusGeometry,
  WebGLRenderer,
} from "three";

const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export const addSpatialDepth = async (card) => {
  const artwork = card.querySelector(".artwork");
  let mount;
  let renderer;
  let scene;
  let camera;
  let core;
  let ring;
  let node;
  let resizeObserver;
  let disposed = false;
  const geometries = [];
  const materials = [];

  const release = () => {
    renderer?.setAnimationLoop(null);
    resizeObserver?.disconnect();
    geometries.splice(0).forEach((geometry) => geometry.dispose());
    materials.splice(0).forEach((material) => material.dispose());
    renderer?.forceContextLoss();
    renderer?.dispose();
    mount?.remove();
    mount = undefined;
    renderer = undefined;
    scene = undefined;
    camera = undefined;
    core = undefined;
    ring = undefined;
    node = undefined;
    resizeObserver = undefined;
  };

  const initialize = () => {
    const canvas = document.createElement("canvas");
    if (!canvas.getContext("webgl2")) return false;
    try {
      mount = document.createElement("div");
      mount.className = "three-layer";
      mount.setAttribute("aria-hidden", "true");
      artwork.prepend(mount);
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      mount.append(renderer.domElement);
      scene = new Scene();
      camera = new PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.z = 7;
      scene.add(new AmbientLight(0x9aafff, 2.1));
      const keyLight = new PointLight(0x8edbff, 4.5, 16);
      keyLight.position.set(3, 3, 5);
      scene.add(keyLight);
      const coreGeometry = new IcosahedronGeometry(1.14, 2);
      const coreMaterial = new MeshPhysicalMaterial({ color: 0x8f9dff, roughness: 0.3, metalness: 0.23, transparent: true, opacity: 0.44, wireframe: true });
      core = new Mesh(coreGeometry, coreMaterial);
      scene.add(core);
      geometries.push(coreGeometry);
      materials.push(coreMaterial);
      const ringGeometry = new TorusGeometry(1.83, 0.012, 8, 96);
      const ringMaterial = new MeshBasicMaterial({ color: 0x82e3ed, transparent: true, opacity: 0.84 });
      ring = new Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI * 0.35;
      scene.add(ring);
      geometries.push(ringGeometry);
      materials.push(ringMaterial);
      const nodeGeometry = new SphereGeometry(0.085, 10, 8);
      const nodeMaterial = new MeshBasicMaterial({ color: 0xffc285 });
      node = new Mesh(nodeGeometry, nodeMaterial);
      node.position.set(1.65, 0.48, 0.2);
      scene.add(node);
      geometries.push(nodeGeometry);
      materials.push(nodeMaterial);
      const resize = () => {
        if (!renderer || !mount?.isConnected) return;
        const rect = mount.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.setSize(rect.width, rect.height, false);
        renderer.render(scene, camera);
      };
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      resize();
      return true;
    } catch {
      release();
      return false;
    }
  };

  const draw = (time = 0) => {
    if (!renderer || !scene) return;
    const phase = time * 0.00018;
    core.rotation.y = phase;
    core.rotation.x = Math.sin(phase * 0.7) * 0.22;
    ring.rotation.z = phase * 0.45;
    node.position.set(Math.cos(phase * 1.3) * 1.65, Math.sin(phase * 1.3) * 0.52, 0.2);
    renderer.render(scene, camera);
  };

  return {
    resume: () => {
      if (disposed || reduceMotion() || card.dataset.visible !== "true" || document.hidden || document.documentElement.classList.contains("motion-paused")) return;
      if (!renderer && !initialize()) return;
      renderer.setAnimationLoop(draw);
    },
    pause: release,
    dispose: () => { disposed = true; release(); },
  };
};
