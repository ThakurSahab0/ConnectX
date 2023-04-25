const mongoose = require("mongoose")

const DB = process.env.DATABASE
mongoose.set("strictQuery", true);

try {
    const connect = mongoose.connect(DB)
    if (connect) {
        console.log("Mongo DB Connect Success");
    }
    else{
        console.log(error);
    }
} catch (error) {
    console.log(error);
}
