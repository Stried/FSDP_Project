const express = require('express')
const router = express.Router();
const yup = require("yup");
const { validateToken } = require('../middlewares/auth');
const { Locations } = require("../models/");

router.post("/createLocation", validateToken, async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        LatAxis: yup.number().required("Please specify the Latitute."),
        LongAxis: yup.number().required("Please specify the Longitude."),
        locationName: yup.string().trim().required("Please provide a location name."),
        streetName: yup.string().trim().required("Please provide a street name."),
        postalCode: yup.number().positive().integer().required("Please input a valid Postal Code."),
        region: yup.string().trim().oneOf([ "N", "S", "E", "W"]).required("Please specify a valid region."),
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
        res.status(400).json({ message: "Location's Postal Code already exists!" });
        return;
    };

    let isLocName = await Locations.findOne({
        where: { locationName: data.locationName }
    });
    if (isLocName) {
        res.status(400).json({ message: "Location's Name already exists!" });
        return;
    };

    let isStreetName = await Locations.findOne({
        where: { streetName: data.streetName }
    });
    if (isStreetName) {
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

module.exports = router;