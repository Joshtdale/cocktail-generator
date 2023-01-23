import React, { useState } from "react";
import axios from "axios";
// import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import Head from "next/head";

const APIUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
const APISearch = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
const APIAll = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";

function Drinks() {
    const [value, setValue] = useState("");
    const [data, setData] = useState([]);
    const [drink, setDrink] = useState({});
    const [selectedId, setSelectedId] = useState(null);
    
    async function getData(selector) {
        let response = "";
        if (selector === "spirit") {
            response = await axios.get(APIUrl + value);
            if (!response.data) {
                toast.error("Error. Enter valid ingredient", {
                    style: {
                        borderRadius: "20px",
                        background: "white",
                        color: "black",
                    },
                });
            }
        } else if (selector === "all") {
            response = await axios.get(APIAll);
            if (!response.data) {
                toast.error("Error", {
                    style: {
                        borderRadius: "20px",
                        background: "white",
                        color: "black",
                    },
                });
            }
        }
        
        setData(response.data);
    }
    
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            // console.log(event.target.value);
            if (value.toLowerCase() !== "all") {
                getData("spirit");
            } else {
                // console.log("You want all drinks");
                getData("all");
            }
            event.target.value = "";
        }
    };
    
    function getDataBtn(){
        const searchInput = document.getElementById('searchInput')
        if (value === ''){
            toast.error("Error. Enter valid ingredient", {
                style: {
                    borderRadius: "20px",
                    background: "white",
                    color: "black",
                },
            });
        } else {
            if (value.toLowerCase() === 'all') {
                getData('all');
            } else {
                getData("spirit");
            }
        }

        searchInput.value = ''
    }

    let filteredDrink = [];

    async function setter(item) {
        setSelectedId(item.idDrink);
        // let filteredDrink = data.drinks.filter((item) => item.idDrink === selectedId)
        const resp = await axios.get(APISearch + item.idDrink);
        filteredDrink.push(resp.data);
        // console.log(filteredDrink[0].drinks[0]);
        setDrink(filteredDrink[0].drinks[0]);
    }

    // Api returns ingredients & measurements in main object not in arrays
    // These loops check for keys that match and pushes them to corresponding array
    let count = 0;
    let ingredients = [];

    for (const key of Object.keys(drink)) {
        // Loops through ingredients in data object
        if (key.includes("strIngredient") && drink[key]) {
            ingredients.push(drink[key]);
        }
    }

    let measurements = [];

    for (const key of Object.keys(drink)) {
        // Loops through measurements in data object
        if (key.includes("strMeasure") && drink[key]) {
            measurements.push(drink[key]);
        }
    }

    return (
        <>
            <Head>
                <title>Search Cocktail</title>
                <meta name="description" content="Random cocktail recipe generator" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container-fluid">
                <div>
                    <Toaster position="bottom-right" reverseOrder={false} />
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-8 m-2 randomDrink rounded d-flex justify-content-center align-items-center text-center">
                        <h1 className="pageDescription m-2">Search Cocktail Recipes</h1>
                    </div>
                </div>
                <div className="row d-flex justify-content-center text-center">
                    <div className="mt-5 d-flex justify-content-center align-items-center">
                        <div className="col-12">
                            <motion.input
                                whileHover={{ scale: 1.01 }}
                                className="searchInput"
                                id="searchInput"
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                type="text"
                                placeholder="Search by ingredient"
                            />
                            <motion.button
                                whileHover={{ scale: 1.5 }}
                                whileTap={{ scale: 0.9 }}
                                className="searchBtn"
                                onClick={getDataBtn}
                            >
                                <ion-icon name="search-outline"></ion-icon>
                            </motion.button>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center text-center">
                        <div className="col">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="allBtn mt-2"
                                onClick={() => getData("all")}
                            >
                                View All
                            </motion.button>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center mx-3">
                    {data.drinks &&
                        data.drinks.map((item) => {
                            return (
                                <motion.div
                                    key={item.idDrink}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    whileHover={{ scale: 1.3 }}
                                    whileTap={{ scale: 0.9 }}
                                    exit={{ scale: 0 }}
                                    transition={{
                                        duration: 0.6,
                                    }}
                                    className="col-lg-3 col-md-4 col-sm-4 col-xs-8 drinkCard m-4"
                                    layoutId={item.idDrink}
                                    onClick={() => setter(item)}
                                >
                                    <motion.div className="row d-flex justify-content-center">
                                        <motion.div className="col-12 m-2 text-center d-flex justify-content-center">
                                            <motion.h5 className="drinkName">
                                                {item.strDrink}
                                            </motion.h5>
                                        </motion.div>
                                        <motion.div className="col-12 m-2 d-flex justify-content-center">
                                            <motion.img
                                                className="drinkSearchImg"
                                                src={item.strDrinkThumb}
                                            />
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}

                    <AnimatePresence>
                        {selectedId && (
                            <motion.div
                                onClick={() => setSelectedId(null)}
                                className="container-fluid modalContainer"
                            >
                                <motion.button
                                    initial={{ x: -400 }}
                                    animate={{ x: 0 }}
                                    whileHover={{ rotate: 180, opacity: 1, scale: 1.5 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        duration: 1,
                                    }}
                                    className="backBtn d-flex justify-content-center"
                                    onClick={() => setSelectedId(null)}
                                >
                                    <ion-icon name="close-circle-outline"></ion-icon>{" "}
                                </motion.button>
                                <motion.div className="row d-flex justify-content-center">
                                    <motion.div
                                        // initial={{rotate: 0}}
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 1,
                                        }}
                                        className="col-lg-6 col-sm-8 card d-flex justify-content-center text-center drinkModal bg-light"
                                        layoutId={selectedId}
                                    >
                                        <motion.h5 className="drinkName m-3">
                                            {drink.strDrink}
                                        </motion.h5>
                                        <motion.div className="fs-5">Ingredients</motion.div>
                                        <motion.div className="row w-100 d-flex justify-content-center align-items-center">
                                            <motion.div
                                                initial={{ x: -400 }}
                                                animate={{ x: 0 }}
                                                transition={{
                                                    duration: 1,
                                                }}
                                                className="ingredientCard col-lg-6 col-sm-8 shadow"
                                            >
                                                {ingredients.map((item) => {
                                                    count += 1;
                                                    return (
                                                        <motion.div key={count} className="ingredients">
                                                            {measurements[count - 1]} - {item}
                                                        </motion.div>
                                                    );
                                                })}
                                            </motion.div>
                                        </motion.div>

                                        <motion.div className="fs-5">Directions</motion.div>
                                        <motion.div
                                            initial={{ x: 400 }}
                                            animate={{ x: 0 }}
                                            transition={{
                                                duration: 1,
                                            }}
                                            className="ingredientCard ingredients col-lg-6 col-sm-8 shadow"
                                        >
                                            {drink.strInstructions}
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}

export default Drinks;
