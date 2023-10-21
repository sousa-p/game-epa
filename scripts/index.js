import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";


const GAME_WIDTH = 425;
const GAME_HEIGHT = 720;

kaboom({
	width: GAME_WIDTH,
	height: GAME_HEIGHT,
	global: true,
	letterbox: true,
	font: "fightKick"
});

setBackground(BLACK);

loadFont("fightKick", "../assets/fonts/FightKickDemoRegular.ttf");