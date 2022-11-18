const { Schema, model } = require('mongoose');

const UserSchema = Schema({    
    ci:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    role:{
        type: String,
        require: false
    },
    username:{
        type: String,
        require: false
    },
    email:{
        type: String,
        require: true
    },
    active:{
        type: Boolean,
        require:false
    },
    password:{
        type: String,
        require: true
    },
    birthDate:{
        type: Date,
        require: false
    },
    phone:{
        type: String,
        require: false
    },  
    address:{
        type: String,
        require: false
    },
    vaccineState:{
        type: Boolean,
        require: false
    },
    covidVaccine:{
        type: String,
        require: false
    },
    vaccineDate:{
        type: Date,
        require: false
    }, 
    dose:{
        type: String,
        require: false
    },
},{
    timestamps: true,
    toJSON: {virtuals: true}
});

UserSchema.methods.toJSON = function() {
    const { __v, _id, ...user  } = this.toObject();
    user.uid = _id.toString();
    return user;
}

module.exports = model(
    'User',
    UserSchema
);