let composerRepository = (function() {

    // list of composers
    let composerList = [ 
        { name: 'Johann Sebastian Bach', birth: 1685, death: 1750 },
        { name: 'Ludwig Van Beethoven', birth: 1770, death: 1827},
        { name: 'Wolfgang Amadeus Mozart', birth: 1756, death: 1791}    
    ];

    function getAll() {
        return composerList
    }

    function add(composer) {
        if (typeof(composer) === 'object' && 
            Object.keys(composer).includes('name') &&
            Object.keys(composer).includes('birth') && 
            Object.keys(composer).includes('death')) {
              composerList.push(composer);
        } else {
              console.log('Composer input data is not valid.');

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

