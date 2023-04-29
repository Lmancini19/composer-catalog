let composerRepository = (function() {

    // list of composers
    let composerList = [];
    let apiUrl = 'https://api.openopus.org/composer/list/pop.json';
    

    function getAll() {
        return composerList;
    }

    function add(composer) {
        if (typeof(composer) === 'object' && 
            Object.keys(composer).includes('name') &&
            Object.keys(composer).includes('birth') && 
            Object.keys(composer).includes('death') &&
            Object.keys(composer).includes('portraitUrl') &&
            Object.keys(composer).includes('openOpusId')) {
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
        loadDetails(composer).then(function () {
            console.log(composer)
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.composers.forEach(function (item) {
            let composer = {
                name: item.complete_name,
                birth: item.birth,
                death: item.death,
                portraitUrl: item.portrait,
                openOpusId: item.id
            };
            add(composer);
          });
        }).catch(function (e) {
          console.error(e);
        })
    }

    function loadDetails(composer) {
        let url = `https://api.openopus.org/work/list/composer/${composer.openOpusId}/genre/all.json`;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (json) {
            composer.works = json.works;
        }).catch (function (e) {
            console.error(e);
        });
    }
    
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

composerRepository.loadList().then(function() {
    // Now the data is loaded!
    composerRepository.getAll().forEach(function(composer){
      composerRepository.addListItem(composer);
    });
  });
