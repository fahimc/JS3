// JavaScript Document
(function(window) {
function Mobile(){}

	var deviceIphone = "iphone";
    var deviceIpod = "ipod";
	this.uagent = navigator.userAgent.toLowerCase();

//**************************
// Detects if the current device is an iPhone.
	this.DetectIphone=function()
	{
   if (uagent.search(deviceIphone) > -1)
      return true;
   else
      return false;
	}
	
	//**************************
	// Detects if the current device is an iPod Touch.
	 this.DetectIpod=function()
	{
	   if (uagent.search(deviceIpod) > -1)
		  return true;
	   else
		  return false;
	}
	
	//**************************
	// Detects if the current device is an iPhone or iPod Touch.
	this.DetectIphoneOrIpod=function()
	{
		if (DetectIphone())
		   return true;
		else if (DetectIpod())
		   return true;
		else
		   return false;
	}
// end
window.Mobile = new Mobile();
}(window));	