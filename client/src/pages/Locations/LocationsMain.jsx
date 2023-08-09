import { Box } from "@mui/material";
import {
    BrowserRouter as Router,
    Link,
    useNavigate,
} from "react-router-dom";
import React, { useRef, useEffect, useState, useContext } from "react";
import { Button } from "flowbite-react";
import http from "./../../http";
import "./../../App.css";
import UserContext from "./../../contexts/UserContext";
import { Map, Marker } from "pigeon-maps";

function EditCharger(props) {
    const navigate = useNavigate()
    const isAdmin = props.isAdmin
    const id = props.postalCode
    if (isAdmin) {
        return (
            <Button
                className="text-xs"
                onClick={() =>
                    navigate(`/locations/editLocations/${id}`)
                }
            >
                Edit
            </Button>
        )
    }
}

function AddCharger(props) {
    const isAdmin = props.isAdmin
    const id = props.id
    if (isAdmin) {
        return (
            <Link to={`/Location/CreateLocation/`}>
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
        <Box className="mx-10 items-center">
            <h1 className="text-4xl font-bold mt-8 mb-6 text-white text-center">
                Locations
            </h1>
            <div className="mb-4 flex justify-center items-center">
                {(user && <AddCharger isAdmin={user.adminNo} />)}
            </div>
            <div className="max-w-screen mx-auto grid grid-cols-2 gap-4">
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
                                    {(user && <EditCharger isAdmin={user.adminNo} postalCode={location.postalCode} />)}
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