class CustomScene extends Phaser.Scene {
  constructor(key, backgroundKey) {
    super(key);
    this.backgroundKey = backgroundKey;
  }

  preload() {
    this.load.path = "./assets/";
    this.load.image("cam", "camera.png");
    this.load.image(this.backgroundKey, `${this.backgroundKey}.png`);
    this.load.audio("run", "funrun.mp3");
    this.load.audio("static", "static.mp3");
    ////might need to remove others
    this.load.image("other", "OtherMushroom.png");
    this.load.image("angel", "angel.png");
  }

  setMapSizes(x) {
    x.setScale(1.5);
    x.setDepth(1);
    x.setInteractive();
  }

  create() {
    this.static = this.sound.add('static');
    // this.static.stop();
    this.sound.stopAll();
    this.static.play();
    this.static.loop = true;

    this.run = this.sound.add("run");

    lastCam = this.scene.key;

    this.cameras.main.setBackgroundColor("#000000");
    cursors = this.input.keyboard.createCursorKeys();

    this.otherJump = this.add.image(700, 500, "other");
    this.otherJump.setVisible(false);
    this.otherJump.setScale(20);

    this.angelJump = this.add.image(600, 500, "other");
    this.angelJump.setVisible(false);
    this.angelJump.setScale(20);

    const background = this.add
      .image(960, 540, this.backgroundKey)
      .setOrigin(0.5, 0.5);
    background.setScale(4.2);

    this.createMapButtons();

    if (cursors.down.isDown) {
      this.scene.start("Gameplay");
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
      loop: false,
    });

