export default class CameraScene extends Phaser.Scene {

    // Score value
    score = 0;
    // Score text
    scoreText;
    // Text for player one controls
    controlTextOne;
    controlTextTwo;
    // Text for player two controls
    controlTextThree;
    controlTextFour;
    // The main scene
    mainScene;
    // Textbox to display bug info
    textBox;
    // Number of bugs that will be spawned
    noOfBugs = 20;

    constructor() {
        super("CameraScene");
    }

    create() {
        // Reference to MainScene
        this.mainScene = this.scene.get("MainScene");

        // Redefine key to pick up bugs for player one
        this.collectKeyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        // Redefine key to pick up bugs for player two
        this.collectKeyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // The score
        this.scoreText = this.add.text(400, 5, "Score: 0/" + this.noOfBugs, { fontSize: "24px", fill: "#ffffff" });
        // Text to tell the user the controls
        this.controlTextOne = this.add.text(730, 5, "Move: Arrows", { fontSize: "20px", fill: "#ffffff" });
        this.controlTextTwo = this.add.text(730, 20, "Pick up bugs: Shift", { fontSize: "20px", fill: "#ffffff" });
        this.controlTextThree = this.add.text(5, 5, "Move: WASD", { fontSize: "20px", fill: "#ffffff" });
        this.controlTextFour = this.add.text(5, 20, "Pick up bugs: E", { fontSize: "20px", fill: "#ffffff" });
        // Text to say what bug was collected
        this.bugText = this.add.text(0, 0, "", {fontSize: "20px", fill: "#ffffff"});

        // Make an ellipse shaped text box
        this.textBox = this.add.ellipse(this.game.config.width / 2, this.game.config.height - 55, 600, 100, 0x005500, 0.5);
        this.textBox.setVisible(false);

        // Event displays textbox when a bug is picked up displaying the bugs name
        // Also changes the score
        this.mainScene.events.on("addText", (event) => {
            if (this.collectKeyOne.isDown || this.collectKeyTwo.isDown) {
                this.bugText.setText(`You found a ${event.bugName}!`);
                this.bugText.x = this.game.config.width / 2 - this.bugText.width / 2;
                this.bugText.y = this.game.config.height - 18 - this.textBox.height / 2;
                this.bugText.setOrigin(0).setDepth(100);
                this.score += 1;
            this.scoreText.setText("Score: " + this.score + "/" + this.noOfBugs);
                this.textBox.setVisible(true);
            }
        })

    }
}