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
            className="w-max | text-white hover:text-black | dark:hover:bg-gradient-to-r from-green-400 to-emerald-600 | border-white dark:border-green-500 border-solid border-2 rounded hover:ease-in-out hover:scale-110 duration-300 | font-semibold text-xl | mx-4 mr-10 m-10 px-2 py-1 | float-right inline "
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

  const onClickSort = (e) => {
    sortStore(e);
  }
  const sortStore = (sort) => {
    http.get(`/store/viewStore?search=${sort}`).then((res) => {
      setStoreList(res.data);
    });
  }

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

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <Box>
      <div className="">
        <div className="text-white | text-3xl | m-10 | inline-flex">
          Categories:
        </div>
        <button className="text-white | text-2xl | mx-5 border rounded px-5 p-3 transition ease-in-out delay-150 hover:scale-110 duration-300" onClick={() => onClickSort("")}>All</button>
        <button className="text-white | text-2xl | mx-5 border rounded px-5 p-3 transition ease-in-out delay-150 hover:scale-110 duration-300" onClick={() => onClickSort("Electric")}>Electric</button>
        <button className="text-white | text-2xl | mx-5 border rounded px-5 p-3 transition ease-in-out delay-150 hover:scale-110 duration-300" onClick={() => onClickSort("Hybrid")}>Hybrid</button>
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
              <div className="text-white shadow-lg bg-slate-800 pt-2 my-2 group border-2 border-transparent border-solid hover:border-green-500 duration-300 hover:ease-in-out hover:scale-105">
                  <Link onClick={handleClick} to={`/Store/StoreSpecific/${store.carPlateNo}`}>
                      <div className="pt-3">
                          <DefaultImage
                              className="text-2xl font-medium px-5 w-fit h-80 m-auto"
                              src={`${
                                  import.meta.env.VITE_FILE_BASE_URL_STORE
                              }${store.carImageFile}`}
                          />
                          <div className="mx-5 my-2 p-3 bg-black/60">
                              <p className="text-2xl font-medium pt-5">
                                  {store.carBrand} {store.carModel}
                              </p>
                              <p className="text-xl">
                                  ${store.carPrice.toLocaleString()}
                              </p>
                              <p>Production: {store.carProductionDate}</p>
                              <p className="flex pt-3 pb-2">
                                  <AiOutlineUser className="mt-1" />{" "}
                                  <span className="pl-1 text-green-400">
                                      <a href="/user/MuelMuel">
                                          {store.emailAccount}
                                      </a>
                                  </span>
                              </p>
                          </div>
                      </div>
                  </Link>
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
