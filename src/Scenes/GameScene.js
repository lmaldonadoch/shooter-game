import 'phaser';
import { Player, Dementor, DeathEater } from '../Objects/Entities';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload() {
    //load background

    this.load.image('bg', 'assets/entities/rocks.png');

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

    // creates background
    this.backgrounds = [];
    for (var i = 0; i < 5; i++) {
      // create five scrolling backgrounds
      var bg = new ScrollingBackground(this, 'bg', i * 10);
      this.backgrounds.push(bg);
    }

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
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();

    // Creates the spawning of the enemies as a timer

    this.time.addEvent({
      delay: 1500,
      callback: function () {
        var enemy = null;

        if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.enemies.getChildren().length < 6) {
            enemy = new DeathEater(
              this,
              this.game.config.width * 0.9,
              this.game.config.height * 0.5
            );
          }
        } else {
          if (this.getEnemiesByType('ChaserShip').length < 15) {
            enemy = new Dementor(
              this,
              this.game.config.width * 0.95,
              this.game.config.height * 0.5
            );
          }
        }

        if (enemy !== null) {
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    // Adds de collision destruction for enemies when touching player laser

    this.physics.add.collider(this.playerLasers, this.enemies, function (
      playerLaser,
      enemy
    ) {
      if (enemy) {
        playerLaser.destroy();
        enemy.wandless(true);
        enemy.onDestroy();
      }
    });

    // Adds collision destruction for player when touching an enemy

    this.physics.add.overlap(this.player, this.enemies, function (
      player,
      enemy
    ) {
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        player.wandless(true);
        player.onDestroy();
        enemy.wandless(true);
        enemy.destroy();
      }
    });

    // Adds collision destruction for player when reached by a laser

    this.physics.add.overlap(this.player, this.enemyLasers, function (
      player,
      laser
    ) {
      if (!player.getData('isDead') && !laser.getData('isDead')) {
        player.wandless(true);
        laser.destroy();
        player.onDestroy();
      }
    });
  }

  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') == type) {
        arr.push(enemy);
      }
    }
    return arr;
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

    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];

      if (
        enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }
      }
      enemy.update();
    }
  }
}
