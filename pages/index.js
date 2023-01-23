import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });
// const APIUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
const APIUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

export async function getStaticProps() {
  // const [data, setData] = useState([]);
  // Call an external API endpoint to get posts
  const res = await fetch(APIUrl);
  // const response = await axios.get(APIUrl)
  // setData(response.data);
  const data = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  // const [num, setNum] = useState([]);
  // useEffect(() => {
  // async function getData() {
  //   const response = await axios.get(APIUrl)
  //   setData(response.data);
    // console.log(res.data);
  // }
  //     getData()
  //   }, []);

  let drink = data.drinks[0];
  console.log(data.drinks[0]);

  let ingredients = [];

  for (const key of Object.keys(drink)) {
    if (key.includes("strIngredient") && drink[key]) {
      console.log(key, drink[key]);
      ingredients.push(drink[key]);
    }
  }

  let measurements = [];

  for (const key of Object.keys(drink)) {
    if (key.includes("strMeasure") && drink[key]) {
      console.log(key, drink[key]);
      measurements.push(drink[key]);
    }
  }
  // console.log(measurements)
  let count = 0;
  // const src = `${API}/user/photo/${blog.postedBy.username}`;

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
        </div>
        <div className="row d-flex overflow-auto justify-content-center align-items-center">
          <motion.div
            className="col-lg-6 col-md-6 col-sm-8 m-2 randomDrink rounded text-center"
          // initial={{ scale: 0 }}
          // animate={{ scale: 1 }}
          // transition={{ type: "spring", duration: 0.6 }}
          >
            <div className="drinkName fs-3">{drink.strDrink}</div>
            <div className="text-muted">{drink.strAlcoholic}</div>
            {/* <div className="drinkImg"> */}
            <img src={drink.strDrinkThumb} className="drinkImg"/>
            {/* </div> */}
            {/* <Image loader={() => src} src={drink.strDrinkThumb} width={500} height={500}/> */}
            <div className="ingredientCard">
              {ingredients.map((item) => {
                count += 1;
                return (
                  <div>
                    {measurements[count - 1]} - {item}
                  </div>
                );
              })}

            </div>
            <div className="ingredientCard">{drink.strInstructions}</div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
