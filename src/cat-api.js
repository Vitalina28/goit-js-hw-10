import axios from 'axios';

import { showError } from './index';

const myKey = 'live_Yahs1OKzyrwVNJqGXOpJyXTyXgZobHXijQ1uMy3tNS1LNtTDiuSBrFn13XKlyWyG'
axios.defaults.headers.common["x-api-key"] = myKey;

export function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds')
        .then(response => response.data)
        .catch(error => {
            showError();
            console.log(error)
        });
}

export function fetchCatByBreed(breed_Id) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed_Id}`)
        .then(response => response.data)
        .catch(error => {
            showError();
            console.error(error)
        });
}

