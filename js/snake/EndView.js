(function(window) {
	if(FlashVars.getValue("t"))
	{
		META(null,FlashVars.getValue("t"),"og:title");
		META(null,"JS3 Snakes Game","og:description");
	}
extend(EndView,UIElement);
function EndView(){
	//events
	newEvent("FACEBOOK_CLICKED");
	this.init();
	var public = EndView.prototype;
	var obj=this;
	var titlebg;
	this.scored =0;
	var tw;
	var fb;
	 var u="watersnake.fahimchowdhury.com?t=";
	var points;	
	// constructor:
	this.build=function()
	{
		titlebg = new UIElement();
		titlebg.styleName = "titlebg";
		titlebg.build();
		titlebg.setStyle();
		titlebg.setWidth(600);
		titlebg.setHeight(600);
		titlebg.arrange();
		this.addChild(titlebg);
		
		title = new UIElement();
		title.styleName = "overtitle";
		title.build();
		title.setStyle();
		title.setWidth(496);
		title.setHeight(115);
		title.y(96);
		title.x((titlebg.getWidth() * 0.5)-(title.getWidth() * 0.5));
		title.arrange();
		this.addChild(title);
		
		scoreH = new UIElement();
		scoreH.styleName = "scoreH";
		scoreH.build();
		scoreH.setStyle();
		scoreH.setWidth(341);
		scoreH.setHeight(162);
		scoreH.y(211);
		scoreH.x((titlebg.getWidth() * 0.5)-(scoreH.getWidth() * 0.5));
		scoreH.arrange();
		this.addChild(scoreH);
		
		textfield = new UIElement();
		textfield.styleName="scoreTextEnd";
		textfield.build();
		
		textfield.setStyle();
		textfield.setWidth(321);
		textfield.setHeight(90);
		textfield.arrange();
		scoreH.addChild(textfield);
		textfield.y(64);
		textfield.x(10);
		textfield.text(String(this.scored));
		
		shareText = new UIElement();
		shareText.styleName="shareText";
		shareText.build();
		shareText.setStyle();
		shareText.setWidth(titlebg.getWidth());
		shareText.setHeight(90);
		shareText.arrange();
		this.addChild(shareText);
		shareText.y(373);
		shareText.x((titlebg.getWidth() * 0.5)-(shareText.getWidth() * 0.5));
		shareText.text("share your score");
		
		fb = new UIElement();
		fb.styleName = "fb";
		fb.build();
		fb.setStyle();
		fb.setWidth(102);
		fb.setHeight(105);
		fb.y(453);
		fb.x((titlebg.getWidth() * 0.5)-(parseInt(fb.getWidth()) + 30));
		fb.buttonMode(true);
		fb.arrange();
		fb.addEventListener(MouseEvent.CLICK,onFacebookClick);
		this.addChild(fb);
		
		tw = new UIElement();
		tw.styleName = "tw";
		tw.build();
		tw.setStyle();
		tw.setWidth(102);
		tw.setHeight(105);
		tw.y(453);
		tw.x((titlebg.getWidth() * 0.5)+(30));
		tw.arrange();
		tw.buttonMode(true);
		tw.addEventListener(MouseEvent.CLICK,twClick);
		this.addChild(tw);
		
		points = this.scored;
	}
	
	
	function onFacebookClick(e)
	{
		
		 var t="I scored "+ String(points)+" on water snake!";
		 u=u+t;
		 window.open('http://www.facebook.com/sharer.php?u='+u+'&t='+t,'sharer','toolbar=0,status=0,width=626,height=436');
		 return false;
	}
	
	function twClick()
	{
		 var t="I scored "+ String(points)+" on water snake! http://watersnake.fahimchowdhury.com";
		 u=u+t;
		 window.open('https://twitter.com/intent/tweet?url='+u+'&text='+t,'sharer','toolbar=0,status=0,width=626,height=436');
		 return false;
	}
	
}
window.EndView = EndView;
}(window));	