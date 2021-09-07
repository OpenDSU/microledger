

function Block(){
    this.addEvent = function(event){

    };

    this.addPreviousBlock = function(event){

    };

    this.addSignature = function(event){

    };
}


function Ledger(persistence, securityContext){
    persistence.load()
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



module.exports.createLedger = function(){
    return new Ledger();
}