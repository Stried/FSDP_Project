import { Box, IconButton} from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import {Search,Clear} from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { format } from 'date-fns';
import * as React from "react";
("use client");

import http from "./../../../http";
import { ToastContainer, toast } from "react-toastify";
import FormInputSingleLine from "./../../../components/FormInputSingleLine";
import { useFormik } from "formik";
import * as yup from "yup";

const App = () => {
  const [trialReceiptList, setTrialReceiptList] = useState([]);
  const getTrialReceipt = () => {
    http.get("/trials/viewAllTrialReceipt").then((res) => {
      setTrialReceiptList(res.data);
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
    const sortedList = [...trialReceiptList];
    sortedList.sort((a, b) => {
      if (direction === "asc") {
        return a[field].localeCompare(b[field], undefined, { numeric: true });
      } else {
        return b[field].localeCompare(a[field], undefined, { numeric: true });
      }
    });
    setTrialReceiptList(sortedList);
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

  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const searchTrialReceipt = () => {
    http.get(`/trials/viewAllTrialReceipt?search=${search}`).then((res) => {
      setTrialReceiptList(res.data);
    });
  };
  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchTrialReceipt();
    }
  };

  const onClickSearch = () => {
    searchTrialReceipt();
  };
  const onClickClear = () => {
    setSearch("");
    getTrialReceipt();
  };

  useEffect(() => {
    getTrialReceipt();
  }, []);

  useEffect(() => {
    getTrialReceipt();
  }, []);

  return (
    <div className="relative min-h-screen">
      <Box>
        <div className="dark:text-white text-black text-lg font-medium mx-4">
          <input
            value={search}
            placeholder="Search"
            className="text-white bg-transparent px-2 mr-3"
            onChange={onSearchChange}
            onKeyDown={onSearchKeyDown}
          />
          <IconButton
            color=""
            className="dark:text-green-500 text-sky-400"
            onClick={onClickSearch}
          >
            <Search />
          </IconButton>
          <IconButton
            color=""
            className="dark:text-green-500 text-sky-400"
            onClick={onClickClear}
          >
            <Clear />
          </IconButton>
        </div>

        <h1 className="text-center text-5xl text-green-400">
          Trial Receipt Records
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
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
                <th className="pl-20"><div onClick={onUnsortClick} className="w-5 h-5 cursor-pointer"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2.99988C16.9706 2.99988 21 7.02931 21 11.9999C21 16.9704 16.9706 20.9999 12 20.9999C7.02944 20.9999 3 16.9704 3 11.9999C3 9.17261 4.30367 6.64983 6.34267 4.99988" stroke="#292929" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M3 4.49988H7V8.49988" stroke="#292929" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></g></svg></div></th>
              </tr>
            </thead>
            <tbody>
              {trialReceiptList.map((trialReceipt, i) => {
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
        </div>
        <ToastContainer />
      </Box>
    </div>
  );
};

export default App;
