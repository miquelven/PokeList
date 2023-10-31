
const infosPokemonApi = {
    'normal': {
        valueParam: 1
    },
    'fighting': {
        valueParam: 2
    },
    'flying': {
        valueParam: 3
    },
    'poison': {
        valueParam: 4
    },
    'ground': {
        valueParam: 5
    },
    'rock': {
        valueParam: 6
    },
    'bug': {
        valueParam: 7
    },
    'ghost': {
        valueParam: 8
    },
    'steel': {
        valueParam: 9
    },
    'fire': {
        valueParam: 10
    },
    'water': {
        valueParam: 11
    },
    'grass': {
        valueParam: 12
    },
    'electric': {
        valueParam: 13
    },
    'psychic': {
        valueParam: 14
    },
    'ice': {
        valueParam: 15
    },
    'dragon': {
        valueParam: 16
    },
    'dark': {
        valueParam: 17
    },
    'fairy': {
        valueParam: 18
    }
}



// COMEÇAR A ENTENDER E MUDAR DAQUI!!!




let haveCard = false


const url = new URL(window.location.href);
const listPokemons = document.querySelector(".listPokemons");
const params = url.searchParams;

const nameParams = Array.from(params).map(entry => entry[0]);

let typeSearch = ''

if (nameParams[0] == 'category') {
    const typePokemon = url.searchParams.get('category');
    requestPokemon(typePokemon)
} else {
const namePokemon = url.searchParams.get("search")
    requestPokemon(namePokemon)
}

let index = 0;
let gifs = [];
let imgs = []


const requestPokemonInfos = async (url) => {
    let data = '';
    let infos = '';
    if (nameParams == 'category') {
        const response = await fetch(url)
        data = await response.json();
        infos = {
            imgData: data.sprites.front_default,
            gif: data.sprites.versions['generation-v']['black-white']['animated']['front_default'],
            types: data.types
        }
    } else {
        infos = {
            imgData: url.sprites.front_default,
            gif: url.sprites.versions['generation-v']['black-white']['animated']['front_default'],
            types: url.types
        }
    }

    return infos
}
let urls = []
imgs = []
gifs = []
types = []
const createCard = async (data, card) => {
    if (card == undefined) return;
    const h1 = card.querySelector("h1");
    const img = card.querySelector(".imgArea img");
    const spanType = card.querySelector(".type");

    h1.innerHTML = data.name;
    if (data.sprites.front_default !== null) img.src = data.sprites.front_default;
    types.push(data.types);
    
    spanType.innerHTML = ''

    if (types[0].length > 1) {
            for (let i = 0; i < types[0].length;i++) {
            const imgEl = document.createElement("img");
                imgEl.src = `../../assets/imgs/typeIcons/${types[0][i].type.name}.svg`
                spanType.append(imgEl)
            }
        } else {
            const imgEl = document.createElement("img");
            imgEl.src = `../../assets/imgs/typeIcons/${types[0][0].type.name}.svg`
            spanType.append(imgEl)
        }
        imgs.push(data.sprites.front_default)
    gifs.push(data.sprites.versions['generation-v']['black-white']['animated']['front_default'])
    
    if (haveCard) {
        listener(imgs, gifs);
        return;
    }

    listPokemons.append(card);
}



