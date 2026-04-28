import PlayerOne from "./PlayerOne.js";
import PlayerTwo from "./PlayerTwo.js";

// A class called MainScene which extends the Phaser scene class
export default class MainScene extends Phaser.Scene {
    constructor() {
        // Call super and send it a MainScene string
        super("MainScene");
    }

    // Setup
    // Loads images, sounds, fonts and other assets ahead of time, so everything runs smoothly once it begins
    // Runs once, before the game starts
    preload() {
        // 'this.load.image' loads and image file
        // 'background' is the key or name that you're giving the image, so that it can be referenced later
        // 'assets/frogbackground.png' is the image file path
        this.load.image("tiles", "assets/TilesetFloor.png");
        this.load.image("tiles", "assets/TilesetWater.png");
        this.load.tilemapTiledJSON("map", "assets/map1.json");
        PlayerOne.preload(this);
        PlayerTwo.preload(this);
        // Load sunflower image
        this.load.image("sunflower", "assets/flower.png");
        // Load tansy bettle image
        this.load.image("tansy-beetle", "assets/tansy-beetle-single.png");
    }

    // Launch
    // Runs once, right after all the assets are loaded
    // Used to place assets onto their initial position on the screen
    create() {
       const map = this.make.tilemap({key: "map"});
       const tileset = map.addTilesetImage("TilesetFloor", "tiles", 16, 16, 0, 0);
       const layer1 = map.createLayer("Tile Layer 1", tileset, 0, 0);

        // Assign player one
        this.playerOne = new PlayerOne({scene:this, x:600, y:400, texture:"princess"});
        // Assign player two
        this.playerTwo = new PlayerTwo({scene:this, x:400, y:300, texture:"sorcerer"});

        // Cursor variable contains built in Phaser function 'this.input.keyboard.createCursorKeys()'
        // 'createCursorKeys()' creates a new object that gives access to 'cursors.left', 'cursors.down' etc
        this.playerOne.arrowKeys = this.input.keyboard.createCursorKeys();
        // Attempt to give access to WASD keys through cursors
        this.playerTwo.wasdKeys = this.input.keyboard.addKeys("W,A,S,D");
        // 'this.input.on()' sets up a one-time listener which detects whether the mouse was clicked
        this.input.on(
            // 'pointerdown' is a Phaser event that happens when the pointer device is pressed down e.g left mouse click or touchscreen tap
            "pointerdown",
            // 'function (pointer) {}' is the callback function containing the code that runs when the player clicks
            // 'pointer' is a Phaser object that gives access to the state of the input device (mouse) when an input event (pointerdown) happens
            function (pointer) {
                // Add image at the x and y location of the input device when the input event happened
                // 'setScale(0.5)' makes the image half its original size
                this.add.image(pointer.x, pointer.y, "tansy-beetle").setScale(1);
            },
            this
        );

        // Create idle animation for player one
        this.anims.create({
            key: "playerOne_idle",
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playerOne_idle", {
                frames: [0, 2, 1, 3],
            })
        });
        // Create walk down animation for player one
        this.anims.create({
            key: "playerOne_walkDown",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playerOne_walk", {
                frames: [0, 4, 8, 12],
            })
        });
        // Create walk up animation for player one
        this.anims.create({
            key: "playerOne_walkUp",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playerOne_walk", {
                frames: [1, 5, 9, 13],
            })
        });
        // Create walk left animation for player one
        this.anims.create({
            key: "playerOne_walkLeft",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playerOne_walk", {
                frames: [2, 6, 10, 14],
            })
        });
        // Create walk right animation for player one
        this.anims.create({
            key: "playerOne_walkRight",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playerOne_walk", {
                frames: [3, 7, 11, 15],
            })
        });

        // Create idle animation for player two
        this.anims.create({
            key: "playerTwo_idle",
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playerTwo_idle", {
                frames: [0, 2, 1, 3],
            })
        });
        // Create walk down animation for player two
        this.anims.create({
            key: "playerTwo_walkDown",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playerTwo_walk", {
                frames: [0, 4, 8, 12],
            })
        });
        // Create walk up animation for player two
        this.anims.create({
            key: "playerTwo_walkUp",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playerTwo_walk", {
                frames: [1, 5, 9, 13],
            })
        });
        // Create walk left animation for player two
        this.anims.create({
            key: "playerTwo_walkLeft",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playerTwo_walk", {
                frames: [2, 6, 10, 14],
            })
        });
        // Create walk right animation for player two
        this.anims.create({
            key: "playerTwo_walkRight",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playerTwo_walk", {
                frames: [3, 7, 11, 15],
            })
        });
    }

    // Loop
    // Runs continuously, 60 times per second (60fps)
    // Checks whether any keys were pressed, moves objects around, runs anmations and updates game logic like scores and collisions
    update() {
        this.playerOne.update();
        this.playerTwo.update();
    }
}