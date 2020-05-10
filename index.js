/*
//********EventEmitter:***********
const myEmitter = require('./MyEmitter');
const Person = require('./Person');
const Student = require('./Student');
const {EVENT_GO_CAMPING, EVENT_NEW_COURSE} = require('./eventNames');

let Corgi = new Person('Corgi', 2);
let Noir = new Person('Noir', 18);
let Thao = new Person('Thao', 23);

let student = new Student('Vy', 20);

myEmitter.emit(EVENT_GO_CAMPING,{
    place : 'Saigon',
    date : '30/04/2020'
});

myEmitter.emit(EVENT_NEW_COURSE,{
    Université : 'Lille 3',
    Cours : 'Chinois',
    Durée: 'Toute la journée',
    Date : '30/04/2020'
});

myEmitter.emit('error', new Error('Huỷ lịch đi chơi và những việc khác'));
console.log(myEmitter.listenerCount(EVENT_NEW_COURSE));
*/

//************Express************
const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.options('*', cors());

//Set view's engine - middleware
app.set('view engine', 'ejs'); // extended javascript
app.use(express.static(path.join(__dirname, 'js_client')));
app.use(express.static(path.join(__dirname, 'statics')));

app.use(bodyParser.json()); //truyen du lieu JSON
app.use(bodyParser.urlencoded({extended: true}));// truyen du lieu POST

//Router
const systemInfo = require('./routes/systemInfo');
const books = require('./routes/books');
const files = require('./routes/files');
const users = require('./routes/users');
const tasks = require('./routes/tasks');



app.listen(PORT, ()=>{
    console.log(`Server is lingtening on port ${PORT}`);
});

app.get('/', (req, res)=>{
    res.send('<H1>Hello World</H1>');
});

app.get('/something', (req, res)=>{
    res.send('<H1>Hello something</H1>');
});

app.use('/systemInfo', systemInfo);
app.use('/books', books);
app.use('/files', files);
app.use('/users', users);
app.use('/tasks', tasks);

app.use((req, res)=>{
    const url_prefix = path.join(__dirname);
    const url_errorPage = url_prefix + '/pageError.html';
    res.status(404).sendFile(url_errorPage);
});




