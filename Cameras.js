class CustomScene extends Phaser.Scene {
    constructor(key, backgroundKey) {
        super(key);
        this.backgroundKey = backgroundKey;
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("cam", "camera.png");
        this.load.image(this.backgroundKey, `${this.backgroundKey}.png`);
        this.load.audio('run', 'funrun.mp3');
    }

    setMapSizes(x) {
        x.setScale(1.5);
        x.setDepth(1);
        x.setInteractive();
    }

    create() {
        this.run = this.sound.add('run');

        lastCam = this.scene.key;

        this.cameras.main.setBackgroundColor('#000000');
        cursors = this.input.keyboard.createCursorKeys();

        const background = this.add.image(960, 540, this.backgroundKey).setOrigin(0.5, 0.5);
        background.setScale(4.2);

        this.createMapButtons();

        if (cursors.down.isDown) {
            this.scene.start('Gameplay');
        }

        // this.time.addEvent({
        //     delay: 1000,
        //     callback: this.updateTimer,
        //     callbackScope: this,
        //     loop: true
        //   });
        this.time.addEvent({
            delay: 1000,
            callback: () => this.updateTimer(),
            callbackScope: this,
            loop: false
          });

          this.time.addEvent({
            delay: 1000,
            callback: () => this.updateTimer(),
            callbackScope: this,
            loop: false
          });

        
    }

    funGuyRun() {
          // console.log(FunGuyRunTick);
          if (FunGuyRunTick < 0) {
            if (door1Open == false) {
              //gameover
              this.scene.start('Gameplay');
            }
            else if (door1Open == false) {
              FunGuyRunTick = 300;
            }
          }
    }

    updateTimer() {
        //console.log("C1 updateTimer called");
        // Update the global timer
        globalTimer--;
        FunGuyRunTick --;
        moveTick --;
        // console.log("dec");
        // console.log(globalTimer);
      }

      updatePower() {
        globalPower--;
      }

      setRandomBool() {
        // Create an array of boolean variables
        var boolArray = [bool1, bool2, bool3, bool4, bool5, bool6, bool7];
    
        // Randomly select an index
        var randomIndex = Phaser.Math.Between(0, boolArray.length - 1);
    
        // Set all booleans to false
        boolArray = boolArray.map(function () {
            return false;
        });
    
        // Set the randomly selected boolean to true
        boolArray[randomIndex] = true;
    
        // Update the original boolean variables
        bool1 = boolArray[0];
        bool2 = boolArray[1];
        bool3 = boolArray[2];
        bool4 = boolArray[3];
        bool5 = boolArray[4];
        bool6 = boolArray[5];
        bool7 = boolArray[6];
    
        // Define the rules for the next valid booleans based on the current state
        var validNextBools = {
            bool1: [bool7, bool6, bool5],
            bool2: [bool6, bool4],
            bool3: [bool7],
            bool4: [bool2],
            bool5: [bool1, bool6],
            bool6: [bool1, bool5, bool2],
            bool7: [bool3, bool1],
        };
    
        // Check and update the next valid booleans based on the rules
        var nextValidBools = validNextBools["bool" + (randomIndex + 1)];
        nextValidBools.forEach(function (nextBool, index) {
            boolArray[index] = nextBool;
        });
    
        // Update the original boolean variables after considering the rules
        bool1 = boolArray[0];
        bool2 = boolArray[1];
        bool3 = boolArray[2];
        bool4 = boolArray[3];
        bool5 = boolArray[4];
        bool6 = boolArray[5];
        bool7 = boolArray[6];

        console.log(bool1);
        console.log(bool2);
        console.log(bool3);
        console.log(bool4);
        console.log(bool5);
        console.log(bool6);
        console.log(bool7);
    
        moveTick = 150; // Could set to random move time
    }

    createMapButtons() {
        const mapText = this.add.text(1580, 670, 'Map:');
        this.setMapSizes(mapText);

        const buttons = [
            { x: 1600, y: 840, scene: 'C1' },
            { x: 1800, y: 840, scene: 'C2' },
            { x: 1550, y: 940, scene: 'C3' },
            { x: 1750, y: 940, scene: 'C4' },
            { x: 1600, y: 740, scene: 'C5' },
            { x: 1700, y: 840, scene: 'C6' },
            { x: 1500, y: 840, scene: 'C7' },
            { x: 1650, y: 940, scene: 'Gameplay' },
        ];

        buttons.forEach(({ x, y, scene }) => {
            const button = this.add.image(x, y, 'cam');
            this.setMapSizes(button);
            button.on('pointerdown', () => this.scene.start(scene));
        });

        const you = this.add.image(1650, 940, 'cam');
        this.setMapSizes(you);
        you.on('pointerdown', () => this.scene.start('Gameplay'));
    }

    update() {
        this.updateTimer();

        this.updatePower();

        if (moveTick < 0) {
            this.setRandomBool();
        }
    }
}

class C5 extends CustomScene {
    constructor() {
        super('C5', 'H1Room');
    }

    preload() {
        super.preload();

        this.load.image('funGuy', 'funGuyMob.png');
    }

    create() {
        super.create();
    
        this.funGuyPhase1 = this.add.image(500, 500, 'funGuy');
        this.setMapSizes(this.funGuyPhase1);
        this.funGuyPhase1.setVisible(true);

        this.funGuyPhase2 = this.add.image(800, 700, 'funGuy');
        this.setMapSizes(this.funGuyPhase2);
        this.funGuyPhase2.setVisible(false);
        this.funGuyPhase2.setScale(2);

        this.funGuyPhase3 = this.add.image(600, 900, 'funGuy');
        this.setMapSizes(this.funGuyPhase3);
        this.funGuyPhase3.setVisible(false);
        this.funGuyPhase3.setScale(9);

        // console.log(FunGuyRunTick);
        // console.log(moveTick);
        FunGuyRunTick += 90;
    }

