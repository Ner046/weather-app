const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


const weatherCard = document.querySelector('[data-weather-card]');
const weatherCountry = document.querySelector('[data-weather-city]');
const weatherTemp = document.querySelector('[data-weather-temp]');
const weatherHumidity = document.querySelector('[data-weather-humidity]');
const weatherPrecipitation = document.querySelector('[data-weather-precipitation]');
const weatherWind = document.querySelector('[data-weather-wind]');
const weatherImg = document.querySelector('[data-weather-img]')


searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const query = searchInput.value;
    if(!query) return;

    const mockData = {
        city:query,
        temp:24,
        conditionIcon: "images/weather-images/sunny.png",
        humidity: "55%",
        precipitation: "10%",
        wind: "8mph"

    }

    weatherCountry.textContent = mockData.city;
    weatherTemp.textContent= mockData.temp;
    weatherHumidity.textContent = mockData.humidity;
    weatherPrecipitation.textContent = mockData.precipitation;
    weatherWind.textContent = mockData.wind;
    weatherImg.src = mockData.conditionIcon;
    weatherCard.classList.remove('hidden')
})