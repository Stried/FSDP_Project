import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import "./../../../App.css";
import http from "../../../http";

import { Button } from "@mui/base";

function ViewAccount() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            // Todo: Get user data from server
            http.get("/user/auth").then((res) => {
                setUser(res.data.user);
            });
        } else {
            navigate("/user/login");
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        window.location = "/";
    };

    return (
        <div className="text-white">
            <div className="mx-5 ">
                {user && (
                    <div id="userAccountDetails">
                        <p className="text-3xl font-medium">
                            {user.fullName}'s Account Details
                        </p>
                        <div className="my-3">
                            <div id="idNumber" className="">
                                <h1 className="text-green-400 font-medium text-2xl">
                                    ID Number
                                </h1>
                                <p className="text-2xl font-medium italic">
                                    {user.id}
                                </p>
                            </div>
                            <div id="nameSection" className="flex space-x-10">
                                <div id="fullName" className="my-3">
                                    <h1 className="text-green-400 font-medium text-2xl">
                                        Full Name
                                    </h1>
                                    <p className="text-2xl font-medium italic">
                                        {user.fullName}
                                    </p>
                                </div>
                                <div id="userName" className="my-3">
                                    <h1 className="text-green-400 font-medium text-2xl">
                                        Username
                                    </h1>
                                    <p className="text-2xl font-medium italic">
                                        {user.userName}
                                    </p>
                                </div>
                            </div>
                            <div id="emailAccount" className="my-3">
                                <h1 className="text-green-400 font-medium text-2xl">
                                    Email Account
                                </h1>
                                <p className="text-2xl font-medium italic">
                                    {user.emailAccount}
                                </p>
                            </div>
                            <div id="phoneNo" className="my-3">
                                <h1 className="text-green-400 font-medium text-2xl">
                                    Phone Number
                                </h1>
                                <p className="text-2xl font-medium italic">
                                    {user.phoneNo}
                                </p>
                            </div>
                        </div>
                        <Button className="bg-red-500 rounded px-2 py-1 mt-10 text-xl font-medium" onClick={logout}>Logout</Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewAccount