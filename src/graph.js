const Node = require('./graphNode');

function Graph( id, dataVis ){
  this.dataVis = document.getElementById( dataVis );
  this.contacts = [];
  this.nodes = [];
  this.dragSurface = document.getElementById( id );
  this.dragSurface.style.height = window.innerHeight
  this.dragSurface.ondragstart = this.dragStart.bind( this );
  this.dragSurface.ondrag = this.drag.bind( this );
  this.position = { x: window.innerWidth / 2, y: 700 }
  this.scale = 4;
  this.width = this.scale * 15;
  this.height = this.scale * 15;
  this.offset = { width: this.width, height: this.height }
  this.centerNode = this.placeCenterNode();
}

Graph.prototype.placeCenterNode = function(){
  let centerNode = document.createElement("div");
  centerNode.className = "centerNode";
  centerNode.style.width = this.width + "px";
  centerNode.style.height = this.height + "px";
  centerNode.style.top = this.position.y - ( this.width / 2 ) + "px";
  centerNode.style.left = this.position.x  - ( this.height / 2 )  + "px";
  this.dataVis.appendChild( centerNode );
  return centerNode;
}
Graph.prototype.dragStart = function( e ){
  var x = e.clientX;
  var y = e.clientY;
  this.mouseStart = { x: x, y: y }
}

Graph.prototype.drag = function( e ){
  var x = e.clientX;
  var y = e.clientY;
  if( ( this.mouseStart.x !== x || this.mouseStart.y !== y ) && x && y ){
    this.position.x += x - this.mouseStart.x;
    this.position.y += y - this.mouseStart.y;
    this.mouseStart.x = x;
    this.mouseStart.y = y;
    this.centerNode.style.top = this.position.y - ( this.width / 2 ) + "px";
    this.centerNode.style.left = this.position.x  - ( this.height / 2 )  + "px";
  }
}

Graph.prototype.dragEnd = function(){

}

Graph.prototype.addContact = function( contact ){
  this.contacts.push( contact );
}

Graph.prototype.changeScale = function(){
  for (var i = 0; i < this.nodes.length; i++) {
    let node = this.nodes[i];
    node.updateScale( this.scale );
  }
}

Graph.prototype.graphContacts = function(){
  for (var i = 0; i < this.contacts.length; i++) {
    let degrees = ( 360 / this.contacts.length ) * i;
    this.nodes.push( new Node( this.contacts[i], i, this.canvas, this.ctx, { x: this.centerX, y: this.centerY }, degrees, this.position, this.centerNode, this.offset, this.scale ) );
  }
  let topNode = document.createElement("div");
  topNode.id = "topNode";
  topNode.draggable = "true";
  topNode.ondragstart = this.dragStart.bind( this );
  topNode.ondrag = this.drag.bind( this );
  this.centerNode.appendChild( topNode )
}

module.exports = Graph
