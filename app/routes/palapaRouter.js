const express = require('express')
const router = express.Router()

router.get('/bebidas', (req,res)=>{
    res.json({mensage:'Hello World'});
})

module.exports = router