const mongoose = require("mongoose");
const order = require('../Modal/order')
const book = require('../Modal/book')
const message = require('../message/message.json')

exports.placeOrder = async(req, res, next) => {
    try {
        var str = await book.findOne({_id:req.body.bookid})
        if (str && str.stock > 0) {
            var ord = await order.create({
                userid:req.body.userid,
                bookid:req.body.bookid,
                price:str.price,
                create_at:new Date().getTime()
            })  
            res.send({
                status:message.TRUE,
                message:message.Add,
            })
        }else {
            res.send({
                status:message.FALSE,
                message:"no book in stock",
            })
        }
    } catch (error) {
        res.send({
            status:message.FALSE,
            message:message.Error,
        })
    }
}


function getNextSequence(name) {
    var ret = db.counters.findAndModify(
           {
             query: { _id: name },
             update: { $inc: { seq: 1 } },
             new: true
           }
    );
 
    return ret.seq;
}