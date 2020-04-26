const EventEmitter = require('events');

class MyEmitter extends EventEmitter{
    constructor(){
        super();
    }
}

var myEmitter = new MyEmitter();
module.exports = myEmitter;