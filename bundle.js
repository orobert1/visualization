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
	  for (var i = 0; i < 500; i++) {
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
	  this.position = { x: 200, y: 500 };
	  this.width = 100;
	  this.height = 100;
	  this.centerY = this.canvas.height / 2;
	  this.placeCenterNode();
	}
	
	Graph.prototype.placeCenterNode = function () {
	  var centerNode = document.createElement("div");
	  centerNode.className = "centerNode";
	  centerNode.style.top = this.position.y + this.centerY - this.width / 2 + "px";
	  centerNode.style.left = this.position.x + this.centerX - this.height / 2 + "px";
	
	  document.body.appendChild(centerNode);
	};
	
	Graph.prototype.addContact = function (contact) {
	  this.contacts.push(contact);
	};
	
	Graph.prototype.graphContacts = function () {
	  for (var i = 0; i < this.contacts.length; i++) {
	    var degrees = 360 / this.contacts.length * i;
	    this.nodes.push(new Node(this.contacts[i], i, this.canvas, this.ctx, { x: this.centerX, y: this.centerY }, degrees, this.position));
	  }
	};
	
	module.exports = Graph;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	function graphNode(contact, index, canvas, ctx, center, degrees, position) {
	  this.mutualFriends = contact.mutualFriends;
	  this.name = contact.name;
	  this.index = index;
	  this.invited = contact.invited;
	  this.center = center;
	  this.canvas = canvas;
	  this.ctx = ctx;
	  this.position = position;
	  this.degrees = degrees;
	  this.beginOffset = 10;
	  this.scaleMultiplier = 15;
	  this.renderNode();
	}
	
	graphNode.prototype.renderNode = function () {
	  this.element = this.createDiv();
	  if (this.invited) {
	    this.element.style.backgroundColor = "rgb( 150,150,150 )";
	  }
	  this.element.style.transition = this.mutualFriends / 25 + "s";
	  this.element.style.top = this.center.y + this.position.y + "px";
	  this.element.style.left = this.center.x + this.position.x + "px";
	  this.element.style.width = "0px";
	  this.element.style.height = "0px";
	
	  document.body.appendChild(this.element);
	  window.setTimeout(function () {
	
	    this.element.style.top = this.position.y + this.center.y + this.getY() + "px";
	    this.element.style.left = this.position.x + this.center.x + this.getX() + "px";
	    this.element.style.width = this.mutualFriends;
	    this.element.style.height = this.mutualFriends;
	  }.bind(this), 100 + 10);
	};
	
	graphNode.prototype.createDiv = function () {
	  var element = document.createElement("div");
	  element.className = "node";
	  return element;
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