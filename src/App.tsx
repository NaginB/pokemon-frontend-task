import { useState } from "react";
import "./App.css";
import Header from "./components/common/Header";
import ListPokemon from "./components/Pokemon/ListPokemon";

function App() {
  const [searchedName, setSearchedName] = useState("");
  return (
    <div>
      <Header setSearchedName={setSearchedName} />
      <ListPokemon searchedName={searchedName} />
    </div>
  );
}

export default App;
