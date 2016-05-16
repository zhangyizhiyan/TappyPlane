/**
 * 入口模块
 */
define(function(require,exports,module){
    var Handler = laya.utils.Handler;
    var Loader = laya.net.Loader;
    var Url = [{url:"res/img/TappyPlane.json",type:Loader.ATLAS},
                {url:"res/img/UI.json",type:Loader.ATLAS},
                {url:"res/sound/theme.mp3",type:Loader.SOUND},
                {url:"res/sound/boom.mp3",type:Loader.SOUND},
                {url:"res/sound/fly.mp3",type:Loader.SOUND},
                {url:"res/sound/score.mp3",type:Loader.SOUND}];
   
    var width = 800;
    var height = 480;
    var SCREEN_HORIZONTAL = laya.display.Stage.SCREEN_HORIZONTAL;
    var SHOW_FULL = laya.display.Stage.SIZE_FULL;
                           
    
    
    function onAtlasLoader(){
        require.async("./js/start_page.js",function(exports){
            loadingPage.clear();
            exports.show();
        });
    }

    Laya.init(width,height,laya.webgl.WebGL);
    laya.webgl.atlas.AtlasResourceManager.enable();
    Laya.stage.screenMode = SCREEN_HORIZONTAL;
    Laya.stage.scaleMode = SHOW_FULL;
    Laya.stage.frameRate = "slow";
    var loadingPage = require("./js/loading_page.js");
    loadingPage.show();
    Laya.loader.load(Url,Handler.create(this,onAtlasLoader),
          Handler.create(loadingPage,loadingPage.progress,[],false));
    laya.utils.Stat.show(0,0);
});