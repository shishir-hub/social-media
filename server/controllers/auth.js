const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res, next) => {
    try {
        let user_exists = await User.findOne({ email: req.body.email });
        if (user_exists) {
            res.status(400).send({
                msg: "User already exists with this email"
            })
        }
        else {
            let hashed = await bcrypt.hash(req.body.password, 10);
            let new_user = await User.create({ ...req.body, password: hashed });
            let user_obj = new_user.toObject();
            delete user_obj.password;
            res.send({
                msg: "User created Successfully",
                data: user_obj
            });
        }
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        let user_exists = await User.findOne({ email: req.body.email });
        if (user_exists) {
            let valid = await bcrypt.compare(req.body.password, user_exists.password);
            if (valid) {
                let user_obj = user_exists.toObject();
                delete user_obj.password;
                let token = jwt.sign(user_obj, process.env.JWT_SECRET);
                res.send({
                    data: user_obj,
                    token: token,
                    msg: "Login successful"
                })
            }
            else {
                res.status(400).send({
                    msg: "Password doesnot match",
                })
            }
        }
        else {
            res.status(404).send({
                msg: "User not found",
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    register,
}