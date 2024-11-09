import './style.css';
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import {scene, renderer, camera} from './start_threejs_and_lights.js';

//My imports
import	{movePlayer, keysPressed} from './player_controls.js';
import {Player1, Player2, player1, player2, player1BBox, player2BBox, player1Sets, player2Sets, player1SetCount, player2SetCount} from './player_variables.js';
import { setPlayer1SetCount, setPlayer2SetCount, incrementPlayer1SetCountByOne, incrementPlayer2SetCountByOne } from './player_variables.js';
import { FIELD_WIDTH, FIELD_HEIGHT, FIELD_LENGTH } from './field_variables.js';
import * as GlobalVar from './global_variables.js';


//SCORE TEXTS	===================================================================================================================================

let textMesh1, textMesh2;
let loadedFont = null; // Variable to store the loaded font
const loader = new FontLoader();

// Load the font once and store it in the variable
loader.load("./fonts/Poppins_Bold.json", function (font) {
    loadedFont = font;  // Store the loaded font

    // Initial display of score
    createText(GlobalVar.score1, 1);
	createText(GlobalVar.score2, 2);
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
		GlobalVar.setBallDirX(-1);
	} else {
		GlobalVar.setBallDirX(1);
	}

	//Zdirection
	const	randomYNumber = Math.random();
	if (randomYNumber > 0.5) {
		GlobalVar.setBallDirZ(-1);
	} else {
		GlobalVar.setBallDirZ(1);
	}

	GlobalVar.setGameStart(true);
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
let	outerWallZ1Geometry = new THREE.BoxGeometry(FIELD_WIDTH, GlobalVar.OUTER_WALL_HEIGHT, 0.5);
let	outerWallZ1Material = new THREE.MeshStandardMaterial({color: 0x90384A});
let	outerWallZ1 = new THREE.Mesh(outerWallZ1Geometry, outerWallZ1Material);
outerWallZ1.receiveShadow = true;
scene.add(outerWallZ1);

outerWallZ1.position.z = (-FIELD_LENGTH/2) + (0.5/2);

//Outer playing field wall z2
let	outerWallZ2Geometry = new THREE.BoxGeometry(FIELD_WIDTH, GlobalVar.OUTER_WALL_HEIGHT, 0.5);
let	outerWallZ2Material = new THREE.MeshStandardMaterial({color: 0x90384A});
let	outerWallZ2 = new THREE.Mesh(outerWallZ2Geometry, outerWallZ2Material);
outerWallZ2.receiveShadow = true;
scene.add(outerWallZ2);

outerWallZ2.position.z = (FIELD_LENGTH/2) - (0.5/2);

//Outer playing field wall x1
let	outerWallX1Geometry = new THREE.BoxGeometry(0.5, GlobalVar.OUTER_WALL_HEIGHT, FIELD_LENGTH-1);
let	outerWallX1Material = new THREE.MeshStandardMaterial({color: 0x1F2135});
let	outerWallX1 = new THREE.Mesh(outerWallX1Geometry, outerWallX1Material);
scene.add(outerWallX1);

outerWallX1.position.x = (-FIELD_WIDTH/2) + (0.5/2);

//Outer playing field wall x2
let	outerWallX2Geometry = new THREE.BoxGeometry(0.5, GlobalVar.OUTER_WALL_HEIGHT, FIELD_LENGTH-1);
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

const ballBoundingSphere = new THREE.Sphere(ball.position, GlobalVar.BALL_RADIUS);

ball.position.x = 0;
ball.position.z = 0;
ball.position.y = 1.6;

//BALL MOVEMENT NEW
function	resetBall(lossIndentifier) {
	ball.position.x = 0;
	ball.position.z = 0;
	GlobalVar.setBallMove(false);
	let count = 3;
	const timer = setInterval(function() {
		count--;
		if (count === 0) {
			clearInterval(timer);
			outerWallZ1.material.color.set(0x90384A);
			outerWallZ2.material.color.set(0x90384A);
		
			// ballSpeed = 2;
			if (lossIndentifier == 1) {
				GlobalVar.setBallDirX(-1);
			} else {
				GlobalVar.setBallDirX(+1);
			}
		
			if (lossIndentifier == 1) {
				GlobalVar.setBallDirZ(-1);
			} else {
				GlobalVar.setBallDirZ(+1);
			}
			GlobalVar.setBallMove(true);
		}
	}, 800);
}


function stopGame(player) {
	//display the end screen
	GlobalVar.score1 = 0;
	GlobalVar.score2 = 0;
	Player2.playerScore = 0;
	Player1.playerScore = 0;
	player1SetCount = 0;
	player2SetCount = 0;
	for (let i = 0; i < MAX_SET_COUNT; ++i) {
		player1Sets[i].material.opacity = 0.2;
		player2Sets[i].material.opacity = 0.2;
	}
	GlobalVar.setGameStart(false);
	GlobalVar.setBallMove(false);

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
		incrementPlayer1SetCountByOne();
		console.log("Player 1 Set Count: " + player1SetCount);
		if (player1SetCount <= GlobalVar.MAX_SET_COUNT) {
			addSetCount(player, player1SetCount - 1);
		}

		if (player1SetCount === GlobalVar.MAX_SET_COUNT) {
			announceSetWinner(player);
			stopGame();
		}
	} else if (player == 2) {
		//player 2 wins
		console.log("Player 2 wins a set!");
		document.getElementById("winner2").style.display = "initial";

		//update set
		incrementPlayer2SetCountByOne();
		console.log("Player 2 Set Count: " + player2SetCount);
		if (player2SetCount <= GlobalVar.MAX_SET_COUNT) {
			addSetCount(player, player2SetCount - 1);
		}
		if (player2SetCount === GlobalVar.MAX_SET_COUNT) {
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
		if (0 === Player2.playerScore % GlobalVar.MAX_SCORE) {
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
		if (0 === Player1.playerScore % GlobalVar.MAX_SCORE) {
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

	if (ball.position.x >= (FIELD_WIDTH / 2) - GlobalVar.BALL_RADIUS) {
		outerWallX2.material.color.set(0x2C2F4B);
		let count = 3;
		const timer = setInterval(function() {
			count--;
			if (count === 0) {
				clearInterval(timer);
				outerWallX2.material.color.set(0x1F2135);
			}
		}, 300);
		GlobalVar.setBallDirX(-1);
	}

	if (ball.position.x <= -(FIELD_WIDTH / 2) + GlobalVar.BALL_RADIUS) {
		outerWallX1.material.color.set(0x2C2F4B);
		GlobalVar.setBallDirX(+1);
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
		GlobalVar.setBallDirZ(-GlobalVar.ballDirZ);
		GlobalVar.setBallDirX(GlobalVar.ballDirX - (Player1.paddleDirX * 0.2));
	}
	if(player2BBox.intersectsSphere(ballBoundingSphere) == true) {
		console.log("HITT PADDLE 2");
		// player1.scale.x = 1.5;
		GlobalVar.setBallDirZ(-GlobalVar.ballDirZ);
		GlobalVar.setBallDirX(GlobalVar.ballDirX - (Player2.paddleDirX * 0.2));
	}
}

function ballMove() {
	if (GlobalVar.BALL_MOVE) {
		ball.position.x += GlobalVar.ballDirX * 0.1;
		ball.position.z += GlobalVar.ballDirZ * 0.1;
	}
}

function rotateSets() {
	player1Sets[0].rotation.x -= 0.01;
	player1Sets[1].rotation.x += 0.01;	
	player1Sets[2].rotation.x += 0.01;

	player1Sets[0].rotation.y += 0.01;
	player1Sets[1].rotation.y -= 0.01;	
	player1Sets[2].rotation.y += 0.01;


	player2Sets[0].rotation.x += 0.01;
	player2Sets[1].rotation.x -= 0.01;	
	player2Sets[2].rotation.x += 0.01;

	player2Sets[0].rotation.y += 0.01;
	player2Sets[1].rotation.y += 0.01;	
	player2Sets[2].rotation.y -= 0.01;


}

function animate() {
	renderer.render(scene, camera);

	rotateSets();
	renderer.setAnimationLoop(animate);
	if (GlobalVar.gameStart === false) {
		startBallMovement();
	}
	paddleLogic();
	ballMovement();
	ballMove();
}

export {animate};





window.addEventListener('resize', function() {
  const aspect = window.innerWidth / window.innerHeight;
  camera.left = -d * aspect;
  camera.right = d * aspect;
  camera.top = d;
  camera.bottom = -d;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});