const express = require('express')
const router = express.Router()

// @route GET api/profile
// @desc Profile Route
// @access Public
router.get('/',(req,res)=>{
res.send('Profile Page')
})

module.exports = router
