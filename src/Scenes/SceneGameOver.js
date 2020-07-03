import Button from '../Objects/Button';
import config from '../Config/config';
import API from '../Objects/api';

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  preload() {
    //load background

    this.load.image('bg', 'assets/entities/logo-big.png');
  }

  create() {
    this.add.image(600, 300, 'bg');
    var score = JSON.parse(localStorage.getItem('score'));
    if (!score) {
      score = 1;
    }
    localStorage.clear();
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
    div.innerHTML = `<input type='search' id = 'input' placeholder='Write your name!' aria-label='Search' required/></br><button type='submit' id = 'button'> Submit Score</button>`;

    this.add.dom(this.game.config.width * 0.7, 250, div);

    let button = document.getElementById('button');
    let input = document.getElementById('input');
    button.onclick = () => {
      if (input.value !== '') {
        div.classList.add('empty');
        div.innerHTML = `<p>Please wait... </p>`;
        API.postScores(input.value, score).then((response) => {
          console.log(response);
          div.innerHTML = `<p>${response.result} </p>`;
        });
      } else {
        if (document.getElementsByTagName('p').length == 0) {
          const p = document.createElement('p');
          p.innerHTML = 'Name can not be blank';
          div.appendChild(p);
        }
      }
    };

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
