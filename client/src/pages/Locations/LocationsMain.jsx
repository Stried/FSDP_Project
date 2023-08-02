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
import React, { useRef, useEffect, useState } from "react";
import { Button, Modal, Checkbox, Label, TextInput } from "flowbite-react";
import http from "./../../http";
import "./../../App.css";

import * as Constants from "./../../../src/components/CSS Constants/Constants";
import UserContext from "./../../contexts/UserContext";

import { Map, Marker } from "pigeon-maps";

function LocationsMain() {
    const color = `hsl(0, 100%, 50%)`;
    const [openModal, setOpenModal] = useState("");
    const EditLocationRef = useRef < HTMLInputElement > null;
    const props = { openModal, setOpenModal, EditLocationRef };

    return (
        <Box>
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mt-8 mb-6 text-white">
                    Locations
                </h1>
                <div className="mb-4 flex justify-center items-center">
                    <Link to="/locations/createLocation">
                        <Button className="">Add Charger</Button>
                    </Link>
                </div>

                <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4">
                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Charger 1 - Hougang
                        </h2>
                        <p className="text-wrap">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <div className="mx-auto pt-2">
                            <Map
                                height={300}
                                defaultCenter={[1.3759366, 103.878986]}
                                defaultZoom={17}
                            >
                                <Marker
                                    width={40}
                                    color={color}
                                    anchor={[1.3759366, 103.878986]}
                                />
                            </Map>
                            <Button
                                className="text-xs"
                                onClick={() =>
                                    props.setOpenModal("form-elements")
                                }
                            >
                                Edit
                            </Button>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Charger 2 - Sengkang
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <div className="mx-auto pt-2">
                            <Map
                                height={300}
                                defaultCenter={[
                                    1.391794253314477, 103.8946747593317,
                                ]}
                                defaultZoom={17}
                            >
                                <Marker
                                    width={40}
                                    color={color}
                                    anchor={[
                                        1.391794253314477, 103.8946747593317,
                                    ]}
                                />
                            </Map>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Charger 3 - Yio Chu Kang
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <div className="mx-auto pt-2">
                            <Map
                                height={300}
                                defaultCenter={[
                                    1.3838608875619876, 103.87702488676204,
                                ]}
                                defaultZoom={17}
                            >
                                <Marker
                                    width={40}
                                    color={color}
                                    anchor={[
                                        1.3838608875619876, 103.87702488676204,
                                    ]}
                                />
                            </Map>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Charger 4 - Ang Mo Kio
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <div className="mx-auto pt-2">
                            <Map
                                height={300}
                                defaultCenter={[
                                    1.3773398962971761, 103.86640986410745,
                                ]}
                                defaultZoom={17}
                            >
                                <Marker
                                    width={40}
                                    color={color}
                                    anchor={[
                                        1.3773398962971761, 103.86640986410745,
                                    ]}
                                />
                            </Map>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Charger 5 - Tampines
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <div className="mx-auto pt-2">
                            <Map
                                height={300}
                                defaultCenter={[
                                    1.3737872449775959, 103.9426749219287,
                                ]}
                                defaultZoom={17}
                            >
                                <Marker
                                    width={40}
                                    color={color}
                                    anchor={[
                                        1.3737872449775959, 103.9426749219287,
                                    ]}
                                />
                            </Map>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Charger 6 - Bukit Timah
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <div className="mx-auto pt-2">
                            <Map
                                height={300}
                                defaultCenter={[
                                    1.3312098699919162, 103.7991151209977,
                                ]}
                                defaultZoom={17}
                            >
                                <Marker
                                    width={40}
                                    color={color}
                                    anchor={[
                                        1.3312098699919162, 103.7991151209977,
                                    ]}
                                />
                            </Map>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Charger 7 - Bishan
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <div className="mx-auto pt-2">
                            <Map
                                height={300}
                                defaultCenter={[
                                    1.3596830291773792, 103.83989932095439,
                                ]}
                                defaultZoom={17}
                            >
                                <Marker
                                    width={40}
                                    color={color}
                                    anchor={[
                                        1.3596830291773792, 103.83989932095439,
                                    ]}
                                />
                            </Map>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Charger 8 - Seletar
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <div className="mx-auto pt-2">
                            <Map
                                height={300}
                                defaultCenter={[
                                    1.420332721937346, 103.86357894837764,
                                ]}
                                defaultZoom={17}
                            >
                                <Marker
                                    width={40}
                                    color={color}
                                    anchor={[
                                        1.420332721937346, 103.86357894837764,
                                    ]}
                                />
                            </Map>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={props.openModal === "form-elements"}
                size="md"
                popup
                onClose={() => props.setOpenModal(undefined)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Edit Location
                        </h3>
                        <div>
                            <div className="block">
                                <Label
                                    htmlFor="locationName"
                                    value="Location Name"
                                />
                            </div>
                            <TextInput
                                id="locationName"
                                placeholder="Hougang Mall"
                                required
                            />
                        </div>
                        <div>
                            <div className="block">
                                <Label
                                    htmlFor="streetName"
                                    value="Street Name"
                                />
                            </div>
                            <TextInput
                                id="streetName"
                                placeholder="Hougang Street Ave 1"
                                required
                            />
                        </div>
                        <div>
                            <div className="block">
                                <Label
                                    htmlFor="postalCode"
                                    value="Postal Code"
                                />
                            </div>
                            <TextInput
                                id="postalCode"
                                placeholder="686731"
                                required
                            />
                        </div>
                        <div class="flex">
                            <div class="flex flex-col">
                                <div class="block">
                                    <Label
                                        htmlFor="latAxis"
                                        value="Latitude"
                                    />
                                </div>
                                <div class="flex">
                                    <TextInput
                                        id="latAxis"
                                        placeholder="1.100312981279"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="flex flex-col ml-2">
                                <div class="block">
                                    <Label
                                        htmlFor="longAxis"
                                        value="Longitude"
                                    />
                                </div>
                                <div class="flex">
                                    <TextInput
                                        id="longAxis"
                                        placeholder="1.23612981029344"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="block">
                                <Label
                                    htmlFor="region"
                                    value="Region"
                                />
                            </div>
                            <select
                                id="Region"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500'
                                     focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600
                                      dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected>Choose a region</option>
                                <option value="N">North</option>
                                <option value="S">South</option>
                                <option value="E">East</option>
                                <option value="W">West</option>
                            </select>
                        </div>
                        <div>
                            <div className="block">
                                <Label
                                    htmlFor="noOfChargers"
                                    value="Number of Chargers"
                                />
                            </div>
                            <TextInput
                                id="noOfChargers"
                                placeholder="3"
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2 pl-1 pt-2">
                                <Checkbox id="fastChargeToggle" />
                                <Label
                                    className="pl-1"
                                    htmlFor="fastChargeToggle"
                                >
                                    FastCharge Capable?
                                </Label>
                            </div>
                        </div>

                        <div className="w-full pt-5">
                            <Button>Update Details</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* <div id="map">
                <div ref={ mapContainer } className="map-container" />
            </div> */}
        </Box>
    );
}

export default LocationsMain;
