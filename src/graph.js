const Node = require('./graphNode');

function Graph( id ){
  this.contacts = [];
  this.nodes = [];
  this.canvas = document.getElementById( id );
  this.ctx = this.canvas.getContext( "2d" );
  this.centerX = this.canvas.width / 2;
  this.position = { x: 100, y: 100 }
  this.width = 50;
  this.height = 50;
  this.offset = { width: this.width, height: this.height }
  this.centerY = this.canvas.height / 2;
  this.centerNode = this.placeCenterNode();
}

Graph.prototype.placeCenterNode = function(){
  let centerNode = document.createElement("div");
  centerNode.className = "centerNode";
  centerNode.style.width = this.width + "px";
  centerNode.style.height = this.height + "px";
  centerNode.style.top = this.position.y + this.centerY - ( this.width / 2 ) + "px";
  centerNode.style.left = this.position.x + this.centerX  - ( this.height / 2 )  + "px";
  document.body.appendChild( centerNode );
  return centerNode;
}

Graph.prototype.addContact = function( contact ){
  this.contacts.push( contact );
}

Graph.prototype.graphContacts = function(){
  for (var i = 0; i < this.contacts.length; i++) {
    let degrees = ( 360 / this.contacts.length ) * i;
    this.nodes.push( new Node( this.contacts[i], i, this.canvas, this.ctx, { x: this.centerX, y: this.centerY }, degrees, this.position, this.centerNode, this.offset ) );
  }
  let topNode = document.createElement("div");
  topNode.id = "topNode";
  this.centerNode.appendChild( topNode )
}

module.exports = Graph
