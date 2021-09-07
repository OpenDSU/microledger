
function EventsFactory(){

}


let eventsFactorySingleton = undefined;
module.exports.getEventsFactory = function(){
    if(eventsFactorySingleton === undefined){
        eventsFactorySingleton = new EventsFactory();
    }
    return eventsFactorySingleton;
}