import './css/styles.css';

const DEBOUNCE_DELAY = 300;

// import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v2';

export default function fetchCountries(name) {
  const url = `${BASE_URL}/name/${name}?fields=name,flags.svg,capital,population,languages`;
  return axios.get(url).then(response => response.data);
}

const searchBox = document.querySelector('#search-box');
const countriesList = document.querySelector('#countries-list');

const showCountries = countries => {
  if (countries.length === 0) {
    countriesList.innerHTML = '';
    return;
  }

  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countriesList.innerHTML = '';
    return;
  }

  if (countries.length >= 2 && countries.length <= 10) {
    const countriesHtml = countries
      .map(
        country => `
            <div>
              <img src="${country.flags.svg}" alt="${country.name.common}" width="50">
              <span>${country.name.common}</span>
            </div>
          `
      )
      .join('');
    countriesList.innerHTML = countriesHtml;
    return;
  }

  if (countries.length === 1) {
    const country = countries[0];
    const countryHtml = `
            <div>
              <img src="${country.flags.svg}" alt="${
      country.name.common
    }" width="100">
              <h2>${country.name.common}</h2>
              <p>Capital: ${country.capital}</p>
              <p>Population: ${country.population}</p>
              <p>Languages: ${Object.values(country.languages).join(', ')}</p>
            </div>
          `;
    countriesList.innerHTML = countryHtml;
    return;
  }
};

const searchCountries = debounce(() => {
  const name = searchBox.value.trim();
  if (!name) {
    countriesList.innerHTML = '';
    return;
  }

  fetchCountries(name)
    .then(countries => showCountries(countries))
    .catch(error => {
      if (error.response && error.response.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else {
        Notiflix.Notify.failure(
          'Something went wrong. Please try again later.'
        );
      }
    });
}, 300);

searchBox.addEventListener('input', searchCountries);
