import { Box } from "@mui/material";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    useNavigate,
} from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./../../App.css";
import http from "../../http";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../contexts/UserContext";
import StoreUpdateItem from "./StoreUpdateItem";
import { AiOutlineUser } from "react-icons/ai";
import DefaultImage from './../../../DefaultImage';

function AdminUpdate(props) {
    const isAdmin = props.isAdmin;

    const { id } = useParams();

    if (isAdmin) {
        return (
            <Link
                to={`/Store/StoreUpdateItem/${id}`}
                className="inline-flex"
            >
                <button
                    type="button"
                    className="w-max | text-white hover:text-black | dark:hover:bg-gradient-to-b from-red-400 to-red-600 | border-white dark:border-red-800 border-solid border-2 rounded hover:ease-in-out duration-200 | font-semibold text-xl | mx-4 m-10 px-2 py-1 | float-right inline"
                >
                    Update vehicle
                </button>
            </Link>
        );
    }
}

function StoreSpecific() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

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
        carMods: "",
        soldBy: "",
    });

    const [storeList, setStoreList] = useState([]);
    useEffect(() => {
        http.get(`/store/viewStore?search=${store.carFuelType}`).then((res) => {
            const updatedStoreList = res.data
            .filter(element => element.carPlateNo !== store.carPlateNo)
            .slice(0, 2);
        setStoreList(updatedStoreList);
            });
        }, []);

    useEffect(() => {
        http.get(`/store/viewStoreItem/${id}`).then((res) => {
            if (res.data.carMods == "") {
                res.data.carMods = "None";
            }
            setStore(res.data);
        });
    }, []);

    const [userInfo, setUserInfo] = useState({
        fullName: "",
        emailAccount: "",
    });

    useEffect(() => {
        http.get("/user/viewAccount").then((res) => {
            setUserInfo(res.data);
        });
    }, []);

    const handleClick = () => {
        setTimeout(() => {
            window.location.reload();
        });
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const navUserPage = (soldBy) => {
        console.log(soldBy)
        http.get(`/user/getUserByFullName/${soldBy}`)
            .then((res) => {
                console.log("HELLO " + store.soldBy)
                navigate(`/user/${res.data.userName}`);
            })
            .catch(function (err) {
                console.log(err);
            })
        
        
    }

    return (
        <Box>
            <div className="flex bg-zinc-800 rounded m-auto">
                <div className="m-7">
                    <DefaultImage
                        className="w-96 h-80 m-0 border rounded-md"
                        src={`${import.meta.env.VITE_FILE_BASE_URL_STORE}${
                            store.carImageFile
                        }`}
                    />
                </div>
                <div className="text-white m-5 p-5">
                    <div className="text-4xl mb-5">
                        ${store.carPrice.toLocaleString()}
                    </div>
                    <div className="text-xl bg-black rounded-md p-5">
                        Car Plate Number: {store.carPlateNo}
                        <br />
                        {store.carBrand}, {store.carModel}
                        <br />
                        Sold By: {store.soldBy}
                    </div>
                    <div className="-mb-10">
                        {userInfo.fullName != store.soldBy && (
                            <div className="">
                                <Link to={`/Store/StoreReceiptCreate/${id}`}>
                                    <button className="mt-5 mr-4 px-2 py-1 border rounded transition-colors text-white hover:text-black dark:hover:bg-gradient-to-b from-slate-50 to-slate-400 border-black dark:border-white border-solid border-2 rounded hover:ease-in-out duration-200 font-semibold text-xl ">
                                        Buy Now
                                    </button>
                                </Link>
                                <button onClick={() => {navUserPage(store.soldBy)}} className="mt-5 mr-4 px-2 py-1 border rounded transition-colors text-white hover:text-black dark:hover:bg-gradient-to-b from-slate-50 to-slate-400 border-black dark:border-white border-solid border-2 rounded hover:ease-in-out duration-200 font-semibold text-xl ">
                                    View User Account
                                </button>
                            </div>
                        )}
                        {userInfo.fullName == store.soldBy && (
                            <Link to={`/Store/StoreUpdateItem/${id}`}>
                                <button className="mt-5 mr-4 px-2 py-1 border rounded transition-colors text-white hover:text-black dark:hover:bg-gradient-to-b from-slate-50 to-slate-400 border-black dark:border-white border-solid border-2 rounded hover:ease-in-out duration-200 font-semibold text-xl ">
                                    Edit
                                </button>
                            </Link>
                        )}

                        {user && <AdminUpdate isAdmin={user.adminNo} />}
                    </div>
                </div>
            </div>
            <div className="text-white">
                <div className="text-center text-4xl m-7">Vehicle Overview</div>
                <div>
                    <div className="grid grid-cols-2 mb-10">
                        <div className="">
                            <span className="text-3xl">Car Specification</span>
                            <span className="p-3 mt-5 bg-zinc-800 rounded flex">
                                Car Brand: {store.carBrand} <br />
                                Car Model: {store.carModel} <br />
                                Car Engine: {store.carEngine} <br />
                                Car Speed: {store.carSpeed}km/h <br />
                                Car Fuel Type: {store.carFuelType} <br />
                                Car Fuel Consumption: {
                                    store.carFuelConsume
                                }kw/h <br />
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
            <div>
                <div className="text-white text-4xl">
                    Still Can't Decide? You May Also Like These!
                </div>
                <div className="grid grid-cols-2 mx-10 gap-x-5 mb-10">
                    {storeList.map((store, i) => {
                        return (
                            <div className="text-white shadow-lg bg-slate-800 pt-2 my-2 group border-2 border-transparent border-solid hover:border-green-500 duration-300 hover:ease-in-out">
                                <Link
                                    onClick={handleClick}
                                    to={`/Store/StoreSpecific/${store.carPlateNo}`}
                                >
                                    <div className="pt-3">
                                        <DefaultImage
                                            className="text-2xl font-medium px-5 w-fit h-80 m-auto"
                                            src={`${
                                                import.meta.env
                                                    .VITE_FILE_BASE_URL_STORE
                                            }${store.carImageFile}`}
                                        />
                                        <div className="mx-5 my-2 p-3 bg-black/60">
                                            <p className="text-2xl font-medium pt-5">
                                                {store.carBrand}{" "}
                                                {store.carModel}
                                            </p>
                                            <p className="text-xl">
                                                $
                                                {store.carPrice.toLocaleString()}
                                            </p>
                                            <p>
                                                Production:{" "}
                                                {store.carProductionDate}
                                            </p>
                                            <p className="flex pt-3 pb-2">
                                                <AiOutlineUser className="mt-1" />{" "}
                                                <span className="pl-1 text-green-400">
                                                    <a href="/user/MuelMuel">
                                                        {store.emailAccount}
                                                    </a>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Routes>
                <Route
                    path={"/StoreUpdateItem/:id"}
                    element={<StoreUpdateItem />}
                />
            </Routes>
        </Box>
    );
}

export default StoreSpecific;
