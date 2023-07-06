const express = require("express");
const router = express.Router();
const yup = require("yup");
const { sequelize } = require("../models/");
const { DataTypes } = require("sequelize");
const { UserAccount, AdminAccount, Sequelize } = require("../models/"); // imports the model name from models, must match waht is defined in the model
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/auth");
const nodemailermock = require('nodemailer-mock');
require('dotenv').config();

// Alan - Accont Creation
router.post("/createAccount", async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        fullName: yup.string().trim().min(3).max(100).required(),
        userName: yup.string().trim().min(3).max(50).required(),
        phoneNo: yup.number().min(80000000).max(99999999).required(),
        emailAccount: yup.string().email().required(),
        password: yup.string().min(8).max(30).required(),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.fullName = data.fullName.trim();
    data.userName = data.userName.trim();
    data.phoneNo = data.phoneNo;
    data.emailAccount = data.emailAccount.trim();
    data.password = await bcrypt.hash(data.password, 10);

    userInfo = {
        fullName: data.fullName,
        userName: data.userName,
        phoneNo: data.phoneNo,
        emailAccount: data.emailAccount,
        imageFile: "default.jpg",
        password: data.password
    }

    let userEmail = await UserAccount.findOne({
        where: { emailAccount: data.emailAccount },
    });
    if (userEmail) {
        res.status(400).json({ message: "Email already exists." });
        return;
    }

    let userPhoneNo = await UserAccount.findOne({
        where: { phoneNo: data.phoneNo },
    });
    if (userPhoneNo) {
        res.status(400).json({ message: "Phone Number already exists" });
        return;
    }

    try {
        let result = await UserAccount.create(userInfo);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json(err)
        throw err;
    }
});

// Login function
router.post("/login", async (req, res) => {
    let data = req.body;

    data.emailAccount = data.emailAccount.trim();
    data.password = data.password.trim();

    let errorMsg = "Email or password is incorrect.";

    // Finds the user account using email.
    let user = await UserAccount.findOne({
        where: { emailAccount: data.emailAccount },
    });
    if (!user) {
        res.status(400).json({ message: errorMsg });
        return;
    }

    // Checks For Whether Password Matches
    let match = await bcrypt.compare(data.password, user.password);
    if (!match) {
        res.status(400).json({ message: errorMsg });
        return;
    }

    // Checks for whether user is an admin
    let isAdmin = await AdminAccount.findOne({
        where: { emailAccount: data.emailAccount }
    });

    let userInfo = {};

    if (isAdmin) {
        console.log("Admin is found!")
        userInfo = {
            id: user.id,
            emailAccount: user.emailAccount,
            adminNo: isAdmin.adminNo
        };
        console.log(userInfo);
        console.log(user);
    } else {
        userInfo = {
            id: user.id,
            emailAccount: user.emailAccount,
            adminNo: null
        };
    }

    let accessToken = sign(userInfo, process.env.APP_SECRET);

    res.json({
        accessToken: accessToken,
        user: userInfo
    });
});

router.get("/auth", validateToken, (req, res) => {
    if (!req.user.adminNo) {
        let userInfo = {
            id: req.user.id,
            emailAccount: req.user.emailAccount,
        };
        res.json({
            user: userInfo
        });
    } else {
        let userInfo = {
            id: req.user.id,
            emailAccount: req.user.emailAccount,
            adminNo: req.user.adminNo
        };
        res.json({
            user: userInfo
        });
    }

});

// View Individual Account (User)
router.get("/viewAccount", validateToken, async (req, res) => {
    // Remember to put req then res
    let userAccount = await UserAccount.findOne({
        where: { emailAccount: req.user.emailAccount }
    });
    res.json(userAccount);
    console.log(userAccount)

    if (!userAccount) {
        res.sendStatus(404);
        return;
    }

    if (!validateToken) {
        res.sendStatus(401);
        return;
    }
});

router.get("/viewAccount/changeDetails", validateToken, async (req, res) => {
    let userAccount = req.user.emailAccount

    let userDetails = await UserAccount.findByPk(userAccount);
    // TODO: Update this from the db instead of the token

    res.json(userDetails);
})

// Edit Individual Account (User)
router.put("/viewAccount/changeDetails", validateToken, async (req, res) => {
    // TODO: Update this from the db instead of the token

    let data = req.body;
    console.log(data);

    let validationSchema = yup.object().shape({
        fullName: yup.string().trim().min(3).max(100).required(),
        userName: yup.string().trim().min(3).max(50).required(),
        phoneNo: yup.number().min(80000000).max(99999999).required(),
        emailAccount: yup.string().email().required(),
    });

    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.fullName = data.fullName.trim();
    data.userName = data.userName.trim();
    data.phoneNo = data.phoneNo;
    data.emailAccount = data.emailAccount.trim();
    data.password = req.user.password

    let userAccount = await UserAccount.update(data, {
        where: { emailAccount: req.user.emailAccount },
    });

    if (userAccount == 1) {
        res.json({
            message: "User has been successfully updated.",
        });
    } else {
        res.status(400).json({
            message: `Cannot update User with id ${userInfo.emailAccount}`,
        });
    }
});

