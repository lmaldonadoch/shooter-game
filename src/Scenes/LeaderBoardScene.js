import 'phaser';
import config from '../Config/config';
import API from '../Objects/api';
import Button from '../Objects/Button';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoardScene');
  }

  create() {
    API.getScores().then((response) => {
      console.log(response);
      const sortedResponse = response.result.sort((a, b) => {
        a.score - b.score;
      });
      console.log(sortedResponse);
      let namesToDisplay = '';

      for (let i = 0; i < 7; i += 1) {
        namesToDisplay += `${i + 1}. ${sortedResponse[i].user}: ${
          sortedResponse[i].score
        }\n\n`;
        if (i === sortedResponse.length - 1) {
          break;
        }
      }

      this.creditsText = this.add.text(0, 0, 'Top Scores', {
        fontSize: '32px',
        fill: '#fff',
      });
      this.madeByText = this.add.text(0, 0, namesToDisplay, {
        fontSize: '26px',
        fill: '#fff',
      });
      this.zone = this.add.zone(
        config.width / 2,
        config.height / 2,
        config.width,
        config.height
      );

      Phaser.Display.Align.In.Center(this.creditsText, this.zone);

      Phaser.Display.Align.In.Center(this.madeByText, this.zone);

      this.creditsText.setY(20);
      this.madeByText.setY(80);
    });

    this.titleButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 200,
      'blueButton1',
      'blueButton2',
      'Back',
      'Title'
    );

    // this.creditsTween = this.tweens.add({
    //   targets: this.creditsText,
    //   y: -100,
    //   ease: 'Power1',
    //   duration: 3000,
    //   delay: 1000,
    //   onComplete: function () {
    //     this.destroy;
    //   },
    // });

    // this.madeByTween = this.tweens.add({
    //   targets: this.madeByText,
    //   y: -300,
    //   ease: 'Power1',
    //   duration: 8000,
    //   delay: 1000,
    //   onComplete: function () {
    //     this.madeByTween.destroy;
    //     this.scene.start('Title');
    //   }.bind(this),
    // });
  }
}
