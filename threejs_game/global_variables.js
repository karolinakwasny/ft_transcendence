
export	const	OUTER_WALL_HEIGHT = 0.8;

//Score
export	const	MAX_SCORE = 1;

//Max set count
export	const	MAX_SET_COUNT = 3

//Ball
export	const	BALL_RADIUS = 0.8;
export	const	BALL_SPEED = 2;

export	let score1 = 0;
export	let score2 = 0;

export	var		BALL_MOVE = true;

//z direction x direction
export	let ballDirZ = 1;
export	let	ballDirX = 1;

//Game start
export	var	gameStart = false;


//Setters
export	function setBallDirZ(oneOrMinusOne) {
	ballDirZ = oneOrMinusOne;
}

export	function setBallDirX(oneOrMinusOne) {
	ballDirX = oneOrMinusOne;
}

export function setGameStart(trueOrFalse) {
	gameStart = trueOrFalse;
}

export function setBallMove(trueOrFalse) {
	BALL_MOVE = trueOrFalse;
}

export function setScore1(points) {
	score1 = points;
}

export function setScore2(points) {
	score2 = points;
}

export function incrementScore1() {
	score1++;
}

export function incrementScore2() {
	score2++;
}