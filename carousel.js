(function () {
  var container = document.getElementById('carousel-bg');
  if (!container || typeof THREE === 'undefined') {
    console.warn('LuxArs carousel: THREE not loaded or container missing');
    return;
  }

  var scrollY = 0;
  var targetScrollY = 0;
  var scrollVelocity = 0;
  var materials = [];
  var totalImagesToLoad = 0;
  var loadedImagesCount = 0;
  var meshes = [];
  var preserveOriginalRatios = true;

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  camera.position.z = 1;

  var BAND_HEIGHT = 120;
  var IMAGE_HEIGHT = 100;
  var IMAGE_GAP = 20;
  var CLONE_COUNT = 3;
  var MAX_IMAGE_WIDTH = 300;
  var IMAGES_PER_BAND = [8, 12, 9, 13, 14, 10, 9, 13];

  var ImageBand1 = ["https://images.unsplash.com/photo-1649730837819-e68ff76c1816?h=400","https://images.unsplash.com/photo-1649730845726-90c8921bde03?h=400","https://images.unsplash.com/photo-1648090330632-4c9531c3ea60?h=400","https://images.unsplash.com/photo-1648090328990-773c71909629?h=400","https://images.unsplash.com/photo-1648090330282-286c3b1a6a7f?h=400","https://images.unsplash.com/photo-1648090319891-22ce6cc39bba?h=400","https://images.unsplash.com/photo-1648090324472-041e0203e6ce?h=400","https://images.unsplash.com/photo-1688907487698-b2392019f522?h=400"];
  var ImageBand2 = ["https://images.unsplash.com/photo-1649730837968-c51a42f9396e?w=300","https://images.unsplash.com/photo-1649730842615-2ff02352e535?w=300","https://images.unsplash.com/photo-1649730845183-37de96f3acbf?w=300","https://images.unsplash.com/photo-1649730837657-95502fac2858?w=300","https://images.unsplash.com/photo-1649730842550-a2b4481f6505?w=300","https://images.unsplash.com/photo-1633657321317-f1e83e9b2b57?w=300","https://images.unsplash.com/photo-1648090319885-a90824ccd765?w=300","https://images.unsplash.com/photo-1648090319997-ca10568f8b88?w=300","https://images.unsplash.com/photo-1648090324464-ca18cce37a44?w=300","https://images.unsplash.com/photo-1648090324464-87b5e78ae9f8?w=300","https://images.unsplash.com/photo-1648090325560-6c3e4df8fc21?w=300","https://images.unsplash.com/photo-1648090329516-ee37a5ff060b?w=300"];
  var ImageBand3 = ["https://images.unsplash.com/photo-1648090268311-4f1831fc5600?w=300","https://images.unsplash.com/photo-1648090317695-f0a97182ddfd?w=300","https://images.unsplash.com/photo-1648090317724-5cc66d54cb59?w=300","https://images.unsplash.com/photo-1632054553195-bfd7034fee25?w=300","https://images.unsplash.com/photo-1632054259416-61e1913909f8?w=300","https://images.unsplash.com/photo-1632054259418-def36ea6c2a5?w=300","https://images.unsplash.com/photo-1632054553790-c4f1f534c184?w=300","https://images.unsplash.com/photo-1648090317489-e2a4434b0be2?w=300","https://images.unsplash.com/photo-1632054553871-c2817a775d18?w=300"];
  var ImageBand4 = ["https://images.unsplash.com/photo-1665264998342-e1c485aa9e6c?w=300","https://images.unsplash.com/photo-1688907487591-962299895ad2?w=300","https://images.unsplash.com/photo-1648090322521-57f40a418fc9?w=300","https://images.unsplash.com/photo-1648090317719-a57c907a7284?w=300","https://images.unsplash.com/photo-1648090319998-2763a51e00c9?w=300","https://images.unsplash.com/photo-1630163666316-39db7fd0f2d8?w=300","https://images.unsplash.com/photo-1648090325360-d68298515046?w=300","https://images.unsplash.com/photo-1648090322506-c79522085735?w=300","https://images.unsplash.com/photo-1630636147267-42808cca8243?w=300","https://images.unsplash.com/photo-1688907487492-67541759c0ec?w=300","https://images.unsplash.com/photo-1648090255048-90079d233070?w=300","https://images.unsplash.com/photo-1648090265052-ac09d6212872?w=300","https://images.unsplash.com/photo-1630163666253-d499c23e1be2?w=300"];
  var ImageBand5 = ["https://images.unsplash.com/photo-1648090328043-e75292e328ec?w=300","https://images.unsplash.com/photo-1648090322515-02be75f7d731?w=300","https://images.unsplash.com/photo-1648090317691-5e54b4f49b13?w=300","https://images.unsplash.com/photo-1631932389691-e537af7cb995?w=300","https://images.unsplash.com/photo-1631932389075-4ac0d4bf7394?w=300","https://images.unsplash.com/photo-1688907487001-28bb3592ea31?w=300","https://images.unsplash.com/photo-1688907487499-5109d7d14bfa?w=300","https://images.unsplash.com/photo-1648090327601-36dc97fed197?w=300","https://images.unsplash.com/photo-1648090326716-14e01e43da03?w=300","https://images.unsplash.com/photo-1648090326914-fcf7ad3f5aa1?w=300","https://images.unsplash.com/photo-1631932392715-dfed5d0e9332?w=300","https://images.unsplash.com/photo-1630163664826-16147bbdbb65?w=300","https://images.unsplash.com/photo-1630163670776-0f64ec1acf1d?w=300","https://images.unsplash.com/photo-1545041587-ccd03e26b580?w=300"];
  var ImageBand6 = ["https://images.unsplash.com/photo-1633657324109-d031bd981583?w=300","https://images.unsplash.com/photo-1633657322204-cfbe7f9f803a?w=300","https://images.unsplash.com/photo-1635125293454-695c272749a7?w=300","https://images.unsplash.com/photo-1630163671229-07fdcf23ba71?w=300","https://images.unsplash.com/photo-1597522888503-a8ebde1da97d?w=300","https://images.unsplash.com/photo-1688907487658-56175bfee35a?w=300","https://images.unsplash.com/photo-1651107466227-1a7100432973?w=300","https://images.unsplash.com/photo-1649730845235-050a47af7c33?w=300","https://images.unsplash.com/photo-1648090320060-d4c61f30fb18?w=300","https://images.unsplash.com/photo-1648090319890-62e6ce986438?w=300"];
  var ImageBand7 = ["https://images.unsplash.com/photo-1635989198295-76680f9ce67a?w=300","https://images.unsplash.com/photo-1635301443938-d95a891d46b7?w=300","https://images.unsplash.com/photo-1648090272846-316807cd80c2?w=300","https://images.unsplash.com/photo-1635989193974-102e31f3db9b?w=300","https://images.unsplash.com/photo-1635989194850-9349356f9d3d?w=300","https://images.unsplash.com/photo-1688907487543-43bcab100449?w=300","https://images.unsplash.com/photo-1635989197685-19d50a475348?w=300","https://images.unsplash.com/photo-1633657322446-ed5784d121e4?w=300","https://images.unsplash.com/photo-1553918926-1fbf8e38d53b?w=300"];
  var ImageBand8 = ["https://images.unsplash.com/photo-1688907486206-2f6244413e61?w=300","https://images.unsplash.com/photo-1648090329178-7f3e54ceea9c?w=300","https://images.unsplash.com/photo-1648090328368-93633744e952?w=300","https://images.unsplash.com/photo-1648090317720-d61e2ec5adb4?w=300","https://images.unsplash.com/photo-1648090317938-efbe4e792ba9?w=300","https://images.unsplash.com/photo-1635989197697-5596cc9a9a6c?w=300","https://images.unsplash.com/photo-1632681179698-35ac572f6510?w=300","https://images.unsplash.com/photo-1633657321411-b8fbeb8c6adb?w=300","https://images.unsplash.com/photo-1535378181097-9cf5e853b572?w=300","https://images.unsplash.com/photo-1665264343390-4ebd4a7731d0?w=300","https://images.unsplash.com/photo-1648090319893-1d3a26d80627?w=300","https://images.unsplash.com/photo-1648090319889-73787d9b3f14?w=300","https://images.unsplash.com/photo-1630163664483-9ee845d40a63?w=300"];

  var bandConfigs = [
    { offsetY: -110, speed: 1.0, rotation: 7 * Math.PI / 180, rotationType: "fromLeft", name: "Haut 1", curveAmount: 40.0, curveDirection: 1 },
    { offsetY: -330, speed: 1.3, rotation: 7 * Math.PI / 180, rotationType: "fromCenter", name: "Haut 2", curveAmount: 35.0, curveDirection: 1 },
    { offsetY: -440, speed: 1.6, rotation: 7 * Math.PI / 180, rotationType: "fromLeft", name: "Centre Haut", curveAmount: 40.0, curveDirection: 1 },
    { offsetY: -220, speed: 0.7, rotation: 7 * Math.PI / 180, name: "Centrale", curveAmount: 40.0, curveDirection: 1 },
    { offsetY: 0, speed: 0.4, rotation: 7 * Math.PI / 180, name: "Centre Bas", curveAmount: 40.0, curveDirection: 1 },
    { offsetY: 110, speed: 1.2, rotation: 7 * Math.PI / 180, name: "Bas 1", curveAmount: 40.0, curveDirection: 1 },
    { offsetY: 220, speed: 0.8, rotation: 7 * Math.PI / 180, name: "Bas 2", curveAmount: 40.0, curveDirection: 1 },
    { offsetY: 330, speed: 1.4, rotation: 7 * Math.PI / 180, name: "Tres Bas", curveAmount: 40.0, curveDirection: 1 }
  ];

  function getImageUrlsForBand(bandIndex) {
    switch (bandIndex) {
      case 0: return ImageBand1;
      case 1: return ImageBand2;
      case 2: return ImageBand3;
      case 3: return ImageBand4;
      case 4: return ImageBand5;
      case 5: return ImageBand6;
      case 6: return ImageBand7;
      case 7: return ImageBand8;
      default: return [];
    }
  }

  function calculateImageDimensions(height, ratio) {
    var width = Math.round(height * ratio);
    if (width > MAX_IMAGE_WIDTH) {
      width = MAX_IMAGE_WIDTH;
      height = Math.round(width / ratio);
    }
    return { width: width, height: height, ratio: ratio };
  }

  function formatRatio(ratio) {
    var commonRatios = [
      { value: 1.5, text: '3:2', tolerance: 0.05 },
      { value: 1.333, text: '4:3', tolerance: 0.02 },
      { value: 1.777, text: '16:9', tolerance: 0.02 },
      { value: 1.85, text: '1.85:1', tolerance: 0.02 },
      { value: 2.0, text: '2:1', tolerance: 0.05 },
      { value: 1.0, text: '1:1', tolerance: 0.01 },
      { value: 0.75, text: '3:4', tolerance: 0.02 },
      { value: 0.667, text: '2:3', tolerance: 0.02 }
    ];
    for (var i = 0; i < commonRatios.length; i++) {
      if (Math.abs(ratio - commonRatios[i].value) < commonRatios[i].tolerance) {
        return commonRatios[i].text;
      }
    }
    return ratio.toFixed(2) + ':1';
  }

  function createHorizontalTextureForBand(images, bandName) {
    var sequenceWidth = 0;
    var imagesPerBand = images.length;
    for (var i = 0; i < imagesPerBand; i++) {
      var imageInfo = images[i];
      if (imageInfo && imageInfo.loaded) {
        sequenceWidth += imageInfo.width + IMAGE_GAP;
      }
    }
    sequenceWidth -= IMAGE_GAP;
    var totalWidth = sequenceWidth * CLONE_COUNT;
    var canvas = document.createElement('canvas');
    canvas.width = totalWidth;
    canvas.height = BAND_HEIGHT;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, totalWidth, BAND_HEIGHT);
    var currentX = 0;
    for (var clone = 0; clone < CLONE_COUNT; clone++) {
      for (var i$1 = 0; i$1 < imagesPerBand; i$1++) {
        var imageInfo$1 = images[i$1];
        if (imageInfo$1 && imageInfo$1.loaded && imageInfo$1.img) {
          var imgWidth = imageInfo$1.width;
          var imgHeight = imageInfo$1.height;
          var centeredY = (BAND_HEIGHT - imgHeight) / 2;
          ctx.save();
          ctx.globalAlpha = 0.9;
          ctx.drawImage(imageInfo$1.img, currentX, centeredY, imgWidth, imgHeight);
          if (imageInfo$1.displayRatio) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(imageInfo$1.displayRatio, currentX + imgWidth / 2, centeredY + imgHeight + 12);
          }
          ctx.restore();
          currentX += imgWidth + IMAGE_GAP;
        }
      }
    }
    return { canvas: canvas, totalWidth: totalWidth, sequenceWidth: sequenceWidth, imagesCount: imagesPerBand };
  }

  function loadImagesForBand(bandIndex, imagesCount, callback) {
    var images = [];
    var loaded = 0;
    var imageUrls = getImageUrlsForBand(bandIndex);
    for (var i = 0; i < imagesCount; i++) {
      var img = new Image();
      img.crossOrigin = "anonymous";
      var imageObj = { loaded: false, img: null, width: 0, height: 0, ratio: 0, bandIndex: bandIndex, imageIndex: i };
      images.push(imageObj);
      img.onload = function () {
        var naturalWidth = img.naturalWidth;
        var naturalHeight = img.naturalHeight;
        var originalRatio = naturalWidth / naturalHeight;
        var targetWidth, targetHeight;
        if (preserveOriginalRatios) {
          targetHeight = IMAGE_HEIGHT;
          targetWidth = Math.round(targetHeight * originalRatio);
          if (targetWidth > MAX_IMAGE_WIDTH) {
            targetWidth = MAX_IMAGE_WIDTH;
            targetHeight = Math.round(targetWidth / originalRatio);
          }
          imageObj.ratio = originalRatio;
          imageObj.displayRatio = formatRatio(originalRatio);
        } else {
          var fixedRatio = 1.5;
          targetHeight = IMAGE_HEIGHT;
          targetWidth = Math.round(targetHeight * fixedRatio);
          imageObj.ratio = fixedRatio;
          imageObj.displayRatio = '3:2 (fixe)';
        }
        imageObj.loaded = true;
        imageObj.img = img;
        imageObj.width = targetWidth;
        imageObj.height = targetHeight;
        imageObj.naturalWidth = naturalWidth;
        imageObj.naturalHeight = naturalHeight;
        imageObj.originalRatio = originalRatio;
        loaded++;
        loadedImagesCount++;
        updateLoading();
        if (loaded === imagesCount) {
          callback(images);
        }
      };
      img.onerror = function () {
        createFallbackImageForBand(imageObj, i, bandIndex);
        loaded++;
        loadedImagesCount++;
        updateLoading();
        if (loaded === imagesCount) {
          callback(images);
        }
      };
      if (imageUrls && imageUrls[i]) {
        var url = new URL(imageUrls[i]);
        url.searchParams.set('auto', 'format');
        url.searchParams.set('fit', 'crop');
        img.src = url.toString();
      } else {
        var randomId = Math.floor(Math.random() * 1000);
        img.src = 'https://picsum.photos/id/' + randomId + '/400/300';
      }
    }
    return images;
  }

  function createFallbackImageForBand(imageObj, imgIndex, bandIndex) {
    var fallbackRatios = [1.5, 1.333, 1.777, 1.0, 0.75];
    var ratio = fallbackRatios[Math.floor(Math.random() * fallbackRatios.length)];
    var dimensions = calculateImageDimensions(IMAGE_HEIGHT, ratio);
    var canvas = document.createElement('canvas');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    var ctx = canvas.getContext('2d');
    var bandColors = ['hsl(210, 70%, 60%)', 'hsl(180, 70%, 60%)', 'hsl(150, 70%, 60%)', 'hsl(120, 70%, 60%)', 'hsl(90, 70%, 60%)', 'hsl(60, 70%, 60%)', 'hsl(30, 70%, 60%)', 'hsl(0, 70%, 60%)'];
    var color = bandColors[bandIndex] || 'hsl(0, 0%, 70%)';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var ratioText = formatRatio(ratio);
    ctx.fillText('B' + (bandIndex + 1), dimensions.width / 2, dimensions.height / 2 - 15);
    ctx.fillText('Img ' + (imgIndex + 1), dimensions.width / 2, dimensions.height / 2);
    ctx.fillText(ratioText, dimensions.width / 2, dimensions.height / 2 + 15);
    imageObj.loaded = true;
    imageObj.img = canvas;
    imageObj.width = dimensions.width;
    imageObj.height = dimensions.height;
    imageObj.ratio = ratio;
    imageObj.displayRatio = ratioText;
    imageObj.isFallback = true;
  }

  function updateLoading() {
    var progress = (loadedImagesCount / totalImagesToLoad) * 100;
    var progressFill = document.getElementById('progressFill');
    var loadingText = document.getElementById('loadingText');
    if (progressFill) {
      progressFill.style.width = progress + '%';
    }
    if (loadingText) {
      loadingText.innerHTML = 'Loading... ' + loadedImagesCount + '/' + totalImagesToLoad;
    }
    if (loadedImagesCount >= totalImagesToLoad && progressFill) {
      setTimeout(function () {
        var loadingEl = document.getElementById('loading');
        if (loadingEl) loadingEl.style.display = 'none';
      }, 500);
    }
  }

  function cleanupOldMeshes() {
    meshes.forEach(function (mesh) {
      scene.remove(mesh);
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        if (mesh.material.uniforms && mesh.material.uniforms.uTexture) {
          mesh.material.uniforms.uTexture.value.dispose();
        }
        mesh.material.dispose();
      }
    });
    meshes = [];
    materials = [];
    loadedImagesCount = 0;
  }

  async function recreateAllBands() {
    cleanupOldMeshes();
    loadedImagesCount = 0;
    var loadingEl = document.getElementById('loading');
    if (loadingEl) loadingEl.style.display = 'block';
    updateLoading();
    var bandPromises = [];
    for (var bandIndex = 0; bandIndex < bandConfigs.length; bandIndex++) {
      (function (bi) {
        var config = bandConfigs[bi];
        var imagesCount = IMAGES_PER_BAND[bi];
        var promise = new Promise(function (resolve) {
          loadImagesForBand(bi, imagesCount, function (images) {
            var textureData = createHorizontalTextureForBand(images, config.name);
            var texture = new THREE.Texture(textureData.canvas);
            texture.needsUpdate = true;
            resolve({ bandIndex: bi, config: config, texture: texture, textureData: textureData });
          });
        });
        bandPromises.push(promise);
      })(bandIndex);
    }
    var bandResults = await Promise.all(bandPromises);
    bandResults.forEach(function (result) {
      var bandIndex = result.bandIndex;
      var config = result.config;
      var texture = result.texture;
      var textureData = result.textureData;
      var material = new THREE.ShaderMaterial({
        uniforms: {
          uResolution: { value: new THREE.Vector2() },
          uTexture: { value: texture },
          uTextureWidth: { value: textureData.totalWidth },
          uSequenceWidth: { value: textureData.sequenceWidth },
          uBandHeight: { value: BAND_HEIGHT },
          uScroll: { value: 0 },
          uSpeed: { value: config.speed },
          uOffsetY: { value: config.offsetY },
          uRotation: { value: config.rotation },
          uRotationType: { value: config.rotationType === "fromLeft" ? 1.0 : 0.0 },
          uHasRotation: { value: config.rotation !== 0 ? 1.0 : 0.0 },
          uBandIndex: { value: bandIndex },
          uCurveAmount: { value: config.curveAmount },
          uCurveDirection: { value: config.curveDirection },
          uTime: { value: 0 }
        },
        vertexShader: [
          'varying vec2 vUv;',
          'void main() {',
          '  vUv = uv;',
          '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
          '}'
        ].join('\n'),
        fragmentShader: [
          'precision highp float;',
          'uniform vec2 uResolution;',
          'uniform sampler2D uTexture;',
          'uniform float uTextureWidth;',
          'uniform float uSequenceWidth;',
          'uniform float uBandHeight;',
          'uniform float uScroll;',
          'uniform float uSpeed;',
          'uniform float uOffsetY;',
          'uniform float uRotation;',
          'uniform float uRotationType;',
          'uniform float uHasRotation;',
          'uniform float uBandIndex;',
          'uniform float uCurveAmount;',
          'uniform float uCurveDirection;',
          'uniform float uTime;',
          'varying vec2 vUv;',
          'mat2 rotate2d(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }',
          'void main() {',
          '  vec2 pc = vUv * uResolution;',
          '  vec2 opc = pc;',
          '  float nx = pc.x / uResolution.x;',
          '  float cf = 4.0 * (nx - 0.5) * (nx - 0.5);',
          '  float co = (0.5 - cf) * uCurveAmount * uCurveDirection;',
          '  float bt = (uResolution.y - uBandHeight) * 0.5 + uOffsetY + co;',
          '  float bb = bt + uBandHeight;',
          '  float bcy = (uResolution.y - uBandHeight) * 0.5 + uOffsetY + (uBandHeight * 0.5);',
          '  if (uHasRotation > 0.5) {',
          '    vec2 rc = uRotationType > 0.5 ? vec2(0.0, bcy) : vec2(uResolution.x * 0.5, bcy);',
          '    pc -= rc; pc = rotate2d(uRotation) * pc; pc += rc;',
          '    opc -= rc; opc = rotate2d(uRotation) * opc; opc += rc;',
          '    vec2 rbt = vec2(0.0, bt); vec2 rbb = vec2(0.0, bb);',
          '    rbt -= rc; rbt = rotate2d(uRotation) * rbt; rbt += rc;',
          '    rbb -= rc; rbb = rotate2d(uRotation) * rbb; rbb += rc;',
          '    bt = min(rbt.y, rbb.y); bb = max(rbt.y, rbb.y);',
          '  }',
          '  float margin = 3.0;',
          '  if (pc.y < bt - margin || pc.y > bb + margin) { discard; return; }',
          '  float sp = uScroll * uSpeed;',
          '  float wx = mod(opc.x + sp, uSequenceWidth);',
          '  float ci = 1.0;',
          '  float tx = (wx + (ci * uSequenceWidth)) / uTextureWidth;',
          '  float ty = (pc.y - bt) / (bb - bt);',
          '  if (tx < 0.0 || tx > 1.0 || ty < 0.0 || ty > 1.0) { discard; return; }',
          '  vec4 col = texture2D(uTexture, vec2(tx, ty));',
          '  if (col.a < 0.5) { discard; return; }',
          '  float edge = min(pc.y - bt, bb - pc.y);',
          '  if (edge < margin) { col.a *= smoothstep(0.0, margin, edge); }',
          '  if (col.a < 0.01) { discard; return; }',
          '  float hs = uBandIndex * 0.1;',
          '  col.r *= (1.0 + sin(hs) * 0.02);',
          '  col.g *= (1.0 + sin(hs + 2.094) * 0.02);',
          '  col.b *= (1.0 + sin(hs + 4.188) * 0.02);',
          '  gl_FragColor = col;',
          '}'
        ].join('\n'),
        transparent: true,
        depthTest: false,
        depthWrite: false,
        alphaTest: 0.5
      });
      materials.push(material);
      var geometry = new THREE.PlaneGeometry(2, 2);
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.z = bandIndex * -0.1;
      scene.add(mesh);
      meshes.push(mesh);
    });
  }

  var isDragging = false;
  var lastMouseY = 0;
  var inertia = 0.92;

  var baseScrollY = 0;
  var offsetTargetScrollY = 0;
  var offsetScrollY = 0;

  window.addEventListener('scroll', function () {
    baseScrollY = window.scrollY * 0.5;
  }, { passive: true });

  document.addEventListener('wheel', function (e) {
    offsetTargetScrollY += e.deltaY * 0.3;
    scrollVelocity = e.deltaY * 0.15;
  }, { passive: true });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
      offsetTargetScrollY -= 50;
      scrollVelocity = -8;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
      offsetTargetScrollY += 50;
      scrollVelocity = 8;
    } else if (e.key === ' ') {
      e.preventDefault();
      scrollVelocity = -scrollVelocity * 1.5;
    } else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      recreateAllBands();
    }
  });

  document.addEventListener('mousedown', function (e) {
    isDragging = true;
    lastMouseY = e.clientY;
    scrollVelocity = 0;
    document.body.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    var deltaY = e.clientY - lastMouseY;
    offsetTargetScrollY += deltaY * 2.0;
    lastMouseY = e.clientY;
    scrollVelocity = deltaY * 0.25;
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
    document.body.style.cursor = 'default';
  });

  var lastTouchY = 0;
  document.addEventListener('touchstart', function (e) {
    lastTouchY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchmove', function (e) {
    var touchY = e.touches[0].clientY;
    var deltaY = touchY - lastTouchY;
    offsetTargetScrollY += deltaY * 2.5;
    lastTouchY = touchY;
    scrollVelocity = deltaY * 0.3;
  }, { passive: true });

  function applyInertia() {
    if (!isDragging) {
      offsetTargetScrollY += scrollVelocity;
      scrollVelocity *= inertia;
      if (Math.abs(scrollVelocity) < 0.5) {
        scrollVelocity = 0;
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    applyInertia();
    var smoothing = isDragging ? 0.3 : 0.1;
    offsetScrollY += (offsetTargetScrollY - offsetScrollY) * smoothing;
    scrollY = baseScrollY + offsetScrollY;
    materials.forEach(function (material, index) {
      material.uniforms.uScroll.value = scrollY;
      material.uniforms.uTime.value += 0.016;
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    });
    renderer.render(scene, camera);
  }

  document.addEventListener('dblclick', function () {
    offsetTargetScrollY = 0;
    scrollVelocity = 0;
  });

  renderer.domElement.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    materials.forEach(function (material) {
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    });
  });

  function init() {
    totalImagesToLoad = IMAGES_PER_BAND.reduce(function (sum, count) { return sum + count; }, 0);
    recreateAllBands();
    animate();
  }

  init();
})();
