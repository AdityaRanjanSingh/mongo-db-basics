const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('http-auth');


const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd')
})
const router = express.Router();

const Registration = mongoose.model('Registration');

router.get('/', auth.connect(basic), (req, res) => {
    res.render('form', { title: 'Registration form' });
});

router.get('/registrations', (req, res) => {
    Registration.find().then((registrations) => {
        res.render('index', { title: 'Listing registrations', registrations });

    })
        .catch((e) => {
            console.log(e)
            res.send('sorry! Something went wrong.');
        });
});

router.post('/', [
    body('name')
        .isLength({ min: 1 })
        .withMessage('Please enter a name'),
    body('email')
        .isLength({ min: 1 })
        .withMessage('Please enter an email')
], (req, res) => {

    const errors = validationResult(req);
    console.log(errors.isEmpty(), 'erros is empty');
    console.log(errors, 'errors===>');
    if (errors.isEmpty()) {
        console.log(req.body, '===>body')
        const registration = new Registration(req.body);
        registration.save(function (err, success) {
            console.log(err, success);
            if (err) {
                res.send('Thank you for your registration!');
            } else {
                res.send('Thank you for your registration!');

            }

        })
        // .then(() => {
        //     res.send('Thank you for your registration!');
        // })
        //     .catch(() => {
        //         res.send('Sorry! Something went wrong.')
        //     })
    } else {
        res.render('form', {
            title: 'Registration form',
            errors: errors.array(),
            data: req.body
        })
    }

});

module.exports = router;