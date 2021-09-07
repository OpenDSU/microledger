let ledger = require("../index");

let newLedger = ledger.createLedger();
let factory = ledger.getFactory();

function deserialisationFunction(json){

}

factory.registerEventType("creation", deserialisationFunction);
