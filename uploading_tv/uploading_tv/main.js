import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import * as dat from 'dat.gui';

//INITIALIZE THE ACTION
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//SHADOWS
renderer.shadowMap.enabled = true;

//GRID HELPER
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

//AXIS HELPER
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

//AMBIENT LIGHT
// const ambient = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambient);


//POINT LIGHT
// const mainLight = new THREE.PointLight( 0xffffff, 5.0, 28, 2 );
// mainLight.position.set( 10, 20, 0);
// scene.add( mainLight );

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z =  5;

//UPLOADING OBJECT
// const loader = new OBJLoader();

// loader.load('models/tv.obj', function(object) {scene.add(object); object.scale.set(0.2, 0.2, 0.2);},
//                                   function (xhr) {console.log((xhr.loaded / xhr.total * 100) + '% loaded');},
//                                   function(error) { console.log('An error happened');});

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

// Load GLTF model
const loader = new GLTFLoader();
loader.load('./models/Tv_low.gltf', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.scale.set(0.1, 0.1, 0.1);
}, undefined, (error) => {
    console.error(error);
});

//UPLOADING GTLF OBJECT
// const loader = new GLTFLoader();

// loader.load('./models/Tv_low.gltf', function(gltf) { scene.add( gltf.scene);},
//                                     undefined, function (error) { console.error(error);});


//ANIMATION LOOP 
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

//for resposive screen
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});