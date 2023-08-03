console.time("Location Routes")
const express = require('express')
const router = express.Router();
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');
const { Locations } = require("../models/");

router.post("/createLocation", validateToken, async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        coordinates: yup.string().required("Please specify the Latitude and Longitude."),
        locationName: yup.string().trim().required("Please provide a location name."),
        streetName: yup.string().trim().required("Please provide a street name."),
        postalCode: yup.number().positive().integer().required("Please input a valid Postal Code."),
        region: yup.string().trim().oneOf(["N", "S", "E", "W"]).required("Please specify a valid region."),
        fastCharge: yup.boolean().required("Please specify if the charger is capable of FastCharge."),
        noOfChargers: yup.number().positive().integer().required("Please specify the number of chargers in the location.")
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        console.log("Demons are taking over.")
        res.status(400).json({ errors: err.errors });
        return;
    }
    
    let coordinates = data.coordinates.trim().split(',');

    data.LatAxis = coordinates[0];
    data.LongAxis = coordinates[1];
    data.locationName = data.locationName.trim();
    data.streetName = data.streetName.trim();
    data.postalCode = data.postalCode;
    data.region = data.region.trim();
    data.fastCharge = data.fastCharge;
    data.noOfChargers = data.noOfChargers;


    locationInfo = {
        LatAxis: data.LatAxis,
        LongAxis: data.LongAxis, 
        locationName: data.locationName,
        streetName: data.streetName,
        postalCode: data.postalCode,
        region: data.region,
        fastCharge: data.fastCharge,
        noOfChargers: data.noOfChargers
    }

    let isLocation = await Locations.findOne({
        where: { postalCode: data.postalCode }
    });
    if (isLocation) {
        console.log("Location Postal Code already exists")
        res.status(400).json({ message: "Location's Postal Code already exists!" });
        return;
    };

    let isLocName = await Locations.findOne({
        where: { locationName: data.locationName }
    });
    if (isLocName) {
        console.log("Location Name already exists")
        res.status(400).json({ message: "Location's Name already exists!" });
        return;
    };

    let isStreetName = await Locations.findOne({
        where: { streetName: data.streetName }
    });
    if (isStreetName) {
        console.log("Street Name already exists")
        res.status(400).json({ message: "Location's Street Name already exists!" });
        return;
    };

    try {
        let result = await Locations.create(locationInfo);
        res.json(result);
    } catch (err) {
        console.log(err);
        return;
    }
})

router.get("/LocationsMain", async (req, res) => {
    const conditions = {}
    let search = req.query.search;
    if (search) {
        condition[ Sequelize.Op.or ] = [
            { locationName: { [ Sequelize.Op.like ]: `%${search}%` } },
            { streetName: { [ Sequelize.Op.like ]: `%${search}%` } },
            { postalCode: { [ Sequelize.Op.like ]: `%${search}%` } }
        ]
    }
    
    let locations = await Locations.findAll({
        where: conditions,
        order:[ ['streetName', 'DESC'] ]
    })

    res.json(locations)
})

router.put("/updateLocation/:id", validateToken, async (req, res) => {
    let data = req.body;
    let enteredPostalCode = req.params.id;
    let validationSchema = yup.object().shape({
        LatAxis: yup.number().required("Please specify the Latitute."),
        LongAxis: yup.number().required("Please specify the Longitude."),
        locationName: yup.string().trim().required("Please provide a location name."),
        streetName: yup.string().trim().required("Please provide a street name."),
        postalCode: yup.number().positive().integer().required("Please input a valid Postal Code."),
        region: yup.string().trim().oneOf([ "N", "S", "E", "W" ]).required("Please specify a valid region."),
        fastCharge: yup.boolean().required("Please specify if the charger is capable of FastCharge."),
        noOfChargers: yup.number().positive().integer().required("Please specify the number of chargers in the location.")
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.LatAxis = data.LatAxis;
    data.LongAxis = data.LongAxis;
    data.locationName = data.locationName.trim();
    data.streetName = data.streetName.trim();
    data.postalCode = data.postalCode;
    data.region = data.region.trim();
    data.fastCharge = data.fastCharge;
    data.noOfChargers = data.noOfChargers;

    let locationInfo = {
        LatAxis: data.LatAxis,
        LongAxis: data.LongAxis,
        locationName: data.locationName,
        streetName: data.streetName,
        postalCode: data.postalCode,
        region: data.region,
        fastCharge: data.fastCharge,
        noOfChargers: data.noOfChargers
    }


    let result = await Locations.update(locationInfo, {
        where: { postalCode: enteredPostalCode }
    });

    if (result == 1) {
        res.json({
            message: "Location has been successfully updated.",
        });
    } else {
        res.status(400).json({
            message: `Cannot update location details with Postal Code ${enteredPostalCode}`,
        });
        return;
    }

})

router.delete("/deleteLocation/:id", validateToken, async (req, res) => {
    let location = req.params.id;

    if (req.user.adminNo == null) {
        res.status(401).json({
            warning: ["Unauthorized action detected.", "Actions, logged.", "Address, triangulated."]
        });
        return;
    }
    
    let findLocation = await Locations.findOne({
        where: { postalCode: location } // cloumn_name: data
    });
    if (!findLocation) {
        console.log("The location you're trying to delete was not found.");
        res.sendStatus(404);
        return;
    } else {
        let deleteLocation = await Locations.destroy({
            where: { postalCode: location }
        });

        if (deleteLocation == 1) {
            res.json({
                message: "Charger location successfully removed."
            });
        } else {
            res.status(400).json({
                message: `Cannot remove location with postal code ${postalCode}`
            });
        }
    }
});


module.exports = router;
console.timeEnd("Location Routes")