    this.time.addEvent({
      delay: 1000,
      callback: () => this.updateTimer(),
      callbackScope: this,
      loop: false,
    });
  }

  funGuyRun() {
    // console.log(FunGuyRunTick);
    if (FunGuyRunTick < 0) {
      if (door1Open == false) {
        //gameover
        this.scene.start("Gameplay");
      } else if (door1Open == false) {
        FunGuyRunTick = 300;
      }
    }
  }

  newGame() {
    newG = true;
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    this.add.text(centerX + 450, centerY + 50, "You Died", {
      fontSize: "100px",
      fill: "#fff",
    });
    const playText = this.add.text(centerX + 450, centerY + 250, "PLAY AGAIN", {
      fontSize: "100px",
      fill: "#fff",
    });
    playText.setInteractive();
    playText.on("pointerover", () => {
      playText.setStyle({ fill: "#3944BC" });
    });
    playText.on("pointerout", () => {
      playText.setStyle({ fill: "#fff" });
    });
    playText.on("pointerdown", () => {
      lastCam = "C1";
      globalTimer = 20000; //240
      globalPower = 15000;
      FunGuyRunTick = 6000;
      moveTick = 2000;
      door1Open = true;
      door2Open = true;
      light1On = false;
      light2On = false;
      bool1 = false;
      bool2 = true;
      bool3 = false;
      bool4 = false;
      bool5 = false;
      bool6 = false;
      bool7 = false;
      screamOnce = true;
      this.scene.start("Gameplay");
    });
  }

  MovinShrooms() {
    if (bool5 == true) {
      if (door1Open == false) {
        //wait 3 seconds
        const attackprob = [1000, 2000, 3000][Math.floor(Math.random() * 3)];
        setTimeout(() => {
          if (door1Open == false) {
            this.otherJump.setVisible(true);
            if (screamOnce) {
              this.scream.play();
            }
            screamOnce = false;
            this.newGame();
            /////add game reset button
            /////reset game values
            /////jump scare sound
          }
        }, attackprob);
      }
    }

    if (bool1 == true) {
      if (door2Open == false) {
        //wait 3 seconds
        const attackprob = [1000, 2000, 3000, 4000, 5000][
          Math.floor(Math.random() * 5)
        ];
        setTimeout(() => {
          if (door1Open == false) {
            this.angelJump.setVisible(true);
            if (screamOnce) {
              this.scream.play();
            }
            screamOnce = false;
            this.newGame();
            /////add game reset button
            /////reset game values
            /////jump scare sound
          }
        }, attackprob);
      }
    }
  }

  updateTimer() {
    //console.log("C1 updateTimer called");
    // Update the global timer
    globalTimer--;
    FunGuyRunTick--;
    moveTick--;
    // console.log("dec");
    // console.log(globalTimer);
  }

  updatePower() {
    globalPower--;
  }

  setRandomBool() {
    if (bool1) {
      boolArray = [bool7, bool6, bool5];
      randomIndex = Phaser.Math.Between(0, boolArray.length - 1);
      if (randomIndex == 0) {
        bool1 = false;
        bool2 = false;
        bool3 = false;
        bool4 = false;
        bool5 = false;
        bool6 = false;
        bool7 = true;
      } else if (randomIndex == 1) {
        bool1 = false;
        bool2 = false;
        bool3 = false;
        bool4 = false;
        bool5 = false;
        bool6 = true;
        bool7 = false;
      } else {
        bool1 = false;
        bool2 = false;
        bool3 = false;
        bool4 = false;
        bool5 = true;
        bool6 = false;
        bool7 = false;
      }
    } else if (bool2) {
      boolArray = [bool6, bool4];
      randomIndex = Phaser.Math.Between(0, boolArray.length - 1);
      if (randomIndex == 0) {
        bool1 = false;
        bool2 = false;
        bool3 = false;
        bool4 = false;
        bool5 = false;
        bool6 = true;
        bool7 = false;
      } else {
        bool1 = false;
        bool2 = false;
        bool3 = false;
        bool4 = true;
        bool5 = false;
        bool6 = false;
        bool7 = false;
      }
    } else if (bool3) {
      // boolArray = [bool7];
      bool1 = false;
      bool2 = false;
      bool3 = false;
      bool4 = false;
      bool5 = false;
      bool6 = false;
      bool7 = true;
    } else if (bool4) {
      // boolArray = [bool2];
      bool1 = false;
      bool2 = true;
      bool3 = false;
      bool4 = false;
      bool5 = false;
      bool6 = false;
      bool7 = false;
    } else if (bool5) {
      boolArray = [bool1, bool6];
      randomIndex = Phaser.Math.Between(0, boolArray.length - 1);
      if (randomIndex == 0) {
        bool1 = true;
        bool2 = false;
        bool3 = false;
        bool4 = false;
        bool5 = false;
        bool6 = false;
        bool7 = false;
      } else {
        bool1 = false;
        bool2 = false;
        bool3 = false;
        bool4 = false;
        bool5 = false;
        bool6 = true;
        bool7 = false;
      }
    } else if (bool6) {
      boolArray = [bool1, bool5, bool2];
      randomIndex = Phaser.Math.Between(0, boolArray.length - 1);
      if (randomIndex == 0) {
        bool1 = true;
        bool2 = false;
        bool3 = false;
        bool4 = false;
        bool5 = false;
        bool6 = false;
        bool7 = false;
      } else if (randomIndex == 1) {
        bool1 = false;
        bool2 = false;
        bool3 = false;
        bool4 = false;
        bool5 = true;
        bool6 = false;
        bool7 = false;
      } else {
        bool1 = false;
        bool2 = true;
        bool3 = false;
        bool4 = false;
        bool5 = false;
        bool6 = false;
        bool7 = false;
      }
    } else if (bool7) {
      boolArray = [bool3, bool1];
      randomIndex = Phaser.Math.Between(0, boolArray.length - 1);
      if (randomIndex == 0) {
        bool1 = false;
        bool2 = false;
        bool3 = true;
        bool4 = false;
        bool5 = false;
        bool6 = false;
        bool7 = false;
      } else {
        bool1 = true;
        bool2 = false;
        bool3 = false;
        bool4 = false;
        bool5 = false;
        bool6 = false;
        bool7 = false;
      }
    }

    console.log(bool1);
    console.log(bool2);
    console.log(bool3);
    console.log(bool4);
    console.log(bool5);
    console.log(bool6);
    console.log(bool7);

    moveTick = 2000; // Could set to random move time
  }

  createMapButtons() {
    const mapText = this.add.text(1580, 670, "Map:");
    this.setMapSizes(mapText);

    const buttons = [
      { x: 1600, y: 840, scene: "C1" },
      { x: 1800, y: 840, scene: "C2" },
      { x: 1550, y: 940, scene: "C3" },
      { x: 1750, y: 940, scene: "C4" },
      { x: 1600, y: 740, scene: "C5" },
      { x: 1700, y: 840, scene: "C6" },
      { x: 1500, y: 840, scene: "C7" },
      { x: 1650, y: 940, scene: "Gameplay" },
    ];

    buttons.forEach(({ x, y, scene }) => {
      const button = this.add.image(x, y, "cam");
      this.setMapSizes(button);
      button.on("pointerdown", () => this.scene.start(scene));
    });

    const you = this.add.image(1650, 940, "cam");
    this.setMapSizes(you);
    // you.on("pointerdown", () => this.scene.start("Gameplay"));
    you.on('pointerdown', () => {
      this.scene.start('Gameplay');
  });
  }

  update() {
    this.updateTimer();

    this.updatePower();

    this.MovinShrooms();

    if (moveTick < 0) {
      this.setRandomBool();
    }
  }
}

