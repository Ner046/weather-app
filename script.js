

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const errorMessage = document.getElementById('error-message');


const weatherCard = document.querySelector('[data-weather-card]');
const weatherCountry = document.querySelector('[data-weather-city]');
const weatherTemp = document.querySelector('[data-weather-temp]');
const weatherHumidity = document.querySelector('[data-weather-humidity]');
const weatherPrecipitation = document.querySelector('[data-weather-precipitation]');
const weatherWind = document.querySelector('[data-weather-wind]');
const weatherImg = document.querySelector('[data-weather-img]');
const weatherC = document.querySelector('[data-unit-btn=C]');
const weatherF = document.querySelector('[data-unit-btn=F]')



const weatherImages = {
    Clear: "images/weather-images/sunny.png",
    Clouds: "images/weather-images/cloudy.png",
    Rain: "images/weather-images/rainy.png",
    Drizzle: "images/weather-images/rainy.png",
    Thunderstorm: "images/weather-images/thunder.png",
    Snow: "images/weather-images/snowy.png",
    Mist: "images/weather-images/cloudy.png",
    Fog: "images/weather-images/cloudy.png",
    Haze: "images/weather-images/cloudy.png",
    Night: "images/weather-images/moon.png"
};



let celTemp;
let ferTemp;


searchForm.addEventListener('submit', async(e)=>{
    e.preventDefault();


    const query = searchInput.value.trim();
    if(!query) return;
   

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}`;

    const response = await fetch(url);

    if(!response.ok){
        errorMessage.classList.remove('hidden')
        weatherCard.classList.add('hidden');
        return;

    }

    const data = await response.json();
    console.log(data);

    errorMessage.classList.add('hidden');
    
    
    celTemp = Math.round(data.list[0].main.temp-273.15);
    ferTemp = Math.round((celTemp * 1.8) + 32);


    const rainChance = Math.round(data.list[0].pop * 100);

    const mainCondition = data.list[0].weather[0].main;

    weatherImg.src = weatherImages[mainCondition] || "images/weather-images/cloudy.png";

         if(data.list[0].sys.pod === "n" && mainCondition === "Clear"){
            weatherImg.src = weatherImages.Night
         }

    weatherC.classList.add('active');
    weatherF.classList.remove('active');
    weatherC.classList.remove('opacity-50');
    weatherF.classList.add('opacity-50');

    
    weatherCountry.textContent = data.city.name;
    weatherTemp.textContent= `${celTemp}°C`;
    weatherHumidity.textContent = `${data.list[0].main.humidity}%`;
    weatherPrecipitation.textContent = `${rainChance}%`
    weatherWind.textContent = `${data.list[0].wind.speed} m/s`;
    weatherCard.classList.remove('hidden');

    searchInput.value = "";

})

    weatherC.addEventListener('click', (e)=>{

    if (celTemp === undefined) return; 

    weatherC.classList.add('active')
    weatherF.classList.remove('active')

    weatherC.classList.remove('opacity-50')
    weatherF.classList.add('opacity-50')
    weatherTemp.textContent= `${celTemp}°C`;
    })

    weatherF.addEventListener('click', (e)=>{
        
    if (ferTemp === undefined) return;

    weatherF.classList.add('active')
    weatherC.classList.remove('active')

    weatherF.classList.remove('opacity-50')
    weatherC.classList.add('opacity-50')

    weatherTemp.textContent= `${ferTemp}°F`;

    })

