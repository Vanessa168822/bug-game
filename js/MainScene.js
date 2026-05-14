// A class called MainScene which extends the Phaser scene class
export default class MainScene extends Phaser.Scene {

    // Player one
    playerOne;
    // Player two
    playerTwo;
    // bug
    bugs;
    // Gorup of bugs
    bugGroup;
    // Number of bugs that will be spawned
    noOfBugs = 20;
    // Spawn area to spawn bugs into
    spawnArea;
    // Random spawn point within the spawn area
    point;
    // Camera zoom level
    camZoom = 2.3;
    // variables for getting the camera to follow both players
    camPoint;
    playersX;
    playersY;

    constructor() {
        // Call super and send it a MainScene string
        super("MainScene");
    }

    // Setup
    // Loads images, sounds, fonts and other assets ahead of time, so everything runs smoothly once it begins
    // Runs once, before the game starts
    preload() {
        // Load tile sets
        this.load.image("tilesFloor", "assets/TilesetFloor.png");
        this.load.image("tilesWater", "assets/TilesetWater.png");
        this.load.image("tilesNature", "assets/TilesetNature.png");
        // Load tile map
        this.load.tilemapTiledJSON("map", "assets/map1.json");

        // Load the player1 image
        this.load.image("princess", "assets/princess_idle1.png");
        // Load player1 idle spritesheet
        this.load.spritesheet("playerOne_idle", "assets/princess_idle.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        // Load player 1 walking spritesheet
        this.load.spritesheet("playerOne_walk", "assets/princess_walk.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        // Load player 1 pick up bug image
        this.load.spritesheet("playerOne_bug", "assets/princess_bug.png", {
            frameWidth: 16,
            frameHeight: 16,
        });

        // Load player2 image
        this.load.image("sorcerer", "assets/sorcerer_idle1.png");
        // Load player2 idle spritesheet
        this.load.spritesheet("playerTwo_idle", "assets/sorcerer_idle.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        // Load player2 walking spritesheet
        this.load.spritesheet("playerTwo_walk", "assets/sorcerer_walk.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        // Load player 2 pick up bug image
        this.load.spritesheet("playerTwo_bug", "assets/sorcerer_bug.png", {
            frameWidth: 16,
            frameHeight: 16,
        });

        // // Load flower images
        this.load.image("sunflower", "assets/flower.png");
        this.load.image("dandelion", "assets/dandelion.png");
        this.load.image("tulip", "assets/tulip.png");
        // Load bug images
        this.load.image("Tansy beetle", "assets/tansy-beetle-single.png");
        this.load.spritesheet("tansy-idle-sheet", "assets/tansy-beetle-idle.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.image("Leaf beetle", "assets/leaf-beetle-single.png");
        this.load.image("Lob worm", "assets/lob-worm-single.png");
        this.load.image("Brown-lipped snail", "assets/brown-lipped-snail-single.png");
        // Load sounds
        this.load.audio("theme-song", "assets/birthday-cake.mp3");
        this.load.audio("catpickup", "assets/catpickup.mp3");
        this.load.audio("chocpickup", "assets/chocolatepickup.mp3");
        this.load.audio("click3", "assets/sfxclick3.mp3");
        this.load.audio("twang2", "assets/sfxtwang2.mp3");
    }

    // Launch
    // Runs once, right after all the assets are loaded
    // Used to place assets onto their initial position on the screen
    create() {

        //////////////////////////////////////////////////////////////////////////////// Audio /////////////////////////////////////////////////////////////////////

        // Add in audio
        this.music = this.sound.add("theme-song");
        this.pickupSoundOne = this.sound.add("catpickup", { volume: 0.1, loop: false });
        this.pickupSoundTwo = this.sound.add("chocpickup", { volume: 0.1, loop: false });
        this.plantSound = this.sound.add("twang2", { volume: 0.2, loop: false });

        // Play theme song
        this.music.play({
            loop: true,
            volume: 0.1
        });

        ///////////////////////////////////////////////////////////////////////////////// Map ////////////////////////////////////////////////////////////////////////////////////

        // Make tile map
        const map = this.make.tilemap({
            key: "map",
            tileWidth: 16,
            tileHeight: 16,
        });
        // Add tile sets to map
        const tileset1 = map.addTilesetImage("TilesetFloor", "tilesFloor");
        const tileset2 = map.addTilesetImage("TilesetWater", "tilesWater");
        const tileset3 = map.addTilesetImage("TilesetNature", "tilesNature");
        // Make tile map layers
        const layer1 = map.createLayer("Tile Layer 1", tileset1, 0, 0);
        const layer2 = map.createLayer("Tile Layer 2", tileset2, 0, 0);
        const layer3 = map.createLayer("Tile Layer 3", tileset3, 0, 0);
        // Set colliders for layer 2 from Tiled
        layer2.setCollisionByProperty({ collides: true });





        ///////////////////////////////////////////////////////////////////////////////// Players ////////////////////////////////////////////////////////////////////////////////

        // Assign player one
        this.playerOne = this.physics.add.sprite(496, 264, "princess");
        // Assign player two
        this.playerTwo = this.physics.add.sprite(464, 264, "sorcerer");

        // Add collider between player one and layer 2
        this.physics.add.collider(this.playerOne, [layer2]);
        // Add collider between player two and layer 2
        this.physics.add.collider(this.playerTwo, [layer2]);

        // Set the boundaries of the world to the map 
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // Player one collides with world boundaries
        this.playerOne.body.setCollideWorldBounds(true);
        // Player two collides with world boundaries
        this.playerTwo.body.setCollideWorldBounds(true);

        ///////////////////////////////////////////////////////////////////////// Camera //////////////////////////////////////////////////////////////////////////////////////

        // Trying to get the camera to follow the average point between both players
        // this.playersX = this.playerOne.x + this.playerTwo.x;
        // this.playersY = this.playerOne.y + this.playerTwo.y;
        // this.camPoint = new Phaser.Geom.Point(this.playersX / 2, this.playersY / 2);

        // Add camera
        const camera = this.cameras.main;
        // Zoom the camera
        camera.zoom = this.camZoom;
        // Make camera follow a player
        camera.startFollow(this.playerOne);
        // Set camera bounds to the map
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        //////////////////////////////////////////////////////////////////////// Controls ////////////////////////////////////////////////////////////////////////////////////

        // Cursor variable contains built in Phaser function 'this.input.keyboard.createCursorKeys()'
        // 'createCursorKeys()' creates a new object that gives access to 'cursors.left', 'cursors.down' etc
        this.arrowKeys = this.input.keyboard.createCursorKeys();
        // Attempt to give access to WASD keys through cursors
        this.wasdKeys = this.input.keyboard.addKeys("W,A,S,D");

        // Key to pick up bugs for player one
        this.collectKeyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        // Key to pick up bugs for player two
        this.collectKeyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //////////////////////////////////////////////////////////////////////// Flowers ////////////////////////////////////////////////////////////////////////////////////////////

        // // Array of flower images
        let flowerImageArray = [
            "sunflower",
            "dandelion",
            "tulip"
        ]

        // // 'this.input.on()' sets up a one-time listener which detects whether the mouse was clicked
        this.input.on(
            // 'pointerdown' is a Phaser event that happens when the pointer device is pressed down e.g left mouse click or touchscreen tap
            "pointerdown",
            // 'function (pointer) {}' is the callback function containing the code that runs when the player clicks
            // 'pointer' is a Phaser object that gives access to the state of the input device (mouse) when an input event (pointerdown) happens
            function (pointer) {
                // Add image at the x and y location of the input device when the input event happened
                // 'setScale(0.5)' makes the image half its original size
                this.add.image(this.input.activePointer.worldX, this.input.activePointer.worldY, flowerImageArray[Phaser.Math.Between(0, flowerImageArray.length - 1)]).setScale(1);
                // Sound effect for planting flower
                this.plantSound.play();
            },
            this
        );

        ////////////////////////////////////////////////////////////////////////// Animations ////////////////////////////////////////////////////////////////////////////

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
        // Create pick up bug animation for player one
        this.anims.create({
            key: "playerOne_bugCollect",
            frameRate: 5,
            frames: [{ key: "playerOne_bug", frame: 0 }],
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
        // Create pick up bug animation for player two
        this.anims.create({
            key: "playerTwo_bugCollect",
            frameRate: 5,
            frames: [{ key: "playerTwo_bug", frame: 0 }],
        });

        // Animation for tansy beetle
        this.anims.create({
            key: "tansy-idle",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("tansy-idle-sheet", {
                frames: [0, 1],
            })
        });

        ////////////////////////////////////////////////////////////////////////////// Camera Scene ///////////////////////////////////////////////////////////////////////////////////////////

        this.scene.launch("CameraScene");

        ///////////////////////////////////////////////////////////////////////////// Bugs /////////////////////////////////////////////////////////////////////////////////////////

        // Array of bugs for spawning
        let bugImageArray = [
            "Tansy beetle",
            "Leaf beetle",
            "Lob worm",
            "Brown-lipped snail"
        ]
        // Bug group
        this.bugGroup = this.physics.add.group();
        // Spawn bugs area
        this.spawnArea = new Phaser.Geom.Rectangle(50, 50, this.game.config.width - 50, this.game.config.height - 50);
        // Loop to spawn bugs in random positions from the bug image array
        for (let i = 0; i < this.noOfBugs; i++) {
            this.point = this.spawnArea.getRandomPoint();
            this.bugs = this.bugGroup.create(this.point.x, this.point.y, bugImageArray[Phaser.Math.Between(0, bugImageArray.length - 1)]);
            this.bugs.setCollideWorldBounds(true);
        }

        // Player one and bug group overlap triggers collect bug
        this.physics.add.overlap(this.playerOne, this.bugGroup, this.collectBugOne, null, this);
        // Player two and bug group overlap triggers collect bug
        this.physics.add.overlap(this.playerTwo, this.bugGroup, this.collectBugTwo, null, this);
    }

    // Function for player one picking up bugs
    collectBugOne(playerOne, bugs) {
        // Hides the bug if picked up
        if (this.collectKeyOne.isDown) {
            bugs.disableBody(true, true);
            // this.score += 1;
            // this.scoreText.setText("Score: " + this.score + "/" + this.noOfBugs);
            playerOne.anims.play("playerOne_bugCollect", true);
            // Sound effect for picking up bug
            this.pickupSoundOne.play();
        }
        // References camera scene to emit text telling the player what bug they found
        this.events.emit("addText", {bugName: `${bugs.texture.key}`});
    }

    //Function for player two picking up bugs
    collectBugTwo(playerTwo, bugs) {
        // Hides the bug if picked up
        if (this.collectKeyTwo.isDown) {
            bugs.disableBody(true, true);
            // this.score += 1;
            // this.scoreText.setText("Score: " + this.score + "/" + this.noOfBugs);
            playerTwo.anims.play("playerTwo_bugCollect", true);
            // Sound effect for picking up bug
            this.pickupSoundTwo.play();
        }
        // References camera scene to emit text telling the player what bug they found
        this.events.emit("addText", {bugName: `${bugs.texture.key}`});
    }

    // Loop
    // Runs continuously, 60 times per second (60fps)
    // Checks whether any keys were pressed, moves objects around, runs anmations and updates game logic like scores and collisions
    update() {

        //////////////////////////////////////////////////////////////////// Player Movement ////////////////////////////////////////////////////////////////////////////////

        // Declare speed variable to determine how quickly character moves
        const speed = 75;

        // Lets player stop when keys aren't pressed
        this.playerOne.setVelocity(0);
        this.playerTwo.setVelocity(0);

        // if statement to check for left, right, up and down keys pressed to move player's x and y position by the number assigned in speed
        // Adds appropriate animations to each movement
        if (this.arrowKeys.left.isDown) {
            this.playerOne.setVelocityX(-speed);
            this.playerOne.anims.play("playerOne_walkLeft", true);
        } else if (this.arrowKeys.right.isDown) {
            this.playerOne.setVelocityX(+speed);
            this.playerOne.anims.play("playerOne_walkRight", true);
        } else if (this.arrowKeys.up.isDown) {
            this.playerOne.setVelocityY(-speed);
            this.playerOne.anims.play("playerOne_walkUp", true);
        } else if (this.arrowKeys.down.isDown) {
            this.playerOne.setVelocityY(+speed);
            this.playerOne.anims.play("playerOne_walkDown", true);
        } else {
            this.playerOne.anims.play("playerOne_idle", true);
        }

        // if statement to check for A, D, W and S keys pressed to move player two's x and y position
        // Adds in animations for each movement
        if (this.wasdKeys.A.isDown) {
            this.playerTwo.setVelocityX(-speed);
            this.playerTwo.anims.play("playerTwo_walkLeft", true);
        } else if (this.wasdKeys.D.isDown) {
            this.playerTwo.setVelocityX(+speed);
            this.playerTwo.anims.play("playerTwo_walkRight", true);
        } else if (this.wasdKeys.W.isDown) {
            this.playerTwo.setVelocityY(-speed);
            this.playerTwo.anims.play("playerTwo_walkUp", true);
        } else if (this.wasdKeys.S.isDown) {
            this.playerTwo.setVelocityY(+speed);
            this.playerTwo.anims.play("playerTwo_walkDown", true);
        } else {
            this.playerTwo.anims.play("playerTwo_idle", true);
        }

    }
}