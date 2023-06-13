import { Box } from "@mui/material";
import UserContext from "../../../contexts/UserContext";
import React, { useEffect, useState } from "react";
import http from "../../../http";

function ViewAllAccounts() {
    const [ userList, setUserList ] = useState([]);

    useEffect(() => {
        http.get("/user/adminPanel").then((res) => {
            setUserList(res.data);
        })
    }, []);

    return (
        <Box className="h-96 overflow-auto">
            <div className="text-white mx-2">
                {
                    userList.map((user, i) => {
                        return (
                            <li key={ i } className="list-none">
                                <ul className="">
                                    { user && (
                                        <div className="bg-zinc-800 bg-opacity-70 text-white my-3 mx-2 p-5 rounded border-transparent border-2 border-solid hover:border-green-500 hover:transition-ease-in-out duration-300">
                                            <div className="">
                                                <img src={ `${import.meta.env.VITE_FILE_BASE_URL}${user.imageFile}` } alt="" className="w-24 h-24 rounded-full float-right border-green-500 border-2 border-solid" />
                                            </div>

                                            <p className="text-3xl font-semibold">{ user.fullName } </p>
                                            <p className="text-lg font-medium">ID: <span className="text-green-500">{ user.id }</span></p>

                                            <br />
                                            <div>
                                                <p className="text-xl font-medium">Email: <span className="text-green-500">{ user.emailAccount }</span></p>
                                                <p className="text-xl font-medium">Phone no: <span className="text-green-500">{ user.phoneNo }</span></p>
                                            </div>
                                        </div>
                                    ) }
                                </ul>
                            </li>

                        )
                    })
                }
            </div>
        </Box>
    )
}

export default ViewAllAccounts;