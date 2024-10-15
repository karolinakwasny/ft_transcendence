import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

//TASKS
//DISABLE 3rd dimension and 3rd dimension controls

//Takeout isometric view to normal camera
//Connect both player scores

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


////////////////////////////NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

let score1 = 0;
let score2 = 0;

let textMesh1, textMesh2;
let loadedFont = null; // Variable to store the loaded font
const loader = new FontLoader();

// Load the font once and store it in the variable
loader.load("./fonts/Poppins_Bold.json", function (font) {
    loadedFont = font;  // Store the loaded font

    // Initial display of score
    createText(score1, 1);
	createText(score2, 2);
});

// Function to create the text and update the scene
function createText(score, player) {
	let currentTextMesh = player === 1 ? textMesh1 : textMesh2;

	if (currentTextMesh) {
		scene.remove(currentTextMesh);
	}

    // Check if the font is loaded before creating the text geometry
    if (loadedFont) {
        const tGeometry = new TextGeometry(score.toString(), {
            font: loadedFont,  // Use the stored font
            size: 6,
            depth: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: 0,
            bevelSegments: 0
        });

        // Create a material for the text
        const material = new THREE.MeshBasicMaterial({ color: 0x2E0E0E});

        // Create a mesh with the geometry and material
        currentTextMesh = new THREE.Mesh(tGeometry, material);
		currentTextMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(90));
        // Position the textMesh in the scene (adjust if needed)
		if (player === 1) {
			currentTextMesh.position.set(-FIELD_WIDTH/2 - 3, 1, (FIELD_LENGTH/2)/2); // Adjust the position
			textMesh1 = currentTextMesh;
		} else if (player === 2) {
			currentTextMesh.position.set(-FIELD_WIDTH/2 - 3, 1, -(FIELD_LENGTH/2)/2); // Adjust the position
			textMesh2 = currentTextMesh;
		}

        scene.add(currentTextMesh);
    }
}

// Function to update the score
function updateScore(newScore, player) {
    // Check if font is loaded before updating the score
    if (loadedFont) {
        createText(newScore, player); // Update the text with the new score
    }
}

//Game start
var	gameStart = false;

//z direction x direction and speed
var ballDirZ = 1, ballDirX = 1, ballSpeed = 0.0008;
// paddle variables
var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirX = 0, paddle2DirX = 0, paddleSpeed = 3;
var paddle1DirY = 0, paddle2DirY = 0;

let player2Score = 0;
let player1Score = 0;
let canScorePlayer1 = true;
let canScorePlayer2 = true;

var WIDTH = 700,
// HEIGHT = 500,
// VIEW_ANGLE = 45,
// ASPECT = WIDTH / HEIGHT,
// NEAR = 0.1,
// FAR = 10000,
FIELD_WIDTH = 30,
FIELD_LENGTH = 42,
FIELD_HEIGHT = 10,
BALL_RADIUS = 0.8,
PLAYER_WIDTH = 4,
PLAYER_HEIGHT = 1,
OUTER_WALL_HEIGHT = 0.8,
BALL_SPEED = 2,
BALL_MOVE = true


//Player 1
const	player1Geometry = new THREE.BoxGeometry(PLAYER_WIDTH, PLAYER_HEIGHT, 1);
const	player1Material = new THREE.MeshBasicMaterial({color: 0xff0000});
const	player1 = new THREE.Mesh(player1Geometry, player1Material);
scene.add(player1);

player1.position.z = FIELD_LENGTH/2 -1.5;
player1.position.y = 1.6;


//Bounding Box Player1
const	player1BBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());

const player1BBoxHelper = new THREE.BoxHelper(player1, 0xffff00); // Yellow wireframe color
scene.add(player1BBoxHelper);

player1BBox.setFromObject(player1);
console.log(player1BBox);

//player2
const player2Geometry = new THREE.BoxGeometry(PLAYER_WIDTH, PLAYER_HEIGHT, 1);
const player2Material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const player2 = new THREE.Mesh(player2Geometry, player2Material);
scene.add(player2);

player2.position.z = -FIELD_LENGTH/2 + 1.5;
player2.position.y = 1.6;


//Bounding Box Player2
const	player2BBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());

