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
    scale: { 
        zoom: 1.6,
    },
    // Specify physics settings
    physics: {
        default: "arcade",
        // Configuration for physics engine
        arcade: {
            // Turn debugging on to see colliders
            debug: false,
            // Turn gravity off because it's top down, not platformer
            gravity: {
                y: 0,
                x: 0,
            },
        }
    }
};

// Starts the game using the settings defined in config
// 'new Phaser.Game(config)' creates a new instance of the Phaser game engine using the 'config' object
new Phaser.Game(config);