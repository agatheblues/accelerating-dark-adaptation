var camera, scene, renderer, controls;

var initLights = function () {

  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 0, 0);
  scene.add(light);
  var light = new THREE.AmbientLight(0xffffff);
  scene.add(light);
};


var init = function () {
  renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 0;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  controls = new THREE.TrackballControls(camera);
  controls.target.set(-50, 10, 0);
  controls.rotateSpeed = 2;

  document.body.appendChild(renderer.domElement);

  var loader = new THREE.TextureLoader(),
    texture = loader.load("../data/galaxy_starfield.png");
  var geometry = new THREE.SphereGeometry(300, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: texture
  });
  var sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(0, 0, 0);
  sphere.material.side = THREE.BackSide;
  scene.add(sphere);

  initLights();
};

var render = function () {
  renderer.render(scene, camera);
};

var animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  render();
};


init();
animate()