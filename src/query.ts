import type { Query } from '@favware/graphql-pokemon';

export interface GraphQLPokemonResponse<K extends keyof Omit<Query, '__typename'>> {
  data: Record<K, Omit<Query[K], '__typename'>>;
}

export const getPokemon = () => {
    return fetch('https://graphqlpokemon.favware.tech/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            {
              getPokemon(pokemon: dragonite) {
                  sprite
                  num
                  species
                  color
              }
            }
          `
        })
      })
        .then((res) => res.json() as Promise<GraphQLPokemonResponse<'getPokemon'>>)
}

