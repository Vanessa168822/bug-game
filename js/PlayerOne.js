export default class PlayerOne extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture } = data;
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
        this.setFixedRotation();
    }

    // Setup
    // Loads images, sounds, fonts and other assets ahead of time, so everything runs smoothly once it begins
    // Runs once, before the game starts
    static preload(scene) {
        // Load the character image
        scene.load.image("princess", "assets/princess_idle1.png");
        // Load princess idle spritesheet
        scene.load.spritesheet("playerOne_idle", "assets/princess_idle.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        // Load princess walking spritesheet
        scene.load.spritesheet("playerOne_walk", "assets/princess_walk.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
    }

    // Loop
    // Runs continuously, 60 times per second (60fps)
    // Checks whether any keys were pressed, moves objects around, runs anmations and updates game logic like scores and collisions
    update() {
        this.play("playerOne_idle", true);
        // Declare speed variable to determine how quickly character moves e.g 3 = 3 pixels per frame (180 pixels per second)
        let speed = 0.5;
        // if statement to check for left and right keys pressed to move player's x position by the number assigned in speed
        if (this.arrowKeys.left.isDown) {
            this.x -= speed;
            this.play("playerOne_walkLeft");
        } else if (this.arrowKeys.right.isDown) {
            this.x += speed;
            this.play("playerOne_walkRight");
        }
        // if statement to check for up and down keys pressed to move player's y position by the number assigned in speed
        if (this.arrowKeys.up.isDown) {
            this.y -= speed;
            this.play("playerOne_walkUp");
        } else if (this.arrowKeys.down.isDown) {
            this.y += speed;
            this.play("playerOne_walkDown");
        }
    }
}