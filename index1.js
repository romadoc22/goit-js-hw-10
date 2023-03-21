fetch(
  'https://restcountries.com/v3.1/name/ukraine?fields=name,flags,capital,population,languages'
)
  .then(response => {
    return response.json();
  })
  .then(country => {
    console.log(country);
    const markUp = countryCard(country);
  });
