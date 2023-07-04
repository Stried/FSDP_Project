import { Container, AppBar, Toolbar, Typography, CssBaseline, Box, Grid, CardContent, Input, IconButton, Card } from "@mui/material";
import { Search, Clear } from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState } from 'react';
import { Button } from 'flowbite-react'
import http from './../../http'
import './../../App.css'

import * as Constants from "./../../../src/components/CSS Constants/Constants";
import UserContext from "./../../contexts/UserContext";

import { Map, Marker } from "pigeon-maps"

function LocationsMain() {
    const color = `hsl(0, 100%, 50%)`

    return (
        <Box>
            <div className="flex justify-center items-center">
                <Link to="/locations/createLocation">
                    <Button className="">Add Charger</Button>
                </Link>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mt-8 mb-6 text-white">Locations</h1>

                <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4">
                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Charger 1 - Hougang</h2>
                        <p className="text-wrap">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </p>
                        <div className="mx-auto pt-2">
                            <Map height={300} defaultCenter={[1.3759366, 103.878986]} defaultZoom={17}>
                                <Marker width={40} color={color} anchor={[1.3759366, 103.878986]} />
                            </Map>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Charger 2 - Sengkang</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </p>
                        <div className="mx-auto pt-2">
                            <Map height={300} defaultCenter={[1.391794253314477, 103.8946747593317]} defaultZoom={17}>
                                <Marker width={40} color={color} anchor={[1.391794253314477, 103.8946747593317]} />
                            </Map>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Charger 3 - Yio Chu Kang</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </p>
                        <div className="mx-auto pt-2">
                            <Map height={300} defaultCenter={[1.3838608875619876, 103.87702488676204]} defaultZoom={17}>
                                <Marker width={40} color={color} anchor={[1.3838608875619876, 103.87702488676204]} />
                            </Map>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Charger 4 - Ang Mo Kio</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </p>
                        <div className="mx-auto pt-2">
                            <Map height={300} defaultCenter={[1.3773398962971761, 103.86640986410745]} defaultZoom={17}>
                                <Marker width={40} color={color} anchor={[1.3773398962971761, 103.86640986410745]} />
                            </Map>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Charger 5 - Tampines</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </p>
                        <div className="mx-auto pt-2">
                            <Map height={300} defaultCenter={[1.3737872449775959, 103.9426749219287]} defaultZoom={17}>
                                <Marker width={40} color={color} anchor={[1.3737872449775959, 103.9426749219287]} />
                            </Map>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Charger 6 - Bukit Timah</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </p>
                        <div className="mx-auto pt-2">
                            <Map height={300} defaultCenter={[1.3312098699919162, 103.7991151209977]} defaultZoom={17}>
                                <Marker width={40} color={color} anchor={[1.3312098699919162, 103.7991151209977]} />
                            </Map>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Charger 7 - Bishan</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </p>
                        <div className="mx-auto pt-2">
                            <Map height={300} defaultCenter={[1.3596830291773792, 103.83989932095439]} defaultZoom={17}>
                                <Marker width={40} color={color} anchor={[1.3596830291773792, 103.83989932095439]} />
                            </Map>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Charger 8 - Seletar</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </p>
                        <div className="mx-auto pt-2">
                            <Map height={300} defaultCenter={[1.420332721937346, 103.86357894837764]} defaultZoom={17}>
                                <Marker width={40} color={color} anchor={[1.420332721937346, 103.86357894837764]} />
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