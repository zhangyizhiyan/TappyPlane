define(function(require,exports,module){
    var animation = require("./game.js").game.layaClass.Animation;
    var timer = Laya.timer;
    var Bodies = Matter.Bodies,
        Vertices = Matter.Vertices,
        Vector = Matter.Vector,
        Body = Matter.Body,
        Events = Matter.Events;
    var collisionCategory = require("./game.js").game.collisionCategory;
    
    var vertices = Vertices.fromPath("1 16 6 11 15 12 22 18 32 17 22 6 \
    26 1 69 1 74 7 69 13 77 28 81 17 85 18 85 64 81 66 78 64 69 63 \
    61 72 54 72 47 64 33 60 25 64 19 57 20 51 23 50 9 31 3 30");
    
    /**
     * 构造玩家对象，x,y为位置坐标，type为飞机类型，
     * 可选"blue"、"green"、"yellow"、"red"
     * isphysic 是否为物理body,否则直接渲染
     * 是则调用matter.js渲染
     */
    exports.init = function(x,y,type,isphysic){
        if (isphysic == undefined || isphysic == false){
            return createAnimation(x,y,type);
        }else{
            return createBody(x,y,type);
        }
    }
    
    function createAnimation(x,y,type){
        var width = Laya.loader.getRes("TappyPlane/planeBlue1.png").width;
        var height = Laya.loader.getRes("TappyPlane/planeBlue1.png").height;
        var ani = Object.create(animation);
        var urls = setUrls(type);
                     
        
        ani.loadImages(urls);
        ani.width = width;
        ani.height = height;
        ani.pos(x,y);
        ani.interval = 200;
        ani.loop = true;
        ani.play();
        return ani;
    }
    
    /**以中心点为定位点 */
    function createBody(x, y, type) {
        var body = Bodies.fromVertices(x, y, vertices);
        var offset = Vector.sub(body.position, body.bounds.min);
        body.render.sprite.xOffset = offset.x;
        body.render.sprite.yOffset = offset.y;
        //offset = Vector.add(offset, Vector.create(x, y));
        //Body.translate(body, offset);
        
        body._display = Object.create(animation);
        body._display.loadImages(setUrls(type));
        body._display.zOrder = 30;
        
        body._display.loop = true;
        body._display.interval = 300;
        body._display.play();
          
        //body.render.sprite.texture = setUrls(type);
        
        body.collisionFilter.category = collisionCategory.PLAYER;
        body.collisionFilter.mask =  collisionCategory.GROUND | 
                                     collisionCategory.ROCK |
                                     collisionCategory.COLLECTABLE;
        timer.loop(60,module,function(){
            Body.rotate(body,Math.PI / 90);
            if (body.angle >= Math.PI / 2 ){
                body.angle = Math.PI / 2 ;
            }
        });
        body.label = "player";
        
        Events.on(body,"collisionStart",function(e){
            if (!require("./game.js").game.isGameEnd) {
                if (e.body.label != "star" && e.body.label != "score") {
                    require("./game.js").game.scrollSpeed = 0;
                    require("./game.js").game.backgroundSpeed = 0;
                    if (navigator.vibrate) {
                        navigator.vibrate(300);
                    } else if (navigator.webkitVibrate) {
                        navigator.webkitVibrate(300);
                    }
                    require("./game.js").game.isGameEnd = true;
                }
                
            }
        });
        
                                       
        return body;
    }
    
    function setUrls(type){
        var urls = ["TappyPlane/planeBlue1.png",
                     "TappyPlane/planeBlue2.png","TappyPlane/planeBlue3.png"];          
        if(type == "green"){
            urls = ["TappyPlane/planeGreen1.png",
                     "TappyPlane/planeGreen2.png","TappyPlane/planeGreen3.png"];
        }else if(type == "yellow"){
            urls = ["TappyPlane/planeYellow1.png",
                     "TappyPlane/planeYellow2.png","TappyPlane/planeYellow3.png"];
        }else if(type == "red"){
            urls = ["TappyPlane/planeRed1.png",
                     "TappyPlane/planeRed2.png","TappyPlane/planeRed3.png"];
        } 
        
        return urls;                  
    }
    
});