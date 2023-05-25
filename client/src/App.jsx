import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Ecolife from "./pages/Ecolife";
import UserCreateAccount from "./pages/UserCreateAccount";
import './App.css'

function App() {
  return (
    <Router>
      <AppBar position="static" className="AppBar">
        <Container>
          <Toolbar disableGutters={true} className='bg-green-600'>
            <Link to="/">
              <Typography variant="h6" component="div" className="text-red-400">
                EcoLife
              </Typography>
            </Link>
            <Link to="/createAccount">
              <Typography>Create Account</Typography>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Routes>
          <Route path={"/"} element={<Ecolife />} />
          <Route path={"/createAccount"} element={<UserCreateAccount />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App
