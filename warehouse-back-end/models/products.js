const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    stock: {
        type: Number
    },
    price: {
        type:Number
    },
    contain_articles:[{
        art_id: {
            type: String,
            ref: 'Item'
        },
        amount_of: {
            type: String,
        }
    }]
}, {
    timestamps: true
});

var Products = mongoose.model('Product',productSchema);

module.exports = Products; 