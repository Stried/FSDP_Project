import {
    Box, Button
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import "./../../../../App.css";
import http from "./../../../../http";
import FormInputSingleLine from "./../../../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";

function StoreReceiptCreate() {
    const { id } = useParams();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            carPlate: id,
            cardNumber: "",
            cardHolderName: "",
            cardExpiryYear: 0,
            cardExpiryMonth: 0,
            cvc: 0,
            userAddress: "",
            userCity: "",
            userZipCode: "",
        },
        validationSchema: yup.object().shape({
            carPlate: yup.string().required(),
            cardNumber: yup.string().required(),
            cardHolderName: yup.string().required(),
            cardExpiryYear: yup.number().required(),
            cardExpiryMonth: yup.number().required(),
            cvc: yup.number().required(),
            userAddress: yup.string().required(),
            userCity: yup.string().required(),
            userZipCode: yup.number().required()
        }),
        onSubmit: (data) => {
            data.carPlate.trim(),
                data.cardNumber.trim(),
                data.cardHolderName.trim(),
                data.userAddress.trim(),

            http.post("/store/createStoreReceipt", data)
                .then((res) => {
                    console.log(res.status);
                    navigate("/store/StoreMain");
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`)
                });
        }
    });

    return (
        <Box component={"div"} className="pl-7 bg-zinc-800 rounded w-11/12 m-auto">
            <Box component={"form"} onSubmit={formik.handleSubmit} className="pb-5 mb-5">
                <div className="text-white text-center">
                    <h1 className="text-green-500 text-5xl py-3 font-semibold">
                        Payment Info
                    </h1>
                </div>
                <div className="pr-7">
                <div className="text-white text-center text-2xl mt-5">
                        Payment Method
                    </div>
                    <div className="w-6/12">
                        <FormInputSingleLine
                            valueName="cardNumber"
                            name="Card Number"
                            type="text"
                            value={formik.values.cardNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                            helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                        />
                    </div>
                    <div className="w-6/12 inline-block">
                        <FormInputSingleLine
                            valueName="cardHolderName"
                            name="Card Holder Name"
                            type="text"
                            value={formik.values.cardHolderName}
                            onChange={formik.handleChange}
                            error={formik.touched.cardHolderName && Boolean(formik.errors.cardHolderName)}
                            helperText={formik.touched.cardHolderName && formik.errors.cardHolderName}
                        />
                    </div>
                    <div className="w-2/12 px-5 inline-block text-white">
                        <span className="text-white">Expiration Date</span>
                        <FormInputSingleLine
                            valueName="cardExpiryYear"
                            name="Year"
                            type="text"
                            value={formik.values.cardExpiryYear}
                            onChange={formik.handleChange}
                            error={formik.touched.cardExpiryYear && Boolean(formik.errors.cardExpiryYear)}
                            helperText={formik.touched.cardExpiryYear && formik.errors.cardExpiryYear}
                        />
                    </div>
                    <div className="w-2/12 pr-5 inline-block">
                        <FormInputSingleLine
                            valueName="cardExpiryMonth"
                            name="Month"
                            type="text"
                            value={formik.values.cardExpiryMonth}
                            onChange={formik.handleChange}
                            error={formik.touched.cardExpiryMonth && Boolean(formik.errors.cardExpiryMonth)}
                            helperText={formik.touched.cardExpiryMonth && formik.errors.cardExpiryMonth}
                        />
                    </div>
                    <div className="w-2/12 inline-block">
                        <FormInputSingleLine
                            valueName="cvc"
                            name="Security Code"
                            type="number"
                            value={formik.values.cvc}
                            onChange={formik.handleChange}
                            error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                            helperText={formik.touched.cvc && formik.errors.cvc}
                        />
                    </div>
                    <div className="text-white text-center text-2xl mt-5">
                        Billing Information
                    </div>                    
                    <div className="w-1/2 inline-block">
                        <FormInputSingleLine
                            valueName="carPlate"
                            name="Plate Number"
                            type="text"
                            value={formik.values.carPlate}
                            onChange={formik.handleChange}
                            error={formik.touched.carPlate && Boolean(formik.errors.carPlate)}
                            helperText={formik.touched.carPlate && formik.errors.carPlate}
                        />
                    </div>
                    <div className="w-1/2 inline-block pl-5">
                        <FormInputSingleLine
                            valueName="userAddress"
                            name="Billing Address"
                            type="text"
                            value={formik.values.userAddress}
                            onChange={formik.handleChange}
                            error={formik.touched.userAddress && Boolean(formik.errors.userAddress)}
                            helperText={formik.touched.userAddress && formik.errors.userAddress}
                        />
                    </div>
                    <div className="w-1/2 inline-block">
                        <FormInputSingleLine
                            valueName="userCity"
                            name="City"
                            type="text"
                            value={formik.values.userCity}
                            onChange={formik.handleChange}
                            error={formik.touched.userCity && Boolean(formik.errors.userCity)}
                            helperText={formik.touched.userCity && formik.errors.userCity}
                        />
                    </div>
                    <div className="w-1/2 inline-block pl-5">
                        <FormInputSingleLine
                            valueName="userZipCode"
                            name="Zip or Postal Code"
                            type="text"
                            value={formik.values.userZipCode}
                            onChange={formik.handleChange}
                            error={formik.touched.userZipCode && Boolean(formik.errors.userZipCode)}
                            helperText={formik.touched.userZipCode && formik.errors.userZipCode}
                        />
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            type="submit"
                            className="bg-green-400 text-black hover:bg-green-600 hover:text-white mt-5"							>
                            Purchase
                        </Button>
                    </div>
                </div>
            </Box>
        </Box>
    );
}

export default StoreReceiptCreate;