import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Input,
  IconButton,
  Button,
} from "@mui/material";
import "../App.css";

function Ecolife() {
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }} />
          <Link to="/createAccount" style={{ textDecoration: "none" }}>
        <Button variant="contained">Find my balls</Button>
      </Link>
    </Box>
  );
}

export default Ecolife;
