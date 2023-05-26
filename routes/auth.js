const express = require('express');
const database = require('../database');
const router = express.Router()


router.post('/createuser', async (req, res) => {
    console.log(req.body);
    const user = {
        fullname: req.body.fullname,
        number: req.body.number,
        email: req.body.email,
        password: req.body.password

    }



    const founduser = await database.user.findFirst({
        where: { email: user.email }
    })

    

    if (founduser) {
        return res.status(400).send({
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


module.exports = router // this is very import part 