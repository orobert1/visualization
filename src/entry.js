let Graph = require('./graph.js');

let run = function(){
  let graph = new Graph( "dragSurface", "dataVis" );
  for (var i = 0; i < 100; i++) {
    let mutualFriends = ( Math.random() * 80 );
    let invitedRandom = Math.random() * 2;
    if( invitedRandom > 1 ){
      invitedRandom = false;
    }else{
      invitedRandom = true;
    }
    graph.addContact({ mutualFriends: mutualFriends, name: "Oscar", invited: invitedRandom });
  }
  graph.graphContacts();
}

run();
