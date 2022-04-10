import { Suspense } from 'react';
import './App.css';
import { getPokemon, GraphQLPokemonResponse } from './query';

let globalData : GraphQLPokemonResponse<"getPokemon"> | null = null
const Pokemon = () => {
  if(globalData) {
    return <div>
    {JSON.stringify(globalData)}
  </div>
  }
  throw getPokemon().then(data => {
    globalData = data;
  })
}

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Pokemon />
      </Suspense>
    </div>
  );
}

export default App;
