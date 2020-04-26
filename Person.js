var {EVENT_GO_CAMPING} = require('./eventNames');
var myEmitter = require('./MyEmitter');

class Person {
    constructor(name,age){
        //var that = this;
        this.name = name;
        this.age = age;
        myEmitter.on(EVENT_GO_CAMPING,afficherMessage.bind(this))
    }
}

function afficherMessage(mess){
    console.log(`${this.name} ${this.age} ans,  a reçu l'événement EVENT_GO_CAMPING:
    ${JSON.stringify(mess)}\n` );
}

module.exports = Person;