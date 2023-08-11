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
  const deleteTrialReceipt = (trialReceiptId) => {
    http
      .delete(`/trials/trialreceipt/${trialReceiptId}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err);
        toast.error(`${err.response.data.message}`);
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
  const monthYear = format(date, 'MMM yyyy'); 

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

const maxDataPoints = 10; 
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
    valueFormatString: 'MMM YYYY', 
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
  console.log("trialReceiptEntries:", trialReceiptEntries);

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
                <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                    Trial Car Model

                  </div>

                </th>
                <th 
                scope="col" 
                
                class="px-6 py-3"
                >
                  <div class="flex items-center">
                    Date of Trial

                  </div>
                </th>
                <th scope="col"  class="px-6 py-3">
                  <div class="flex items-center">
                    Fault
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Email
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Status
                    </div>
                </th>
                <th></th>
                <th className="pl-20"></th>
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
<div className="chart-container w-11/12 mt-10">
      {finishedReceipts.length === 0 ? (
        <p className="text-center text-gray-500">No data available to display for the graph.</p>
      ) : (
        <CanvasJSChart options={graphOptions} />
      )}
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
