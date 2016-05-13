/**
 * 开始菜单模块
 */
define(function(require,exports,module){
    var timeLine = new laya.utils.TimeLine();
    var tween = new laya.utils.Tween();
    var timer = Laya.timer;
    var Ease = laya.utils.Ease;
    var Handler = laya.utils.Handler;
    var root = (function(){
        root = new laya.display.Sprite();
        root.width = Laya.stage.width;
        root.height = Laya.stage.height;
        return root;
    })();
    
        
    var background = (function(){
        background = new laya.display.Sprite();
        background.loadImage("TappyPlane/background.png", 0, 0);
        return background;
    })();
    
    
    var ground = (function (){
        ground = require("./ground.js").init(0,root.height);
        ground.pivot(0,ground.height);
        return ground;
    })();
    var star1 = require("./star.js").init(50,350);
    var star2 = require("./star.js").init(700,180,"gold");
    var star3 = require("./star.js").init(600,20,"silver");
    var ready = (function(){
        ready = new laya.display.Sprite();
        ready.loadImage("UI/textGetReady.png");
        ready.pivot(ready.width / 2 , ready.height / 2);
        ready.pos(root.width / 2 , 80);
       
        
        timeLine.add("scaleDown",0);
        timeLine.to(ready,{scaleX:0.8,scaleY:0.8},2000);
        timeLine.add("scaleUp",0);
        timeLine.to(ready,{scaleX:1,scaleY:1},2000);
        timeLine.play(0,true);
       
        return ready;
    })();
    
    var clickAble = (function(){
        clickAble = new laya.display.Sprite();
        clickAble.width = 150;
        clickAble.height = 150;
        var plane = (function(){
            plane = require("./player.js").init(
                clickAble.width / 2 ,clickAble.height / 2,"blue",false);
            plane.pivot(plane.width /2 ,plane.height /2);       
            return plane;
           
        })();
        var hand = (function(){
            var flag = false;
            var interval = plane.interval;
            hand = new laya.display.Sprite();
            hand.loadImage('UI/tap.png');
            hand.pos(clickAble.width / 2 + 40 ,clickAble.height / 2 + 40);

            timer.once(1000,module,function() {
                flyUp();
            });
                        
            function flyUp(){
                tween.to(plane,{rotation:-45},2000,null,Handler.create(this,flyDown));
                plane.stop();
                plane.interval = interval * 0.6;
                plane.play();
                switchSprite();
            }
            function flyDown(){
                tween.to(plane,{rotation:0},2000,null,Handler.create(this,flyUp));
                plane.stop();
                plane.interval = interval;
                plane.play();
                switchSprite();
            }
            
            function switchSprite(){
               var url = (flag = !flag) ? 'UI/tapTick.png' : 'UI/tap.png';
               hand.graphics.clear();
               hand.loadImage(url);            
            }
            
            return hand;
        
        })(); 
        clickAble.addChild(hand);
        
        var tap = (function(){
            var tap = new laya.display.Sprite();
            tap.width = 300;
            tap.height = 150;
            var tapLeft = new laya.display.Sprite();
            tapLeft.loadImage("UI/tapRight.png");
            tapLeft.pos(10,tap.height /2 - 20);
            var tapRight = new laya.display.Sprite();
            tapRight.loadImage("UI/tapLeft.png");
            tapRight.pos(tap.width - 90,tap.height /2 - 20);
            tap.addChild(tapLeft);
            tap.addChild(tapRight);
            tap.pos(clickAble.width /2 ,clickAble.height /2);
            tap.pivot(tap.width /2,tap.height /2);
            return  tap;
        })();    
        clickAble.addChild(tap);
        

         
        clickAble.addChild(plane);
        clickAble.pivot(clickAble.width / 2, clickAble.height / 2);
        clickAble.pos(root.width / 2 , root.height / 2 - 20);
        
        clickAble.once("click",this,function(){
            var clear = exports.clear;
            var grayscaleMat,grayscaleFilter;
   
            if (laya.renders.Render.isWebGl){
                grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 
                                0, 0.3086, 0.6094, 0.0820, 
                                0, 0, 0.3086, 0.6094, 
                                0.0820, 0, 0, 0, 
                                0, 0, 1, 0];
                grayscaleFilter = new Laya.ColorFilter(grayscaleMat);
                root.filters = [grayscaleFilter];
            }
            require.async("./play_page.js",function(exports){
                 timer.once(500,module,function(){
                      exports.show();
                      clear();
                 });

            });             
        });
        
        return clickAble;
    })();
    
    var rocks = (function(){
        rocks = require("./rocks_manager.js").createRocks("rock");
        rocks.pos(root.width - 150,0);
        return rocks;
    })();
    


    exports.show = function () {
        Laya.stage.addChild(root);
        var res = [background,ready,star1,star2,star3,clickAble,rocks,ground];
        for (var i = 0 ,len = res.length; i < len; i++){
            root.addChild(res[i]);
        }

    }
    
    exports.clear = function(){
        tween.clear();
        timer.clearAll(module);
        timeLine.destory();
        Laya.stage.removeChild(root);
        //root.destroy();
    }
    

});