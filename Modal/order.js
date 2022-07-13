var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    userid: { type: mongoose.Types.ObjectId, default: null },
    bookid: { type: mongoose.Types.ObjectId, default: null },
    price: { type: String, default: '' },
    created_at:{type: Number, default: 0},
    updated_at:{type: Number, default: 0}
    })
module.exports =  mongoose.model('order', userSchema)