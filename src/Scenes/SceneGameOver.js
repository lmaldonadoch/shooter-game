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

    // creates form

    const div = document.createElement('div');
    div.setAttribute(
      'style',
      'display: flex; flex-direction: column; align-items: center; justify-content: space-between;'
    );
    div.innerHTML = `<input type='search' placeholder='Write your initials!' aria-label='Search' style = 'margin-bottom: 60px; margin-top: 180px; margin-left: 90px; height: 50px; font-size: 32px; width: 300px;'/></br><button type='submit' style = 'border:none; background: #1BA0DE; color: white; font-size: 32px; padding: 7px 5px; margin-left: 130px; border-radius: 5px;' id = 'button'> Submit Score</button>`;

    this.add.dom(this.game.config.width * 0.7, 250, div);

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
