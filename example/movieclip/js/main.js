// JavaScript Document
window.onload  = onLoad;

function onLoad()
{

	
	var clip = new MovieClip();
	clip.name="movieclip";
	clip.styleName="movieclip";
	clip.src="images/walking2.png";
	clip.setFrameRate(50);
	clip.build();
	clip.setWidth(195);
	clip.setStyle();
	clip.gotoAndPlay(0);
	clip.x(0);
	clip.y(0);
	addChild(clip);
}
