const list = document.querySelector("#favoriteList");
setTimeout(() => {

  for (let i = 1; i < localStorage.length + 1; i++) {
    const data = JSON.parse(localStorage[`pokeFavorite${i}`]);
    const li = document.createElement("li");
    li.setAttribute("id", `pokeID${i}`);
    li.innerHTML = `<div><h1>${data.name}</h1><img src='${data.img}' alt='imagem do pokemon'></div><button><a herf='https://icons8.com/icon/1941/trash'>🗑</a></button>`;
    list.append(li);
  }

  listener()
}, 800);

function listener() {
  //  pegar o favoriteList e depois trocar;


  // APERTAR DO LADO ESQUERDO E IR PARA AS INFOS DO POKEMON
  document.querySelectorAll("#favoriteList li div").forEach(div => {
    div.addEventListener("click", (e) => {
      loadPokemonPage(e.currentTarget.querySelector("h1").innerHTML)
    })
  })


  //BUTTON
  document.querySelectorAll("#favoriteList li button").forEach(button => 
    button.addEventListener("click", (e) => {
      const item = e.target.closest("li").getAttribute("id")
      const numberItem = item.split('pokeID')[1]
      let dataStorage = []
      for (let i = 1; i < list.children.length + 1; i++){
        const buttonVerify = document.querySelector(`#pokeID${i}`);
        if (i > numberItem) {
          // ABAIXA O ID DE QUEM VEM DEPOIS
          buttonVerify.setAttribute("id", `pokeID${i - 1}`)

          
        }
        if (i !== numberItem) {
          // copia e modifica
          let jsonData = localStorage.getItem(`pokeFavorite${i}`);
          dataStorage.push(JSON.parse(jsonData))
          dataStorage[0].id > numberItem ? dataStorage[0].id-- : dataStorage[0].id
          
          
        }
      }
      e.target.closest('li').remove();
      localStorage.clear();

      let result = dataStorage.filter(store => store.id !== parseInt(numberItem))
      result.map(res => {
        if (res.id > numberItem) res.id -= 1;
      })
      result.forEach(res => {

        localStorage.setItem(`pokeFavorite${res.id}`, JSON.stringify(res))
      })
    })  
  )
}

const urlCategory = new URL(window.location.href);
window.history.pushState({}, '', urlCategory.toString());