import { Box, Button } from "@mui/material";
import {
    Link,
    useNavigate,
} from "react-router-dom";
import React, { useRef, useEffect, useState, useContext } from "react";
import http from "./../../http";
import "./../../App.css";
import UserContext from "./../../contexts/UserContext";

function ToggleLocations(props) {
    const navigate = useNavigate();
    const isAdmin = props.isAdmin;
    const id = props.postalCode;
    const { user } = useContext(UserContext);
    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        http.get("locations/LocationsMain").then((res) => {
            setLocationList(res.data);
        });
    }, []);

    return (
        <Box className="mx-10 items-center">
            <h1 className="text-4xl font-bold mt-8 mb-6 text-white text-center">
                Toggle Chargers
            </h1>
            <div className="max-w-screen mx-auto">
                {locationList.map((location, key) => {
                    return (
                        <div key={key} className="bg-gray-200 p-4 rounded-lg mb-4 flex">
                            <div className="flex-grow">
                                <h2 className="text-xl font-semibold mb-2">
                                    {location.locationName}
                                </h2>
                                <p className="text-wrap">
                                    {location.streetName}
                                </p>
                                <p className="text-wrap">
                                    Singapore {location.postalCode}
                                </p>
                                <p className="text-wrap">
                                    Number of Chargers: {location.noOfChargers}
                                </p>
                                <p className="text-wrap">
                                    {location.description}
                                </p>
                            </div>
                            <div className="flex items-center">
                                {/* Add Toggle button */}
                                <Button className="ml-2">Toggle</Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Box>
    );
}

export default ToggleLocations;
