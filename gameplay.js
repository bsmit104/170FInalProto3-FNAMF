///////////////////DOOR LOGIC IS SWAPPED OPEN = TRUE is CLOSED/////////////////
class Gameplay extends Phaser.Scene {
  constructor() {
    super("Gameplay");
  }

  preload() {
    this.load.path = "./assets/";
    this.load.image("office", "PlayerRoom2.png");
    this.load.image("cam", "camera.png");
    this.load.image("door", "H1Door.png");
    this.load.image("button", "amanita.png");
    this.load.image("light", "DoorOpen.png");
    this.load.image("funGuy", "FunGuyMob.png");
    this.load.image("dark", "lightsOff.png");
    this.load.image("other", "OtherMushroom.png");
    this.load.image("angel", "angel.png");
    this.load.audio("scream", "monsterScream.mp3");
    this.load.audio("run", "funrun.mp3");
    this.load.audio("fan", "fan.mp3");
  }

  setMapSizes(x) {
    x.setScale(1.5);
    x.setDepth(1);
    x.setInteractive();
  }

  create() {
    this.fan = this.sound.add('fan');
    this.sound.stopAll();
    this.fan.play();
    this.fan.loop = true;

    this.scream = this.sound.add("scream");
    this.run = this.sound.add("run");

    if (newG) {
      lastCam = "C1";
      globalTimer = 30000; //240
      globalPower = 15000;
      FunGuyRunTick = 10000;
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
      newG = false;
    }

    door1Open = false;
    door2Open = false;
    light2On = false;
    light1On = false;
    //////////Initial game movement and set up////////////
    this.cameras.main.setBackgroundColor("#000000");

    this.cameras.main.setBounds(-300, 0, 2500, 1080);

    cursors = this.input.keyboard.createCursorKeys();

    const cursor = this.input.activePointer;

    this.input.on("pointermove", function (pointer) {
      cursor.x = pointer.x;
    });

    this.background = this.add.image(960, 640, "office").setOrigin(0.5, 0.5);
    this.background.setScale(4.2);
    this.background.setVisible(true);

    this.darkbackground = this.add.image(960, 640, "dark").setOrigin(0.5, 0.5);
    this.darkbackground.setScale(4.2);
    this.darkbackground.setVisible(false);
    ///////////////////////////////////////////////////////

    ////////////////////Timer//////////////////////////
    this.timerText = this.add.text(600, 600, "Timer: " + globalTimer, {
      fontSize: "100px",
      fill: "#FFFFFF",
    });
    this.PowerText = this.add.text(600, 700, "Power: " + globalPower, {
      fontSize: "100px",
      fill: "#FFFFFF",
    });

    this.add.text(1300, 1000, "down key for cams", {
      fontSize: "35px",
      fill: "#FFFFFF",
    });
    this.add.text(1300, 950, "blue squares for door and lights", {
      fontSize: "35px",
      fill: "#FFFFFF",
    });
    this.add.text(1300, 900, "monitor mushrooms, close doors 4 safety", {
      fontSize: "35px",
      fill: "#FFFFFF",
    });
    this.add.text(1300, 850, "grey squares to switch cams", {
      fontSize: "35px",
      fill: "#FFFFFF",
    });

    this.time.addEvent({
      delay: 1000,
      callback: () => this.updateTimer(),
      callbackScope: this,
      loop: false,
    });

    door1 = this.createDoor(95, 335, 3, "door");
    door2 = this.createDoor(1875, 335, 3, "door");

    light1 = this.createDoor(95, 335, 1, "light");
    light2 = this.createDoor(1875, 335, 1, "light");

    this.createButton(100, 100, door1);
    this.createButton(1800, 100, door2);

    this.createButton(200, 100, light1);
    this.createButton(1900, 100, light2);

    /////////////jumpscares/////////////////
    this.funGuyJump = this.add.image(500, 500, "funGuy");
    this.funGuyJump.setVisible(false);
    this.funGuyJump.setScale(20);

    this.otherJump = this.add.image(700, 500, "other");
    this.otherJump.setVisible(false);
    this.otherJump.setScale(20);

    this.angelJump = this.add.image(600, 500, "other");
    this.angelJump.setVisible(false);
    this.angelJump.setScale(20);

    this.other = this.add.image(1875, 335, "other");
    this.other.setVisible(false);
    this.other.setScale(4);
    this.other.setDepth(2);

    this.angel = this.add.image(95, 335, "angel");
    this.angel.setVisible(false);
    this.angel.setScale(4);
    this.angel.setDepth(2);
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

    moveTick = 150; // Could set to random move time
  }

