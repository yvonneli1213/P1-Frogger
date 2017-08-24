var tableX = 101; // width per step
var tableY = 83; // height per step

// 这是我们的玩家要躲避的敌人
var Enemy = function(row) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.sprite = 'images/enemy-bug.png';

    this.y = (row + 0.75) * tableY;
    this.x = -(Math.random()*10)*tableX;
    this.speed = (Math.random()*(3-1) + 1) * 150;
}

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    var dx = this.speed * dt;

    if (this.x < 5 * tableX){
      this.x += dx;
    } else {
      this.x = -(Math.random()*5)*tableX;
      this.speed = (Math.random()*(3-1) + 1) * 100;
    };

    if (player.y === 0){
      this.reset();
    };
 }

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.reset = function() {
  this.x = -(Math.random()*5)*tableX;
  this.speed = (Math.random()*(3-1) + 1) * 100;
}
// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 2 * tableX;
    this.y = (4 + 0.75) * tableY;
}

Player.prototype.update = function() {
    if (this.x > 4*tableX){
      this.x = 4*tableX;
    } else if (this.x < 0){
      this.x = 0;
    } else if (this.y > 4.75 * tableY){
      this.y = 4.75 * tableY;
    } else if (this.y < 0 * tableY){
      this.y = 0 * tableY;
    } else if (this.y === 0 * tableY){
      var feedback = confirm("You WIN!!! Try again?");
      if (feedback === true){
        this.reset();
      };
    };
    this.checkCollisions();
    return this.x, this.y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    switch(key){
      case "up" : this.y += -tableY; break;
      case "down" : this.y += tableY; break;
      case "left" : this.x += -tableX; break;
      case "right" : this.x += tableX; break;
    };
}

Player.prototype.reset = function() {
  this.x = 2 * tableX;
  this.y = (4 + 0.75) * tableY;
}

Player.prototype.checkCollisions = function() {
    for (var i=0; i<allEnemies.length; i++) {
      if (this.y === allEnemies[i].y
          && Math.abs(this.x - allEnemies[i].x) < 45) {
        alert("Oh no... Try again?");
        this.reset();
      };
    };
}
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

var allEnemies = [
  new Enemy(0), new Enemy(0), // row 1
  new Enemy(1), new Enemy(1), // row 2
  new Enemy(2), new Enemy(2), // row 3
];

var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
})
