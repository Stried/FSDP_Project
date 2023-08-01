import {
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./../../../App.css";
import http from "../../../http";

import { Field, useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckBox } from "@mui/icons-material";
import CustomSelectCars from "./CustomSelectCars";
import { green } from "@mui/material/colors";
import TextareaAutosize from "@mui/base/TextareaAutosize";

function TrialsReceiptUpdate() {
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const navigate = useNavigate();

  let { id } = useParams();

  const [selectedTrialReceipt, setSelectedTrialReceipt] = useState({
    trialReceiptId: "",
    dateOfTrial: "",
    trialReport: "",
    modelName: "",
    faultResolve: "",
  });

  useEffect(() => {
    http
      .get(`/trials/viewSpecificTrialReceipt/${id}`)
      .then((res) => {
        console.log(res.data);

        setSelectedTrialReceipt(res.data);
        window.location.reload;
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const [selectedValue, setSelectedValue] = React.useState(
    selectedTrialReceipt.faultResolve
  );

  useEffect(() => {
    setSelectedValue(selectedTrialReceipt.faultResolve);
  }, [selectedTrialReceipt.faultResolve]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const formik = useFormik({
    initialValues: selectedTrialReceipt,
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      trialReport: yup.string().trim().max(1000),
    }),
    onSubmit: (data) => {
      const formData = {
        trialReport: data.trialReport.trim(),
        faultResolve: selectedValue,
      };
      http
        .put(`trials/viewAllTrialReceipt/changeDetails/${id}`, formData)
        .then((res) => {
          console.log(res.status);
          navigate("/Trials/trialAdmin/TrialsReceiptAdminPage");
        })
        .catch(function (err) {
          console.log(err);
          toast.error(`${err.response.data.message}`);
        });
    },
  });

  const [selectedRadio, setSelectedRadio] = useState(
    selectedTrialReceipt.faultResolve
  );

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };

  useEffect(() => {
    setSelectedRadio(selectedTrialReceipt.faultResolve);
  }, [selectedTrialReceipt.faultResolve]);

  return (
    <div className="relative min-h-screen text-white">
      <Box component={"div"} className="pl-7">
        <Box>
          <div className="text-white">
            <h1 className="text-green-500 text-3xl pb-3 font-medium italic">
              Update values for Trial Receipt: {selectedTrialReceipt.trialReceiptId}
            </h1>
          </div>
        </Box>
        <Box component={"form"} onSubmit={formik.handleSubmit}>
          <div className="pr-7">
            <br />

            <label>Trial Report</label>

            <TextareaAutosize
              className="w-full text-sm font-normal font-sans leading-5 p-3 rounded-xl rounded-br-none shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-green dark:focus:shadow-outline-green focus:shadow-lg border border-solid border-slate-300 hover:border-green-500 dark:hover:border-green-500 focus:border-green-500 dark:focus:border-green-500 dark:border-white-600 bg-white dark:bg-black text-white-900 dark:text-slate-300 focus-visible:outline-0"
              name="trialReport"
              minRows={4}
              value={formik.values.trialReport}
              onChange={formik.handleChange}
              type="text"
              {...(formik.touched.trialReport && formik.errors.trialReport
                ? { error: true }
                : {})}
              helperText={
                formik.touched.trialReport && formik.errors.trialReport
              }
              placeholder="Empty"
            />

            <br />
            <hr />
            <br />

            <RadioGroup
              key="idk"
              name="faultResolve"
              value={selectedRadio}
              onChange={handleRadioChange}
              className="ml-2"
            >
              <FormControlLabel
                sx={{
                  border: "2px solid",
                  borderColor:
                    selectedRadio === "Resolved" ? green[500] : "#b3b3b3",
                  borderRadius: "4px",
                  padding: "8px",
                  marginBottom: "8px",
                  display: "block",
                }}
                value="Resolved"
                control={
                  <Radio
                    {...controlProps("Resolved")}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                        color: green[600],
                        "&.Mui-checked": {
                          color: green[500],
                        },
                      },
                    }}
                  />
                }
                label="Resolved"
              />

              <FormControlLabel
                sx={{
                  border: "2px solid",
                  borderColor:
                    selectedRadio === "Unresolved" ? green[500] : "#b3b3b3",
                  borderRadius: "4px",
                  padding: "8px",
                  marginBottom: "8px",
                  display: "block",
                }}
                value="Unresolved"
                control={
                  <Radio
                    {...controlProps("Unresolved")}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                        color: green[600],
                        "&.Mui-checked": {
                          color: green[500],
                        },
                      },
                    }}
                  />
                }
                label="Unresolved"
              />
            </RadioGroup>
            <br></br>
            <div>
              <Button
                variant="contained"
                type="submit"
                className="bg-green-400 text-black hover:bg-green-600 hover:text-white"
              >
                Upload Report
              </Button>
            </div>
          </div>
        </Box>
      </Box>
      <Button
        href="/Trials/trialAdmin/TrialsReceiptAdminPage"
        className=" mt-28 dark:bg-gray-800 text-white hover:bg-green-600 hover:text-white"
        style={{ left: "93%" }}
      >
        Back
      </Button>
    </div>
  );
}

export default TrialsReceiptUpdate;
