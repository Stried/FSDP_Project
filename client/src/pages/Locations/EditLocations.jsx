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

function LocationsMain() {
    return(
        <h1>Kill Myself</h1>
    )
}
export default LocationsMain;
