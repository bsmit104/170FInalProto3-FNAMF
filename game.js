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
let globalTimer = 4000; //240
let FunGuyRunTick = 600;
let door1Open = true;
let door2Open = true;
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
    scene: [Gameplay, C1, C2, C3, C4, C5, C6, C7]
};

let game = new Phaser.Game(config);
