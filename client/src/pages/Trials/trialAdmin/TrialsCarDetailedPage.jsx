import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import * as React from "react";
import CanvasJSReact from '@canvasjs/react-charts';
import { format, startOfMonth } from 'date-fns';
("use client");

import http from "./../../../http";
import { ToastContainer, toast } from "react-toastify";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const App = () => {
  const { id } = useParams();

  const [trialCarEntry, setTrialCarEntry] = useState({
    address: "",
  });

  const [trialReceiptEntries, settrialReceiptEntries] = useState([]);
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
    http.get(`/trials/viewTrialCar/${id}`).then((res) => {
      setTrialCar(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    http.get(`/trials/viewSpecificTrialCar/${id}`).then((res) => {
      setTrialCarEntry(res.data);
      console.log(res.data);
    });
  }, []);

  const getTrialReceipt = () => {
    http.get(`trials/viewTrialCarReceipt/${id}`).then((res) => {
      settrialReceiptEntries(res.data);
    });
  };




  const [sortField, setSortField] = useState("carPlateNo"); // Default sort field is "carPlateNo"
  const [sortDirection, setSortDirection] = useState("asc"); // Default sort direction is "asc"

  const sortTrialReceipt = (field, direction) => {
    const sortedList = [...trialReceiptEntries];
    sortedList.sort((a, b) => {
      if (direction === "asc") {
        return a[field].localeCompare(b[field], undefined, { numeric: true });
      } else {
        return b[field].localeCompare(a[field], undefined, { numeric: true });
      }
    });
    settrialReceiptEntries(sortedList);
  };

  const onSortChange = (field) => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
    sortTrialReceipt(field, newDirection);
  };

  const onUnsortClick = () => {
    setSortField("carPlateNo");
    setSortDirection("asc");
    getTrialReceipt(); 
  };

  const filterFinishedReceipts = (receipts) => {
    return receipts.filter((receipt) => receipt.trialStatus === "Finished");
  };

  const finishedReceipts=filterFinishedReceipts(trialReceiptEntries)

  const graphDataArray = [];

finishedReceipts.forEach(receipt => {
  const date = new Date(receipt.dateOfTrial);
  const monthYear = format(date, 'MMM yyyy'); // Format: "Aug 2023"

  const existingData = graphDataArray.find(data => data.x.getTime() === date.getTime());

  if (existingData) {
    existingData.y++;
  } else {
    graphDataArray.push({
      x: date,
      y: 1,
    });
  }
});

const maxDataPoints = 10; // Define the maximum number of data points to display
const step = Math.ceil(graphDataArray.length / maxDataPoints);

const filteredDataPoints = graphDataArray.filter((point, index) => index % step === 0);



const graphOptions = {
  theme: 'light2',
  animationEnabled: true,
  title: {
    text: 'Finished Trial Receipts Over Time',
  },
  axisX: {
    title: 'Date of Trial Receipt',
    valueFormatString: 'MMM YYYY', // Format for x-axis labels (Month abbreviation)
  },
  axisY: {
    title: 'Number of Finished Receipts',
  },
  data: [
    {
      type: 'line',
      dataPoints: graphDataArray,
    },
  ],
};

  useEffect(() => {
    getTrialReceipt();
  }, []);


  return (
    <div className="relative min-h-screen text-white">
      <h1 className="text-center text-5xl text-green-400">Trial Car Records</h1>
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
              {trialCar.address}
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
      
      <h1 className="text-center text-5xl text-green-400">
         Model Trial Receipt Records
        </h1>
        <br></br>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-7 ml-16">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-green-400 dark:bg-green-500 dark:text-black">
              <tr>
                <th scope="col" onClick={() => onSortChange("modelName")} class="px-6 py-3">
                <div class="flex items-center">
                    Trial Car Model
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>

                </th>
                <th scope="col" onClick={() => onSortChange("dateOfTrial")} class="px-6 py-3">
                  <div class="flex items-center">
                    Date of Trial
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" onClick={() => onSortChange("faultResolve")} class="px-6 py-3">
                  <div class="flex items-center">
                    Fault
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" onClick={() => onSortChange("emailAccount")} class="px-6 py-3">
                <div class="flex items-center">
                  Email
                  <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                    </div>
                </th>
                <th scope="col" onClick={() => onSortChange("trialStatus")} class="px-6 py-3">
                <div class="flex items-center">
                  Status
                  <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                    </div>
                </th>
                <th></th>
                <th className="pl-20"><div onClick={onUnsortClick} className="w-5 h-5 cursor-pointer"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2.99988C16.9706 2.99988 21 7.02931 21 11.9999C21 16.9704 16.9706 20.9999 12 20.9999C7.02944 20.9999 3 16.9704 3 11.9999C3 9.17261 4.30367 6.64983 6.34267 4.99988" stroke="#292929" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M3 4.49988H7V8.49988" stroke="#292929" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></g></svg></div></th>
              </tr>
            </thead>
            <tbody>
              {trialReceiptEntries.map((trialReceipt, i) => {
                              const formattedDate = format(new Date(trialReceipt.dateOfTrial), 'yyyy-MM-dd');
                              const formattedTime = format(new Date(trialReceipt.dateOfTrial), 'ha');
                
                const isReportEmpty =
                  trialReceipt.trialReport === "";
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {trialReceipt.modelName}
                    </th>
                    <td class="px-6 py-4">{formattedDate} : {formattedTime}</td>
                    <td class="px-6 py-4">
                      {trialReceipt.faultResolve}
                    </td>
                    <td class="px-6 py-4">
                      {trialReceipt.emailAccount}
                    </td>
                    <td class="px-6 py-4">
                      {trialReceipt.trialStatus}
                    </td>
                    <td class="pr-0 py-4 text-right">
                      <Link
                        to={`/Trials/trialAdmin/TrialsReceiptReportPage/${trialReceipt.trialReceiptId}`}
                        className={`bg-green-400 p-2 px-5 rounded-md text-black hover:bg-green-600 hover:text-white `}
                      >
                        {isReportEmpty ? "Write Report" : "Read Report"}
                      </Link>
                    </td>
                    <td class="pl-0 pr-4 py-4 text-right">
                      <a
                        onClick={() =>
                          deleteTrialReceipt(`${trialReceipt.trialReceiptId}`)
                        }
                        href="#"
                        className="bg-red-400 p-2 px-5 rounded-md text-black hover:bg-red-600 hover:text-white "
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
<br />
<div className="mt-5">
        <CanvasJSChart options={graphOptions} />
      </div>
<br />
        </div>
      <Button href="/Trials/trialAdmin/TrialsCarAdminPage" className="  dark:bg-gray-800 text-white hover:bg-green-600 hover:text-white"
        style={{left:"93%", marginTop:"50px"}}
        >
            Back
            
        </Button>
        <br />
        <br />
      <ToastContainer />
    </div>
  );
};

export default App;
