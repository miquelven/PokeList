
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


const typePokemon = url.searchParams.get('category');



const requestPokemonInfos = async (url) => {

    const response = await fetch(url)
    const data = await response.json();
    return {
        imgData: data.sprites.front_default,
        gif: data.sprites.versions['generation-v']['black-white']['animated']['front_default'],
        types: data.types
    }
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

    h1.innerHTML = data.pokemon.name;
    const { imgData, gif, types } = await requestPokemonInfos(data.pokemon.url)
    gifs.push(gif);
    imgs.push(imgData)
    img.src = imgData;
    spanType.innerHTML = ''
    card.setAttribute('id', 'id' + index)
    console.log(index)
    console.log("-------------------------------------------------")
    index++;
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

    

    // // types
    // if (pokemonTypes.split(' ')[1] == undefined) {
    //     const imgEl = document.createElement("img");
    //     const img = typesData[pokemonTypes]
    //     imgEl.src = `../../assets/imgs/typeIcons/${img}`
    //     leftSideArea.querySelector(".type").append(imgEl)
    // } else {
    //     pokemonTypes.split(' ').forEach(type => {
    //         const imgEl = document.createElement("img");
    //         const img = typesData[type]
    //         imgEl.src = `../../assets/imgs/typeIcons/${img}`
    //         leftSideArea.querySelector(".type").appendChild(imgEl)
    //     })
    // }



    if (haveCard) {
        listener()
        // index = 0;
        return;         
    }
    listPokemons.append((card))


    
}

function listener() {
    // setInterval( () => {
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
}

let posPokemonPage = 20;
let pokemonPage = 1;
const pagePokemonArea = document.querySelector(".pagePokemonArea");

const createPagesPokemon = (qtdDivisionPokemon, qtdDivisionPokemonRest) => {

    if (haveCard) return;

    for (let i = 1; i < qtdDivisionPokemon + 1; i++){
        pagePokemonArea.innerHTML += `<button>${i}</button>`
    }
    if (qtdDivisionPokemonRest > 0)pagePokemonArea.innerHTML += `<button>${pagePokemonArea.children.length+1}</button>`;


    pagePokemonArea.querySelectorAll("button").forEach(button => button.addEventListener("click", (e) => {
        pokemonPage = ''
        pokemonPage = e.target.innerHTML;
        console.log("clicou ")
        gifs = [];
        imgs = [];
        requestPokemon();
    }))
}
  
let qtdPokemons = 0;
let qtdDivisionPokemon = 0
let qtdDivisionPokemonRest = 0

const qtdPokemonControll = (data) => {
    qtdPokemons = data.pokemon.length;
    if (qtdPokemons % 20 == 0) {
        qtdDivisionPokemon = parseInt(qtdPokemons / 20)
    } else {
        qtdDivisionPokemon = parseInt(qtdPokemons / 20);
        qtdDivisionPokemonRest = qtdPokemons - (20 * qtdDivisionPokemon);
    }

    createPagesPokemon(qtdDivisionPokemon, qtdDivisionPokemonRest)
}

let haveCard = false


const requestPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/type/' + infosPokemonApi[typePokemon].valueParam);
    const data = await response.json();

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

    
    
    qtdPokemonControll(data)
    document.querySelector("#results").innerHTML = data.pokemon.length;
    haveCard = true
    idCard = 0
}

// setInterval(() => {
        
//     }
// }, 100)



requestPokemon();

//não voltava
const urlCategory = new URL(window.location.href);
window.history.pushState({}, '', urlCategory.toString());
