/**
 * 游戏主页面
 * 
 */
define(function(require,exports,module){
    var sprite = require("./game.js").game.layaClass.Sprite;
    var collisionCategory = require("./game.js").game.collisionCategory;
    var rockTime = require("./game.js").game.rockTime;
    var groundManager = require("./grounds_manager.js");
    var rocks = require("./rocks_manager.js");
    var Star = require("./star.js");
    var score = require("./game.js").game.score;
    var timer = Laya.timer;
    var time = 50;
    var inUse = [];
    var starInUse = [];
    var level1 = require("./game.js").game.level1,
        level2 = require("./game.js").game.level2,
        level3 = require("./game.js").game.level3;

    var Pool = laya.utils.Pool;
    var World = Matter.World,
        Engine = Matter.Engine,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Events = Matter.Events,
        Composite = Matter.Composite,
        Vector = Matter.Vector,
        Common = Matter.Common,
        Pair = Matter.Pair;
    var engine ,scrollVector,scrollSpeed;
      
    exports.show = function () {
        var root = Object.create(sprite);
        engine = Engine.create({
            enableSleeping: false,
            render: {
                container: root,
                controller: LayaRender,
                options: {
                    width: Laya.stage.width,
                    height: Laya.stage.height,
                    wireframes: false
                }
            }

        });
        var container = require("./game.js").game.container = engine.render.spriteContainer;
        var background = (function () {
            var bk1 = Object.create(sprite);
            var bk2 = Object.create(sprite);
            bk1.loadImage("TappyPlane/background.png", 0, 0);
            bk2.loadImage("TappyPlane/background.png", Laya.stage.width, 0);
            background = Object.create(sprite);
            background.addChild(bk2);
            background.addChild(bk1);

            timer.loop(60, module, function () {
                if (background.x <= -Laya.stage.width) {
                    background.x = 0;
                }
                background.x -= require("./game.js").game.backgroundSpeed;
            });
            return background;
        })();
        var grounds = groundManager.init();
        var scoreUI = require("./score.js").init(10, 10);
        var planeType = "blue";
        var player;

        if (require("./game.js").game.isReset) {
            require("./game.js").game.score = 0;
            require("./game.js").game.scrollSpeed = 40;
            require("./game.js").game.backgroundSpeed = 1;
            require("./game.js").game.isGameEnd = false;
            
        }
        scrollSpeed = Math.floor(time * require("./game.js").game.scrollSpeed / 1000);
        scrollVector= Vector.create(scrollSpeed, 0);

        
        Laya.stage.addChild(root);     
        engine.world.gravity = {x:0,y:0.6}; 
            
        container.addChild(background); 
        container.addChild(scoreUI);     
        runLoop();
        World.add(engine.world,grounds);
       
        if (laya.net.LocalStorage.getItem("bestScore") > level3){
            planeType = "red";
        }else if(laya.net.LocalStorage.getItem("bestScore") > level2){
            planeType = "yellow";
        }else if(laya.net.LocalStorage.getItem("bestScore") > level1){
             planeType = "green";
        }
         
         
        player = require("./player.js").init(Laya.stage.width/2,Laya.stage.height/2,planeType,true);
        World.add(engine.world,player);     
        
        Laya.stage.on("speedChange", this, function () {
            scrollSpeed = Math.floor(time * require("./game.js").game.scrollSpeed / 1000);
            scrollVector = Vector.create(scrollSpeed, 0);
        });
        Laya.stage.on("mousedown", this, function () {
            if (!require("./game.js").game.isGameEnd) {
                Body.setVelocity(player, Vector.create(0, -5));
                Body.setAngle(player, -Math.PI / 4);
                player._display.stop();
                player._display.interval = 100;
                player._display.play();
                player._isUp = true;
                
                if(player.position.y < -10){
                    Events.trigger(player,"collisionStart",{body:{}});
                }
            }

            timer.once(1000, module, function () {
                if (!player._isUp) {
                    player._display.stop();
                    player._display.interval = 300;
                    player._display.play();
                }
            });
            
        });
        Laya.stage.on("mouseup", this, function () {
            player._isUp = false;
        });

        laya.media.SoundManager.playMusic("res/sound/theme.mp3");
        Engine.run(engine);
    };
    exports.clear = function() {
        timer.clearAll(module);
        World.clear(engine.world);
        Engine.clear(engine);
        Laya.stage.removeChildren();
        Laya.stage.offAll("mousedown");
        Laya.stage.offAll("speedChange");
        Laya.stage.offAll("mouseup");
        inUse = [];
        starInUse = [];
        laya.media.SoundManager.stopMusic();
        
        require.async("./end_page.js",function(exports){
           exports.show(); 
        }); 
        
    };
    
    function runLoop() {
        setup();
        gameLoop();
        collisionEvents();

        
        
        function setup() {
            var rockType = "rock";
            if (laya.net.LocalStorage.getItem("bestScore") > level3) {
                rockType = "rockIce";
            } else if (laya.net.LocalStorage.getItem("bestScore") > level2) {
                rockType = "rockSnow";
            } else if (laya.net.LocalStorage.getItem("bestScore") > level1) {
                rockType = "rockGrass";
            }
            createRocks(rockType);
            timer.loop(rockTime, module, function () {
                createRocks(rockType);
                createStar();
            });
        }
        
        function gameLoop() {
            timer.loop(time, module, function () {
                movingRocks();
                movingStar();
            });
        }
        function movingStar(){
            for (var i = 0,len = starInUse.length; i < len ;i++){
                if(starInUse[i].position.x < -Laya.stage.width /2){
                    starInUse[i].render.visible = true;
                    Pool.recover(starInUse[i]._type,starInUse[i]);
                    starInUse.splice(i,1);
                    len = starInUse.length;
                    continue;
                }
                Body.setPosition(starInUse[i],Vector.sub(starInUse[i].position,scrollVector));
            }
        }
        function movingRocks() {
            for (var i = 0, len = inUse.length; i < len; i++) {
                for (var j = 0; j < inUse[i].bodies.length; j++) {
                    if (inUse[i].bodies[0].position.x < -Laya.stage.width / 2) {
                        Pool.recover(inUse[i]._type, inUse[i]);
                        inUse.splice(i, 1);
                        len = inUse.length;
                        break;
                    }
                    Body.setPosition(inUse[i].bodies[j], Vector.sub(inUse[i].bodies[j].position, scrollVector));
                }
            }
        }
        

        function createRocks(rockType) {
            var rs = Pool.getItemByCreateFun(rockType, function () {
                return rocks.createRocks(rockType, true);
            });
            for (var i = 0, len = rs.bodies.length; i < len; i++) {
                Body.setPosition(rs.bodies[i], Vector.add(rs.bodies[i]._pos,
                    Vector.create(Laya.stage.width, 0)));  
            }
            World.add(engine.world, rs);
            inUse.push(rs);
        }
        function createStar(){
            var x = Common.random(Laya.stage.width + 100,Laya.stage.width + 200);
            var y = Common.random(50,400);
            var type,star;
            var i = Common.choose([1,2,3,4,5,6,7,8,9,10]);
            if (i == 8){
                type = "gold";
            }else if( i == 2 || i == 5 || i == 7){
                type = "bronze";
            }else if( i == 1 || i == 4){
                type = "silver";
            }
            if (type != undefined){
                star = Pool.getItemByCreateFun(type, function () {
                    return Star.init(x,y,type,true);
                 });
                Body.setPosition(star,Vector.create(x,y));                                 
                World.addBody(engine.world, star);
                starInUse.push(star);
            }         
        }
        
        function collisionEvents(){
            Events.on(engine,"collisionStart",function(e){
                var pairs = e.pairs;
                for(var i = 0; i < pairs.length;i++){
                    var pair = pairs[i];
                    Events.trigger(pair.bodyA.parent,"collisionStart",{body:pair.bodyB.parent});
                    Events.trigger(pair.bodyB.parent,"collisionStart",{body:pair.bodyA.parent});             
                }
            });
            Events.on(engine,"collisionEnd",function(e){
                var pairs = e.pairs;
                for(var i = 0; i < pairs.length;i++){
                    var pair = pairs[i];
                    Events.trigger(pair.bodyA.parent,"collisionEnd",{body:pair.bodyB.parent});
                    Events.trigger(pair.bodyB.parent,"collisionEnd",{body:pair.bodyA.parent});             
                }
            });
        }
                
    }
    
    
});