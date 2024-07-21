const user = require("../model/userModel");
const brcypt = require("bcrypt");
const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await user.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "Username Is Already Used", status: false });
        }
        const emailCheck = await user.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "Email Is Already Used", status: false });
        }
        const hashedPassword = await brcypt.hash(password, 10);
        const newUser = await user.create({
            username,
            email,
            password: hashedPassword
        });
        delete user.password;
        return res.json({ status: true, newUser });
    } catch (error) {
        next(error);
    }
}
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const newUser = await user.findOne({ username });
        if (!newUser) {
            return res.json({ msg: "username or password is incorrect", status: false });
        }
        const isPasswordValid = await brcypt.compare(password, newUser.password);
        if (!isPasswordValid) {
            return res.json({ msg: "username or password is incorrect", status: false });
        }
        delete newUser.password;
        return res.json({ status: true, newUser });
    } catch (error) {
        next(error);
    }
}
const setAvatar = async (req, res, next) => {
    try {
        const { selectedAvatar, userId } = req.body;
        const userData = await user.findByIdAndUpdate(userId, {
            isAvatarImage: true,
            avatarImage: selectedAvatar
        });
        return res.json({ isSet: userData.isAvatarImage, image: userData.avatarImage });
    } catch (error) {
        next(error);
    }
}
const getAllUsers = async (req, res, next) => {
    const userId = req.params.id;
    const userData = await user.find({ _id: { $ne: req.params.id } });
    return res.json(userData);
}
const logout = async (req, res, next) => {
    try {
        const userData = await user.find({ _id: req.params.id });
        if (userData) {
            return res.json({ status: 200 });
        } else {
            return res.json({ status: false });
        }
    } catch (error) {
        next(error);
    }

}
module.exports = { register, login, setAvatar, getAllUsers, logout };