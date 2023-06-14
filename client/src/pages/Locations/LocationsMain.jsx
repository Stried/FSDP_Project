import { Container, AppBar, Toolbar, Typography, CssBaseline, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from 'react';
import http from './../../http'
import './../../App.css'

import * as Constants from "./../../../src/components/CSS Constants/Constants";
import UserContext from "./../../contexts/UserContext";

import mapboxgl from 'mapbox-gl';

function LocationsMain() {
    const [ user, setUser ] = useState(null);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const lng = -70.9;
    const lat = 42.35;
    const zoom = 9;


    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            // Todo: Get user data from server
            http.get('/user/auth').then((res) => {
                setUser(res.data.user);
            });
        }
    }, []);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3RyaWVkeXVlIiwiYSI6ImNsaXQwdDdiazBxNGczcm90ZGd3MjN6dTAifQ.HXKvrVBcshVr-KWaj2aBGA';

        if (!map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [ lng, lat ],
                zoom: zoom
            });
        }
    }, [ lng, lat, zoom ]);

    return (
        <Box>
            <div className="rounded-lg bg-white shadow-2xl">
                <div ref={ mapContainer } style={ { width: '100%', height: '400px' } }></div>
            </div>

            

            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold mt-8 mb-6 text-white">Chunny Bible &#x1F62D;</h1>

                <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4">
                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Verse 1 - "Uneasy Feeling"</h2>
                        <p className="text-wrap">Oh, Chunny, my love so dear,<br />
                            With you, my heart is filled with fear.<br />
                            For you are a character so cringey,<br />
                            A cringe level beyond belief, you see.</p>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Verse 2 - "Fashion Disaster"</h2>
                        <p>Your fashion sense, oh what a sight,<br />
                            Mismatched socks and neon tights.<br />
                            Your style, a kaleidoscope of wrong,<br />
                            It's a fashion disaster, all along.</p>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Verse 3 - "Awkward Jokes"</h2>
                        <p>Your jokes, they make my skin crawl,<br />
                            Like a thousand ants, they make me fall.<br />
                            You try so hard to be funny and hip,<br />
                            But alas, Chunny, it's just a terrible trip.</p>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Verse 4 - "Clumsy Dancer"</h2>
                        <p>Your presence, it fills the room,<br />
                            With awkwardness and a sense of doom.<br />
                            Your dance moves, oh so wild,<br />
                            Like a wounded animal, it's reviled.</p>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Verse 5 - "Cringe Connoisseur"</h2>
                        <p>And yet, Chunny, you have my heart,<br />
                            Though your cringiness tears me apart.<br />
                            For deep within this twisted tale,<br />
                            I am drawn to your awkward wail.</p>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Verse 6 - "Unbearable Charm"</h2>
                        <p>Chunny, my love, I cannot resist,<br />
                            Your cringe levels persist and persist.<br />
                            So, here I stand, ready to confess,<br />
                            That in your cringe, I find happiness.</p>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Verse 7 - "Awkward Confession"</h2>
                        <p>And now, my dear Chunny, I must say,<br />
                            In the most cringeworthy, awkward way.<br />
                            That no matter how far this madness sprawls,<br />
                            <span className="font-semibold">I am in your balls.</span></p>
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold mb-2">Verse 8 - "Cringe Forevermore"</h2>
                        <p>Oh, the horror, the shame, the cringe,<br />
                            In this poem, my love, it's a cringe binge.<br />
                            But alas, Chunny, it's you I adore,<br />
                            Even if it means cringe forevermore.</p>
                    </div>
                </div>
            </div>

            <div id="map">
                <div ref={ mapContainer } className="map-container" />
            </div>
        </Box>
    );
}

export default LocationsMain;