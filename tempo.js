//cole aqui sua chave da API https://www.weatherapi.com/
const apiKey = "ae17e3a672a643549e8233852231004";

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const localTime = document.getElementById("localtime")
const submitButton = document.getElementById("submit-button");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherIcon = document.getElementById("weather-icon");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();

  // Define a URL de requisição para a API do WeatherAPI
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=pt`;
  
  // Faz uma requisição para a API do WeatherAPI
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Atualiza as informações na página
      console.log(data)
      console.log(data.current.condition["text"])
      cityName.innerText = data.location.name + ", " + data.location.region + " - " + data.location.country;
      localTime.innerText = `Data/Hora: ${data.location.localtime}`;
      temperature.innerText = `Temperatura: ${data.current.temp_c}°C`;
      description.innerText = `Descrição: ${data.current.condition["text"]}`;
      humidity.innerText = `Umidade: ${data.current.humidity}%`;
      windSpeed.innerText = `Velocidade do Vento: ${data.current.wind_kph}km/h`;
      weatherIcon.className = `fas ${getWeatherIcon(data.current.condition.code)}`;
      weatherInfo.style.display = "block";
    })

    .catch((error) => {
      console.log(error);
      cityName.innerText = "Não foi possível encontrar a cidade.";
      temperature.innerText = "";
      description.innerText = "";
      humidity.innerText = "";
      windSpeed.innerText = "";
      weatherIcon.className = "";
      weatherInfo.style.display = "none";
    });
});

// retorna as condições do clima fornecidos pela API
function getWeatherIcon(conditionCode) {
  switch (conditionCode) {
    case 1000:
      return "fa-sun";
    case 1003:
      return "fa-cloud-sun";
    case 1006:
    case 1009:
      return "fa-cloud";
    case 1030:
    case 1135:
    case 1147:
      return "fa-smog";
    case 1063:
    case 1180:
    case 1183:
    case 1186:
    case 1189:
    case 1192:
    case 1195:
    case 1198:
    case 1201:
    case 1204:
    case 1240:
    case 1243:
      return "fa-cloud-showers-heavy";
    case 1066:
    case 1210:
    case 1213:
    case 1216:
    case 1219:
    case 1222:
    case 1225:
    case 1237:
      return "fa-snowflake";
    case 1072:
    case 1150:
    case 1153:
    case 1168:
    case 1171:
    case 1198:
    case 1249:
    case 1252:
    case 1255:
    case 1258:
    case 1261:
      return "fa-bolt";
    default:
      return "fa-question";
  }
}

//Ação para o botão de Reset
const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", function() {
  cityName.innerText = "";
  temperature.innerText = "";
  description.innerText = "";
  humidity.innerText = "";
  windSpeed.innerText = "";
  weatherIcon.className = "";
  weatherInfo.style.display = "none";
  cityInput.value = "";
});
