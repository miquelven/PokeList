const intervalRender = setInterval(() => {
    if (document.querySelector(".contentHeader #logo") !== null) {
        featuresHeader()
    }
}, 100)

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
        const inputEl = inputImgEl.parentElement.parentElement.querySelector("input")
        if (inputEl.value !== ''.trim()) {
            
            changeURL('search', inputEl.value)
            //mudar category por search
        }
    })

    favoriteEl.addEventListener('click', () => {
        changeURL('favorites', 'favorites')
    })

}