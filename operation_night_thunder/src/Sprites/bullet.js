class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {        
        super(scene, x, y, texture, frame);
        this.visible = false;
        this.active = false;
        return this;
    }

    update() {
        if (this.active) {
            this.y -= this.speed;
            if (this.y < -(this.displayHeight/2)) {
                this.makeInactive();
            }
        }
    }

    makeActive() {
        this.active = true;
    }

    makeInactive() {
        this.active = false;
    }
}