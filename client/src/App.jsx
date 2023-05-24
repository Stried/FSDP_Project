import "./App.css";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Ecolife from "./pages/Ecolife";
import UserCreateAccount from "./pages/User/UserCreateAccount";

function App() {
  return (
    <Router>
      <AppBar position="static" className="AppBar">
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/">
              <Typography variant="h6" component="div">
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
export default App;
