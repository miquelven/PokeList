const intervalRender = setInterval(() => {
    if (document.querySelector(".contentHeader #logo") !== null) {
        featuresHeader()
    }
}, 100)

const findPokemon = () => {
    const inputEl = document.querySelector("#searchPokemonInput")
        if (inputEl.value !== ''.trim()) {
            changeURL('search', inputEl.value)
            //mudar url category por search
        }
}

function featuresHeader() {
    clearInterval(intervalRender);
    const logoEl = document.querySelector("#logo")
    const inputImgEl = document.querySelector(".inputArea img")
    const favoriteEl = document.querySelector("#favHeader")

    logoEl.addEventListener("click", () => {
        const url = new URL(window.location.href);

        window.history.pushState({}, '', url);

        window.location.href = '/'
    })


    inputImgEl.addEventListener("click", () => {
        findPokemon()
    })

    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() == 'enter') findPokemon()
        
    })

    favoriteEl.addEventListener('click', () => {
        changeURL('favorites', 'favorites')
    })

}