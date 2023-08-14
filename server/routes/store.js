console.time("Store Routes")
const express = require('express');
const router = express.Router();
const { UserAccount, Store, StoreReceipt, Sequelize } = require('../models');
const { validateToken } = require("../middlewares/auth");
const yup = require("yup");
const { Op } = require('sequelize');

router.post("/createStoreItem", validateToken, async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        carPlateNo: yup.string().trim().min(8, "Car Plate cannot be less than 8").max(8, "Car Plate cannot be more than 8").required("Car Plate cannot be empty"),
        carDescription: yup.string().trim().min(20, "Car Description cannot be less than 20 characters").required("Car Description cannot be empty"),
        carPrice: yup.number().integer().min(10000, "Price must be minimum of $10,000").required("Price cannot be empty"),
        carBrand: yup.string().trim().min(5, "Brand cannot be less than 5 characters").required("Brand cannot be empty"),
        carModel: yup.string().trim().min(5, "Model cannot be less than 5 characters").required("Model cannot be empty"),
        carEngine: yup.string().trim().min(5, "Engine cannot be less than 5 characters").required("Engine cannot be empty"),
        carSpeed: yup.number().integer().min(50, "Speed cannot be less than 50").required("Speed cannot be empty"),
        carFuelType: yup.string().required("Fuel Type cannot be empty"),
        carFuelConsume: yup.number().integer().min(1, "Fuel Consumption cannot be less than 0").required("Fuel Consumption cannot be empty"),
        carProductionDate: yup.date().min("1900-01-01", "Production Date cannot be before 1923").required("Production Date cannot be empty"),
        carBodyType: yup.string().trim().min(5, "Body Type cannot be less than 5 characters").required("Body Type cannot be empty"),
        carColor: yup.string().trim().min(2, "Color cannot be less than 2 characters").required("Color cannot be empty"),
        carSeats: yup.number().integer().min(1, "The minimum seat is 1").required("Seats cannot be empty"),
        carLength: yup.number().integer().min(1000, "The minimum car length is 1000mm").required("Length cannot be empty"),
        carWidth: yup.number().integer().min(1000, "The minimum car width is 1000mm").required("Width cannot be empty"),
        carHeight: yup.number().integer().min(1000, "The minimum car height is 1000mm").required("Height cannot be empty"),
        carMods: yup.string()
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.carPlateNo = data.carPlateNo.trim();
    data.carDescription = data.carDescription.trim();
    data.carBrand = data.carBrand.trim();
    data.carModel = data.carModel.trim();
    data.carEngine = data.carEngine.trim();
    data.carFuelType = data.carFuelType.trim();
    data.carBodyType = data.carBodyType.trim();
    data.carMods = data.carMods.trim();

    data.emailAccount = req.user.emailAccount;
    let user = await UserAccount.findByPk(data.emailAccount, { attributes: ['fullName'] });
    let fullName = user.fullName;

    data.soldBy = fullName;
    let result = await Store.create(data);
    res.json(result);
});

router.post("/createStoreReceipt", validateToken, async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        carPlate: yup.string().required(),
        cardNumber: yup.string().min(16, "Card Number cannot be more than 16").max(16, "Card Number cannot be more than 16").required("Card Number cannot be empty"),
        cardHolderName: yup.string().required("Card Holder Name cannot be empty"),
        cardExpiryMonth: yup.number().min(1, "Month of Expiry cannot be less than 2 characters").max(12, "Month of Expiry cannot be more than 12").required("Month of Expiry cannot be empty"),
        cardExpiryYear: yup.number().min(24, "Year of Expiry cannot be before 2024").max(99, "Year of Expiry cannot be more than 2 characters").required("Year of Expiry cannot be empty"),
        cvc: yup.number().test("is-three-digit", "Security Code must be a 3-digit number.", (value) => value.toString().length === 3).required("Security Code cannot be empty"),
        userAddress: yup.string().required("Address cannot be empty"),
        userCity: yup.string().required("City cannot be empty"),
        userZipCode: yup.number().test("is-six-digit", "Postal or Zip Code must be a 6-digit number.", (value) => value.toString().length === 6).required("Postal or Zip Code cannot be empty")
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.cardHolderName = data.cardHolderName.trim();
    data.carPlate = data.carPlate.trim()

    data.emailAccount = req.user.emailAccount;
    data.userEmailAccount = req.user.emailAccount;
    let user = await UserAccount.findByPk(data.emailAccount, { attributes: ['fullName', 'phoneNo'] });
    let fullName = user.fullName;
    let phoneNo = user.phoneNo;

    data.boughtBy = fullName;
    data.userPhoneNo = phoneNo;

    let car = await Store.findByPk(data.carPlate);
    data.carPlate = car.carPlateNo;
    data.carBrand = car.carBrand;
    data.carModel = car.carModel;
    data.price = car.carPrice;
    data.carImageFile = car.carImageFile;

    let result = await StoreReceipt.create(data);
    res.json(result);
});

