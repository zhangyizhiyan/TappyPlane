/**
 * 地面实体模块
 */
define(function(require,exports,module){
    var Sprite = require("./game.js").game.layaClass.Sprite;
    var Bodies = Matter.Bodies,
        Vertices = Matter.Vertices,
        Vector = Matter.Vector,
        Body = Matter.Body;
    var collisionCategory = require("./game.js").game.collisionCategory;
        
  
    var vertices = Vertices.fromPath("808 71 807 37 764 27 744 1 657 3 \
    636 24 599 27 574 55 534 55 509 44 470 44 437 13 374 13 \
    350 27 307 28 249 6 159 8 134 34 91 46 41 43 33 35 0 36 0 70");
   
    /**
     * 构造地面，x,y为位置坐标，type为地面类型，
     * 可选"dirt"、"grass"、"ice"、"snow"
     * isphysic 是否为物理body,否则直接渲染
     * 是则调用matter.js渲染
     */
    exports.init = function(x,y,type,isphysic){  
        if (isphysic == undefined || isphysic == false){
            return createSprite(x,y,type);
        }else{
            return createBody(x,y,type);
        }
       
        function createSprite(x,y,type){
            var Ground = Object.create(Sprite);
            var img = setImg(type);     
            Ground.loadImage(img);
            Ground.pos(x,y);
             
            return Ground;           
        }
        /**以左上角为定位点 */
        function createBody(x, y, type) {         
           var body = Bodies.fromVertices(0,0,vertices);
           var offset = Vector.sub(body.position,body.bounds.min);
           body.render.sprite.xOffset = offset.x ;
           body.render.sprite.yOffset = offset.y ;
           offset = Vector.add(offset,Vector.create(x,y));
           Body.translate(body,offset);
          
           console.log(body.position);
           body.render.sprite.texture = setImg(type);
           body.collisionFilter.category = collisionCategory.GROUND;
           body.collisionFilter.mask = collisionCategory.PLAYER;
           Body.setStatic(body,true);
           Body.setDensity(body,9999);
           return body;
        }
        
        function setImg(type){
            var img = "TappyPlane/groundDirt.png";
            if (type == "grass"){
                img = "TappyPlane/groundGrass.png"
            }else if(type == "ice"){
                img = "TappyPlane/groundIce.png"
            }else if(type == "snow"){
                img = "TappyPlane/groundSnow.png"
            }
            return img;
        }
        
    };       
   
    
});