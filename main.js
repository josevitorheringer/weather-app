const apiKey = "58GXGmNAqmcUAVgnRgFJC0FG3LqpbumY";
function api(input) {
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${input}`
  )
    .then((responseStream) => {
      return responseStream.json();
    })
    .then((data) => {
      init(data);
    });
}
function getCurrentWeather(city) {
  var key = city.getAttribute("data-key");
  fetch(
    `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apiKey}&language=en-us`
  )
    .then((responseStream) => {
      return responseStream.json();
    })
    .then((data) => {
      buildCurrentWeather(data);
    });
}

function buildCurrentWeather(data) {
  console.log(data);
  clearSearchResults();
}

function buildSearchResults(data) {
  const results = document.getElementById("searchResults");
  const p = document.createElement("p");
  p.textContent =
    data.LocalizedName +
    " - " +
    data.AdministrativeArea.ID +
    ", " +
    data.Country.LocalizedName;
  results.appendChild(p);
  p.setAttribute("data-key", data.Key);
  p.setAttribute("onclick", "getCurrentWeather(this)");
}

function clearSearchResults() {
  const results = document.getElementById("searchResults");
  results.innerHTML = "";
}

function init(data) {
  clearSearchResults();
  for (conteudo of data) {
    console.log(conteudo);
    buildSearchResults(conteudo);
  }
}

function search() {
  let input = document.getElementById("pesquisa").value;
  api(input);
}
