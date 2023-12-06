class TimerManager {
    constructor(scene) {
        this.scene = scene;
        this.totalTimeInSeconds = 240;
        this.timer = null;
        this.timerText = null;
    }

    startTimer() {
        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        });

        // Create timer text
        this.timerText = this.scene.add.text(600, 600, this.formatTime(this.totalTimeInSeconds), { fontSize: '100px', fill: '#FFFFFF' });
        this.timerText.setDepth(1);
    }

    onTimerTick() {
        this.totalTimeInSeconds--;

        // Update timer text
        this.timerText.setText(this.formatTime(this.totalTimeInSeconds));

        if (this.totalTimeInSeconds <= 0) {
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
    }

    isTimerRunning() {
        return this.timer && this.timer.getOverallProgress() > 0;
    }

    stopTimer() {
        if (this.timer) {
            this.timer.destroy();
            this.timerText.destroy();
        }
    }
}


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

    // onTimerTick() {
    //     totalTimeInSeconds--;
    
    //     // Update timer text
    //     this.timerText.setText(this.formatTime(totalTimeInSeconds));
    
    //     if (totalTimeInSeconds <= 0) {
    //         // Player wins when the timer reaches 0
    //         this.playerWins();
    //     }
    // }
    
    // formatTime(seconds) {
    //     var minutes = Math.floor(seconds / 60);
    //     var seconds = seconds % 60;
        
    //     // Ensure two-digit formatting
    //     minutes = (minutes < 10) ? '0' + minutes : minutes;
    //     seconds = (seconds < 10) ? '0' + seconds : seconds;
    
    //     return minutes + ':' + seconds;
    // }
    
    // playerWins() {
    //     // Add your player win logic here
    //     console.log('Player wins!');
        
    //     // Stop the timer
    //     this.timer.destroy();
    // }

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
        // this.timerText = this.add.text(600, 600, this.formatTime(totalTimeInSeconds), { fontSize: '100px', fill: '#FFFFFF' });
        // this.timerText.setDepth(1);

        // this.timer = this.time.addEvent({
        //     delay: 1000, // 1000 milliseconds = 1 second
        //     callback: this.onTimerTick,
        //     callbackScope: this,
        //     loop: true
        // });

        // if (GameStarting) {
        const timerManager = new TimerManager(this);
        if (!timerManager.isTimerRunning()) {
            timerManager.startTimer();
        }
        ///////////////////////////////////////////////////

    }

    update() {
        this.cameras.main.centerOnX(this.input.activePointer.x);

        if (cursors.down.isDown) {
            this.scene.start(lastCam);
        }
    }
}