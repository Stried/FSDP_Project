import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    Box,
    Grid,
    CardContent,
    Input,
    IconButton,
    Card,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import React, { useRef, useEffect, useState, useContext } from "react";
import { Button, Modal, Checkbox, Label, TextInput } from "flowbite-react";
import http from "./../../http";
import "./../../App.css";

import * as Constants from "./../../../src/components/CSS Constants/Constants";
import UserContext from "./../../contexts/UserContext";

import { Map, Marker } from "pigeon-maps";


function IsAdmin(props) {
    const isAdmin = props.isAdmin
    const id = props.id
    if (isAdmin) {
        return (
            <Link to={`/Location/EditLocation/${id}`}>
                <Button
                    className="text-xs"
                    onClick={() =>
                        navigate()
                    }
                >
                    Edit
                </Button>
            </Link>
        )
    }
}

function AddCharger(props) {
    const isAdmin = props.isAdmin
    const id = props.id
    if (isAdmin) {
        return (
            <Link to={`/Location/CreateLocation/${id}`}>
                <Link to="/locations/createLocation">
                    <Button className="">Add Charger</Button>
                </Link>
            </Link>
        )
    }
}

function LocationsMain() {
    const { user } = useContext(UserContext); 
    const navigate = useNavigate();
    const color = `hsl(0, 100%, 50%)`;
    const [openModal, setOpenModal] = useState("");
    const EditLocationRef = useRef < HTMLInputElement > null;
    const props = { openModal, setOpenModal, EditLocationRef };
    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        http.get("locations/LocationsMain").then((res) => {
            setLocationList(res.data);
        });
    }, [])

    return (
        <Box className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mt-8 mb-6 text-white">
                Locations
            </h1>
            <div className="mb-4 flex justify-center items-center">
                {(user && <AddCharger isAdmin={user.adminNo} />)}
            </div>
            <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4">
                {locationList.map((location, key) => {
                    return (
                        <div className='text-black'>
                            <div className="bg-gray-200 p-4 rounded-lg mb-4">
                                <h2 className="text-xl font-semibold mb-2">
                                    {location.locationName}
                                </h2>
                                <p className="text-wrap">
                                    {location.description}
                                </p>
                                <div className="mx-auto pt-2">
                                    <Map
                                        height={300}
                                        defaultCenter={[location.LatAxis, location.LongAxis]}
                                        defaultZoom={17}
                                    >
                                        <Marker
                                            width={40}
                                            color={color}
                                            anchor={[location.LatAxis, location.LongAxis]}
                                        />
                                    </Map>
                                    {(user && <IsAdmin isAdmin={user.adminNo} />)}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </Box>
    );
}

export default LocationsMain;