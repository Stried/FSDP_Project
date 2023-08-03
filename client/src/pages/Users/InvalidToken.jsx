import React from "react";

function InvalidToken() {
    return (
        <div>
            <h1 className="text-9xl text-green-500 font-bold tracking-wider m-10 mb-0 p-10 pb-0">
                400{" "}
                <span className="text-6xl font-medium tracking-wide">
                    Error
                </span>
            </h1>
            <p className="text-white mx-10 px-10 text-3xl">
                It seems the token you've submitted is invalid!
                <br />
                Please check your link and try again.
            </p>
            <p className="text-white mx-10 mt-10 px-10 pt-10 text-3xl">
                Return to{" "}
                <a
                    href="/user/forgetPassword"
                    className="text-green-500"
                >
                    Forget Password
                </a>
            </p>
        </div>
    );
}

export default InvalidToken;
