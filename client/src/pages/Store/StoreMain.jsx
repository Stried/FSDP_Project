import React, { useContext } from "react";
import { Box, Typography } from '@mui/material';
import StoreAddItem from "../Store/StoreAddItem";
import { Link, Routes, Route } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

function User(props) {
    const isUser = props.isUser
    if (isUser) {
        return (
            <Link to="/Store/StoreAddItem">
                <button type='button' class='w-max | text-white hover:text-black | dark:hover:bg-gradient-to-r from-green-400 to-emerald-600 | border-white dark:border-green-500 border-solid border-2 rounded   hover:ease-in-out duration-300 | font-semibold text-xl | mx-4 mr-10 m-10 px-2 py-1 | float-right inline'>Sell your vehicle here!</button>
            </Link>
        )
    }
}

function StoreMain() {
    const { user } = useContext(UserContext);

    return (
        <Box>
            <div className=''>
                <div className='text-white | text-3xl | m-10 | inline-flex'>Categories</div>
                <div className='text-white | pl-10 | pt-1 | text-2xl | m-10 | inline-flex'>All</div>
                {(user && <User isUser={ user.id } /> )}
            </div>
            <Routes>
                <Route path={"/StoreAddItem" } element= { <StoreAddItem /> } />
            </Routes>
        </Box>
    )
}

export default StoreMain;