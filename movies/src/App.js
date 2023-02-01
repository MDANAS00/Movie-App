import Movies from "./Components/Movies";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Favourite from "./Components/Favourite";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Fragment } from "react";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={[<Banner/>,<Movies/>]}/>
        <Route path="/favourites" element={<Favourite />} />
      </Routes>
    </>
  );
}

export default App;
