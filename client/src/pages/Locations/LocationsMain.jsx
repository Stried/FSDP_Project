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
    const [openModal, setOpenModal] = useState("")
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
                        <Button
                            className = "text-xs px-2 py-1"
                            onClick={() => props.setOpenModal("form-elements")}
                        >
                            Toggle modal
                        </Button>
                        <Modal
                            show={props.openModal === "form-elements"}
                            size="md"
                            popup
                            onClose={() => props.setOpenModal(undefined)}
                        >
                            <Modal.Header />
                            <Modal.Body>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                        Sign in to our platform
                                    </h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="email"
                                                value="Your email"
                                            />
                                        </div>
                                        <TextInput
                                            id="email"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="password"
                                                value="Your password"
                                            />
                                        </div>
                                        <TextInput
                                            id="password"
                                            type="password"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="remember" />
                                            <Label htmlFor="remember">
                                                Remember me
                                            </Label>
                                        </div>
                                        <a
                                            href="/modal"
                                            className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
                                        >
                                            Lost Password?
                                        </a>
                                    </div>
                                    <div className="w-full">
                                        <Button>Log in to your account</Button>
                                    </div>
                                    <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                                        Not registered?&nbsp;
                                        <a
                                            href="/modal"
                                            className="text-cyan-700 hover:underline dark:text-cyan-500"
                                        >
                                            Create account
                                        </a>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
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

            {/* <div id="map">
                <div ref={ mapContainer } className="map-container" />
            </div> */}
        </Box>
    );
}

export default LocationsMain;
