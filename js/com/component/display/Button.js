// JavaScript Document

(function(window) {
extend(Button,UIElement);
function Button(){
	//extends
	this.init();
	// constructor:
	var public = Button.prototype;
	Button.BUTTON_STATE_UP = "BUTTON_STATE_UP";
	Button.BUTTON_STATE_DOWN = "BUTTON_STATE_DOWN";
	Button.BUTTON_STATE_SELECTED = "BUTTON_STATE_SELECTED";
	Button.BUTTON_STATE_DISABLED = "BUTTON_STATE_DISABLED";
	Button.BUTTON_STATE_OVER = "BUTTON_STATE_OVER";
	// public properties:
	public.name;
	public.upSkin;
	public.downSkin;
	public.overSkin;
	public.selectedSkin;
	public.disabledSkin;
	// private properties:
	var upSkinElement;
	var downSkinElement;
	var overSkinElement;
	var disabledSkinElement;
	var selectedSkinElement;
	var currentState=Button.BUTTON_STATE_UP;
	var obj=this;
	//functions
	this.build=function()
	{
		
		if(this.downSkin)
		{
			downSkinElement=new UIElement();
			downSkinElement.styleName = this.downSkin;
			downSkinElement.build();
			downSkinElement.setStyle();
			downSkinElement.arrange();
			downSkinElement.setWidth(this.getWidth());
			downSkinElement.setHeight(this.getHeight());
			downSkinElement.visible(false);
			this.addChild(downSkinElement);
			downSkinElement.addEventListener(MouseEvent.CLICK,onButtonMouseClick);
			
		}
		if(this.overSkin)
		{
			overSkinElement=new UIElement();
			overSkinElement.styleName = this.overSkin;
			overSkinElement.build();
			overSkinElement.setStyle();
			overSkinElement.arrange();
			overSkinElement.setWidth(this.getWidth());
			overSkinElement.setHeight(this.getHeight());
			overSkinElement.visible(false);
			this.addChild(overSkinElement);		
			overSkinElement.addEventListener(MouseEvent.CLICK,onButtonMouseClick);
		}
		if(this.disabledSkin)
		{
			disabledSkinElement=new UIElement();
			disabledSkinElement.styleName = this.disabledSkin;
			disabledSkinElement.build();
			disabledSkinElement.setStyle();
			disabledSkinElement.arrange();
			disabledSkinElement.setWidth(this.getWidth());
			disabledSkinElement.setHeight(this.getHeight());
			disabledSkinElement.visible(false);
			this.addChild(disabledSkinElement);		
		}
		if(this.selectedSkin)
		{
			selectedSkinElement=new UIElement();
			selectedSkinElement.styleName = this.selectedSkin;
			selectedSkinElement.build();
			selectedSkinElement.setStyle();
			selectedSkinElement.arrange();
			selectedSkinElement.setWidth(this.getWidth());
			selectedSkinElement.setHeight(this.getHeight());
			selectedSkinElement.visible(false);
			this.addChild(selectedSkinElement);	
			selectedSkinElement.addEventListener(MouseEvent.CLICK,onButtonMouseClick);	
		}
		if(this.upSkin)
		{
			upSkinElement=new UIElement();
			upSkinElement.styleName = this.upSkin;
			upSkinElement.build();
			upSkinElement.setStyle();
			upSkinElement.arrange();
			upSkinElement.setWidth(this.getWidth());
			upSkinElement.setHeight(this.getHeight());
			this.addChild(upSkinElement);
			upSkinElement.addEventListener(MouseEvent.CLICK,onButtonMouseClick);
			
		}
	}
	this.activate = function()
	{
		changeState(Button.BUTTON_STATE_UP);
		
		this.addEventListener(MouseEvent.MOUSE_UP,onButtonMouseUp);
		this.addEventListener(MouseEvent.MOUSE_OUT,onButtonMouseUp);
		this.addEventListener(MouseEvent.MOUSE_DOWN,onButtonMouseDown);
		this.addEventListener(MouseEvent.MOUSE_OVER,onButtonMouseOver);
		this.buttonMode(true);
	}
	this.deactivate = function()
	{
		this.removeEventListener(MouseEvent.MOUSE_UP,onButtonMouseUp);
		this.removeEventListener(MouseEvent.MOUSE_OUT,onButtonMouseUp);
		this.removeEventListener(MouseEvent.MOUSE_DOWN,onButtonMouseDown);
		this.removeEventListener(MouseEvent.MOUSE_OVER,onButtonMouseOver);
		this.buttonMode(false);
	}
	this.disable=function()
	{
		this.deactivate();
		changeState(Button.BUTTON_STATE_DISABLED);
	}
	function onButtonMouseClick(e)
	{
		changeState(Button.BUTTON_STATE_SELECTED);
		
	}
	function onButtonMouseOver(e)
	{
		changeState(Button.BUTTON_STATE_OVER);
	}
	function onButtonMouseDown(e)
	{
		changeState(Button.BUTTON_STATE_DOWN);
	}
	function onButtonMouseUp(e)
	{
		changeState(Button.BUTTON_STATE_UP);
	}
	function changeState(value)
	{
		//turn off currentState
		switch(currentState)
		{
			case Button.BUTTON_STATE_UP:
				if(upSkinElement)upSkinElement.visible(false);
			break;
			case Button.BUTTON_STATE_DOWN:
				if(downSkinElement)downSkinElement.visible(false);
			break;
			case Button.BUTTON_STATE_OVER:
				if(overSkinElement)overSkinElement.visible(false);
			break;
			case Button.BUTTON_STATE_DISABLED:
				if(disabledSkinElement)disabledSkinElement.visible(false);
			break;
			case Button.BUTTON_STATE_SELECTED:
				if(selectedSkinElement)selectedSkinElement.visible(false);
			break;

		}
		//turn on currentState
		switch(value)
		{
			case Button.BUTTON_STATE_UP:
				if(upSkinElement)upSkinElement.visible(true);
			break;
			case Button.BUTTON_STATE_DOWN:
				if(downSkinElement)downSkinElement.visible(true);
			break;
			case Button.BUTTON_STATE_OVER:
				if(overSkinElement)overSkinElement.visible(true);
			break;
			case Button.BUTTON_STATE_DISABLED:
				if(disabledSkinElement)disabledSkinElement.visible(true);
			break;
			case Button.BUTTON_STATE_SELECTED:
				if(selectedSkinElement)selectedSkinElement.visible(true);
			break;
		}
		currentState=value;
	}

}
// end
window.Button = Button;
}(window));	