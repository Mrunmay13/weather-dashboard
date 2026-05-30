const apiKey = "6003d8fafd007611eb71441f5fa4749d";


const cities = [
    "Mumbai",
    "Delhi",
    "Pune",
    "Nagpur",
    "Bangalore"
];

async function getWeather(city) {
document.getElementById("loader")
.style.display = "block";
    try {

        const url =
        `https://weather-dashboard-9l40.onrender.com/api/weather?city=${city}`;

        const response =
        await fetch(url);

        const data =
        await response.json();

        const forecastUrl =
        `https://weather-dashboard-9l40.onrender.com/api/forecast?city=${city}`;

        const forecastResponse =
        await fetch(forecastUrl);

        const forecastData =
await forecastResponse.json();

const aqiUrl =
`https://weather-dashboard-9l40.onrender.com/api/aqi?lat=${data.coord.lat}&lon=${data.coord.lon}`;

const aqiResponse =
await fetch(aqiUrl);

const aqiData =
await aqiResponse.json();

displayWeather(data, forecastData, aqiData);
document.getElementById("loader")
.style.display = "none";
    } catch (error) {

        console.log(error);

    }
}


function displayWeather(data, forecastData, aqiData) {

    const weatherContainer =
        document.getElementById("weatherContainer");

    let forecastHTML = "";

    forecastData.list.slice(0, 5).forEach(item => {

        forecastHTML += `

<div class="forecast-card">

    <p>
${new Date(item.dt_txt).toLocaleDateString("en-IN", {
    weekday: "short"
})}
</p>

<p>
${new Date(item.dt_txt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
})}
</p>

    <img
    src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png"
    />

    <h3>${item.main.temp}°C</h3>

    <p>${item.weather[0].main}</p>

</div>
`;
    });

    weatherContainer.innerHTML = `

<div class="dashboard">

    <div class="weather-card">

        <h2>${data.name}</h2>

        <img
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        />

        <h1>${data.main.temp}°C</h1>

        <p>${data.weather[0].main}</p>

        <p>Humidity: ${data.main.humidity}%</p>

        <p>Wind Speed: ${data.wind.speed} m/s</p>

        <p>AQI: ${aqiData.list[0].main.aqi}</p>

    </div>

    <div class="forecast-section">

        ${forecastHTML}

    </div>

    <div class="chart-section">

        <canvas id="weatherChart"></canvas>

    </div>

</div>

`;
    const labels =
    forecastData.list.slice(0, 8).map(
        item => item.dt_txt
    );

    const temperatures =
    forecastData.list.slice(0, 8).map(
        item => item.main.temp
    );

    const ctx =
    document.getElementById("weatherChart");

    new Chart(ctx, {

    type: "bar",

    data: {

        labels: labels,

        datasets: [{

            label: "Temperature °C",

            data: temperatures,

            borderWidth: 2,

            backgroundColor: "rgba(37,99,235,0.6)",

            borderRadius: 10

        }]
    }
});
if(data.coord){

    L.marker([data.coord.lat, data.coord.lon])

    .addTo(map)

    .bindPopup(`
        <b>${data.name}</b><br>
        ${data.main.temp}°C
    `)
    .openPopup();
}
const sunrise =
new Date(data.sys.sunrise * 1000);

const sunset =
new Date(data.sys.sunset * 1000);

document.getElementById("sunriseTime")
.innerHTML =
sunrise.toLocaleTimeString();

document.getElementById("sunsetTime")
.innerHTML =
sunset.toLocaleTimeString();
}

async function getAQI(lat, lon, card) {

    try {

        const aqiUrl =
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const response =
        await fetch(aqiUrl);

        const data =
        await response.json();

        const aqi =
        data.list[0].main.aqi;

        let status = "";

        if(aqi === 1) {

            status = "Good 😊";

        } else if(aqi === 2) {

            status = "Fair 🙂";

        } else if(aqi === 3) {

            status = "Moderate 😐";

        } else if(aqi === 4) {

            status = "Poor 😷";

        } else {

            status = "Very Poor ☠️";
        }

        const aqiElement =
        document.createElement("p");

        aqiElement.innerHTML =
        `🌫️ AQI: ${status}`;

        card.appendChild(aqiElement);

    } catch(error) {

        console.log(error);
    }
}
function loadCities() {

    document.getElementById(
    "weatherContainer").innerHTML = "";

    cities.forEach(city => {

        getWeather(city);
    });
}

function searchWeather() {

    const city =
    document.getElementById(
    "cityInput").value;

    document.getElementById(
    "weatherContainer").innerHTML = "";

    getWeather(city);
}

loadCities();
setInterval(() => {

    loadCities();

}, 600000);
const darkModeBtn =
document.getElementById(
"darkModeBtn");

darkModeBtn.addEventListener(
"click",
() => {

    document.body.classList.toggle(
    "dark-mode");

});
const map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '© OpenStreetMap contributors'
    }
).addTo(map);
L.tileLayer(

'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=6003d8fafd007611eb71441f5fa4749d',


{
    attribution:'Weather Data © OpenWeatherMap',
    opacity:0.5
}

).addTo(map);
function getCurrentLocationWeather(){

    navigator.geolocation.getCurrentPosition(

        async(position)=>{

            const lat = position.coords.latitude;

            const lon = position.coords.longitude;

            const url =
            `https://weather-dashboard-9l40.onrender.com/api/weather-by-coordinates?lat=${lat}&lon=${lon}`;

            const response =
            await fetch(url);

            const data =
            await response.json();

            getWeather(data.name);
        }
    );
   // getCurrentLocationWeather();
   function changeBackground(weather){

    const body = document.body;

    if(weather === "Clear"){

        body.style.background =
        "linear-gradient(135deg,#f6d365,#fda085)";
    }

    else if(weather === "Clouds"){

        body.style.background =
        "linear-gradient(135deg,#757f9a,#d7dde8)";
    }

    else if(weather === "Rain"){

        body.style.background =
        "linear-gradient(135deg,#4b79a1,#283e51)";
    }

    else if(weather === "Thunderstorm"){

        body.style.background =
        "linear-gradient(135deg,#232526,#414345)";
    }

    else if(weather === "Snow"){

        body.style.background =
        "linear-gradient(135deg,#e6dada,#274046)";
    }
} 

}
function changeBackground(weather){

    const body = document.body;

    if(weather === "Clear"){

        body.style.background =
        "linear-gradient(135deg,#f6d365,#fda085)";
    }

    else if(weather === "Clouds"){

        body.style.background =
        "linear-gradient(135deg,#757f9a,#d7dde8)";
    }

    else if(weather === "Rain"){

        body.style.background =
        "linear-gradient(135deg,#4b79a1,#283e51)";
    }

    else if(weather === "Thunderstorm"){

        body.style.background =
        "linear-gradient(135deg,#232526,#414345)";
    }

    else if(weather === "Snow"){

        body.style.background =
        "linear-gradient(135deg,#e6dada,#274046)";
    }
}
async function getCurrentLocationWeather(){

    navigator.geolocation.getCurrentPosition(

        async(position)=>{

            const lat =
            position.coords.latitude;

            const lon =
            position.coords.longitude;

            const response =
            await fetch(

`http://weather-dashboard-9140.onrender.com/api/weather-by-coordinates?lat=${lat}&lon=${lon}`

            );

            const data =
            await response.json();

            getWeather(data.name);
        }
    );
}