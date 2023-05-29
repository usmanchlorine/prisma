const express = require('express');
const database = require('../database');
const router = express.Router()
const bcrypt = require('bcryptjs');
const checkUser = require('../User/Service');
require('dotenv').config();
var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
router.post('/createuser', async (req, res) => {
    console.log(req.body);
    var salt = bcrypt.genSaltSync(10);
    const user = {
        fullname: req.body.fullname,
        number: req.body.number,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt)

    }



    const founduser = await database.user.findFirst({
        where: { email: user.email }
    })



    if (founduser) {
        return res.status(400).send({
            status: '400',
            field: 'email',
            message: 'user already exists'
        })
    }



    try {
        const result = await database.user.create({
            data: {
                ...user
            }
        })

        if (result) {
            return res.status(200).send({
                message: 'user created successfully',
                value: {
                    ...result
                }
            })
        }

    } catch (e) {
        return res.status(500).send({
            message: 'error creating user',

        })
    }

})


router.post('/login', async (req, res) => {
    const user = req.body

    checkUser(user)
        .then((user) => {
            const authtoken = jwt.sign({
                ...user
            }, JWT_SECRET)
            res.status(200).send({
                authtoken: authtoken
            })
        })
        .catch(err => {
            res.status(err.status).send({
                message: err.message
            })
        })


})


module.exports = router // this is very import part 