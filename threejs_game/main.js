import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

//GAME START	==========================================================================================================================================

//Variables for configuring the game
const	FIELD_WIDTH = 30;
const	FIELD_LENGTH = 42;
const	FIELD_HEIGHT = 10; //Not used as there is no y direction

const	PLAYER_WIDTH = 4;
const	PLAYER_HEIGHT = 1;
const	OUTER_WALL_HEIGHT = 0.8;

//Score
const	MAX_SCORE = 3;

//Max set count
const	MAX_SET_COUNT = 3

//Ball
const	BALL_RADIUS = 0.8;
const	BALL_SPEED = 2;
var		BALL_MOVE = true;

//z direction x direction
var ballDirZ = 1, ballDirX = 1;

//Game start
var	gameStart = false;

//Setting up rendering ==============================================================================================================================================

//GUI
const gui = new dat.GUI();

//STARTING THREEJS
const scene = new THREE.Scene();

const aspect = window.innerWidth / window.innerHeight;

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.set(20, 20, 20);
camera.lookAt(0, 1, 0); // Look at the center of the field

//Adding directional lighting
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.5);
directionalLight.shadow.mapSize.width = 512; // Size of the shadow map
directionalLight.shadow.mapSize.height = 512;


// Adjust shadow camera to control the width and height of the light's effect
directionalLight.shadow.camera.left = -FIELD_WIDTH / 2; 
directionalLight.shadow.camera.right = FIELD_WIDTH / 2; 
directionalLight.shadow.camera.top = FIELD_LENGTH / 2; 
directionalLight.shadow.camera.bottom = -FIELD_LENGTH / 2; 


scene.add(directionalLight);
directionalLight.position.set(0, 30, 0);
directionalLight.castShadow = true;

//directional light helper
// const directionalLighthelper = new THREE.DirectionalLightHelper( directionalLight, 10 );
// scene.add( directionalLighthelper );

//Ambient light
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight( 0xffffff, 800 );
// spotLight.position.set( 0, 50, 0 );
// spotLight.map = new THREE.TextureLoader().load( url );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
spotLight.shadow.camera.near = 10;
spotLight.shadow.camera.far = 20;
spotLight.shadow.camera.fov = 30;


spotLight.position.set(0, 20, 0);  // Positioned above the field
spotLight.target.position.set(0, 0, 0);  // Ensure the light targets the center of the field
scene.add(spotLight.target);


scene.add( spotLight );


// //directional light helper

// const spotLighthelper = new THREE.SpotLightHelper( spotLight, 10 );
// scene.add( spotLighthelper );

// Optional: Helper to visualize the shadow camera frustum
// const shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
// scene.add(shadowCameraHelper);

// const directionalCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(directionalCameraHelper);


camera.position.set(20, 20, 20);

camera.lookAt(0, 0, 0);

//Rendering
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: soft shadows

const controls = new OrbitControls(camera, renderer.domElement);



//Player object

function createPlayer() {
    this.paddleDirX = 0;
    this.paddleDirY = 0;
    this.playerScore = 0;
    this.playerSetScore = 0;
    this.canPlayerScore = true;
}

function createPlayerConstructionObject(color = 0xff0000, positionZ = 0, positionY = 0, width = 4, height = 1) {
	const playerGeometry = new THREE.BoxGeometry(width, height, 1);
	const playerMaterial = new THREE.MeshStandardMaterial({ color: color });
	const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);

	playerMesh.castShadow = true;
	playerMesh.position.z = positionZ;
	playerMesh.position.y = positionY;

	return playerMesh; // Directly return the mesh if no other properties are needed
}

//Player1
const Player1 = new createPlayer();
const player1 =  createPlayerConstructionObject(0xff0000, FIELD_LENGTH/2 -1.5, 1.6);
scene.add(player1);


