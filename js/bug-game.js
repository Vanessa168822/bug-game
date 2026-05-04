import MainScene from "./MainScene.js";

// The config object to configure and initialise the game
const config = {
    // 'type' refers to rendering context used for game
    // 'AUTO' means it tries to use WebGL but can fall back to Canvas
    type: Phaser.AUTO,
    // Set dimensions for the game canvas
    width: 960,
    height: 528,
    // Set colour of the game canvas
    backgroundColor: "#cb188f",
    // Specify the parent?? id of the div in html
    parent: "bug-game",
    // The scene object imports MainScene
    scene: [MainScene],
    // Scale up game
    // scale: { 
    //     zoom: 2,
    // },
    // Specify physics settings
    physics: {
        // Specify default as being matter physics engine because it's a bit more powerful than the default
        default: "matter",
        // Configuration for matter physics engine
        matter: {
            // Turn debugging on to see colliders
            debug: true,
            // Turn gravity off because it's top down, not platformer
            gravity: {y:0},
        }
    },
    // Specify the plugins being used
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin,
                // Give a key to the plugin
                key: "matterCollision",
                mapping: "matterCollision"
            }
        ]
    }
};

// Starts the game using the settings defined in config
// 'new Phaser.Game(config)' creates a new instance of the Phaser game engine using the 'config' object
new Phaser.Game(config);