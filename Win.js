class Win extends Phaser.Scene {
  constructor() {
    super("Win");
  }
  preload() {
    this.load.path = "./assets/";
    this.load.image("title", "title.png");
  }
  create() {
    lastCam = "C1";
    globalTimer = 2000; //240
    globalPower = 500;
    FunGuyRunTick = 600;
    moveTick = 100;
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

    this.cameras.main.setBackgroundColor("#000000");
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    this.titleob = this.add.image(
      centerX, //x
      centerY - 200, //y
      "title" //imagename
    );
    this.titleob.setScale(2); //resize
    this.add.text(centerX - 250, centerY + 50, "You Survived", {
      fontSize: "100px",
      fill: "#fff",
    });
    const playText = this.add.text(centerX - 250, centerY + 250, "PLAY AGAIN", {
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
      this.scene.start("Gameplay");
    });
    this.tweens.add({
      targets: this.titleob,
      x: "+=" + 50,
      repeat: 2,
      yoyo: true,
      ease: "Sine.inOut",
      duration: 100,
    });
  }
  update() {}
}
