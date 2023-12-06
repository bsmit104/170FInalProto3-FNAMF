// tame the javashrek
'use strict';

// global variables
let cursors;
let cursor;
let lastCam = "C1";

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
    //, Intro, Title, Level_select, Water9, Sat, Cheese, Bluecheese, Earth, Gameover]
};

let game = new Phaser.Game(config);
