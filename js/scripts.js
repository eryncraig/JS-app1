// starting setup of controlled global variables/controlled state; uses IIFE
let pokemonRepository = (function () {
  //adding API data/connecting to it
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //function to add new pokemon to the list 
  function add(pokemon) {
    // let expectedTraits = ['name', 'weight', 'types'];
    // let actualTraits = Object.keys(pokemon);

    //making sure object.keys is getting the correct keys
    console.log(Object.keys(pokemon));

    //conidtional to check if pokemon being added is formatted correctly/doesn't include extraneous code
    if (typeof pokemon === "object" && 'name' in pokemon && 'height' in pokemon && 'types' in pokemon) {
      pokemonList.push(pokemon);
    } else if (typeof pokemon !== "object") {
      console.log('You are trying to add a non-pokemon! Check your formatting.')
    }
  }
  //end of add function

  //created function that adds ul and li elements and allows styling for each iterated item
  function addListItem(pokemon) {
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    let pokeUL = document.querySelector('.pokemon-list');

    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');

    listItem.appendChild(button);
    pokeUL.appendChild(listItem);

    buttonListener(button, pokemon);
  }
  //end of addListItem function


  //created event handler function outside of IIFE for re-use or re-organization later if needed
  function buttonListener(button, pokemon) {
    button.addEventListener('click', function (event) {
      //double-checking event is listened to
      console.log(event);
      showDetails(pokemon);
    });
  }

  //start of function to return pokemon details, simply logging them to console for now
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  //function to allow return of array outside of IIFE but so array is not directly accessible or editable
  function getAll() {
    return pokemonList;
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }


  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  }
})();
//end of IIFE for now


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


// all code below is deprecated and only kept for reference by the author

//testing add function
// pokemonRepository.add(
//   {
//     name: 'Pidgeot',
//     weight: 70,
//     types: ['normal', 'flying']
//   }
// );


//updated loop to a forEach loop instead of an old 'for' loop - console logging is for debugging for now
// function printArrayDetails() {
//   let pokemonDex = pokemonRepository.getAll();

//   pokemonDex.forEach(function (list) {
//     pokemonRepository.addListItem(list);

//     if (list.weight > 100 && list.weight < 200) {
//       console.log('medium');
//     } else if (list.weight < 100) {
//       console.log('small');
//     } else {
//       console.log('big');
//     }
//   })
// }

//only current output/display/html elements on ui, no interactive function yet
// printArrayDetails();

