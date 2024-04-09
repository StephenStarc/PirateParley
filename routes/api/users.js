const express = require('express')
const router = express.Router()

// @route POST api/users
// @desc Register USer Route
// @access Public
router.post('/',(req,res)=>{
res.send('User Page')
})

module.exports = router 
