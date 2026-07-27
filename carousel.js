/* ============================================================
   LUXARS — THREE.JS BACKGROUND CAROUSEL
   Adapted from &Toc by ol-ivier (CodePen)
   ============================================================ */

(function () {
  const container = document.getElementById('carousel-bg');
  if (!container || typeof THREE === 'undefined') {
    console.warn('LuxArs carousel: THREE not loaded or container missing');
    return;
  }
  console.log('LuxArs carousel: initializing');

  let scrollY = 0;
  let targetScrollY = 0;
  let materials = [];
  let meshes = [];

  const BAND_HEIGHT = 120;
  const IMAGE_HEIGHT = 100;
  const IMAGE_GAP = 20;
  const CLONE_COUNT = 3;
  const MAX_IMAGE_WIDTH = 300;
  const TOTAL_BANDS = 5;
  const IMAGES_PER_BAND = [8, 10, 9, 8, 7];

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight * 3);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '300%';
  container.appendChild(renderer.domElement);
  camera.position.z = 1;

  const imageSets = [
    [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300',
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=300',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=300',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300'
    ],
    [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=300',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=300',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=300',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=300',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=300'
    ],
    [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=300',
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=300',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'
    ],
    [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=300',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=300',
      'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=300',
      'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=300',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300'
    ],
    [
      'https://images.unsplash.com/photo-1470071459604-7b8ec44ffd5a?w=300',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300',
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=300',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300'
    ]
  ];

  const bandConfigs = [
    { offsetY: -100, speed: 0.8, rotation: 5 * Math.PI / 180, rotationType: 'fromLeft', curveAmount: 30, curveDirection: 1 },
    { offsetY: -280, speed: 1.1, rotation: 5 * Math.PI / 180, rotationType: 'fromCenter', curveAmount: 28, curveDirection: 1 },
    { offsetY: -440, speed: 1.4, rotation: 4 * Math.PI / 180, rotationType: 'fromLeft', curveAmount: 30, curveDirection: 1 },
    { offsetY: -180, speed: 0.5, rotation: 5 * Math.PI / 180, rotationType: 'fromCenter', curveAmount: 28, curveDirection: 1 },
    { offsetY: 0, speed: 0.3, rotation: 4 * Math.PI / 180, rotationType: 'fromLeft', curveAmount: 30, curveDirection: 1 }
  ];

  let totalImages = IMAGES_PER_BAND.reduce((a, b) => a + b, 0);
  let loadedCount = 0;

  function makeGradientTexture(w, h, c1, c2) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, c1);
    g.addColorStop(1, c2);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    return c;
  }

  function loadImages(bandIndex, count, cb) {
    const images = [];
    let loaded = 0;
    const urls = imageSets[bandIndex] || [];
    for (let i = 0; i < count; i++) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      const obj = { loaded: false, img: null, width: 0, height: 0 };
      images.push(obj);
      img.onload = function () {
        const r = img.naturalWidth / img.naturalHeight;
        let tw = IMAGE_HEIGHT * r;
        let th = IMAGE_HEIGHT;
        if (tw > MAX_IMAGE_WIDTH) { tw = MAX_IMAGE_WIDTH; th = Math.round(tw / r); }
        obj.loaded = true; obj.img = img; obj.width = tw; obj.height = th;
        loaded++; loadedCount++;
        if (loaded === count) cb(images);
      };
      img.onerror = function () {
        const fallback = makeGradientTexture(200, 130, '#1a1a2e', '#16213e');
        obj.loaded = true; obj.img = fallback; obj.width = 200; obj.height = 130;
        loaded++; loadedCount++;
        if (loaded === count) cb(images);
      };
      img.src = urls[i] || `https://picsum.photos/seed/${bandIndex}-${i}/300/200`;
    }
    return images;
  }

  function buildTexture(images) {
    let seqW = 0;
    images.forEach(img => { if (img.loaded) seqW += img.width + IMAGE_GAP; });
    seqW -= IMAGE_GAP;
    const totalW = seqW * CLONE_COUNT;
    const canvas = document.createElement('canvas');
    canvas.width = totalW;
    canvas.height = BAND_HEIGHT;
    const ctx = canvas.getContext('2d');
    let cx = 0;
    for (let c = 0; c < CLONE_COUNT; c++) {
      images.forEach(img => {
        if (img.loaded && img.img) {
          const y = (BAND_HEIGHT - img.height) / 2;
          ctx.drawImage(img.img, cx, y, img.width, img.height);
          cx += img.width + IMAGE_GAP;
        }
      });
    }
    return { canvas, totalW, seqW };
  }

  async function buildBands() {
    loadedCount = 0;
    const promises = [];
    for (let bi = 0; bi < TOTAL_BANDS; bi++) {
      promises.push(new Promise(resolve => {
        loadImages(bi, IMAGES_PER_BAND[bi], (images) => {
          const td = buildTexture(images);
          const tex = new THREE.Texture(td.canvas);
          tex.needsUpdate = true;
          resolve({ bi, config: bandConfigs[bi], tex, td });
        });
      }));
    }
    const results = await Promise.all(promises);
    results.forEach(r => {
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uResolution: { value: new THREE.Vector2() },
          uTexture: { value: r.tex },
          uTextureWidth: { value: r.td.totalW },
          uSequenceWidth: { value: r.td.seqW },
          uBandHeight: { value: BAND_HEIGHT },
          uScroll: { value: 0 },
          uSpeed: { value: r.config.speed },
          uOffsetY: { value: r.config.offsetY },
          uRotation: { value: r.config.rotation },
          uRotationType: { value: r.config.rotationType === 'fromLeft' ? 1.0 : 0.0 },
          uHasRotation: { value: r.config.rotation !== 0 ? 1.0 : 0.0 },
          uBandIndex: { value: r.bi },
          uCurveAmount: { value: r.config.curveAmount },
          uCurveDirection: { value: r.config.curveDirection },
          uTime: { value: 0 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: `
          precision highp float;
          uniform vec2 uResolution;
          uniform sampler2D uTexture;
          uniform float uTextureWidth;
          uniform float uSequenceWidth;
          uniform float uBandHeight;
          uniform float uScroll;
          uniform float uSpeed;
          uniform float uOffsetY;
          uniform float uRotation;
          uniform float uRotationType;
          uniform float uHasRotation;
          uniform float uBandIndex;
          uniform float uCurveAmount;
          uniform float uCurveDirection;
          varying vec2 vUv;
          mat2 rotate2d(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
          void main() {
            vec2 pc = vUv * uResolution;
            float nx = pc.x / uResolution.x;
            float cf = 4.0 * (nx - 0.5) * (nx - 0.5);
            float co = (0.5 - cf) * uCurveAmount * uCurveDirection;
            float bt = (uResolution.y - uBandHeight) * 0.5 + uOffsetY + co;
            float bb = bt + uBandHeight;
            float bcy = (uResolution.y - uBandHeight) * 0.5 + uOffsetY + (uBandHeight * 0.5);
            if (uHasRotation > 0.5) {
              vec2 rc = uRotationType > 0.5 ? vec2(0.0, bcy) : vec2(uResolution.x * 0.5, bcy);
              pc -= rc; pc = rotate2d(uRotation) * pc; pc += rc;
            }
            if (pc.y < bt - 2.0 || pc.y > bb + 2.0) { discard; return; }
            float sp = uScroll * uSpeed;
            float wx = mod(pc.x + sp, uSequenceWidth);
            float tx = (wx + uSequenceWidth) / uTextureWidth;
            float ty = (pc.y - bt) / (bb - bt);
            if (tx < 0.0 || tx > 1.0 || ty < 0.0 || ty > 1.0) { discard; return; }
            vec4 col = texture2D(uTexture, vec2(tx, ty));
            if (col.a < 0.3) { discard; return; }
            col.rgb *= 0.6;
            gl_FragColor = col;
          }
        `,
        transparent: true,
        depthTest: false,
        depthWrite: false
      });
      materials.push(mat);
      const geo = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.z = r.bi * -0.1;
      scene.add(mesh);
      meshes.push(mesh);
    });
  }

  // Scroll from page
  let ticking = false;
  const BASE_OPACITY = 0.08;
  const MAX_OPACITY = 0.25;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        targetScrollY = window.scrollY * 0.5;
        // Fade in carousel after hero section (~100vh)
        const heroEnd = window.innerHeight;
        const progress = Math.min(1, Math.max(0, (window.scrollY - heroEnd * 0.3) / (heroEnd * 0.7)));
        container.style.opacity = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * progress;
        ticking = false;
      });
      ticking = true;
    }
  });

  function animate() {
    requestAnimationFrame(animate);
    scrollY += (targetScrollY - scrollY) * 0.08;
    const h = window.innerHeight;
    materials.forEach((mat, i) => {
      mat.uniforms.uScroll.value = scrollY;
      mat.uniforms.uTime.value += 0.016;
      mat.uniforms.uResolution.value.set(window.innerWidth, h * 3);
    });
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight * 3);
    materials.forEach(m => m.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight * 3));
  });

  buildBands();
  animate();
})();
