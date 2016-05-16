/**
 * 柱子实体模块
 */
define(function (require, exports, module) {
    var Sprite = require("./game.js").game.layaClass.Sprite;
    var Hander = laya.utils.Handler;
    var Bodies = Matter.Bodies,
        Vertices = Matter.Vertices,
        Vector = Matter.Vector,
        Body = Matter.Body;
    var collisionCategory = require("./game.js").game.collisionCategory;
    var verticesUp = Vertices.fromPath("62 1 69 1 81 102 86 102 94 173 \
    100 178 106 236 0 236 29 130 37 122");
    var verticesDown = Vertices.fromPath("62 237 69 237 81 135 86 134 94 64 \
    100 60 107 1 0 1 28 107 37 114");
    /**
     * 构造柱子，x,y为位置坐标，type为柱子类型
     * 可选"rock"、"rockDown"、"rockGrass"、"rockGrassDown"
     * "rockIce"、"rockIceDown"、"rockSnow"、"rockSnowDown"
     * isPhysic 是否为物理body 否则直接渲染
     * 是则matter.js渲染
     */
    exports.init = function (x, y, type, isPhysic) {
        if (isPhysic == undefined || isPhysic == false) {
            return createSprite(x, y, type);
        } else {
            return createBody(x, y, type);
        }
        function createSprite(x, y, type) {
            var rock = Object.create(Sprite);

            rock.loadImage(setImg(type));
            rock.pos(x, y);

            return rock;

        }
        /*以左上角定位 */
        function createBody(x, y, type) {
            var body;
            if (type.indexOf("Down") != -1) {
                body = Bodies.fromVertices(0, 0, verticesDown);
            } else {
                body = Bodies.fromVertices(0, 0, verticesUp);
            }

            var offset = Vector.sub(body.position, body.bounds.min);
            body._offset = offset;
            body.render.sprite.xOffset = offset.x;
            body.render.sprite.yOffset = offset.y;
            offset = Vector.add(offset, Vector.create(x, y));
            Body.translate(body, offset);
            body._pos = { x: body.position.x, y: body.position.y };

            body._display = Object.create(Sprite);
            body._display.loadImage(setImg(type));
            body._display.zOrder = 10;


            //body.render.sprite.texture = setImg(type);
            body.collisionFilter.category = collisionCategory.ROCK;
            body.collisionFilter.mask = collisionCategory.PLAYER;
            Body.setStatic(body, true);
            Body.setDensity(body, 9999);

            return body;
        }


        function setImg(type) {
            var img = "TappyPlane/rock.png";

            if (type == "rockDown") {
                img = "TappyPlane/rockDown.png";
            } else if (type == "rockGrass") {
                img = "TappyPlane/rockGrass.png"
            } else if (type == "rockGrassDown") {
                img = "TappyPlane/rockGrassDown.png"
            } else if (type == "rockIce") {
                img = "TappyPlane/rockIce.png"
            } else if (type == "rockIceDown") {
                img = "TappyPlane/rockIceDown.png"
            } else if (type == "rockSnow") {
                img = "TappyPlane/rockSnow.png"
            } else if (type == "rockSnowDown") {
                img = "TappyPlane/rockSnowDown.png"
            }
            return img;
        }


    }

});