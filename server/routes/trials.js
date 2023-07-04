const express = require("express");
const router = express.Router();
const yup = require("yup");
const { UserAccount, Store, TrialCar, TrialReceipt, Sequelize } = require("../models/");
const { validateToken } = require("../middlewares/auth");

router.post("/createTrialCar", async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        carPlateNo: yup.string().trim().min(3).required(),
        address: yup.string().trim().min(3).required(),
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    
    data.carPlateNo = data.carPlateNo.trim();
    data.address = data.address.trim();

    let carPlateCheck = await Store.findByPk(data.carPlateNo);
    if (!carPlateCheck) {
        res.status(400).json({ message: "Carplate Number not found!" })
        return;
    }

    let carPlateRepeatCheck = await TrialCar.findOne({
        where: { carPlateNo: data.carPlateNo }
    });
    if (carPlateRepeatCheck) {
        res.status(400).json({ message: "Trial Car already exists!" })
        return;
    }

    try {
        let carModel = await Store.findByPk(data.carPlateNo);
        data.name = carModel.carModel
        data.carBrand = carModel.carBrand; // carSpeed = carModel.carSpeed
    } catch (err) {
        console.log(err);
        return;
    }

    let result = await TrialCar.create(data);
    res.json(result);

});

router.post("/createTrialReceipt", async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        dateOfTrial: yup.date().required(),
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    data.dateOfTrial = data.dateOfTrial.trim();
    let result = await TrialReceipt.create(data);
    res.json(result);

});

router.get("/viewTrialCar", async (req, res) => {
    const leTrialCar = await TrialCar.findAll({
        where: { },
    })

    res.json(leTrialCar);
});

router.get("/viewTrialCar/:id", async (req, res) => {
    const trialCar = req.params.id
    const leTrialCar = await TrialCar.findAll({
        where: {carPlateNo: trialCar},
    })

    console.log(trialCar);
    console.log(leTrialCar);

    res.json(leTrialCar);
});

router.put("/updateTrialCar/changeDetails/:id", validateToken, async (req, res) => {
    let trialcar = req.params.id;
    // let userInfo = {
    //     id: req.user.id,
    //     fullName: req.user.fullName,
    //     userName: req.user.userName,
    //     emailAccount: req.user.emailAccount,
    //     phoneNo: req.user.phoneNo
    // };

    // if (!userInfo.adminNo) {
    //     console.log("Page Not Found!");
    //     res.status(404).json("Page Is Not Found.");
    //     return;
    // }
    let data = req.body;
    let validationSchema = yup.object().shape({
        address: yup.string().trim().min(3).max(100),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    let trialCar = await TrialCar.update(data, {
        where: { carPlateNo: trialcar },
    });

    if (trialCar == 1) {
        res.json({
            message: "Receipt has been successfully updated.",
        });
    } else {
        res.status(400).json({
            message: `could not update Receipt with id ${trialcar}`,
        });
    }
});

router.delete("/:carPlateNo", async (req, res) => {
    let carplateNo = req.params.carPlateNo;
    let num = await TrialCar.destroy({
        where: { carPlateNo: carplateNo }
    })
    if (num == 1) {
        res.json({
            message: "trial car was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete trial car with carPlateNo ${carPlateNo}.`
        });
    }
});

router.get("/viewTrialReceipt", validateToken, async (req, res) => {
    const userInfo = req.user;
    const userTrialReceipt = await TrialReceipt.findAll({
        where: { emailAccount: userInfo.emailAccount },
        order: [ [ 'createdAt', 'DESC' ] ],
    })

    res.json(userTrialReceipt);
});

router.get("/viewAllTrialReceipt", validateToken, async (req, res) => {
    if (!req.user.adminNo) {
        console.log("Page Not Found!");
        res.status(404).json("Page Is Not Found.");
        return;
    };

    const condition = {};
    let search = req.query.search;
    if (search) {
        condition[ Sequelize.Op.or ] = [
            { trialReceiptId: { [ Sequelize.Op.like ]: `%${search}%` } },
            { dateOfTrial: { [ Sequelize.Op.like ]: `%${search}%` } },
            { modelName: { [ Sequelize.Op.like ]: `%${search}%` } },
            { carPlateNo: { [ Sequelize.Op.like ]: `%${search}` } },
        ]
    }

    const allReceipts = await TrialReceipt.findAll({
        where: condition,
        order: [ [ 'createdAt', 'DESC' ] ],
    })

    res.json(allReceipts);

});
router.put("/viewAllTrialReceipt/changeDetails/:id", validateToken, async (req, res) => {
    let receipt = req.params.id;
    let userInfo = {
        id: req.user.id,
        fullName: req.user.fullName,
        userName: req.user.userName,
        emailAccount: req.user.emailAccount,
        phoneNo: req.user.phoneNo
    };

    if (!userInfo.adminNo) {
        console.log("Page Not Found!");
        res.status(404).json("Page Is Not Found.");
        return;
    }
    let data = req.body;
    let validationSchema = yup.object().shape({
        dateOfTrial: yup.date().required(),
        trialReport: yup.string().trim().min(5).max(1000),
        faultResolve: yup.boolean().required(),
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    let trialReceipt = await TrialReceipt.update(data, {
        where: { trialReceiptId: receipt },
    });

    if (trialReceipt == 1) {
        res.json({
            message: "Receipt has been successfully updated.",
        });
    } else {
        res.status(400).json({
            message: `could not update Receipt with id ${receipt}`,
        });
    }

});

module.exports = router