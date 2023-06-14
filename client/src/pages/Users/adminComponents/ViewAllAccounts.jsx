import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import { AccountCircle, AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import UserContext from "../../../contexts/UserContext";
import React, { useEffect, useState } from "react";
import http from "../../../http";

import {
    Dropdown,
    Ripple,
    initTE,
} from "tw-elements";

function ViewAllAccounts() {
    const [ userList, setUserList ] = useState([]);
    const getUsers = () => {
        http.get("/user/adminPanel").then((res) => {
            setUserList(res.data);
        });
    };

    const [ displayStyle, setDisplayStyle ] = useState("Full");

    const [ search, setSearch ] = useState("");
    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }
    const searchUsers = () => {
        http.get(`/user/adminPanel?search=${search}`).then((res) => {
            setUserList(res.data);
        })
    }
    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchUsers();
        };
    };
    const onClickSearch = () => {
        searchUsers();
    };
    const onClickClear = () => {
        setSearch("");
        getUsers();
    }
    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        initTE({ Dropdown, Ripple });
    }, []);
    // const dropdownElementList = [].slice.call(document.querySelectorAll('[data-te-dropdown-toggle-ref]'));
    // const dropdownList = dropdownElementList.map((dropdownToggleEl) => {
    //     return new te.Dropdown(dropdownToggleEl);
    // });

    return (
        <Box>
            <nav className="text-white text-xl font-medium flex space-x-5 mx-4 mb-2">
                <button onClick={() => {setDisplayStyle("Full")}} className="border-green-500 border-2 border-solid px-3 py-1 rounded">
                    Full
                </button>
                <button onClick={ () => { setDisplayStyle("Semi") } } className="border-green-500 border-2 border-solid px-3 py-1 rounded">
                    Semi
                </button>
                <button onClick={ () => { setDisplayStyle("Contained") } } className="border-green-500 border-2 border-solid px-3 py-1 rounded">
                    Contained
                </button>
                <p className="my-auto">Currently Showing: <span className="text-green-500">{ displayStyle }</span></p>
            </nav>
            <div className="text-white text-lg font-medium mx-4">
                <input value={ search } placeholder="Search"
                    className='text-white bg-transparent px-2 mr-3'
                    onChange={ onSearchChange }
                    onKeyDown={ onSearchKeyDown } />
                <IconButton color="" className='text-green-500'
                    onClick={ onClickSearch }>
                    <Search />
                </IconButton>
                <IconButton color="" className='text-green-500'
                    onClick={ onClickClear }>
                    <Clear />
                </IconButton>
            </div>
            { displayStyle === "Contained" && (
                <Box className="h-96 overflow-auto">
                    <div className="text-white mx-2 grid grid-cols-4 columns-4">
                        {
                            userList.map((user, i) => {
                                return (
                                    <ul key={ i } className="list-none">
                                        <li className="">
                                            { user && displayStyle === "Contained" && (
                                                <div className="mr-2 mb-2">
                                                    <div className=" bg-zinc-800 bg-opacity-70 text-white p-5 rounded border-transparent border-2 border-solid hover:border-green-500 hover:transition-ease-in-out duration-300">
                                                        <div className=" justify-self-center">
                                                            <img src={ `${import.meta.env.VITE_FILE_BASE_URL}${user.imageFile}` } alt="" className="w-14 h-14 rounded-full mx-auto" />

                                                            <p className="text-xl font-medium text-center mt-2 overflow-hidden">{ user.fullName } </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) }
                                        </li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </Box>
            ) }
            { displayStyle === "Full" | displayStyle === "Semi" && (
                <Box className="h-96 overflow-auto">
                    <div className="text-white mx-2">
                        {
                            userList.map((user, i) => {
                                return (
                                    <ul key={ i } className="list-none">
                                        <li className="">
                                            { user && displayStyle === "Full" && (
                                                <div className="bg-zinc-800 bg-opacity-70 text-white my-3 mx-2 p-5 rounded border-transparent border-2 border-solid hover:border-green-500 hover:transition-ease-in-out duration-300">
                                                    <div className="">
                                                        <img src={ `${import.meta.env.VITE_FILE_BASE_URL}${user.imageFile}` } alt="" className="w-24 h-24 rounded-full float-right" />
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
                                            { user && displayStyle === "Semi" && (
                                                <div className="bg-zinc-800 bg-opacity-70 text-white my-3 mx-2 p-5 rounded border-transparent border-2 border-solid hover:border-green-500 hover:transition-ease-in-out duration-300">
                                                    <div className="">
                                                        <img src={ `${import.meta.env.VITE_FILE_BASE_URL}${user.imageFile}` } alt="" className="w-14 h-14 rounded-full float-right" />
                                                    </div>

                                                    <p className="text-3xl font-semibold">{ user.fullName } </p>
                                                    <p className="text-lg font-medium">ID: <span className="text-green-500">{ user.id }</span></p>
                                                </div>
                                            ) }
                                        </li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </Box>
            ) }
            
            <div className='relative' data-te-dropdown-ref>
                <button className='flex items-center rounded bg-green-500 my-4 px-6 py-2 text-xl font-medium transition-ease-in-out duration-300'
                    type='button'
                    id='dropdownMenuButton'
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-ripple-init
                    data-te-ripple-color='green'
                >
                    Dropdown
                </button>
                <ul className='absolute z-10 float-left m-0 hidden min-w-max list-none overflow-hidden rounded bg-neutral-700 bg-clip-padding text-white text-left text-base shadow-lg'
                    aria-labelledby='dropdownMenuButton'
                    data-te-dropdown-menu-ref
                >
                    <li>
                        <a className='block w-full whitespace-nowrap bg-transparent px-4 py-2 text-lg font-medium text-white'
                            href=""
                            data-te-dropdown-item-ref
                        >
                            Action
                        </a>
                    </li>
                    <li>
                        <a className='block w-full whitespace-nowrap bg-transparent px-4 py-2 text-lg font-medium text-white'
                            href=""
                            data-te-dropdown-item-ref
                        >
                            Action
                        </a>
                    </li>
                    <li>
                        <a className='block w-full whitespace-nowrap bg-transparent px-4 py-2 text-lg font-medium text-white'
                            href=""
                            data-te-dropdown-item-ref
                        >
                            Action
                        </a>
                    </li>
                </ul>
            </div>
        </Box>

    )
}

export default ViewAllAccounts;