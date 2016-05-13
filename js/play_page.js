/**
 * 游戏主页面
 * 
 */
define(function(require,exports,module){
    var sprite = require("./game.js").game.layaClass.Sprite;
    var timer = Laya.timer;
    var World = Matter.World,
        Engine = Matter.Engine,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Composite = Matter.Composite;

    var root = Object.create(sprite);
    var engine = Engine.create({
            enableSleeping:true,
            render:{
                container:root,
                controller:LayaRender,
                options:{
                    width:Laya.stage.width,
                    height:Laya.stage.height,
                    wireframes:false
                }
            }

         });
    var container = engine.render.spriteContainer;
    var groundY = Laya.stage.height - Laya.loader.getRes("TappyPlane/groundDirt.png").height; 
    var Ground = require("./ground.js");    
    var background = (function(){
        var bk1 = Object.create(sprite);
        var bk2 = Object.create(sprite);
        bk1.loadImage("TappyPlane/background.png",0,0);
        bk2.loadImage("TappyPlane/background.png",Laya.stage.width,0);
        background = Object.create(sprite);
        background.addChild(bk2);
        background.addChild(bk1);
        
        timer.loop(60,module,function(){
            if (background.x <= -Laya.stage.width){
                background.x = 0;
            }
            background.x -= 1;
        });      
        return background;
    })();
    var grounds = (function(){
        var g1 = Ground.init(0,groundY,"dirt",true);
        var g2 = Ground.init(Laya.stage.width,groundY,"dirt",true);
        grounds = Composite.create();
        Composite.add(grounds,g1);
        Composite.add(grounds,g2);
        console.log(grounds);
        console.log(g1);
        return grounds;
    })();
    
        
    exports.show = function(){ 
        Laya.stage.addChild(root);     
        engine.world.gravity = {x:0,y:3};      
        container.addChild(background);      
        World.add(engine.world,grounds);
        var player = require("./player.js").init(Laya.stage.width/2,Laya.stage.height/2,"blue",true);
        World.add(engine.world,player);
        
        Engine.run(engine);
    };
    exports.clear = function() {
        timer.clearAll(module);
        Engine.clear(engine);
        Laya.stage.removeChildren();
    };
});