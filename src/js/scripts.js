let composerRepository = (function() {

    // list of composers
    let composerList = [];
    let apiUrl = 'https://api.openopus.org/composer/list/pop.json';
    
    function getAll() {
        return composerList;
    }

    function add(composer) {
        if (composer?.name &&
            composer?.fullName &&
            composer?.epoch &&
            composer?.birth &&
            composer?.death && 
            composer?.portraitUrl &&
            composer?.openOpusId) {
              composerList.push(composer);
        } else {
              console.log('Composer input data is not valid.');
        }
    }
    
    // create button with composer name and write to html
    function addListItem(composer) {
        let composerListElement = document.querySelector('.composer-list');
        let listItem = document.createElement('div');
        let button = document.createElement('button');
        button.innerText = composer.name;
        button.classList.add('btn','btn-outline-dark');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        listItem.classList.add('col-md-4', 'mb-3', 'text-center');
        listItem.appendChild(button);
        addEventListenerToButton(button, composer);

        if (composerListElement.children.length % 4 === 0) {
          // Create a new row div
          let newRow = document.createElement('div');
          newRow.classList.add('row');
          composerListElement.appendChild(newRow);
        }
        
        // Get the last row and append the list item to it
        let rows = composerListElement.getElementsByClassName('row');
        let lastRow = rows[rows.length - 1];
        lastRow.appendChild(listItem);
    }

    // add event listener to composer buttons 
    function addEventListenerToButton(button, composer) {
        button.addEventListener('click', function() {
            showDetails(composer);
        });
    }

    function showDetails(composer) {
        loadDetails(composer).then(function () {
            showModal(composer)
        });
    }

    function showModal(composer) {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      let modalHeader = $('.modal-header')
      let headerButton = $('.close')

      modalHeader.empty();
      modalTitle.empty();
      modalBody.empty();

      let nameElement = document.createElement('h5');
      nameElement.innerHTML = '<strong>' + composer.name + '</strong>';

      let fullNameElement = document.createElement('p');
      fullNameElement.innerHTML = '<strong>Full Name:</strong> ' + composer.fullName;

      let epochElement = document.createElement('p');
      epochElement.innerHTML = '<strong>Epoch:</strong> ' + composer.epoch;

      let birthElement = document.createElement('p');
      birthElement.innerHTML = '<strong>Birth:</strong> ' + composer.birth;

      let deathElement = document.createElement('p');
      deathElement.innerHTML = '<strong>Death:</strong> ' + composer.death;

      let portraitElement = document.createElement('img');
      portraitElement.setAttribute('src', composer.portraitUrl);
      portraitElement.setAttribute('alt', 'Portrait of the composer')

      modalHeader.append(nameElement, headerButton);
      modalBody.append(portraitElement);
      modalBody.append(fullNameElement);
      modalBody.append(epochElement);
      modalBody.append(birthElement);
      modalBody.append(deathElement);
    }
    

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.composers.forEach(function (item) {
            let composer = {
                name: item.name,
                fullName: item.complete_name,
                epoch: item.epoch,
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
    
    return { getAll, add, addListItem, loadList, loadDetails, showModal };
})();

composerRepository.loadList().then(function() {
    // Now the data is loaded!
    composerRepository.getAll().forEach(function(composer){
      composerRepository.addListItem(composer);
    });
  });