//Player 1 sets
let		player1Sets  = [MAX_SET_COUNT];
let 	player1SetCount = 0;
const	player1Set1Geometry = new THREE.BoxGeometry(1, 1, 1);
const	player1Set1Material = new THREE.MeshStandardMaterial({color: 0xff0000, opacity: 0.2, transparent: true});
const	player1Set1 = new THREE.Mesh(player1Set1Geometry, player1Set1Material);
player1Set1.castShadow = true;
scene.add(player1Set1);

player1Sets[0] = player1Set1;

player1Set1.position.z = 2;
player1Set1.position.y = 3;
player1Set1.position.x = -FIELD_WIDTH / 2 -4;

const	player1Set2Geometry = new THREE.BoxGeometry(1, 1, 1);
const	player1Set2Material = new THREE.MeshStandardMaterial({color: 0xff0000, opacity: 0.2, transparent: true});
const	player1Set2 = new THREE.Mesh(player1Set2Geometry, player1Set2Material);
player1Set2.castShadow = true;
scene.add(player1Set2);

player1Sets[1] = player1Set2;

player1Set2.position.z = 2;
player1Set2.position.y = 5.5;
player1Set2.position.x = -FIELD_WIDTH / 2 -4;


const	player1Set3Geometry = new THREE.BoxGeometry(1, 1, 1);
const	player1Set3Material = new THREE.MeshStandardMaterial({color: 0xff0000, opacity: 0.2, transparent: true});
const	player1Set3 = new THREE.Mesh(player1Set3Geometry, player1Set3Material);
player1Set3.castShadow = true;
scene.add(player1Set3);

player1Sets[2] = player1Set3;

player1Set3.position.z = 2;
player1Set3.position.y = 8;
player1Set3.position.x = -FIELD_WIDTH / 2 -4;


//Bounding Box Player1
const	player1BBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());

const player1BBoxHelper = new THREE.BoxHelper(player1, 0xffff00); // Yellow wireframe color
scene.add(player1BBoxHelper);

player1BBox.setFromObject(player1);
console.log(player1BBox);




//Player2
const Player2 = new createPlayer();
const player2 =  createPlayerConstructionObject(0xFFFFFF, -FIELD_LENGTH/2 + 1.5, 1.6);
scene.add(player2);


//Player2 sets
let		player2Sets  = [MAX_SET_COUNT];
let		player2SetCount = 0;
const	player2Set1Geometry = new THREE.BoxGeometry(1, 1, 1);
const	player2Set1Material = new THREE.MeshStandardMaterial({color: 0xffffff, opacity: 0.2, transparent: true});
const	player2Set1 = new THREE.Mesh(player2Set1Geometry, player2Set1Material);
player2Set1.castShadow = true;
scene.add(player2Set1);

player2Sets[0] = player2Set1;

player2Set1.position.z = -2;
player2Set1.position.y = 3;
player2Set1.position.x = -FIELD_WIDTH / 2 -4;

const	player2Set2Geometry = new THREE.BoxGeometry(1, 1, 1);
const	player2Set2Material = new THREE.MeshStandardMaterial({color: 0xffffff, opacity: 0.2, transparent: true});
const	player2Set2 = new THREE.Mesh(player2Set2Geometry, player2Set2Material);
player1Set2.castShadow = true;
scene.add(player2Set2);

player2Sets[1] = player2Set2;

player2Set2.position.z = -2;
player2Set2.position.y = 5.5;
player2Set2.position.x = -FIELD_WIDTH / 2 -4;


const	player2Set3Geometry = new THREE.BoxGeometry(1, 1, 1);
const	player2Set3Material = new THREE.MeshStandardMaterial({color: 0xffffff, opacity: 0.2, transparent: true});
const	player2Set3 = new THREE.Mesh(player2Set3Geometry, player2Set3Material);
player2Set3.castShadow = true;
scene.add(player2Set3);

player2Sets[2] = player2Set3;

