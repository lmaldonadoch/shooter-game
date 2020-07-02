import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1200,
  height: 600,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
};
