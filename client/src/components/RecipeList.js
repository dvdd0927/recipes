import React from "react";
import { useGlobalContext } from "../context";
import Recipe from "./Recipe";

const RecipeList = () => {
  const { recipeList, menuFilter } = useGlobalContext();

  const [filterList, setFilterList] = React.useState(recipeList);

  React.useEffect(() => {
    if (menuFilter === "all") {
      setFilterList(recipeList.map((recipe) => recipe));
    } else {
      setFilterList(
        recipeList.filter((recipe) => recipe.menuType === menuFilter)
      );
    }
  }, [menuFilter, recipeList]);

  if (recipeList.length === 0) {
    return (
      <section className='empty-list-container'>
        <p>No current recipe</p>
      </section>
    );
  }
  return (
    <section className='recipe-list-container'>
      {filterList.map((recipe) => {
        const { _id } = recipe;
        return <Recipe key={_id} {...recipe} />;
      })}
    </section>
  );
};

export default RecipeList;
