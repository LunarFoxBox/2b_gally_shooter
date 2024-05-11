class GameScene extends Phaser.Scene {
    constructor() {
        super("game_scene");

        // Initialize a class variable "my" which is an object.
        // The object has one property, "sprite" which is also an object.
        // This will be used to hold bindings (pointers) to created sprites.
        this.my = {sprite: {}};

        // Set movement speeds (in pixels/tick)
        this.playerSpeed = 200;
        this.bulletSpeed = 30;
        this.maxBullets = 3;

        this.maxDroneSquad = 5;
        this.droneSpeed = 10;
        this.droneCooldown = 10;
        this.droneCooldownCounter = 0;

        this.bulletCooldown = 1;        // Numbers of update() calls to wait before making a new bullet
        this.bulletCooldownCounter = 0;
        
    }

    create() {
        let my = this.my;

        //this.map = this.add.tilemap("map", 16, 16, 10, 10); Doesn't work for some reason and this assignment makes me too depressed to continue
        //this.tileset = this.map.addTilesetImage("tiny_battles_packed", "tiny_battles_tiles");

        //this.grassLayer = this.map.createLayer("grass", this.tileset, 0, 0);
        //this.buildingLayer = this.map.createLayer("buildings", this.tileset, 0, 0);
        //this.grassLayer.setScale(4.0);
        //this.buildingLayer.setScale(4.0);


        // Create key objects
        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.nextScene = this.input.keyboard.addKey("S");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        my.sprite.player = new Player(this, game.config.width/2, game.config.height - 40, "player_ship", null, this.left, this.right, 5);
        my.sprite.player.setScale(1.5);

        //my.sprite.drone = new Drone(this, game.config.width/2, 80, "drone", null, 5, 20, false)
        //my.sprite.drone.setScale(1.5);
        //my.sprite.drone.flipY = true;

        // In this approach, we create a single "group" game object which then holds up
        // to maxBullets bullet sprites
        // See more configuration options here: 
        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/group/
        my.sprite.bulletGroup = this.add.group({
            active: true,
            defaultKey: "bullet",
            maxSize: this.maxBullets,
            runChildUpdate: true
            }
        );


        my.sprite.droneGroup = this.add.group({
            active: true,
            defaultKey: "drone",
            maxSize: this.maxDroneSquad,
            runChildUpdate: true
            }
        );

        my.sprite.droneGroup.createMultiple({
            classType: Drone,
            active: false,
            key: my.sprite.droneGroup.defaultKey,
            repeat: my.sprite.droneGroup.maxSize-1
        });
        my.sprite.droneGroup.propertyValueSet("speed", this.droneSpeed);

        // Create all of the bullets at once, and set them to inactive
        // See more configuration options here:
        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/group/
        my.sprite.bulletGroup.createMultiple({
            classType: Bullet,
            active: false,
            key: my.sprite.bulletGroup.defaultKey,
            repeat: my.sprite.bulletGroup.maxSize-1
        });
        my.sprite.bulletGroup.propertyValueSet("speed", this.bulletSpeed);

        // update HTML description
        document.getElementById('description').innerHTML = '<h2>Operation: Night Thunder.js</h2><br>A: left // D: right // Space: shoot'

    }

    update() {
        let my = this.my;
        this.bulletCooldownCounter--;
        this.droneCooldownCounter--;

        // Check for bullet being fired
        if (this.space.isDown) {
            if (this.bulletCooldownCounter < 0) {
                // Get the first inactive bullet, and make it active
                let bullet = my.sprite.bulletGroup.getFirstDead();
                // bullet will be null if there are no inactive (available) bullets
                if (bullet != null) {
                    this.bulletCooldownCounter = this.bulletCooldown;
                    bullet.makeActive();
                    bullet.x = my.sprite.player.x;
                    bullet.y = my.sprite.player.y - (my.sprite.player.displayHeight/2);
                }
            }
        }

        if (this.droneCooldownCounter < 0){
            //console.log("In drone activating!")
            let drone = my.sprite.droneGroup.getFirstDead();
            if (drone != null){
                //console.log("Making drone assctive!!")
                this.droneCooldownCounter = this.droneCooldown;
                drone.makeActive();
                drone.x = 500;
                drone.y = 100;
            }
        }

        // update the player avatar by by calling the player's update()
        my.sprite.player.update();


    }
}