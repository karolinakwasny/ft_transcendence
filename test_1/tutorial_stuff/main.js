import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import * as dat from 'dat.gui';

// import { texture } from 'three/webgpu';
import monkey from './img/monkey.jpg';
import monkeya from './img/monkeya.jpg';

const renderer = new  THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement );

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
camera.position.set(10, 10, 10);
orbit.update();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

const cube = new THREE.Mesh( geometry, material);
scene.add(cube);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x0000FF, wireframe: false});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);


//OBJ LOADING

// const loader = new OBJLoader();

// loader.load('./models/tv.obj', function (object) {scene.add(object);},
//                                 function(xhr) {console.log((xhr.loaded / xhr.total * 100) + '% loaded');},
//                                 function(error) { console.log('An error happened');});

/* DIRECTIONAL LIGHT EXAMPLE*/
/* =========================*/

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper);


/* SPOT LIGHT EXAMPLE */
/* ================== */

const spotLight = new THREE.SpotLight(0xFFFFFF, 100);
scene.add(spotLight);
spotLight.position.set(-20, 20, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

//scene.fog = new THREE.Fog(0xFFFFFF, 0, 200);
// scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

/*SETTING COLOR TO THE SCENE*/
// renderer.setClearColor(0xFFEA00);

const textureLoader = new THREE.TextureLoader();
scene.background = textureLoader.load(monkey);
// const cubeTextureLoader = new THREE.CubeTextureLoader();

//have to be same width and height !!!! both textures
// scene.background = cubeTextureLoader.load([monkey, monkey, monkeya, monkeya, monkeya, monkeya]);

const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshBasicMaterial({ map:textureLoader.load(monkeya)});
const box2 = new THREE.Mesh(box2Geometry, box2Material);
scene.add(box2);
box2.position.set(0, 15, 10);

const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const plane2Material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true});
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);

scene.add(plane2);

plane2.position.set(10, 10, 15);

plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
const lastPointZ = plane2.geometry.attributes.position.array.length -1;

const gui = new dat.GUI();
const options = {
  sphereColor: '#ffea00', wireframe: false, speed: 0.01,
  angle: 0.2, penumbra: 0, intensity: 100
};

gui.addColor(options, 'sphereColor').onChange(function(e){ sphere.material.color.set(e)});
gui.add(options, 'wireframe').onChange(function(e) { sphere.material.wireframe =e; });
gui.add(options, 'speed', 0, 0.1);
gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 100);

let step = 0 ;

const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function(e) {
  mousePosition.x = (e.clientX /this.window.innerWidth) * 2 - 1;
  mousePosition.y = - (e.clientY / this.window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

const sphereId = sphere.id;
box2.name = 'theBox';

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));
  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  sLightHelper.update();

  rayCaster.setFromCamera(mousePosition, camera);
  const intersects = rayCaster.intersectObjects(scene.children);
  console.log(intersects);

  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.id === sphereId) {
      intersects[i].object.material.color.set(0xFF0000);
    }

    if (intersects[i].object.name === box2.name) {
      intersects[i].object.rotation.x += 0.01;
      intersects[i].object.rotation.y += 0.01;
    }
  }

  plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
  plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
  plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
  plane2.geometry.attributes.position.array[lastPointZ] = 10 * Math.random();
  plane2.geometry.attributes.position.needsUpdate = true;


  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});