function listener(imgs, gifs) {
    // setInterval( () => {
    console.log("listener")
    if (nameParams == 'category') {
        listPokemons.querySelectorAll('.card').forEach(pokemon => {
            pokemon.addEventListener("mouseover", () => {
                pokemon.setAttribute("class", 'card cardOver')
                const cardHover = pokemon.getAttribute("id")
                console.log(cardHover + " CARDHOVER")
                const imgEl = document.querySelector('#' + cardHover).querySelector('img');
                imgEl.setAttribute("style", "width: 87px")
                
                imgEl.src = gifs[cardHover.split('id')[1]]
            })
        
            pokemon.addEventListener('mouseout', () => {
                pokemon.setAttribute("class", 'card')
                const cardHover = pokemon.getAttribute("id")
                const imgEl = document.querySelector('#' + cardHover).querySelector('img');
                imgEl.setAttribute("style", 'width: 300px')
                imgEl.src = imgs[cardHover.split("id")[1]]
            })
                    
            pokemon.addEventListener("click", () => {
                loadPokemonPage(pokemon.querySelector("h1").innerHTML);
            })

        });
    } else {
        // PROBLEMA NO STYLE DO SEARCH ESTÁ AQUI
        const cardHover = listPokemons.querySelector('.card').getAttribute("id")
        listPokemons.querySelector('.card').addEventListener("mouseover", (e) => {
            e.currentTarget.setAttribute("class", 'card cardOver')
            const imgEl = document.querySelector('#' + cardHover).querySelector('img');
            imgEl.setAttribute("style", "width: 87px")
            imgEl.src = gifs[cardHover.split("id")[1]]
            })
        
            listPokemons.addEventListener('mouseout', (e) => {
                e.target.closest('.card').setAttribute("class", 'card')
                const imgEl = document.querySelector('#' + cardHover).querySelector('img');
                imgEl.setAttribute("style", 'width: 150px')
                imgEl.src = imgs[cardHover.split('id')[1]]

            })
                    
            listPokemons.addEventListener("click", (e) => {
                loadPokemonPage(e.currentTarget.querySelector("h1").innerHTML);
            })
        }
    }

let posPokemonPage = 20;
let pokemonPage = 1;
const pagePokemonArea = document.querySelector(".pagePokemonArea");

const createPagesPokemon = (qtdDivisionPokemon, qtdDivisionPokemonRest) => {

    if (pagePokemonArea.innerHTML.length !== 0) return;

    for (let i = 1; i < qtdDivisionPokemon + 1; i++) {
        pagePokemonArea.innerHTML += `<button>${i}</button>`
    }
    if (qtdDivisionPokemonRest > 0) pagePokemonArea.innerHTML += `<button>${pagePokemonArea.children.length + 1}</button>`;

    if (nameParams == 'category') {
        pagePokemonArea.querySelectorAll("button").forEach(button => button.addEventListener("click", (e) => {
            console.log("oi")
            pokemonPage = e.target.innerHTML;
            gifs = [];
            imgs = [];
            types =  []
            //  CHAMA UMA NOVA REQUISIÇÃO COM NOVOS POKEMONS DO MESMO TIPO
            const typePokemon = url.searchParams.get('category');
            requestPokemon(typePokemon)
        }))
    } else {
        pagePokemonArea.querySelector("button").addEventListener("click", (e) => {
            pokemonPage = ''
            pokemonPage = e.target.innerHTML;
            gifs = [];
            imgs = [];
            requestPokemon();
        })
    }
}
let qtdPokemons = 0;
let qtdDivisionPokemon = 0
let qtdDivisionPokemonRest = 0


// DAR UMA OLHADA AQUI PARA ARRUMAR OS NUMEROS DA PAGINAÇÃO
const qtdPokemonControll = (data) => {
    if (nameParams == 'category') {
        qtdPokemons = data.pokemon.length;
        if (qtdPokemons % 20 == 0) {
            qtdDivisionPokemon = parseInt(qtdPokemons / 20)
        } else {
            qtdDivisionPokemon = parseInt(qtdPokemons / 20);
            qtdDivisionPokemonRest = qtdPokemons - (20 * qtdDivisionPokemon);
        }
        createPagesPokemon(qtdDivisionPokemon, qtdDivisionPokemonRest)
    } else {
        qtdPokemons = 1;    
        createPagesPokemon(1, 0)
    }
}

async function mountCard(urls, cards) {
    if (nameParams == 'search') {
        const response = await fetch(urls);
        const data = await response.json();
        createCard(data, cards)
    } else {
        const responses = await Promise.all(urls.map(url => fetch(url).then(response => response.json())));
    
    responses.forEach((data, i) => {
        const card = cards[i];
        if (card == undefined) return;
        createCard(data, card);
    });
    }
}





