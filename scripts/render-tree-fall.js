const THREE = require('three');
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const WIDTH = 1920;
const HEIGHT = 1080;

// Headless WebGL context from `gl` package
const gl = require('gl')(WIDTH, HEIGHT, { preserveDrawingBuffer: true });

// Fake DOM so Three.js can instantiate WebGLRenderer without a real browser
function createFakeCanvas() {
  return {
    width: WIDTH,
    height: HEIGHT,
    style: {},
    getContext: (type, attrs) => {
      if (type === 'webgl' || type === 'experimental-webgl') {
        return gl;
      }
      return null;
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    getAttribute: () => null,
    setAttribute: () => {},
    removeAttribute: () => {},
    appendChild: () => {},
    removeChild: () => {},
    clientWidth: WIDTH,
    clientHeight: HEIGHT,
    getBoundingClientRect: () => ({ left: 0, top: 0, width: WIDTH, height: HEIGHT }),
  };
}

const canvas = createFakeCanvas();

global.document = {
  createElementNS: (ns, name) => {
    if (name === 'canvas') return createFakeCanvas();
    return {};
  }
};
global.window = {
  devicePixelRatio: 1,
  addEventListener: () => {},
  removeEventListener: () => {},
};

const OUTPUT_DIR = path.join(__dirname, '../public/frames-three');
const FRAME_COUNT = 121;

// Brand colors
const COLORS = {
  forest: 0x1B4D36,
  pine: 0x2E7D4A,
  lime: 0xC9D93E,
  gold: 0xC9A227,
  cream: 0xF8F5EF,
  ink: 0x111111,
  trunk: 0x5C4033,
  grass: 0x4A7C3B,
  skyTop: 0x87CEEB,
  skyBottom: 0xE0F6FF,
};

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(COLORS.cream);

// Camera - isometric-ish perspective
const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000);
camera.position.set(0, 8, 18);
camera.lookAt(0, 3, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setPixelRatio(1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(8, 15, 10);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 100;
dirLight.shadow.camera.left = -15;
dirLight.shadow.camera.right = 15;
dirLight.shadow.camera.top = 15;
dirLight.shadow.camera.bottom = -15;
scene.add(dirLight);

const fillLight = new THREE.DirectionalLight(0xffeedd, 0.4);
fillLight.position.set(-8, 5, 5);
scene.add(fillLight);

// Ground
const groundGeo = new THREE.PlaneGeometry(60, 60, 1, 1);
const groundMat = new THREE.MeshStandardMaterial({
  color: COLORS.grass,
  roughness: 0.9,
  metalness: 0.0,
});
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Tree group - pivot at base
const treeGroup = new THREE.Group();
treeGroup.position.set(-3, 0, 0); // left side
scene.add(treeGroup);

// Trunk
const trunkGeo = new THREE.CylinderGeometry(0.35, 0.55, 6, 8);
const trunkMat = new THREE.MeshStandardMaterial({
  color: COLORS.trunk,
  roughness: 0.8,
});
const trunk = new THREE.Mesh(trunkGeo, trunkMat);
trunk.position.y = 3;
trunk.castShadow = true;
trunk.receiveShadow = true;
treeGroup.add(trunk);

// Pine needles - stacked cones
const needleMat = new THREE.MeshStandardMaterial({
  color: COLORS.pine,
  roughness: 0.7,
  flatShading: true,
});

const coneLayers = [
  { y: 4.5, radius: 2.0, height: 2.2 },
  { y: 5.8, radius: 1.6, height: 1.8 },
  { y: 6.8, radius: 1.2, height: 1.6 },
  { y: 7.6, radius: 0.8, height: 1.4 },
  { y: 8.2, radius: 0.4, height: 1.0 },
];

coneLayers.forEach((layer) => {
  const coneGeo = new THREE.ConeGeometry(layer.radius, layer.height, 8);
  const cone = new THREE.Mesh(coneGeo, needleMat);
  cone.position.y = layer.y;
  cone.castShadow = true;
  cone.receiveShadow = true;
  treeGroup.add(cone);
});

// Small roots/base
const rootGeo = new THREE.CylinderGeometry(0.6, 0.7, 0.3, 8);
const rootMat = new THREE.MeshStandardMaterial({ color: COLORS.trunk, roughness: 0.9 });
const rootBase = new THREE.Mesh(rootGeo, rootMat);
rootBase.position.y = 0.15;
rootBase.castShadow = true;
rootBase.receiveShadow = true;
treeGroup.add(rootBase);

// Logo placeholder plane on ground (behind where tree will fall)
// We'll composite the real logo in post, but add a subtle marker
const logoPlaneGeo = new THREE.PlaneGeometry(4, 1.6);
const logoPlaneMat = new THREE.MeshBasicMaterial({
  color: COLORS.lime,
  transparent: true,
  opacity: 0.0, // invisible in render, used for reference only
});
const logoPlane = new THREE.Mesh(logoPlaneGeo, logoPlaneMat);
logoPlane.rotation.x = -Math.PI / 2;
logoPlane.position.set(2.5, 0.01, 0);
scene.add(logoPlane);

// Animation: tree falls from vertical (0) to horizontal (90° toward right)
// We rotate around Z axis. Positive rotation = falls toward negative X? Let's test.
function renderFrame(frameIndex) {
  const progress = frameIndex / (FRAME_COUNT - 1);
  // Ease-out for cinematic fall
  const eased = 1 - Math.pow(1 - progress, 2.5);
  const angle = eased * (Math.PI / 2);
  treeGroup.rotation.z = -angle; // falls toward right (+X)

  // Slight bounce at end
  if (progress > 0.92) {
    const bounce = Math.sin((progress - 0.92) * Math.PI * 8) * 0.015 * (1 - (progress - 0.92) / 0.08);
    treeGroup.rotation.z += bounce;
  }

  renderer.render(scene, camera);

  const gl = renderer.getContext();
  const pixels = new Uint8Array(WIDTH * HEIGHT * 4);
  gl.readPixels(0, 0, WIDTH, HEIGHT, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  // Flip Y for PNG
  const flipped = Buffer.alloc(WIDTH * HEIGHT * 4);
  for (let y = 0; y < HEIGHT; y++) {
    const srcRow = (HEIGHT - 1 - y) * WIDTH * 4;
    const dstRow = y * WIDTH * 4;
    for (let x = 0; x < WIDTH * 4; x++) {
      flipped[dstRow + x] = pixels[srcRow + x];
    }
  }

  // Save as raw RGBA then convert with ffmpeg, or use sharp if available
  // For simplicity, use ffmpeg to convert raw to PNG
  const rawPath = path.join(OUTPUT_DIR, `frame_${String(frameIndex + 1).padStart(3, '0')}.raw`);
  fs.writeFileSync(rawPath, flipped);
}

// Render all frames
console.log(`Rendering ${FRAME_COUNT} frames...`);
for (let i = 0; i < FRAME_COUNT; i++) {
  renderFrame(i);
  if ((i + 1) % 10 === 0) {
    console.log(`Rendered ${i + 1}/${FRAME_COUNT}`);
  }
}

// Convert raw files to PNG using ffmpeg
console.log('Converting to PNG...');
const { execSync } = require('child_process');
for (let i = 0; i < FRAME_COUNT; i++) {
  const num = String(i + 1).padStart(3, '0');
  const rawPath = path.join(OUTPUT_DIR, `frame_${num}.raw`);
  const pngPath = path.join(OUTPUT_DIR, `frame_${num}.png`);
  execSync(`ffmpeg -y -f rawvideo -pixel_format rgba -video_size ${WIDTH}x${HEIGHT} -i "${rawPath}" -frames:v 1 -c:v png "${pngPath}"`, { stdio: 'ignore' });
  fs.unlinkSync(rawPath);
  if ((i + 1) % 20 === 0) {
    console.log(`Converted ${i + 1}/${FRAME_COUNT}`);
  }
}

console.log(`Done. Frames saved to ${OUTPUT_DIR}`);
