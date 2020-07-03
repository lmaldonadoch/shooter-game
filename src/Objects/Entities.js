export class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.setData('wandless', false);
    this.setData('isDead', false);
  }

  wandless() {
    if (!this.getData('isDead') && !this.getData('wandless')) {
      this.setTint(0x00b3ff); // Setting the color of the enemy to blue

      // play the wand disarm sfx
      // this.scene.sfx.disarm.play();

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(300, 300);

      // this.on(
      //   'animationcomplete',
      //   function () {
      //     if (canDestroy) {
      //       this.destroy();
      //     } else {
      //       this.setVisible(false);
      //     }
      //   },
      //   this
      // );

      this.setData('isDead', true);
    }
  }

  petrified() {
    let possibility = this.wandless ? 10 : Math.round(Math.random() * 10); //sets the possibility of the character to get petrified

    if (possibility >= 7) {
      // this.scene.sfx.petrified.play();
      this.setAngle(0);
      this.body.setVelocity(0, 0);
      this.destroy();
      this.setData('isDead', true);
    } else {
      // this.scene.sfx.blocked.play();
    }
  }
}

export class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');

    this.setData('speed', 200);
    this.play('sprPlayer');

    //adds ability to shoot

    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    // Ads the timer functionality to the shoot action

    if (this.getData('isShootingExpeliarmus')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      } else {
        // when the "manual timer" is triggered:
        var expeliarmus = new Expeliarmus(this.scene, this.x, this.y);
        this.scene.expeliarmus.add(expeliarmus);

        //this.scene.sfx.laser.play(); // play the laser sound effect
        this.setData('timerShootTick', 0);
      }
    }

    if (this.getData('isShootingExpectoPatronum')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      } else {
        // when the "manual timer" is triggered:

        var expectopatronum = new ExpectoPatronum(this.scene, this.x, this.y);
        this.scene.expectopatronum.add(expectopatronum);

        //this.scene.sfx.laser.play(); // play the laser sound effect
        this.setData('timerShootTick', 0);
      }
    }
  }

  onDestroy() {
    this.scene.time.addEvent({
      // go to game over scene
      delay: 1000,
      callback: function () {
        this.scene.scene.start('SceneGameOver');
      },
      callbackScope: this,
      loop: false,
    });
  }
}

export class Expeliarmus extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'ex');
    this.body.velocity.x = 200;
  }
}

export class ExpectoPatronum extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'ep');
    this.body.velocity.x = 200;
  }
}

export class Dementor extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'dementor', 'ChaserShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.states = {
      MOVE_DOWN: 'MOVE_DOWN',
      CHASE: 'CHASE',
    };
    this.state = this.states.MOVE_DOWN;
  }

  update() {
    if (!this.getData('isDead') && this.scene.player) {
      this.state = this.states.CHASE;

      if (this.state == this.states.CHASE) {
        var dx = this.scene.player.x - this.x;
        var dy = this.scene.player.y - this.y;

        var angle = Math.atan2(dy, dx);

        var speed = 100;
        this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
      }
    }
  }

  onDestroy() {
    this.destroy();
    this.setData('isDead', true);
  }
}

export class DeathEater extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'de', 'GunShip');
    this.play('de');
    this.body.velocity.y = Phaser.Math.Between(50, 200);

    // Sets the shooting capability

    this.shootTimer = this.scene.time.addEvent({
      delay: 1500,
      callback: function () {
        var laser = new AvadaKedavra(this.scene, this.x, this.y);
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }

  update() {
    if (
      !this.getData('isDead') &&
      this.scene !== undefined &&
      this.scene.player
    ) {
      if (this.y > this.scene.player.y) {
        this.body.velocity.y =
          this.body.velocity.y < 0
            ? this.body.velocity.y
            : this.body.velocity.y * -1;
      } else {
        this.body.velocity.y = Math.abs(this.body.velocity.y);
      }
    }
  }
}

export class AvadaKedavra extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'ak');
    this.body.velocity.x = -200;
  }
}
