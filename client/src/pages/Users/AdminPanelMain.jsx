import { Box } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import UserContext from "../../contexts/UserContext";

import ViewAllAccounts from "./adminComponents/ViewAllAccounts";
import CreateAdmin from "./adminComponents/CreateAdmin";

function AdminPanelMain() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [ isRendered, setIsRendered ] = useState("");

    return (
        user && (
            <Box className="ml-10">
                <div className="flex">
                    <div>
                        <div className="text-white">
                            <h1 className="dark:text-green-500 text-sky-500 text-4xl font-medium">
                                Admin Panel
                            </h1>
                            <p className="text-lg dark:text-white text-black">
                                Logged In:{" "}
                                <span className="dark:text-green-500 text-sky-500">
                                    {user.adminNo}
                                </span>
                            </p>
                        </div>
                        <div
                            className="w-2/3 mt-3"
                            id="sideBarMenu"
                        >
                            <h2 className="dark:text-green-500 text-sky-500 text-3xl font-medium">
                                Administrative{" "}
                                <span className="dark:text-white text-black text-2xl">
                                    User
                                </span>
                            </h2>
                            <ul className=" dark:text-zinc-400 text-zinc-800 text-xl">
                                <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500 border-black dark:border-zinc-400">
                                    <Link
                                        to=""
                                        onClick={() => setIsRendered("")}
                                    >
                                        View Users
                                    </Link>
                                </li>
                                <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500 border-black dark:border-zinc-400">
                                    <Link
                                        to=""
                                        onClick={() =>
                                            setIsRendered("createAdmin")
                                        }
                                    >
                                        Create Admins
                                    </Link>
                                </li>
                                <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500 border-black dark:border-zinc-400">
                                    <Link
                                        to=""
                                        onClick={() => setIsRendered("")}
                                    >
                                        Trial Runs
                                    </Link>
                                </li>
                                <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500 border-black dark:border-zinc-400">
                                    <Link
                                        to=""
                                        onClick={() => setIsRendered("")}
                                    >
                                        Problem Reports
                                    </Link>
                                </li>
                            </ul>

                            <h2 className="dark:text-green-500 text-sky-500 text-3xl font-medium mt-5">
                                Administrative{" "}
                                <span className="dark:text-white text-black text-2xl">
                                    Vehicles
                                </span>
                            </h2>
                            <ul className=" dark:text-zinc-400 text-zinc-800 text-xl border-white">
                                <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500 border-black dark:border-zinc-400">
                                    <Link
                                        to=""
                                        onClick={() => setIsRendered("")}
                                    >
                                        Trial Vehicles
                                    </Link>
                                </li>
                                <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500 border-black dark:border-zinc-400">
                                    <Link
                                        to=""
                                        onClick={() => setIsRendered("")}
                                    >
                                        Vehicle Stock
                                    </Link>
                                </li>
                                <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500 border-black dark:border-zinc-400">
                                    <Link
                                        to=""
                                        onClick={() => setIsRendered("")}
                                    >
                                        Charger Locations
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="w-2/3 ml-8 h-full"
                        id="displayComponents"
                    >
                        {isRendered === "" && <ViewAllAccounts />}
                        {isRendered === "createAdmin" && <CreateAdmin />}
                    </div>
                </div>
            </Box>
        )
    );
}

export default AdminPanelMain;