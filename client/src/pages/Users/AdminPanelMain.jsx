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
import ViewAccount from "./userComponents/ViewAccount";

function AdminPanelMain() {
    const { user } = useContext(UserContext);

    const [ isRendered, setIsRendered ] = useState("");

    return (
        user && (
            <Box>
                <div className="text-white">
                    <h1 className="text-green-500 text-4xl font-medium">
                        Admin Panel
                    </h1>
                    <p className="text-lg">
                        Logged In: <span className="text-green-500">{ user.adminNo }</span>
                    </p>
                </div>
                <div className="flex">
                    <div className="w-1/3 mt-3" id="sideBarMenu">
                        <h2 className="text-green-500 text-3xl font-medium">
                            Administrative <span className="text-white text-2xl">User</span>
                        </h2>
                        <ul className=" text-zinc-400 text-xl border-white">
                            <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" onClick={ () => setIsRendered("") }>
                                    View Users
                                </Link>
                            </li>
                            <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" onClick={ () => setIsRendered("") }>
                                    User Orders
                                </Link>
                            </li>
                            <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" onClick={ () => setIsRendered("") }>
                                    Trial Runs
                                </Link>
                            </li>
                            <li className="pt-3 text-red-800 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" onClick={ () => setIsRendered("") }>
                                    Problem Reports
                                </Link> 
                            </li>
                        </ul>

                        <h2 className="text-green-500 text-3xl font-medium mt-5">
                            Administrative <span className="text-white text-2xl">Vehicles</span>
                        </h2>
                        <ul className=" text-zinc-400 text-xl border-white">
                            <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" onClick={ () => setIsRendered("") }>
                                    Trial Vehicles                                   
                                </Link>
                            </li>
                            <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" onClick={ () => setIsRendered("") }>
                                    Vehicle Stock
                                </Link>
                            </li>
                            <li className="pt-3 hover:text-green-500 hover:transition-ease-in-out duration-300 pl-5 border-l-2 border-solid hover:border-green-500">
                                <Link to="" onClick={ () => setIsRendered("") }>
                                    Charger Locations
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="w-2/3 mx-5 h-full" id="displayComponents">
                        { isRendered === "" && (<ViewAllAccounts />) }
                    </div>
                </div>


            </Box>
        )

    )
}

export default AdminPanelMain;