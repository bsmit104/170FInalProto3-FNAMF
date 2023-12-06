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

    onTimerTick() {
        totalTimeInSeconds--;
    
        // Update timer text
        this.timerText.setText(this.formatTime(totalTimeInSeconds));
    
        if (totalTimeInSeconds <= 0) {
            // Player wins when the timer reaches 0
            this.playerWins();
        }
    }
    
    formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var seconds = seconds % 60;
        
        // Ensure two-digit formatting
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
    
        return minutes + ':' + seconds;
    }
    
    playerWins() {
        // Add your player win logic here
        console.log('Player wins!');
        
        // Stop the timer
        this.timer.destroy();
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
        
        ////////////////////Timer//////////////////////////
        this.timerText = this.add.text(600, 600, this.formatTime(totalTimeInSeconds), { fontSize: '100px', fill: '#FFFFFF' });
        this.timerText.setDepth(1);

        this.timer = this.time.addEvent({
            delay: 1000, // 1000 milliseconds = 1 second
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        });
        ///////////////////////////////////////////////////

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