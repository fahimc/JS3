// JavaScript Document
META("viewport","width=device-width, user-scalable=no");
//window.onload=main;
(function(window) {
//global variables
var header;

var urlLoader;
var classCollection=new Array();
var currentClass=0;
var aryClassElements = new Array();
//add Stage init
stage.addEventListener(Event.ADDED_TO_STAGE,init);
function init()
{
	
	stage.removeEventListener(Event.ADDED_TO_STAGE,init);
	stage.addEventListener(Event.RESIZE,resize);
	
	header = new UIElement();
	header.styleName = "mainheader";
	header.build();
	header.setStyle();
	header.arrange();
	addChild(header);
	header.addChild(document.getElementById("headertitle"));
	header.addChild(document.getElementById("headerlogo"));
	
	divder = new UIElement();
	divder.name = "divider";
	divder.build();
	divder.setStyle();
	divder.arrange();
	
	divder.x(150);
	divder.setHeight(stage.stageHeight() - header.getHeight()-30);
	divder.setWidth(2);
	divder.y(parseInt(header.getHeight())+10);
	//addChild(divder);

	
	 
	 classesFrame = new UIElement();
	classesFrame.name = "classes";

	classesFrame.build();
	classesFrame.setStyle();
	classesFrame.arrange();
	classesFrame.setHeight(stage.stageHeight() - header.getHeight()-30);
	classesFrame.setWidth(148);
	classesFrame.y(parseInt(header.getHeight())+10);
	addChild(classesFrame);
	
	
	
	classHolder = new UIElement();
	classHolder.name = "classContent";
	classHolder.build();
	classHolder.setStyle();
	classHolder.arrange();
	classHolder.setHeight(stage.stageHeight() - header.getHeight()-30);
	classHolder.setWidth(stage.stageWidth() - 150-80);
	classHolder.y(parseInt(header.getHeight())+10);
	classHolder.x(150);
	
	addChild(classHolder);
	classHolder.scrollable();
	 classesFrame.scrollable();
	urlLoader = new URLLoader();
	urlLoader.addEventListener(Event.ON_COMPLETE.name,onXMLLoad);
	urlLoader.load('docs.xml');
}
function onXMLLoad()
{
	
	
	var classes = urlLoader.xml.getElementsByTagName("class");
	for(var b=0;b <classes.length;b++)
	{
		var classItem = new ClassItem();
		var aClass =classes[b].getElementsByTagName("name");
		var aClassDesc =classes[b].getElementsByTagName("desc");
		classItem.name = aClass[0].firstChild.nodeValue;
		classItem.desc = aClassDesc[0].firstChild.nodeValue;
		//get functions
		var aFunctions =classes[b].getElementsByTagName("function");
		for (var c=0; c<aFunctions.length;c++)
		{
			var func = new ClassFunctionItem();
			var funcName =aFunctions[c].getElementsByTagName("name");
			var funcDesc =aFunctions[c].getElementsByTagName("desc");
			var funcParams =aFunctions[c].getElementsByTagName("param");
			
			func.name=funcName[0].firstChild.nodeValue;
			func.desc=funcDesc[0].firstChild.nodeValue;
			for(var d=0;d<funcParams.length;d++)
			{
				var funcPm = funcParams[d].firstChild.nodeValue;
				func.parameters.push(funcPm);
			}
			classItem.functions.push(func);
		}
		//get events
		var eventClasses =classes[b].getElementsByTagName("event");
		for (var c=0; c<eventClasses.length;c++)
		{
			var func = new ClassEventsItem();
			var funcName =eventClasses[c].getElementsByTagName("name");
			var funcDesc =eventClasses[c].getElementsByTagName("desc");
			var funcParams =eventClasses[c].getElementsByTagName("param");
			
			func.name=funcName[0].firstChild.nodeValue;
			func.desc=funcDesc[0].firstChild.nodeValue;
			for(var d=0;d<funcParams.length;d++)
			{
				var funcPm = funcParams[d].firstChild.nodeValue;
				func.parameters.push(funcPm);
			}
			classItem.events.push(func);
		}
		//get props
		var propsClasses =classes[b].getElementsByTagName("properties");
		for (var c=0; c<propsClasses.length;c++)
		{
			var func = new ClassPropsItem();
			var funcName =propsClasses[c].getElementsByTagName("name");
			var funcDesc =propsClasses[c].getElementsByTagName("desc");
			var funcParams =propsClasses[c].getElementsByTagName("param");
			
			func.name=funcName[0].firstChild.nodeValue;
			func.desc=funcDesc[0].firstChild.nodeValue;
			for(var d=0;d<funcParams.length;d++)
			{
				var funcPm = funcParams[d].firstChild.nodeValue;
				func.parameters.push(funcPm);
			}
			classItem.props.push(func);
		}
		classItem.id = classCollection.length;
		
		classCollection.push(classItem);
	}
	for(var a=0; a< classCollection.length;a++)
	{
		var classA =new Array();
		classA[a] = document.createElement("p");
		classA[a].setAttribute('id',"c"+classCollection[a].id);
		classA[a].setAttribute('class','classN');
		classA[a].setAttribute('onclick','onClassClick('+classCollection[a].id+')');
		//classA.onclick=onClassClick(+classCollection[a].id);
		classA[a].innerHTML=classCollection[a].name;
		document.getElementById("classes").appendChild(classA[a]);
		
		
	}
	 showCurrentClass();
	//trace(urlLoader.xml.getElementsByTagName('class')[0].getElementsByTagName('name')[0].nodeValue);
}
function showCurrentClass()
{
	document.getElementById("classContent").innerHTML="";
	
	if(classCollection[currentClass] && classCollection[currentClass].props.length>0)
	{
		var table = document.createElement("table");
		table.setAttribute('class','eventsTable');
		var tr =document.createElement('tr');
		var td =document.createElement('td');
		td.setAttribute('class','method');
		var meth = document.createTextNode('Public Properties');
		td.appendChild(meth);
		tr.appendChild(td);
		table.appendChild(tr);
		
		for(var a=0; a<classCollection[currentClass].props.length;a++)
		{
			var trs = new Array();
			var tds = new Array();
			var ps = new Array();
			var ms = new Array();
			
			trs[a] =document.createElement('tr');
			trs[a].setAttribute('class','methodRow');
			tds[a] =document.createElement('td');
			tds[a].setAttribute('class','methodName');
			ms[a] = document.createTextNode(classCollection[currentClass].props[a].name);
			var tr3 =document.createElement('tr');
			ps[a] =document.createElement('p');
			ps[a].setAttribute('class','methodP');
			ps[a].innerHTML=(classCollection[currentClass].props[a].desc);
			
			
			tds[a].appendChild(ms[a]);
			tds[a].appendChild(ps[a]);
			trs[a].appendChild(tds[a]);
			table.appendChild(trs[a]);

		}

		document.getElementById("classContent").appendChild(table);
	}
	//methods
	if(classCollection[currentClass] && classCollection[currentClass].functions.length>0)
	{
		var table = document.createElement("table");
		table.setAttribute('class','eventsTable');
		var tr =document.createElement('tr');
		var td =document.createElement('td');
		td.setAttribute('class','method');
		var meth = document.createTextNode('Method');
		td.appendChild(meth);
		tr.appendChild(td);
		table.appendChild(tr);
		
		for(var a=0; a<classCollection[currentClass].functions.length;a++)
		{
			var trs = new Array();
			var tds = new Array();
			var ps = new Array();
			var ms = new Array();
			
			trs[a] =document.createElement('tr');
			trs[a].setAttribute('class','methodRow');
			tds[a] =document.createElement('td');
			tds[a].setAttribute('class','methodName');
			ms[a] = document.createTextNode(classCollection[currentClass].functions[a].name);
			var tr3 =document.createElement('tr');
			ps[a] =document.createElement('p');
			ps[a].setAttribute('class','methodP');
			ps[a].innerHTML=(classCollection[currentClass].functions[a].desc);
			
			
			tds[a].appendChild(ms[a]);
			tds[a].appendChild(ps[a]);
			trs[a].appendChild(tds[a]);
			table.appendChild(trs[a]);

		}

		document.getElementById("classContent").appendChild(table);
	}
	//events
	if(classCollection[currentClass] && classCollection[currentClass].events.length>0)
	{
		var etable = document.createElement("table");
		etable.setAttribute('class','eventsTable');
		var tr =document.createElement('tr');
		var td =document.createElement('td');
		td.setAttribute('class','method');
		var meth = document.createTextNode('Events');
		td.appendChild(meth);
		tr.appendChild(td);
		etable.appendChild(tr);
		
		for(var a=0; a<classCollection[currentClass].events.length;a++)
		{
			var trs = new Array();
			var tds = new Array();
			var ps = new Array();
			var ms = new Array();
			
			trs[a] =document.createElement('tr');
			trs[a].setAttribute('class','methodRow');
			tds[a] =document.createElement('td');
			tds[a].setAttribute('class','methodName');
			ms[a] = document.createTextNode(classCollection[currentClass].events[a].name);
			var tr3 =document.createElement('tr');
			ps[a] =document.createElement('p');
			ps[a].setAttribute('class','methodP');
			ps[a].innerHTML=(classCollection[currentClass].events[a].desc);
			
			
			tds[a].appendChild(ms[a]);
			tds[a].appendChild(ps[a]);
			trs[a].appendChild(tds[a]);
			etable.appendChild(trs[a]);

		}

		document.getElementById("classContent").appendChild(etable);
	}
	
	resize();
}
window.onClassClick=function(id)
{
	currentClass= id;
	showCurrentClass();
}
function resize()
{
	document.getElementById("classes").style.height = stage.stageHeight() - header.getHeight()-30+"px";
	aryClassElements.length = 0;
    getElementsByClassName( 'eventsTable', document.body );
    for ( var i = 0; i < aryClassElements.length; i++ ) {
        aryClassElements[i].style.width=(stage.stageWidth() - 150-110)+"px";
    }
	//document.getElementById("eventsTable").style.width=(stage.stageWidth() - 150-100)+"px";
	divder.setHeight(stage.stageHeight() - header.getHeight()-30);
	classHolder.setHeight(stage.stageHeight() - header.getHeight()-30);
	classHolder.setWidth(stage.stageWidth() - 150-80);
	
	classesFrame.setHeight(stage.stageHeight() - header.getHeight()-30);
	
}
function getElementsByClassName( strClassName, obj ) {
    if ( obj.className == strClassName ) {
        aryClassElements[aryClassElements.length] = obj;
    }
    for ( var i = 0; i < obj.childNodes.length; i++ )
        getElementsByClassName( strClassName, obj.childNodes[i] );
}
function ClassItem()
{
	this.name;
	this.id;
	this.desc;
	this.functions=new Array();
	this.events=new Array();
	this.props=new Array();
	
	
}
function ClassFunctionItem()
{
	this.name;
	this.desc;
	this.parameters=new Array();
}
function ClassEventsItem()
{
	this.name;
	this.desc;
	this.parameters=new Array();
}
function ClassPropsItem()
{
	this.name;
	this.desc;
	this.parameters=new Array();
}
}(window));