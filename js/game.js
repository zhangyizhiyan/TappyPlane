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
      }        
    };
});
