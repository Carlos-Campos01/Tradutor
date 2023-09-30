const textoFrom = document.querySelector("#textoFrom");
const textoTo = document.querySelector("#textoTo");
const btntraduzir = document.querySelector("#btntraduzir");
const selects = document.querySelectorAll("select");

const countries = {
    "en-GB": "Inglês",
    "es-ES": "Espanhol",
    "it-IT": "Italiano",
    "ja-JP": "Japonês",
    "pt-BR": "Português",
};

selects.forEach((tag) => {
    for (let country in countries) {
      let selected;
      if (tag.className.includes("selectFrom") && country == "pt-BR") {
        selected = "selected";
      } else if (tag.className.includes("selectTo") && country == "en-GB") {
        selected = "selected";
      }
  
      const option = `<option value="${country}" ${selected}>${countries[country]}</option>`;
  
      tag.insertAdjacentHTML("beforeend", option);
    }
  });

btntraduzir.addEventListener("click", ()  =>{
    if  (textoFrom.value) {
        loadTranslation();
      } else {
        textoTo.value = "";
      }
});

function loadTranslation() {
    fetch(
      `https://api.mymemory.translated.net/get?q=${textoFrom.value}&langpair=${selects[0].value}|${selects[1].value}`
    )
      .then((res) => res.json())
      .then((data) => {
        textoTo.value = data.responseData.translatedText;
      });
  }
