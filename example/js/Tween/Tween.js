/**********************************************************************
TERMS OF USE - EASING EQUATIONS
Open source under the BSD License.
Copyright (c) 2001 Robert Penner
JavaScript version copyright (C) 2006 by Philippe Maegerman
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

   * Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
   * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
   * Neither the name of the author nor the names of contributors may
be used to endorse or promote products derived from this software
without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*****************************************/
(function(window) {
function Delegate() {}
Delegate.create = function (o, f) {
	var a = new Array() ;
	var l = arguments.length ;
	for(var i = 2 ; i < l ; i++) a[i - 2] = arguments[i] ;
	return function() {
		var aP = [].concat(arguments, a) ;
		f.apply(o, aP);
	}
}



// Tween Class

function Tween (obj, prop, func, begin, finish, duration, suffixe){
	this.init(obj, prop, func, begin, finish, duration, suffixe)
}


var t = Tween.prototype;

t.obj = new Object();
t.prop='';
t.func = function (t, b, c, d) { return c*t/d + b; };
t.begin = 0;
t.change = 0;
t.prevTime = 0;
t.prevPos = 0;
t.looping = false;
t._duration = 0;
t._time = 0;
t._pos = 0;
t._position = 0;
t._startTime = 0;
t._finish = 0;
t.name = '';
t.suffixe = '';
t._listeners = new Array();	
t.completeEvent=null;
t.running=true;
t.setTime = function(t){
	this.prevTime = this._time;
	if (t > this.getDuration()) {
		if (this.looping) {
			this.rewind (t - this._duration);
			this.update();
			this.broadcastMessage('onMotionLooped',{target:this,type:'onMotionLooped'});
		} else {
			this._time = this._duration;
			this.update();
			this.stop();
			this.broadcastMessage('onMotionFinished',{target:this,type:'onMotionFinished'});
		}
	} else if (t < 0) {
		this.rewind();
		this.update();
	} else {
		this._time = t;
		this.update();
	}
}
t.getTime = function(){
	return this._time;
}
t.setDuration = function(d){
	this._duration = (d == null || d <= 0) ? 100000 : d;
}
t.getDuration = function(){
	return this._duration;
}
t.setPosition = function(p){
	this.prevPos = this._pos;
	var a = this.suffixe != '' ? this.suffixe : '';
	this.obj[this.prop] = Math.round(p) + a;
	this._pos = p;
	this.broadcastMessage('onMotionChanged',{target:this,type:'onMotionChanged'});
}
t.getPosition = function(t){
	if (t == undefined) t = this._time;
	return this.func(t, this.begin, this.change, this._duration);
};
t.setFinish = function(f){
	this.change = f - this.begin;
};
t.getFinish = function(){
	return this.begin + this.change;
};
t.init = function(obj, prop, func, begin, finish, duration, eventOnComplete){
	if (!arguments.length) 
	{
		return;
	}
	// JS3 conversion
	this.running=true;
	if(obj.element)
	{
		obj = obj.element;
	}else{
		obj = obj;
	}
	if(tweenConversion[prop])
	{
		
		prop = tweenConversion[prop];
		
	}
	
	//
	if(prop=="alpha")
	{
		
		var eventComplete =eventOnComplete;
		var _pos = begin * 100;
		var obj = obj;
		obj.running=this.running;
		obj.prop = prop;
		obj.completeEvent=eventOnComplete;
		var substract = Math.abs(_pos - finish)/stage.frameRate;
		var end = (duration ) * stage.frameRate; 
		var curentTime=0;
		var timer =new Timer(stage.frameRate,end);
		
		var onAlphaTimerEvent=function()
		{
			 
          if(obj && obj.running)
		  {
			_pos =_pos - substract;
			if(_pos < 0)_pos=0;
			
			obj.style['opacity'] = _pos / 100;
			obj.style['-moz-opacity'] = _pos / 100;
			obj.style['-khtml-opacity'] = _pos / 100;
			obj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity="+_pos+")";
			//filter:alpha(opacity=50);}
			if(obj.filter && obj.filter.alpha)
			{

				obj.filter.alpha['opacity'] =  _pos;
			}
		  }else{
			 
		  	onTimerComplete();
		  }
			
		}
		var onTimerComplete=function()
		{
			if(timer)
			{
			timer.removeEventListener(TimerEvent.TIMER_COMPLETE.name,onTimerComplete);
			timer.removeEventListener(TimerEvent.TIMER.name,onAlphaTimerEvent);
			timer.stop();
			timer=null;
			}
			if(obj && obj.completeEvent)obj.completeEvent();
			
			eventComplete =null;
			_pos = null;
			obj = null;
			substract = null
			end = null; 
			curentTime=null;
			
		}
		timer.addEventListener(TimerEvent.TIMER.name,onAlphaTimerEvent);
		timer.addEventListener(TimerEvent.TIMER_COMPLETE.name,onTimerComplete);
		timer.start();

		
		
	}else{
		
		this._listeners = new Array();
		this.addListener(this);
		this.suffixe = 'px';
		this.obj = obj.style;
		
		this.prop = prop;
		this.begin = begin;
		this._pos = begin;
		this.setDuration(duration);
		if (func!=null && func!='') {
			this.func = func;
		}
		
		this.setFinish(finish);	

	}
}
t.start = function(){
	this.rewind();
	this.startEnterFrame();
	this.broadcastMessage('onMotionStarted',{target:this,type:'onMotionStarted'});
	//alert('in');
}
t.rewind = function(t){
	this.stop();
	this._time = (t == undefined) ? 0 : t;
	this.fixTime();
	this.update();
}
t.fforward = function(){
	this._time = this._duration;
	this.fixTime();
	this.update();
}
t.update = function(){
	this.setPosition(this.getPosition(this._time));
	}
t.startEnterFrame = function(){
	this.stopEnterFrame();
	this.isPlaying = true;
	this.onEnterFrame();
}
t.onEnterFrame = function(){
	if(this.isPlaying) {
		this.nextFrame();
		setTimeout(Delegate.create(this, this.onEnterFrame), 0);
	}
}
t.nextFrame = function(){
	this.setTime((this.getTimer() - this._startTime) / 1000);
	}
t.stop = function(){
	if(this.prop=="alpha")
	{
		this.running=false;
	}else{
	this.stopEnterFrame();
	this.broadcastMessage('onMotionStopped',{target:this,type:'onMotionStopped'});
	}
}
t.stopEnterFrame = function(){
	this.isPlaying = false;
}

t.continueTo = function(finish, duration){
	this.begin = this._pos;
	this.setFinish(finish);
	if (this._duration != undefined)
		this.setDuration(duration);
	this.start();
}
t.resume = function(){
	this.fixTime();
	this.startEnterFrame();
	this.broadcastMessage('onMotionResumed',{target:this,type:'onMotionResumed'});
}
t.yoyo = function (){
	this.continueTo(this.begin,this._time);
}

t.addListener = function(o){
	this.removeListener (o);
	return this._listeners.push(o);
}
t.removeListener = function(o){
	var a = this._listeners;	
	var i = a.length;
	while (i--) {
		if (a[i] == o) {
			a.splice (i, 1);
			return true;
		}
	}
	return false;
}
t.broadcastMessage = function(){
	var arr = new Array();
	for(var i = 0; i < arguments.length; i++){
		arr.push(arguments[i])
	}
	var e = arr.shift();
	var a = this._listeners;
	var l = a.length;
	for (var i=0; i<l; i++){
		if(a[i][e])
		a[i][e].apply(a[i], arr);
	}
}
t.fixTime = function(){
	this._startTime = this.getTimer() - this._time * 1000;
}
t.getTimer = function(){
	return new Date().getTime() - this._time;
}
Tween.backEaseIn = function(t,b,c,d,a,p){
	if (s == undefined) var s = 1.70158;
	return c*(t/=d)*t*((s+1)*t - s) + b;
}
Tween.backEaseOut = function(t,b,c,d,a,p){
	if (s == undefined) var s = 1.70158;
	return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
}
Tween.backEaseInOut = function(t,b,c,d,a,p){
	if (s == undefined) var s = 1.70158; 
	if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
	return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}
Tween.elasticEaseIn = function(t,b,c,d,a,p){
		if (t==0) return b;  
		if ((t/=d)==1) return b+c;  
		if (!p) p=d*.3;
		if (!a || a < Math.abs(c)) {
			a=c; var s=p/4;
		}
		else 
			var s = p/(2*Math.PI) * Math.asin (c/a);
		
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	
}
Tween.elasticEaseOut = function (t,b,c,d,a,p){
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
	}
Tween.elasticEaseInOut = function (t,b,c,d,a,p){
	if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) var p=d*(.3*1.5);
	if (!a || a < Math.abs(c)) {var a=c; var s=p/4; }
	else var s = p/(2*Math.PI) * Math.asin (c/a);
	if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
}

