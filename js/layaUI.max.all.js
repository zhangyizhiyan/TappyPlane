var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;   
var end_pageUI=(function(_super){
		function end_pageUI(){
			
		    this.btn_restart;
		    this.plane;
		    this.lab_score;
		    this.lab_bestScore;

			end_pageUI.__super.call(this);
		}

		CLASS$(end_pageUI,'game.ui.test.end_pageUI',_super);
		var __proto__=end_pageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(end_pageUI.uiView);
		}

		STATICATTR$(end_pageUI,
		['uiView',function(){return this.uiView={"type":"View","child":[{"props":{"x":0,"y":0,"skin":"UI/UIbg.png","sizeGrid":"5,5,5,5","width":800,"height":480},"type":"Image"},{"props":{"x":400,"y":90,"skin":"UI/textGameOver.png","pivotX":206,"pivotY":39},"type":"Image"},{"props":{"x":282,"y":310,"skin":"UI/btn_Small.png","label":"重新开始","width":216,"height":58,"var":"btn_restart","stateNum":"1","labelFont":"宋体","labelSize":28,"labelColors":"#FF0000","labelBold":true},"type":"Button"},{"props":{"x":223,"y":149,"skin":"UI/medalBronze.png","var":"plane"},"type":"Image"},{"props":{"x":367,"y":150,"text":"label","width":170,"height":55,"align":"center","bold":true,"color":"#ff0000","font":"宋体","fontSize":120,"var":"lab_score"},"type":"Label"},{"props":{"x":648,"y":16,"text":"label","width":128,"height":40,"var":"lab_bestScore","align":"right","bold":true,"color":"#ff0000","fontSize":20,"font":"宋体"},"type":"Label"}],"props":{"width":800,"height":480}};}
		]);
		return end_pageUI;
	})(View);