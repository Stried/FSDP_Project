import {
    Box, Button
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import "./../../../App.css";
import http from "../../../http";
import FormInputSingleLine from "../../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "flowbite-react";

function StoreReceiptCreate() {
    const { id } = useParams();
    const [openModal, setOpenModal] = useState("");

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            carPlate: id,
            price: 0,
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
            cardNumber: yup.string().min(16, "Card Number cannot be more than 16").max(16, "Card Number cannot be more than 16").required("Card Number cannot be empty"),
            cardHolderName: yup.string().required("Card Holder Name cannot be empty"),
            cardExpiryMonth: yup.number().min(1, "Month of Expiry cannot be less than 2 characters").max(12, "Month of Expiry cannot be more than 12").required("Month of Expiry cannot be empty"),
            cardExpiryYear: yup.number().min(24, "Year of Expiry cannot be before 2024").max(99, "Year of Expiry cannot be more than 2 characters").required("Year of Expiry cannot be empty"),
            cvc: yup.number().test("is-three-digit", "Security Code must be a 3-digit number.", (value) => value.toString().length === 3).required("Security Code cannot be empty"),
            userAddress: yup.string().required("Address cannot be empty"),
            userCity: yup.string().required("City cannot be empty"),
            userZipCode: yup.number().test("is-six-digit", "Postal or Zip Code must be a 6-digit number.", (value) => value.toString().length === 6).required("Postal or Zip Code cannot be empty")
        }),
        onSubmit: (data) => {
            data.carPlate.trim(),
                data.cardNumber.trim(),
                data.cardHolderName.trim(),
                data.userAddress.trim(),

            http.post("/store/createStoreReceipt", data)
                .then((res) => {
                    console.log(res.status);                    
                    http.delete(`/store/deleteStoreItem/${id}`)
                    .then((res) => {
                        console.log(res.data);
                    });
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
                    <div className="w-2/12 px-5 inline-block">
                        <span className="text-white">Expiration Date</span>
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
                    <div className="w-2/12 pr-5 inline-block text-white">
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
                            type="number"
                            value={formik.values.userZipCode}
                            onChange={formik.handleChange}
                            error={formik.touched.userZipCode && Boolean(formik.errors.userZipCode)}
                            helperText={formik.touched.userZipCode && formik.errors.userZipCode}
                        />
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            className="bg-green-400 text-black hover:bg-green-600 hover:text-white mt-5"
                            onClick={() => {
                                setOpenModal("deleteModal");
                            }}
                            type="submit"							>
                            Purchase
                        </Button>
                    </div>
                    <Modal
                        dismissible
                        show={openModal === "deleteModal"}
                        onClose={() => setOpenModal(undefined)}
                    >
                        <Modal.Header>Purcahse complete</Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Click to Exit
                                </p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                onClick={() => navigate("/store/StoreMain")}
                                className="px-3 py-2 bg-green-500 hover:bg-green-600 hover:text-white rounded font-medium"
                            >
                                Exit
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Box>
        </Box>
    );
}

export default StoreReceiptCreate;