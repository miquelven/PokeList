setTimeout(() => {
  const list = document.querySelector("#favoriteList");

  for (let i = 1; i < localStorage.length + 1; i++) {
    const data = JSON.parse(localStorage[`pokeFavorite${i}`]);
    const li = document.createElement("li");
    li.setAttribute("id", `pokeID${i}`);
    li.innerHTML = `<div><h1>${data.name}</h1><img src='${data.img}' alt='imagem do pokemon'></div><button><a herf='https://icons8.com/icon/1941/trash'>🗑</a></button>`;
    list.append(li);
  }
}, 800);

// FAZER UM DRAG AND DROP DA LISTA DE POKEMON PARA ORDENA-LOS
const urlCategory = new URL(window.location.href);
window.history.pushState({}, '', urlCategory.toString());