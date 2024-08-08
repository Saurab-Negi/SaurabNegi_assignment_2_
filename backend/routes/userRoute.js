const express = require('express');
const { addUser, fetchUser, removeUser, updateUser } = require('../controllers/userController');
const multer = require('multer');

const userRouter= express.Router();

// Image storage
const storage= multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) =>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload= multer({storage: storage})

userRouter.post("/add", upload.single("image"), addUser)
userRouter.get("/fetch", fetchUser)
userRouter.post("/remove", removeUser)
userRouter.post("/update", upload.single("image"), updateUser);

module.exports= userRouter;