console.time("User Routes")
const express = require("express");
const router = express.Router();
const yup = require("yup");
const { sequelize } = require("../models/");
const { DataTypes } = require("sequelize");
const { UserAccount, AdminAccount, UserFollower, Store, Sequelize } = require("../models/"); // imports the model name from models, must match waht is defined in the model
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/auth");
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
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
        res.status(400).json({ message: "Phone Number already exists." });
        return;
    }

    let userName = await UserAccount.findOne({
        where: { userName: data.userName }
    });
    if (userName) {
        res.status(400).json({ message: "Username already exists." })
        return;
    }

    let fullName = await UserAccount.findOne({
        where: { fullName: data.fullName }
    });
    if (fullName) {
        res.status(400).json({ message: "Fullname already exists." })
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

    let currentUser = await UserAccount.findByPk(req.user.emailAccount);

    let checkUsername = await UserAccount.findOne({
        where: { userName: data.userName }
    });
    if (checkUsername && data.userName != currentUser.userName) {
        res.status(400).json({ message: "Username already exists." })
        return;
    }

    let checkUserPhone = await UserAccount.findOne({
        where: { phoneNo: data.phoneNo }
    });
    if (checkUserPhone && data.phoneNo != currentUser.phoneNo) {
        res.status(400).json({ message: "Phone Number already exists." });
        return;
    };

    let checkUserEmail = await UserAccount.findOne({
        where: { emailAccount: data.emailAccount }
    });
    if (checkUserEmail && data.emailAccount !== currentUser.emailAccount) {
        res.status(400).json({ message: "Email Account already exists." });
        return;
    };

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

router.put("/admin/updateUser/:id", validateToken, async (req, res) => {
    let data = req.body;
    let id = req.params.id

    let currentUser = await UserAccount.findOne({
        where: { id: id }
    })

    if (req.user.adminNo) {
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

        let checkUsername = await UserAccount.findOne({
            where: { userName: data.userName }
        });
        if (checkUsername && data.userName != currentUser.userName) {
            res.status(400).json({ message: "Username already exists." })
            return;
        }

        let checkUserPhone = await UserAccount.findOne({
            where: { phoneNo: data.phoneNo }
        });
        if (checkUserPhone && data.phoneNo !== currentUser.phoneNo) {
            res.status(400).json({ message: "Phone Number already exists." });
            return;
        };

        let checkUserEmail = await UserAccount.findOne({
            where: { emailAccount: data.emailAccount }
        });
        if (checkUserEmail && data.emailAccount !== currentUser.emailAccount) {
            res.status(400).json({ message: "Email Account already exists." });
            return;
        };

        let updateUser = await UserAccount.update(data, {
            where: { id: id }
        });

        if (updateUser == 1) {
            res.json({ message: "User successfully updated." });
        } else {
            res.status(400).json({ message: "User update failed." });
        }
    } else {
        res.status(401).json({message: "Unknown route."})
    }


})

router.delete("/admin/deleteUser/:id", validateToken, async (req, res) => {
    // let data = req.body;
    let id = req.params.id;

    // let admin = await UserAccount.findOne({
    //     where: { emailAccount: req.user.emailAccount }
    // })

    // let checkPassword = await bcrypt.compare(data.password, admin.password);
    // if (!checkPassword) {
    //     res.status(400).json({ message: "Wrong password. Please try again." });
    //     return;
    // };

    let deleteAccount = await UserAccount.destroy({
        where: { id: id }
    });
    if (deleteAccount == 1) {
        res.json({message: "User successfully deleted."})
    } else {
        res.status(400).json({ message: "User deletion failed." });
        return;
    }

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
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ecolife.usertest@gmail.com",
            pass: "pkgasnfsumpudfik"
        }
    });

    let data = req.body;

    let validationSchema = yup.object().shape({
        emailAccount: yup.string().email().required(),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    let findAccount = await UserAccount.findByPk(data.emailAccount);
    if (!findAccount) {
        res.status(400).json({ message: "Email account not found!" });
    }

    let user = {
        emailAccount: findAccount.emailAccount
    }

    tempToken = sign(user, process.env.APP_SECRET);
    let content = `Hey there! It seems you have forgotten your password!\nPlease click this link http://localhost:3000/user/resetPassword?token=${tempToken} !`

    let emailContent = {
        from: 'ecolife.userTest@gmail.com',
        to: 'ecolife.userTest@gmail.com',
        subject: 'Forget Password',
        text: content
    }

    transport.sendMail(emailContent, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log('Email Sent Correctly!')
            res.json({sentEmail: "An email has been successfully sent!"})
        }
    });
    // request for user email account
    // sign user into the token
    // generate a OTP?
})

router.get("/resetPassword", async (req, res) => {
    let token = req.query.token;

    try {
        let verifyToken = verify(token, process.env.APP_SECRET);
    } catch (err) {
        res.status(400).json({ message: "Invalid Token." });
        return;
    }

    console.log("Success")
    res.json(token);
})

