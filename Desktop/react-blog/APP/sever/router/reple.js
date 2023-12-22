const express = require("express");
const router = express.Router();

const { Post } = require("../model/Post.js");
const { Reple } = require("../model/Reple.js");
const { User } = require("../model/User.js");

router.post("/submit", async (req, res) => {
    let temp = {
        reple: req.body.reple,
        postId: req.body.postId,
    };

    try {
        const userInfo = await User.findOne({ uid: req.body.uid }).exec();
        temp.author = userInfo._id;
        const NewReple = new Reple(temp);
        await NewReple.save();

        await Post.findOneAndUpdate(
            { _id: req.body.postId },
            { $inc: { repleNum: 1 } }
        ).exec();

        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false });
    }
});

router.post("/getReple", (req, res) => {
    Reple.find({ postId: req.body.postId })
        .populate("author")
        .exec()
        .then((repleInfo) => {
            return res.status(200).json({ success: true, repleList: repleInfo })
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({ success: false })
        })
})

router.post("/edit", (req, res) => {
    let temp = {
        postId: req.body.postId,
        reple: req.body.reple,
        uid: req.body.uid,
    }
    Reple.findOneAndUpdate({ _id: req.body.repleId }, { $set: temp })
        .exec()
        .then(() => {
            return res.status(200).json({ success: true })
        })
        .catch((err) => {
            return res.status(400).json({ success: false })
        })
})

router.post("/delete", (req, res) => {
    Reple.deleteOne({ _id: req.body.repleId })
        .exec()
        .then(() => {
            Post.findOneAndUpdate(
                {
                    _id: req.body.postId
                },
                { $inc: { repleNum: -1 } }
            )
                .exec()
                .then(() => {
                    return res.status(200).json({ success: true })
                })
        })
        .catch((err) => {
            return res.status(400).json({ success: false })
        })
})


module.exports = router;