router.get("/viewStore", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { carPlateNo: { [Sequelize.Op.like]: `%${search}%` } },
            { carDescription: { [Sequelize.Op.like]: `%${search}%` } },
            { carPrice: { [Sequelize.Op.like]: `%${search}%` } },
            { carBrand: { [Sequelize.Op.like]: `%${search}%` } },
            { carModel: { [Sequelize.Op.like]: `%${search}%` } },
            { carEngine: { [Sequelize.Op.like]: `%${search}%` } },
            { carSpeed: { [Sequelize.Op.like]: `%${search}%` } },
            { carFuelType: { [Sequelize.Op.like]: `%${search}%` } },
            { carFuelConsume: { [Sequelize.Op.like]: `%${search}%` } },
            { carProductionDate: { [Sequelize.Op.like]: `%${search}%` } },
            { carBodyType: { [Sequelize.Op.like]: `%${search}%` } },
            { carColor: { [Sequelize.Op.like]: `%${search}%` } },
            { carSeats: { [Sequelize.Op.like]: `%${search}%` } },
            { carLength: { [Sequelize.Op.like]: `%${search}%` } },
            { carWidth: { [Sequelize.Op.like]: `%${search}%` } },
            { carHeight: { [Sequelize.Op.like]: `%${search}%` } },
            { carMods: { [Sequelize.Op.like]: `%${search}%` } },
            { emailAccount: { [Sequelize.Op.like]: `%${search}%` } },
            { soldBy: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }

    let list = await Store.findAll({
        where: [condition, { emailAccount: { [Op.notIn]: ["muelsyse@ecolife.labs"] } }],
        order: [['carPlateNo', 'ASC']]
    });
    res.json(list);
});

router.get("/viewStoreItem/:id", async (req, res) => {
    let id = req.params.id;
    let store = await Store.findByPk(id);
    // Check id not found
    if (!store) {
        res.sendStatus(404);
        return;
    }
    res.json(store);
});

router.get("/viewStoreReceipt", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { carReceiptId: { [Sequelize.Op.like]: `%${search}%` } },
            { carBrand: { [Sequelize.Op.like]: `%${search}%` } },
            { carModel: { [Sequelize.Op.like]: `%${search}%` } },
            { cardNumber: { [Sequelize.Op.like]: `%${search}%` } },
            { cardHolderName: { [Sequelize.Op.like]: `%${search}%` } },
            { cardExpiryYear: { [Sequelize.Op.like]: `%${search}%` } },
            { cardExpiryMonth: { [Sequelize.Op.like]: `%${search}%` } },
            { cvc: { [Sequelize.Op.like]: `%${search}%` } },
            { userEmailAccount: { [Sequelize.Op.like]: `%${search}%` } },
            { boughtBy: { [Sequelize.Op.like]: `%${search}%` } },
            { userPhoneNo: { [Sequelize.Op.like]: `%${search}%` } },
            { userCity: { [Sequelize.Op.like]: `%${search}%` } },
            { userZipCode: { [Sequelize.Op.like]: `%${search}%` } },
            { userAddress: { [Sequelize.Op.like]: `%${search}%` } },
            { createdAt: { [Sequelize.Op.like]: `%${search}%` } },
        ];
    }

    let list = await StoreReceipt.findAll({
        where: condition,
        order: [['carReceiptId', 'ASC']]
    });
    res.json(list);
});

router.get("/viewStoreReceipt/:id", async (req, res) => {
    let id = req.params.id;
    let storeReceipt = await StoreReceipt.findByPk(id);
    // Check id not found
    if (!storeReceipt) {
        res.sendStatus(404);
        return;
    }
    res.json(storeReceipt);
});