class C5 extends CustomScene {
  constructor() {
    super("C5", "FunguySpawnRoom");
  }

  preload() {
    super.preload();
    //this.load.path = "./assets/";
    this.load.image("funGuy", "FunGuyMob.png");
  }

  create() {
    super.create();

    this.funGuyPhase1 = this.add.image(500, 500, "funGuy");
    this.setMapSizes(this.funGuyPhase1);
    this.funGuyPhase1.setVisible(true);

    this.funGuyPhase2 = this.add.image(800, 700, "funGuy");
    this.setMapSizes(this.funGuyPhase2);
    this.funGuyPhase2.setVisible(false);
    this.funGuyPhase2.setScale(2);

    this.funGuyPhase3 = this.add.image(600, 900, "funGuy");
    this.setMapSizes(this.funGuyPhase3);
    this.funGuyPhase3.setVisible(false);
    this.funGuyPhase3.setScale(9);

    // console.log(FunGuyRunTick);
    // console.log(moveTick);
    FunGuyRunTick += 500;
  }

  update() {
    this.updateTimer();

    this.updatePower();

    this.funGuyRun();

    this.MovinShrooms();

    if (globalPower < 0) {
      this.scene.start("Gameplay");
    }

    if (FunGuyRunTick < 500) {
      if (runOnce) {
        runOnce = false;
        this.run.play();
      }
    }

    // console.log(FunGuyRunTick);
    if (FunGuyRunTick < 5000) {
      this.funGuyPhase1.setVisible(false);
      this.funGuyPhase2.setVisible(true);
      this.funGuyPhase3.setVisible(false);
    }

    if (FunGuyRunTick < 3000) {
      this.funGuyPhase1.setVisible(false);
      this.funGuyPhase2.setVisible(false);
      this.funGuyPhase3.setVisible(true);
    }

    if (FunGuyRunTick > 7000) {
      this.funGuyPhase1.setVisible(true);
      this.funGuyPhase2.setVisible(false);
      this.funGuyPhase3.setVisible(false);
    }
  }
}

class C2 extends CustomScene {
  constructor() {
    super("C2", "OtherSpawnRoom");
  }

  preload() {
    super.preload();
    //this.load.path = "./assets/";
    this.load.image("other", "OtherMushroom.png");
    this.load.image("angel", "angel.png");
  }

  create() {
    super.create();

    this.other = this.add.image(500, 500, "other");
    this.other.setVisible(false);
    this.other.setScale(4);

    this.angel = this.add.image(800, 900, "angel");
    this.angel.setVisible(false);
    this.angel.setScale(4);
  }

  update() {
    if (bool2) {
      this.other.setVisible(true);
    } else {
      this.other.setVisible(false);
    }

    if (bool7) {
      this.angel.setVisible(true);
    } else {
      this.angel.setVisible(false);
    }

    if (FunGuyRunTick < 500) {
      if (runOnce) {
        runOnce = false;
        this.run.play();
      }
    }

    this.funGuyRun();

    this.updateTimer();

    this.MovinShrooms();

    this.updatePower();

    if (globalPower < 0) {
      this.scene.start("Gameplay");
    }

    if (moveTick < 0) {
      this.setRandomBool();
    }
  }
}

class C3 extends CustomScene {
  constructor() {
    super("C3", "StorageRoom");
  }

  preload() {
    super.preload();
    //this.load.path = "./assets/";
    this.load.image("other", "OtherMushroom.png");
    this.load.image("angel", "angel.png");
  }

  create() {
    super.create();

    this.other = this.add.image(500, 500, "other");
    this.other.setVisible(false);
    this.other.setScale(4);

    this.angel = this.add.image(800, 900, "angel");
    this.angel.setVisible(false);
    this.angel.setScale(4);
  }

  update() {
    if (bool3) {
      this.other.setVisible(true);
    } else {
      this.other.setVisible(false);
    }

    if (bool4) {
      this.angel.setVisible(true);
    } else {
      this.angel.setVisible(false);
    }

    if (FunGuyRunTick < 500) {
      if (runOnce) {
        runOnce = false;
        this.run.play();
      }
    }

    this.updateTimer();

    this.updatePower();

    this.funGuyRun();

    this.MovinShrooms();

    if (globalPower < 0) {
      this.scene.start("Gameplay");
    }

    if (moveTick < 0) {
      this.setRandomBool();
    }
  }
}

class C4 extends CustomScene {
  constructor() {
    super("C4", "H2RoomStage2");
  }

