import { useCallback, useState } from 'react';
import { Pokemon, useApplicationContext } from './store';
import './app.css';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const response = await fetch(`${POKEMON_API_URL}${name}`);
  const data = await response.json();
  return data;
};

export const App = () => {
  const [name, setName] = useState<string>('');
  const { pokemon, setPokemon } = useApplicationContext();

  const handleSearch = useCallback(async () => {
    const pokemon = await fetchPokemon(name);
    if (pokemon) {
      setPokemon(pokemon);
    }
  }, [name, setPokemon]);

  return (
    <main>
      <h1>Pokemon Example: Stale data in React</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {pokemon && <PokemonInfo pokemon={pokemon} />}
    </main>
  );
};

export const PokemonInfo = ({ pokemon }: { pokemon: Pokemon }) => {
  const [level, setLevel] = useState(1);
  return (
    <div>
      <h2>
        {pokemon.name} Level: {level}
      </h2>

      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <img src={pokemon.sprites.back_default} alt={pokemon.name} />
      <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
      <img src={pokemon.sprites.back_shiny} alt={pokemon.name} />
      <PokemonStats stats={pokemon.stats} level={level} />
      <button onClick={() => setLevel((prev) => prev + 1)}>LEVEL UP+</button>
    </div>
  );
};

const PokemonStats = ({
  stats,
  level,
}: {
  stats: Pokemon['stats'];
  level: number;
}) => {
  return (
    <div>
      <h3>Stats</h3>
      <ul>
        {stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}:{' '}
            {stat.base_stat + level * Math.floor(stat.base_stat / 10)}
          </li>
        ))}
      </ul>
    </div>
  );
};
