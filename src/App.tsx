import { Suspense } from 'react';
import './App.css';
import { getPokemon } from './query';

const Pokemon = ({pokemon}: {pokemon: string}) => {
  const result = getPokemon({
    pokemon
  });
  return <div>
    <h2>
    {pokemon}
    </h2>
    <img src={result.getPokemon.sprite}>
    </img>
  </div>
}

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Pokemon pokemon="dragonite" />
        <Pokemon pokemon="pikachu" />
      </Suspense>
    </div>
  );
}

export default App;
