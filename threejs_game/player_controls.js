import {Player1, Player2, player1, player2, player1BBox, player1BBoxHelper, player2BBox, player2BBoxHelper} from './player_variables.js';
import { FIELD_WIDTH, FIELD_LENGTH, FIELD_HEIGHT } from './field_variables.js';
import { PLAYER_WIDTH} from './global_variables.js';

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


export {movePlayer, keysPressed};