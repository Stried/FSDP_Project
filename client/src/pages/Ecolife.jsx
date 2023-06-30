import React from "react";
import { Link } from "react-router-dom";
import {
    Box, Typography, Grid, Card, Container,
    CardContent, Input, IconButton, Button
} from "@mui/material";
import "../App.css";

function Ecolife() {
    return (
        <Container className="font-medium text-2xl text-zinc-400">
            <div className="w-2/3">
                <span className="text-green-500 text-4xl">Ecolife</span>, founded in 2023, is created for the sole purpose of promoting a
                <span className="text-green-400"> cleaner</span> and <span className="text-green-400">greener</span> Singapore.

            </div>

        </Container>
    );
}

export default Ecolife;
