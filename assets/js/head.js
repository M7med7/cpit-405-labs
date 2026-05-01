(function () {
  'use strict';

  var container = document.getElementById('head-canvas');
  if (!container) return;

  var canvas = container;

  var scene = new THREE.Scene();
  // Adjust camera to fit the head
  var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = window.innerWidth < 768 ? 6 : 4;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  
  // Green accent light
  var greenLight = new THREE.PointLight(0x00ff41, 1.5, 10);
  greenLight.position.set(0, 0, 2);
  scene.add(greenLight);

  var headGroup = new THREE.Group();
  scene.add(headGroup);

  // Group to offset the model within the rotation group
  var modelContainer = new THREE.Group();
  headGroup.add(modelContainer);

  var loader = new THREE.GLTFLoader();
  loader.load('assets/ai-head/base_basic_pbr.glb', function (gltf) {
    var model = gltf.scene;
    
    // Try to match the holographic/digital look
    model.traverse((child) => {
      if (child.isMesh) {
        // You can uncomment the below to enforce a wireframe look if the model isn't textured nicely
        /*
        child.material = new THREE.MeshStandardMaterial({
           color: 0x051020,
           emissive: 0x001133,
           wireframe: true,
           transparent: true,
           opacity: 0.8
        });
        */
       // Add a slight green emissive tint to existing materials
       if(child.material) {
         child.material.emissive = new THREE.Color(0x001a05);
         child.material.emissiveIntensity = 0.3;
       }
      }
    });

    // Automatic scaling and centering
    var box = new THREE.Box3().setFromObject(model);
    var center = box.getCenter(new THREE.Vector3());
    var size = box.getSize(new THREE.Vector3());
    
    var maxDim = Math.max(size.x, size.y, size.z);
    var desiredSize = 1.8; // Made even smaller as requested
    var scale = desiredSize / maxDim;
    
    model.scale.set(scale, scale, scale);
    model.position.sub(center.multiplyScalar(scale));
    
    modelContainer.add(model);
    
    // Move the container slightly down for better framing
    headGroup.position.y = -0.5;

  }, undefined, function (error) {
    console.error('Error loading GLB model:', error);
  });

  // Mouse Tracking
  var mouseX = 0;
  var mouseY = 0;
  var targetX = 0;
  var targetY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', function(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
  }, { passive: true });
  
  document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 0) {
      mouseX = (event.touches[0].clientX - windowHalfX);
      mouseY = (event.touches[0].clientY - windowHalfY);
    }
  }, { passive: true });

  window.addEventListener('resize', function() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.position.z = window.innerWidth < 768 ? 6 : 4;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, false);

  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    
    var delta = clock.getDelta();

    // Target rotation based on mouse
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    if (headGroup) {
      // Smooth interpolation towards target rotation
      headGroup.rotation.y += 0.05 * (targetX - headGroup.rotation.y);
      headGroup.rotation.x += 0.05 * (targetY - headGroup.rotation.x);
      
      // Floating animation
      headGroup.position.y = -0.5 + Math.sin(clock.elapsedTime * 1.5) * 0.05;
    }

    renderer.render(scene, camera);
  }

  animate();

})();
