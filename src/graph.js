const Node = require('./graphNode');

function Graph( id ){
  this.contacts = [];
  this.nodes = [];
  this.canvas = document.getElementById( id );
  this.ctx = this.canvas.getContext( "2d" );
  this.centerX = this.canvas.width / 2;
  this.position = { x: 200, y: 500 }
  this.width = 100;
  this.height = 100;
  this.centerY = this.canvas.height / 2;
  this.placeCenterNode();
}

Graph.prototype.placeCenterNode = function(){
  let centerNode = document.createElement("div");
  centerNode.className = "centerNode";
  centerNode.style.top = this.position.y + this.centerY - ( this.width / 2 ) + "px";
  centerNode.style.left = this.position.x + this.centerX  - ( this.height / 2 )  + "px";

  document.body.appendChild( centerNode );
}

Graph.prototype.addContact = function( contact ){
  this.contacts.push( contact );
}

Graph.prototype.graphContacts = function(){
  for (var i = 0; i < this.contacts.length; i++) {
    let degrees = ( 360 / this.contacts.length ) * i;
    this.nodes.push( new Node( this.contacts[i], i, this.canvas, this.ctx, { x: this.centerX, y: this.centerY }, degrees, this.position ) );
  }
}

module.exports = Graph
