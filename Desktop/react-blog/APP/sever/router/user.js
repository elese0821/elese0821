const express = require("express");
const router = express.Router();

const { User } = require("../model/User.js");
const { Counter } = require("../model/Counter.js");

const setUpload = require("../util/upload.js");

router.post("/join", (req, res) => {
    let temp = req.body;

    Counter.findOne({ name: "counter" })
        .then((result) => {
            temp.userNum = result.userNum;

            const userData = new User(temp);
            userData.save().then(() => {
                Counter.updateOne({ name: "counter" }, { $inc: { userNum: 1 } }).then(() => {
                    res.status(200).json({ success: true })
                })
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
});

router.post("/namecheck", (req, res) => {
    User.findOne({ displayName: req.body.displayName })
        .exec()
        .then((result) => {
            let check = true;
            if (result) {
                check = false;
            }
            res.status(200).json({ success: true, check })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
})

router.post("/profile/img", setUpload("react-blog1/user"), (req, res, next) => {
    res.status(200).json({ success: true, filePath: res.req.file.location })
})

router.post("/profile/update", (req, res) => {
    let temp = {
        photoURL: req.body.photoURL,
    }

    User.updateOne({ uid: req.body.uid }, { $set: temp })
        .exec()
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
        })
})

module.exports = router;