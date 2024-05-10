import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Home from "../src/pages/Home.tsx";
import Favourites from "../src/pages/Favourites.tsx";
import { Route, Routes } from "react-router-dom";
import CocktailRecipe from "./pages/CocktailRecipe.tsx";
import { Container } from "@mui/material";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/recipe/:id" element={<CocktailRecipe />} />
      </Routes>
    </div>
  );
}
