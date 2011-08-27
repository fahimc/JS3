// JavaScript Document
(function(window) {
function PlaylistView(){}

	extend(PlaylistView,UIElement);
	// constructor:
	var public = PlaylistView.prototype;
	// public properties:
	public.data=[];
	// private properties:
	/*public.build = function()
	{
		var child = new PlaylistItemView();
			child.styleName="playlistItem";
			child.element.onclick = onClick;
			child.addEventListener(MouseEvent.CLICK,onClick);
			child.build();
			child.text("hello");
			child.setStyle();
			child.arrange();
			child.setHeight(20);
			child.setWidth(this.getWidth()-20);
			child.buttonMode(true);
			this.addChild(child);
	}*/
	// public methods:
	public.arrange = function()
	{
		var yy=0;
		for(a=0; a< this.data.length;a++)
		{
			
			
			var child = new PlaylistItemView();
			child.styleName="playlistItem";
			child.name = "playlistItem"+a;
			child.data = this.data[a];
			child.build();
			child.addEventListener(MouseEvent.CLICK,onItemClick);
			child.text(this.data[a].title);
			child.setStyle();
			child.arrange();
			child.setHeight(20);
			child.setWidth(this.getWidth()-20);
			
			child.buttonMode(true);
			
			child.x(10);
			this.addChild(child);
			child.y( yy);
			yy +=parseInt(child.element.style.height) + 10;
			
		}
	}
	public.setWidth =function(value)
			{
				 this.element.style.width = value+"px";
				for(a=0; a< this.childrenContainer.length;a++)
				{
					this.childrenContainer[a].setWidth(this.getWidth()-20);
				}
			}




//PlaylistItemView Class

function PlaylistItemView(){}

	extend(PlaylistItemView,UIElement);
	// constructor:
	var public = PlaylistItemView.prototype;
	// public properties:
	public.data=[];
	// private properties:
	
	// public methods:
	public.text = function(value)
	{
		
		this.element.innerHTML =value; 
	}
window.PlaylistView = PlaylistView;
window.PlaylistItemView = PlaylistItemView;
}(window));	