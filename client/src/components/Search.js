import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Search = () => {
  const { searchRecipe } = useGlobalContext();
  const [searchString, setSearchString] = React.useState("");
  const searchRef = React.useRef(null);

  const handleChange = (e) => {
    if (searchRecipe === "") {
      return searchRecipe("", "SEARCH");
    }
    searchRecipe(e.target.value, "SEARCH");
  };

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <>
      <form className='search-bar'>
        <input
          type='text'
          placeholder='search'
          ref={searchRef}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          onKeyUp={handleChange}
          onFocus={handleChange}
        />
      </form>
      <Link to='/recipe-form' className='btn-share-recipe'>
        <p>share your recipe &gt;&gt;</p>
      </Link>
    </>
  );
};

export default Search;
