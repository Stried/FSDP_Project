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

function AdminPanelMain() {
    const { user } = useContext(UserContext);

    const [ isRendered, setIsRendered ] = useState("");

    return (
        user && (
            <Box>
                <div>
                    <div className="text-white">
                        <h1 className="text-green-500 text-4xl font-medium">
                            Admin Panel
                        </h1>
                        <p className="text-lg">
                            Logged In: <span className="text-green-500">{ user.adminNo }</span>
                        </p>
                    </div>

                    <div className="w-1/3 mt-3" id="sideBarMenu">
                        <h2 className="text-green-500 text-3xl font-medium">
                            Administrative <span className="text-white text-2xl">User</span>
                        </h2>
                        <ul className=" text-zinc-400 text-xl border-white">
                            <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" onClick={() => setIsRendered("")}>
                                    View Users
                                </Link>
                            </li>
                            <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" >
                                    View More Users
                                </Link>
                            </li>
                            <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" >
                                    View Even More Users
                                </Link>
                            </li> {/*Remember to remove text-red-800 later*/}
                            <li className="pt-3 text-red-800 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" >
                                    View ALL THE USERS!!!!
                                </Link> 
                            </li>
                        </ul>

                        <h2 className="text-green-500 text-3xl font-medium mt-5">
                            Administrative <span className="text-white text-2xl">Vehicles</span>
                        </h2>
                        <ul className=" text-zinc-400 text-xl border-white">
                            <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" >
                                    View Vehicles
                                </Link>
                            </li>
                            <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" >
                                    View More Vehicles
                                </Link>
                            </li>
                            <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" >
                                    View Even More Vehicles
                                </Link>
                            </li> {/*Remember to remove text-red-800 later*/}
                            <li className="pt-3 text-red-800 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" >
                                    View ALL THE VEHICLES!!!!
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* <div className="w-3/4 mx-5 h-full" id="displayComponents">
                    { isRendered === "" && ("") }
                    { isRendered === "changeAccountDetails" && (changeAccountDetails()) }
                </div> */}
            </Box>
        )

    )
}

export default AdminPanelMain;