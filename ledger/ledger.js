

function Block(){
    this.addEvent = function(event){

    };

    this.addPreviousBlock = function(event){

    };

    this.addSignature = function(event){

    };
}


function Ledger(eventsFactory, securityContext, persistence){

    this.blocks = persistence.load();
    this.state  = {};
    let currentBlock = undefined;

    this.beginBlock = function() {
        currentBlock = new Block();
    };

    this.addEvent = function(event) {
        currentBlock.addEvent(event);
    };

    this.endBlock = function() {
        persistence.addBlock(currentBlock);
        currentBlock = undefined
    };
}



module.exports.createLedger = function(eventsFactory, securityContext, persistence){
    return new Ledger(eventsFactory, securityContext, persistence);
}