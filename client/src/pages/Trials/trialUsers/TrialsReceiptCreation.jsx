import { Box, Button, InputLabel, MenuItem, Grid } from "@mui/material";
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
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import * as yup from "yup";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
const App = () => {
  const navigate = useNavigate();



  const { model } = useParams();
  const [date, setDate] = useState(new Date());
  const [trialCarEntry, setTrialCarEntry] = useState({
    address: "",
  });
  const currentDate = new Date();
  const minDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Adding seven days in milliseconds



  const MyContainer = ({ className="bg-black", children }) => {
    return (
      <div style={{ padding: "2px", background: "", color: "black" }}>
        <calendarContainer className={className}>
          <div style={{ position: "relative", color:"black"}}>{children}</div>
        </calendarContainer>
      </div>
    );
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
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-7 ml-16 flex">
          <Grid item xs={12} md={6} lg={6} key={trialCar.carPlateNo}>
            <div className="text-3xl font-semibold float-left w-1/3 h-max">
              {trialCar.carPlateNo}
              <br />
              <div className="text-xl font-medium float-left">
                {trialCar.carDescription}
              </div>
              <br />
              <div className="text-xl font-medium float-left">
                Location:
                {trialCarEntry.address}
              </div>
              <br />
              <div>INSERT IMAGE HERE</div>
              <br />
              Image of car:
              <div className="w-80 h-80">
                <img
                  src={`${import.meta.env.VITE_FILE_BASE_URL_STORE}${
                    trialCar.carImageFile
                  }`}
                />
              </div>
            </div>

            <div className="w-2/3 grid grid-cols-2 columns-2">
              <div className="w-max mr-10 mb-3 pb-3 px-2 font-medium text-xl space-y-1 border-b-gray-700 border-solid border-b-2">
                <p>
                  Car Brand:{" "}
                  <span className="text-green-400">{trialCar.carBrand}</span>
                </p>

                <p>
                  Car Model:{" "}
                  <span className="text-green-400">{trialCar.carModel}</span>
                </p>

                <p>
                  Car Engine:{" "}
                  <span className="text-green-400">{trialCar.carEngine}</span>
                </p>

                <p>
                  Car Speed:{" "}
                  <span className="text-green-400">{trialCar.carSpeed}</span>
                </p>
                <p>
                  Car Seats:{" "}
                  <span className="text-green-400">{trialCar.carSeats}</span>
                </p>
              </div>
              <div className="w-max ml-10 pl-5 pb-3 font-medium text-xl space-y-1">
                <p>
                  Car Fuel Type:{" "}
                  <span className="text-green-400">{trialCar.carFuelType}</span>
                </p>
                <p>
                  Car Fuel Consume:{" "}
                  <span className="text-green-400">
                    {trialCar.carFuelConsume}
                  </span>
                </p>
              </div>
              <div className="w-max mr-10 pb-3 px-2 font-medium text-xl space-y-1">
                <p>
                  Car Body Type:{" "}
                  <span className="text-green-400">{trialCar.carBodyType}</span>
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
            calendarContainer={MyContainer}
            calendarClassName=" border-green-500 "
            showTimeSelect
            timeIntervals={120}
            dateFormat="MMMM d, yyyy h:mm aa"
            isClearable={true}
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
      <Button href="/Trials/trialUsers/TrialsCarUserPage" className=" mt-64 dark:bg-gray-800 text-white hover:bg-green-600 hover:text-white"
        style={{left:"93%"}}
        
        >
            Back
        </Button>
      <ToastContainer />
    </div>
  );
};

export default App;
