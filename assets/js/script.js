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
let nameParamsControl, valueParamsControl = '';

const navigateNewPage = () => {
  //colocar search no lugar de category
  window.location.href = `pages/search/search.html?${nameParamsControl}=${valueParamsControl}`
  console.log(window.location.href)
}

const getParams = () => {
  const url = new URL(window.location.href);


  const params = url.searchParams;
  console.log(params + "PARAMS")
  const paramsString = Array.from(params).map(entry => `${entry[0]} ${entry[1]}`).join(', ');
  nameParamsControl = paramsString.split(' ')[0]
  valueParamsControl = paramsString.split(' ')[1]

  navigateNewPage(paramsString);
}

const changeURL = (name, value) => {
  const url = new URL(window.location.href);
  if (value == 'favorites') {
    console.log(url)
    
    // URL base do seu aplicativo
var baseUrl = "http://127.0.0.1:5500";

// Nova URL relativa
var novaUrl = "/pages/favorites/favoritePage.html";

// Use o objeto URL para criar uma URL absoluta
var urlAbsoluta = new URL(novaUrl, baseUrl);

// Atualize a localização para a nova URL absoluta
window.location.href = urlAbsoluta.href;

    // CHATGPT SEU LINDO!!!

  } else if (name == 'search') {
    var baseUrl = "http://127.0.0.1:5500";

    var novaUrl = "/pages/search/search.html";

    var urlAbsoluta = new URL(novaUrl, baseUrl);


    const params = urlAbsoluta.searchParams;
    const paramsString = Array.from(params).map(entry => `${entry[0]} ${entry[1]}`).join(', ');
    nameParamsControl = paramsString.split(' ')[0]
    valueParamsControl = paramsString.split(' ')[1]

    
    //PEGAR O PARAMETRO PARA DELETAR E DEPOIS ADICIONAR O DO POKEMON PESQUISADO

    urlAbsoluta.searchParams.delete(nameParamsControl, valueParamsControl);
    urlAbsoluta.searchParams.set('search', value)

    window.location.href = urlAbsoluta.href;
  } else {
  
    url.searchParams.set(name, value);
  
    window.history.pushState({}, '', url.toString());
  
    getParams()
  }

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

// cleanURL();





