const user = require('../models/user');
const bcrypt = require('bcrypt');
const { json } = require('express');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new user({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({
                    message: 'User created !'
                }))
                .catch(error => res.status(400).json({ error }))

        })
        .catch(error => res.status(500).json({ error }))

};

exports.login = (req, res, next) => {
    user.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: "identifiant ou mot de passe incorrect" });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: "identifiant ou mot de passe incorrect" })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: 'TOKEN'
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    })
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        })

};