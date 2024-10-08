const messageModel = require("../model/messageModel");
const addMessages = async (req, res, next) => {
    // console.log(req.body);
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: {
                text: message
            },
            users: [from, to],
            sender: from
        });
        if (data) {
            return res.json({ msg: "Message Added Successfully", status: true });
        } else {
            return res.json({ msg: "Message is not added!!", status: false })
        }
    } catch (error) {
        next(error)
    }
}
const getAllMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;

        const messages = await messageModel.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
}
module.exports = { addMessages, getAllMessages };