Tween.bounceEaseOut = function(t,b,c,d){
	if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
	}
}
Tween.bounceEaseIn = function(t,b,c,d){
	return c - Tween.bounceEaseOut (d-t, 0, c, d) + b;
	}
Tween.bounceEaseInOut = function(t,b,c,d){
	if (t < d/2) return Tween.bounceEaseIn (t*2, 0, c, d) * .5 + b;
	else return Tween.bounceEaseOut (t*2-d, 0, c, d) * .5 + c*.5 + b;
	}

Tween.strongEaseInOut = function(t,b,c,d){
	return c*(t/=d)*t*t*t*t + b;
	}

Tween.regularEaseIn = function(t,b,c,d){
	return c*(t/=d)*t + b;
	}
Tween.regularEaseOut = function(t,b,c,d){
	return -c *(t/=d)*(t-2) + b;
	}

Tween.regularEaseInOut = function(t,b,c,d){
	if ((t/=d/2) < 1) return c/2*t*t + b;
	return -c/2 * ((--t)*(t-2) - 1) + b;
	}
Tween.strongEaseIn = function(t,b,c,d){
	return c*(t/=d)*t*t*t*t + b;
	}
Tween.strongEaseOut = function(t,b,c,d){
	return c*((t=t/d-1)*t*t*t*t + 1) + b;
	}

Tween.strongEaseInOut = function(t,b,c,d){
	if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
	return c/2*((t-=2)*t*t*t*t + 2) + b;
	}
// converstion Class
window.tweenConversion =new Array();
tweenConversion['x']='left';
tweenConversion['y']='top';

window.Delegate = Delegate;
window.Tween = Tween;
}(window));	