    update() {
        this.updateTimer();

        this.updatePower();

        this.funGuyRun();

        if (globalPower < 0) {
            this.scene.start('Gameplay');
        }

        if (FunGuyRunTick < 50) {
            this.run.play();
          }

        // console.log(FunGuyRunTick);
        if (FunGuyRunTick < 500) {
            this.funGuyPhase1.setVisible(false);
            this.funGuyPhase2.setVisible(true);
            this.funGuyPhase3.setVisible(false);
        }
        
        if (FunGuyRunTick < 300) {
            this.funGuyPhase1.setVisible(false);
            this.funGuyPhase2.setVisible(false);
            this.funGuyPhase3.setVisible(true);
        }

        if (FunGuyRunTick > 500) {
            this.funGuyPhase1.setVisible(true);
            this.funGuyPhase2.setVisible(false);
            this.funGuyPhase3.setVisible(false);
        }
    }
}

class C2 extends CustomScene {
    constructor() {
        super('C2', 'H2RoomStage');
    }

    preload() {
        super.preload();
        this.load.image('other', 'OtherMushroom.png');
    }

    create() {

        super.create();

        this.other = this.add.image(500, 500, 'other');
        this.other.setVisible(false);
        this.other.setScale(4);
    }

    update() {
        if (bool2) {
            this.other.setVisible(true);
        }
        else {
            this.other.setVisible(false);
        }

        if (FunGuyRunTick < 50) {
            this.run.play();
          }

        this.funGuyRun();

        this.updateTimer();

        this.updatePower();

        if (globalPower < 0) {
            this.scene.start('Gameplay');
        }

        if (moveTick < 0) {
            this.setRandomBool();
        }
    }
}

class C3 extends CustomScene {
    constructor() {
        super('C3', 'graveyard');
    }

    preload() {
        super.preload();
        this.load.image('other', 'OtherMushroom.png');
    }

    create() {

        super.create();

        this.other = this.add.image(500, 500, 'other');
        this.other.setVisible(false);
        this.other.setScale(4);
    }

    update() {
        if (bool3) {
            this.other.setVisible(true);
        }
        else {
            this.other.setVisible(false);
        }

        if (FunGuyRunTick < 50) {
            this.run.play();
          }

        this.updateTimer();

        this.updatePower();

        this.funGuyRun();

        if (globalPower < 0) {
            this.scene.start('Gameplay');
        }

        if (moveTick < 0) {
            this.setRandomBool();
        }
    }
}

class C4 extends CustomScene {
    constructor() {
        super('C4', 'pond');
    }

    preload() {
        super.preload();
        this.load.image('other', 'OtherMushroom.png');
    }

    create() {

        super.create();

        this.other = this.add.image(500, 500, 'other');
        this.other.setVisible(false);
        this.other.setScale(4);
    }

    update() {
        if (bool4) {
            this.other.setVisible(true);
        }
        else {
            this.other.setVisible(false);
        }

        if (FunGuyRunTick < 50) {
            this.run.play();
          }

        this.updateTimer();

        this.funGuyRun();

        this.updatePower();

        if (globalPower < 0) {
            this.scene.start('Gameplay');
        }

        if (moveTick < 0) {
            this.setRandomBool();
        }
    }
}

class C1 extends CustomScene {
    constructor() {
        super('C1', 'fairyCircle');
    }

    preload() {
        super.preload();
        this.load.image('other', 'OtherMushroom.png');
    }

    create() {

        super.create();

        this.other = this.add.image(500, 500, 'other');
        this.other.setVisible(false);
        this.other.setScale(4);
    }

    update() {
        if (bool5) {
            this.other.setVisible(true);
        }
        else {
            this.other.setVisible(false);
        }

        if (FunGuyRunTick < 50) {
            this.run.play();
          }

        this.updateTimer();

        this.updatePower();

        this.funGuyRun();

        if (globalPower < 0) {
            this.scene.start('Gameplay');
        }

        if (moveTick < 0) {
            this.setRandomBool();
        }
    }
}

class C6 extends CustomScene {
    constructor() {
        super('C6', 'H1');
    }

    preload() {
        super.preload();
        this.load.image('other', 'OtherMushroom.png');
    }

    create() {

        super.create();

        this.other = this.add.image(500, 500, 'other');
        this.other.setVisible(false);
        this.other.setScale(4);
    }

    update() {
        if (bool6) {
            this.other.setVisible(true);
        }
        else {
            this.other.setVisible(false);
        }

        this.updateTimer();

        this.updatePower();

        this.funGuyRun();

        if (globalPower < 0) {
            this.scene.start('Gameplay');
        }

        if (FunGuyRunTick < 50) {
            this.run.play();
          }

        if (moveTick < 0) {
            this.setRandomBool();
        }
    }
}

class C7 extends CustomScene {
    constructor() {
        super('C7', 'H2');
    }

    preload() {
        super.preload();
        this.load.image('other', 'OtherMushroom.png');
    }

    create() {

        super.create();

        this.other = this.add.image(500, 500, 'other');
        this.other.setVisible(false);
        this.other.setScale(4);
    }

    update() {
        if (bool7) {
            this.other.setVisible(true);
        }
        else {
            this.other.setVisible(false);
        }

        if (FunGuyRunTick < 50) {
            this.run.play();
          }

        this.updateTimer();

        this.updatePower();

        this.funGuyRun();

        if (globalPower < 0) {
            this.scene.start('Gameplay');
        }

        if (moveTick < 0) {
            this.setRandomBool();
        }
    }
}