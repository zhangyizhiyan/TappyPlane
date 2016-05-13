/**
 * 星星实体模块
 */
define(function(require,exports,module){
    var Sprite = require("./game.js").game.layaClass.Sprite;
    var timeLine = new laya.utils.TimeLine();
    var Hander = laya.utils.Handler;
    var linearIn = laya.utils.Ease.linearIn; 
      
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
            
        }
        function createSprite(x,y,type){
            var Star = Object.create(Sprite);
            var img = "TappyPlane/starBronze.png";
            if(type == "silver"){
                img = "TappyPlane/starSilver.png";
            }else if (type == "gold"){
                img = "TappyPlane/starGold.png";
            }
            Star.loadImage(img);
            Star.pos(x,y);
            shine(Star,shineTime);
           
            return Star;
            
        }
        
        function shine(obj,time){
            timeLine.add("shineDown",0);
            timeLine.to(obj,{alpha:0.5},time);
            timeLine.add("shineUp",0);
            timeLine.to(obj,{alpha:1},time);
            timeLine.play(0,true);
            
        }
                      
    }; 
  
    
});