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

const player1BoundingBox = new THREE.Box3().setFromObject(player1);
const player1Helper = new THREE.Box3Helper(player1BoundingBox, 0xffff00);
scene.add(player1Helper);

//Player 2
const player2Geometry = new THREE.BoxGeometry(3, 1, 1);
const player2Material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const player2 = new THREE.Mesh(player2Geometry, player2Material);
scene.add(player2);

player2.position.y = 3;
player2.position.z = -4.9;
const cube1Dimmensions = 11;

const player2BoundingBox = new THREE.Box3().setFromObject(player2);
const player2Helper = new THREE.Box3Helper(player2BoundingBox, 0xff0000);
scene.add(player2Helper);

//Ball
const ballGeometry = new THREE.SphereGeometry(0.6);
const ballMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const ball = new  THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ball);

ball.position.y = 8;

const ballBoundingBox = new THREE.Box3().setFromObject(ball);
const ballBoundingBoxHelper = new THREE.Box3Helper(ballBoundingBox, 0xA10FF0);
scene.add(ballBoundingBoxHelper);
//BOX Bounding
// const box = new THREE.Box3();
// box.setFromCenterAndSize( new THREE.Vector3( 0, 8, 0 ), new THREE.Vector3( 11, 11, 11 ) );

// const helper = new THREE.Box3Helper( box, 0xffff00 );
// scene.add( helper );

// const corner1 = new THREE.Vector2(-(cube1Dimmensions / 2) + 0.5, 3);
// const corner2 = new THREE.Vector2((cube1Dimmensions / 2) - 0.5, 13);


//=============Surrounding the playing field with the bounding boxes to notice the collisions=============
//========================================================================================================

const cubeBoundingBoxes = {
  left: new THREE.Box3(new THREE.Vector3(-5.7, 2.5, -5.5), new THREE.Vector3(-5.5, 13.5, 5.5)),
  right: new THREE.Box3(new THREE.Vector3(5.5, 2.5, -5.5), new THREE.Vector3(5.7, 13.5, 5.5)),
  top: new THREE.Box3(new THREE.Vector3(-5.5, 13.5, -5.5), new THREE.Vector3(5.5, 13.7, 5.5)),
  bottom: new THREE.Box3(new THREE.Vector3(-5.5, 2.3, -5.5), new THREE.Vector3(5.5, 2.5, 5.5)),
  front: new THREE.Box3(new THREE.Vector3(-5.5, 2.5, 5.5), new THREE.Vector3(5.5, 13.5, 5.7)),
  back: new THREE.Box3(new THREE.Vector3(-5.5, 2.5, -5.7), new THREE.Vector3(5.5, 13.5, -5.5))
}

// Create a Box3Helper to visualize the bounding box
// Usefull for debugging!
const cubeBoundingBoxHelpers = {
  left: new THREE.Box3Helper(cubeBoundingBoxes.left, 0xffff00),
  right: new THREE.Box3Helper(cubeBoundingBoxes.right, 0xffffff),
  top: new THREE.Box3Helper(cubeBoundingBoxes.top, 0xff0000),
  bottom: new THREE.Box3Helper(cubeBoundingBoxes.bottom, 0x00FF00),
  front: new THREE.Box3Helper(cubeBoundingBoxes.front, 0x00FFFF),
  back: new THREE.Box3Helper(cubeBoundingBoxes.back, 0xAA00F0)
}

Object.values(cubeBoundingBoxHelpers).forEach(helper => { scene.add(helper);})

//Determine IF HAS COLLIDED WITH THE WALL
// function isColliding(playerCordinate, boundaryCordinate, playerOffset, angleBracket) {
//   // console.log("Corner1: ", corner1);
//   // console.log("Corner2: ",corner2);
//   // console.log("position of player one x:", playerCordinate + playerOffset);
//   if (angleBracket === '>') {
//     if (Math.abs(playerCordinate + playerOffset) > Math.abs(boundaryCordinate)) {
//       console.log("You tried to go out of bounds");
//       return  (true);
//     }
//   } else {
//     if (Math.abs(playerCordinate + playerOffset) < Math.abs(boundaryCordinate)) {
//       console.log("You tried to go out of bounds");
//       return  (true);
//     }
//   }
//   return (false);

// }

//=============PLAYER MOVEMENT SECTION===================
//=======================================================

function updateBoundingBoxPlayer1() {
  player1BoundingBox.setFromObject(player1);
}

function updateBoundingBoxPlayer2() {
  player2BoundingBox.setFromObject(player2);
}


function moveLeft(playerBoundingBox, player, speed) {
  const predictedBoundingBox = playerBoundingBox.clone();
  
  // Move the predicted bounding box downward
  predictedBoundingBox.translate(new THREE.Vector3(-0.5 * speed, 0, 0)); 
  if (predictedBoundingBox.intersectsBox(cubeBoundingBoxes.left) === true) {
    console.log("COLLISION ON LEFT TRUE");
    player.position.x += 0.5 * speed;
  }
  else { player.position.x -= 0.5 * speed;}
}

function moveRight(playerBoundingBox, player, speed) {
  const predictedBoundingBox = playerBoundingBox.clone();
  
  // Move the predicted bounding box downward
  predictedBoundingBox.translate(new THREE.Vector3(0.5 * speed, 0, 0));
  console.log("COLLISION BEFORE IF ON RIGHT: ",   predictedBoundingBox.translate(new THREE.Vector3(0, 0, 0.5 * speed)));
  if (predictedBoundingBox.intersectsBox(cubeBoundingBoxes.right) === true) {
    console.log("COLLISION ON RIGHT TRUE");
    player.position.x -= 0.5 * speed;
  }
  else { player.position.x += 0.5 * speed;}
}

