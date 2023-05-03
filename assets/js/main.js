const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const modalBody = document.querySelector(".modal-body");
const btnClose = document.querySelector(".btn-close");
const div = document.createElement("div");
modalBody.append(div);

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  const numberPoke = JSON.stringify(pokemon.number);

  return `
    <li class="pokemon ${
      pokemon.type
    }" onclick="addPokemonToList(${numberPoke})" data-bs-toggle="modal" data-bs-target="#modalLindao">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
          </ol>
          <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </li>
    `;
}

function addPokemonToList(num) {
  pokeApi
    .findPokemon(num)
    .then(
      (response) =>
        (modalBody.innerHTML = `
      <div class="detail-pokemon-centered ${response.type}">
        <div class="pokemon-number-name ">
          <span class="name">${response.name}</span>
          <span class="number">#${response.number}</span>
        </div>
            <div class="img-detail">
              <img id="detailPhoto" src="${response.photo}">
            </div>
            <div class="container-color ">
              <section class="detail">
                <p>Detail</p>
                <hr>
                <div class="description">
                  <div class="abililies">
                    <p>Abilities</p>
                    
                      ${response.abilities
                        .map((ability) => `<span> ${ability}</span>`)
                        .join("")}
                  </div>
                  <div class="experience">
                  <p>Experience</p>
                    <span> ${response.experience}</span>
                  </div>
                  <div class="typ">
                    <p>Types</p>
                    ${response.types
                      .map((type) => `<span class="type">${type}</span>`)
                      .join("")}                    
                  </div>
                </div>
              </section>
            </div>
      </div>
    `)
    )
    .catch((error) => console.error(error));
}

btnClose.addEventListener("click", function () {
  div.innerHTML = null;
});

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});