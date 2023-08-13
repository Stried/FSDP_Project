import { Box, Button, InputLabel, MenuItem, Grid, Typography,  Card,
  CardContent, } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import * as React from "react";
("use client");
import { useParams } from "react-router-dom";
import http from "../../../http";
import { ToastContainer, toast } from "react-toastify";
import FormInputSingleLine from "../../../components/FormInputSingleLine";
import DatePicker from "react-datepicker";
import "./TrialsDatepicker.css";
import { useFormik } from "formik";
import DefaultImage from '../../../../DefaultImage';
import * as yup from "yup";
import { setHours, setMinutes } from "date-fns";
function TrialsReceiptCreation() {
  const navigate = useNavigate();

  const { model } = useParams();
  const [date, setDate] = useState(new Date());
  const [trialCarEntry, setTrialCarEntry] = useState({
    address: "",
  });
  const currentDate = new Date();
  const minDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Adding seven days in milliseconds

  const [isCardShifted, setIsCardShifted] = useState(false);

  const handleToggle = () => {
    setIsCardShifted(!isCardShifted);
  };

  const [trialCar, setTrialCar] = useState({
    carPlateNo: "",
    carDescription: "",
    carPrice: 0,
    carBrand: "",
    carModel: "",
    carEngine: "",
    carSpeed: 0,
    carFuelType: "",
    carFuelConsume: 0,
    carProductionDate: "",
    carBodyType: "",
    carSeats: 0,
    carLength: 0,
    carWidth: 0,
    carHeight: 0,
    isModified: 0,
    carMods: "",
    carColor: "",
  });
  useEffect(() => {
    http.get(`/trials/viewTrialCar/${model}`).then((res) => {
      setTrialCar(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    http.get(`/trials/viewSpecificTrialCar/${model}`).then((res) => {
      setTrialCarEntry(res.data);
      console.log(res.data);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      dateOfTrial: "",
      trialReport: "",
      modelName: "",
      faultResolve: "Resolved",
    },
    validationSchema: yup.object().shape({
      dateOfTrial: yup.date().required("Date of trial is required"),
    }),

    onSubmit: async (data) => {
      const selectedDate = data.dateOfTrial;

      const selectedHours = selectedDate.getHours();
      if (selectedHours >= 0 && selectedHours < 8) {
        toast.error("Trials cannot be booked between 12am and 7:59am.");
        return;
      }

      const formData = {
        dateOfTrial: data.dateOfTrial.toISOString(),
      };

      await http
        .post(`trials/createTrialReceipt/${model}`, formData)
        .then((res) => {
          console.log("The trial car is " + model);
          // navigate("/TrialsCarAdminPage");
          navigate("/Trials/trialUsers/TrialsCarUserPage");
        })
        .catch(function (err) {
          console.log(err);
          toast.error(`${err.response.data.message}`);
        });
    },
  });


  
  return (
    <div className="relative min-h-screen">
      <div className="relative min-h-screen text-white">
        <h1 className="text-center text-5xl text-green-400"></h1>
        <br></br>
        <div className="relative shadow-md sm:rounded-lg mx-2 sm:mx-6 lg:mx-16 flex text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          <div className="w-full h-full">
            <Card className="w-4/5 relative bg-gray-800 rounded-md z-20">
              <CardContent className="px-12 ">
                <div className="w-85 h-80 mx-auto">
                  <DefaultImage
                    src={`${import.meta.env.VITE_FILE_BASE_URL_STORE}${
                      trialCar.carImageFile
                    }`}
                    className="object-cover w-full h-full"
                    alt="Car Image"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="text-3xl font-semibold my-3">
                  <span className="text-green-400">{trialCar.carPlateNo}</span>
                </div>
                <div className="text-xl text-white my-2">
                  Location:{" "}
                  <span className="text-green-400">
                    {trialCarEntry.address}
                  </span>
                </div>
                <div className="text-xl text-white my-2">
                  Car Brand:{" "}
                  <span className="text-green-400">{trialCar.carBrand}</span>
                </div>
                <div className="text-xl text-white my-2">
                  Car Model:{" "}
                  <span className="text-green-400">{trialCar.carModel}</span>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`w-4/12 bg-gray-800 rounded-md absolute bottom-0 left-40 transition-transform duration-300 ${ isCardShifted ? "transform translate-x-[350px]" : "" }`}
              style={{width:"27.8%", backgroundColor:"rgb(31 41 55)",borderRadius: "8px",height:"527px",
              }}
            >
              <CardContent className="px-12">
                <Typography
                  variant="h4"
                  className="text-center text-4xl text-green-400"
                >
                  Description:
                </Typography>

                <br />
                <br />
                <div className=" border-2 border-green-500 rounded-md">
                <div className="p-2 max-h-96 overflow-auto ">
                <p className="overflow-hidden text-white" style={{ overflowWrap: "break-word" }}>
                  {trialCar.carDescription}
                </p>
                </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div
    className={`text-center top-10 left-1 absolute transition-transform duration-300 ${
      isCardShifted ? "transform translate-x-[350px]" : ""
    }`}
    onClick={handleToggle}
    style={{left:"515px", top:"60px", cursor: "pointer"}}
  >
          <div className="bg-gray-800 h-32 w-8 rounded-r-md " >
            <div className="text-center top-4 left-2 relative" >
            {!isCardShifted && (
                        <div className="h-20 w-7 ">
                            <div className="left-1 top-10 absolute  ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 512 512"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                                </svg>
                            </div>
                        </div>
                    )}
                    {isCardShifted && (
                        <div className="h-20 w-7">
                            <div className="left-1 top-10 absolute ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 512 512"
                                    fill="rgb(34 197 94)"
                                >
                                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
          </div>
          </div>

          <div className="col-span-1">
            
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              key={trialCar.carPlateNo}
              className="ml-64"
            >
              <div className="w-2/3 grid grid-cols-2 columns-2">
                <div className="w-max mr-10 mb-3 pb-3 px-2 font-medium text-xl space-y-1 border-b-gray-700 border-solid border-b-2">
                  <p>
                    Car Engine:{" "}
                    <span className="text-green-400">{trialCar.carEngine}</span>
                  </p>

                  <p>
                    Car Speed:{" "}
                    <span className="text-green-400">{trialCar.carSpeed}</span>
                  </p>
                </div>
                <div className="w-max ml-20 pl-5 pb-3 font-medium text-xl space-y-1">
                  <p>
                    Car Seats:{" "}
                    <span className="text-green-400">{trialCar.carSeats}</span>
                  </p>
                  <p>
                    Car Fuel Type:{" "}
                    <span className="text-green-400">
                      {trialCar.carFuelType}
                    </span>
                  </p>
                  <p>
                    Car Fuel Consume:{" "}
                    <span className="text-green-400">
                      {trialCar.carFuelConsume}
                    </span>
                  </p>
                </div>
                <div className="w-max mr-10 mb-4 pb-3 px-2 font-medium text-xl space-y-1">
                  <p>
                    Car Body Type:{" "}
                    <span className="text-green-400">
                      {trialCar.carBodyType}
                    </span>
                  </p>
                  <p>
                    Car Length:{" "}
                    <span className="text-green-400">{trialCar.carLength}</span>
                  </p>
                  <p>
                    Car Width:{" "}
                    <span className="text-green-400">{trialCar.carWidth}</span>
                  </p>
                  <p>
                    Car Height:{" "}
                    <span className="text-green-400">{trialCar.carHeight}</span>
                  </p>
                </div>
              </div>
            </Grid>
          </div>
        </div>
      </div>
      <br/>
      <br/>
<hr/>
        <ToastContainer />
      </div>
      <h1 className="text-center text-5xl text-green-400">
        Create Trial Receipt
      </h1>
      <br></br>
      <label>Date</label>
      <Box
        component={"form"}
        onSubmit={formik.handleSubmit}
        className="mx-7 ml-16"
      >
        <div>
          <DatePicker
            className="p-2 border rounded-lg text-white bg-black focus:outline-none focus:ring focus:border-green-500"
            placeholderText="Select a date"
            selected={formik.values.dateOfTrial}
            onChange={(date) => formik.setFieldValue("dateOfTrial", date)}
            showPopperArrow={false}
            minDate={minDate}
            withPortal
            calendarClassName="border-green-500"
            showTimeSelect
            timeIntervals={120}
            dateFormat="MMMM d, yyyy h:mm aa"
            excludeTimes={[
              setHours(setMinutes(new Date(), 0), 0),
              setHours(setMinutes(new Date(), 0), 2),
              setHours(setMinutes(new Date(), 0), 4),
              setHours(setMinutes(new Date(), 0), 6),
            ]}
          />
          {formik.errors.dateOfTrial ? (
            <div className="text-red-600">{formik.errors.dateOfTrial}</div>
          ) : null}
        </div>

        <br></br>

        {formik.errors.modelName ? (
          <div classnames="error">{formik.errors.modelName}</div>
        ) : null}
        <br></br>
        <Button
          variant="contained"
          type="submit"
          className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
        >
          Book
        </Button>
      </Box>
<br />
<br />
      <ToastContainer />
    </div>
  );
};

export default TrialsReceiptCreation;
