import 'phaser';
import { Player, Dementor, DeathEater } from '../Objects/Entities';

var scoreText;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload() {
    //load background

    this.load.image('bg', 'assets/entities/bg.png');

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
    var score = 0;
    this.add.image(600, 300, 'bg');

    scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#fff',
    });

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
    this.player.setScale(1.5);

    // Creates instances of the keyboard to keys to move the player

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

    this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

    //Adds ability to shoot

    this.expeliarmus = this.add.group();
    this.expectopatronum = this.add.group();
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
          enemy.setScale(1.5);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    // Adds de collision destruction for death eaters when touching player laser

    this.physics.add.collider(this.expeliarmus, this.enemies, function (
      expeliarmus,
      enemy
    ) {
      if (enemy) {
        if (enemy.getData('type') === 'GunShip') {
          enemy.wandless(true);
          enemy.onDestroy();
          expeliarmus.destroy();
          score += 15;
          scoreText.setText('Score: ' + score);
          localStorage.setItem('score', JSON.stringify(score));
        } else {
          expeliarmus.destroy();
        }
      }
    });

    // Adds de collision destruction for dementors when touching player expectopatronum

    this.physics.add.collider(this.expectopatronum, this.enemies, function (
      expectopatronum,
      enemy
    ) {
      if (enemy) {
        if (enemy.getData('type') === 'ChaserShip') {
          enemy.wandless(true);
          enemy.onDestroy();
          expectopatronum.destroy();
          score += 10;
          scoreText.setText('Score: ' + score);
          localStorage.setItem('score', JSON.stringify(score));
        } else {
          expectopatronum.destroy();
        }
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
        this.player.setData('isShootingExpeliarmus', true);
      } else {
        this.player.setData(
          'timerShootTick',
          this.player.getData('timerShootDelay') - 1
        );
        this.player.setData('isShootingExpeliarmus', false);
      }

      if (this.keyI.isDown) {
        this.player.setData('isShootingExpectoPatronum', true);
      } else {
        this.player.setData(
          'timerShootTick',
          this.player.getData('timerShootDelay') - 1
        );
        this.player.setData('isShootingExpectoPatronum', false);
      }
    }

    // Destroys enemies out of scene

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

    // Destroys enemy lasers out of scene

    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    // Destroys player lasers out of scene

    for (var i = 0; i < this.expeliarmus.getChildren().length; i++) {
      var laser = this.expeliarmus.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }
}
