// JavaScript Document
(function(window) {
function Model()
{
	var playlistCollection=new Array();
	this.feedCollection =[];
	this.addToPlaylist=function(id)
	{
		for(var a=0; a<this.feedCollection.length;a++)
		{
			if(a==id)
			{
				playlistCollection.push([this.feedCollection[a],id]);
			}
		}
		
	}
	this.getPlaylistCollection=function()
	{
		return playlistCollection;
	}
}

window.Model = Model;
}(window));	