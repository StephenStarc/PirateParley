const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const {check , validationResult} = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// @route GET api/auth
// @desc Auth Route
// @access Public
router.get('/',auth,async (req,res)=>{
try{
const user = await User.findById(req.user.id).select('-password')
res.json(user)
}catch(err){
console.error(err.message)
res.status(500).send('Server Error')

}
})

module.exports = router

// @route POST api/users
// @desc Authenticate user and get token
// @access Public
router.post('/',[
    check('email', 'Please Enter Valid email').isEmail(),
    check('password','Password Is required').exists()
],async (req,res)=>{
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body //destructuring values from req.body

try{

    let user = await User.findOne({email})
    if(!user){
        return res.status(400).json({errors:[{msg:'Invaild Credentials'}]}) //if user already exists setting msg value
    }

   const isMatch = await bcrypt.compare(password, user.password)

   if(!isMatch){
    return res.status(400).json({errors:[{msg:'Invaild Credentials'}]})
   }
    const playload = {
        user:{
            id:user.id //get id from promise returned by  - await user.save()
        }
    }

    jwt.sign(playload,
        config.get('jwtSecret'),
        {expiresIn:360000},
        (err, token) =>{
            if(err) throw err
            res.json({token})
        }
    )
}catch(err){
    console.error(err.message)
    res.status(500).send('Server Error')
}

})

