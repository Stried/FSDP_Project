import React, { useContext, useEffect, useState } from "react";
import { Box, Input, IconButton } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import StoreAddItem from "../Store/StoreAddItem";
import StoreSpecific from "../Store/StoreSpecific";
import { Link, Routes, Route, useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import http from "../../http";
import { AiOutlineUser } from "react-icons/ai";
import DefaultImage from "./../../../DefaultImage";

function User(props) {
  const isUser = props.isUser;
  if (isUser) {
    return (
      <div className="inline">
        <Link to="/Store/StoreAddItem">
          <button
            type="button"
            className="w-max | text-white hover:text-black | dark:hover:bg-gradient-to-r from-green-400 to-emerald-600 | border-white dark:border-green-500 border-solid border-2 rounded   hover:ease-in-out duration-300 | font-semibold text-xl | mx-4 mr-10 m-10 px-2 py-1 | float-right inline"
          >
            Sell your vehicle here!
          </button>
        </Link>
      </div>
    );
  }
}

function StoreMain() {
  const { user } = useContext(UserContext);

  const [storeList, setStoreList] = useState([]);
  useEffect(() => {
    http.get("/store/viewStore").then((res) => {
      console.log(res.data);
      setStoreList(res.data);
    });
  }, []);

  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const getStore = () => {
    http.get("/store/viewStore").then((res) => {
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
  };
  const onClickClear = () => {
    setSearch("");
    getStore();
  };

  return (
    <Box>
      <div className="">
        <div className="text-white | text-3xl | m-10 | inline-flex">
          Categories
        </div>
        <button className="text-white | text-2xl | mx-10">All</button>
        <button className="text-white | text-2xl | mx-10">Electric</button>
        <button className="text-white | text-2xl | mx-10">Hybrid</button>
        {user && <User isUser={user.id} />}
      </div>
      <div className="ml-7 flex">
        <Input
          value={search}
          placeholder="Search"
          onChange={onSearchChange}
          className="text-green-400 pl-3"
          onKeyDown={onSearchKeyDown}
        />
        <IconButton
          color="primary"
          className="text-green-400"
          onClick={onClickSearch}
        >
          <Search />
        </IconButton>
        <IconButton
          color="primary"
          className="text-green-400"
          onClick={onClickClear}
        >
          <Clear />
        </IconButton>
      </div>
      <br />
      <div className="grid grid-cols-3 mx-10 gap-x-5 mb-10">
        {storeList.map((store, i) => {
          return (
            <div className="text-white shadow-lg shadow-zinc-700/60 pt-2 pl-2 group hover:shadow-xl hover:shadow-zinc-700/60 hover:pl-4 duration-300 hover:ease-in-out">
              <Link to={`/Store/StoreSpecific/${store.carPlateNo}`}>
                <button className="h-full float-right z-10 bg-gradient-to-r from-white/0 from-20% to-gray-400 hidden group-hover:inline w-5/12">
                  <div className="h-full translate-y-1/3 translate-x-2/3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="3em"
                      viewBox="0 0 512 512"
                      className="text-gray-800"
                    >
                      <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                    </svg>
                  </div>
                </button>
              </Link>

              <div className="pt-3 pl-2 w-4/5">
                <DefaultImage
                  className="text-2xl font-medium pt-5"
                  src={`${import.meta.env.VITE_FILE_BASE_URL_STORE}${
                    store.carImageFile
                  }`}
                />
                <p className="text-2xl font-medium pt-5">
                  {store.carBrand} {store.carModel}
                </p>
                <p className="text-xl">${store.carPrice.toLocaleString()}</p>
                <p>Production: {store.carProductionDate}</p>
                <p className="flex pt-3 pb-2">
                  <AiOutlineUser className="mt-1" />{" "}
                  <span className="pl-1 text-green-400">
                    <a href="/user/MuelMuel">{store.emailAccount}</a>
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Routes>
        <Route path={"/StoreAddItem"} element={<StoreAddItem />} />
        <Route path={"/StoreSpecific/:id"} element={<StoreSpecific />} />
      </Routes>
    </Box>
  );
}

export default StoreMain;
