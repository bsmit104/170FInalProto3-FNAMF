class C3 extends Phaser.Scene {
    constructor() {
        super('C3');
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("graveyard", "graveyard.png");
        this.load.image("cam", "camera.png");
    }
  
    setMapSizes(x) {
      x.setScale(1.5);
      x.setDepth(1);
      x.setInteractive();
    }

    create() {
        lastCam = "C3";
        //////////Initial game movement and set up////////////
        this.cameras.main.setBackgroundColor('#000000');

        cursors = this.input.keyboard.createCursorKeys();

        const background = this.add.image(960, 540, 'graveyard').setOrigin(0.5, 0.5);
        background.setScale(4.2);
        ///////////////////////////////////////////////////////
               //////////////map/////////////////
               let mapText = this.add.text(1580, 670, 'Map:');
               this.setMapSizes(mapText);
               let cam1 = this.add.image(1600, 840, 'cam');
               let cam2 = this.add.image(1800, 840, 'cam');
               let cam3 = this.add.image(1550, 940, 'cam');
               let cam4 = this.add.image(1750, 940, 'cam');
               let cam5 = this.add.image(1600, 740, 'cam');
               let cam6 = this.add.image(1700, 840, 'cam');
               let cam7 = this.add.image(1500, 840, 'cam');
               let you = this.add.image(1650, 940, 'cam');
               this.setMapSizes(cam1);
               this.setMapSizes(cam2);
               this.setMapSizes(cam3);
               this.setMapSizes(cam4);
               this.setMapSizes(cam5);
               this.setMapSizes(cam6);
               this.setMapSizes(cam7);
               this.setMapSizes(you);
               cam1.on('pointerdown', () => {
                   this.scene.start('C1');
               });
               cam2.on('pointerdown', () => {
                   this.scene.start('C2');
               });
               cam3.on('pointerdown', () => {
                   this.scene.start('C3');
               });
               cam4.on('pointerdown', () => {
                   this.scene.start('C4');
               });
               cam5.on('pointerdown', () => {
                   this.scene.start('C5');
               });
               cam6.on('pointerdown', () => {
                   this.scene.start('C6');
               });
               cam7.on('pointerdown', () => {
                   this.scene.start('C7');
               });
               you.on('pointerdown', () => {
                   this.scene.start('Gameplay');
               });
               if (cursors.down.isDown) {
                   this.scene.start('Gameplay');
               }
               //////////////////////////////////////////////
    }

    update() {
    }
}