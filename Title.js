class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image('title', 'title.png');
    }
    create() {
        this.cameras.main.setBackgroundColor('#000000');
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        this.titleob = this.add.image(
            centerX,//x
            centerY - 200,//y
            'title',//imagename
            )
            this.titleob.setScale(3) //resize
        const playText = this.add.text(centerX - 130, centerY + 150, 'PLAY', { fontSize: '100px', fill: '#fff' });
        playText.setInteractive();
        playText.on('pointerover', () => {
            playText.setStyle({ fill: '#3944BC' });
        });
        playText.on('pointerout', () => {
            playText.setStyle({ fill: '#fff' });
        });
        playText.on('pointerdown', () => {
            this.scene.start('Gameplay');
        });
        this.tweens.add({
            targets: this.titleob,
            x: '+=' + 50,
            repeat: 2,
            yoyo: true,
            ease: 'Sine.inOut',
            duration: 100
        });
    }
    update() {

    }
}