const player2BBoxHelper = new THREE.BoxHelper(player2, 0xffff00); // Yellow wireframe color
scene.add(player2BBoxHelper);

player2BBox.setFromObject(player2);
console.log(player2BBox);


//START THE BALL
function startBallMovement() {
	const	randomXNumber = Math.random();

	if (randomXNumber > 0.5) {
		ballDirX = -1;
	} else {
		ballDirX = 1
	}

	//Zdirection
	const	randomYNumber = Math.random();
	if (randomYNumber > 0.5) {
		ballDirZ = -1;
	} else {
		ballDirZ = 1
	}

	gameStart = true;
}

//=============PLAYER MOVEMENT SECTION===================
//=======================================================

//LINE in THE MIDDLE OF THE FIELD
const cube3Geometry = new THREE.BoxGeometry(FIELD_WIDTH - 0.2, 0.2, 0.3);
const cube3Material = new THREE.MeshBasicMaterial({color: 0x000000});
const cube3 = new THREE.Mesh(cube3Geometry, cube3Material);
scene.add(cube3);

cube3.position.y = 0.1;

//LINE in player1
const line1Geometry = new THREE.BoxGeometry(FIELD_WIDTH - 0.1, 0.2, 0.12);
const line1Material = new THREE.MeshBasicMaterial({color: 0x00000});
const line1 = new THREE.Mesh(line1Geometry, line1Material);
scene.add(line1);
line1.position.z = FIELD_LENGTH/2 - 2;
line1.position.y = 0.1;

//LINE in player2
const line2Geometry = new THREE.BoxGeometry(FIELD_WIDTH - 0.1, 0.2, 0.12);
const line2Material = new THREE.MeshBasicMaterial({color: 0x00000});
const line2 = new THREE.Mesh(line2Geometry, line2Material);
scene.add(line2);
line2.position.z = -FIELD_LENGTH/2 + 2;
line2.position.y = 0.1;

//Cilinder 1 THE MIDDLE OF THE FIELD
const cylinder2Geometry = new THREE.CylinderGeometry( 4.5, 4.5, 0.7, 32 ); 
const cylinder2Material = new THREE.MeshBasicMaterial( {color: 0x2C2F4B} ); 
const cylinder2 = new THREE.Mesh( cylinder2Geometry, cylinder2Material );
scene.add(cylinder2);

//Cilinder 1 THE MIDDLE OF THE FIELD
const cylinder1Geometry = new THREE.CylinderGeometry( 4.9, 4.9, 0.6, 32 ); 
const cylinder1Material = new THREE.MeshBasicMaterial( {color: 0x000000} ); 
const cylinder1 = new THREE.Mesh( cylinder1Geometry, cylinder1Material );
scene.add(cylinder1);

//Inside of playing field
const innerPLayingFieldGeometry = new THREE.BoxGeometry(FIELD_WIDTH - 1, 0.3, FIELD_LENGTH - 1);
const innerPLayingFieldMaterial = new THREE.MeshBasicMaterial({color: 0x2C2F4B});
const innerPLayingField = new THREE.Mesh(innerPLayingFieldGeometry, innerPLayingFieldMaterial);
scene.add(innerPLayingField);

//Outer playing field wall z1
let	outerWallZ1Geometry = new THREE.BoxGeometry(FIELD_WIDTH, OUTER_WALL_HEIGHT, 0.5);
let	outerWallZ1Material = new THREE.MeshBasicMaterial({color: 0x90384A});
let	outerWallZ1 = new THREE.Mesh(outerWallZ1Geometry, outerWallZ1Material);
scene.add(outerWallZ1);

outerWallZ1.position.z = (-FIELD_LENGTH/2) + (0.5/2);

//Outer playing field wall z2
let	outerWallZ2Geometry = new THREE.BoxGeometry(FIELD_WIDTH, OUTER_WALL_HEIGHT, 0.5);
let	outerWallZ2Material = new THREE.MeshBasicMaterial({color: 0x90384A});
let	outerWallZ2 = new THREE.Mesh(outerWallZ2Geometry, outerWallZ2Material);
scene.add(outerWallZ2);

