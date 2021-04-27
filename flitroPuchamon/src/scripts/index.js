const pokeUrl = 'https://pokeapi.co/api/v2/pokemon/' // Default URL for API
const inputName = document.getElementById('inputName')
const buttonSearch = document.getElementById('searchButton')
const appNode = document.getElementById('app')

// Define data v
const pokemonName = document.createElement('h2')
const pokemonImage = document.createElement('img')
const pokemonExperience = document.createElement('h2')
const pokemonHeight = document.createElement('h2')
const pokemonWeight = document.createElement('h2')
const container = document.createElement('div')
const pokemonAbilities = document.createElement('h2')
const pokemonTypes = document.createElement('h2')

let pokemonAbilitiesTitle = ''
let pokemonAbility1 = ''
let pokemonAbility2 = ''
let pokemonAbility3 = ''
let pokemonTypeTitle = ''
let pokemonType1 = ''
let pokemonType2 = ''

searchButton.addEventListener('click', insertPokemon)

inputName.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchButton.click()
  }
})

function resetPokemon() {
  let allPokemon = appNode.childNodes
  allPokemon = Array.from(allPokemon)

  allPokemon.forEach((pokemon) => {
    pokemon.remove(pokemon)
  })
}
// Main Function
function insertPokemon() {
  // Clear array list
  resetPokemon()

  // Data from Input
  window
    .fetch(`${pokeUrl}${inputName.value.toLowerCase()}`)
    .then((response) => {
      if ((response.status === 404) | (response.statusText == 'Not Found')) {
        alert('Pokemon not found. Try with another!')
      } else {
        return response.json()
      }
    })
    .then((responseJSON) => {
      const allItems = []
      const result = []

      // JSON to Array
      for (let pokemonInfo in responseJSON) {
        result.push([pokemonInfo, responseJSON[pokemonInfo]])
      }
      console.table(result)

      // Pokemon Name
      pokemonName.innerText =
        `${result[10][1]} `.charAt(0).toUpperCase() +
        `${result[10][1]} `.slice(1) +
        ` N.°${result[6][1]}`

      // Pokemon Image
      pokemonImage.src = result[14][1].other.dream_world.front_default

      // Type Title
      pokemonTypeTitle = 'Type: '

      // Pokemon Type-1
      pokemonType1 = ` ${result[16][1][0].type.name}`

      // Pokemon Type-2

      if (result[16][1].length > 1) {
        pokemonType2 = ` ${result[16][1][1].type.name}`
      }

      pokemonTypes.innerText = pokemonTypeTitle + pokemonType1 + pokemonType2

      // Ability Title
      pokemonAbilitiesTitle = 'Abilities: '

      // Pokemon Ability-1
      pokemonAbility1 = `${result[0][1][0].ability.name}`

      // Pokemon Ability-2
      if (result[0][1].length > 1) {
        pokemonAbility2 = `, ${result[0][1][1].ability.name}`
      }

      // Pokemon Ability-3
      if (result[0][1].length > 2) {
        pokemonAbility3 = `, ${result[0][1][2].ability.name}`
      }

      pokemonAbilities.innerText =
        pokemonAbilitiesTitle + pokemonAbility1 + pokemonAbility2 + pokemonAbility3

      // Pokemon Experience
      pokemonExperience.innerText = `Base Experience: ${result[1][1]}`

      // Pokemon Height
      pokemonHeight.innerText = 'Height: ' + `${result[4][1]}` * 10 + ' cm.'

      // Pokemon Weight
      pokemonWeight.innerText = 'Weight: ' + `${result[17][1]}` / 10 + ' kg.'

      // Data Container
      container.append(
        pokemonImage,
        pokemonName,
        pokemonTypes,
        pokemonAbilities,
        pokemonExperience,
        pokemonHeight,
        pokemonWeight,
      )

      // Pushing Data from Container to allItems
      allItems.push(container)
      appNode.append(...allItems)

      console.log(pokemonAbilitiesTitle, pokemonAbility1, pokemonAbility2, pokemonAbility3)
    })
}
