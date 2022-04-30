import React from "react";
import { useGlobalContext } from "../context";

const Menu = () => {
  const { recipeList, filterRecipe, menuFilter } = useGlobalContext();

  const [menu, setMenu] = React.useState([]);

  React.useEffect(() => {
    setMenu([...new Set(recipeList.map((recipe) => recipe.menuType))]);
  }, [recipeList]);

  if (recipeList.length === 0) {
    return (
      <section className='empty-list-container'>
        <p>No current menu</p>
      </section>
    );
  }
  return (
    <section className='menu-list'>
      <p
        className={`${
          menuFilter === "all" ? "not-active active-menu" : "not-active"
        }`}
        onClick={() => filterRecipe("all")}
      >
        all {`(${recipeList.length})`}
      </p>

      {menu.map((menuName, index) => {
        return (
          <p
            className={`${
              menuFilter === menuName ? "not-active active-menu" : "not-active"
            }`}
            key={index}
            onClick={(e) => filterRecipe(menuName)}
          >
            {menuName}{" "}
            {`(${
              recipeList.filter((item) => item.menuType === menuName).length
            })`}
          </p>
        );
      })}
    </section>
  );
};

export default Menu;
