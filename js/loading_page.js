/**
 * 加载页面模块
 */
define(function(require,exports,module){
   
   var centerWidth = Laya.stage.width / 2;
   var centerHeight = Laya.stage.height / 2;
   
   var Handler = laya.utils.Handler;
   var Sprite = laya.display.Sprite;
   var res = ["res/img/banner.png",
        "res/img/progressBar$bar.png",
        "res/img/progressBar.png"]; 
   var progressBar;
   var banner;
       
    exports.progress = function(value) {
        progressBar && (progressBar.value = value);
    }
    
    exports.show = function(){  
        Laya.loader.load(res,Handler.create(this,onLoaderComplete));
   
        function onLoaderComplete(){
            progressBar = new laya.ui.ProgressBar("res/img/progressBar.png");
            progressBar.sizeGrid = "5,5,5,5";
            progressBar.width = 400;
            progressBar.pivot(progressBar.width / 2 ,progressBar.height / 2);
            progressBar.pos(centerWidth,centerHeight + 100);
                      
            Laya.stage.addChild(progressBar);
            Laya.stage.bgColor = "#FFFFFF";
            
            banner =  new Sprite();
            banner.loadImage("res/img/banner.png");
            banner.pivot(banner.width /2 , banner.height /2);
            banner.pos(centerWidth,centerHeight - 50);
            Laya.stage.addChild(banner);
            
        } 
   
    }
    
    exports.clear = function () {
        Laya.stage.removeChildren();
        progressBar.destroy();
        banner.destroy();
    }
    
    
    
});