outerWallZ2.position.z = (FIELD_LENGTH/2) - (0.5/2);

//Outer playing field wall x1
let	outerWallX1Geometry = new THREE.BoxGeometry(0.5, OUTER_WALL_HEIGHT, FIELD_LENGTH-1);
let	outerWallX1Material = new THREE.MeshBasicMaterial({color: 0x1F2135});
let	outerWallX1 = new THREE.Mesh(outerWallX1Geometry, outerWallX1Material);
scene.add(outerWallX1);

outerWallX1.position.x = (-FIELD_WIDTH/2) + (0.5/2);

//Outer playing field wall x2
let	outerWallX2Geometry = new THREE.BoxGeometry(0.5, OUTER_WALL_HEIGHT, FIELD_LENGTH-1);
let	outerWallX2Material = new THREE.MeshBasicMaterial({color: 0x1F2135});
let	outerWallX2 = new THREE.Mesh(outerWallX2Geometry, outerWallX2Material);
scene.add(outerWallX2);

outerWallX2.position.x = (FIELD_WIDTH/2) - (0.5/2);


const cube1Geometry = new THREE.BoxGeometry(FIELD_WIDTH - 0.2, 0.2, FIELD_LENGTH - 0.2);
const cube1Material = new THREE.MeshBasicMaterial({color: 0xFFFFF});
const cube1 = new THREE.Mesh(cube1Geometry, cube1Material);
scene.add(cube1);

const cube2Geometry = new THREE.BoxGeometry(FIELD_WIDTH, 10, FIELD_LENGTH);
const cube2Material = new THREE.MeshBasicMaterial({color: 0x00ff0, wireframe: true});
const cube2 = new THREE.Mesh(cube2Geometry, cube2Material);
scene.add(cube2);
cube2.position.y +=  5;

const ballGeometry = new THREE.SphereGeometry(0.8, 20, 20);
const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xCC0000 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ball);

const ballBoundingSphere = new THREE.Sphere(ball.position, BALL_RADIUS);

ball.position.x = 0;
ball.position.z = 0;
ball.position.y = 1.6;

//BALL MOVEMENT NEW
function	resetBall(lossIndentifier) {
	ball.position.x = 0;
	ball.position.z = 0;
	BALL_MOVE = false;
	let count = 3;
	const timer = setInterval(function() {
		count--;
		if (count === 0) {
			clearInterval(timer);
			outerWallZ1.material.color.set(0x90384A);
			outerWallZ2.material.color.set(0x90384A);
		
			ballSpeed = 2;
			if (lossIndentifier == 1) {
				ballDirX = -1;
			} else {
				ballDirX = +1;
			}
		
			if (lossIndentifier == 1) {
				ballDirZ = -1;
			} else {
				ballDirZ = +1;
			}
			BALL_MOVE = true;
		}
	}, 800);
}

function	annouceWinner(player) {
	if (player == 1) {
		//player 1 wins
		console.log("Player 1 wins a set!");
		document.getElementById("winner1").style.display = "initial";
		//stopGame();
	} else if (player == 2) {
		//player 2 wins
		console.log("Player 2 wins a set!");
		document.getElementById("winner2").style.display = "initial";
		//stopGame();
	}
}

function	ballMovement() {
	//Player 2 scores
	if (ball.position.z >= FIELD_LENGTH / 2) {
		outerWallZ2.material.color.set(0xE84646);
		player2Score++;
		updateScore(player2Score, 2);
		if (player2Score == 10) {
			annouceWinner(2);
		}
		canScorePlayer2 = false;
		console.log("Player 2 Scores!! Score: ", player2Score);
		document.getElementById('player2_score').innerText = player2Score;

		resetBall(1);
	}

	//Player 1 scores
	if (ball.position.z <= -FIELD_LENGTH / 2) {
		outerWallZ1.material.color.set(0xE84646);
		player1Score++;
		updateScore(player1Score, 1);
		if (player1Score == 10) {
			annouceWinner(1);
		}
		canScorePlayer1 = false;
		console.log("Player 1 Scores!! Score: ", player1Score);
		document.getElementById('player1_score').innerText = player1Score;
		// Add a delay before resetting the ball
		resetBall(2);  // Reset ball after 1 second
	}

	if (ball.position.x >= (FIELD_WIDTH / 2) - BALL_RADIUS) {
		outerWallX2.material.color.set(0x2C2F4B);
		let count = 3;
		const timer = setInterval(function() {
			count--;
			if (count === 0) {
				clearInterval(timer);
				outerWallX2.material.color.set(0x1F2135);
			}
		}, 300);
		ballDirX = -1;
	}

	if (ball.position.x <= -(FIELD_WIDTH / 2) + BALL_RADIUS) {
		outerWallX1.material.color.set(0x2C2F4B);
		ballDirX = +1;
		let count = 3;
		const timer = setInterval(function() {
			count--;
			if (count === 0) {
				clearInterval(timer);
				outerWallX1.material.color.set(0x1F2135);
			}
		}, 300);
	}

}

