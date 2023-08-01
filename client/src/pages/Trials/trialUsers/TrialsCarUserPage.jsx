import { Box, IconButton } from "@mui/material";
import {Search,Clear} from "@mui/icons-material";
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

import http from "../../../http";
import { ToastContainer, toast } from "react-toastify";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
const App = () => {
  const [trialCarList, setTrialCarList] = useState([]);
  const getTrialCar = () => {
    http.get("/trials/viewTrialCar").then((res) => {
      setTrialCarList(res.data);
    });
  };

  useEffect(() => {
    getTrialCar();
  }, []);

  
  const fadeInProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 }, // Adjust the duration as needed
  });

  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const searchTrialCar = () => {
    http.get(`/trials/userview/viewTrialCar?search=${search}`).then((res) => {
      setTrialCarList(res.data);
    });
  };
  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchTrialCar();
    }
  };

  const onClickSearch = () => {
    searchTrialCar();
  };
  const onClickClear = () => {
    setSearch("");
    getTrialCar();
  };

  return (
    <div className="relative min-h-screen">
      <h1 className="text-center text-5xl text-green-400">
        Trial Car User Page
      </h1>
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
      </Box>
      <br></br>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-7 ml-16">
        <div class="flex flex-wrap w-100 h-100">
          {trialCarList.map((trialCar, i) => {
            return (
                <animated.div style={fadeInProps} key={i} className="p-5 w-96">
              <div class="p-5 w-96">
                <div class="max-w-sm bg-white border  transition duration-300  border-gray-200 rounded-sm dark:bg-gray-800 hover:shadow-green-500 shadow-3xl ease-out dark:border-gray-700">
                  <a href="#">
                  </a>
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Model: {trialCar.name}
                      </h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Brand: {trialCar.carBrand}
                      <br />
                      Address: {trialCar.address}
                    </p>

                    <Link
                      to={`/Trials/trialUsers/TrialsReceiptCreation/${trialCar.carPlateNo}`}
                      className="bg-green-400 p-2 px-5 rounded-md text-black hover:bg-green-600 hover:text-white "
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
              </animated.div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
