import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Input, IconButton, Grid, Card, CardContent, Paper } from '@mui/material';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import StoreAddItem from "../Store/StoreAddItem";
import StoreUpdateItem from "../Store/StoreUpdateItem";
import { Link, Routes, Route, useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import http from '../../http';
import AspectRatio from '@mui/joy/AspectRatio';

function User(props) {
    const isUser = props.isUser
    if (isUser) {
        return (
            <div className='inline'>
                <Link to="/Store/StoreAddItem">
                    <button type='button' className='w-max | text-white hover:text-black | dark:hover:bg-gradient-to-r from-green-400 to-emerald-600 | border-white dark:border-green-500 border-solid border-2 rounded   hover:ease-in-out duration-300 | font-semibold text-xl | mx-4 mr-10 m-10 px-2 py-1 | float-right inline'>Sell your vehicle here!</button>
                </Link>
            </div>
        )
    }
}

function AdminUpdate(props) {
    const isAdminUpdate = props.isAdminUpdate;
    const id = props.id
    if (isAdminUpdate) {
        return (
            <Link to={`/Store/StoreUpdateItem/${id}`} className="flex justify-center">
                <button type='button' className='w-max | text-white hover:text-black | dark:hover:bg-gradient-to-b from-red-400 to-red-600 | border-white dark:border-red-800 border-solid border-2 rounded hover:ease-in-out duration-200 | font-semibold text-xl | mx-4 m-10 px-2 py-1 | float-right inline'>Update vehicle</button>
            </Link>
        )
    }
}


function StoreMain() {
    const { user } = useContext(UserContext);

    const [storeList, setStoreList] = useState([]);
    useEffect(() => {
        http.get('/store/viewStore').then((res) => {
            console.log(res.data);
            setStoreList(res.data);
        });
    }, []);

    const [search, setSearch] = useState('');
    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };
    const getStore = () => {
        http.get('/store/viewStore').then((res) => {
            setStoreList(res.data);
        });
    };
    const searchStore = () => {
        http.get(`/store/viewStore?search=${search}`).then((res) => {
            setStoreList(res.data);
        });
    };
    useEffect(() => {
        getStore();
    }, []);
    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchStore();
        }
    };
    const onClickSearch = () => {
        searchStore();
    }
    const onClickClear = () => {
        setSearch('');
        getStore();
    };

    return (
        <Box>
            <div className=''>
                <div className='text-white | text-3xl | m-10 | inline-flex'>Categories</div>
                <button className="text-white | text-2xl | mx-10">
                    All
                </button>
                <button className="text-white | text-2xl | mx-10">
                    Electric
                </button>
                <button className="text-white | text-2xl | mx-10">
                    Hybrid
                </button>
                {(user && <User isUser={user.id} />)}
            </div>
            <div className="ml-7 flex">
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange} className="text-green-400 pl-3"
                    onKeyDown={onSearchKeyDown} />
                <IconButton color="primary" className="text-green-400"
                    onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary" className="text-green-400"
                    onClick={onClickClear}>
                    <Clear />
                </IconButton>
            </div>
            <br />
            <div className="bg-zinc-800 text-white mx-5 p-5">
                <div className="flex justify-center text-5xl pb-3">
                    Vehicles
                </div>
                <Grid container spacing={2}>
                    {
                        storeList.map((store, i) => {
                            return (
                                <Grid item xs={4} className="mx-auto">
                                    <div className="grid-cols-2 text-center border border-white bg-zinc-600 text-2xl">
                                        <div className="pb-3">
                                            {
                                                store.carImageFile && (
                                                    <AspectRatio>
                                                        <Box component="img"
                                                            src={`${import.meta.env.VITE_FILE_BASE_URL}${store.carImageFile}`}
                                                            alt="store">
                                                        </Box>
                                                    </AspectRatio>
                                                )
                                            }
                                        </div>
                                        <div sx={{ whiteSpace: 'pre-wrap' }}>
                                            {store.carPlateNo}
                                        </div>
                                        <div sx={{ whiteSpace: 'pre-wrap' }}>
                                            {store.carBrand}, {store.carModel}
                                        </div>
                                        <div sx={{ whiteSpace: 'pre-wrap' }}>
                                            ${store.carPrice.toLocaleString()}
                                        </div>
                                        <div sx={{ whiteSpace: 'pre-wrap' }}>
                                            Sold By: {store.soldBy}
                                        </div>
                                        <div>
                                            <Link>
                                                <button className="border-2 rounded hover:border-black hover:bg-black font-semibold my-5 p-1 ">View More</button>
                                            </Link>
                                            {(user && (<AdminUpdate isAdminUpdate={user.adminNo} id={store.carPlateNo} />))}
                                        </div>
                                    </div>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </div>
            <Routes>
                <Route path={"/StoreAddItem"} element={<StoreAddItem />} />
                <Route path={"/StoreUpdateItem/:id"} element={<StoreUpdateItem />} />
            </Routes>
        </Box>
    )
}

export default StoreMain;