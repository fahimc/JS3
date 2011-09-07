(function(window) {
	extend(DisplayImage,DisplayObject);
function DisplayImage(src)
{

	this.element = document.createElement('img');
	this.element.src = src;
	this.setDefaultStyle();

}
		
		
		
		
		
		
		
		  
window.DisplayImage = DisplayImage;
}(window));	