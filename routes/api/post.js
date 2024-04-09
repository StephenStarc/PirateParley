const express = require('express')
const router = express.Router()

// @route GET api/post
// @desc post Route
// @access Public
router.get('/',(req,res)=>{
    console.log(res.body)
res.send('Post Page')
})

module.exports = router
