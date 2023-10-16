
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
        valueParam:6
    },
    'bug': {
        valueParam:7
    },
    'ghost':{
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


const url = new URL(window.location.href);
const listPokemons = document.querySelector(".listPokemons");
const params = url.searchParams;

const paramsString = Array.from(params).map(entry => entry[0]);

let typeSearch = ''

console.log(paramsString[0])

if (paramsString[0] == 'category') {
    const typePokemon = url.searchParams.get('category');
    requestPokemon(typePokemon)
} else {
const namePokemon = url.searchParams.get("search")
    requestPokemon(namePokemon)
}

// const namePokemon = url.searchParams.get('search');



// setTimeout(() => {
//     const url2 = new URL(window.location.href)
//     const params = url2.searchParams;
    
//     const paramsString = Array.from(params).map(entry => `${entry[0]} ${entry[1]}`).join(', ');
//     console.log(paramsString)
// }, 500)

// requestPokemon();



const requestPokemonInfos = async (url) => {
    let data = '';
    let infos = '';
    if (paramsString == 'category') {
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

// const startListener = () => {
//     console.log('a')
    
// }

let index = 0;
let gifs = [];
let imgs = []

const createCard = async (data, card) => {
    const h1 = card.querySelector("h1")
    const img = card.querySelector(".imgArea img");
    const spanType = card.querySelector(".type");
    card.setAttribute('id', 'id' + index)

    if (paramsString == 'category') {
        h1.innerHTML = data.pokemon.name;
        const { imgData, gif, types } = await requestPokemonInfos(data.pokemon.url)
        gifs.push(gif);
        imgs.push(imgData)
        img.src = imgData;
        spanType.innerHTML = ''
        
        if (types.length > 1) {
            // for (let i in types) spanType.innerHTML += ` ${types[i].type.name}`
            types.forEach(type => {
                const imgEl = document.createElement('img');
                imgEl.src = `../../assets/imgs/typeIcons/${typesData[type.type.name]}`            
                spanType.appendChild(imgEl)
            })
    
        } else {
            const imgEl = document.createElement('img');
            imgEl.src = `../../assets/imgs/typeIcons/${typesData[types[0].type.name]}`            
            spanType.append(imgEl)
        }
    } else {
        h1.innerHTML = data.name;
        const { imgData, gif, types } = await requestPokemonInfos(data);
        gifs.push(gif);
        imgs.push(imgData)
        img.src = imgData;
        spanType.innerHTML = ''

        if (types.length > 1) {
            // for (let i in types) spanType.innerHTML += ` ${types[i].type.name}`
            types.forEach(type => {
                const imgEl = document.createElement('img');
                imgEl.src = `../../assets/imgs/typeIcons/${typesData[type.type.name]}`            
                spanType.appendChild(imgEl)
            })
    
        } else {
            const imgEl = document.createElement('img');
            imgEl.src = `../../assets/imgs/typeIcons/${typesData[types[0].type.name]}`            
            spanType.append(imgEl)
        }
    }

    index++;

    if (haveCard) {
        listener()
        return;         
    }
    listPokemons.append((card))


}

function listener() {
    // setInterval( () => {
    if (paramsString == 'category') {
        listPokemons.querySelectorAll('.card').forEach(pokemon => {
            pokemon.addEventListener("mouseover", () => {
                pokemon.setAttribute("class", 'card cardOver')
                const cardHover = pokemon.getAttribute("id")
                const img = document.querySelector('#' + cardHover).querySelector('img');
                img.setAttribute("style", "width: 115px")
                img.src = gifs[cardHover.split("id")[1]]
            })
        
            pokemon.addEventListener('mouseout', () => {
                pokemon.setAttribute("class", 'card')
                const cardHover = pokemon.getAttribute("id")
                const img = document.querySelector('#' + cardHover).querySelector('img');
                img.setAttribute("style", 'width: 300px')
                img.src = imgs[cardHover.split("id")[1]]
            })
                    
            pokemon.addEventListener("click", () => {
                const cardHover = pokemon.getAttribute("id")
                
                
                loadPokemonPage(pokemon.querySelector("h1").innerHTML);
            })
        });
    } else {
        const cardHover = listPokemons.querySelector('.card').getAttribute("id")
        listPokemons.querySelector('.card').addEventListener("mouseover", (e) => {
            e.currentTarget.setAttribute("class", 'card cardOver')
                const img = document.querySelector('#' + cardHover).querySelector('img');
                img.setAttribute("style", "width: 115px")
                img.src = gifs[cardHover.split("id")[1]]
            })
        
            listPokemons.addEventListener('mouseout', (e) => {
                e.currentTarget.setAttribute("class", 'card')
                const img = document.querySelector('#' + cardHover).querySelector('img');
                img.setAttribute("style", 'width: 300px')
                img.src = imgs[cardHover.split("id")[1]]
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

    if (haveCard) return;

    for (let i = 1; i < qtdDivisionPokemon + 1; i++) {
        pagePokemonArea.innerHTML += `<button>${i}</button>`
    }
    if (qtdDivisionPokemonRest > 0) pagePokemonArea.innerHTML += `<button>${pagePokemonArea.children.length + 1}</button>`;

    if (paramsString == 'category') {
        pagePokemonArea.querySelectorAll("button").forEach(button => button.addEventListener("click", (e) => {
            pokemonPage = ''
            pokemonPage = e.target.innerHTML;
            gifs = [];
            imgs = [];
            requestPokemon();
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

const qtdPokemonControll = (data) => {
    if (paramsString == 'category') {
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

let haveCard = false


async function requestPokemon(params) {
    let data = '';
    if (paramsString == 'category') {
        const response = await fetch('https://pokeapi.co/api/v2/type/' + infosPokemonApi[params].valueParam);
        data = await response.json();
    } else {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + params);
        data = await response.json();
    }

    console.log(data)

    let idCard = 0;

    
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
                
                while (control < qtdDivisionPokemon) {
                    
                    
                    console.log('posPokemonPage: ' + posPokemonPage)
                    console.log('control: ' + control)
                    console.log('idCard: ' + idCard)
                    
                    
                    gifs = [];
                    imgs = [];
                    createCard(data.pokemon[posPokemonPage], newCards[idCard], index)
                    index++;
                    posPokemonPage++;
                    idCard++    
                    control++;
                }
                index = 0;
                posPokemonPage = 20;
                control = 0
            }, 1000)

        } else {
            const newCards = document.querySelectorAll(".card");
            if (pokemonPage == 1) {
                for (let posPokemon = 0; posPokemon < 20 * pokemonPage; posPokemon++) {
                    gifs = [];
                    imgs = [];
                    createCard(data.pokemon[posPokemon], newCards[idCard])
                    index++;
                    idCard++;
                }index = 0
                        } else {
                            posPokemonPage = (posPokemonPage * pokemonPage) - 20;
                        for (let i = posPokemonPage; i < 20 * pokemonPage ; i++){
                            gifs = [];
                            imgs = [];
                            createCard(data.pokemon[i], newCards[idCard], index)
                            index++;
                            idCard++    
                }
                index = 0
                            posPokemonPage = 20;
                    }
            
        }






    } else {
        index = 0;
        gifs = []
        if (paramsString == 'search') {
            loadCard(1);
            setTimeout(() => {
                const card = document.querySelector(".card");
                for (let posPokemon = 0; posPokemon < 1; posPokemon++){
                    createCard(data, card)
                    index++
                    idCard++;
                } 
                index = 0
    
            }, 1000) 
        }else {
            loadCard(20);
            setTimeout(() => {
                const cards = document.querySelectorAll(".card");
                for (let posPokemon = 0; posPokemon < 20 * pokemonPage; posPokemon++){
                    createCard(data.pokemon[posPokemon], cards[idCard])
                    index++
                    idCard++;
                } 
                index = 0
    
            }, 1000) 
        }
        
    }

    
    
    qtdPokemonControll(data)
    if (paramsString == 'search') {
        document.querySelector("#results").innerHTML = '0';
    } else {
        document.querySelector("#results").innerHTML = data.pokemon.length;
    }
    haveCard = true
    idCard = 0
}

// setInterval(() => {
        
//     }
// }, 100)





//não voltava
const urlCategory = new URL(window.location.href);
window.history.pushState({}, '', urlCategory.toString());
