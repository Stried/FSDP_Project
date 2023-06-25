import { Box, Typography, Grid, Card, CardContent, Input, IconButton } from '@mui/material';
import { AccountCircle, AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import UserContext from "../../../contexts/UserContext";
import React, { useEffect, useState } from "react";
import http from "../../../http";
import { Dropdown, Button, Modal } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

function ViewAllAccounts() {
    const navigate = useNavigate();

    const [ userList, setUserList ] = useState([]);
    const getUsers = () => {
        http.get("/user/adminPanel").then((res) => {
            setUserList(res.data);
        });
    };

    const deleteUser = (userID) => {
        http.delete(`/user/deleteUser/${userID}`).then((res) => {
            console.log(res.data);
            window.location.reload();
        })
    }

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

    const [ openModal, setOpenModal ] = useState("");

    return (
        <Box>
            <nav className="text-white text-xl font-medium flex space-x-5 mx-4 mb-2">
                <button onClick={ () => { setDisplayStyle("Full") } } className="border-green-500 border-2 border-solid px-3 py-1 rounded">
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
                                const isModalOpen = openModal === user.emailAccount; // Ensures the value is the user that is selected

                                return (
                                    <ul key={ i } className="list-none">
                                        <li className="">
                                            { user && displayStyle === "Contained" && (
                                                <div>
                                                    <div className="mr-2 mb-2">
                                                        <div onClick={ () => setOpenModal(user.emailAccount) } className=" bg-zinc-800 bg-opacity-70 text-white p-5 rounded border-transparent border-2 border-solid hover:border-green-500 hover:transition-ease-in-out duration-300">
                                                            <div className=" justify-self-center">
                                                                <img src={ `${import.meta.env.VITE_FILE_BASE_URL}${user.imageFile}` } alt="" className="w-14 h-14 rounded-full mx-auto" />

                                                                <p className="text-xl font-medium text-center mt-2 overflow-hidden">{ user.fullName } </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Modal dismissible show={ isModalOpen } onClose={ () => setOpenModal("") }>
                                                        <Modal.Header>
                                                            { user.fullName }
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <div className='py-5 text-white text-xl font-medium'>
                                                                <p><span className='text-green-500 text-xl font-medium'>ID: </span>{ user.id }</p>
                                                                <p><span className='text-green-500 text-xl font-medium'>Full Name: </span>{ user.fullName }</p>
                                                                <p><span className='text-green-500 text-xl font-medium'>Username: </span>{ user.userName }</p>
                                                                <p><span className='text-green-500 text-xl font-medium'>Email Account: </span>{ user.emailAccount }</p>
                                                                <p><span className='text-green-500 text-xl font-medium'>Phone No: </span>{ user.phoneNo }</p>
                                                            </div>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <p className="w-max float-right">
                                                                <button onClick={ () => deleteUser(`${user.id}`) } className="px-3 py-2 bg-red-500 rounded font-medium">
                                                                    Delete
                                                                </button>
                                                                <span className='w-fit | bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text | hover:ease-in-out duration-300 | italic font-semibold text-xl'>
                                                                    Ecolife
                                                                </span>
                                                            </p>
                                                        </Modal.Footer>
                                                    </Modal>
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
                    <div className="text-white">
                        {
                            userList.map((user, i) => {
                                const isModalOpen = openModal === user.emailAccount; // Ensures the value is the user that is selected

                                return (
                                    <ul key={ i } className="list-none">
                                        <li className="">
                                            { user && displayStyle === "Full" && (
                                                <div>
                                                    <div onClick={ () => setOpenModal(user.emailAccount) } className="bg-zinc-800 bg-opacity-70 text-white my-3 mx-2 p-5 rounded border-transparent border-2 border-solid hover:border-green-500 hover:transition-ease-in-out duration-300">
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
                                                        
                                                    </div>                                                    <Modal dismissible show={ isModalOpen } onClose={ () => setOpenModal("") }>
                                                        <Modal.Header>
                                                            { user.fullName }
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <div className='py-5 text-white text-xl font-medium'>
                                                                <p><span className='text-green-500 text-xl font-medium'>ID: </span>{ user.id }</p>
                                                                <p><span className='text-green-500 text-xl font-medium'>Full Name: </span>{ user.fullName }</p>
                                                                <p><span className='text-green-500 text-xl font-medium'>Username: </span>{ user.userName }</p>
                                                                <p><span className='text-green-500 text-xl font-medium'>Email Account: </span>{ user.emailAccount }</p>
                                                                <p><span className='text-green-500 text-xl font-medium'>Phone No: </span>{ user.phoneNo }</p>
                                                            </div>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <p className="w-fit | bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text | hover:ease-in-out duration-300 | italic font-semibold text-xl">Ecolife</p>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </div>
                                            ) }
                                            { user && displayStyle === "Semi" && (
                                                <div>
                                                    <div onClick={ () => setOpenModal(user.emailAccount) } className="bg-zinc-800 bg-opacity-70 text-white my-3 mx-2 p-5 rounded border-transparent border-2 border-solid hover:border-green-500 hover:transition-ease-in-out duration-300">
                                                        <div className="">
                                                            <img src={ `${import.meta.env.VITE_FILE_BASE_URL}${user.imageFile}` } alt="" className="w-14 h-14 rounded-full float-right" />
                                                        </div>

                                                        <p className="text-3xl font-semibold">{ user.fullName } </p>
                                                        <p className="text-lg font-medium">ID: <span className="text-green-500">{ user.id }</span></p>
                                                    </div>
                                                    <Modal dismissible show={ isModalOpen } onClose={ () => setOpenModal("") }>
                                                        <Modal.Header>
                                                            { user.fullName }
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <div className='py-5 text-white text-xl font-medium'>
                                                                <p><span className='text-green-500 text-xl font-medium'>ID: </span>{ user.id }</p>
                                                                <p><span className='text-green-500 text-xl font-medium'>Full Name: </span>{ user.fullName }</p>
                                                                <p><span className='text-green-500 text-xl font-medium'>Username: </span>{ user.userName }</p>
                                                                <p><span className='text-green-500 text-xl font-medium'>Email Account: </span>{ user.emailAccount }</p>
                                                                <p><span className='text-green-500 text-xl font-medium'>Phone No: </span>{ user.phoneNo }</p>
                                                            </div>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <p className="w-fit | bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text | hover:ease-in-out duration-300 | italic font-semibold text-xl">Ecolife</p>
                                                        </Modal.Footer>
                                                    </Modal>
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
        </Box>

    )
}

export default ViewAllAccounts;