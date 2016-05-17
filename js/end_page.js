/**
 * 结束页面
 */
define(function(require,exports,module){
    var Event = laya.events.Event;

    // 创建end_pageUI的子类
    function endUI() {
        endUI.super(this);
        
        var score = require("./game.js").game.score;
        var bestScore = laya.net.LocalStorage.getItem("bestScore") || "0";
        this.lab_score.text = score;
        this.lab_bestScore.text = "最佳得分:"+ bestScore;
        
        if (score > require("./game.js").game.level3){
            this.plane.graphics.clear();
            this.plane.loadImage("UI/medalGold.png");
        }else if (score > require("./game.js").game.level2){
            this.plane.graphics.clear();
            this.plane.loadImage("UI/medalSilver.png");
        }            
        this.btn_restart.on(Event.CLICK, this, onBtnClick);
  

        function onBtnClick() {
            exports.clear();
            require.async("./play_page.js",function(exports){
                require("./game.js").game.isReset = true;
                exports.show();
            });          
        }
    }

    Laya.class(endUI, "endUI", end_pageUI);
    exports.show = function(){
        Laya.stage.addChild(new endUI());
    }
    exports.clear = function(){
        Laya.stage.removeChildren();
    }
});