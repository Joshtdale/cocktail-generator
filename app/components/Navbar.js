import React, { useEffect, useState } from "react";
import logo from "../styles/images/logo.png";
import Image from "next/image";
import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import { motion } from "framer-motion";
// import Header from "./Header";



function Navbar(props) {
    useEffect(() => {
        // const list = document.querySelectorAll('.list');
        const firstLi = document.getElementById("firstLi");
        const secondLi = document.getElementById("secondLi");
        const thirdLi = document.getElementById("thirdLi");
        const location = window.location.href;
        if (location.includes("drinks")) {
            secondLi.classList.add("active");
        } else if (location.includes("test")) {
            thirdLi.classList.add("active");
        } else {
            firstLi.classList.add("active");
        }
    }, []);

    const activate = (event) => {
        // setState(event.currentTarget.id)
        const list = document.querySelectorAll(".list");
        list.forEach((item) => item.classList.remove("active"));
        event.currentTarget.classList.add("active");
    };

    return (
        <div className="container-fluid navContainer">
            {/* <Header /> */}
            <motion.div
                className="navigation"
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", duration: 0.6 }}
            >
                <ul className="p-0 d-flex justify-content-center">
                    <li id="firstLi" onClick={activate} className="list">
                        <Link href="/">
                            <span className="icon">
                                <motion.div
                                    whileHover={{ rotate: 360, opacity: 1, scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        duration: 1,
                                    }}
                                >
                                    <ion-icon name="home-outline"></ion-icon>
                                </motion.div>
                            </span>
                            <span className="text">Home</span>
                        </Link>
                    </li>
                    <li id="secondLi" onClick={activate} className="list">
                        <Link href="drinks">
                            <span className="icon">
                                <motion.div
                                    whileHover={{ rotate: 360, opacity: 1, scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        duration: 1,
                                    }}
                                >
                                    <ion-icon name="search-outline"></ion-icon>
                                </motion.div>
                            </span>
                            <span className="text">Search</span>
                        </Link>
                    </li>
                    {/* <li id="thirdLi" onClick={activate} className="list">
            <Link href="#">
              <span className="icon">
                <motion.div
                  whileHover={{ rotate: 360, opacity: 1, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 1,
                  }}
                  >
                  <ion-icon name="wine-outline"></ion-icon>
                </motion.div>
              </span>
              <span className="text">About</span>
            </Link>
          </li> */}
                    <div className="indicator"></div>
                </ul>
            </motion.div>
        </div>

    );
}

export default Navbar;
