import { Container, AppBar, Toolbar, Typography, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Ecolife from "./pages/Ecolife";
import UserCreateAccount from "./pages/UserCreateAccount";
import './App.css'

import EcoLifeAppBar from "./components/EcoLifeAppBar";

import * as Constants from "./../src/components/CSS Constants/Constants";

function App() {
  return (
    <div className="w-full h-full overflow-hidden | bg-gray-300 dark:bg-zinc-900">
      <EcoLifeAppBar />
    </div>
  );
}

export default App
