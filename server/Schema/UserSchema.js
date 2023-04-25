const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    phone: Number,

})


userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        return token
    } catch (error) {
        console.log(error);
    }
}

const user = mongoose.model("user", userSchema)
module.exports = user