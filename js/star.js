/**
 * 星星实体模块
 */
define(function(require,exports,module){
    var Sprite = require("./game.js").game.layaClass.Sprite;
    var collisionCategory = require("./game.js").game.collisionCategory;
    var timeLine = new laya.utils.TimeLine();
    var timer = Laya.timer;
    var Hander = laya.utils.Handler;
    var linearIn = laya.utils.Ease.linearIn; 
    var width = Laya.loader.getRes("TappyPlane/starBronze.png").width;
    var height = Laya.loader.getRes("TappyPlane/starBronze.png").height;
    
    
    var Bodies = Matter.Bodies,
        Vertices = Matter.Vertices,
        Vector = Matter.Vector,
        Body = Matter.Body,
        Events = Matter.Events;
      
    /**
     * 构造星星，x,y为位置坐标，type为星星类型
     * 可选"bronze"、"silver"、"gold"
     * isPhysic 是否为物理body 否则直接渲染
     * 是则matter.js渲染
     */
    exports.init = function(x,y,type,isPhysic){  
        var shineTime = 800 + Math.random() * 300;
        
        if(isPhysic == undefined || isPhysic == false){
            return createSprite(x,y,type);
        }else{
            return createBody(x,y,type);
        }
        function createSprite(x,y,type){
            var Star = Object.create(Sprite);
            Star.loadImage(setImg(type));
            Star.pos(x,y);
            shine(Star,shineTime);
           
            return Star;
            
        }
        /*以中心点定位 */
        function createBody(x, y, type) {
            var body = Bodies.rectangle(x, y, width, height);
            var offset = Vector.sub(body.position, body.bounds.min);
            body._pos = { x: body.position.x, y: body.position.y };
            body._type = type;
            body.render.sprite.xOffset = offset.x;
            body.render.sprite.yOffset = offset.y;
            
            
            body._display = Object.create(Sprite);
            body._display.loadImage(setImg(type));
            body._display.zOrder = 8;
            shine(body._display, shineTime);

            body.collisionFilter.category = collisionCategory.COLLECTABLE;
            body.collisionFilter.mask = collisionCategory.PLAYER;
            body.isSensor = true;
            Body.setStatic(body, true);

            body.label = "star";
            
            Events.on(body,"collisionStart",function(e){
                var score = {"bronze":1,
                             "silver":3,
                             "gold":5};
                
                if(!require("./game.js").game.isGameEnd && !body._iscollision){
                    if (e.body.label == "player"){
                        require("./game.js").game.score += score[body._type];
                        body.render.visible = false;
                    }   
                    body._iscollision = true;
                }
                
                
            });
            Events.on(body,"collisionEnd",function(e){
                timer.once(5000,module,function(){
                   if(body._iscollision){
                       body._iscollision = false;
                   }
                });
            });         
            return body;
        }
        function shine(obj,time){
            timeLine.add("shineDown",0);
            timeLine.to(obj,{alpha:0.5},time);
            timeLine.add("shineUp",0);
            timeLine.to(obj,{alpha:1},time);
            timeLine.play(0,true);
            
        }
        function setImg(type) {
            var img = "TappyPlane/starBronze.png";
            if (type == "silver") {
                img = "TappyPlane/starSilver.png";
            } else if (type == "gold") {
                img = "TappyPlane/starGold.png";
            }
            return img;
        }
                      
    }; 
  
    
});