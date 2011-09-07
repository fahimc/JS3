// JavaScript Document
(function(window) {
function Mobile(){

	var deviceIphone = "iphone";
    var deviceIpod = "ipod";
	this.uagent = navigator.userAgent.toLowerCase();

//**************************
// Detects if the current device is an iPhone.
	this.DetectIphone=function()
	{
   if (this.uagent.search(deviceIphone) > -1)
      return true;
   else
      return false;
	}
	
	//**************************
	// Detects if the current device is an iPod Touch.
	 this.DetectIpod=function()
	{
	   if (this.uagent.search(deviceIpod) > -1)
		  return true;
	   else
		  return false;
	}
	
	//**************************
	// Detects if the current device is an iPhone or iPod Touch.
	this.DetectIphoneOrIpod=function()
	{
		if (this.DetectIphone())
		   return true;
		else if (this.DetectIpod())
		   return true;
		else
		   return false;
	}
	this.DetectAndroid=function()
	{
	   var isAndroid = this.uagent.indexOf("android") > -1; //&& ua.indexOf("mobile");
		if(isAndroid) {
			return true;
		}else{
			return false;
		}
	}
}
// end
window.Mobile = new Mobile();
}(window));	