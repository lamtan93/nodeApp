const myEmitter = require('./MyEmitter');
const {EVENT_NEW_COURSE} = require('./eventNames');

class Student{
    constructor(name,age){
        this.name = name;
        this.age = age;
        myEmitter.on('error', (error)=>{
            if(!error){
                myEmitter.on(EVENT_NEW_COURSE, (mess)=>{
                    console.log(`${this.name} a reçu l'événement EVENT_NEW_COURSE
                    Contenu: ${JSON.stringify(mess)}`);
                })    
            }else{
                console.log('Event Annulé!!!');
            }
            
        })
        
    }
}

module.exports = Student;