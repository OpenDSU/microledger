
function EventsFactory(){
    let eventsFilters = [];
    this.register = function(f){
        eventsFilters.push(f);
    }

    this.loadEvent = function(eventJSON){
        let currentFilter;
        eventsFilters.some( (filter) => {
            let eventInstance = filter(eventJSON)
            if(eventInstance === undefined) {
                return false;
            }
            return true;
        })

    }
}


module.exports.getEventsFactory = function(){
    let eventsFactory = new EventsFactory();
    return eventsFactory;
}