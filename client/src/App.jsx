"use client";
import React from "react";
import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
} from "@mui/material";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import http from "./http";
import "./App.css";

import EcoLifeAppBar from "./components/EcoLifeAppBar";
import EcoLifeFooter from "./components/EcoLifeFooter";
import EcoLifeSideBar from "./components/EcoLifeSideBar";

import Ecolife from "./pages/Ecolife";
import PageNotFound from "./pages/PageNotFound";
import UserCreateAccount from "./pages/Users/UserCreateAccount";
import UserEnterAccount from "./pages/Users/UserEnterAccount";
import AdminPanelMain from "./pages/Users/AdminPanelMain";
import UserChangePassword from "./pages/Users/UserChangePassword";
import UserForgetPasswordEmail from "./pages/Users/UserForgetPasswordEmail";
import UserForgetPasswordReset from "./pages/Users/UserForgetPasswordReset";
import TalkJSTest from "./pages/Users/TalkJSTest";

import LocationsMain from "./pages/Locations/LocationsMain";
import LocationsCreate from "./pages/Locations/LocationsCreate";

import TrialsAddPage from "./pages/Trials/trialAdmin/TrialsCarAdd";
import TrialsAdminPage from "./pages/Trials/trialAdmin/TrialsCarAdminPage";
import TrialsUpdatePage from "./pages/Trials/trialAdmin/TrialsCarAdminUpdate";
import TrialsReceiptCreate from "./pages/Trials/trialUsers/TrialsReceiptCreation";
import TrialsCarDetails from "./pages/Trials/trialAdmin/TrialsCarDetailedPage";
import TrialsCarUserPage from "./pages/Trials/trialUsers/TrialsCarUserPage";
import TrialsReceiptAdminPage from "./pages/Trials/trialAdmin/TrialsReceiptAdminPage"
import StoreMain from "./pages/Store/StoreMain";
import StoreAddItem from "./pages/Store/StoreAddItem";
import StoreUpdateItem from "./pages/Store/StoreUpdateItem";

import * as Constants from "./../src/components/CSS Constants/Constants";
import UserContext from "./contexts/UserContext";
import ViewAllAccounts from "./pages/Users/adminComponents/ViewAllAccounts";
import CreateAdmin from "./pages/Users/adminComponents/CreateAdmin";
import ViewOtherUser from "./pages/Users/ViewOtherUser";
import ViewAccount from "./pages/Users/userComponents/ViewAccount";
import Setting from "./pages/Users/userComponents/Setting";
import SupportHelpDesk from "./pages/Users/SupportHelpDesk";
import CreateLocations from "./pages/Locations/CreateLocations";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            // Todo: Get user data from server
            http.get("/user/auth").then((res) => {
                setUser(res.data.user);
                setIsAdminCheck(res.data.user.adminNo);
            });
        }
    }, []);

    function mainPage() {
        if (window.location.pathname === "/") {
            return <div>Welcome To Ecolife.</div>;
        }
    }

    const Protected = ({ isAdminCheck, children }) => {
        isAdminCheck = user.adminNo;
        if (!isAdminCheck) {
            console.log(isAdminCheck);
            console.log("Failed");
            return <Navigate to={"/404"} />;
        }

        return children;
    };

    const [isAdminCheck, setIsAdminCheck] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <div
                id="root"
                className="w-full h-screen overflow-x-hidden | bg-gradient-to-b dark:from-zinc-900 dark:to-black from-slate-200 to-white"
            >
                <Router>
                    <div>
                        <EcoLifeAppBar />
                    </div>

                    <div className={`${isAdminCheck ? "inline" : "hidden"}`}>
                        <EcoLifeSideBar />
                    </div>

                    <div className="px-12">
                        <Routes>
                            <Route
                                path={"/"}
                                element={<Ecolife />}
                            />
                            <Route
                                path={"/user/createAccount"}
                                element={<UserCreateAccount />}
                            />
                            <Route
                                path={"/user/login"}
                                element={<UserEnterAccount />}
                            />
                            <Route
                                path={"/user/viewAccount"}
                                element={<ViewAccount />}
                            />
                            <Route
                                path={"/user/viewAccount/settings"}
                                element={<Setting />}
                            />
                            <Route
                                path={"/user/updatePassword"}
                                element={<UserChangePassword />}
                            />
                            <Route
                                path={"/user/forgetPassword"}
                                element={<UserForgetPasswordEmail />}
                            />
                            <Route
                                path={"/user/resetPassword"}
                                element={<UserForgetPasswordReset />}
                            />
                            <Route
                                path={"/user/adminPanel"}
                                element={
                                    <Protected>
                                        <AdminPanelMain />
                                    </Protected>
                                }
                            />
                            <Route
                                path={"/user/:username"}
                                element={<ViewOtherUser />}
                            />
                            <Route
                                path={"/admin/viewAllUsers"}
                                element={
                                    <Protected>
                                        <ViewAllAccounts />
                                    </Protected>
                                }
                            />
                            <Route
                                path={"/admin/createAdmin"}
                                element={
                                    <Protected>
                                        <CreateAdmin />
                                    </Protected>
                                }
                            />
                            <Route
                                path={"/user/chat"}
                                element={<TalkJSTest />}
                            />
                            <Route
                                path={"/locations/LocationsMain"}
                                element={<LocationsMain />}
                            />
                            <Route
                                path={"/locations/createLocation"}
                                element={<CreateLocations />}
                            />
                            <Route
                                path={"/Store/StoreMain"}
                                element={<StoreMain />}
                            />
                            <Route
                                path={"/Store/StoreAddItem"}
                                element={<StoreAddItem />}
                            />
                            <Route
                                path={"/Store/StoreUpdateItem/:id"}
                                element={<StoreUpdateItem />}
                            />
                            <Route
                                path={"/Trials/trialAdmin/TrialsCarAdminPage"}
                                element={<TrialsAdminPage />}
                            />
                            <Route
                                path={
                                    "/Trials/trialAdmin/TrialsCarAdminUpdate/:carPlateNo"
                                }
                                element={<TrialsUpdatePage />}
                            />
                            <Route
                                path={"/Trials/trialAdmin/TrialsCarAdd"}
                                element={<TrialsAddPage />}
                            />
                            <Route
                                path={
                                    "/Trials/trialAdmin/TrialsCarDetailedPage/:id"
                                }
                                element={<TrialsCarDetails />}
                            />
                            <Route
                                path={"/Trials/trialUsers/TrialsCarUserPage"}
                                element={<TrialsCarUserPage />}
                            />
                            <Route
                                path={
                                    "/Trials/trialUsers/TrialsReceiptCreation/:model"
                                }
                                element={<TrialsReceiptCreate />}
                            />
                            <Route
                                path={
                                    "/Trials/trialAdmin/TrialsReceiptAdminPage"
                                }
                                element={<TrialsReceiptAdminPage />}
                            />
                            <Route
                                path={"*"}
                                element={<PageNotFound />}
                            />
                        </Routes>
                    </div>
                    {user && (
                        <div className="fixed">
                            <SupportHelpDesk />
                        </div>
                    )}
                    <div className="mt-10">
                        <EcoLifeFooter />
                    </div>
                </Router>
            </div>
        </UserContext.Provider>
    );
}

export default App;
