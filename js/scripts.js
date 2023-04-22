let composerRepository = (function() {

    // list of composers
    let composerList = [ 
        { name: 'Johann Sebastian Bach', birth: 1685, death: 1750 },
        { name: 'Ludwig Van Beethoven', birth: 1770, death: 1827},
        { name: 'Wolfgang Amadeus Mozart', birth: 1756, death: 1791}    
    ];

    function getAll() {
        return composerList;
    }

    function add(composer) {
        if (typeof(composer) === 'object' && 
            Object.keys(composer).includes('name') &&
            Object.keys(composer).includes('birth') && 
            Object.keys(composer).includes('death')) {
              composerList.push(composer);
        } else {
              console.log('Composer input data is not valid.');
        }
    }
    
    // create button with composer name and write to html
    function addListItem(composer) {
        let composerList = document.querySelector('.composer-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = composer.name;
        button.classList.add('button-style');
        listItem.appendChild(button);
        addEventListenerToButton(button, composer);
        composerList.appendChild(listItem);
    }

    // add event listener to composer buttons 
    function addEventListenerToButton(button, composer) {
        button.addEventListener('click', function(event) {
            showDetails(composer);
        });
    }

    function showDetails(composer) {
        console.log(composer)
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
    };
})();


composerRepository.getAll().forEach(composerRepository.addListItem);
