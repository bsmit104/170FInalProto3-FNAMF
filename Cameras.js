class CustomScene extends Phaser.Scene {
    constructor(key, backgroundKey) {
        super(key);
        this.backgroundKey = backgroundKey;
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("cam", "camera.png");
        this.load.image(this.backgroundKey, `${this.backgroundKey}.png`);
    }

    setMapSizes(x) {
        x.setScale(1.5);
        x.setDepth(1);
        x.setInteractive();
    }

    create() {
        lastCam = this.scene.key;

        this.cameras.main.setBackgroundColor('#000000');
        cursors = this.input.keyboard.createCursorKeys();

        const background = this.add.image(960, 540, this.backgroundKey).setOrigin(0.5, 0.5);
        background.setScale(4.2);

        this.createMapButtons();

        if (cursors.down.isDown) {
            this.scene.start('Gameplay');
        }
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
        
    }
}

class C1 extends CustomScene {
    constructor() {
        super('C1', 'spawnfor2others');
    }
}

class C2 extends CustomScene {
    constructor() {
        super('C2', 'field');
    }
}

class C3 extends CustomScene {
    constructor() {
        super('C3', 'graveyard');
    }
}

class C4 extends CustomScene {
    constructor() {
        super('C4', 'pond');
    }
}

class C5 extends CustomScene {
    constructor() {
        super('C5', 'fairyCircle');
    }
}

class C6 extends CustomScene {
    constructor() {
        super('C6', 'H1');
    }
}

class C7 extends CustomScene {
    constructor() {
        super('C7', 'H2');
    }
}