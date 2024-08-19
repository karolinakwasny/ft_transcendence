import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'



//GUI
const gui = new dat.GUI();

//STARTING THREEJS
const scene = new THREE.Scene();

//I want the isometric view
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

camera.lookAt(0, 0, 0);

//Rendering
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const cube1Geometry = new THREE.BoxGeometry(1, 1, 1);
const cube1Material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube1 = new THREE.Mesh(cube1Geometry, cube1Material);
scene.add(cube1);

const cube2Geometry = new THREE.BoxGeometry(11, 11, 11);
const cube2Material = new THREE.MeshBasicMaterial({color: 0x0000FF, wireframe: true});
const cube2 = new THREE.Mesh(cube2Geometry, cube2Material);
scene.add(cube2);

cube2.position.y = 8;

//Player 1
const player1Geometry = new THREE.BoxGeometry(3, 1, 1);
const player1Material = new THREE.MeshBasicMaterial({color: 0xff0000});
const player1 = new THREE.Mesh(player1Geometry, player1Material);
scene.add(player1);

player1.position.y = 3;
player1.position.z = 4.9;
//Player 2
const player2Geometry = new THREE.BoxGeometry(3, 1, 1);
const player2Material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const player2 = new THREE.Mesh(player2Geometry, player2Material);
scene.add(player2);

player2.position.y = 3;
player2.position.z = -4.9;

//KEYS
//Listen to key presses
document.body.addEventListener("keydown", (ev) => {
  console.log(ev.key);
  if (ev.key === 'a') {
    player1.position.x -= 0.5;
  }
  if (ev.key === 'd') {
    player1.position.x += 0.5;
  }
  if (ev.key === 'w') {
    player1.position.y += 0.5;
  }
  if (ev.key === 's') {
    player1.position.y -= 0.5;
  }

  if (ev.key === 'ArrowLeft') {
    player2.position.x -= 0.5;
  }
  if (ev.key === 'ArrowRight') {
    player2.position.x += 0.5;
  }
  if (ev.key === 'ArrowUp') {
    player2.position.y += 0.5;
  }
  if (ev.key === 'ArrowDown') {
    player2.position.y -= 0.5;
  }
} );

//Control panel
const options = {
  cube2Color: '#0000FF', wireframe: true
};

gui.addColor(options, 'cube2Color').onChange(function(e){ cube2.material.color.set(e)});
gui.add(options, 'wireframe').onChange(function(e) { cube2.material.wireframe =e; });

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);
const axisHelper = new THREE.AxesHelper(5);
scene.add(axisHelper);

function animate() {
  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


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