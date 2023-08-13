import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Typography,
    Grid,
    Card,
    Container,
    CardContent,
    Input,
    IconButton,
    Button,
} from "@mui/material";
import "../App.css";

function Ecolife() {
    const [loadedTitle, setLoadedTitle] = useState(false);
    let handleLoad = () => {
        setLoadedTitle(true);
    };

    useEffect(() => {
        document.getElementById("title").addEventListener("load", handleLoad());
    }, []);

    return (
        <Container className="font-medium text-2xl text-zinc-400">
            <div className="text-center">
                <p
                    id="title"
                    className={`text-6xl font-bold text-green-400 ${
                        loadedTitle
                            ? "opacity-100 tracking-widest"
                            : "opacity-0 tracking-normal"
                    } duration-500 transition-ease-in`}
                >
                    ECOLIFE
                </p>
                <p
                    className={`font-light text-xl ${
                        loadedTitle ? "opacity-100" : "opacity-0"
                    } duration-700`}
                >
                    Here's how Ecolife ensures you get the right electric
                    vehicle.
                </p>
            </div>
            <div className="">
                <div
                    className={`grid grid-rows-3 grid-cols-2 my-5 p-5 space-x-5 rounded-md text-slate-700 font-bold`}
                    id="bentoBoxes"
                >
                    <div className="row-span-3 rounded-lg p-5 bg-white/90 ">
                        <p className=" text-lg">Trial Cars</p>
                        <div className="mt-8">
                            <p className="text-4xl text-green-600 font-extrabold">
                                Can't Decide?
                            </p>
                            <p className="text-4xl font-extrabold">
                                We got you.
                            </p>
                        </div>
                        <p className="py-3 font-medium text-lg w-2/3">
                            
                            <span>
                                Here at Ecolife, customers are able to trial the
                                latest cars for a small fee.
                            </span>
                            <br />
                            <span>
                                Rent it for a day and drive to your hearts
                                content to see if the car suits your needs.
                            </span>
                        </p>
                        
                        <button className="flex hover:translate-x-6 transition ease-in-out duration-300 mt-4">
                            <span className="text-xl">Find Out More </span>
                            <svg
                                className="w-6 text-slate-700 my-auto mx-1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 25 25"
                            >
                                <path
                                    d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
                                    data-name="Right"
                                />
                            </svg>
                        </button>
                        
                    </div>
                    <div className="row-span-2 p-5 mb-2 rounded-lg bg-white/90">
                        <p className="text-lg">Store</p>
                        <div className="mt-4">
                            <p className="text-4xl text-green-600 font-extrabold">
                                Consumer's{" "}
                                <span className="text-slate-700">Market</span>
                            </p>
                        </div>
                        <p className="py-3 font-medium text-lg w-5/6">
                            <span>
                                Store run by the people, for the people.
                            </span>
                            <br />
                            <span>
                                Electric Vehicles sold in the store are all
                                users' submissions.
                            </span>
                        </p>
                        <button className="flex hover:translate-x-6 transition ease-in-out duration-300 mt-4">
                            <span className="text-xl">Find Out More </span>
                            <svg
                                className="w-6 text-slate-700 my-auto mx-1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 25 25"
                            >
                                <path
                                    d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
                                    data-name="Right"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="p-5 mt-2 rounded-lg bg-white/90">
                        <p className="text-lg">Users</p>
                        <div className="font-extrabold text-3xl">
                            Sign up now,{" "}
                            <span className="text-green-600">
                                don't miss out.
                            </span>
                        </div>
                        <button className="text-lg bg-green-500 mt-2 px-2 py-1 rounded-lg hover:text-green-700 hover:bg-transparent border-2 border-transparent border-solid hover:border-slate-700 transition ease-in-out duration-300">
                            Join us
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <div className="text-center font-medium">
                    <p className="font-extrabold text-4xl">
                        <span className="bg-gradient-to-br from-green-300 to-emerald-600 text-transparent bg-clip-text tracking-wider">
                            CHARGE
                        </span>{" "}
                        WITH US
                    </p>
                    <p className="font-semibold mt-2">
                        Charge your Electric Vehicle with us.
                    </p>
                    <p className="mx-auto text-lg font-light w-1/2">
                        With chargers all around Singapore, provided by yours
                        truly, do not fear your battery going flat.
                    </p>
                    <button className="mt-4">
                        <span className="hover:tracking-wider text-xl text-green-400 hover:transition-ease-in-out duration-300 ">
                            Find Out More
                        </span>
                    </button>
                    <br />
                    <p className="font-semibold mt-5">
                        Join our Membership today.
                    </p>
                    <p className="mx-auto text-lg font-light w-1/2">
                        Get discounts when charging your vehicles and updates
                        for the latest deals.
                    </p>
                    <button className="mt-4">
                        <span className="hover:tracking-wider text-xl text-green-400 hover:transition-ease-in-out duration-300 ">
                            Find Out More
                        </span>
                    </button>
                </div>
            </div>
            <div className="mt-20 mb-5 bg-white/90 rounded-lg p-5">
                <div className="text-slate-700 font-medium">
                    <p className="text-4xl font-extrabold pt-3">
                        Why{" "}
                        <span className="text-green-600">
                            Electric Vehicles?
                        </span>
                    </p>
                    <div className="mb-4">
                        <p className="text-lg font-base">
                            Here are the 3 most common reasons why:
                        </p>
                    </div>
                    <div className="grid grid-cols-3 space-x-5">
                        <div className="bg-black/10 p-5 rounded">
                            <p className="font-bold">Cost Saving</p>
                            <p className="text-base font-medium">
                                Lower fuel costs, reduced maintanence costs,
                                higher energy efficiency. These are just some of
                                the many cost saving reasons why you should get
                                an electric vehicle.
                            </p>
                            <br />
                            <p className="text-base font-medium">
                                The average cost of powering an electric vehicle
                                per mile is $0.04 compared to a gasoline
                                vehicle's $0.10.
                            </p>
                        </div>
                        <div className="bg-black/10 p-5 rounded">
                            <p className="font-bold">Better Acceleration</p>
                            <p className="text-base font-medium">
                                Hate getting stuck behind slow drivers? Maybe
                                you want to live life in the fast lane. Then an
                                electric vehicle would be perfect for you.
                            </p>
                            <br />
                            <p className="text-base font-medium">
                                Electric vehicles produces instant torque,
                                providing it with a better acceleration than
                                gasoline cars.
                            </p>
                        </div>
                        <div className="bg-black/10 p-5 rounded">
                            <p className="font-bold">Cleaner Emissions</p>
                            <p className="text-base font-medium">
                                Care about the environment? If so, it's time to
                                get an electric vehicle.
                            </p>
                            <br />
                            <p className="text-base font-medium">
                                Electric vehicles produce zero tailpipe
                                emissions, reducing greenhouse gases and air
                                pollutants, thereby contributing to cleaner air
                                and mitigating climate change.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Ecolife;
