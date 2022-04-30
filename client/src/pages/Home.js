import MenuList from "../components/MenuList";
import RecipeList from "../components/RecipeList";
import Search from "../components/Search";
import { useGlobalContext } from "../context";

const Home = () => {
  const { isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <div className='section-container'>
        <div className='loading'></div>
      </div>
    );
  }
  return (
    <>
      <header className='search-container'>
        <Search />
      </header>
      <main>
        <MenuList />
        <RecipeList />
      </main>
    </>
  );
};

export default Home;
