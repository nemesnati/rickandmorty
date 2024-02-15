const rootElement = document.querySelector("#root");

const fetchUrl = (url) => fetch(url).then((res) => res.json());

let clickCount = 0;

const skeletonComponent = () => `
  <h1>Rick and Morty Database</h1>
  <p id="selected-card"></p>
  <div class="characters"></div>
  <img src="rick.png" alt="rick and morty dancing" id="rick">
  <div class="buttons"></div>
`;

const characterComponent = (characterData) => ` 
    <img src=${characterData.image}>
    <h2>${characterData.name.toUpperCase()}</h2>
    <h3>Appears in: ${characterData.episode.length} episodes</h3>
    <h3>Status: ${characterData.status}</h3>
    <h4>click to learn more</h4>
`;

const selectedCharacterComponent = (characterData) => {
  let episodesArray = [];

  characterData.episode.forEach((epUrl) => {
    episodesArray.push(epUrl.substring(40));
  });

  return `
  <h2>FILE</h2>
  <h2>Name: ${characterData.name}</h2>
  <h4>Gender: ${characterData.gender}</h4>
  <h5>Species: ${characterData.species}</h5>
  <h6>Episodes: ${episodesArray.join(", ")}</h6>
`;
};

const buttonComponent = (id, text) => `<button id=${id}>${text}</button>`;

const buttonEventComponent = (id, url) => {
  const buttonElement = document.querySelector(`#${id}`);
  buttonElement.addEventListener("click", () => {
    console.log(`fetch: ${url}`);
    rootElement.innerHTML = "LOADING...";
    fetchUrl(url).then((data) => {
      makeDomFromData(data, rootElement);
    });
  });
};

const makeDomFromData = (data, rootElement) => {
  rootElement.innerHTML = skeletonComponent();

  const charactersElement = document.querySelector(".characters");
  const buttonsElement = document.querySelector(".buttons");

  const info = data.info;
  const characters = data.results;

  characters.forEach((character) => {
    const charElement = document.createElement("div");
    charElement.classList.add("char");
    charElement.innerHTML = characterComponent(character);
    charactersElement.appendChild(charElement);

    charElement.addEventListener(
      "click",
      createCharClickListener(character, data)
    );
  });

  if (info.prev) {
    buttonsElement.insertAdjacentHTML(
      "beforeend",
      buttonComponent(
        "prev",
        `
      <span class="material-icons">arrow_back</span>
    `
      )
    );
    buttonEventComponent("prev", info.prev);
  }

  if (info.next) {
    buttonsElement.insertAdjacentHTML(
      "beforeend",
      buttonComponent(
        "next",
        `
      <span class="material-icons">arrow_forward</span>
    `
      )
    );
    buttonEventComponent("next", info.next);
  }
};

const createCharClickListener = (character) => {
  return () => {
    const selectedCharElement = document.querySelector("#selected-card");
    clickCount++;
    if (clickCount % 2 === 0) {
      selectedCharElement.style.display = "none";
    } else {
      selectedCharElement.style.display = "block";
    }
    selectedCharElement.innerHTML = selectedCharacterComponent(character);
  };
};

const init = () => {
  rootElement.innerHTML = "LOADING...";
  fetchUrl("https://rickandmortyapi.com/api/character").then((data) => {
    makeDomFromData(data, rootElement);
  });
};

init();
