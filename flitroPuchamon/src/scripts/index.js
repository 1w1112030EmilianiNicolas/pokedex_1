const pokeUrl = 'https://pokeapi.co/api/v2/pokemon/' // Default URL for API

// Define data v
const pokemonName = document.getElementById('nombrePokemon')
const pokemonImage = document.getElementById('imgPokemon')
const pokemonExperience = document.getElementById('xpPokemon')
const pokemonHeight = document.getElementById('alturaPokemon')
const pokemonWeight = document.getElementById('pesoPokemon')
const pokemonAbilities = document.getElementById('habilidadesPokemon')
const pokemonTypes = document.getElementById('tipoPokemon')

let pokemon = {
  name: '-',
  type: '-',
  weight: '-',
  height: '-',
  abilities: '-',
  xp: '-',
  imgUrl: '-'
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Main Function
function insertPokemon(pokepoke) {
  window
    .fetch(`${pokeUrl}${pokepoke.toLowerCase()}`)
    .then((response) => {
      if ((response.status === 404) | (response.statusText == 'Not Found')) {
        alert('Pokemon not found. Try with another!')
      } else {
        return response.json()
      }
    })
    .then((responseJSON) => {

      console.log(responseJSON)
      pokemon.name = responseJSON.name
      pokemon.height = responseJSON.height
      pokemon.weight = responseJSON.weight
      pokemon.xp = responseJSON.base_experience
      pokemon.imgUrl = responseJSON.sprites.other.dream_world.front_default


      let types = []
      responseJSON.types.forEach(x => {
        types = [...types, capitalizeFirstLetter(x.type.name)]
      })
      pokemon.type = types.join(' - ')
      
      
      let abilities = []
      responseJSON.abilities.forEach(x => {
        abilities = [...abilities, capitalizeFirstLetter(x.ability.name)]
      })
      pokemon.abilities = abilities.join(' - ')
      
      pokemonTypes.innerText = pokemon.type
      pokemonWeight.innerText = pokemon.weight
      pokemonHeight.innerText = pokemon.height
      pokemonExperience.innerText = pokemon.xp
      pokemonAbilities.innerText = pokemon.abilities
      pokemonName.innerText = pokemon.name
      pokemonImage.src = pokemon.imgUrl
    })
}
