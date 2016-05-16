/**
 * 地面管理模块
 */
define(function(require,exports,module){
    var Body = Matter.Body,
        Composite = Matter.Composite,
        Vector = Matter.Vector;
    var timer = Laya.timer;
    var Ground = require("./ground.js");
    var groundY = Laya.stage.height - Laya.loader.getRes("TappyPlane/groundDirt.png").height;
    var g1,g2;
    var time = 50;
    var scrollSpeed = Math.floor(time * require("./game.js").game.scrollSpeed / 1000);
        
    exports.init = function(){
        var groundType = "dirt";
        if(laya.net.LocalStorage.getItem("bestScore") > require("./game.js").game.level3){
            groundType = "ice";
        }else if(laya.net.LocalStorage.getItem("bestScore") > require("./game.js").game.level2){
            groundType = "snow";
        }else if(laya.net.LocalStorage.getItem("bestScore") > require("./game.js").game.level1){
            groundType = "grass";
        }               
        g1 = Ground.init(0, groundY, groundType, true);
        g2 = Ground.init(Laya.stage.width, groundY, groundType, true);
        
        var position = {x:g2.position.x,y:g2.position.y};
        var endPos = -Laya.stage.width + g1._offset.x;
        var scrollVector = Vector.create(scrollSpeed,0);
        timer.loop(time,module,function () {
           // console.log(-Laya.stage.width+ g1._offset.x);
            if (g1.position.x <= endPos) {
                Body.setPosition(g1,position);
            } else if (g2.position.x <= endPos) {
                Body.setPosition(g2,position);
            }
            Body.setPosition(g1,Vector.sub(g1.position,scrollVector));
            Body.setPosition(g2,Vector.sub(g2.position,scrollVector));
        });
        Laya.stage.on("speedChange",this,function(){
            scrollSpeed = Math.floor(time * require("./game.js").game.scrollSpeed / 1000); 
            scrollVector = Vector.create(scrollSpeed,0);
        });
        var grounds = Composite.create();
        Composite.add(grounds, g1);
        Composite.add(grounds, g2);
        return grounds; 
    }
    exports.stop = exports.clear;
    exports.clear = function(){
        timer.clearAll(module);
    }           
});