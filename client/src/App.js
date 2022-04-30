import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Error from "./pages/Error";
import SingleRecipe from "./pages/SingleRecipe";
import CreateRecipe from "./pages/CreateRecipe";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/recipe' element={<SingleRecipe />} />
          <Route path='/recipe-form' element={<CreateRecipe />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
