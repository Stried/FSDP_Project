console.time("Store Routes")
const express = require('express');
const router = express.Router();
const { UserAccount, Store, Sequelize } = require('../models');
const { validateToken } = require("../middlewares/auth");
const yup = require("yup");

router.post("/createStoreItem", validateToken, async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        carPlateNo: yup.string().trim().max(8).required(),
        carDescription: yup.string().trim().required(),
        carPrice: yup.number().integer().required(),
        carBrand: yup.string().trim().required(),
        carModel: yup.string().trim().required(),
        carEngine: yup.string().trim().required(),
        carSpeed: yup.number().integer().required(),
        carFuelType: yup.string().required(),
        carFuelConsume: yup.number().integer().required(),
        carProductionDate: yup.date().required(),
        carBodyType: yup.string().trim().required(),
        carColor: yup.string().trim().required(),
        carSeats: yup.number().integer().min(1).required(),
        carLength: yup.number().integer().required(),
        carWidth: yup.number().integer().required(),
        carHeight: yup.number().integer().required(),
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
        where: condition,
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
        carPlateNo: yup.string().trim().max(8).required(),
        carDescription: yup.string().trim().required(),
        carPrice: yup.number().integer().required(),
        carBrand: yup.string().trim().required(),
        carModel: yup.string().trim().required(),
        carEngine: yup.string().trim().required(),
        carSpeed: yup.number().integer().required(),
        carFuelType: yup.string().required(),
        carFuelConsume: yup.number().integer().required(),
        carProductionDate: yup.date().required(),
        carBodyType: yup.string().trim().required(),
        carColor: yup.string().trim().required(),
        carSeats: yup.number().integer().min(1).required(),
        carLength: yup.number().integer().required(),
        carWidth: yup.number().integer().required(),
        carHeight: yup.number().integer().required(),
        carMods: yup.string(),
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

module.exports = router;
console.timeEnd("Store Routes")