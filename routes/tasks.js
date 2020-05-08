const express = require('express');
const router = express.Router();
let taskData = require('../data/taskData');


router.get('/', (req,res)=>{
    res.json
        ({
           result : 'OK',
           tasks: taskData,
           message: 'Get list of tasks successfully'
        });

});

//Request dạng params(/:id) != query(&abc=&xyz=)
router.get('/abc/:id', (req, res)=>{
    const {id} = req.params;

    if(isNaN(parseInt(id)) === true){
        res.json({
            result: 'failed',
            message: 'You must enter the task\'s id. Id must be a number'
        })
        return;
    }

    const foundTask = taskData.find()

    

    res.send(id);
})


module.exports = router;