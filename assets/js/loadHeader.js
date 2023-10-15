const header = document.querySelector(".contentHeader");

fetch('../../components/header.html').then((response)=> response.text()).then((data) => header.innerHTML = data)

