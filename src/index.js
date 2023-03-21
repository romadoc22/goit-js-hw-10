import './css/styles.css';

function fetchCountries(name) {
  const url =
    'https://restcountries.com/v3.1/name/ukraine?fields=name,flags,capital,population,languages';
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(country => {
      console.log(country);
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else {
        Notiflix.Notify.failure(
          'Something went wrong. Please try again later.'
        );
      }
    });
}
fetchCountries();

// // const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countriesList = document.querySelector('.countries-list');

const showCountries = country => {
  if (country.length === 0) {
    countriesList.innerHTML = '';
    return;
  }

  if (country.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countryList.innerHTML = '';
    return;
  }

  if (country.length >= 2 && country.length <= 10) {
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

  if (country.length === 1) {
    const country = country[0];
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
};
