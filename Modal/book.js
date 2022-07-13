var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: { type: String, default: '' },
    author: { type: String, default: '' },
    price: { type: String, default: '' },
    stock: { type: Number, default: '' },
    })
module.exports =  mongoose.model('books', bookSchema)