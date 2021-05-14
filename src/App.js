import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import AppSettings from "./general/AppSettings"; 

function App() {
    const [meal, setMeal] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getRandomRecipe() {
            const randomRecipe = await axios(AppSettings.apis.randomRecipe);
            let meal = randomRecipe.data.meals[0];
            let ingredientList = [];
            for (let i = 0; i < 20; i++) {
                let measure = meal[`strMeasure${i}`];
                let ingredient = meal[`strIngredient${i}`];

                measure &&
                    measure.trim().length &&
                    ingredientList.push(`${measure} ${ingredient}`);
            }

            meal.ingredients = ingredientList;
            setIsLoading(false);
            setMeal(meal);
        }
        getRandomRecipe();
    }, []);

    return (
        <div className="container">
            <Header />
            <h2>Name: {meal.strMeal}</h2>
            <p>Area {meal.strArea}</p>
            <p>Category: {meal.strCategory}</p>
            <p>Tags: {meal.strTags}</p>
            <p>Instructions: {meal.strInstructions}</p>
        </div>
    );
}

export default App;
