const express = require('express')
const router = express.Router()
const {check , validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../../models/User') //importing Model
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const config = require('config')
// @route POST api/users
// @desc Register User Route
// @access Public
router.post('/',[
    check('name','Name is Required').not().isEmpty(),
    check('email', 'Please Enter Valid email').isEmail(),
    check('password','Please enter a Password with 6 or more characters').isLength({min:6})
],async (req,res)=>{
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {name, email, password} = req.body //destructuring values from req.body

try{

    let user = await User.findOne({email})
    if(user){
        return res.status(400).json({errors:[{msg:'User already Exists'}]}) //if user already exists setting msg value
    }
    const avatar = gravatar.url(email, { //gravator icon in email
        s:'200', 
        r:'pg',
        d:'mm'
    })
    user = new User({
        name,
        email,
        avatar,
        password,      
    })

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt) //modifing user.password after initiating

    await user.save()
   
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



module.exports = router 

