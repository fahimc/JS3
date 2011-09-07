// JavaScript Document
META("viewport","width=device-width, user-scalable=no");
//window.onload=main;
(function(window) {
//global variables
var mainView;
var controller;
var model;
//add Stage init
stage.addEventListener(Event.ADDED_TO_STAGE,init);
function init()
{
	stage.removeEventListener(Event.ADDED_TO_STAGE,init);
	stage.addEventListener(Event.RESIZE,resize);
	
	// create view
	mainView = new MainView();
	mainView.build();
	mainView.arrange();
	addChild(mainView);
	
	//model
	model = new Model();
	
	
	//create controller
	controller = new Controller();
	controller.mainView(mainView);
	controller.setModel(model);
	controller.init();
	
}
function resize()
{
	
	if(controller)controller.arrange();
}
}(window));