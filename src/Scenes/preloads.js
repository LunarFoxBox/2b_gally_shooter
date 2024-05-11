// Loads all assets that the game will use
class Preloads extends Phaser.Scene {
    constructor(){
        super("preloads");
    }

    preload(){
        this.load.setPath("./assets/");

        this.load.image("tiny_battles_tiles", "tilemap_packed.png");    // tile sheet   
        this.load.tilemapTiledJSON("map", "map.json");                   // Load JSON of tilemap

        this.load.image("player_ship", "player.png");
        this.load.image("drone", "drone.png");
        this.load.image("elite", "elite.png");
        this.load.image("boss", "boss.png");

        this.load.image("bullet", "bullet.png");
        this.load.image("missile", "missile.png");
        this.load.image("missileExplosion", "missile_explosion.png");
        this.load.image("planeExplosion", "plane_explosion.png");

        this.load.image("playerCrosshair", "player_crosshair.png");
        this.load.image("enemyLock", "enemy_lock.png");
        this.load.image("sam", "sam.png");

        // Sound Effects
        this.load.audio("gunfire", "gunfire.mp3") // Source: https://soundbible.com/2091-MP5-SMG-9mm.html

        
        console.log("Preload Successful")

    }

    create(){
        
        this.scene.start("game_scene")
    }
}
