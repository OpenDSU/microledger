function eventTemplate(messageType, executeFunction) {
    return function (fromJSON) {
        if (fromJSON.type !== messageType) {
            fromJSON.type = messageType;
        }
        this.toJSON = () => {
            return fromJSON;
        }
        this.execute = executeFunction.bind(this);
        console.log("ctor", this);
    }
}

module.exports = {
    inceptionEvent: eventTemplate("inception", function (ledger) {
        let eventState = this.toJSON();
        ledger.state.identifier = eventState.id;
        ledger.state.publicKey = eventState.publicKey;
    }),
    rotateEvent: eventTemplate("rotate", function (ledger) {
        ledger.state.publicKey = this.toJSON().publicKey;
    }),
    revokeEvent:  eventTemplate("revoke", function (ledger)  {
        ledger.state.publicKey = undefined;
    }),
    mockSecurityContext: function () {
        this.hash = function (obj) {
            return "fakeHash";
        }

        this.sign = function (did, obj) {
            return "fakeSignature";
        }
    },
    mockPersistence: function () {
        let persistence = [];

        this.load = function () {
            return persistence = [];
        }

        this.addBlock = function (block) {
            persistence.push(block);
        }
    },
    mockValidationStrategy: function () {

    }
}