async function requestPokemon(params) {
    let data = '';
    if (nameParams == 'category') {
        const response = await fetch('https://pokeapi.co/api/v2/type/' + infosPokemonApi[params].valueParam);
        data = await response.json();
    } else {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + params);
        data = await response.json();
    }


    let idCard = 0;

    // TEM CARDS
    if (haveCard) {
        if (qtdDivisionPokemonRest > 0 & pokemonPage == pagePokemonArea.children.length) {
            listPokemons.innerHTML = ''
            loadCard(qtdDivisionPokemonRest);

            setTimeout(() => {
                const newCards = document.querySelectorAll(".card");
                posPokemonPage = (posPokemonPage * pokemonPage) - 20;
                haveCard = false;
                
                let control = 0;
                idCard = 0
                
                gifs = [];
                imgs = [];
                urls = [];
                controller = data.pokemon.length - qtdDivisionPokemonRest
                for (controller; controller < data.pokemon.length; controller++){
                    urls.push(data.pokemon[controller].pokemon.url)   
                }
                haveCard = true
                while (control < qtdDivisionPokemonRest) {
                    
                    
                    newCards[control].setAttribute("id", `id${control}`)
                    mountCard(urls, newCards)
                    // createCard(data.pokemon[posPokemonPage], newCards[idCard], index)
                    // index++;
                    posPokemonPage++;
                    idCard++    
                    control++;
                }
                index = 0;
                posPokemonPage = 20;
                control = 0
            }, 1000)
            haveCard = false

        } else {
            const newCards = document.querySelectorAll(".card");
            
            if (newCards.length < 20) {
                listPokemons.innerHTML = '';
                setTimeout(()=>loadCard(20), 1800)
                // loadCard(20)
            }
            // voltando para o primeiro
            if (pokemonPage == 1) {
                for (let posPokemon = 0; posPokemon < 20 * pokemonPage; posPokemon++) {
                    gifs = [];
                    imgs = [];
                    
                    setTimeout(()=>createCard(data.pokemon[posPokemon], newCards[idCard]), 300 )
                    // createCard(data.pokemon[posPokemon], newCards[idCard])
                    index++;
                    idCard++;
                }
                index = 0
            } else {
                urls = []
                const cards = document.querySelectorAll(".card");
                console.log(cards.forEach(card => console.log(card)))
                            posPokemonPage = (posPokemonPage * pokemonPage) - 20;
                            types = []
                            gifs = [];
                            imgs = [];
                        for (let i = posPokemonPage; i < 20 * pokemonPage; i++){
                            // ARRUMAR AQUI

                            urls.push(data.pokemon[i].pokemon.url);
                            index++;
                            idCard++    
                }

                mountCard(urls, cards);

                index = 0
                            posPokemonPage = 20;
                    }
            
        }






    } else {
        index = 0;
        gifs = []
        if (nameParams == 'search') {
            loadCard(1);
            setTimeout(() => {
                const card = document.querySelector(".card");
                for (let posPokemon = 0; posPokemon < 1; posPokemon++){
                    
                    pokemonName = url.searchParams.get("search")
                    card.setAttribute("id", 'id0')
                    mountCard('https://pokeapi.co/api/v2/pokemon/'+pokemonName, card)
                    // createCard(data, card)
                    index++
                    idCard++;
                } 
                index = 0
    
            }, 1000) 
        }else {
            const cards2 = document.querySelectorAll(".card");
            if (cards2.length < 20) {
                listPokemons.innerHTML = ''
            }
            loadCard(20);
            setTimeout(() => {
                const cards = document.querySelectorAll(".card");
                console.log(pokemonPage)
                let valueControl = 20 * pokemonPage - 20
                let urls = []
                for (let posPokemon = valueControl; posPokemon < 20 * pokemonPage; posPokemon++){
                    
                    
                    cards[index].setAttribute('id', `id${index}`)
                    urls.push(data.pokemon[posPokemon].pokemon.url);
                    index++
                } 
                mountCard(urls, cards);
                
                index = 0
                
            }, 1800) 
        }
        
    }

    

    qtdPokemonControll(data)
    if (nameParams == 'search') {
        document.querySelector("#results").innerHTML = '1';
    } else {
        document.querySelector("#results").innerHTML = data.pokemon.length;
    }
    haveCard = true
    idCard = 0
}

//não voltava
const urlCategory = new URL(window.location.href);
window.history.pushState({}, '', urlCategory.toString());
