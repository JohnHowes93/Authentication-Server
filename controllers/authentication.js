const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config')

function tokenForUser(user){
    const timestamp = new Date().getTime()
    return jwt.encode({sub: user.id, iat:timestamp}, config.secret)
}

exports.signin = function(req, res, next){
    res.send({token: tokenForUser(req.user)})
}

exports.signup = function(req,res,next){
    const {email, password} = req.body
    
    User.findOne({email: email}, function(err, exisitingUser){
        if (err){return next(err)}
        if (exisitingUser){
            return res.status(422).send({error: 'Email is in use'})
        }
        if (!email || !password){
            return res.status(422).send({error: 'You must supply email and password'})
        }
        const user = new User({
            email, password
        })
        user.save(function(err){
            if (err) {return next(err)}
            res.json({token: tokenForUser(user)});
        })
    });
    }