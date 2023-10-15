const loadPokemonPage = async (name) => {
    const url = new URL(window.location.href);
    
    window.history.pushState({}, '', url.toString());
    
    window.location.href = `/pages/cardPokemon/pokemonPage.html?pokemon=${name}`
}