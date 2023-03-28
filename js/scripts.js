// list of pokemon
let pokemonList = [ 
    { name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Poison'] },
    { name: 'Charmander', height: 0.6, type: ['Fire']},
    { name: 'Squirtle', height: 0.5, type: ['Water'] }    
];

// loop over pokemonList and write each pokemon to html, if pokemon is over 0.7m add additional message 
for (let i =  0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >= 0.7) {
        document.write("<p>" + pokemonList[i].name + " (height: " +  pokemonList[i].height + ")" + " -Wow, that's big! </p>")
    } else {
        document.write("<p>" + pokemonList[i].name + " (height: " +  pokemonList[i].height + ")</p>")
    }
}

