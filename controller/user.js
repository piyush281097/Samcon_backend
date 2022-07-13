const mongoose = require("mongoose");
const user = require('../Modal/user')
const jwt = require("jsonwebtoken");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
const message = require('../message/message.json')

exports.getUser = async(req, res, next) => {
    try {
        var str = await user.find()
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

exports.createUser = async(req, res, next) => {
    try {
        const encryptedString = cryptr.encrypt(req.body.password);
        var str = await user.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            password: encryptedString,
            created_at:new Date().getTime()
        })
        res.send({
            status:message.TRUE,
            message:message.Add,
        })
    } catch (error) {
        console.log(error)
        res.send({
            status:message.FALSE,
            message:message.Error,
        })
    }   
}

exports.updateUser = async(req, res, next) => {
    try {
        const encryptedString = cryptr.encrypt(req.body.password);
        var str = await user.updateOne({_id:req.body.id},{ $set:{
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            password: encryptedString,
            updated_at:new Date().getTime()
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

exports.deleteUser = async(req, res, next) => {
    try {
        var str = await user.deleteOne({_id:req.params.id})
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

exports.getToken = async(req,res, next) => {
    try {
        const token = jwt.sign(
            { user_id: "piyush", email: "piyushkachhadiya@gmail.com"},
            message.JWT_STRING,
            {
                expiresIn: "2h",
            }
        );
        res.send({
            status:message.TRUE,
            message:message.Get,
            data:token
        })
    } catch (error) {
        console.log(error);
        res.send({
            status:message.FALSE,
            message:message.Error,
        })
    }
}


