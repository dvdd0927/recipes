import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { findRecipe, deleteRecipe } from "../utils/api";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SingleRecipe = () => {
  const queryID = useQuery().get("id");
  const location = useNavigate();

  const [recipe, setRecipe] = React.useState(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const getRecipe = async (id) => {
    const response = await findRecipe(id, "ID");
    setRecipe(response);
  };

  const handleDelete = async () => {
    await deleteRecipe(queryID);
    location("/");
  };

  React.useEffect(() => {
    getRecipe(queryID);
  }, [queryID]);

  if (!recipe) {
    return (
      <section className='section-container'>
        <div className='loading'></div>
      </section>
    );
  }
  const {
    recipeName,
    menuType,
    description,
    imageURL,
    cookTime,
    prepTime,
    servings,
    ingredients,
    instructions,
  } = recipe;
  return (
    <section className='section-container'>
      <div className='info-container'>
        <div className='recipe-info'>
          <header>
            <h4>{recipeName}</h4>
            <p>{menuType}</p>
          </header>
          <article className='description'>{description}</article>
          <footer>
            <ul>
              <h5>prep time:</h5>
              <p>{prepTime} mins</p>
            </ul>
            <ul>
              <h5>cook time:</h5>
              <p>{cookTime} mins</p>
            </ul>
            <ul>
              <h5>servings:</h5>
              <p>{servings} person</p>
            </ul>
          </footer>
        </div>
        <aside>
          <img src={imageURL} alt='recipe img' className='img' />
        </aside>
      </div>
      <div className='info-container-2'>
        <article className='instruction'>
          <h4>instructions:</h4>
          {instructions.map((item, index) => {
            return (
              <div key={index}>
                <h5>step {index + 1}</h5>
                <p>{item}</p>
              </div>
            );
          })}
        </article>
        <article className='ingredient'>
          <h4>ingredients:</h4>
          {ingredients.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </article>
      </div>
      <footer className='footer-buttons'>
        <Link to={`/recipe-form?id=${queryID}`}>
          <button className='btn btn-hipster blue'>edit</button>
        </Link>
        {!isDeleting && (
          <button
            className='btn btn-hipster red'
            onClick={() => setIsDeleting(!isDeleting)}
          >
            delete
          </button>
        )}
        {isDeleting && (
          <div className='delete-button'>
            <button className='btn btn-hipster red' onClick={handleDelete}>
              Proceed to delete?
            </button>
            <button
              className='btn btn-hipster blue'
              onClick={() => setIsDeleting(!isDeleting)}
            >
              no
            </button>
          </div>
        )}
      </footer>
    </section>
  );
};

export default SingleRecipe;
