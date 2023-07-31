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
("use client");

import http from "./../../../http";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
    const { id } = useParams();

 
    const [trialCarEntry, setTrialCarEntry] = useState({
        address:""
    })

    const [ trialCar, setTrialCar ] = useState({
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




    const editTrialCar = (id) => {
        navigate(`/Trials/trialAdmin/TrialsCarAdminUpdate/${id}`);
    };

    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen text-white">
           
                <h1 className="text-center text-5xl text-green-400">
                    Trial Car Records
                </h1>
                <br></br>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-7 ml-16 flex">
                    <Grid item xs={ 12 } md={ 6 } lg={ 6 } key={ trialCar.carPlateNo }>
                        <div className="text-3xl font-semibold float-left w-1/3 h-max">
                            { trialCar.carPlateNo }
                            <br />
                            <div className="text-xl font-medium float-left">
                                { trialCar.carDescription }
                            </div>
                            <br />
                            <div className="text-xl font-medium float-left">
                                Location:
                                {trialCar.address}
                            </div>
                            <br />
                            <div>
                                IMAGE HERE
                            </div>
                        </div>

                        <div className="w-2/3 grid grid-cols-2 columns-2">
                            <div className="w-max mr-10 mb-3 pb-3 px-2 font-medium text-xl space-y-1 border-b-gray-700 border-solid border-b-2">
                                <p>
                                    Car Brand: <span className="text-green-400">{ trialCar.carBrand }</span>
                                </p>
                               
                                <p>
                                    Car Model: <span className="text-green-400">{ trialCar.carModel }</span>
                                </p>
                                
                                <p>
                                    Car Engine: <span className="text-green-400">{ trialCar.carEngine }</span>
                                </p>
                                
                                <p>
                                    Car Speed: <span className="text-green-400">{ trialCar.carSpeed }</span>
                                </p>
                                <p>
                                    Car Seats: <span className="text-green-400">{ trialCar.carSeats }</span>
                                </p>
                            </div>
                            <div className="w-max ml-10 pl-5 pb-3 font-medium text-xl space-y-1">
                                <p>
                                    Car Fuel Type: <span className="text-green-400">{ trialCar.carFuelType }</span>
                                </p>
                                <p>
                                    Car Fuel Consume: <span className="text-green-400">{ trialCar.carFuelConsume }</span>
                                </p>
                            </div>
                            <div className="w-max mr-10 pb-3 px-2 font-medium text-xl space-y-1">
                                <p>
                                    Car Body Type: <span className="text-green-400">{ trialCar.carBodyType }</span>
                                </p>
                                <p>
                                    Car Length: <span className="text-green-400">{ trialCar.carLength }</span>
                                </p>
                                <p>
                                    Car Width: <span className="text-green-400">{ trialCar.carWidth }</span>
                                </p>
                                <p>
                                    Car Height: <span className="text-green-400">{ trialCar.carHeight }</span>
                                </p>
                            </div>
                            
                        </div>

                        
                    </Grid>

                </div>
            <ToastContainer />
        </div>
    );
};

export default App;