player2Set3.position.z = -2;
player2Set3.position.y = 8;
player2Set3.position.x = -FIELD_WIDTH / 2 -4;


//Bounding Box Player2
const	player2BBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());

const player2BBoxHelper = new THREE.BoxHelper(player2, 0xffff00); // Yellow wireframe color
scene.add(player2BBoxHelper);

player2BBox.setFromObject(player2);
console.log(player2BBox);



let score1 = 0;
let score2 = 0;

//SCORE TEXTS	===================================================================================================================================

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
        const material = new THREE.MeshStandardMaterial({ color: 0xfffff});

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

//Cilinder 2 THE MIDDLE OF THE FIELD
const cylinder2Geometry = new THREE.CylinderGeometry( 4.5, 4.5, 0.7, 32 ); 
const cylinder2Material = new THREE.MeshStandardMaterial( {color: 0x2C2F4B} ); 
const cylinder2 = new THREE.Mesh( cylinder2Geometry, cylinder2Material );
cylinder2.receiveShadow = true;
scene.add(cylinder2);

//Cilinder 1 THE MIDDLE OF THE FIELD
const cylinder1Geometry = new THREE.CylinderGeometry( 4.9, 4.9, 0.6, 32 ); 
const cylinder1Material = new THREE.MeshBasicMaterial( {color: 0x000000} ); 
const cylinder1 = new THREE.Mesh( cylinder1Geometry, cylinder1Material );
cylinder1.receiveShadow = true;
scene.add(cylinder1);

//Inside of playing field
const innerPLayingFieldGeometry = new THREE.BoxGeometry(FIELD_WIDTH - 1, 0.3, FIELD_LENGTH - 1);
const innerPLayingFieldMaterial = new THREE.MeshStandardMaterial({color: 0x2C2F4B});
const innerPLayingField = new THREE.Mesh(innerPLayingFieldGeometry, innerPLayingFieldMaterial);
innerPLayingField.receiveShadow = true;
scene.add(innerPLayingField);

//Outer playing field wall z1
let	outerWallZ1Geometry = new THREE.BoxGeometry(FIELD_WIDTH, OUTER_WALL_HEIGHT, 0.5);
let	outerWallZ1Material = new THREE.MeshStandardMaterial({color: 0x90384A});
let	outerWallZ1 = new THREE.Mesh(outerWallZ1Geometry, outerWallZ1Material);
outerWallZ1.receiveShadow = true;
scene.add(outerWallZ1);

outerWallZ1.position.z = (-FIELD_LENGTH/2) + (0.5/2);

//Outer playing field wall z2
let	outerWallZ2Geometry = new THREE.BoxGeometry(FIELD_WIDTH, OUTER_WALL_HEIGHT, 0.5);
let	outerWallZ2Material = new THREE.MeshStandardMaterial({color: 0x90384A});
let	outerWallZ2 = new THREE.Mesh(outerWallZ2Geometry, outerWallZ2Material);
outerWallZ2.receiveShadow = true;
scene.add(outerWallZ2);

outerWallZ2.position.z = (FIELD_LENGTH/2) - (0.5/2);

//Outer playing field wall x1
let	outerWallX1Geometry = new THREE.BoxGeometry(0.5, OUTER_WALL_HEIGHT, FIELD_LENGTH-1);
let	outerWallX1Material = new THREE.MeshStandardMaterial({color: 0x1F2135});
let	outerWallX1 = new THREE.Mesh(outerWallX1Geometry, outerWallX1Material);
scene.add(outerWallX1);

outerWallX1.position.x = (-FIELD_WIDTH/2) + (0.5/2);

//Outer playing field wall x2
let	outerWallX2Geometry = new THREE.BoxGeometry(0.5, OUTER_WALL_HEIGHT, FIELD_LENGTH-1);
let	outerWallX2Material = new THREE.MeshStandardMaterial({color: 0x1F2135});
let	outerWallX2 = new THREE.Mesh(outerWallX2Geometry, outerWallX2Material);
scene.add(outerWallX2);