  preload() {
    super.preload();
    //this.load.path = "./assets/";
    this.load.image("other", "OtherMushroom.png");
    this.load.image("angel", "angel.png");
  }

  create() {
    super.create();

    this.other = this.add.image(500, 500, "other");
    this.other.setVisible(false);
    this.other.setScale(4);

    this.angel = this.add.image(800, 900, "angel");
    this.angel.setVisible(false);
    this.angel.setScale(4);
  }

  update() {
    if (bool4) {
      this.other.setVisible(true);
    } else {
      this.other.setVisible(false);
    }

    if (bool3) {
      this.angel.setVisible(true);
    } else {
      this.angel.setVisible(false);
    }

    if (FunGuyRunTick < 500) {
      if (runOnce) {
        runOnce = false;
        this.run.play();
      }
    }

    this.updateTimer();

    this.funGuyRun();

    this.MovinShrooms();

    this.updatePower();

    if (globalPower < 0) {
      this.scene.start("Gameplay");
    }

    if (moveTick < 0) {
      this.setRandomBool();
    }
  }
}

class C1 extends CustomScene {
  constructor() {
    super("C1", "ArcadeRoom");
  }

  preload() {
    super.preload();
    //this.load.path = "./assets/";
    this.load.image("other", "OtherMushroom.png");
    this.load.image("angel", "angel.png");
  }

  create() {
    super.create();

    this.other = this.add.image(500, 500, "other");
    this.other.setVisible(false);
    this.other.setScale(4);

    this.angel = this.add.image(800, 900, "angel");
    this.angel.setVisible(false);
    this.angel.setScale(4);
  }

  update() {
    if (bool5) {
      this.other.setVisible(true);
    } else {
      this.other.setVisible(false);
    }

    if (bool1) {
      this.angel.setVisible(true);
    } else {
      this.angel.setVisible(false);
    }

    if (FunGuyRunTick < 500) {
      if (runOnce) {
        runOnce = false;
        this.run.play();
      }
    }

    this.updateTimer();

    this.updatePower();

    this.MovinShrooms();

    this.funGuyRun();

    if (globalPower < 0) {
      this.scene.start("Gameplay");
    }

    if (moveTick < 0) {
      this.setRandomBool();
    }
  }
}

class C6 extends CustomScene {
  constructor() {
    super("C6", "Playground");
  }

  preload() {
    super.preload();
    //this.load.path = "./assets/";
    this.load.image("other", "OtherMushroom.png");
    this.load.image("angel", "angel.png");
  }

  create() {
    super.create();

    this.other = this.add.image(500, 500, "other");
    this.other.setVisible(false);
    this.other.setScale(4);

    this.angel = this.add.image(800, 900, "angel");
    this.angel.setVisible(false);
    this.angel.setScale(4);
  }

  update() {
    if (bool6) {
      this.other.setVisible(true);
    } else {
      this.other.setVisible(false);
    }

    if (bool5) {
      this.angel.setVisible(true);
    } else {
      this.angel.setVisible(false);
    }

    this.updateTimer();

    this.updatePower();

    this.MovinShrooms();

    this.funGuyRun();

    if (globalPower < 0) {
      this.scene.start("Gameplay");
    }

    if (FunGuyRunTick < 500) {
      if (runOnce) {
        runOnce = false;
        this.run.play();
      }
    }

    if (moveTick < 0) {
      this.setRandomBool();
    }
  }
}

class C7 extends CustomScene {
  constructor() {
    super("C7", "H1Room");
  }

  preload() {
    super.preload();
    //this.load.path = "./assets/";
    this.load.image("other", "OtherMushroom.png");
    this.load.image("angel", "angel.png");
  }

  create() {
    super.create();

    this.other = this.add.image(500, 500, "other");
    this.other.setVisible(false);
    this.other.setScale(4);

    this.angel = this.add.image(800, 900, "angel");
    this.angel.setVisible(false);
    this.angel.setScale(4);
  }

  update() {
    if (bool7) {
      this.other.setVisible(true);
    } else {
      this.other.setVisible(false);
    }

    if (bool2) {
      this.angel.setVisible(true);
    } else {
      this.angel.setVisible(false);
    }

    if (FunGuyRunTick < 500) {
      if (runOnce) {
        runOnce = false;
        this.run.play();
      }
    }

    this.updateTimer();

    this.updatePower();

    this.MovinShrooms();

    this.funGuyRun();

    if (globalPower < 0) {
      this.scene.start("Gameplay");
    }

    if (moveTick < 0) {
      this.setRandomBool();
    }
  }
}
