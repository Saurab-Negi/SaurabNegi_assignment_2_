const userModel= require('../models/userModel')
const fs= require('fs')

// add User details
const addUser= async (req, res) =>{
    let image_filename= `${req.file.filename}`;
    const user = new userModel({
        image: image_filename,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website,
        address: {
            street: req.body.street,
            suite: req.body.suite,
            city: req.body.city,
            zipcode: req.body.zipcode,
        },
        company: {
            name: req.body.companyName,
        }
    });

    try {
        await user.save();
        res.json({success: true, message: "User Details Added"})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// remove User details
const removeUser= async (req, res) =>{
    try{
        const user= await userModel.findById(req.body.id);
        fs.unlink(`uploads/${user.image}`, () =>{}) // To remove image from the local
        await userModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "User Details Removed"})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// fetch User details
const fetchUser= async (req, res) =>{
    try{
        const users= await userModel.find({});
        res.json({success: true, data: users})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// Update User details
const updateUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // If a new image is uploaded, remove the old one and update the path
        if (req.file) {
            fs.unlink(`uploads/${user.image}`, () => {});
            user.image = req.file.filename;
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.website = req.body.website || user.website;
        user.address.street = req.body.street || user.address.street;
        user.address.suite = req.body.suite || user.address.suite;
        user.address.city = req.body.city || user.address.city;
        user.address.zipcode = req.body.zipcode || user.address.zipcode;
        user.company.name = req.body.companyName || user.company.name;

        await user.save();

        res.json({ success: true, message: "User Details Updated", data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

module.exports= {addUser, fetchUser, removeUser, updateUser};