outerWallX2.position.x = (FIELD_WIDTH/2) - (0.5/2);


const cube1Geometry = new THREE.BoxGeometry(FIELD_WIDTH - 0.2, 0.2, FIELD_LENGTH - 0.2);
const cube1Material = new THREE.MeshBasicMaterial({color: 0xFFFFF});
const cube1 = new THREE.Mesh(cube1Geometry, cube1Material);
scene.add(cube1);








const ballGeometry = new THREE.SphereGeometry(0.8, 20, 20);
const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xCC0000 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.castShadow = true;
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
		
			// ballSpeed = 2;
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


function stopGame(player) {
	//display the end screen
	score1 = 0;
	score2 = 0;
	Player2.playerScore = 0;
	Player1.playerScore = 0;
	player1SetCount = 0;
	player2SetCount = 0;
	for (let i = 0; i < MAX_SET_COUNT; ++i) {
		player1Sets[i].material.opacity = 0.2;
		player2Sets[i].material.opacity = 0.2;
	}
	gameStart = false;
	BALL_MOVE = false;

	document.getElementById('player1_score').innerText = Player2.playerScore;
	document.getElementById('player2_score').innerText = Player1.playerScore;
	document.getElementById("winner1").style.display = "none";
	document.getElementById("winner2").style.display = "none";
}

function	announceSetWinner(player) {
	if (1 === player) {
		console.log("Player 1 has won the entire game!");
		//Display the winner
		document.getElementById("game_winner1").style.display = "initial";
		updateScore(0, 1);
	} else {
		console.log("Player 2 has won the entire game!");
		//Display the winner
		document.getElementById("game_winner2").style.display = "initial";
		updateScore(0, 1);
	}
}

function	addSetCount(player, playerSetCount) {
	if (player === 1) {
		player1Sets[playerSetCount].material.opacity = 1;
	}	else {
		player2Sets[playerSetCount].material.opacity = 1;
	}
}

function	annouceWinner(player) {
	if (player == 1) {
		//player 1 wins
		console.log("Player 1 wins a set!");
		document.getElementById("winner1").style.display = "initial";

		//update set
		player1SetCount++;
		console.log("Player 1 Set Count: " + player1SetCount);
		if (player1SetCount <= MAX_SET_COUNT) {
			addSetCount(player, player1SetCount - 1);
		}

		if (player1SetCount === MAX_SET_COUNT) {
			announceSetWinner(player);
			stopGame();
		}
	} else if (player == 2) {
		//player 2 wins
		console.log("Player 2 wins a set!");
		document.getElementById("winner2").style.display = "initial";

		//update set
		player2SetCount++;
		console.log("Player 2 Set Count: " + player2SetCount);
		if (player2SetCount <= MAX_SET_COUNT) {
			addSetCount(player, player2SetCount - 1);
		}
		if (player2SetCount === MAX_SET_COUNT) {
			announceSetWinner(player);
			stopGame();
		}
	}
}

function	ballMovement() {
	//Player 2 scores
	if (ball.position.z >= FIELD_LENGTH / 2) {
		outerWallZ2.material.color.set(0xFFFFFF);
		Player2.playerScore++;
		updateScore(Player2.playerScore, 2);
		if (0 === Player2.playerScore % MAX_SCORE) {
			annouceWinner(2);
			document.getElementById("winner2").style.display = "none";
			Player2.playerScore = 0;
			Player1.playerScore = 0;
			updateScore(Player2.playerScore, 2);
			updateScore(Player1.playerScore, 1);
			document.getElementById('player1_score').innerText = Player1.playerScore;
		}
		Player2.canPlayerScore = false;
		console.log("Player 2 Scores!! Score: ", Player2.playerScore);
		document.getElementById('player2_score').innerText = Player2.playerScore;
		resetBall(1);
	}

	//Player 1 scores
	if (ball.position.z <= -FIELD_LENGTH / 2) {
		outerWallZ1.material.color.set(0xFF0000);
		Player1.playerScore++;
		updateScore(Player1.playerScore, 1);
		if (0 === Player1.playerScore % MAX_SCORE) {
			annouceWinner(1);
			document.getElementById("winner1").style.display = "none";
			Player1.playerScore = 0;
			Player2.playerScore = 0;
			updateScore(Player1.playerScore, 1);
			updateScore(Player2.playerScore, 2);
			document.getElementById('player2_score').innerText = Player2.playerScore;
		}
		Player1.canScorePlayer = false;
		console.log("Player 1 Scores!! Score: ", Player1.playerScore);
		document.getElementById('player1_score').innerText = Player1.playerScore;
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
  //console.log("KeyPressed: ", keysPressed);
  movePlayer();
});

