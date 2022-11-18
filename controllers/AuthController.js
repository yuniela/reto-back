const { response } = require('express');
const bcryptjs = require('bcryptjs');
var generator = require('generate-password');
const { generateFromEmail } = require("unique-username-generator");
const User = require("../models/User");
const { generateJWT } = require("../helpers/generate-jwt");
const { emailSender } = require('../helpers/mailsender');

const login = async(req, res = response) => {

    const { email, password } = req.body;
    
    try {              
        let user = await User.findOne({ email });
        
        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password is not correct'
            });
        }

        if ( !user.active ) {
            return res.status(400).json({
                msg: 'User / Password is not active'
            });
        }
        
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User / Password is not correct'
            });
        }
        
        user = user.toJSON();
        const token = await generateJWT(  user.uid );
        
        const { createdAt, updatedAt, active, ...userJson } = user;
        delete userJson.password;
        res.json({
            token,
            user:userJson
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk admin'
        });
    }   

}

const register = async(req, res = response) => {
    
    const { ci,
            name, 
            lastName, 
            email, 
         } = req.body;

    const password = generator.generate({
        length: 10,
        numbers: true
    });

    const username = generateFromEmail(email);
    
    const user = new User({
        ci,
        name, 
        lastName, 
        email, 
        username,
        password,
        active: true,
        role: "USER",
        birthDate: new Date(),
        phone: 0,
        address: "",
        vaccineState: false,
        covidVaccine: "",
        vaccineDate: new Date(),
        dose: 0  
    });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    const emailSend = await emailSender(email, username, password);
    
    // Guardar en BD
    await user.save();

    res.status(201).json({
        user
    });
}

const getUsers = async (req, res) => {

}

module.exports = {
    login,
    register,
}