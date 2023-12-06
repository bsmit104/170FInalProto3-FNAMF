class Gameplay extends Phaser.Scene {
    constructor() {
        super('Gameplay');
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
        this.cameras.main.setBackgroundColor('#000000');

        this.cameras.main.setBounds(-300, 0, 2500, 1080);

        cursors = this.input.keyboard.createCursorKeys();
       
        const cursor = this.input.activePointer;

        this.input.on('pointermove', function (pointer) {
            cursor.x = pointer.x;
        });

        const background = this.add.image(960, 540, 'office').setOrigin(0.5, 0.5);
        background.setScale(5.2);
        ///////////////////////////////////////////////////////
        
        //////////////////////////////////////////////

    }

    update() {
        this.cameras.main.centerOnX(this.input.activePointer.x);

        if (cursors.down.isDown) {
            this.scene.start(lastCam);
        }
        // if (cursors.left.isDown) {
        //     this.cameras.main.scrollX -= 50;
        // } else if (cursors.right.isDown) {
        //     this.cameras.main.scrollX += 50;
        // }
    }
}