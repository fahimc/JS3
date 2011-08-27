// JavaScript Document
(function(window) {
function PlaylistData(){}



PlaylistItemData = function(t,aid,ids,kw,con)
{
	this.title=t;
	this.actualId=aid;
	this.id=ids;
	this.keywords=kw;
	this.content=con;
}

window.PlaylistItemData = PlaylistItemData;
window.PlaylistData = PlaylistData;
}(window));	