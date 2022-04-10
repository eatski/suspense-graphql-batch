import { ApolloClient, InMemoryCache,gql } from '@apollo/client';
import type { Query } from '@favware/graphql-pokemon';
import { createBatchingExecutor } from '@graphql-tools/batch-execute';

export type GraphQLPokemonResponse<K extends keyof Omit<Query, '__typename'>> = Record<K, Omit<Query[K], '__typename'>>
const getPokemonQuery = gql`
    query GetPokemon($pokemon: PokemonEnum!) {
        getPokemon(pokemon: $pokemon) {
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
  
const batchExec = createBatchingExecutor(
    ({document,variables}) => {
        return client.query({
            query: document,
            variables
        })
    },
    {
        batchScheduleFn: callback => setTimeout(callback, 100)
    },
)


export const getPokemon = (variables: {pokemon: string}) => {
    const cached = client.readQuery<GraphQLPokemonResponse<"getPokemon">>({
        query: getPokemonQuery,
        variables
    })
    if(cached){
        return cached;
    }
    throw batchExec({
        document: getPokemonQuery,
        variables
    })
}

