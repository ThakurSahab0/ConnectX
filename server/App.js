// const dotenv = require("dotenv")
// const express = require("express")
// const app = express();
// const cookieParser = require("cookie-parser")
//
//
// app.use(cookieParser())
//
// dotenv.config({ path: "./.env" });
// PORT = process.env.PORT
// require("./Connection/Connection")
//
// app.use(express.json());
// app.use(require("./Routers/router"))
//
// app.listen(PORT,()=>{
//     console.log("Server is Running on " + PORT);
// })


const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not defined
require("./Connection/Connection");

app.use(express.json());
app.use(require("./Routers/router"));

app.listen(PORT, () => {
    console.log("Server is Running on " + PORT);
});
