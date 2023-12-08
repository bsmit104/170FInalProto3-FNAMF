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
  }

  setMapSizes(x) {
    x.setScale(1.5);
    x.setDepth(1);
    x.setInteractive();
  }

  create() {
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
  }

  createDoor(x, y, z, k) {
    const door = this.add.image(x, y, k).setInteractive();
    door.setVisible(true);
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
    console.log(globalTimer);
    this.timerText.setText("Timer: " + this.formatTime(globalTimer));
  }

  update() {
    this.updateTimer();

    this.cameras.main.centerOnX(this.input.activePointer.x);

    if (cursors.down.isDown) {
      this.scene.start(lastCam);
    }
  }

  toggleDoor(door) {
    door.setVisible(!door.visible);
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