router.put("/updateStoreItem/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let store = await Store.findByPk(id);
    if (!store) {
        res.sendStatus(404);
        return;
    }
    let data = req.body;

    // Validate request body
    let validationSchema = yup.object().shape({
        carPlateNo: yup.string().trim().min(8, "Car Plate cannot be less than 8").max(8, "Car Plate cannot be more than 8").required("Car Plate cannot be empty"),
        carDescription: yup.string().trim().min(20, "Car Description cannot be less than 20 characters").required("Car Description cannot be empty"),
        carPrice: yup.number().integer().min(10000, "Price must be minimum of $10,000").required("Price cannot be empty"),
        carBrand: yup.string().trim().min(5, "Brand cannot be less than 5 characters").required("Brand cannot be empty"),
        carModel: yup.string().trim().min(5, "Model cannot be less than 5 characters").required("Model cannot be empty"),
        carEngine: yup.string().trim().min(5, "Engine cannot be less than 5 characters").required("Engine cannot be empty"),
        carSpeed: yup.number().integer().min(50, "Speed cannot be less than 50").required("Speed cannot be empty"),
        carFuelType: yup.string().required("Fuel Type cannot be empty"),
        carFuelConsume: yup.number().integer().min(1, "Fuel Consumption cannot be less than 0").required("Fuel Consumption cannot be empty"),
        carProductionDate: yup.date().min("1900-01-01", "Production Date cannot be before 1923").required("Production Date cannot be empty"),
        carBodyType: yup.string().trim().min(5, "Body Type cannot be less than 5 characters").required("Body Type cannot be empty"),
        carColor: yup.string().trim().min(2, "Color cannot be less than 2 characters").required("Color cannot be empty"),
        carSeats: yup.number().integer().min(1, "The minimum seat is 1").required("Seats cannot be empty"),
        carLength: yup.number().integer().min(1000, "The minimum car length is 1000mm").required("Length cannot be empty"),
        carWidth: yup.number().integer().min(1000, "The minimum car width is 1000mm").required("Width cannot be empty"),
        carHeight: yup.number().integer().min(1000, "The minimum car height is 1000mm").required("Height cannot be empty"),
        carMods: yup.string()
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.emailAccount = req.user.emailAccount;
    let user = await UserAccount.findByPk(data.emailAccount, { attributes: ['fullName'] });
    let fullName = user.fullName;

    data.soldBy = fullName;
    let num = await Store.update(data, {
        where: { carPlateNo: id }
    });
    if (num == 1) {
        res.json({
            message: `Store item with id ${id} was updated successfully.`
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update store item with id ${id}.`
        });
    }
});

router.put("/updateStoreReceipt/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let storeReceipt = await StoreReceipt.findByPk(id);
    if (!storeReceipt) {
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    let validationSchema = yup.object().shape({
        carPlate: yup.string().required(),
        cardNumber: yup.string().min(12, "Card Number cannot be more than 12").max(12, "Card Number cannot be more than 12").required(),
        cardHolderName: yup.string().required(),
        cardExpiryMonth: yup.number().min(2, "Month of Expiry cannot be less than 2 characters").min(2, "Month of Expiry cannot be more than 2 characters").required(),
        cardExpiryYear: yup.number().min(2, "Year of Expiry cannot be less than 2 characters").max(2, "Year of Expiry cannot be more than 2 characters").required(),
        cvc: yup.number().min(3, "Security code cannot be less than 3").max(3, "Security code cannot be more than 3").required(),
        userAddress: yup.string().required(),
        userCity: yup.string().required(),
        userZipCode: yup.number().min(6, "Zip or Postal Code cannot be less than 6").max(6, "Zip or Postal Code cannot be more than 6").required()
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.cardHolderName = data.cardHolderName.trim();
    data.carPlate = data.carPlate.trim()

    data.emailAccount = req.user.emailAccount;
    data.userEmailAccount = req.user.emailAccount;
    let user = await UserAccount.findByPk(data.emailAccount, { attributes: ['fullName', 'phoneNo'] });
    let fullName = user.fullName;
    let phoneNo = user.phoneNo;

    data.boughtBy = fullName;
    data.userPhoneNo = phoneNo;

    let car = await Store.findByPk(data.carPlate);
    data.carPlateNo = car.carPlateNo;
    data.carBrand = car.carBrand;
    data.carModel = car.carModel;
    data.price = car.carPrice;

    let num = await StoreReceipt.update(data, {
        where: { carPlate: id }
    });
    if (num == 1) {
        res.json({
            message: `Store item with id ${id} was updated successfully.`
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update store item with id ${id}.`
        });
    }
});

router.delete("/deleteStoreItem/:id", async (req, res) => {
    let id = req.params.id;
    let num = await Store.destroy({
        where: { carPlateNo: id }
    })
    if (num == 1) {
        res.json({
            message: `Store item ${id} was deleted successfully.`
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete store item with id ${id}.`
        });
    }
});

router.delete("/deleteStoreReceipt/:id", async (req, res) => {
    let id = req.params.id;
    let num = await StoreReceipt.destroy({
        where: { carPlate: id }
    })
    if (num == 1) {
        res.json({
            message: `Store Receipt ${id} was deleted successfully.`
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete store receipt with id ${id}.`
        });
    }
});

module.exports = router;
console.timeEnd("Store Routes")