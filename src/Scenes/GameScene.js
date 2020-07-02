import 'phaser';
import {
  Player,
  Expeliarmus,
  ExpectoPatronum,
  Dementor,
  DeathEater,
  AvadaKedavra,
} from '../Objects/Entities';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload() {
    // load death eater
    this.load.spritesheet('de', 'assets/entities/deC.png', {
      frameWidth: 32,
      frameHeight: 49,
    });

    //load dementor

    this.load.image('dementor', 'assets/entities/dementor.png');

    //loads spells
    this.load.image('ak', 'assets/entities/ak.png');
    this.load.image('ex', 'assets/entities/ex.png');
    this.load.image('pt', 'assets/entities/pt.png');
    this.load.image('ep', 'assets/entities/epC.png');

    //loads hp

    this.load.spritesheet('hp', 'assets/entities/hpC.png', {
      frameWidth: 32,
      frameHeight: 49,
    });
  }

  create() {
    this.anims.create({
      key: 'hp',
      frames: this.anims.generateFrameNumbers('hp'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'de',
      frames: this.anims.generateFrameNumbers('de'),
      frameRate: 20,
      repeat: -1,
    });

    // creates player

    this.player = new Player(
      this,
      this.game.config.height * 0.05,
      this.game.config.height * 0.5,
      'hp'
    );
    console.log(this.player);

    // Creates instances of the keyboard to keys to move the player

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

    //Adds ability to shoot

    this.playerLasers = this.add.group();
  }

  update() {
    this.player.update();

    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keyJ.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData(
          'timerShootTick',
          this.player.getData('timerShootDelay') - 1
        );
        this.player.setData('isShooting', false);
      }
    }
  }
}
