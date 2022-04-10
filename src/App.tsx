import { Suspense } from 'react';
import './App.css';
import { getPokemon } from './query';

const Pokemon = () => {
  const result = getPokemon();
  return <div>
    {JSON.stringify(result)}
  </div>
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
