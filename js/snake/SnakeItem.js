// JavaScript Document
(function(window) {
extend(SnakeItem,UIElement);
function SnakeItem()
{
	//extends
	this.type=1;
	this.init();
	this.build=function()
	{
		this.buildItem();
	}
	this.buildItem=function()  {
			switch(this.type)
			{
				case 7:
				this.styleName="";
				break;
				case 2:
				this.styleName="food";
				break;
				case 3:
				this.styleName="";
				break;
				case 4:
				this.styleName="";
				break;
				case 5:
				this.styleName="";
				break;
				case 6:
				this.styleName="";
				break;
				case 1:
				this.styleName="snake";
				break;
				case 0:
				this.styleName="";
				break;
			}
	}
}
window.SnakeItem = SnakeItem;
}(window));