function moveUp(playerBoundingBox, player, speed) {
  const predictedBoundingBox = playerBoundingBox.clone();
  
  // Move the predicted bounding box downward
  predictedBoundingBox.translate(new THREE.Vector3(0, 0.5 * speed, 0)); 
  if (predictedBoundingBox.intersectsBox(cubeBoundingBoxes.top) === true) {
    console.log("COLLISION TOP TRUE");
    player.position.y -= 0.5 * speed;
  }
  else { player.position.y += 0.5 * speed;}
}

function moveDown(playerBoundingBox, player, speed) {
  const predictedBoundingBox = playerBoundingBox.clone();
  
  // Move the predicted bounding box downward
  predictedBoundingBox.translate(new THREE.Vector3(0, -0.5 * speed, 0)); 
  if (predictedBoundingBox.intersectsBox(cubeBoundingBoxes.bottom) === true) {
    console.log("COLLISION Bottom TRUE");
    player.position.y += 0.5 * speed;
  }
  else { player.position.y -= 0.5 * speed;}
}

const keysPressed = {};

const speedNormal = 1;
const speedDiagnal = speedNormal * 0.3;

document.body.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;
  console.log("KeyPressed: ", keysPressed);
  movePlayer();
});

document.body.addEventListener("keyup", (ev) => {
  keysPressed[ev.key] = false;
});


function player1Movement() {
  if (keysPressed['a'] && keysPressed['w']) {
    moveLeft(player1BoundingBox, player1, speedDiagnal);
    moveUp(player1BoundingBox, player1, speedDiagnal);
  }  else if (keysPressed['s'] && keysPressed['d']) {
    moveRight(player1BoundingBox, player1, speedDiagnal);
    moveDown(player1BoundingBox, player1, speedDiagnal);
  }  else if (keysPressed['w'] && keysPressed['d']) {
    moveRight(player1BoundingBox, player1, speedDiagnal);
    moveUp(player1BoundingBox, player1, speedDiagnal);
  }  else if (keysPressed['a'] && keysPressed['s']) {
    moveLeft(player1BoundingBox, player1, speedDiagnal);
    moveDown(player1BoundingBox, player1, speedDiagnal);
  } else {
    if (keysPressed['a']) {
      moveLeft(player1BoundingBox, player1, speedNormal);
    }
    if (keysPressed['d']) {
      moveRight(player1BoundingBox, player1, speedNormal);
    }
    else if (keysPressed['w']) {
      moveUp(player1BoundingBox, player1, speedNormal);
    }
    if (keysPressed['s']) {
      moveDown(player1BoundingBox, player1, speedNormal);
    }
  }
  updateBoundingBoxPlayer1();
}

function player2Movement() {
  if (keysPressed['j'] && keysPressed['i']) {
    moveLeft(player2BoundingBox, player2, speedDiagnal);
    moveUp(player2BoundingBox, player2, speedDiagnal);
  } else if (keysPressed['k'] && keysPressed['l']) {
    moveRight(player2BoundingBox, player2, speedDiagnal);
    moveDown(player2BoundingBox, player2, speedDiagnal);
  }  else if (keysPressed['i'] && keysPressed['l']) {
    moveRight(player2BoundingBox, player2, speedDiagnal);
    moveUp(player2BoundingBox, player2, speedDiagnal);
  }  else if (keysPressed['j'] && keysPressed['k']) {
    moveLeft(player2BoundingBox, player2, speedDiagnal);
    moveDown(player2BoundingBox, player2, speedDiagnal);
  } else {
    if (keysPressed['j']) {
      moveLeft(player2BoundingBox, player2, speedNormal);
    }
    if (keysPressed['l']) {
      moveRight(player2BoundingBox, player2, speedNormal);
    }
    if (keysPressed['i']) {
      moveUp(player2BoundingBox, player2, speedNormal);
    }
    if (keysPressed['k']) {
      moveDown(player2BoundingBox, player2, speedNormal);
    }
  }
  updateBoundingBoxPlayer2();
}

function movePlayer() {
  player1Movement();
  player2Movement();
};

//=======================================================

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

let direction = new THREE.Vector3(
  Math.random() * 2 - 1, 1, Math.random() * 2 - 1
);
// direction.normalize();

const speedBall = 0.1;
let velocity = direction.multiplyScalar(speedBall);


const predictedBoundingBox = ballBoundingBox.clone();
let player2Score = 0;
let player1Score = 0;
function bouncingBall() {
    // Update ball position
    ball.position.add(velocity);
    // predictedBoundingBox = ballBoundingBox.clone();
    if (cubeBoundingBoxes.back.intersectsBox(ballBoundingBox) === true) {
      player2Score++;
      console.log("BALL HIT THE BACK WALL! Score: ", player2Score);
      document.getElementById('player2_score').innerText = player2Score;
    }

    if (cubeBoundingBoxes.front.intersectsBox(ballBoundingBox) === true) {
      player1Score++;
      console.log("BALL HIT THE FRONT! Score: ", player1Score);
      document.getElementById('player1_score').innerText = player1Score;
    }
    
    // Check for collisions with cube walls and bounce
    if (ball.position.x + 1 > 12 / 2 || ball.position.x - 1 < -12 / 2) {
        velocity.x = -velocity.x;
    }
    if (ball.position.y + 1 > 12 / 2 || ball.position.y - 1 < -12 / 2) {
        velocity.y = -velocity.y;
    }
    if (ball.position.z + 1 > 12 / 2 || ball.position.z - 1 < -12 / 2) {
        velocity.z = -velocity.z;
    }
    ballBoundingBox.setFromObject(ball);
}

function animate() {
  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;
  bouncingBall();
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