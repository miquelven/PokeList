const intervalRender = setInterval(() => {
    if (document.querySelector(".contentHeader #logo") !== null) {
        featuresHeader()
    }
}, 100)

function featuresHeader() {
    clearInterval(intervalRender);
    const logoEl = document.querySelector(".contentHeader #logo")
    const inputImgEl = document.querySelector(".contentHeader .inputArea img")

    logoEl.addEventListener("click", () => {
        const url = new URL(window.location.href);

        window.history.pushState({}, '', url);

        window.location.href = '/'
    })

    console.log(inputImgEl)

    inputImgEl.addEventListener("click", () => {
        console.log("oi")
        const inputEl = inputImgEl.parentElement.parentElement.querySelector("input")
        if (inputEl.value !== ''.trim()) {
            console.log("tem conteudo")
            
            changeURL('search', inputEl.value)
            //mudar category por search
        }
        // else {
        //     console.log("nao")
        // }
        
    })

}



// let nameParamsHeader = '';
// let valueParamsHeader = '';


// function navigateNewPage () {
  
//     window.location.href = `pages/category/${nameParamsHeader}.html?${nameParamsHeader}=${valueParamsHeader}`
//   }
  
//  function  getParams () {
//     const url = new URL(window.location.href);
  
//     const params = url.searchParams;
//     const paramsString = Array.from(params).map(entry => `${entry[0]} ${entry[1]}`).join(', ');
//     nameParamsHeader = paramsString.split(' ')[0]
//     valueParamsHeader = paramsString.split(' ')[1]
  
//     navigateNewPage(paramsString);
//   }
  
//  function  changeURL (name, value) {
//     const url = new URL(window.location.href);
  
//     url.searchParams.set(name, value);
  
//     window.history.pushState({}, '', url.toString());
  
//     getParams()
//   }
    
  
//   function cleanURL() {
//     const url = new URL(window.location.href);
//     const modifyURL = url.toString().split("?")[0];
//     const newURL = new URL(modifyURL);
  
//     window.history.pushState({}, '', newURL.toString());
//   }
  
//   cleanURL();