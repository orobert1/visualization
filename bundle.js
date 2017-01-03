/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Graph = __webpack_require__(1);
	
	var run = function run() {
	  var graph = new Graph("dragSurface", "dataVis");
	  for (var i = 0; i < 100; i++) {
	    var mutualFriends = Math.random() * 80;
	    var invitedRandom = Math.random() * 2;
	    if (invitedRandom > 1) {
	      invitedRandom = false;
	    } else {
	      invitedRandom = true;
	    }
	    graph.addContact({ mutualFriends: mutualFriends, name: "Oscar", invited: invitedRandom });
	  }
	  graph.graphContacts();
	};
	
	run();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Node = __webpack_require__(2);
	
	function Graph(id, dataVis) {
	  this.dataVis = document.getElementById(dataVis);
	  this.contacts = [];
	  this.nodes = [];
	  this.dragSurface = document.getElementById(id);
	  this.dragSurface.style.height = window.innerHeight;
	  this.dragSurface.ondragstart = this.dragStart.bind(this);
	  this.dragSurface.ondrag = this.drag.bind(this);
	  this.position = { x: window.innerWidth / 2, y: 700 };
	  this.scale = 4;
	  this.width = this.scale * 15;
	  this.height = this.scale * 15;
	  this.offset = { width: this.width, height: this.height };
	  this.centerNode = this.placeCenterNode();
	}
	
	Graph.prototype.placeCenterNode = function () {
	  var centerNode = document.createElement("div");
	  centerNode.className = "centerNode";
	  centerNode.style.width = this.width + "px";
	  centerNode.style.height = this.height + "px";
	  centerNode.style.top = this.position.y - this.width / 2 + "px";
	  centerNode.style.left = this.position.x - this.height / 2 + "px";
	  this.dataVis.appendChild(centerNode);
	  return centerNode;
	};
	Graph.prototype.dragStart = function (e) {
	  var x = e.clientX;
	  var y = e.clientY;
	  this.mouseStart = { x: x, y: y };
	};
	
	Graph.prototype.drag = function (e) {
	  var x = e.clientX;
	  var y = e.clientY;
	  if ((this.mouseStart.x !== x || this.mouseStart.y !== y) && x && y) {
	    this.position.x += x - this.mouseStart.x;
	    this.position.y += y - this.mouseStart.y;
	    this.mouseStart.x = x;
	    this.mouseStart.y = y;
	    this.centerNode.style.top = this.position.y - this.width / 2 + "px";
	    this.centerNode.style.left = this.position.x - this.height / 2 + "px";
	  }
	};
	
	Graph.prototype.dragEnd = function () {};
	
	Graph.prototype.addContact = function (contact) {
	  this.contacts.push(contact);
	};
	
	Graph.prototype.changeScale = function () {
	  for (var i = 0; i < this.nodes.length; i++) {
	    var node = this.nodes[i];
	    node.updateScale(this.scale);
	  }
	};
	
	Graph.prototype.graphContacts = function () {
	  for (var i = 0; i < this.contacts.length; i++) {
	    var degrees = 360 / this.contacts.length * i;
	    this.nodes.push(new Node(this.contacts[i], i, this.canvas, this.ctx, { x: this.centerX, y: this.centerY }, degrees, this.position, this.centerNode, this.offset, this.scale));
	  }
	  var topNode = document.createElement("div");
	  topNode.id = "topNode";
	  topNode.draggable = "true";
	  topNode.ondragstart = this.dragStart.bind(this);
	  topNode.ondrag = this.drag.bind(this);
	  this.centerNode.appendChild(topNode);
	};
	
	module.exports = Graph;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	function graphNode(contact, index, canvas, ctx, center, degrees, position, centerNode, offset, scale) {
	  this.mutualFriends = contact.mutualFriends;
	  this.name = contact.name;
	  this.index = index;
	  this.invited = contact.invited;
	  this.center = center;
	  this.canvas = canvas;
	  this.ctx = ctx;
	  this.position = position;
	  this.degrees = degrees;
	  this.beginOffset = 200;
	  this.scaleProps = [];
	  this.scaleMultiplier = scale;
	  this.centerNode = centerNode;
	  this.offset = offset;
	  this.renderNode();
	}
	
	graphNode.prototype.renderNode = function () {
	  var pivot = this.createDiv("pivot");
	  var bar = this.createDiv("bar");
	  var subNode = this.createDiv("subNode");
	  var name = this.createDiv("name");
	  pivot.appendChild(bar);
	  bar.appendChild(subNode);
	  subNode.appendChild(name);
	  name.innerText = this.name;
	  if (!this.invited) {
	    subNode.style.backgroundColor = "rgb(100,100,100)";
	  }
	  subNode.onmouseenter = this.showName.bind(this);
	  subNode.onmouseleave = this.hideName.bind(this);
	  this.registerScaleDiv(subNode, "width", this.getWidthHeight.bind(this));
	  this.registerScaleDiv(subNode, "height", this.getWidthHeight.bind(this));
	  this.registerScaleDiv(subNode, "top", this.getOffset.bind(this));
	  this.registerScaleDiv(name, "bottom", this.getBottom.bind(this));
	  pivot.style.top = this.offset.height / 2 + "px";
	  pivot.style.left = this.offset.width / 2 + "px";
	  this.centerNode.appendChild(pivot);
	  pivot.style.transform = "rotate( " + this.degrees + "deg )";
	  window.setTimeout(function () {
	    this.registerScaleDiv(bar, "width", this.getScale.bind(this));
	    bar.style.transition = this.getScale() / 150 + "s";
	  }.bind(this), this.getScale() * 6);
	};
	graphNode.prototype.getWidthHeight = function () {
	  return this.scaleMultiplier * 1.8 + "px";
	};
	
	graphNode.prototype.getOffset = function () {
	  return 0 - this.scaleMultiplier / 2 + "px";
	};
	
	graphNode.prototype.getBottom = function () {
	  return this.scaleMultiplier;
	};
	
	graphNode.prototype.createDiv = function (className) {
	  var element = document.createElement("div");
	  element.id = className + this.index;
	  element.className = className;
	  return element;
	};
	graphNode.prototype.getDiv = function (className) {
	  var element = document.getElementById(className + this.index);
	  return element;
	};
	
	graphNode.prototype.registerScaleDiv = function (div, property, value) {
	  var scaleProp = { div: div, property: property, value: value };
	  div.style[property] = value();
	  this.scaleProps.push(scaleProp);
	};
	
	graphNode.prototype.updateScale = function (newScale) {
	  this.scaleMultiplier = newScale;
	  console.log(this.scale);
	
	  for (var i = 0; i < this.scaleProps.length; i++) {
	    var scaleProp = this.scaleProps[i];
	    scaleProp.div.style[scaleProp.property] = scaleProp.value();
	  }
	};
	
	graphNode.prototype.showName = function () {
	  var bar = this.getDiv("bar");
	  var name = this.getDiv("name");
	  bar.style.opacity = 1;
	  name.style.opacity = 1;
	};
	
	graphNode.prototype.hideName = function () {
	  var bar = this.getDiv("bar");
	  var name = this.getDiv("name");
	  bar.style.opacity = .2;
	  name.style.opacity = 0;
	};
	
	graphNode.prototype.sinDegrees = function () {
	  return Math.sin(this.degrees / 180 * Math.PI);
	};
	
	graphNode.prototype.cosDegrees = function () {
	  return Math.cos(this.degrees / 180 * Math.PI);
	};
	
	graphNode.prototype.getX = function () {
	  return this.sinDegrees() * this.getScale();
	};
	
	graphNode.prototype.getY = function () {
	  return this.cosDegrees() * this.getScale();
	};
	
	graphNode.prototype.getScale = function () {
	  return this.beginOffset + this.scaleMultiplier * this.mutualFriends;
	};
	
	module.exports = graphNode;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map