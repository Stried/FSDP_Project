import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./../../../App.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Accordion, Avatar, Badge, Breadcrumb } from "flowbite-react";
import {
    HiHome,
    HiAdjustments,
    HiClipboardList,
    HiUserCircle,
    HiUser,
} from "react-icons/hi";
import { BiSolidBadgeDollar, BiReceipt } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { Tabs } from "flowbite-react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import http from "../../../http";
import { ToastContainer, toast } from "react-toastify";
import UserChatRoom from "./UserChatRoom";
import UserContext from "../../../contexts/UserContext";

function ViewOtherUser() {
    const navigate = useNavigate();
    const { username } = useParams();
    console.log(username);

    const [ otherUser, setOtherUser ] = useState(null);
    const [ userCarSalesListing, setUserCarSalesListing ] = useState([]);
    const [ userFollowersList, setUserFollowersList ] = useState([]);
    const [ checkFollowed, setCheckFollowed ] = useState(null);

    useEffect(() => {
        http.get(`/user/${username}`)
            .then((res) => {
                setOtherUser(res.data);
                console.log("Successfully loaded user info");
            })
            .catch(function (err) {
                console.log(err);
                navigate("/404");
            });
    }, []);

    useEffect(() => {
        http.get(`/user/viewAccount/carListing/${username}`)
            .then((res) => {
                setUserCarSalesListing(res.data);
                console.log("User Car Listing successfully logged.");
            })
            .catch(function (err) {
                console.log(err);
                navigate("/404");
            });
    }, []);

    useEffect(() => {
        http.get(`/user/follow/${username}`)
            .then((res) => {
                setCheckFollowed(res.data);
            })
            .catch(function (err) {
                console.log(err);
                navigate("/404");
            })
    }, []);

    useEffect(() => {
        http.get(`/user/viewAccount/allFollowers/${username}`)
            .then((res) => {
                setUserFollowersList(res.data);
                console.log("User followers successfully logged.");
            })
            .catch(function (err) {
                console.log(err);
                navigate("/404");
            });
    }, []);

    function followUser() {
        http.post(`/user/follow/${username}`)
            .then((res) => {
                setCheckFollowed("Followed")
                window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
        })
    }

    function unfollowUser() {
        http.delete(`/user/unfollow/${username}`)
            .then((res) => {
                setCheckFollowed(null);
                window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
        })
    }

    // function checkSelf() {
    //     if (otherUser.emailAccount == user.emailAccount) {
    //         navigate("/user/viewAccount");
    //     }
    // }

    return (
        //  onLoad={() => {checkSelf()}}
        <div className="">
            {otherUser && (
                <div className="dark:text-white text-neutral-600">
                    <div className="mx-5 ">
                        <Breadcrumb className="mb-5">
                            <Breadcrumb.Item
                                href="/"
                                icon={HiHome}
                            >
                                <p>Home</p>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item
                                href={`/user/${otherUser.userName}`}
                            >
                                {otherUser.userName} Account
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div id="userAccountDetails">
                            <p className="text-3xl font-medium mb-10">
                                {otherUser.fullName}'s Account Details
                            </p>
                            <div className="my-3 flex flex-row">
                                <div
                                    id="userInfo"
                                    className="text-white mb-3 basis-1/6 mr-10 bg-slate-800 p-5 rounded-md"
                                >
                                    {otherUser &&
                                        otherUser.imageFile !== "No image" && ( // Had to be non-nullable
                                            <Avatar
                                                className=""
                                                img={`${
                                                    import.meta.env
                                                        .VITE_FILE_BASE_URL
                                                }${otherUser.imageFile}`}
                                                alt="Profile Picture"
                                                rounded
                                                bordered
                                                color={"success"}
                                                size="xl"
                                            ></Avatar>
                                        )}

                                    <div className="mt-6 text-center">
                                        <div
                                            id="fullName"
                                            className="mb-3"
                                        >
                                            <h1 className="dark:text-green-400 text-sky-500 font-medium text-xl">
                                                Full Name
                                            </h1>
                                            <p className="text-xl font-medium italic">
                                                {otherUser.fullName}
                                            </p>
                                        </div>
                                        <div
                                            id="userName"
                                            className="mb-3"
                                        >
                                            <h1 className="dark:text-green-400 text-sky-500 font-medium text-xl">
                                                Username
                                            </h1>
                                            <p className="text-xl font-medium italic">
                                                {otherUser.userName}
                                            </p>
                                        </div>
                                        <div
                                            id="emailAccount"
                                            className="my-3"
                                        >
                                            <h1 className="dark:text-green-400 text-sky-500 font-medium text-xl">
                                                Email Account
                                            </h1>
                                            <p className="text-xl font-medium italic">
                                                {otherUser.emailAccount}
                                            </p>
                                        </div>
                                        <div
                                            id="phoneNo"
                                            className="my-3"
                                        >
                                            <h1 className="dark:text-green-400 text-sky-500 font-medium text-xl">
                                                Phone Number
                                            </h1>
                                            <p className="text-xl font-medium italic">
                                                {otherUser.phoneNo}
                                            </p>
                                        </div>
                                        {!checkFollowed && (
                                            <Button
                                                className="bg-sky-500 text-white rounded px-2 py-1 mt-4 mb-10 text-md 
                        font-medium border-transparent border-2 border-solid hover:border-blue-500 
                        hover:border-2 hover:border-solid hover:transition-ease-in-out duration-300"
                                                onClick={() => followUser()}
                                            >
                                                Follow
                                            </Button>
                                        )}
                                        {checkFollowed && (
                                            <Button
                                                className="bg-sky-500 text-white rounded px-2 py-1 mt-4 mb-10 text-md 
                        font-medium border-transparent border-2 border-solid hover:border-blue-500 
                        hover:border-2 hover:border-solid hover:transition-ease-in-out duration-300"
                                                onClick={() => unfollowUser()}
                                            >
                                                Followed
                                            </Button>
                                        )}
                                        {otherUser && (
                                            <UserChatRoom
                                                otherUserAccount={`${otherUser.userName}`}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="basis-4/6 ml-10">
                                    <Tabs.Group
                                        aria-label="Tabs with underline"
                                        style="underline"
                                    >
                                        <Tabs.Item
                                            active
                                            icon={BiSolidBadgeDollar}
                                            title="Car Sales Listing"
                                        >
                                            <div className="grid grid-cols-3 ">
                                                {userCarSalesListing.length >
                                                0 ? (
                                                    userCarSalesListing.map(
                                                        (userListing, i) => {
                                                            return (
                                                                <div
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/Store/StoreSpecific/${userListing.carPlateNo}`
                                                                        )
                                                                    }
                                                                    className="bg-slate-800 mr-2 mb-2 rounded border-transparent border-solid border-2 hover:border-green-400 hover:transition-ease-in-out duration-300"
                                                                >
                                                                    <div className="p-5">
                                                                        <img
                                                                            src={`${
                                                                                import.meta
                                                                                    .env
                                                                                    .VITE_FILE_BASE_URL_STORE
                                                                            }${
                                                                                userListing.carImageFile
                                                                            }`}
                                                                            className="mb-3"
                                                                            alt="car image"
                                                                        />
                                                                        <p className="text-xl">
                                                                            {
                                                                                userListing.carBrand
                                                                            }{" "}
                                                                            {
                                                                                userListing.carModel
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            ${" "}
                                                                            {
                                                                                userListing.carPrice
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            Production:{" "}
                                                                            {
                                                                                userListing.carProductionDate
                                                                            }
                                                                        </p>
                                                                        <div className="my-6" />
                                                                        <p className="flex">
                                                                            <AiOutlineUser className="my-auto" />{" "}
                                                                            <span className="ml-1 text-green-500">
                                                                                {
                                                                                    userListing.emailAccount
                                                                                }
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <div>
                                                        <p className="text-xl font-medium">
                                                            There are currently
                                                            no cars for sale.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </Tabs.Item>
                                        <Tabs.Item
                                            icon={HiUserCircle}
                                            title="Followers"
                                        >
                                            <div className="grid grid-cols-3">
                                                {userFollowersList.length >
                                                0 ? (
                                                    userFollowersList.map(
                                                        (followers, i) => {
                                                            return (
                                                                <div className="p-2 mr-2 mb-2 bg-slate-800 text-center rounded">
                                                                    <a
                                                                        href={`/user/${followers.userName}`}
                                                                    >
                                                                        <div className="px-8">
                                                                            {followers &&
                                                                                followers.imageFile !==
                                                                                    "No image" && ( // Had to be non-nullable
                                                                                    <Avatar
                                                                                        className="py-2"
                                                                                        img={`${
                                                                                            import.meta
                                                                                                .env
                                                                                                .VITE_FILE_BASE_URL
                                                                                        }${
                                                                                            followers.imageFile
                                                                                        }`}
                                                                                        alt="Profile Picture"
                                                                                        rounded
                                                                                        bordered
                                                                                        color={
                                                                                            "success"
                                                                                        }
                                                                                        size="lg"
                                                                                    ></Avatar>
                                                                                )}
                                                                        </div>
                                                                        <p className="px-8 py-4">
                                                                            {
                                                                                followers.userName
                                                                            }
                                                                        </p>
                                                                    </a>
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <div className="">
                                                        <p className="text-xl font-medium mb-10">
                                                            There are currently
                                                            no followers.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </Tabs.Item>
                                    </Tabs.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewOtherUser;