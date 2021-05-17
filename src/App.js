import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import AppSettings from "./general/AppSettings";

function App() {
    const [meal, setMeal] = useState(null);

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
      setMeal(meal);
  }

  const mealHtml = meal => {
    return (
        <div className="mealContainer">
            <img src={meal.strMealThumb} style={{ width: 500 }} />  
            <h2>Name: {meal.strMeal}</h2>
            <p>Area: {meal.strArea}</p>
            <p>Category: {meal.strCategory}</p>
            <p>Tags: {meal.strTags}</p>
            <p>Instructions: {meal.strInstructions}</p>
            {meal.strTags && <p>Etiketler: {meal.strTags} </p>} 

            { meal.strYoutube && (<div className="videoContainer">
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            </div>) }
        </div>
    );
  };
     
    return (
        <div>
          <Header />
          <p>Want a food idea? </p>
          <button onClick={getRandomRecipe}>bring</button> 
          { meal && mealHtml(meal) }
        </div>
    );
}

export default App;
