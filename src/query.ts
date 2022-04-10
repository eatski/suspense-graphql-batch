import { ApolloClient, InMemoryCache,gql } from '@apollo/client';
import type { Query } from '@favware/graphql-pokemon';

export type GraphQLPokemonResponse<K extends keyof Omit<Query, '__typename'>> = Record<K, Omit<Query[K], '__typename'>>
const getPokemonQuery = gql`{
        getPokemon(pokemon: dragonite) {
            sprite
            num
            species
            color
        }
    }

`

const client = new ApolloClient({
    uri: 'https://graphqlpokemon.favware.tech/',
    cache: new InMemoryCache()
  });
  

export const getPokemon = () => {
    const cached = client.readQuery<GraphQLPokemonResponse<"getPokemon">>({
        query: getPokemonQuery
    })
    if(cached){
        return cached;
    }
    throw client.query({
        query: getPokemonQuery
    });
}

