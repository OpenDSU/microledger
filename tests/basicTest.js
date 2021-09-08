let ledger = require("../index");
let assert = require("assert");

let eventsFactory = ledger.getEventsFactory();

function inceptionEvent(fromJSON){
  if(fromJSON.type  != "inception"){
      fromJSON.type = "inception";
  }

    this.action = (ledger) => {
        ledger.state.key = fromJSON.key;
    }

    this.toJSON = () => {
        return fromJSON;
    }
}

function changeEvent(fromJSON){
    if(fromJSON.type  != "change"){
        fromJSON.type = "change";
    }

    this.action = (ledger) => {
        ledger.state.key = fromJSON.key;
    }

    this.toJSON = () => {
        return fromJSON;
    }
}

eventsFactory.register(function(event){
    if(event.type === "init"){
        return new inceptionEvent(event)
    }
    return undefined;
})

eventsFactory.register(function(event){
    if(event.type === "change"){
        return new changeEvent(event)
    }
    return undefined;
})

function mockSecurityContext(){
  this.hash = function(obj){
    return "fakeHash";
  }

  this.sign = function(did, obj){
      return "fakeSignature";
  }
}

function mockPersistence(){
    let persistence = [];

  this.load = function(){
     return persistence = [];
 }

 this.addBlock = function(block){
        persistence.push(block);
    }

}

let newLedger = ledger.createLedger(eventsFactory, new mockSecurityContext(), new mockPersistence());

newLedger.beginBlock();
newLedger.addEvent(new inceptionEvent({identifier:"test", key:"key0"}));
newLedger.endBlock();

newLedger.beginBlock();
newLedger.addEvent(new changeEvent({key:"key1"}));
newLedger.addEvent(new changeEvent({key:"key2"}));
newLedger.endBlock();


assert.strictEqual(newLedger.state.key, "key2");

console.dump(ledger);