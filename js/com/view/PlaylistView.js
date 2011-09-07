// JavaScript Document
(function(window) {
// extend
extend(PlaylistView,DisplayObject);

//public
var public =PlaylistView.prototype;
public.element =document.createElement('div');
public.element.style.position = "absolute";


//events



function PlaylistView() 
{ 
	var obj =this;
	var model;	
	var maxHeight=117;
	var list;
	var startX;
	var startY;


	
	
	this.build =function()
   {	
   		if(list)
	   {
	   	obj.removeChild(list);
	   	list=null;
	   }
		  list = new SearchList();
	   //list.styleName="searchBoxInputBox";
		list.build();
		list.setStyle();
		list.setWidth(stage.stageWidth());
		
		 list.setHeight((stage.stageHeight()-maxHeight)-10);
		list.arrange();
		obj.addChild(list);
		list.y(10);
		list.element.style.overflow="auto";
		//var items = new UIElement();
		var cy= 0;
		
		for(var a=0; a< model.getPlaylistCollection().length;a++)
		{
			
			var items = new SearchListItem();
			items.styleName="searchItem";
			items.setData (model.getPlaylistCollection()[a][0]);
			items.setModel(model);
			items.setId(model.getPlaylistCollection()[a][1]);
			items.build();
			items.setStyle();
			if(Mobile.DetectAndroid()||Mobile.DetectIphoneOrIpod())
			{
				items.setWidth(list.getWidth()-10);
				items.x(5);
			}else{
				
				items.setWidth(list.getWidth()-50);
				items.x(10);
			}
			items.setHeight(80);
			items.arrange();
			list.addEventListener(TouchEvent.TOUCH_START,obj.onTouch);
		    list.addEventListener(TouchEvent.TOUCH_MOVE,obj.onTouchMove);
			list.addItem(items);
			//items.text(model.feedCollection[a].title);
			items.y(cy);
			
			cy  = cy+parseInt(items.getHeight())+5;
		}
   }
   this.arrange=function()
   {
	  
	   if(list)
	   {
		   
		   list.setWidth(stage.stageWidth());
		    list.setHeight(stage.stageHeight()-(maxHeight)-25);
			list.arrange();

	   }
   }
   
  
   this.setModel=function(value)
   {
	   model =value;
   }
   this.getModel=function()
   {
	   return model;
   }
   
    this.onTouch =function(event)
   {
	  
	   if( event.touches)
	{
		
	 	var touch = event.touches[0];
		startX =touch.pageX;
		startY =touch.pageY;
	}
   }
   this.onTouchMove=function(event)
   {
	   if( event.touches)
		{
			
			var touch = event.touches[0];
			var endX =touch.pageX;
			var endY =touch.pageY;
			if(endY>startY)
			{
				
				if(parseInt(list.holder.getY())+(endY-startY)<=0)
				{
					list.holder.y(parseInt(list.holder.getY())+(endY-startY));
				}else{
					list.holder.y(0);
				}
			}else{
				var lastChild = list.holder.getChildAt(list.holder.numChildren()-1);
				var holderHeight = parseInt(lastChild.getY())+parseInt(lastChild.getHeight());
				var subs = -Math.abs(holderHeight-list.getHeight());
				if(parseInt(list.holder.getY())-(startY-endY)>=subs)
				{
					list.holder.y(parseInt(list.holder.getY())-(startY-endY));
				}else{
					list.holder.y(subs);
				}
			}
			startX=endX;
			startY=endY;
		}
   }
   this.setMaxHeight=function(value)
   {
	   var m = value;
	  // maxHeight = value;
   }
}
window.PlaylistView = PlaylistView;
// SearchList Class
extend(PlayList,UIElement);
function PlayList()
{
	var public =PlayList.prototype;
	public.holder = new UIElement();
	
		this.build=function()
		{
			public.build();
			this.holder.styleName="searchListHolders";
			this.holder.build();
			this.holder.setStyle();
			this.holder.setWidth(stage.stageWidth()-40);
			this.holder.arrange();
			this.addChild(this.holder);
		}
		this.addItem=function(items)
		{
			this.holder.addChild(items);
		}
		this.arrange=function()
		{
			this.holder.setWidth(stage.stageWidth());
			for(var a=0; a<this.holder.numChildren();a++)
			{
				if(Mobile.DetectAndroid()||Mobile.DetectIphoneOrIpod())
				{
					this.holder.getChildAt(a).setWidth(this.holder.getWidth()-10);
					
				}else{
					this.holder.getChildAt(a).setWidth(this.holder.getWidth()-50);
				}
				this.holder.getChildAt(a).arrange();
			}
		}
		this.isScrollbar=function()
		{
			if(this.holder.getHeight()>this.getHeight())
			{
				return true;
			}else{
				return false;
			}
		}
		
}

window.PlayList = PlayList;

// searchListItem class
extend(PlayListItem,UIElement);
function PlayListItem()
{
	var public =PlayListItem.prototype;
	var data =null;
	var img=null;
	var plusButton=null;
	var label =null;
	var id;
	var model;
	
		this.build=function()
		{
			this.element =document.createElement('div');
			this.setDefaultStyle();
			//sqDefault or hqDefault
			img = new DisplayImage(data.thumbnail.sqDefault);
			img.setWidth(60);
			img.setHeight(45);
			img.y((80 * 0.5)-(45 * 0.5));
			label = new Label();
			label.element.style.overflow="hidden";
			label.setText(data.title);
			label.setHeight(20);
			
			label.y((80 * 0.5)-(label.getHeight() * 0.5));
			label.x(80);
			
			/*plusButton = new DisplayImage("images/addButton.gif");
			plusButton.setWidth(27);
			plusButton.setHeight(27);
			plusButton.y((80 * 0.5)-(27 * 0.5));
			plusButton.addEventListener(MouseEvent.CLICK,this.onButtonClick);
	
			plusButton.buttonMode(true);*/
			this.addChild(img);
			this.addChild(label);
			//this.addChild(plusButton);
		}
	
	this.setData=function(value)
	{
		data = value;
	}
	this.getData=function()
	{
		return data;
	}
	this.arrange=function()
	{
		
		label.setWidth(this.getWidth() -10-label.getX()-plusButton.getWidth());
		//plusButton.x(this.getWidth()-plusButton.getWidth()-10);
		//label.setWidth(stage.stageWidth);
	}
	this.setId=function(value)
	{
		id=value;
	}
	this.getId=function()
	{
		return id;
	}
	this.setModel=function(value)
	{
		model =value;
	}
	this.onButtonClick=function(evt)
	{
		model.addToPlaylist(id);
	}
}
window.PlayListItem = PlayListItem;
}(window));