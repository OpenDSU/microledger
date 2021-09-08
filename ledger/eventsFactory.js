
function EventsFactory(){
    let eventsFilters = [];
    this.register = function(f){
        eventsFilters.push(f);
    }

    this.loadEvent = function(ledger, eventJSON){
        let currentFilter;
        eventsFilters.some( (filter) => {
            let eventInstance = filter(eventJSON)
            if(eventInstance === undefined) {
                return false;
            }
            eventInstance.action(ledger)
            return true;
        })

    }
}


let eventsFactorySingleton = undefined;
module.exports.getEventsFactory = function(){
    if(eventsFactorySingleton === undefined){
        eventsFactorySingleton = new EventsFactory();
    }
    return eventsFactorySingleton;
}