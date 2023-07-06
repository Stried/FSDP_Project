import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Input, IconButton, Grid, Card, CardContent } from '@mui/material';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import StoreAddItem from "../Store/StoreAddItem";
import StoreUpdateItem from "../Store/StoreUpdateItem";
import { Link, Routes, Route, useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import http from '../../http';

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
    if (isAdminUpdate) {
        return (
            <button type='button' className='w-max | text-white hover:text-black | dark:hover:bg-gradient-to-r from-green-400 to-emerald-600 | border-white dark:border-green-500 border-solid border-2 rounded   hover:ease-in-out duration-300 | font-semibold text-xl | mx-4 mr-10 m-10 px-2 py-1 | float-right inline'>Update your vehicle here!</button>
        )
    }
}

function StoreMain() {
    const { user } = useContext(UserContext);

    const [storeList, setStoreList] = useState([]);
    useEffect(() => {
        http.get('/store').then((res) => {
            console.log(res.data);
            setStoreList(res.data);
        });
    }, []);

    const [search, setSearch] = useState('');
    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };
    const getStore = () => {
        http.get('/store').then((res) => {
            setStoreList(res.data);
        });
    };
    const searchStore = () => {
        http.get(`/store?search=${search}`).then((res) => {
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
                <div className='text-white | pl-10 | pt-1 | text-2xl | m-10 | inline-flex'>All</div>
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
            <div>
                <Grid container spacing={2} className="px-7">
                    {
                        storeList.map((store, i) => {
                            return (
                                <Grid item xs={12} md={6} lg={6} key={store.carPlateNo}>
                                    <Card className="bg-black text-white">
                                        <CardContent>
                                            <Typography variant="h6" sx={{ mb: 1 }}>
                                                Car Plate No: {store.carPlateNo}
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Description: {store.carDescription}
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Price: ${store.carPrice}
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Brand: {store.carBrand}
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Model: {store.carModel}
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Engine: {store.carEngine}
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Speed: {store.carSpeed} km/h
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Fuel Type: {store.carFuelType}
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Fuel Consume: {store.carFuelConsume} g/kwh
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Production Date: {store.carProductionDate}
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Body Type: {store.carBodyType}
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Color: {store.carColor}
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Seats: {store.carSeats}
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Length: {store.carLength}mm
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Width: {store.carWidth}mm
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Height: {store.carHeight}mm
                                            </Typography>
                                            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                                Car Mods: {store.carMods}
                                            </Typography>
                                            <Link to={`/Store/StoreUpdateItem/${store.carPlateNo}`} className="inline-flex">
                                                {(user && (<AdminUpdate isAdminUpdate={user.adminNo} />))}
                                            </Link>
                                        </CardContent>
                                    </Card>
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