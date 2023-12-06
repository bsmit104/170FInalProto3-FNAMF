class Gameplay extends Phaser.Scene {
  constructor() {
    super("Gameplay");
  }

  preload() {
    this.load.path = "./assets/";
    this.load.image("office", "Office.png");
    this.load.image("cam", "camera.png");
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

    const background = this.add.image(960, 540, "office").setOrigin(0.5, 0.5);
    background.setScale(5.2);
    ///////////////////////////////////////////////////////

    ////////////////////Timer//////////////////////////
    // this.timerText = this.add.text(600, 600, 'Timer: ' + globalTimer.toFixed(2), { fontSize: '100px', fill: '#FFFFFF' });
    this.timerText = this.add.text(600, 600, 'Timer: ' + globalTimer, { fontSize: '100px', fill: '#FFFFFF' });

    this.updateTimer();

    // Create a timer event that repeats every second
    this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });
  }

  updateTimer() {
    // Update the global timer
    globalTimer--;

    // Update the text content to display the updated timer value
    // this.timerText.setText("Timer: " + globalTimer.toFixed(2));
    this.timerText.setText("Timer: " + this.formatTime(globalTimer));
  }

  update() {
    // Update the global timer
    // console.log(globalTimer);
    // // globalTimer -= this.time.deltaTime / 1000;
    // let deltaTime = this.time.deltaTime / 1000;

    // // Update the global timer
    // globalTimer -= deltaTime;

    // Update the text content to display the updated timer value
    //this.timerText.setText("Timer: " + globalTimer.toFixed(2));

    this.cameras.main.centerOnX(this.input.activePointer.x);

    if (cursors.down.isDown) {
      this.scene.start(lastCam);
    }
  }

  formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let formattedTime = minutes.toString().padStart(2, '0') + ':' + remainingSeconds.toFixed(2);
    
    // Remove trailing '.00' if present
    if (formattedTime.endsWith('.00')) {
      formattedTime = formattedTime.substring(0, formattedTime.length - 3);
    }

    return formattedTime;
  }
}
