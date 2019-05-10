
// import { DayNight } from './dome.js';

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// var onRenderFcts = [];
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 3000);
// camera.position.z = 3;
// //////////////////////////////////////////////////////////////////////////////////
// //		comment								//
// //////////////////////////////////////////////////////////////////////////////////
// var sunAngle = -1 / 6 * Math.PI * 2;
// var sunAngle = -3 / 6 * Math.PI * 2;
// onRenderFcts.push(function (delta, now) {
//   var dayDuration = 10	// nb seconds for a full day cycle
//   sunAngle += delta / dayDuration * Math.PI * 2
// })

// //////////////////////////////////////////////////////////////////////////////////
// //		starfield							//
// //////////////////////////////////////////////////////////////////////////////////

// var starField = new DayNight.StarField()
// scene.add(starField.object3d)
// onRenderFcts.push(function (delta, now) {
//   starField.update(sunAngle)
// })

// //////////////////////////////////////////////////////////////////////////////////
// //		skydom								//
// //////////////////////////////////////////////////////////////////////////////////

// var skydom = new DayNight.Skydom()
// scene.add(skydom.object3d)
// onRenderFcts.push(function (delta, now) {
//   skydom.update(sunAngle)
// })

// //////////////////////////////////////////////////////////////////////////////////
// //		comment								//
// //////////////////////////////////////////////////////////////////////////////////

// var geometry = new THREE.TorusKnotGeometry(0.5 - 0.15, 0.15)
// var material = new THREE.MeshPhongMaterial({
//   shading: THREE.SmoothShading,
// });
// var mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)
// onRenderFcts.push(function (delta) {
//   mesh.rotateY(delta * Math.PI * 2 * 0.2)
//   mesh.rotateX(delta * Math.PI * 2 * 0.1)
// })
// //////////////////////////////////////////////////////////////////////////////////
// //		Camera Controls							//
// //////////////////////////////////////////////////////////////////////////////////
// var mouse = { x: 0, y: 0 }
// document.addEventListener('mousemove', function (event) {
//   mouse.x = (event.clientX / window.innerWidth) - 0.5
//   mouse.y = (event.clientY / window.innerHeight) - 0.5
// }, false)
// onRenderFcts.push(function (delta, now) {
//   camera.position.x += (mouse.x * 5 - camera.position.x) * (delta * 3)
//   camera.position.y += (mouse.y * 5 - camera.position.y) * (delta * 3)
//   camera.lookAt(scene.position)
// })
// //////////////////////////////////////////////////////////////////////////////////
// //		render the scene						//
// //////////////////////////////////////////////////////////////////////////////////
// onRenderFcts.push(function () {
//   renderer.render(scene, camera);
// })

// //////////////////////////////////////////////////////////////////////////////////
// //		loop runner							//
// //////////////////////////////////////////////////////////////////////////////////
// var lastTimeMsec = null
// requestAnimationFrame(function animate(nowMsec) {
//   // keep looping
//   requestAnimationFrame(animate);
//   // measure time
//   lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
//   var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
//   lastTimeMsec = nowMsec
//   // call each update function
//   onRenderFcts.forEach(function (onRenderFct) {
//     onRenderFct(deltaMsec / 1000, nowMsec / 1000)
//   })
// })


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

// // SCENE SETUP
// var scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);



// var controls = new TrackballControls(camera);
// controls.target.set(0, 0, 0);
// controls.rotateSpeed = 2;

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);


// var geometry = new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
// var material = new THREE.MeshNormalMaterial();
// var sphere = new THREE.Mesh(geometry, material);
// sphere.position.set(0, 0, 0);
// scene.add(sphere);

// var render = function () {
//   requestAnimationFrame(render);
//   controls.update();
//   renderer.render(scene, camera);
// };

// render();
// var skyGeo = new THREE.SphereGeometry(100000, 25, 25);

// var loader = new THREE.TextureLoader(),
//   texture = loader.load("../data/galaxy_starfield.jpg");

// var material = new THREE.MeshPhongMaterial({
//   map: texture,
// });
// var sky = new THREE.Mesh(skyGeo, material);
// sky.material.side = THREE.BackSide;
// console.log(sky)
// scene.add(sky);