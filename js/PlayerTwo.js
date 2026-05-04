export default class PlayerTwo extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let {scene, x, y, texture} = data;
        super(scene.matter.world, x, y, texture);
        this.scene.add.existing(this);

        const {Body,Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x, this.y, 12, {isSensor:false, label:"playerCollider"});
        var playerSensor = Bodies.circle(this.x, this.y, 24, {isSensor:true, label:"playerSensor"});
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
    }

    static preload(scene) {
        // Load ninja image
        scene.load.image("sorcerer", "assets/sorcerer_idle1.png");
        // Load sorcerer idle spritesheet
        scene.load.spritesheet("playerTwo_idle", "assets/sorcerer_idle.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        // Load sorcerer walking spritesheet
        scene.load.spritesheet("playerTwo_walk", "assets/sorcerer_walk.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
    }

    // Loop
    // Runs continuously, 60 times per second (60fps)
    // Checks whether any keys were pressed, moves objects around, runs anmations and updates game logic like scores and collisions
    update() {
        
       // Declare speed variable to determine how quickly character moves e.g 3 = 3 pixels per frame (180 pixels per second)
        const speed = 1;
        // if statement to check for A, D, W and S keys pressed to move player two's x and y position
        // Adds in animations for each movement
        if (this.wasdKeys.A.isDown) {
            this.x -= speed;
            this.play("playerTwo_walkLeft", true);
        } else if (this.wasdKeys.D.isDown) {
            this.x += speed;
            this.play("playerTwo_walkRight", true);
        } else if (this.wasdKeys.W.isDown) {
            this.y -= speed;
            this.play("playerTwo_walkUp", true);
        } else if (this.wasdKeys.S.isDown) {
            this.y += speed;
            this.play("playerTwo_walkDown", true);
        } else {
            this.play("playerTwo_idle", true);
        }
    }
}