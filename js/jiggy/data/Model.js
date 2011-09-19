// JavaScript Document
(function(window) {
function Model()
{
	var playlistCollection=new Array();
	this.feedCollection =[];
	this.currentSongId=null;
	this.currentPosition =0;
	this.playerState="";
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
	this.playSongId=function(value)
	{
		currentPosition = value.split("playlistItem-").join("");
		this.currentSongId=playlistCollection[currentPosition][0].id;
	}
}

window.Model = Model;
}(window));	