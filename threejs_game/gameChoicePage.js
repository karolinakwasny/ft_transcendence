import * as THREE from 'three';
import './index.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#computerModel'), alpha: true});

const	computerModelCanvas = document.getElementById('computerModel');
const aspect = computerModelCanvas.clientWidth / computerModelCanvas.clientHeight;



// Look slightly left of the origin
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.set(20, 10, 20);
camera.lookAt(0, -7, 0); // Look at the center of the field

renderer.setSize(computerModelCanvas.clientWidth , computerModelCanvas.clientHeight);
//SHADOWS
renderer.shadowMap.enabled = true;

//AMBIENT LIGHT
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 40, 20);
directionalLight.castShadow = true;
scene.add(directionalLight);

let model;
let containmentCube;
// Load GLTF model
const loader = new GLTFLoader();
loader.load('./models/TV_low.gltf', (gltf) => {
	model = gltf.scene;
    model.scale.set(0.42, 0.42, 0.42);
    model.traverse( function( node ) {
		if ( node.isMesh ) { node.castShadow = true; }
		
    });
	// Create the cube (container) as a BoxGeometry
	const geometry = new THREE.BoxGeometry(34, 34, 34); // Size of the cube (you can adjust this)
	const material = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0}); // Green color with wireframe
	containmentCube = new THREE.Mesh(geometry, material);
	containmentCube.position.set(0, 0, 0);
	containmentCube.add(model);
	// Set containmentCube to be invisible
	containmentCube.visible = true;
	// Add the cube to the scene
	scene.add(containmentCube);

	// Compute the bounding box of the model
    const box = new THREE.Box3().setFromObject(model);

    // Get the center of the bounding box
    const center = box.getCenter(new THREE.Vector3());

    // Position the model so its center is at the center of the cube
    model.position.sub(center);  // Offset the model by the bounding box's center
	

}, undefined, (error) => {
    console.error(error);
});

function animate() {
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	    if (containmentCube) {
			containmentCube.rotation.y += 0.01;
        // model.rotation.y += 0.01; // Rotate the model on the Y-axis
    }
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