// testing maybe later or tomorrow (probably tomorrow cuz I'm lazy now) - 12/6/2023, 6:37pm

const express = require('express');
const router = express.Router();
const { Store, Sequelize } = require('../models'); 
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    data.carProductionDate = Date.parse(data.carProductionDate)
    data.carProductionDate = new Date(data.carProductionDate)

    // Validate request body
    let validationSchema = yup.object().shape({
        carPlateNo: yup.string().trim().max(8).required(),
        carDescription:  yup.string().trim().required(),
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
        isModified: yup.boolean().required(),
        carMods: yup.string(),
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
    data.carDescription = data.carDescription.trim();
    data.carBrand = data.carBrand.trim();
    data.carModel = data.carModel.trim();
    data.carEngine = data.carEngine.trim();
    data.carFuelType = data.carFuelType.trim();
    data.carBodyType= data.carBodyType.trim();
    data.carMods = data.carMods.trim();

    let result = await Store.create(data);
    res.json(data);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { carName: { [Sequelize.Op.like]: `%${search}%` } },
            { carDescription: { [Sequelize.Op.like]: `%${search}%` } },
            { carPrice: { [Sequelize.Op.like]: `%${search}%` } },
            { carBrand: { [Sequelize.Op.like]: `%${search}%` } },
            { carModel: { [Sequelize.Op.like]: `%${search}%` } },
            { carModification: { [Sequelize.Op.like]: `%${search}%` } },
            { carSpeed: { [Sequelize.Op.like]: `%${search}%` } },
            { carFuelType: { [Sequelize.Op.like]: `%${search}%` } },
            { carFuelConsume: { [Sequelize.Op.like]: `%${search}%` } },
            { carProductionDate: { [Sequelize.Op.like]: `%${search}%` } },
            { carBodyType: { [Sequelize.Op.like]: `%${search}%` } },
            { carSeats: { [Sequelize.Op.like]: `%${search}%` } },
            { carDoors: { [Sequelize.Op.like]: `%${search}%` } },
            { carWheels: { [Sequelize.Op.like]: `%${search}%` } },
            { carLength: { [Sequelize.Op.like]: `%${search}%` } },
            { carWidth: { [Sequelize.Op.like]: `%${search}%` } },
            { carHeight: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }

    let list = await Store.findAll({
        where: condition,
        order: [['carName', 'ASC']]
    });
    res.json(list); 
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let store = await Store.findByPk(id);
    // Check id not found
    if (!store) {
        res.sendStatus(404);
        return;
    }
    res.json(store);
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let store = await Store.findByPk(id);
    if (!store) {
        res.sendStatus(404);
        return;
    }
    let data = req.body;
    data.carProductionDate = Date.parse(data.carProductionDate);
    data.carProductionDate = new Date(data.carProductionDate);

    // Validate request body
    let validationSchema = yup.object().shape({
        carPlateNo: yup.string().trim().max(8).required(),
        carDescription:  yup.string().trim().required(),
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
        isModified: yup.boolean().required(),
        carMods: yup.string(), 
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
    let num = await Store.update(data, {
        where: { id: id }
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

router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await Store.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Store item was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot delete store item with id ${id}.`
        });
    }
});

module.exports = router;