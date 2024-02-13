

const pokeApi ={}

function convertPokeApiDatilToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const{type} = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}
        

pokeApi.getPokemonDetail =(pokemon) => {
    return fetch(pokemon.url)
        .then((response)=> response.json()) // pegar os detelhes
        .then((pokemon) => convertPokeApiDatilToPokemon(pokemon)) // converter para pokemon
}


pokeApi.getPokemons = (offset = 0,limit = 5) => {
    const url =`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response) => response.json()) // converter para Json
    .then((jsonBody) => jsonBody.results) // pegar o resultado
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest)) // esperar todos os detalhes
    .then((pokemonDetails) => pokemonDetails)
};