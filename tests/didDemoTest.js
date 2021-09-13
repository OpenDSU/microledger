let ledgerUtil = require("../index");
let assert = require("assert");
let didUtil = require("./DIDDemoUtil");

function DIDDemoDocument() {
    let eventsFactory = ledgerUtil.getEventsFactory();

    let ledger = ledgerUtil.createLedger("mockdid",
        eventsFactory,
        new didUtil.mockSecurityContext(),
        new didUtil.mockPersistence(),
        new didUtil.mockValidationStrategy());


    this.getIdentifier = function () {
        return "did:demo:" + ledger.state.identifier;
    }

    this.create = function (userEntropy) {
        ledger.beginBlock();
        ledger.addEvent(new didUtil.inceptionEvent({id: userEntropy, publicKey: "demoKey"}));
        ledger.endBlock();
    }

    this.rotate = function () {
        ledger.beginBlock();
        ledger.addEvent(new didUtil.rotateEvent({publicKey: "rotatedKey"}));
        ledger.endBlock();
    }

    this.revoke = function () {
        ledger.beginBlock();
        ledger.addEvent(new didUtil.revokeEvent({}));
        ledger.endBlock();
    }

    this.sign = function (obj) {
        return "[SIGN" + ledger.state.publicKey + "]";
    }
}

let didDemo = new DIDDemoDocument();
didDemo.create("testDemo");
didDemo.rotate();

console.log(didDemo.getIdentifier(), "signature:", didDemo.sign({}));




