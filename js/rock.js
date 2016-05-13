/**
 * 柱子实体模块
 */
define(function(require,exports,module){
    var Sprite = require("./game.js").game.layaClass.Sprite;
    var Hander = laya.utils.Handler;   
    /**
     * 构造柱子，x,y为位置坐标，type为柱子类型
     * 可选"rock"、"rockDown"、"rockGrass"、"rockGrassDown"
     * "rockIce"、"rockIceDown"、"rockSnow"、"rockSnowDown"
     * isPhysic 是否为物理body 否则直接渲染
     * 是则matter.js渲染
     */
    exports.init = function(x,y,type,isPhysic){    
        if(isPhysic == undefined || isPhysic == false){
            return createSprite(x,y,type);
        }else{
            
        }
        function createSprite(x,y,type){
            var rock = Object.create(Sprite);
            var img = "TappyPlane/rock.png";
            
            if (type == "rockDown"){
                img = "TappyPlane/rockDown.png";
            }else if(type == "rockGrass"){
                img = "TappyPlane/rockGrass.png"
            }else if(type == "rockGrassDown"){
                img = "TappyPlane/rockGrassDown.png"
            }else if(type == "rockIce"){
                img = "TappyPlane/rockIce.png"
            }else if(type == "rockIceDown"){
                img = "TappyPlane/rockIceDown.png"
            }else if(type == "rockSnow"){
                img = "TappyPlane/rockSnow.png"
            }else if(type == "rockSnowDown"){
                img = "TappyPlane/rockSnowDown.png"
            }
            rock.loadImage(img);
            rock.pos(x,y);
                  
            return rock;
            
        }
           
     }
    
});