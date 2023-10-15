// const baseURL = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";
const baseURL = "https://pokeapi.co/api/v2/type/1/";
// https://pokeapi.co/api/v2/pokemon?limit=1016&offset=0
// https://pokeapi.co/api/v2/type TIPOS

// COLOCAR CARDS GRANDES DIZENDO PRA VER POR TIPOS, OU POR OUTRAS CARACTERISTICAS, DAI POR TIPO POR EXEMPLO VAI APARECER OS TIPOS DAI QUANDO CLICAR SÓ VAI APARECER POKEMON DAQUELE TIPO

// API COM TODOS OS POKEMONS, PARA CADA POKEMON VERIFICAR SE ELE É DE TAL TIPO E CRIAR UM ESQUEMA DE TIPO DE FILTRO PARA CADA UM;
// QUANDO DIGITAR MOSTRAR NOMES PARECIDOS, E DEPOIS QUE PESQUISAR POKEMONS QUE TENHAM A MESMA LETRA DO QUE FOI DIGITADO NO INPUT;
// MOSTRAR QUANTIDADE DE RESULTADOS;
// CARD PARA MOSTRAR CARACTERISTICAS QUANDO TIVER O HOVER;


const lis = document.querySelectorAll('ul li');
let nameParams, valueParams = '';

const navigateNewPage = () => {
  
  window.location.href = `pages/category/${nameParams}.html?${nameParams}=${valueParams}`
}

const getParams = () => {
  const url = new URL(window.location.href);

  const params = url.searchParams;
  const paramsString = Array.from(params).map(entry => `${entry[0]} ${entry[1]}`).join(', ');
  nameParams = paramsString.split(' ')[0]
  valueParams = paramsString.split(' ')[1]

  navigateNewPage(paramsString);
}

const changeURL = (name, value) => {
  const url = new URL(window.location.href);

  url.searchParams.set(name, value);

  window.history.pushState({}, '', url.toString());

  getParams()
}

lis.forEach(li => li.addEventListener('click', e => {

  const category = li.getAttribute('data-category')
  
  changeURL('category', category)
}))

function cleanURL() {
  const url = new URL(window.location.href);
  const modifyURL = url.toString().split("?")[0];
  const newURL = new URL(modifyURL);

  window.history.pushState({}, '', newURL.toString());
}

cleanURL();


// NOMES DOS POKEMONS
// const request = async () => {
//   let response = await fetch(baseURL);
//   let json = await response.json();
//   for (let i in json.pokemon) console.log(json.pokemon[i].pokemon.name)
// };

// request();


















