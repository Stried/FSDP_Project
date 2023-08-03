import {
    Box
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./../../App.css";
import http from "../../http";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../contexts/UserContext";

function AdminUpdate(props) {
    const isAdminUpdate = props.isAdminUpdate;
    const id = props.id
    if (isAdminUpdate) {
        return (
            <Link to={`/Store/StoreUpdateItem/${id}`} className="flex justify-center">
                <button type='button' className='w-max | text-white hover:text-black | dark:hover:bg-gradient-to-b from-red-400 to-red-600 | border-white dark:border-red-800 border-solid border-2 rounded hover:ease-in-out duration-200 | font-semibold text-xl | mx-4 m-10 px-2 py-1 | float-right inline'>Update vehicle</button>
            </Link>
        )
    }
}

function StoreSpecific() {
    const { user } = useContext(UserContext);
    
    const { id } = useParams();

    const [store, setStore] = useState({
        carPlateNo: "",
        carDescription: "",
        carPrice: "",
        carBrand: "",
        carModel: "",
        carEngine: "",
        carSpeed: "",
        carFuelType: "",
        carFuelConsume: "",
        carProductionDate: "",
        carBodyType: "",
        carColor: "",
        carSeats: "",
        carLength: "",
        carWidth: "",
        carHeight: "",
        isModified: false,
        carMods: "None"
    });

    useEffect(() => {
        http.get(`/store/viewStoreItem/${id}`).then((res) => {
            setStore(res.data);
        });
    }, []);

    return (
        <Box>
            <div className="flex bg-zinc-800 rounded m-auto">
                <div className="m-7">
                    <img src={`${import.meta.env.VITE_FILE_BASE_URL_STORE
                        }${store.carImageFile}`}
                        className="w-96 h-80 m-0 border rounded-md"/>
                </div>
                <div className="text-white m-5 p-5">
                    <div className="text-4xl mb-3">
                        ${store.carPrice.toLocaleString()}
                    </div>
                    <div className="text-xl bg-black rounded-md p-5 mb-5">
                        Car Plate Number: {store.carPlateNo}
                        <br />
                        {store.carBrand},  {store.carModel}
                    </div>
                    <button className="mt-10 p-3 border rounded font-bold hover:bg-slate-50 hover:text-black transition-colors">
                        Buy Now
                    </button>
                    <button className="ml-5 p-3 border rounded hover:bg-slate-50 hover:text-black transition-colors">
                        Schedule Viewing
                    </button>
                    {(user && <AdminUpdate isAdmin={user.adminNo}/>)}
                </div>
            </div>
            <div className="text-white">
                <div className="text-center text-4xl m-7">
                    Vehicle Overview
                </div>
                <div>
                    <div className="grid grid-cols-2 mb-10">
                        <div className="">
                            <span className="text-3xl">
                                Car Specification
                            </span>
                            <span className="p-3 mt-5 bg-zinc-800 rounded flex">
                                Car Brand: {store.carBrand}
                                Car Model: {store.carModel} <br />
                                Car Engine: {store.carEngine} <br />
                                Car Speed (km/h): {store.carSpeed} <br />
                                Car Fuel Type: {store.carFuelType} <br />
                                Car Fuel Consumption: {store.carFuelConsume} <br />
                                Car Mods: {store.carMods}
                            </span>
                        </div>
                        <div className="pl-5">
                            <span className="text-3xl">
                                Car Descriptions and Dimensions
                            </span>
                            <span className="p-3 mt-5 bg-zinc-800 rounded flex">
                                Car Body Type: {store.carBodyType} <br />
                                Car Color: {store.carColor} <br />
                                Car Seats: {store.carSeats} <br />
                                Car Length: {store.carLength}mm <br />
                                Car Width: {store.carWidth}mm <br />
                                Car Height: {store.carHeight}mm <br />
                            </span>
                        </div>
                    </div>

                </div>

            </div>

        </Box>
    )
}

export default StoreSpecific