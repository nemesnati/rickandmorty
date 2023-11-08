const rootElement = document.querySelector("#root");

const fetchUrl = (url) => fetch(url).then((res) => res.json());

const characterComponent = (characterData) => `
 <div class="char">
    <img src=${characterData.image}>
    <h2>${characterData.name}</h2>
    <h3>appears in : ${characterData.episode.length} episodes</h3>
</div>

`;

const init = () => {
  fetchUrl("https://rickandmortyapi.com/api/character").then((data) => {
    console.log(data);

    const info = data.info;
    const characters = data.results;

    console.log(info); //info object
    console.log(characters); //characters array

    characters.forEach((character) => {
      rootElement.insertAdjacentHTML(
        "beforeend",
        characterComponent(character)
      );
    });
  });
};

init();