const User = require("../models/User");

const userPatch = async (req, res = response) => {
    try{      
        console.log(req.body); 
        const user = await User.findByIdAndUpdate( req.user._id, req.body );
        const { uid, ...userJson } = user;
        delete userJson.password;
        return res.json(userJson);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Talk admin'
        });
    }   
}

const getUsers = async (req, res = response) => {
    try {
        const users = await User.find({});

        return res.json(users);
        
    } catch (error) {
        
    }
}

module.exports = {
    userPatch,
    getUsers
}