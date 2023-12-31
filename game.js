// SCREAM AND RUN SFX FROM PIXABAY
// https://pixabay.com/sound-effects/search/scream/ 
// https://pixabay.com/sound-effects/search/run/
// https://pixabay.com/sound-effects/search/white-noise/
// https://pixabay.com/sound-effects/search/electric%20fan/
// https://pixabay.com/sound-effects/search/office/ 

// tame the javashrek
'use strict';

// global variables
let cursors;
let cursor;
let lastCam = "C1";
var timer;
var timerText;
let door1;
let door2;
let light1;
let light2;
let globalTimer = 30000; //240
let globalPower = 15000;
let FunGuyRunTick = 10000;
let moveTick = 2000;
let door1Open = true;
let door2Open = true;
let light1On = false;
let light2On = false;
var bool1 = false;
var bool2 = true;
var bool3 = false;
var bool4 = false;
var bool5 = false;
var bool6 = false;
var bool7 = false;
let newG = true;
var runOnce = true;
var randomIndex;
let screamOnce = true;
var boolArray = [bool1, bool2, bool3, bool4, bool5, bool6, bool7];
// let GameStarting = true;

// main game object
let config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            },
            bounds: {
                x: 0,
                y: 0,
                width: 1920,
                height: 1080
              }
        }
    },
    scene: [Title, Gameplay, C1, C2, C3, C4, C5, C6, C7, Win]
};

let game = new Phaser.Game(config);