// Deleting Individual Account (Admin only or accessible bby user?)
router.delete("/deleteUser/:id", validateToken, async (req, res) => {
    let user = req.params.id;
    
    console.log(req.user.id)
    console.log(user)

    if (req.user.id != user) {
        res.status(401).json({ message: "Unauthorised Action Taken!" });
        console.log("Unauthorised action taken.");
        return;
    };

    let findUser = UserAccount.findOne({
        where: { id: user }
    });
    if (!findUser) {
        console.log("User not found."); // Should not be happening if accessible by user.
        res.sendStatus(404);
        return;
    } else {
        let deleteUser = await UserAccount.destroy({
            where: { id: user },
        });

        if (deleteUser == 1) {
            res.json({
                message: "User was successfully deleted.",
            });
        } else {
            res.status(400).json({
                message: `Cannot delete user with id ${user}`,
            });
        }
    }
});

// Admin Creation
router.post("/createAdmin", validateToken, async (req, res) => {
    let data = req.body;

    console.log(data);

    let validationSchema = yup.object().shape({
        adminNo: yup.string().trim().min(6, "It can only be 6 characters long").max(6, "It can only be 6 characters long").required(),
        emailAccount: yup.string().email().required(),
    });

    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    let findAccount = await UserAccount.findOne({
        where: { emailAccount: data.emailAccount }
    })
    if (!findAccount) {
        res.status(400).json({ message: "Email is not found." });
        return;
    }

    let match = await AdminAccount.findOne({
        where: { emailAccount: data.emailAccount }
    })
    if (match) {
        res.status(400).json({ message: "User is already an Admin." })
        return;
    }

    let adminNoMatch = await AdminAccount.findOne({
        where: { adminNo: data.adminNo.trim() }
    })
    if (adminNoMatch) {
        res.status(400).json({ message: "User is already an Admin." })
        return;
    }

    data.emailAccount = data.emailAccount.trim();
    data.adminNo = data.adminNo.trim();

    console.log(data.emailAccount)

    try {
        let result = await AdminAccount.create(data);
        res.json(result);
    } catch (err) {
        console.log(err);
        throw err;
    }
})

router.get("/adminPanel", validateToken, async (req, res) => {
    let userInfo = {
        emailAccount: req.user.emailAccount,
        adminNo: req.user.adminNo,
    }
    // TODO: Update this from the db instead of the token

    if (!userInfo.adminNo) {
        console.log("Page Not Found!");
        res.status(404).json("Page Is Not Found.");
        return;
    }
     
    const condition = {};
    let search = req.query.search;
    if (search) {
        condition[ Sequelize.Op.or ] = [
            { id: { [ Sequelize.Op.like ]: `%${search}%` } },
            { fullName: { [ Sequelize.Op.like ]: `%${search}%` } },
            { userName: { [ Sequelize.Op.like ]: `%${search}%` } },
            { emailAccount: { [ Sequelize.Op.like ]: `%${search}%` } },
            { phoneNo: { [ Sequelize.Op.like ]: `%${search}%` } },
        ]
    }

    const allUsers = await UserAccount.findAll({
        where: condition,
        order: [ [ 'emailAccount', 'DESC' ] ],
    })

    res.json(allUsers);
})

router.put("/updatePassword", validateToken, async (req, res) => {
    let data = req.body;
    console.log(data)

    let validationSchema = yup.object().shape({
        currentPassword: yup.string().min(8).max(30).required(),
        password: yup.string().min(8).max(30).required(),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        return;
    }

    let currentUser = await UserAccount.findByPk(req.user.emailAccount);

    // data.currentPassword = await bcrypt.hash(data.currentPassword, 10);
    // console.log(data.currentPassword);
    
    // if (data.currentPassword != currentUser.password) {
    //     console.log("Wrong Password")
    //     res.status(400).json({ message: "Current password is wrong!" });
    //     return;
    // }

    let comparePasswords = await bcrypt.compare(data.currentPassword, currentUser.password);

    if (!comparePasswords) {
        console.log("Wrong Password")
        res.status(400).json({ message: "Current password is wrong!" });
        return;
    }

    data.password = await bcrypt.hash(data.password, 10);
    console.log(data.password)

    let userAccount = await UserAccount.update(data, {
        where: { emailAccount: req.user.emailAccount },
    });

    if (userAccount == 1) {
        res.json({
            message: "User has been successfully updated.",
        });
    } else {
        res.status(400).json({
            message: `Cannot update User with id ${req.user.emailAccount}`,
        });
    }
})

router.post("/forgetPassword", async (req, res) => {
    
})

module.exports = router;
