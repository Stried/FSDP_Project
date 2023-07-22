import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Input, IconButton, Grid, Card, CardContent, Paper } from '@mui/material';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import StoreAddItem from "../Store/StoreAddItem";
import StoreUpdateItem from "../Store/StoreUpdateItem";
import { Link, Routes, Route, useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import http from '../../http';
import AspectRatio from '@mui/joy/AspectRatio';
import { AiOutlineUser } from 'react-icons/ai'


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
            <div className="grid grid-cols-4 mx-10 space-x-5">
                {
                    storeList.map((store, i) => {
                        return (
                            <div className="text-white shadow-lg shadow-zinc-700/60 py-2 hover:shadow-xl hover:shadow-zinc-700/60 hover:px-2 duration-300 hover:ease-in-out">
                                <div className="p-5">
                                    <p className="text-2xl font-medium">
                                        {store.carBrand} {store.carModel}
                                    </p>
                                    <p className="text-xl">
                                        $ {store.carPrice}
                                    </p>
                                    <p>Production: {store.carProductionDate}</p>
                                    <p className="flex mt-3">
                                        <AiOutlineUser className="my-auto" />{" "}
                                        <span className="pl-1 text-green-400">
                                            <a href="/user/MuelMuel">
                                                {store.emailAccount}
                                            </a>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <Routes>
                <Route path={"/StoreAddItem"} element={<StoreAddItem />} />
                <Route path={"/StoreUpdateItem/:id"} element={<StoreUpdateItem />} />
            </Routes>
        </Box>
    )
}

export default StoreMain;