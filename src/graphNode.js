function graphNode( contact, index, canvas, ctx, center, degrees, position, centerNode, offset, scale ){
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
  this.registerScaleDiv( subNode, "width", this.getWidthHeight.bind( this ) );
  this.registerScaleDiv( subNode, "height", this.getWidthHeight.bind( this ) );
  this.registerScaleDiv( subNode, "top", this.getOffset.bind( this ) );
  this.registerScaleDiv( name, "bottom", this.getBottom.bind( this ) );
  pivot.style.top = this.offset.height / 2 + "px";
  pivot.style.left = this.offset.width / 2 + "px";
  this.centerNode.appendChild( pivot );
  pivot.style.transform = `rotate( ${ this.degrees }deg )`;
  window.setTimeout( function(){
    this.registerScaleDiv( bar, "width", this.getScale.bind( this ) );
    bar.style.transition = this.getScale() / 150 + "s";
  }.bind( this ), this.getScale() * 6 )

}
graphNode.prototype.getWidthHeight = function(){
  return this.scaleMultiplier * 1.8 + "px";
}

graphNode.prototype.getOffset = function(){
  return 0 - (this.scaleMultiplier / 2) + "px";
}

graphNode.prototype.getBottom = function(){
  return this.scaleMultiplier;
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

graphNode.prototype.registerScaleDiv = function( div, property, value ){
  let scaleProp = { div: div, property: property, value: value };
  div.style[property] = value();
  this.scaleProps.push( scaleProp );
}

graphNode.prototype.updateScale = function( newScale ){
  this.scaleMultiplier = newScale;
  console.log(this.scale);

  for (var i = 0; i < this.scaleProps.length; i++) {
    let scaleProp = this.scaleProps[i];
    scaleProp.div.style[scaleProp.property] = scaleProp.value();
  }
}

graphNode.prototype.showName = function(){
  let bar = this.getDiv( "bar" );
  let name = this.getDiv( "name" );
  bar.style.opacity = 1;
  name.style.opacity = 1;
}

graphNode.prototype.hideName = function(){
  let bar = this.getDiv( "bar" );
  let name = this.getDiv( "name" );
  bar.style.opacity = .2;
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
