var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    email: { type: String, default: '' },
    phonenumber: { type: String, default: '' },
    password: { type: String ,default: ''},
    created_at:{type: Number, default: 0},
    updated_at:{type: Number, default: 0}
    })
module.exports =  mongoose.model('user', userSchema)