const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('back serer from security system');
})

module.exports = router;