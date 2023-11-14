import axios from 'axios';

const myKey = 'live_Yahs1OKzyrwVNJqGXOpJyXTyXgZobHXijQ1uMy3tNS1LNtTDiuSBrFn13XKlyWyG'
axios.defaults.headers.common["x-api-key"] = myKey;


const select = document.querySelector('.breed-select');
const loard = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

select.addEventListener('change', onSearch);


fetchBreeds()
    .then(data => {
        select.innerHTML = '';
        data.forEach(({ name, id }) => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = name;
            select.appendChild(option);
        });
})

function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds')
        .then(({data}) => {
        select.innerHTML = '';
        data.forEach(({ name, id }) => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = name;
            select.appendChild(option);
        })

        loard.style.display = 'none';
        error.style.display = 'none';
    })
        .catch(error => {
            console.error(error);
            loard.style.display = 'none';
        error.style.display = 'block';
        });
}
fetchBreeds()


function fetchCatByBreed(breed_Id) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed_Id}`)
        .then(response => response.data[0])
        .catch(error => console.error(error));
}

function onSearch(e) {
    e.preventDefault();
    const selectId = select.value;

    loard.style.display = "block";
    
    catInfo.style.display = 'none';
    error.style.display = 'none';


    fetchCatByBreed(selectId)
        .then(cat => {
            catInfo.innerHTML = createMarkup(cat);
            catInfo.style.display = 'block';
        })
        .catch((err) => {
            console.log(err);
            error.style.display = 'block';
        })
        .finally(() => {
            loard.style.display = 'none';
        });



    function createMarkup(cat) {
    console.log(cat)
        if (!cat) {
            return '<p>No information available for this cat.</p>';
        }
const {url} = cat
        const { name, temperament, description} = cat.breeds[0];
    
        return `
      <img src="${url}" alt="" width='300'>
      <h2>${name}</h2>
      <p>${description}</p>
      <h3>Temperament:</h3>
      <p>${temperament}</p>
    `
    }
}