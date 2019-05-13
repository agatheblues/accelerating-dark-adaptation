
// parameters to ensure the model is georeferenced correctly on the map
var modelOrigin = [4.892891, 52.370088];
var modelAltitude = 0;
var modelRotate = [Math.PI / 2, 0, 0];
var modelScale = 5.41843220338983e-8;

// transformation parameters to position, rotate and scale the 3D model onto the map
var modelTransform = {
  translateX: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).x,
  translateY: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).y,
  translateZ: mapboxgl.MercatorCoordinate.fromLngLat(modelOrigin, modelAltitude).z,
  rotateX: modelRotate[0],
  rotateY: modelRotate[1],
  rotateZ: modelRotate[2],
  scale: modelScale
};

export const customLayer = {
  id: '3d-model',
  type: 'custom',
  renderingMode: '3d',
  onAdd: function (map, gl) {
    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();

    // create two three.js lights to illuminate the model
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0, 0).normalize();
    this.scene.add(directionalLight);

    var directionalLight2 = new THREE.AmbientLight(0xffffff);
    directionalLight2.position.set(4.892891, 52.370088, 0).normalize();
    this.scene.add(directionalLight2);

    var loader = new THREE.TextureLoader(),
      texture = loader.load("../data/galaxy_starfield.png");
    var geometry = new THREE.SphereGeometry(8000, 500, 500, 0, 2 * Math.PI, -0.5 * Math.PI, 0.5 * Math.PI);
    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: texture
    });
    var sphere = new THREE.Mesh(geometry, material);
    sphere.material.side = THREE.DoubleSide;
    this.scene.add(sphere);

    this.map = map;

    // use the Mapbox GL JS map canvas for three.js
    this.renderer = new THREE.WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl
    });

    this.renderer.autoClear = false;
  },
  render: function (gl, matrix) {
    var rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
    var rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
    var rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);

    var m = new THREE.Matrix4().fromArray(matrix);
    var l = new THREE.Matrix4().makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ)
      .scale(new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
      .multiply(rotationX)
      .multiply(rotationY)
      .multiply(rotationZ);

    this.camera.projectionMatrix.elements = matrix;
    this.camera.projectionMatrix = m.multiply(l);

    this.renderer.state.reset();
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();
  }
};