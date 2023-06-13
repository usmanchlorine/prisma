const database = require("../database")
const bcrypt = require('bcryptjs');

const checkUser = (user) => {
    return new Promise(async function (resolve, reject) {
        try {
            const founduser = await database.user.findFirst({
                where: {
                    email: user.email
                }
            })

            if (!founduser) {
                reject({
                    status: 400,
                    message: "incorrect credentials"
                })
            }

            const passwordcompare = await bcrypt.compare(user.password, founduser.password)

            if (!passwordcompare) {
                reject({
                    status: 400,
                    message: "incorrect credentials"
                })
            }

            resolve({
                data: founduser
            })

        } catch (e) {
            reject({
                status: 500,
                message: "internal error"
            })

        }


    })

}


module.exports = checkUser