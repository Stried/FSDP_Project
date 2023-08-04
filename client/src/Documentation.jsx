import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Typography,
    Grid,
    Card,
    Container,
    CardContent,
    Input,
    IconButton,
    Button,
} from "@mui/material";

function Documentations() {
    return (
        <Container className="pb-10">
            <div
                id="introduction"
                className="text-slate-300"
            >
                <p className="text-4xl font-extrabold text-green-400 tracking-wider">
                    Ecolife's
                </p>
                <p className="text-4xl font-extrabold">Documentations</p>

                <p className="mt-3 text-2xl font-medium">
                    Welcome to Ecolife. A Full Stack Development Project
                    Initiative.
                </p>
            </div>
            <div
                id="team-introduction"
                className="text-slate-300 text-2xl mt-10"
            >
                <p className="text-4xl font-bold">Team & Responsibilities</p>
                <p className="font-medium mt-3 italic">
                    Team Lead and User functions: <br />{" "}
                    <span className="text-green-400 font-bold tracking-wide not-italic">
                        Alan Ang
                    </span>
                </p>
                <p className="font-medium mt-3 italic">
                    Location functions: <br />{" "}
                    <span className="text-green-400 font-bold tracking-wide not-italic">
                        Benjamin Lim
                    </span>
                </p>
                <p className="font-medium mt-3 italic">
                    Store functions: <br />{" "}
                    <span className="text-green-400 font-bold tracking-wide not-italic">
                        Chun Kiat
                    </span>
                </p>
                <p className="font-medium mt-3 italic">
                    Trial Runs & Receipt functions: <br />{" "}
                    <span className="text-green-400 font-bold tracking-wide not-italic">
                        Zheng Helun
                    </span>
                </p>
            </div>
            <div
                id="project-dependecies"
                className="text-slate-300 text-2xl mt-10"
            >
                <p className="text-4xl font-extrabold tracking-wider">
                    Project Dependencies
                </p>
                <ol className="mt-2 list-disc list-inside">
                    <span className="text-green-400 font-bold">Client Side</span>
                    <li>ReactJS</li>
                    <li>Yup</li>
                    <li>Formik</li>
                    <li>Axios</li>
                    <li>
                        Material UI (MUI)
                        <ul className="list-disc list-inside pl-10 text-xl">
                            <li>@emotion/react</li>
                            <li>@emotion/styled</li>
                            <li>@mui/base</li>
                            <li>@mui/icons-material</li>
                            <li>@mui/joy</li>
                            <li>@mui/material</li>
                            <li>@mui/styled-engine</li>
                            <li>@mui/x-date-pickers</li>
                        </ul>
                    </li>
                    <li>Tailwind CSS / PostCSS</li>
                    <li>Flowbite-React</li>
                    <li>React-Icons</li>
                    <li>React-Datepicker</li>
                </ol>
            </div>
        </Container>
    );
}

export default Documentations;