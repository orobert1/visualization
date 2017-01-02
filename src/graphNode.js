function graphNode( contact, index, canvas, ctx, center, degrees, position, centerNode, offset ){
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
  this.offset = offset
  this.renderNode();
}

graphNode.prototype.renderNode = function(){
  let pivot = this.createDiv( "pivot" );
  let bar = this.createDiv( "bar" );
  let subNode = this.createDiv( "subNode" )
  let name = this.createDiv( "name" )
  pivot.appendChild( bar );
  bar.appendChild( subNode );
  subNode.appendChild( name );
  name.innerText = this.name;
  if ( !this.invited ) {
    subNode.style.backgroundColor = "rgb(100,100,100)";
  }
  subNode.onmouseenter = this.showName.bind( this );
  subNode.onmouseleave = this.hideName.bind( this );
  subNode.style.width = this.getScale() / 23 + "px";
  subNode.style.height = this.getScale() / 23 + "px";
  subNode.style.right = 0 - (this.getScale() / 46) + "px";
  subNode.style.top = 0 - (this.getScale() / 46) + "px";
  pivot.style.top = this.offset.height / 2 + "px";
  pivot.style.left = this.offset.width / 2 + "px";

  this.centerNode.appendChild( pivot );
  pivot.style.transform = `rotate( ${ this.degrees }deg )`;
  window.setTimeout( function(){
    bar.style.width = this.getScale();
    bar.style.transition = this.getScale() / 150 + "s";
  }.bind( this ), this.getScale() * 6 )

}

graphNode.prototype.createDiv = function( className ){
  let element = document.createElement( "div" );
  element.id = className + this.index;
  element.className = className;
  return element;
}
graphNode.prototype.getDiv = function( className ){
  let element = document.getElementById( className + this.index );
  return element;
}


graphNode.prototype.showName = function(){
  let name = this.getDiv( "name" );
  name.style.opacity = 1;
}

graphNode.prototype.hideName = function(){
  let name = this.getDiv( "name" );
  name.style.opacity = 0;
}

graphNode.prototype.sinDegrees = function(){
  return Math.sin( this.degrees / 180*Math.PI );
}

graphNode.prototype.cosDegrees = function(){
  return Math.cos( this.degrees / 180*Math.PI );
}

graphNode.prototype.getX = function(){
  return this.sinDegrees() * this.getScale();
}

graphNode.prototype.getY = function(){
  return this.cosDegrees() * this.getScale();
}

graphNode.prototype.getScale = function(){
  return this.beginOffset + ( this.scaleMultiplier * this.mutualFriends );
}



module.exports = graphNode
