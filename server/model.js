// server/model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MySchema = new Schema({
    field1: { type: String, required: true },
    field2: { type: Number, required: true },
    field3: { type: [String], required: true }
});
// const MyModel = mongoose.model('MyModel', MySchema);
const MyModel = mongoose.model('MyModel', MySchema, 'mycollection');
module.exports = MyModel;
