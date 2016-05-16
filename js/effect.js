/**
 * 得分效果
 */
define(function(require,exports,module){
    var txtUI = new laya.ui.Label();
    var tween = new laya.utils.Tween();
    var Handler = laya.utils.Handler;
    /*根据分数 不同效果 */
    exports.init = function(x,y,score){
        var color = [];
        color[1] = "#00FF00";
        color[3] = "#0000FF";
        color[5] = "#EEEE00";
        
        
        txtUI.text ="+"+ String(score);
        txtUI.font ="黑体";
        txtUI.bold = true;
        txtUI.fontSize = 48;
        txtUI.zOrder = 100;
        txtUI.color = color[score];
        
        txtUI.pos(x,y);
        var endPos = txtUI.y - 80;
        tween.to(txtUI,{y:endPos},2000,null,Handler.create(this,function(){
            txtUI.removeSelf();
        }));
        
        laya.media.SoundManager.playSound("res/sound/score.mp3",1);
        
        
        return txtUI;      
    }
});
