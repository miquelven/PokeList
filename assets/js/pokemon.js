let pokemonName =  ''
let pokemonHeight =  ''
let pokemonWeight = ''
let pokemonSkills =  ''
let pokemonNumberPokedex = ''
let pokemonGif = ''
let pokemonTypes = ''
let pokemonImg = ''

async function requestPokemonInfos() {
    const url = new URL(window.location.href);
    const paramsPokemon = url.searchParams.get('pokemon');
    
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + paramsPokemon);
    const data = await response.json();
    if (data.types.length > 1) {
        let types = []
        
        for (let i in data.types) {
            types.push(data.types[i].type.name);
        }

        pokemonTypes = `${types[0]} ${types[1]}`
        
    } else {
        pokemonTypes = data.types[0].type.name
    }
    pokemonName = paramsPokemon;
    pokemonHeight = (data.height / 10).toString();
    pokemonWeight = parseFloat(data.weight / 10);
    console.log(data.height)
    console.log(data.weight / 10+ " peso")
    pokemonSkills = data.abilities.map(abilitie => abilitie.ability.name)
    pokemonNumberPokedex = data.id;
    pokemonGif = data.sprites.versions['generation-v']['black-white']['animated']['front_default'];
    pokemonImg = data.sprites.front_default;
    // tipos, nome,
    // altura, peso,
    // habilidades, numero na pokedex.
    setTimeout(()=> setInfos(), 500)
}

function setInfos() {   
    const leftSideArea = document.querySelector(".leftSide");

    // types
    if (pokemonTypes.split(' ')[1] == undefined) {
        const imgEl = document.createElement("img");
        const img = typesData[pokemonTypes]
        imgEl.src = `../../assets/imgs/typeIcons/${img}`
        leftSideArea.querySelector(".type").append(imgEl)
    } else {
        pokemonTypes.split(' ').forEach(type => {
            const imgEl = document.createElement("img");
            const img = typesData[type]
            imgEl.src = `../../assets/imgs/typeIcons/${img}`
            leftSideArea.querySelector(".type").appendChild(imgEl)
        })
    }



    leftSideArea.querySelector("img").src = (pokemonGif == null) ? pokemonImg : pokemonGif;


    
    const rightSideArea = document.querySelector(".rightSide");
    rightSideArea.querySelector("h1").innerHTML = pokemonName;
    rightSideArea.querySelector("#pokemonName").innerHTML = pokemonName.toUpperCase();
    // fazer ternario aqui tbm
    if (pokemonHeight.split(".")[0] == '0') {
        rightSideArea.querySelector("#pokemonHeight").innerHTML = `${pokemonHeight.split('.')[1]}0cm`;
    } else {
        rightSideArea.querySelector("#pokemonHeight").innerHTML = `${pokemonHeight.split('.')[0]} metros e ${pokemonHeight.split('.')[1]}0cm`;
    }

    rightSideArea.querySelector("#pokemonWeight").innerHTML = pokemonWeight;
    rightSideArea.querySelector("#pokemonId").innerHTML = pokemonNumberPokedex;
    console.log(pokemonSkills.length)
    for (let i = 0; i < pokemonSkills.length; i++){
        if (pokemonSkills[i] == undefined) return;
        if (rightSideArea.querySelector("#pokemonSkills").innerHTML == '') {
            rightSideArea.querySelector("#pokemonSkills").innerHTML += pokemonSkills[0];
        } else {
            rightSideArea.querySelector("#pokemonSkills").innerHTML += ' | ' + pokemonSkills[i];
        }
    }
    

    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length + 1; i++){            
            const data = localStorage[`pokeFavorite${i}`]
            if (data !== undefined) {
                
                const dataObject = JSON.parse(data);

                if (dataObject.name == pokemonName) {
                    document.querySelector(".rightSide button").querySelector("#fav-icon").src = 'http://127.0.0.1:5500/assets/imgs/FavRed.png';
                }
            }
        }
    }
}

const buttonElement = document.querySelector(".rightSide button")

buttonElement.addEventListener('click', () => {
    buttonElement.querySelector("#fav-icon").src = (buttonElement.querySelector("#fav-icon").src == 'http://127.0.0.1:5500/assets/imgs/FavRed.png')
        ? 'http://127.0.0.1:5500/assets/imgs/favBlack.png' :
        'http://127.0.0.1:5500/assets/imgs/FavRed.png';
    

    if (buttonElement.querySelector("#fav-icon").src == 'http://127.0.0.1:5500/assets/imgs/FavRed.png') { // ADD STORAGE 
        const data = {
            id: localStorage.length + 1,
            name: pokemonName,
            img: pokemonImg
        }
        

        localStorage.setItem(`pokeFavorite${localStorage.length + 1}`, JSON.stringify(data));
    }
    
    
    if (buttonElement.querySelector("#fav-icon").src == 'http://127.0.0.1:5500/assets/imgs/favBlack.png') { // LIMPAR STORAGE
    if (localStorage.length > 0) {
        for (let i = 1; i < localStorage.length + 1; i++){            
            const data = localStorage[`pokeFavorite${i}`]
            if (data !== undefined) {
                
                const dataObject = JSON.parse(data);
                if (dataObject.name == pokemonName) {
        
                        while (localStorage[`pokeFavorite${i + 1}`] !== undefined) {
                            let newData = localStorage[`pokeFavorite${i + 1}`]
                            let dataFormat = JSON.parse(newData);
                            dataFormat.id -= 1 
                            localStorage.setItem(`pokeFavorite${i}`, JSON.stringify(dataFormat))
                            i++
                        }
                        localStorage.removeItem(`pokeFavorite${i}`);
                    
                }
            }
        }
    }
    }

})


requestPokemonInfos()