import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix/build/notiflix-notify-aio';

function fetchCountries(name) {
  const START_URL = 'https://restcountries.com/v3.1/name';
  const FILTER_OPTION = '?fields=name,capital,population,flags,languages';
  const url = `${START_URL}/${name}${FILTER_OPTION}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

const searchBox = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');

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
              <img src="${country.flags.svg}" alt="${country.name.official}" width="50">
              <span>${country.name.official}</span>
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
      country.name.official
    }" width="100">
              <h2>${country.name.official}</h2>
              <p>Capital: ${country.capital}</p>
              <p>Population: ${country.population}</p>
              <p>Languages: ${Object.values(country.languages).join(', ')}</p>
            </div>
          `;
    countriesList.innerHTML = countryHtml;
    return;
  }
};

const searchCountries = () => {
  const name = searchBox.value.trim();
  if (!name) {
    countriesList.innerHTML = '';
    return;
  }

  fetchCountries(name)
    .then(countries => {
      showCountries(countries);
    })
    .catch(error => {
      countriesList.innerHTML = '';
      if (error == 'Error: 404') {
        Notiflix.Notify.failure(`Oops, there is no country with that name`);
      } else {
        Notiflix.Notify.failure(
          `Something went wrong. Please try again later.`
        );
      }
    });
};

searchBox.addEventListener('input', debounce(searchCountries), 500);
