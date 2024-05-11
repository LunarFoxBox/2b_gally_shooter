class Drone extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        

        // Set drone active state
        this.active = false;

        this.strafe = 5;

        scene.add.existing(this);
        
        return this;
    }

    update(){
        
        if (this.active){
            //console.log("In drone update!")
            for (let cooldown = 0; cooldown < 50; cooldown++){
                //console.log(this.x)
                this.x -= this.speed;
            }
            for (let cooldown = 0; cooldown < 50; cooldown++){
                this.x -+ this.speed;
            }
            this.makeInactive();
        }
    }

    makeActive() {
        this.visible = true;
        this.active = true;
    }

    makeInactive() {
        this.visible = false;
        this.active = false;
    }
}