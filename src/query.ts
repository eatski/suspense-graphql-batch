import { ApolloClient, InMemoryCache,gql } from '@apollo/client';
import type { Query } from '@favware/graphql-pokemon';
import { BatchHttpLink } from "@apollo/client/link/batch-http";

export type GraphQLPokemonResponse<K extends keyof Omit<Query, '__typename'>> = Record<K, Omit<Query[K], '__typename'>>
export const getPokemonQuery = gql`
    query GetPokemon($pokemon: PokemonEnum!) {
        getPokemon(pokemon: $pokemon) {
            sprite
            num
            species
            color
        }
    }
`

const link = new BatchHttpLink({
    uri: 'https://graphqlpokemon.favware.tech/',
});

const client = new ApolloClient({
    uri: 'https://graphqlpokemon.favware.tech/',
    cache: new InMemoryCache(),
    link
  });


export const getPokemon = (variables: {pokemon: string}) => {
    const cached = client.readQuery<GraphQLPokemonResponse<"getPokemon">>({
        query: getPokemonQuery,
        variables
    })
    if(cached){
        return cached;
    }
    throw client.query({
        query: getPokemonQuery,
        variables
    })
}