const keysPressed = {};

document.body.addEventListener("keydown", (e) => {
  keysPressed[e.key] = true;
  console.log("KeyPressed: ", keysPressed);
  movePlayer();
});

document.body.addEventListener("keyup", (ev) => {
	//Player1
	if (keysPressed['a']) {
		paddle1DirX = 0;
	}
	if (keysPressed['d']) {
		paddle1DirX = 0;
	}

	//Player2
	if (keysPressed['l']) {
		paddle2DirX = 0;
	}
	if (keysPressed['j']) {
		paddle2DirX = 0;
	}
	keysPressed[ev.key] = false;
});

function playerOne() {
	if (keysPressed['a']) {
		if (player1.position.x - PLAYER_WIDTH / 2 >= (-FIELD_WIDTH / 2) + 0.5 ) {
			paddle1DirX = -1;
		} else {
			paddle1DirX = 0;
		}
	}

	if ( keysPressed['d']) {
		if (player1.position.x + PLAYER_WIDTH / 2 <= (FIELD_WIDTH / 2)  - 0.5 ) {
			paddle1DirX = 1;
		} else {
			paddle1DirX = 0;
		}
 	}

	player1.position.x += paddle1DirX * 0.5;
	player1BBoxHelper.update();         // Update the wireframe position
}

function playerTwo() {
	if (keysPressed['j']) {
		if (player2.position.x - PLAYER_WIDTH / 2 >= (-FIELD_WIDTH / 2) + 0.5 ) {
			paddle2DirX = -1;
		} else {
			paddle2DirX = 0;
		}
	}

	if ( keysPressed['l']) {
		if (player2.position.x + PLAYER_WIDTH / 2 <= (FIELD_WIDTH / 2)  - 0.5 ) {
			paddle2DirX = 1;
		} else {
			paddle2DirX = 0;
		}
	}


	player2.position.x += paddle2DirX;
	player2BBoxHelper.update();         // Update the wireframe position
}

function movePlayer() {
	playerOne();
	playerTwo();
};


//paddle logic
function paddleLogic() {
	//Updating the ball bounding box position
    ballBoundingSphere.center.copy(ball.position);

	//Updating the position of the bounding boxes according to their players
	player2BBox.copy(player2.geometry.boundingBox).applyMatrix4(player2.matrixWorld);
	player1BBox.copy(player1.geometry.boundingBox).applyMatrix4(player1.matrixWorld);
	if(player1BBox.intersectsSphere(ballBoundingSphere) == true) {
		console.log("HITT PADDLE 1");
		// player1.scale.x = 1.5;
		ballDirZ = -ballDirZ;
		ballDirX -= paddle1DirX * 0.2;
	}
	if(player2BBox.intersectsSphere(ballBoundingSphere) == true) {
		console.log("HITT PADDLE 2");
		// player1.scale.x = 1.5;
		ballDirZ = -ballDirZ;
		ballDirX -= paddle2DirX * 0.2;
	}
}

function ballMove() {
	if (BALL_MOVE) {
		ball.position.x += ballDirX * 0.1;
		ball.position.z += ballDirZ * 0.1;
	}
}

function animate() {
	renderer.render(scene, camera);
	renderer.setAnimationLoop(animate);
	if (gameStart == false) {
		startBallMovement();
	}
	paddleLogic();
	ballMovement();
	ballMove();
}



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