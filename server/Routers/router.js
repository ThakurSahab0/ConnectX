// const express = require("express")
// const user = require("../Schema/UserSchema")
// const bcrypt = require("bcrypt")
// const userAuth = require("../auth/userAuth")
// const router = express.Router();
//
// router.get("/userData", userAuth, (req, res) => {
//     res.send(req.rootUser)
// })
//
// router.post("/registeruser", async (req, res) => {
//     const { userName, password, phone } = req.body;
//
//     if (!userName || !password || !phone) {
//       return res.status(400).json({ message: "Please fill in all fields" });
//     }
//
//     try {
//       const alreadyUser = await user.findOne({userName});
//
//       if (alreadyUser) {
//         return res.status(401).json({ message: "Username already exists" });
//       }
//
//       const salt = await bcrypt.genSalt(10);
//       const hashPass = await bcrypt.hash(password, salt);
//
//       const newUser = new user({ userName, password: hashPass, phone });
//       await newUser.save();
//
//       res.status(200).json({ message: "User created successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });
//
// router.post("/loginuser", async (req, res) => {
//     const { userName, password } = req.body;
//
//     if (!userName || !password) {
//       return res.status(400).json({ message: "Fill All the Fields" });
//     }
//
//     try {
//       const alreadyUser = await user.findOne({ userName });
//
//       if (!alreadyUser) {
//         return res.status(404).json({ message: "User not found" });
//       }
//
//       const comparePass = await bcrypt.compare(password, alreadyUser.password);
//
//       if (!comparePass) {
//         return res.status(401).json({ message: "Invalid password" });
//       }
//
//       const token = await alreadyUser.generateAuthToken();
//       res.cookie("jwtoken", token, { httpOnly: true });
//       res.status(200).json({ message: "Login Success" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });
//
//
//
//
//
//
//
// router.get("/logoutuser", async (req, res) => {
//     res.clearCookie("jwtoken", { path: "/" });
//     // console.log("Logout");
//     res.status(200).json({ message: "User Logout" })
// })
//
// module.exports = router

const express = require("express");
const user = require("../Schema/UserSchema");
const bcrypt = require("bcrypt");
const userAuth = require("../auth/userAuth");
const router = express.Router();

router.get("/userData", userAuth, (req, res) => {
    res.send(req.rootUser);
});

router.post("/registeruser", async (req, res) => {
    const { userName, password, phone } = req.body;

    if (!userName || !password || !phone) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    try {
        const alreadyUser = await user.findOne({ userName });

        if (alreadyUser) {
            return res.status(401).json({ message: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new user({ userName, password: hashPass, phone });
        await newUser.save();

        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/loginuser", async (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: "Fill All the Fields" });
    }

    try {
        const alreadyUser = await user.findOne({ userName });

        if (!alreadyUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const comparePass = await bcrypt.compare(password, alreadyUser.password);

        if (!comparePass) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = await alreadyUser.generateAuthToken();
        res.cookie("jwtoken", token, { httpOnly: true });
        res.status(200).json({ message: "Login Success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/logoutuser", async (req, res) => {
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).json({ message: "User Logout" });
});

module.exports = router;
