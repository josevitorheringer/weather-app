//----------------------API CONTENT----------------------//

const apiKey = "58GXGmNAqmcUAVgnRgFJC0FG3LqpbumY";

function apiLocationAutocomplete(input) {
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${input}`
  )
    .then((responseStream) => {
      return responseStream.json();
    })
    .then((data) => {
      if (data.length > 0) init(data);
      else {
        throw new Error("Cidade não encontrada");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function apiLocationKey(key) {
  let response = await fetch(
    `http://dataservice.accuweather.com/locations/v1/${key}?apikey=${apiKey}`
  );
  return await response.json();
}

function getCurrentWeather(event) {
  var key = event.target.getAttribute("data-key");
  fetch(
    `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apiKey}&language=en-us`
  )
    .then((responseStream) => {
      return responseStream.json();
    })
    .then((data) => {
      buildCurrentWeather(data[0], key);
    })
    .catch((err) => {
      console.log(err);
    });
}
//----------------------BUILD PAGE----------------------//
function clearSearchResults() {
  const results = document.getElementById("searchResults");
  results.innerHTML = "";
}

function buildCurrentWeather(data, key) {
  clearSearchResults();
  apiLocationKey(key).then((city) => {
    console.log(city);
    const results = document.getElementById("searchResults");
    const p = document.createElement("p");
    p.textContent = `Está fazendo ${data.Temperature.Metric.Value}\u00B0${data.Temperature.Metric.Unit} em ${city.LocalizedName}`;
    console.log(data);
    results.appendChild(p);
  });
}

function buildSearchResults(data) {
  const results = document.getElementById("searchResults");
  const p = document.createElement("p");
  p.textContent = `${data.LocalizedName} - ${data.AdministrativeArea.ID}, ${data.Country.LocalizedName}`;
  results.appendChild(p);
  p.setAttribute("data-key", data.Key);
  p.addEventListener("click", getCurrentWeather);
}

//----------------------CONTROL----------------------//

function init(data) {
  clearSearchResults();
  for (conteudo of data) {
    console.log(conteudo);
    buildSearchResults(conteudo);
  }
}

function searchCity() {
  let input = document.getElementById("searchForm").value;
  apiLocationAutocomplete(input);
}