document.body.addEventListener("keyup", (ev) => {
	//Player1
	if (keysPressed['a']) {
		Player1.paddleDirX = 0;
	}
	if (keysPressed['d']) {
		Player1.paddleDirX = 0;
	}

	//Player2
	if (keysPressed['l']) {
		Player2.paddleDirX = 0;
	}
	if (keysPressed['j']) {
		Player2.paddleDirX = 0;
	}
	keysPressed[ev.key] = false;
});

function playerOne() {
	if (keysPressed['a']) {
		if (player1.position.x - PLAYER_WIDTH / 2 >= (-FIELD_WIDTH / 2) + 0.5 ) {
			Player1.paddleDirX = -1;
		} else {
			Player1.paddleDirX = 0;
		}
	}

	if ( keysPressed['d']) {
		if (player1.position.x + PLAYER_WIDTH / 2 <= (FIELD_WIDTH / 2)  - 0.5 ) {
			Player1.paddleDirX = 1;
		} else {
			Player1.paddleDirX = 0;
		}
 	}

	player1.position.x += Player1.paddleDirX * 0.5;
	player1BBoxHelper.update();         // Update the wireframe position
}

function playerTwo() {
	if (keysPressed['j']) {
		if (player2.position.x - PLAYER_WIDTH / 2 >= (-FIELD_WIDTH / 2) + 0.5 ) {
			Player2.paddleDirX = -1;
		} else {
			Player2.paddleDirX = 0;
		}
	}

	if ( keysPressed['l']) {
		if (player2.position.x + PLAYER_WIDTH / 2 <= (FIELD_WIDTH / 2)  - 0.5 ) {
			Player2.paddleDirX = 1;
		} else {
			Player2.paddleDirX = 0;
		}
	}


	player2.position.x += Player2.paddleDirX;
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
		ballDirX -= Player1.paddleDirX * 0.2;
	}
	if(player2BBox.intersectsSphere(ballBoundingSphere) == true) {
		console.log("HITT PADDLE 2");
		// player1.scale.x = 1.5;
		ballDirZ = -ballDirZ;
		ballDirX -= Player2.paddleDirX * 0.2;
	}
}

function ballMove() {
	if (BALL_MOVE) {
		ball.position.x += ballDirX * 0.1;
		ball.position.z += ballDirZ * 0.1;
	}
}

function rotateSets() {
	player1Set1.rotation.x -= 0.01;
	player1Set2.rotation.x += 0.01;	
	player1Set3.rotation.x += 0.01;

	player1Set1.rotation.y += 0.01;
	player1Set2.rotation.y -= 0.01;	
	player1Set3.rotation.y += 0.01;


	player2Set1.rotation.x += 0.01;
	player2Set2.rotation.x -= 0.01;	
	player2Set3.rotation.x += 0.01;

	player2Set1.rotation.y += 0.01;
	player2Set2.rotation.y += 0.01;	
	player2Set3.rotation.y -= 0.01;


}

function animate() {
	renderer.render(scene, camera);

	rotateSets();
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