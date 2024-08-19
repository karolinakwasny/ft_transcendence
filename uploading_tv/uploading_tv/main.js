import * as THREE from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import * as dat from 'dat.gui';

//INITIALIZE THE ACTION
const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')});

// Create an orthographic camera
const aspect = window.innerWidth / window.innerHeight;
const d = 20;

const camera = new THREE.OrthographicCamera(
  -d * aspect,  // left
  d * aspect,   // right
  d,            // top
  -d,           // bottom
  1,            // near
  1000          // far
);

camera.position.set(20, 20, 20);

// Look slightly left of the origin
camera.lookAt(0, 0, 0);

// Translate the scene slightly to the left
scene.position.x = -30;
scene.position.y = -18;

renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0x1F2135);
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

//SHADOWS
renderer.shadowMap.enabled = true;

//GRID HELPER

// Create a custom material for the grid with opacity
const gridMaterial = new THREE.LineBasicMaterial({
  color: 0xffffff, // Set your desired color
  opacity: 0.02, // Set the desired opacity (0.0 to 1.0)
  transparent: true // Enable transparency
});

const gridHelper = new THREE.GridHelper(40);
gridHelper.material = gridMaterial;
scene.add(gridHelper);

//AXIS HELPER
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

//ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
// camera.position.z =  10;
// camera.position.x = 10;
// camera.position.y = 10;
// controls.target.set(0, 0, 0);
// controls.update();

//AMBIENT LIGHT
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00});
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// Plane that receives shadows
// const planeGeometry = new THREE.PlaneGeometry(100, 100);
// const planeMaterial = new THREE.MeshBasicMaterial({
//   color: 0xffffff,
//   transparent: true, // Enable transparency
//   opacity: 1,      // Adjust opacity
//   side: THREE.DoubleSide, // Show the plane from both sides
// });

// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = - Math.PI / 2; // Rotate the plane to lie flat
// plane.position.y = -0.5;             // Position it on the y=0 plane
// plane.receiveShadow = true;       // Allow the plane to receive shadows
// scene.add(plane);

//UPLOADING OBJECT
// const loader = new OBJLoader();

// loader.load('models/tv.obj', function(object) {scene.add(object); object.scale.set(0.2, 0.2, 0.2);},
//                                   function (xhr) {console.log((xhr.loaded / xhr.total * 100) + '% loaded');},
//                                   function(error) { console.log('An error happened');});

// Lighting
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
// scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 40, 20);
directionalLight.castShadow = true;
scene.add(directionalLight);

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(directionalLightHelper);

let model;

// Load GLTF model
const loader = new GLTFLoader();
loader.load('./models/TV_low.gltf', (gltf) => {
    model = gltf.scene;
    model.scale.set(0.3, 0.3, 0.3);
    model.traverse( function( node ) {

      if ( node.isMesh ) { node.castShadow = true; }

     } );
    scene.add(model);
}, undefined, (error) => {
    console.error(error);
});


// Load GLTF model
// const loader = new GLTFLoader();
// loader.load('./models/TV_low.gltf', (gltf) => {
//     scene.add(gltf.scene);
//     gltf.scene.scale.set(0.3, 0.3, 0.3);
// }, undefined, (error) => {
//     console.error(error);
// });

//UPLOADING GTLF OBJECT
// const loader = new GLTFLoader();

// loader.load('./models/Tv_low.gltf', function(gltf) { scene.add( gltf.scene);},
//                                     undefined, function (error) { console.error(error);});


//ANIMATION LOOP 
function animate() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


//for resposive screen
window.addEventListener('resize', function() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.left = -d * aspect;
  camera.right = d * aspect;
  camera.top = d;
  camera.bottom = -d;
  camera.updateProjectionMatrix();
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});