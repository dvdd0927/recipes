import React from "react";

import { Link } from "react-router-dom";

const Recipe = ({
  _id,
  recipeName,
  imageURL,
  imageName,
  cookTime,
  prepTime,
}) => {
  return (
    <div className='recipe-box'>
      <div className='image-box'>
        <img src={imageURL} alt={imageName} className='img' />
      </div>
      <div className='info-box'>
        <h4>{recipeName}</h4>
        <p>
          Prep: {prepTime} min | Cook: {cookTime} min
        </p>
        <Link to={`/recipe?id=${_id}`}>
          <button className='btn btn-block btn-hipster blue'>
            view details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
