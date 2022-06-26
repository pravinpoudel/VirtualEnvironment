var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// camera.lookAt(new THREE.Vector3(0, 0, 0));
camera.position.set(50, 50, 60);
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(black);

var planeGeometry = new THREE.PlaneGeometry(70, 30, 1, 1);
var planeMaterial = new THREE.MeshBasicMaterial({ color: green });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

//axis will be setup at center so to see this camera should be centered at origin
// you wont see the z axis at start because z axis is coming right out of the screen
// if you change camera position to (50, 50, 50), you will see all three axis
var axes = new THREE.AxesHelper(30);
scene.add(axes);

var spotLight = new THREE.SpotLight(orange);
spotLight.position.set(-40, 6, 4);
scene.add(spotLight);

// fog effect
if (fogEffect) {
  scene.fog = new THREE.Fog(0xffffff, 5, 120); //COLOR, MINIMUM DISTANCE TO START FOG AND MAX DISTANCE FOR FOG TO END
}

const screeenDiv = document.getElementById("animation-screen");
screeenDiv.appendChild(renderer.domElement);
renderScene();

function cameraUpdate() {
  camera.position.x = cameraRadius * Math.cos(step);
  camera.position.z = cameraRadius * Math.sin(step);
  camera.lookAt(scene.position);
}
function renderScene() {
  //make update to position, rotation of objects in the scene
  step += 0.05;
  cameraUpdate();
  requestAnimationFrame(renderScene);
  renderer.render(scene, camera);
}
