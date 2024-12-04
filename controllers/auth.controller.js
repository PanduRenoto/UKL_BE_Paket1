const express = require(`express`)
const md5 = require(`md5`)
const jwt = require(`jsonwebtoken`)
const userModel = require(`../models/index`).users

const authenticate = async (req, res) => {
    let dataLogin = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let dataUser = await userModel.findOne({ where: dataLogin })

    if(dataUser){
        let payload = JSON.stringify(dataUser)
        let secret = `panduwagir`
        let token = jwt.sign(payload, secret)
        return res.json({
            status: `success`,
            message: `Login berhasil`,
            token: token,
        })
    }

    return res.json({
        success: false,
        logged: false,
        message: `Authentication failed. Invalid username or password`
    })
}

const authorize = (req, res, next) => {
    let headers = req.headers.authorization
    let tokenKey = headers && headers.split(" ")[1]

    if (tokenKey == null) {
        return res.json({
            success: false,
            message: `Unauthorized user`
        })
    }

    let secret = `panduwagir`

    jwt.verify(tokenKey, secret, (error, user) => {
        if (error) {
            return res.json({
                success: false,
                message: `Invalid token`
            })
        }
    })
    next()
}

module.exports = { authenticate, authorize }