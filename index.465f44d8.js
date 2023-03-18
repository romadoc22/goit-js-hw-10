const n=document.querySelector("#search-box"),e=document.querySelector("#countries-list"),t=debounce((()=>{const t=n.value.trim();t?function(n){const e=`https://restcountries.com/v2/name/${n}?fields=name,flags.svg,capital,population,languages`;return axios.get(e).then((n=>n.data))}(t).then((n=>(n=>{if(0!==n.length){if(n.length>10)return Notiflix.Notify.info("Too many matches found. Please enter a more specific name."),void(e.innerHTML="");if(n.length>=2&&n.length<=10){const t=n.map((n=>`\n            <div>\n              <img src="${n.flags.svg}" alt="${n.name.common}" width="50">\n              <span>${n.name.common}</span>\n            </div>\n          `)).join("");e.innerHTML=t}else if(1!==n.length);else{const t=n[0],i=`\n            <div>\n              <img src="${t.flags.svg}" alt="${t.name.common}" width="100">\n              <h2>${t.name.common}</h2>\n              <p>Capital: ${t.capital}</p>\n              <p>Population: ${t.population}</p>\n              <p>Languages: ${Object.values(t.languages).join(", ")}</p>\n            </div>\n          `;e.innerHTML=i}}else e.innerHTML=""})(n))).catch((n=>{n.response&&404===n.response.status?Notiflix.Notify.failure("Oops, there is no country with that name"):Notiflix.Notify.failure("Something went wrong. Please try again later.")})):e.innerHTML=""}),300);n.addEventListener("input",t);
//# sourceMappingURL=index.465f44d8.js.map
