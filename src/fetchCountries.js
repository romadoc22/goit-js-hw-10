export function fetchCountries(name) {
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
