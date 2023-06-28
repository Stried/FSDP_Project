const express = require("express");
const router = express.Router();
const yup = require("yup");
const { UserAccount, Store, TrialCar, TrialReceipt,  Sequelize } = require("../models/");
const { validateToken } = require("../middlewares/auth");

router.post("/createTrialCar", async(req, res)=>{
let data =req.body;
let validationSchema=yup.object().shape({
    modelName: yup.string().trim().max(8).required(),
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
data.modelName=data.modelName.trim();

let result= await TrialCar.create(data);
res.json(result);

});

router.post("/createTrialReceipt", async(req, res)=>{
    let data =req.body;
    let validationSchema=yup.object().shape({
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
    data.dateOfTrial=data.dateOfTrial.trim();
    let result= await TrialReceipt.create(data);
    res.json(result);
    
    });

router.get("/viewTrialCar", async(req, res)=>{

    const allTrialCars = await Store.findAll({
        where: {carPlateNo}, //TODO: Solve this
        order: [ [ 'carPlateNo', 'DESC' ] ],
    })
});

router.get("/viewTrialReceipt", validateToken, async(req, res)=>{
const userInfo = req.user;
const userTrialReceipt=await TrialReceipt.findAll({
    where:{emailAccount: userInfo.emailAccount},
    order:[ ['createdAt','DESC'] ],
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
            { modelName: {[Sequelize.Op.like]: `%${search}%`}},
            { carPlateNo:{[Sequelize.Op.like]: `%${search}`}},
        ]
    }

    const allReceipts = await TrialReceipt.findAll({
        where: condition,
        order: [ [ 'createdAt', 'DESC' ] ],
    })

    res.json(allReceipts);
    
});
router.put("/viewAllTrialReceipt/changeDetails/:id", validateToken, async(req, res)=>{
    let receipt=req.params.id;
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

if (trialReceipt==1){
    res.json({
        message: "Receipt has been successfully updated.",
    });
}else {
    res.status(400).json({
        message: `could not update Receipt with id ${receipt}`,
    });
}

});

module.exports=router