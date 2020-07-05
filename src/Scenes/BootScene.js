import 'phaser';
// eslint-disable-next-line no-undef
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', 'assets/entities/logo-big.png');
    this.load.audio('bgMusic', 'assets/TownTheme.mp3');
  }

  create() {
    this.scene.start('Preloader');
  }
}
