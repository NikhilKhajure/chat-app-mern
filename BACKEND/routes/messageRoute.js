const { addMessages, getAllMessages } = require("../controlers/messageControlers");

const router = require("express").Router();
router.post("/addmessages", addMessages);
router.post("/getmessages", getAllMessages);
module.exports = router;