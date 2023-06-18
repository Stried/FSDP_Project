import React from 'react';
import { Box, Typography } from '@mui/material';
import StoreAddItem from "../Store/StoreAddItem";
import { Link, Routes, Route } from "react-router-dom";

function StoreMain() {
    return (
        <Box>
            <div className='m-10 | inline-flex'>
                <div className='text-white | text-3xl'>Categories</div>
                <div className='text-white | pl-10 | pt-1 | text-2xl'>All</div>
                <Link to="/Store/StoreAddItem">
                    <button type='button' class='class="w-max | text-white hover:text-black | dark:hover:bg-gradient-to-r from-green-400 to-emerald-600 | border-white dark:border-green-500 border-solid border-2 rounded   hover:ease-in-out duration-300 | font-semibold text-xl | mx-4 mt-1 px-2 py-1 | float-right"'>Sell your vehicle here!</button>
                </Link>
                
            </div>
            <Routes>
                <Route path={"/StoreAddItem" } element= { <StoreAddItem /> } />
            </Routes>
        </Box>
    )
}

export default StoreMain;