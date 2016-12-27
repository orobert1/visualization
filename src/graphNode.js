function graphNode( contact, index, canvas, ctx, center, degrees, position ){
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

graphNode.prototype.renderNode = function(){
  this.element = this.createDiv();
  if ( this.invited ) {
    this.element.style.backgroundColor = "rgb( 150,150,150 )";
  }
  this.element.style.transition = this.mutualFriends/25 + "s"
  this.element.style.top = this.center.y + this.position.y + "px";
  this.element.style.left = this.center.x + this.position.x + "px";
  this.element.style.width = "0px";
  this.element.style.height = "0px";

  document.body.appendChild( this.element );
  window.setTimeout( function(){

    this.element.style.top = this.position.y + this.center.y + this.getY() + "px";
    this.element.style.left = this.position.x + this.center.x + this.getX() + "px";
    this.element.style.width = this.mutualFriends;
    this.element.style.height = this.mutualFriends;

  }.bind(this) , 100 + 10  );

}

graphNode.prototype.createDiv = function(){
  let element = document.createElement( "div" );
  element.className = "node";
  return element;
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