  createDoor(x, y, z, k) {
    const door = this.add.image(x, y, k).setInteractive();
    door.setVisible(false);
    door.setScale(4);
    door.setDepth(z);
    return door;
  }

  createButton(x, y, door) {
    const button = this.add.image(x, y, "button").setInteractive();
    button.on("pointerdown", () => this.toggleDoor(door), this);
  }

  newGame() {
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
      globalTimer = 30000; //240
      globalPower = 15000;
      FunGuyRunTick = 10000;
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

  updateTimer() {
    globalTimer--;
    FunGuyRunTick--;
    moveTick--;
    // console.log(globalTimer);
    this.timerText.setText("Timer: " + this.formatTime(globalTimer));
  }

  updatePower() {
    globalPower--;
    // console.log(globalTimer);
    this.PowerText.setText("Power: " + globalPower);
  }

  update() {
    this.updateTimer();

    this.cameras.main.centerOnX(this.input.activePointer.x);

    if (cursors.down.isDown) {
      this.fan.stop();
      this.scene.start(lastCam);
    }

    if (FunGuyRunTick < 500) {
      if (runOnce) {
        runOnce = false;
        this.run.play();
      }
    }

    if (globalTimer < 0) {
      this.scene.start("Win");
    }

    // console.log(FunGuyRunTick);
    if (FunGuyRunTick < 0) {
      if (door1Open == false) {
        //gameover
        this.funGuyJump.setVisible(true);
        if (screamOnce) {
          this.scream.play();
        }
        screamOnce = false;
        this.newGame();
        /////add game reset button
        /////reset game values
        /////jump scare sound
      } else if (door1Open == false) {
        FunGuyRunTick = 7000;
      }
    }

    if (bool5 == true) {
      if (light2On == false) {
        this.other.setVisible(true);
      } else {
        this.other.setVisible(false);
      }
      if (door2Open == false) {
        //wait 3 seconds
        const attackprob = [100000, 200000, 300000][Math.floor(Math.random() * 3)];
        setTimeout(() => {
          if (door2Open == false) {
            this.other.setVisible(false);
            this.otherJump.setVisible(true);
            if (screamOnce) {
              this.scream.play();
            }
            screamOnce = false;
            newG = true;
            this.newGame();
            /////add game reset button
            /////reset game values
            /////jump scare sound
          }
        }, attackprob);
      }
    }

    if (bool1 == true) {
      if (light1On == false) {
        this.angel.setVisible(true);
      } else {
        this.angel.setVisible(false);
      }
      if (door1Open == false) {
        //wait 3 seconds
        const attackprob = [90000, 100000, 110000, 120000, 130000][
          Math.floor(Math.random() * 5)
        ];
        setTimeout(() => {
          if (door1Open == false) {
            this.angel.setVisible(false);
            this.angelJump.setVisible(true);
            if (screamOnce) {
              this.scream.play();
            }
            screamOnce = false;
            newG = true;
            this.newGame();
            /////add game reset button
            /////reset game values
            /////jump scare sound
          }
        }, attackprob);
      }
    }

    if (
      door1Open == true ||
      door2Open == true ||
      light1On == true ||
      light2On == true
    ) {
      this.updatePower();
    }

    if (globalPower < 0) {
      this.background.setVisible(false);
      this.darkbackground.setVisible(true);
      door1.setVisible(false);
      door2.setVisible(false);
      light1.setVisible(false);
      light2.setVisible(false);
      door1Open = false;
      door2Open = false;
      light1On = false;
      light2On = false;

      this.input.enabled = false;
      // Enable button interaction when power is greater than or equal to 0
    }

    if (moveTick < 0) {
      this.setRandomBool();
      // console.log("moved");
    }
    // console.log(moveTick);
    // if (FunGuyRunTick < 30) {
    //   //playsound

    // }
  }

  toggleDoor(door) {
    door.setVisible(!door.visible);
    if (door == door1) {
      door1Open = !door1Open;
    } else if (door == door2) {
      door2Open = !door2Open;
    } else if (door == light1) {
      light1On = !light1On;
    } else if (door == light2) {
      light2On = !light2On;
    }
    // console.log(door1Open);
    // console.log(door2Open);
  }

  formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let formattedTime =
      minutes.toString().padStart(2, "0") + ":" + remainingSeconds.toFixed(2);

    if (formattedTime.endsWith(".00")) {
      formattedTime = formattedTime.substring(0, formattedTime.length - 3);
    }

    return formattedTime;
  }
}
