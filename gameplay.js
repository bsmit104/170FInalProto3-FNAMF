///////////////////DOOR LOGIC IS SWAPPED OPEN = TRUE is CLOSED/////////////////
class Gameplay extends Phaser.Scene {
  constructor() {
    super("Gameplay");
  }

  preload() {
    this.load.path = "./assets/";
    this.load.image("office", "PlayerRoomLonger.png");
    this.load.image("cam", "camera.png");
    this.load.image("door", "H1Door.png");
    this.load.image("button", "amanita.png");
    this.load.image("light", "DoorOpen.png");
    this.load.image('funGuy', 'funGuyMob.png');
  }

  setMapSizes(x) {
    x.setScale(1.5);
    x.setDepth(1);
    x.setInteractive();
  }

  create() {
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

    const background = this.add.image(960, 640, "office").setOrigin(0.5, 0.5);
    background.setScale(4.2);
    ///////////////////////////////////////////////////////

    ////////////////////Timer//////////////////////////
    this.timerText = this.add.text(600, 600, 'Timer: ' + globalTimer, { fontSize: '100px', fill: '#FFFFFF' });
    this.PowerText = this.add.text(600, 700, 'Power: ' + globalPower, { fontSize: '100px', fill: '#FFFFFF' });

    this.time.addEvent({
      delay: 1000,
      callback: () => this.updateTimer(),
      callbackScope: this,
      loop: false
    });

    door1 = this.createDoor(95, 335, 3, 'door');
    door2 = this.createDoor(1875, 335, 3, 'door');

    light1 = this.createDoor(95, 335, 1, 'light');
    light2 = this.createDoor(1875, 335, 1, 'light');

    this.createButton(100, 100, door1);
    this.createButton(1800, 100, door2);

    this.createButton(200, 100, light1);
    this.createButton(1900, 100, light2);

    /////////////jumpscares/////////////////
    this.funGuyJump = this.add.image(500, 500, 'funGuy');
    this.funGuyJump.setVisible(false);
    this.funGuyJump.setScale(20);
  }

  createDoor(x, y, z, k) {
    const door = this.add.image(x, y, k).setInteractive();
    door.setVisible(false);
    door.setScale(4);
    door.setDepth(z);
    return door;
  }

  createButton(x, y, door) {
    const button = this.add.image(x, y, 'button').setInteractive();
    button.on('pointerdown', () => this.toggleDoor(door), this);
  }

  updateTimer() {
    globalTimer--;
    FunGuyRunTick --;
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
      this.scene.start(lastCam);
    }

    if (FunGuyRunTick < 0) {
      if (door1Open) {
        //gameover
        this.funGuyJump.setVisible(true);
        /////add game reset button
        /////reset game values
        /////jump scare sound
      }
      else if (door1Open == false) {
        FunGuyRunTick = 300;
      }
    }

    if (door1Open == true || door2Open == true || light1On == true || light2On == true) {
      this.updatePower();
    }

    // if (FunGuyRunTick < 30) {
    //   //playsound

    // }
  }

  toggleDoor(door) {
    door.setVisible(!door.visible);
    if (door == door1) {
      door1Open = !door1Open;
    }
    else if (door == door2) {
      door2Open = !door2Open;
    }
    else if (door == light1) {
      light1On = !light1On;
    }
    else if (door == light2) {
      light2On = !light2On;
    }
    console.log(door1Open);
    console.log(door2Open);
  }

  formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let formattedTime = minutes.toString().padStart(2, '0') + ':' + remainingSeconds.toFixed(2);

    if (formattedTime.endsWith('.00')) {
      formattedTime = formattedTime.substring(0, formattedTime.length - 3);
    }

    return formattedTime;
  }
}