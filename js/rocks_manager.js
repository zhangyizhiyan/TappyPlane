/**
 * 柱子管理模块，根据json文件生成一组柱子
 * 共有"rock","rockGrass","rockIce","rockSnow"四种类型的柱子
 * 每种类型有3种布局
 */
define(function(require,exports,module){
    var Sprite = require("./game.js").game.layaClass.Sprite;
    var rock = require("./rock.js");
    var json = require("../res/data/rockteam.json","json");
    
    /**
     * 创建柱子组，type为类型
     * 可选"rock","rockGrass","rockIce","rockSnow"
     * 随机3种布局
     * isPhysic 是否物理body，是则matter.js渲染
     * 否则直接渲染
     */   
    exports.createRocks = function(type,isPhysic){
        var rocks = Object.create(Sprite);
        var rockType,rockObject;
        var index = Math.floor(Math.random() * 3);
        var rockArry = json[type][index]["rock"+String(index+1)];
        for (var i = 0,len = rockArry.length;i < len;i++){
            rockType = (rockArry[i].direction == "up")?
                        type:
                        type + "Down";
            
            rockObject = rock.init(rockArry[i].x,rockArry[i].y,rockType,isPhysic);
            rocks.addChild(rockObject);
        }          
        return rocks;
    }
    
    
});