

  document.getElementById('button3').addEventListener('click', loadREST);

  //print the responds

  function loadREST(){
      fetch('https://restcountries.com/v2/lang/es')
      .then(function(response){
        return response.json();
      })
      .then(function(images){
          let html = '';

          images.forEach(function(image){
              html += `
              <li>
                <a href="${image.png}"></a>
                ${image.png}
              </li>
              `;
          });
          document.getElementById('result').innerHTML = html;
      })
     .catch(function(error){
         console.log(error);
     })
  }

  //view countries

const countriesList = document.getElementById("countries");
let countries;

//countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}

fetch("https://restcountries.com/v2/lang/es")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:", err));

function initialize(countriesData) {
  countries = countriesData;
  let options = "";
  countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);
  
  countriesList.innerHTML = options;

  countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

function displayCountryInfo(countryByAlpha3Code) {
  const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
  document.querySelector("#flag-container img").src = countryData.flag;
  document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`;  
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US");
  document.getElementById("currencies").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ");
  document.getElementById("region").innerHTML = countryData.region;
  document.getElementById("subregion").innerHTML = countryData.subregion;
}