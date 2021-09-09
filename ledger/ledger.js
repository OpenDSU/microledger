

function Block(ledger, eventsFactory){
    let self = this;
    this.events = [];
    this.header = {};
    this.addEvent = function(event){
        this.events.push(event);
    };

    this.addHeader = function(header){
        this.header = header;
    };

    this.addSignature = function(signature){
        this.header.signature = signature;
    };
    this.toJSON = function(){
        return JSON.stringify({events:this.events, header:this.header});
    }

    this.load = function(obj){
        this.events = obj.events.map( e => {
            let eventInstance =  eventsFactory.loadEvent(e);
            eventInstance.execute(ledger)
            return eventInstance;
        });
        this.header = obj.header;
    }

    this.execute = function(){
        this.events.forEach( (ev) => {
           ev.execute(ledger)
        });
    }
}


function Ledger(asDID, eventsFactory, securityContext, persistence, validationStrategy){
    let self = this;
    let rawBlocks = persistence.load();

    this.state  = {};

    let currentBlock = undefined;
    let previousBlock = undefined;

    this.blocks = rawBlocks.map( (b) =>{
        previousBlock = new Block(self);
        previousBlock.load(b);
        return previousBlock;
    })

    this.beginBlock = function() {
        currentBlock = new Block(self);
    };

    this.addEvent = function(event) {
        currentBlock.addEvent(event);
    };

    this.endBlock = function() {
        let header = {previousBlock: "prev"};
        let signature = securityContext.sign(asDID, currentBlock);
        currentBlock.addSignature();
        currentBlock.execute();
        persistence.addBlock(currentBlock.toJSON());
        currentBlock = undefined
    };
}



module.exports.createLedger = function(asDiD, eventsFactory, securityContext, persistence, validationStrategy){
    return new Ledger(asDiD, eventsFactory, securityContext, persistence, validationStrategy);
}