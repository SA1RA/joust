"use strict";
var C = {
  //background
  background: {
    image: 'joustmap.png',
    scale: 1
  },
  //player
  player: {
    image: 'knightred.gif',
    width: 32,
    height: 32,
    frames: 2,
    startx: 1400,
    starty: 300,
    bounce: 0.3,
    drag: 100,
    speed: 300,
    scale: 5
  },
  //enemy
  enemy: {
    image: 'knightblue.gif',
    width: 32,
    height: 32,
    frames: 2,
    startx: 100,
    starty: 430,
    bounce: 0.3,
    drag: 100,
    speed: 300,
    scale: 5
  },
  
};



class BootState {

  init() {
    console.log("%c~~~ Booting RPG ~~~\n Compliments of Smlucas13",
                "color:#fdf6e3; background:#073642");
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  create() {
    game.state.start('Preload')
  }

}

class PreloadState {

  create() {
    game.state.start('Start')
  }

}

class StartState {

  init() {
  }

  preload() {
    this.load.spritesheet('player','knightred.png',32,32,2)
    this.load.image('background',C.background.image);
    this.load.image('player',C.player.image);
    this.load.image('enemy',C.enemy.image);
    this.load.spritesheet('enemy','knightblue.png',32,32,2)

  }

  create() {
    game.state.start('Play')
  }

}

class PlayState {

  create() {
    
    game.physics.startSystem(Phaser.Physics.P2JS);
    // background
    this.background = this.add.tileSprite(0,0,1600,600,'background');
    this.game.world.setBounds(0, 0, 1600, 600);
    this.background.scale.set(C.background.scale);
    
    // player
    this.player = game.add.sprite(C.player.startx,C.player.starty,'player');
    this.player.scale.set(C.player.scale);
    game.physics.arcade.enable(this.player);
    //this.player.enableBody
    this.player.body.kinematic = true;
    this.player.body.drag.setTo(C.player.drag);
    this.player.animations.add('blink');
    this.player.animations.play('blink',2,true);
    game.input.onDown.add(move, this.player);
    // enemy
    this.enemy = game.add.sprite(C.enemy.startx,C.enemy.starty,'enemy');
    this.enemy.scale.set(C.enemy.scale);
    game.physics.arcade.enable(this.enemy);
    this.enemy.body.kinematic = true;
    this.enemy.body.drag.setTo(C.enemy.drag);
    this.enemy.animations.add('blink');
    this.enemy.animations.play('blink',2,true);
    this.enemy.smoothed = false;

    game.physics.p2.updateBoundsCollisionGroup();
    this.player.body.fixedRotation = true;
    console.log(this.player);
    this.player.smoothed = false;
    
  }

  update() {
}
}
class EndState {
  create() {
    game.state.start('Start')
  }
}


function move() {
  console.log(this);
  this.body.velocity.x -= 50;
}
var game = new Phaser.Game(1600,800);
game.state.add('Boot', BootState);
game.state.add('Preload', PreloadState);
game.state.add('Start', StartState);
game.state.add('Play', PlayState);
game.state.add('End', EndState);
game.state.start('Boot');
