import * as THREE from 'three';
import * as GlobalVar from './global_variables.js';

//My import
import { FIELD_LENGTH, FIELD_WIDTH, FIELD_HEIGHT } from "./field_variables";
import {scene} from './start_threejs_and_lights';

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

//Player2
const Player2 = new createPlayer();
const player2 =  createPlayerConstructionObject(0xFFFFFF, -FIELD_LENGTH/2 + 1.5, 1.6);
scene.add(player2);






//Player 1 sets
let		player1Sets  = [GlobalVar.MAX_SET_COUNT];
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


//Player2 sets
let		player2Sets  = [GlobalVar.MAX_SET_COUNT];
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

//Setters
export	function setPlayer1SetCount(count) {
	player1SetCount = count;
}

export	function setPlayer2SetCount(count) {
	player2SetCount = count;
}

export	function incrementPlayer1SetCountByOne() {
	player1SetCount++;
}

export function incrementPlayer2SetCountByOne() {
	player2SetCount++;
}

export {Player1, Player2, player1, player2, player1BBox, player1BBoxHelper, player2BBox, player2BBoxHelper, player1Sets, player2Sets, player1SetCount, player2SetCount};