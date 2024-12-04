const userModel = require('../models/index').users
const Op = require('sequelize').Op
const md5 = require(`md5`)

exports.addUser = (req, res) => {
    let newUser = {
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password),
        role: req.body.role
    }

    userModel.create(newUser).then(result => {
        let userData = {
            id: result.id,
            name: result.name,
            username: result.username,
            role: result.role
        }
        return res.json({
            status: `success`,
            message: `Pengguna berhasil ditambahkan`,
            data: userData
        })
    })
    .catch(error => {
        return res.json({
            success: false,
            message: error.message
        })
    })
}

exports.updateUser = (req, res) => {
    let dataUser = {
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password),
        role: req.body.role
    }

    let id = req.params.id

    userModel.update(dataUser, { where: { id: id } }).then(() => {
        userModel.findOne({ where: { id: id } }).then(updatedUser => {
            let userData = {
                id: updatedUser.id,
                name: updatedUser.name,
                username: updatedUser.username,
                role: updatedUser.role
            }
            return res.json({
                status: `success`,
                message: `Pengguna berhasil diubah`,
                data: userData
            })
        })
        .catch(error => {
            return res.json({
                status: `error`,
                message: `Gagal mengambil data pengguna setelah update`,
                error: error.message
            })
        })
    })
    .catch(error => {
        return res.json({
            success: false,
            message: error.message
        })
    })
}

exports.getUserById = async (req, res) => {
    const { id } = req.params
    let userData = await userModel.findOne({ where: { id: id } })
    if (!userData) {
        return res.status(404).json({
            success: false,
            message: `User with ID ${id} not found`
        })
    }
    userData = {
        id: userData.id,
        name: userData.name,
        username: userData.username,
        role: userData.role
    }

    return res.json({
        status: `success`,
        data: userData
    })
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params

    userModel.findOne({ where: { id: id } }).then(user => {
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User with ID ${id} not found`
            })
        }

        return userModel.destroy({ where: { id: id } }).then(() => {
            res.json({
                success: true,
                message: `User with ID ${id} has been deleted`
            })
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: `Error deleting user: ${error.message}`
        })
    })
}
