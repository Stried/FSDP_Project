// testing maybe later or tomorrow (probably tomorrow cuz I'm lazy now) - 12/6/2023, 6:37pm

const express = require('express');
const router = express.Router();
const { Store, Sequelize } = require('../models'); 
const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        carName: yup.string().trim().min(10).max(100).required(),
        carDescription:  yup.string().trim().required(),
        carPrice: yup.number().integer().required(),
        carBrand: yup.string().trim().required(),
        carModel: yup.string().trim().required(),
        carModification: yup.string().trim().required(),
        carSpeed: yup.number().integer().required(),
        carFuelType: yup.string().required(), 
        carFuelConsumation: yup.number().integer().required(),
        carProductionDate: yup.date().required(),
        carBodyType: yup.string().trim().required(),
        carSeats: yup.number().integer().min(1).required(),
        carDoors: yup.number().integer().min(2).required(),
        carWheels: yup.number().integer().min(4).required(),
        carLength: yup.number().integer().required(),
        carWidth: yup.number().integer().required(),
        carHeight: yup.number().integer().required() 
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
    data.carName = data.carName.trim();
    data.carDescription = data.carDescription.trim();
    data.carBrand = data.carBrand.trim();
    data.carModel = data.carModel.trim();
    data.carModification = data.carModification.trim();
    data.carFuelType = data.carFuelType.trim();
    data.carBodyType= data.carBodyType.trim();

    let result = await Store.create(data);
    res.json(data);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { carName: { [Sequelize.Op.like]: `%${search}%` } },
            { carPrice: { [Sequelize.Op.like]: `%${search}%` } }
        ]
    }

    let list = await Store.findAll({
        where: condition,
        order: [['carName', 'carPrice']] // to-do (lemme think about it)
    })
    res.json(list);
}); 

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let store = await Store.findByPk(id);
    res.json(store);
    // Check id not found
    if (!store) {
        res.sendStatus(404);
        return;
    }
});

router.put("/:id", async (req, res) => {
    let id = req.params.id;
    let data = req.body;
    let num = await Store.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Store Item was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update store item with id ${id}.`
        });
    }
});

module.exports = router;