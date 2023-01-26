import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });
const APIUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// export async function getStaticProps() {

//   const res = await fetch(APIUrl);
//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default function Home() {
  const [data, setData] = useState([])

  async function getData() {
    const response = await axios.get(APIUrl)
    setData(response.data)
  }

  useEffect(() => {
    getData()
  }, []);


  let ingredients = [];
  let measurements = [];

  let count = 0;

  return (
    <>
      <Head>
        <title>Cocktail Generator</title>
        <meta name="description" content="Random cocktail recipe generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-8 m-2 randomDrink rounded d-flex justify-content-center align-items-center text-center">
            <h1 className="pageDescription m-2">Random Cocktail Recipe</h1>
          </div>
          {/* <div className="col-lg-6 col-md-6 col-sm-8 m-2 randomDrink rounded d-flex justify-content-center align-items-center text-center"> */}
          {/* </div> */}
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <motion.button
            whileHover={{ opacity: 1, scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            className="col-lg-6 col-md-6 col-sm-8 m-2 newDrinkBtn" onClick={getData}>New Drink</motion.button>
        </div>
        {data.drinks && data.drinks.map((item) => {
          for (const key of Object.keys(item)) {
            if (key.includes("strIngredient") && item[key]) {
              ingredients.push(item[key]);
            }
          }

          for (const key of Object.keys(item)) {
            if (key.includes("strMeasure") && item[key]) {
              measurements.push(item[key]);
            }
          }
          count += 1;
          return (
            <div key={count} className="row d-flex overflow-auto justify-content-center align-items-center">
              <motion.div
                className="col-lg-6 col-md-6 col-sm-8 m-2 randomDrink rounded text-center"

              >
                <div className="drinkName fs-3">{item.strDrink}</div>
                <div className="text-muted">{item.strAlcoholic}</div>
                <img src={item.strDrinkThumb} className="drinkImg" />
                <div className="ingredientCard">
                  {ingredients.map((item) => {


                    count += 1;
                    if (measurements[count - 1]) {
                      return (
                        <div key={count}>
                          {measurements[count - 1] + ' -'} {item}
                        </div>
                      );
                    } else {
                      return (
                        <div key={count}>
                          {item}
                        </div>
                      );
                    }
                  })}

                </div>
                {item.strInstructions !== 0 && <div className="ingredientCard">{item.strInstructions}</div>}
              </motion.div>
            </div>
          );
        })}
      </div>
    </>
  );
}
