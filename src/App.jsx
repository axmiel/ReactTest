import { useEffect, useState } from "react";
import "./App.css";

const pokemonAPI = 'https://pokeapi.co/api/v2/pokemon';

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function App() {
  const [count, setCount] = useState(1);

  const [pokemonSprite, setSprite] = useState();
  console.log(pokemonSprite);

  const [pokemonName, setName] = useState();

  const [isLoading, setIsLoading] = useState(false);

  async function fetchAPI(pokemonID) {
    try {
      setIsLoading(true);
      const response = await fetch(`${pokemonAPI}/${pokemonID}`);
      await delay(1000);
      const data = await response.json ();
      const sprite = data.sprites.front_default;
      const name = data.name;
      setName(name.toUpperCase());
      setSprite(sprite);
      setIsLoading(false);

      console.log(data);
    }
    catch(error) {
      console.error(error);
    }
  }

  function callThis() {
    console.log('useEffect ran', count)
    fetchAPI(count);
  }

  useEffect(callThis, [count]);

  return (
    <>
      <div>
      
      </div>
      <h1>Pokemon Picker In React</h1>
      <div className="card">
        {isLoading && <><p>Loading...</p></>}
        {!isLoading && pokemonName && <><h3>{pokemonName}</h3></>}
        {!isLoading && pokemonSprite && <><img src={pokemonSprite}/><br/></>}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
