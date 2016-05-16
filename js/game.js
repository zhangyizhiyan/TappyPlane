/// <reference path="../libs/LayaAir.d.ts"/>
/**
 * 全局模块
 */
define(function(require,exports,module){
    exports.game = {
      layaClass:{
          Sprite:new laya.display.Sprite(),
          Animation: new laya.display.Animation()
      },
      collisionCategory:{
          PLAYER:Math.pow(2,0),
          GROUND:Math.pow(2,1),
          ROCK:Math.pow(2,2),
          COLLECTABLE:Math.pow(2,3)
      },
      /**仅供setter getter使用，不应在外部修改读取 */
      _scrollSpeed:40,
      get scrollSpeed() {
          return this._scrollSpeed;
      },
      set scrollSpeed(value) {
          this._scrollSpeed = value;
          Laya.stage.event("speedChange");
      },
      rockTime:5000,
      _score:0,
      get score(){
          return this._score;
      },
      set score(v){
          this._score = v;
          Laya.stage.event("scoreChange");
      },
      backgroundSpeed:1,
      isGameEnd:false 
    };
});
