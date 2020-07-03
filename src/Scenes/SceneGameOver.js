import Button from '../Objects/Button';
import config from '../Config/config';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  create() {
    var score = JSON.parse(localStorage.getItem('score'));
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    // this.sfx = {
    //   btnOver: this.sound.add('sndBtnOver'),
    //   btnDown: this.sound.add('sndBtnDown'),
    // };

    // Play Again
    this.gameButton = new Button(
      this,
      config.width / 4,
      config.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Play Again',
      'Game'
    );

    //Score rendering
    this.title = this.add.text(
      this.game.config.width * 0.75,
      200,
      `Your score is: ${score}`,
      {
        fontFamily: 'monospace',
        fontSize: 32,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      }
    );
    this.title.setOrigin(0.5);

    // input tag

    this.add.dom(
      this.game.config.width * 0.75,
      250,
      'div',
      'background-color: white; width: 220px; height: 100px; font: 48px Arial',
      'Phaser'
    );

    // Submit score
    this.submitButton = new Button(
      this,
      (config.width / 4) * 3,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Submit',
      'Submit'
    );

    // Credits score
    this.submitButton = new Button(
      this,
      config.width / 4,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Credits',
      'Credits'
    );
  }
}
