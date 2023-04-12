let pokemonRepository = (function() {

    // list of pokemon
    let pokemonList = [ 
        { name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Poison'] },
        { name: 'Charmander', height: 0.6, type: ['Fire']},
        { name: 'Squirtle', height: 0.5, type: ['Water'] }    
    ];

    function getAll() {
        return pokemonList
    }

    function add(pokemon) {
        if (typeof(pokemon) === 'object' && 
            Object.keys(pokemon).includes('name') &&
            Object.keys(pokemon).includes('height') && 
            Object.keys(pokemon).includes('type')) {
              pokemonList.push(pokemon);
              console.log('You have discovered a new pokemon!');
        } else {
              console.log('Pokemon data is not valid.');

    return {
        getAll: getAll,
        add: add
    };
})();


// write a pokemon to html, if pokemon is over 0.7m add additional message 
function writePokemonToHTML(pokemon) {
    if (pokemon.height >= 0.7) {
        document.write("<p>" + pokemon.name + " (height: " +  pokemon.height + ")" + " -Wow, that's big! </p>")
    } else {
        document.write("<p>" + pokemon.name + " (height: " +  pokemon.height + ")</p>")
    }
}
pokemonRepository.getAll().forEach(writePokemonToHTML);

