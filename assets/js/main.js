const pokemonList = document.getElementById('pokemonList')
const loadMore = document.getElementById('loadMore')
const limit = 10;
let offset = 0;
const maxRecord = 151;


function convertPokemonTypesToLi(pokemonTypes){
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)

}



function loadMorePokemons(offset, limit){
    pokeApi.getPokemons(offset,limit).then((pokemons = [] )=>{
        const newHtml = pokemons.map((pokemon) => 
        `<li class="pokemon ${pokemon.types[0]}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
         </li>
    `).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadMorePokemons(offset, limit)

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML = pokemons.map(convertPokemonToHTML).join('');
})

loadMore.addEventListener('click', () =>{
    
    offset += limit;
    const qtdRecordNextPage = offset + limit;
    
    if(qtdRecordNextPage >= maxRecord){
        const newLimit = maxRecord - offset;
        loadMorePokemons(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)
    }else{
    loadMorePokemons(limit, offset)
    }
})
