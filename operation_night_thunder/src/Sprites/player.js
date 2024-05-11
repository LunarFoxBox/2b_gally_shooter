class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, leftKey, rightKey, playerSpeed){
        super(scene, x, y, texture, frame);

        // Set player movement keys
        this.keyA = leftKey;
        this.keyD = rightKey;

        // Set player speed
        this.playerSpeed = playerSpeed;

        scene.add.existing(this);
        
        return this;
    }

    update(){
        
        if (this.keyA.isDown){
            if (this.x > (this.displayWidth/2)) {
                this.x -= this.playerSpeed;
            }
        }
        if (this.keyD.isDown){
            if (this.x < (game.config.width - (this.displayWidth/2))) {
                this.x += this.playerSpeed;
            }
        }
    }
}