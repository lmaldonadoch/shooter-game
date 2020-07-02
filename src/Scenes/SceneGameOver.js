import Button from '../Objects/Button';
import config from '../Config/config';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  create() {
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
      config.width / 2,
      config.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Play Again',
      'Game'
    );

    // Submit score
    this.submitButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      'blueButton1',
      'blueButton2',
      'Submit Score',
      'Submit'
    );

    // Credits score
    this.submitButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Credits',
      'Credits'
    );
  }
}
