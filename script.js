let input = document.querySelector("input");
let pokemonContainer = document.querySelector(".appendPoke");
let pokemonCardDisplay = document.querySelector(".pokemonCard");
let selectType = document.querySelector("select");
let btn = document.querySelectorAll("button");
let pokeArray = [];
let arr = [];
let typeArr = [];

//todo ---------- Fetching Pokemon ----------
async function fetchPokemon() {
  let pokemonArray = [];
  //! fetching API and create a new array here ....
  for (let i = 1; i <= 151; i++) {
    pokemonArray.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`).then((res) => res.json())
    );
  }

  //! create a new object here .....
  Promise.all(pokemonArray).then((res) => {
    let newPokemonArray = res.map((item) => {
      return {
        id: item.id,
        image: item.sprites.front_default,
        name: item.name,
        type: item.types[0].type.name,
        back_img: item.sprites.back_default,
        move: item.moves[0].move.name,
        height: item.height,
        weight: item.weight,
        game_index: item.game_indices[0].game_index,
        card_image: item.sprites.front_shiny,
      };
    });
    pokeArray = newPokemonArray;

    //! append all the pokemon here .....
    for (let i = 0; i < newPokemonArray.length; i++) {
      let pokeCard = document.createElement("div");
      pokeCard.innerHTML = `
                <div class="eachPokemon" id="${newPokemonArray[i].type}">
                    <div class="id_image">
                        <p class="id">${newPokemonArray[i].id}</p>
                        <img src="${newPokemonArray[i].image}" alt="">
                    </div>
                    <p class="name">${newPokemonArray[i].name}</p>
                    <p class="type">${newPokemonArray[i].type}</p>
                </div>
            `;
      pokemonContainer.appendChild(pokeCard);

      //! appending types here ......
      if (!typeArr.includes(newPokemonArray[i].type)) {
        typeArr.push(newPokemonArray[i].type);
        let options = document.createElement("option");
        options.innerHTML = `
                  ${newPokemonArray[i].type}
                `;
        options.value = newPokemonArray[i].type;
        selectType.appendChild(options);
      }
    }
    let eachPokemon = pokemonContainer.getElementsByClassName("eachPokemon");
    displayCard(eachPokemon);
  });
}
fetchPokemon();

//todo ---------- Filtering Pokemon ----------
function filterPokemon(pokeArray) {
  let searchText = input.value.toLowerCase();
  let filterList = pokeArray.filter((pokemon) => {
    return pokemon.name.indexOf(searchText) == -1 ? false : true;
  });
  pokemonContainer.innerHTML = "";

  for (let i = 0; i < filterList.length; i++) {
    let pokeCard = document.createElement("div");
    pokeCard.innerHTML = `
                <div class="eachPokemon" id="${filterList[i].type}">
                    <div class="id_image">
                        <p class="id">#${filterList[i].id}</p>
                        <img src="${filterList[i].image}" alt="">
                    </div>
                    <p class="name">${filterList[i].name}</p>
                    <p class="type">${filterList[i].type}</p>
                </div>
            `;
    pokemonContainer.appendChild(pokeCard);
  }
}

input.addEventListener("input", () => {
  filterPokemon(pokeArray);
});

//todo ---------- Filter by type button activate ----------
function filterByType(pokeArray) {
  let selectValue = selectType.value;
  let filterList = pokeArray.filter((eachType) => {
    return eachType.type.indexOf(selectValue) == -1 ? false : true;
  });
  pokemonContainer.innerHTML = "";

  for (let i = 0; i < filterList.length; i++) {
    let pokeCard = document.createElement("div");
    pokeCard.innerHTML = `
                <div class="eachPokemon" id="${filterList[i].type}">
                    <div class="id_image">
                        <p class="id">#${filterList[i].id}</p>
                        <img src="${filterList[i].image}" alt="">
                    </div>
                    <p class="name">${filterList[i].name}</p>
                    <p class="type">${filterList[i].type}</p>
                </div>
            `;
    pokemonContainer.appendChild(pokeCard);
  }
}

btn[0].addEventListener("click", () => {
  filterByType(pokeArray);
});

//todo ---------- Reset button activate ----------
btn[1].addEventListener("click", () => {
  document.location.reload();
});
//todo ---------- display Card ----------
async function displayCard(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener("click", (e) => {
      e.target.classList.add('bounceIn');
      let id = e.target.children[0].children[0].innerText;
      let data = fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
          let pokemonDisplay = document.createElement("div");
          pokemonCardDisplay.innerHTML = "";
          pokemonDisplay.innerHTML = `
                    
        <div class="singlecard">
            <div class="cardInner">
                <div class="front">
                    <img src="${data.sprites.front_shiny}" alt="">
            <div class="moves">
                <div class="moveLeft">
                    <p>Height : <span>${data.height} </span></p>
                    <p>Move : <span>${data.moves[0].move.name} </span></p>
                </div>
                <div class="moveRight">
                    <p>Weight : <span>${data.weight} </span> </p>
                    <p>game_index : <span>${data.game_indices[0].game_index} </span></p>
                </div>
            </div>
                </div>
                <div class="back">
                    <img src="${data.sprites.back_default}" alt="">
                    <p>Abilities : <span>${data.abilities[0].ability.name},</span> <span>${data.abilities[1].ability.name}</span></p>
                </div>
            </div>
        </div>
    `;

          pokemonCardDisplay.appendChild(pokemonDisplay);
    });
    });
  }
}
