const mongoose = require("mongoose");
const book = require('../Modal/book')
const message = require('../message/message.json');
const order = require("../Modal/order");
const user = require("../Modal/user");

exports.getBook = async(req, res, next) => {
    try {
        var str = await book.find()
        res.send({
            status:message.TRUE,
            message:message.Get,
            data:str
        })
    } catch (error) {
        res.send({
            status:message.FALSE,
            message:message.Error,
        })
    }   
}

exports.getBookById = async(req, res, next) => {
    try {
        console.log(req.query);
        var getBookDetails = await book.findOne({_id:req.query.ids})
        if (getBookDetails) {
            var array = []
            var getOrderDetails = await order.find({bookid:getBookDetails._id})
            if (getOrderDetails && getOrderDetails.length > 0) {
                for (let k = 0; k < getOrderDetails.length; k++) {
                    console.log("getOrderDetails",getOrderDetails[k]);
                    var details = await user.findOne({_id:getOrderDetails[k].userid})
                    console.log("details",details);
                    // if (details != null) {
                        array.push(details)
                    // }
                }
            }
            var obj = {
                author:getBookDetails.author,
                name:getBookDetails.name,
                price:getBookDetails.price,
                user:array
            }
            res.send({
                status:message.TRUE,
                message:message.Get,
                data:obj
            })
        }else {
            res.send({
                status:message.FALSE,
                message:"No data Found",
            })
        }

    } catch (error) {
        console.log(error);
        res.send({
            status:message.FALSE,
            message:message.Error,
        })
    }
}

exports.createBook = async(req, res, next) => {
    try {
        var str = await book.create({
            name: req.body.name,
            author: req.body.author,
            price: req.body.price,
            stock: req.body.stock,
            create_at:new Date().getTime()
        })
        res.send({
            status:message.TRUE,
            message:message.Add,
        })
    } catch (error) {
        res.send({
            status:message.FALSE,
            message:message.Error,
        })
    }   
}

exports.updateBook = async(req, res, next) => {
    try {
        var str = await book.updateOne({_id:req.body.id},{ $set:{
            name: req.body.name,
            author: req.body.author,
            price: req.body.price,
            stock: req.body.stock,
            updated_at:new Date().getTime(),
        }})
        res.send({
            status:message.TRUE,
            message:message.Update,
        })
    } catch (error) {
        res.send({
            status:message.FALSE,
            message:message.Error,
        })
    }   
}

exports.deleteBook = async(req, res, next) => {
    try {
        var str = await book.deleteOne({_id:req.params.id})
        res.send({
            status:message.TRUE,
            message:message.Delete,
        })
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


