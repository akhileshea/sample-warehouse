const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    art_id: {
        type: String,
        required: true,
        unique: true,
        index:true
    },
    name: {
        type: String,
        required: true,
    },
    stock: {
        type: String,
        required: true
    },
    _id: {
        type:String
    }
}, {
    timestamps: true
});

var Items = mongoose.model('Item',itemSchema);

module.exports = Items; 