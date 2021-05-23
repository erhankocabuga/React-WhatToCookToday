import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import AppSettings from "./general/AppSettings";

function App() {
    const [ meal, setMeal ] = useState(null);
    const [ isTopButtonVisible, setIsTopButtonVisible ] = useState(false);
    const [ isGetButtonClicked, setIsGetButtonClicked ] = useState(false);

    async function getRandomRecipe() {
      setIsGetButtonClicked(true);
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
    };

    const checkTopButtonVisibility = () => {
      setIsTopButtonVisible(window.pageYOffset > 450);
    };

    const goTopTheTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const mealHtml = meal => {
      return (
        <div>
          <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">{meal.strMeal}</h2> 
            <div className="divider-custom">
              <div className="divider-custom-line"></div>
              <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
              <div className="divider-custom-line"></div>
            </div>
      
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-6 pb-2">
                <img className="img-fluid" src={meal.strMealThumb} />
              </div>
              <div className="col-md-12 col-lg-6 pb-4">
                <p className="card-text"><strong>Area:</strong> {meal.strArea}<br />
                <strong>Category:</strong> {meal.strCategory}</p> 
                <p className="card-text" dangerouslySetInnerHTML={{ __html: meal.strInstructions.replace(/\n/g, '<br />')}}></p>
              </div>
              <div className="col-12">
                { meal.strTags &&
                  <div className="card-footer">
                    <small className="text-muted">Tags: {meal.strTags.replace(/,/g, ', ')}</small>
                  </div> }
              </div>
            </div>
        
            <div className="row justify-content-center">
                { meal.strYoutube && (<div className="video-container">
                  <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Video of {meal.strMeal}</h2>
                        <div className="divider-custom">
                            <div className="divider-custom-line"></div>
                            <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                            <div className="divider-custom-line"></div>
                        </div>  
                        <div className="embed-container"><iframe src={`https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}`} frameBorder="0"></iframe></div>
                        </div>)}
              </div>
          </div>
      );
    };

    useEffect(() => {
      window.addEventListener('scroll', checkTopButtonVisibility);
    }, []);
  
    return (
      <React.Fragment>
        <Header onBringButtonClick={getRandomRecipe} isGetButtonClicked={isGetButtonClicked} />
        <section className="page-section">
            <div className="container">
              { !isGetButtonClicked && <div className="text-center mt-4">
                    <a className="btn btn-xl btn btn-primary" href="#" onClick={getRandomRecipe}>
                        <i className="fas fa-cookie-bite me-2"></i>
                        Bring
                    </a>
                </div> }

              { meal && mealHtml(meal) }
              </div> 
        </section> 
        { isTopButtonVisible && <div className="scroll-to-top" onClick={goTopTheTop}>
          <a className="btn btn-outline-dark btn-social mx-1" href="#"><i className="fas fa-fw fa-arrow-up"></i></a>
        </div>}
      </React.Fragment>
    );
}

export default App;