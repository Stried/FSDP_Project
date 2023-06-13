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
        <Box>
            <div className="text-white">
                {
                    userList.map((user, i) => {
                        return (
                            <li key={ i } className="list-none">
                                <ul >
                                    { user && (
                                        <div className="bg-zinc-300 bg-opacity-70 text-zinc-800 ">
                                            <p>{ user.fullName }</p>
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