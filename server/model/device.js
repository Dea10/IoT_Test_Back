const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let deviceSchema = new Schema({
    type: {
        type: String,
        required: [true, 'type required']
    },
    label: {
        type: String,
        required: [true, 'label required']
    }
});

deviceSchema.methods.toJSON = function() {
    let device = this;
    let deviceObject = device.toObject();

    return deviceObject;
}

deviceSchema.plugin(uniqueValidator, {message: '{PATH} already used'});

module.exports = mongoose.model('Device', deviceSchema);