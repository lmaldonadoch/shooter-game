import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class StoryScene extends Phaser.Scene {
  constructor() {
    super('StoryScene');
  }

  preload() {
    //load background

    this.load.image('bg', 'assets/entities/logo-big.png');
  }

  create() {
    this.add.image(600, 300, 'bg');

    const div = document.createElement('div');
    div.classList.add('story');
    div.innerHTML = `<p>HP: Hold on! Can you hear that?</br>RW: It seems like somebody is coming. Take out your wands! Get ready!</br>HG: Remember what AD said about the Dementors, they are everywhere! We will come across one or two for sure in our way.</br>HP: Yes, think about a good memory and get ready to use your Patronum anytime now.</br>HP: Guys...</br>HP: Guys, where are you?</br>DE: It seems like it is only you and us now, we have placed your friends out of the scene so that we can settle the score right now. Oh, I almost forgot, we brought friends with us!</br></br></br> <strong>Use a/w/d/s to move, 'j' to launch your Confundus spell, and 'i' to conjure your Patronus.</br>Confundus won't work on Dementors and the Patronum will have no effect on the dark wizards. Good luck!</strong></p>`;

    this.add.dom(
      this.game.config.width + 50,
      this.game.config.hight * 0.5,
      div
    );

    this.playButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 200,
      'blueButton1',
      'blueButton2',
      'Play',
      'Game'
    );
  }
}
