import logo from "./logo.svg";
import Movies from "./Components/Movies";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Favourite from "./Components/Favourite";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <Movies />
      <Favourite />
    </>
  );
}

export default App;