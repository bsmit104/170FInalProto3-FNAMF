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
let globalTimer = 2000; //240
let globalPower = 500;
let FunGuyRunTick = 600;
let moveTick = 100;
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
// let GameStarting = true;

// main game object
let config = {
    type: Phaser.WEBGL,
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
