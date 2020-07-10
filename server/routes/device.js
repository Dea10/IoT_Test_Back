const express = require('express');
const _ = require('underscore');
const Device = require('../model/device');
const app = express();

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.get('/device', function (req, res, next) {

    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    Device.find({}, 'id label type')
        .exec((err, devices) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            Device.countDocuments({}, (err, count) => {
                
                res.json({
                    ok: true,
                    devices,
                    count
                })
            })

        })
})

app.post('/device', function (req, res, next) {
    let body = req.body

    let device = new Device({
        id: body.id,
        type: body.type,
        label: body.label
    });

    device.save((err, deviceDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            device: deviceDB
        })
    });
})

// app.put('/user/:id', function (req, res) {
//     let id = req.params.id;
//     let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

//     User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

//         if (err) {
//             res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }

//         res.json({
//             ok: true,
//             user: userDB
//         })
//     });
// })

app.delete('/device/:id', function (req, res) {
    
    let id = req.params.id;

    Device.findByIdAndDelete(id, (err, deletedDevice) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            deletedDevice: deletedDevice
        })
    })
})

module.exports = app;