import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./../App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import http from "./../http";
import { Footer } from 'flowbite-react';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

function EcoLifeFooter() {
    return (
        <Footer>
            <div className="w-full text-center bg-gradient-to-b dark:from-black dark:to-gray-900 from-white to-slate-100 p-10 border-soild border-t-2 border-gray-800">
                <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                    <h1
                        className="w-fit | bg-gradient-to-r dark:from-green-400 dark:to-emerald-600 from-sky-400 to-blue-500 text-transparent bg-clip-text |
            hover:ease-in-out duration-300 | italic font-semibold text-4xl"
                    >
                        Ecolife
                    </h1>
                    <div>
                        <Footer.LinkGroup>
                            <Footer.Link href="/documentations">Documentations</Footer.Link>
                            <Footer.Link>About</Footer.Link>
                            <Footer.Link>Privacy Policy</Footer.Link>
                            <Footer.Link>Contact Us</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright
                        by="Ecolife™"
                        href="#"
                        year={2023}
                    />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon
                            href="#"
                            icon={BsFacebook}
                        />
                        <Footer.Icon
                            href="#"
                            icon={BsInstagram}
                        />
                        <Footer.Icon
                            href="#"
                            icon={BsTwitter}
                        />
                        <Footer.Icon
                            href="#"
                            icon={BsGithub}
                        />
                    </div>
                </div>
            </div>
        </Footer>
    );
}

export default EcoLifeFooter;