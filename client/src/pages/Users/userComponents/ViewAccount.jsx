import React, { useState, useEffect, useContext } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";
import "./../../../App.css";
import http from "../../../http";
import { format } from "date-fns";
import {
    Box,
    Button,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Rating,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import { Formik, useFormik } from "formik";
import { Accordion, Avatar, Badge, Breadcrumb } from "flowbite-react";
import {
    HiHome,
    HiAdjustments,
    HiClipboardList,
    HiUserCircle,
    HiUser,
} from "react-icons/hi";
import { BiSolidBadgeDollar, BiReceipt, BiDollar } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { AiOutlineUser, AiFillCar, AiFillDollarCircle } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { Tabs } from "flowbite-react";
import { Modal } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../../contexts/UserContext";
import * as yup from "yup";
import charging from "./../../../../../client/src/assets/CarouselUserTrialCars/charging.png"
import dayjs from 'dayjs';
function ViewAccount() {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);
    const [openModals, setOpenModal] = useState([]);
    const [user, setUser] = useState({
        fullName: "",
        userName: "",
        emailAccount: "",
        phoneNo: "",
        id: "",
        imageFile: "",
    });

    const [ userCarSalesListing, setUserCarSalesListing ] = useState([]);
    const [ userStoreReceiptList, setUserStoreReceiptList ] = useState([]);
    const [ userFollowersList, setUserFollowersList ] = useState([]);
    const [ userReceiptList, setUserReceiptList ] = useState([]);
    const [ selectedTrialReceipt, setSelectedTrialReceipt ] = useState({
        trialReceiptId: "",
        dateOfTrial: "",
        trialReport: "",
        modelName: "",
        faultResolve: "",
        trialStatus: "",
        emailAccount: "",
        ratings: 0,
    });
    const logout = () => {
        localStorage.clear();
        window.location = "/";
    };

    const formik = useFormik({
        initialValues: selectedTrialReceipt,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            ratings: yup.number().required(),
        }),
        onSubmit: (data) => {
            const formData = {
                ratings: data.ratings.trim(),
            };

            http.put(
                `trials/viewSpecificTrialReceipt/addRating/${selectedTrialReceipt.trialReceiptId}`,
                formData
            )
                .then((res) => {
                    console.log(res.status);
                    window.location.reload();
                })
                .catch(function (err) {
                    console.log(err);
                    toast.error(`${err.response.data.message}`);
                });
        },
    });

    const handleGiveFeedback = (trialReceiptId) => {
        setSelectedTrialReceipt((prev) => ({
            ...prev,
            trialReceiptId: trialReceiptId,
        }));
        toggleModal();
    };

    try {
        useEffect(() => {
            if (userInfo) {
                localStorage.setItem("userImageFile", `${user.imageFile}`);
                user.imageFile = localStorage.getItem("userImageFile");
            }
        }, [user]);
    } catch (err) {
        console.log(err);
        user.imageFile = localStorage.getItem("userImageFile");
    }

    useEffect(() => {
        http.get("/trials/viewUserTrialReceipt")
            .then((res) => {
                setUserReceiptList(res.data);
                console.log("User Receipts successfully logged.");
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        http.get("/user/viewAccount")
            .then((res) => {
                setUser(res.data);
                console.log("User Info successfully logged.");
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        http.get("/user/viewAccount/carListing")
            .then((res) => {
                setUserCarSalesListing(res.data);
                console.log("User Car Listing successfully logged.");
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        http.get("/store/viewStoreReceipt")
            .then((res) => {
                setUserStoreReceiptList(res.data);
                console.log(res.data)
                console.log("User Store Receipts successfully logged.");
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [])

    useEffect(() => {
        http.get("/user/viewAccount/allFollowers")
            .then((res) => {
                setUserFollowersList(res.data);
                console.log("User followers successfully logged.");
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    const toggleModal = (index) => {
        setOpenModal((prevOpenModals) => {
            const updatedModals = [...prevOpenModals];
            updatedModals[index] = !updatedModals[index];
            return updatedModals;
        });
    };

    useEffect(() => {
        setOpenModal((prevOpenModals) => {
            return prevOpenModals.map((modal, index) => (modal ? true : false));
        });
    }, []);

    return (
        <div className="dark:text-white text-neutral-600">
            <div className="mx-5 ">
                <Breadcrumb className="mb-5">
                    <Breadcrumb.Item
                        href="/"
                        icon={HiHome}
                    >
                        <p>Home</p>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/user/viewAccount">
                        My Account
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div id="userAccountDetails">
                    <p className="text-3xl font-medium mb-10">
                        {user.fullName}'s Account Details
                    </p>
                    <div className="my-3 flex flex-row h-fit">
                        <div
                            id="userInfo"
                            className="text-white mb-3 basis-1/6 mr-10 bg-slate-800 p-5 rounded-md"
                        >
                            {user &&
                                user.imageFile !== "No image" && ( // Had to be non-nullable
                                    <Avatar
                                        className=""
                                        img={`${
                                            import.meta.env.VITE_FILE_BASE_URL
                                        }${user.imageFile}`}
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
                                        {user.fullName}
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
                                        {user.userName}
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
                                        {user.emailAccount}
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
                                        {user.phoneNo}
                                    </p>
                                </div>
                                <Button
                                    className="bg-sky-500 text-white rounded px-2 py-1 mt-4 mb-10 text-md 
                        font-medium border-transparent border-2 border-solid hover:border-blue-500 
                        hover:border-2 hover:border-solid hover:transition-ease-in-out duration-300"
                                    onClick={() =>
                                        navigate("/user/viewAccount/settings")
                                    }
                                >
                                    Settings
                                </Button>
                            </div>
                        </div>

                        <div className="basis-4/6 ml-10 h-full">
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
                                        {userCarSalesListing.length > 0 ? (
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
                                                                <div className="bg-black/40 p-3">
                                                                    <p className="text-xl flex">
                                                                        <AiFillCar className="my-auto" />{" "}
                                                                        <span className="my-auto ml-2">
                                                                            {
                                                                                userListing.carBrand
                                                                            }{" "}
                                                                            {
                                                                                userListing.carModel
                                                                            }
                                                                        </span>
                                                                    </p>
                                                                    <p className="flex">
                                                                        <BiDollar className="my-auto " />{" "}
                                                                        <span className="ml-3">
                                                                            {
                                                                                userListing.carPrice
                                                                            }
                                                                        </span>
                                                                    </p>
                                                                    <p className="flex">
                                                                        <BsCalendarDate className="my-auto" />{" "}
                                                                        <span className="ml-3">
                                                                            {
                                                                                userListing.carProductionDate
                                                                            }
                                                                        </span>
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
                                                        </div>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <div>
                                                <p className="text-xl font-medium">
                                                    You currently has no cars
                                                    for sale.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item
                                    icon={BiReceipt}
                                    title="Store Receipt"
                                >
                                    <div className="grid grid-cols-3">
                                        {userStoreReceiptList.length > 0 ? (
                                            userStoreReceiptList.map(
                                                (userListing, i) => {
                                                    return (
                                                        <div className="bg-slate-800 p-5 mr-2 mb-2 ">
                                                            <div className="">
                                                                <p className="text-xl flex">
                                                                    <BiReceipt className="my-auto" />{" "}
                                                                    <span className="my-auto ml-2 text-xs text-ellipsis overflow-hidden">
                                                                        {
                                                                            userListing.carReceiptId
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <p className="text-xl flex mt-5">
                                                                    <AiFillCar className="my-auto" />{" "}
                                                                    <span className="my-auto ml-2">
                                                                        {
                                                                            userListing.carBrand
                                                                        }{" "}
                                                                        {
                                                                            userListing.carModel
                                                                        }{ " " }
                                                                        ({
                                                                            userListing.carPlateNo
                                                                        })
                                                                    </span>
                                                                </p>
                                                                <p className="text-xl flex mt-2">
                                                                    <BiSolidBadgeDollar className="my-auto" />{" "}
                                                                    <span className="my-auto ml-2">
                                                                        To be added...
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <div className="text-xl font-medium">
                                                You currently have no Store
                                                receipts.
                                            </div>
                                        )}
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item
                                    icon={BiReceipt}
                                    title="Trial Receipt"
                                >
                                    <div className="grid grid-cols-3">
                                        {userReceiptList.length > 0 ? (
                                            userReceiptList.map(
                                                (userListing, i) => {
                                                    const formattedDate = dayjs(userListing.dateOfTrial).format('YYYY-MM-DD');
                                                    const formattedTime = dayjs(userListing.dateOfTrial).format('hA');
                                                    

                                                    return (
                                                        <div
                                                            key={
                                                                userListing.trialReceiptId
                                                            }
                                                            className="bg-slate-800 mr-2 mb-2"
                                                        >
                                                            <div className="p-5">
                                                                <p className="text-xs text-white/60 mb-4">
                                                                    <span>
                                                                        {
                                                                            userListing.trialReceiptId
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <p className="text-xl font-medium">
                                                                    Model Name:{" "}
                                                                    <span className="text-green-400">
                                                                        {
                                                                            userListing.modelName
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <p className="text-xl mt-3">
                                                                    Date of
                                                                    Trial:{" "}
                                                                    <br />
                                                                    <span className="text-green-400">
                                                                        {
                                                                            formattedDate
                                                                        }{" "}
                                                                        {
                                                                            formattedTime
                                                                        }
                                                                    </span>
                                                                </p>
                                                                <p className="text-xl mt-3">
                                                                    Trial
                                                                    Status:{" "}
                                                                    <br />
                                                                    <span className="text-green-400">
                                                                        {
                                                                            userListing.trialStatus
                                                                        }
                                                                    </span>
                                                                </p>

                                                                {userListing.trialStatus ===
                                                                "Finished" ? (
                                                                    <button
                                                                        onClick={() => {
                                                                            toggleModal(
                                                                                i
                                                                            );
                                                                            handleGiveFeedback(
                                                                                userListing.trialReceiptId
                                                                            );
                                                                        }}
                                                                        className={`mt-3 ${
                                                                            userListing.ratings ===
                                                                                null ||
                                                                            userListing.ratings ===
                                                                                0
                                                                                ? "bg-green-400 text-white transition duration-300 hover:bg-green-600 hover:text-black"
                                                                                : "bg-gray-400 text-gray-600"
                                                                        } px-4 py-2 rounded ${
                                                                            userListing.ratings !==
                                                                                null &&
                                                                            userListing.ratings !==
                                                                                0
                                                                                ? "disabled"
                                                                                : ""
                                                                        }`}
                                                                        disabled={
                                                                            userListing.ratings !==
                                                                                null &&
                                                                            userListing.ratings !==
                                                                                0
                                                                        }
                                                                        title={
                                                                            userListing.ratings !==
                                                                            null
                                                                                ? "Feedback already submitted"
                                                                                : ""
                                                                        }
                                                                    >
                                                                        Give
                                                                        Feedback
                                                                    </button>
                                                                ) : (
                                                                    <br />
                                                                )}
                                                                <br />

                                                                <Modal
                                                                    dismissible
                                                                    show={
                                                                        openModals[
                                                                            i
                                                                        ] ===
                                                                        true
                                                                    }
                                                                    onClose={() =>
                                                                        toggleModal(
                                                                            i
                                                                        )
                                                                    }
                                                                >
                                                                    <Modal.Header>
                                                                        Feedback
                                                                        for{" "}
                                                                        {
                                                                            userListing.modelName
                                                                        }
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <form
                                                                            onSubmit={
                                                                                formik.handleSubmit
                                                                            }
                                                                        >
                                                                            <div className="space-y-6">
                                                                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                                                    On
                                                                                    a
                                                                                    scale,
                                                                                    how
                                                                                    did
                                                                                    you
                                                                                    enjoy
                                                                                    the
                                                                                    car?
                                                                                    <div>
                                                                                        <Rating
                                                                                            value={parseFloat(
                                                                                                formik
                                                                                                    .values
                                                                                                    .ratings
                                                                                            )}
                                                                                            onChange={
                                                                                                formik.handleChange
                                                                                            }
                                                                                            name="ratings"
                                                                                            precision={
                                                                                                0.5
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                </p>
                                                                            </div>
                                                                        </form>
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <Button
                                                                            type="submit"
                                                                            className="bg-green-400 text-white hover:bg-green-600 hover:text-black"
                                                                            onClick={
                                                                                formik.handleSubmit
                                                                            }
                                                                        >
                                                                            Submit
                                                                        </Button>
                                                                        <button
                                                                            onClick={() =>
                                                                                toggleModal(
                                                                                    i
                                                                                )
                                                                            }
                                                                            className="px-3 py-2 bg-sky-400 hover:bg-sky-600 hover:text-white rounded font-medium"
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </Modal.Footer>
                                                                </Modal>
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
                                                    You currently have no
                                                    receipts listed
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
                                        {userFollowersList.length > 0 ? (
                                            userFollowersList.map(
                                                (followers, i) => {
                                                    return (
                                                        <div className="p-2 mb-2 mr-2 bg-slate-800 text-center rounded">
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
                                                    You currently have no
                                                    followers.
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
    );
}

export default ViewAccount;