router.put("/resetPassword", async (req, res) => {
    let data = req.body;
    let token = req.query.token;
    let userEmail = "";

    console.log(data)
    try {
        const checkToken = verify(token, process.env.APP_SECRET);
        userEmail = checkToken.emailAccount;
    } catch (err) {
        console.log(err);
        res.json(400).status({ message: "An error has occured." })
    }

    let validationSchema = yup.object().shape({
        password: yup.string().min(8).max(30).required(),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Password is required!" })
        return;
    }

    data.password = await bcrypt.hash(data.password, 10);

    console.log(userEmail);
    let userAccount = await UserAccount.update(data, {
        where: {emailAccount: userEmail}
    })
    if (!userAccount) {
        console.log("No such Email found!");
    }

    if (userAccount == 1) {
        res.json({
            message: "User has been successfully updated.",
        });
    } else {
        res.status(400).json({
            message: `Cannot update User with id ${userEmail}`,
        });
    }
})

router.get("/:username", async (req, res) => {
    const username = req.params.username;

    let findAccount = await UserAccount.findOne({
        where: { username: username }
    })

    res.json(findAccount);
})

router.get("/viewAccount/carListing", validateToken, async (req, res) => {
    try {
        let userListing = await Store.findAll({
            where: { emailAccount: req.user.emailAccount }
        });

        res.json(userListing);
    } catch (err) {
        console.log(err);
    }
})

router.get("/viewAccount/carListing/:username", async (req, res) => {
    try {
        let findAccount = await UserAccount.findOne({
            where: { userName: req.params.username }
        })
        if (!findAccount) {
            res.sendStatus(404);
            return;
        }

        let userListing = await Store.findAll({
            where: { emailAccount: findAccount.emailAccount }
        });

        console.log(userListing)
        res.json(userListing);
    } catch (err) {
        console.log(err);
    }
})

router.get("/follow/:username", validateToken, async (req, res) => {
    let checkFollowUser = req.params.username;

    let checkFollowUserDetails = await UserAccount.findOne({
        where: { userName: checkFollowUser }
    })
    if (!checkFollowUserDetails) {
        res.sendStatus(404);
        return;
    }

    let checkFollow = await UserFollower.findOne({
        where: [ { followedUserEmail: checkFollowUserDetails.emailAccount }, { emailAccount: req.user.emailAccount } ]
    })

    if (checkFollow) {
        res.json("Followed");
    } else {
        res.json(null);
    }
})

router.post("/follow/:username", validateToken, async (req, res) => {
    let data = req.body;
    let followUser = req.params.username;

    let toFollow = await UserAccount.findOne({
        where: { userName: followUser }
    });

    if (!toFollow) {
        res.status(400).json({message: "No such user to follow."})
    }

    if (toFollow.emailAccount === req.user.emailAccount) {
        res.status(400).json({ message: "You can't follow yourself." });
        return;
    }

    data.followedUserEmail = toFollow.emailAccount;
    data.emailAccount = req.user.emailAccount

    try {
        let result = await UserFollower.create(data);
        res.json(result);
    } catch (err) {
        console.log(err);
        throw err;
    }
})

router.delete("/unfollow/:username", validateToken, async (req, res) => {
    let unfollowUser = req.params.username;
    
    let toUnfollow = await UserAccount.findOne({
        where: { userName: unfollowUser }
    });

    let removeFollow = await UserFollower.destroy({
        where: [ { followedUserEmail: toUnfollow.emailAccount }, { emailAccount: req.user.emailAccount } ]
    });

    if (removeFollow == 1) {
        res.json({
            message: "User was successfully deleted.",
        });
    } else {
        res.status(400).json({
            message: `Cannot delete user with id ${user}`,
        });
    }
})

router.get("/viewAccount/allFollowers", validateToken, async (req, res) => {
    let allFollowers = await UserFollower.findAll({
        where: { followedUserEmail: req.user.emailAccount }
    });

    const emailAccounts = allFollowers.map((followers) => followers.emailAccount);

    let allUsers = await UserAccount.findAll({
        where: { emailAccount: emailAccounts }
    });

    try {
        res.json(allUsers);
    } catch (err) {
        console.log("Followers failed loading.");
        console.log(err);
    }
    
})

router.get("/viewAccount/allFollowers/:username", validateToken, async (req, res) => {
    let theUser = await UserAccount.findOne({
        where: { userName: req.params.username }
    })
    if (!theUser) {
        res.sendStatus(404);
        return;
    }

    let allFollowers = await UserFollower.findAll({
        where: { followedUserEmail: theUser.emailAccount }
    });

    const emailAccounts = allFollowers.map((followers) => followers.emailAccount);

    let allUsers = await UserAccount.findAll({
        where: { emailAccount: emailAccounts }
    });

    try {
        res.json(allUsers);
    } catch (err) {
        console.log("Followers failed loading.");
        console.log(err);
    }
})

module.exports = router;
console.timeEnd("User Routes")