let composerRepository = (function() {

    // list of composers
    let composerList = [];
    let apiUrl = 'https://api.openopus.org/composer/list/pop.json';
    let modalContainer = document.querySelector('#modal-container');
    

    function getAll() {
        return composerList;
    }

    function add(composer) {
        if (composer?.name &&
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
            showModal(composer)
        });
    }

    function showModal(composer) {
        // create modal container parent
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        //create close button for modal
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let nameElement = document.createElement('h1');
        nameElement.innerText = composer.name;

        let birthElement = document.createElement('p');
        birthElement.innerText = 'Birth: ' + composer.birth;

        let deathElement = document.createElement('p');
        deathElement.innerText = 'Death: ' + composer.death;

        let portraitElement = document.createElement('img');
        portraitElement.setAttribute('src', composer.portraitUrl);

        modal.appendChild(closeButtonElement);
        modal.appendChild(nameElement);
        modal.appendChild(birthElement);
        modal.appendChild(deathElement);
        modal.appendChild(portraitElement);
        modalContainer.appendChild(modal);
    
        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
      }
    
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
      
      modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
    
    //   document.querySelector('#show-modal').addEventListener('click', () => {
    //     showModal('Modal title', 'This is the modal content!');
    //   });

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
    
    return { getAll, add, addListItem, loadList, loadDetails };
})();

composerRepository.loadList().then(function() {
    // Now the data is loaded!
    composerRepository.getAll().forEach(function(composer){
      composerRepository.addListItem(composer);
    });
  });

  