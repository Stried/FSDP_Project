console.time("Trial Routes")
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
        data.carImageFile = carModel.carImageFile
        let modelCheck= await TrialCar.findOne({
            where: {name: data.name}
        });
        if (modelCheck){
            res.status(400).json({message: `Trial Car Model "${data.name}" already exists! `})
            return;
        }
    } catch (err) {
        console.log(err);
        return;
    }

    let result = await TrialCar.create(data);
    res.json(result);

});

router.get("/viewTrialCar", async (req, res) => {
    const condition = {};
    let search = req.query.search;
    if (search) {
        condition[ Sequelize.Op.or ] = [
            { name: { [ Sequelize.Op.like ]: `%${search}%` } },
            { address: { [ Sequelize.Op.like ]: `%${search}%` } },
            { carBrand: { [ Sequelize.Op.like ]: `%${search}%` } },
            { carPlateNo: { [ Sequelize.Op.like ]: `%${search}%` } },
        ]
    }

    const leTrialCar = await TrialCar.findAll({
        where: condition,
        order: [ [ 'createdAt', 'DESC' ] ],
    })


    res.json(leTrialCar);
});

router.get("/userview/viewTrialCar", async (req, res) => {
    const condition = {};
    let search = req.query.search;
    if (search) {
        condition[ Sequelize.Op.or ] = [
            { name: { [ Sequelize.Op.like ]: `%${search}%` } },
            { address: { [ Sequelize.Op.like ]: `%${search}%` } },
            { carBrand: { [ Sequelize.Op.like ]: `%${search}%` } },
        ]
    }

    const leTrialCar = await TrialCar.findAll({
        where: condition,
        order: [ [ 'createdAt', 'DESC' ] ],
    })


    res.json(leTrialCar);
});

router.get("/viewTrialCar/:id", async (req, res) => {
    const trialCar = req.params.id;
    const leTrialCar = await Store.findOne({
        where: {carPlateNo: trialCar},
    })
    if (leTrialCar) {
        // Check if the trial car exists
        res.json(leTrialCar);
      } else {
        res.status(404).json({ error: "Trial car not found" });
      }
});


router.get("/viewSpecificTrialCar/:id", async(req, res) => {
    const trialCar = req.params.id
    const TheTrialCar = await TrialCar.findOne({
        where: {CarPlateNo:trialCar},
    })
    res.json(TheTrialCar)
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
            message: "Car has been successfully updated.",
        });
    } else {
        res.status(400).json({
            message: `could not update Car with id ${trialcar}`,
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
            message: `Cannot delete trial car with carPlateNo ${carplateNo}.`
        });
    }
});

router.post("/createTrialReceipt/:model", validateToken, async (req, res) => {
    const model = req.params.model;
    const TheTrialCar = await TrialCar.findOne({
        where: {carPlateNo:model},
    })

    let data = req.body;
    let validationSchema = yup.object().shape({
        dateOfTrial: yup.date().required().transform((value, originalValue) => {
            return originalValue ? new Date(originalValue) : value;
        }).typeError("Invalid date format. Please provide a valid date in YYYY-MM-DD HH:mm:ss format."),
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    let dateandcarcheck = await TrialReceipt.findOne({
        where: [{ dateOfTrial: data.dateOfTrial }, {modelName: TheTrialCar.name} ]
    });
    if (dateandcarcheck) {
        res.status(400).json({ message: "Trial Car already booked at that time!" })
        return;
    }

    data.dateOfTrial = data.dateOfTrial;
    data.modelName = TheTrialCar.name;
    data.trialReport = "";
    data.faultResolve = "Resolved";
    data.trialStatus = "Booked";
    data.emailAccount = req.user.emailAccount;
    data.ratings=0;

    let result = await TrialReceipt.create(data);
    res.json(result);

});

router.get("/viewUserTrialReceipt", validateToken, async (req, res) => {
    const userInfo = req.user;
    const userTrialReceipt = await TrialReceipt.findAll({
        where: { emailAccount: userInfo.emailAccount },
        order: [ [ 'createdAt', 'DESC' ] ],
    })

    res.json(userTrialReceipt);
});

router.get("/viewTrialCarReceipt/:model", validateToken, async (req, res) => {
    try {
      const trialReceiptModel = req.params.model; // Use 'model' instead of 'id'
      const thetrialcar = await TrialCar.findOne({
        where: { carPlateNo: trialReceiptModel },
      });
  
      if (!thetrialcar) {
        // If no matching TrialCar is found, return a 404 response or an appropriate error status
        return res.status(404).json({ message: "TrialCar not found" });
      }
  
      const userTrialReceipt = await TrialReceipt.findAll({
        where: { modelName: thetrialcar.name },
        order: [['createdAt', 'DESC']],
      });
  
      res.json(userTrialReceipt);
    } catch (error) {
      console.error(error);
      // Handle any unexpected errors and return an error response
      res.status(500).json({ message: "Server Error" });
    }
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
        ]
    }

    const allReceipts = await TrialReceipt.findAll({
        where: condition,
        order: [ [ 'createdAt', 'DESC' ] ],
    })

    res.json(allReceipts);

});

router.get("/getAllTrialReceiptRatings", validateToken, async (req, res) => {

    const allReceipts = await TrialReceipt.findAll({
        where: {
            ratings: {
                [Sequelize.Op.not]: null
            }
        }
    });

    res.json(allReceipts);
});

router.get("/viewSpecificTrialReceipt/:id", async(req, res) => {
    const trialReceipt = req.params.id
    const TheTrialReceipt = await TrialReceipt.findOne({
        where: {trialReceiptId:trialReceipt},
    })
    res.json(TheTrialReceipt)
});

router.put("/viewAllTrialReceipt/changeDetails/:id", validateToken, async (req, res) => {
    let receipt = req.params.id;

    if (!req.user.adminNo) {
        console.log("Page Not Found!");
        res.status(404).json("Page Is Not Found.");
        return;
    }

    let data = req.body;
    let validationSchema = yup.object().shape({
        trialReport: yup.string().trim().max(1000),
        faultResolve: yup.string(),
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


router.put("/viewSpecificTrialReceipt/addRating/:id", validateToken, async (req, res) => {
    let receipt = req.params.id;

    let data = req.body;
    let validationSchema = yup.object().shape({
        ratings: yup.number().required(),
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
            message: "Rating has been successfuly given.",
        });
    } else {
        res.status(400).json({
            message: `could not give rating to Receipt with id ${receipt}`,
        });
    }

});

router.delete("/trialreceipt/:trialReceiptId", async (req, res) => {
    let thereceiptID = req.params.trialReceiptId;
    let num = await TrialReceipt.destroy({
        where: { trialReceiptId: thereceiptID }
    })
    if (num == 1) {
        res.json({
            message: "trial receipt was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete trial receipt with ID ${thereceiptID}.`
        });
    }
    
});

module.exports = router
console.timeEnd("Trial Routes")