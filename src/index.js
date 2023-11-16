import { fetchBreeds, fetchCatByBreed, } from './cat-api'

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

select.style.display = 'none';
showLoader()

select.addEventListener('change', onSearch);


fetchBreeds()
    .then(breeds => {
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            select.appendChild(option);
            select.style.display = 'block';
            loader.style.display = 'none';
            select.style.marginBottom = '10px';
            option.style.backgroundColor = 'grey';
            select.style.height = '30px';
        })
    })
    .catch(error => {
    showError();
        console.error(error);
    })

function onSearch() {
    const selectId = select.value;
    select.style.backgroundColor = "white";
    showLoader();


    fetchCatByBreed(selectId)
        .then(cat => {
            const selectBreed = cat[0];
            catInfo.innerHTML = createMarkup(selectBreed);
            showCatInfo();
        })
    }


function createMarkup(cat) {
    if (!cat) {
        select.style.display = 'block';
        loader.style.display = 'none';
        error.style.display = 'block';
        error.style.color = 'red';
    }

        const { url } = cat;
        const { name, temperament, description} = cat.breeds[0];
                
      return `
      <img src="${url}" alt="${name}" width='300px' height='auto'>
      <h2>${name}</h2>
      <p>${description}</p>
      <h3>Temperament:</h3>
      <p>${temperament}</p> `
    }

function showLoader() {
    loader.style.display = 'block';
    catInfo.style.display = 'none';
    error.style.display = 'none';
}

function showCatInfo() {
    loader.style.display = 'none';
    catInfo.style.display = 'block';
    error.style.display = 'none';
}

export function showError() {
    loader.style.display = 'none';
    catInfo.style.display = 'none';
    error.style.display = 'block';
    error.style.color = 'red';
}

