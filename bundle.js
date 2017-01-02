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
	  var graph = new Graph("canvas");
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
	
	function Graph(id) {
	  this.contacts = [];
	  this.nodes = [];
	  this.canvas = document.getElementById(id);
	  this.ctx = this.canvas.getContext("2d");
	  this.centerX = this.canvas.width / 2;
	  this.position = { x: 100, y: 100 };
	  this.width = 50;
	  this.height = 50;
	  this.offset = { width: this.width, height: this.height };
	  this.centerY = this.canvas.height / 2;
	  this.centerNode = this.placeCenterNode();
	}
	
	Graph.prototype.placeCenterNode = function () {
	  var centerNode = document.createElement("div");
	  centerNode.className = "centerNode";
	  centerNode.style.width = this.width + "px";
	  centerNode.style.height = this.height + "px";
	  centerNode.style.top = this.position.y + this.centerY - this.width / 2 + "px";
	  centerNode.style.left = this.position.x + this.centerX - this.height / 2 + "px";
	  document.body.appendChild(centerNode);
	  return centerNode;
	};
	
	Graph.prototype.addContact = function (contact) {
	  this.contacts.push(contact);
	};
	
	Graph.prototype.graphContacts = function () {
	  for (var i = 0; i < this.contacts.length; i++) {
	    var degrees = 360 / this.contacts.length * i;
	    this.nodes.push(new Node(this.contacts[i], i, this.canvas, this.ctx, { x: this.centerX, y: this.centerY }, degrees, this.position, this.centerNode, this.offset));
	  }
	  var topNode = document.createElement("div");
	  topNode.id = "topNode";
	  this.centerNode.appendChild(topNode);
	};
	
	module.exports = Graph;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	function graphNode(contact, index, canvas, ctx, center, degrees, position, centerNode, offset) {
	  this.mutualFriends = contact.mutualFriends;
	  this.name = contact.name;
	  this.index = index;
	  this.invited = contact.invited;
	  this.center = center;
	  this.canvas = canvas;
	  this.ctx = ctx;
	  this.position = position;
	  this.degrees = degrees;
	  this.beginOffset = 30;
	  this.scaleMultiplier = 4;
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
	  subNode.style.width = this.getScale() / 17 + "px";
	  subNode.style.height = this.getScale() / 17 + "px";
	  subNode.style.right = 0 - this.getScale() / 34 + "px";
	  subNode.style.top = 0 - this.getScale() / 34 + "px";
	  pivot.style.top = this.offset.height / 2 + "px";
	  pivot.style.left = this.offset.width / 2 + "px";
	
	  this.centerNode.appendChild(pivot);
	  pivot.style.transform = "rotate( " + this.degrees + "deg )";
	  window.setTimeout(function () {
	    bar.style.width = this.getScale();
	    bar.style.transition = this.getScale() / 150 + "s";
	  }.bind(this), this.getScale() * 6);
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
	
	graphNode.prototype.showName = function () {
	  var name = this.getDiv("name");
	  name.style.opacity = 1;
	};
	
	graphNode.prototype.hideName = function () {
	  var name = this.getDiv("name");
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