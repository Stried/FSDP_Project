import React from "react";
import "../App.css";

function PageNotFound() {
    return (
        <div>
            <h1 className="text-9xl text-green-500 font-bold tracking-wider m-10 mb-0 p-10 pb-0">
                404 <span className="text-6xl font-medium tracking-wide">Error</span>
            </h1>
            <p className="text-white mx-10 px-10 text-3xl">
                It seems the page you are looking for is not found!
            </p>
            <p className="text-white mx-10 mt-10 px-10 pt-10 text-3xl">
                Return to <a href="/" className="text-green-500">Home</a>
            </p>
        </div>
    )
}

export default PageNotFound;