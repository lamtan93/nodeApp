const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.json(
        [
            {
            name : 'Node Js Book',
            price: '30 eur'
            },

            {
                name : 'Java Book',
                price: '45 eur'
                },
        ]
        
    )
})

module.exports = router;
