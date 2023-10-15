const listPokemonsData = document.querySelector('.listPokemons');

const loadCard = (qtdCalls) => {
    for (let i = 0; i < qtdCalls; i++) {
        fetch('../../components/card.html')
            .then((response) => response.text())
            .then((data) => listPokemonsData.innerHTML += data)
    }
}

