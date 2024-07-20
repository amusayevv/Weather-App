// // Запрет на копирование текста на сайте
// document.ondragstart = noselect;
// document.onselectstart = noselect;
// document.oncontextmenu = noselect;
// function noselect() {return false;}

// ***************************************************
var now = new Date();

function GetInfo (){

    document.querySelector(".pl").style.display = "block";
    document.querySelector(".search__button").style.display = "none";

    function Loading() {
        document.querySelector(".pl").style.display = "none";
        document.querySelector(".search__button").style.display = "block";
    }

    setTimeout(Loading, 3000);

    const searchBar = document.querySelector(".search__bar");
    const temp = document.querySelector(".temp");
    const location = document.querySelector(".loc");
    const wind = document.querySelector(".wind");
    const humidity = document.querySelector(".humidity");
    const type = document.querySelector(".type");
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com',
            'X-RapidAPI-Key': '5dbe6bbc92msh0a232e49805dcacp107644jsnad3ad780c419'
        }
    };
    
    fetch('https://yahoo-weather5.p.rapidapi.com/weather?location='+searchBar.value+'&format=json&u=c', options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            city = response.location.city;
            country = response.location.country;
            location.innerHTML = country + ', ' + city;
            temperature = response.current_observation.condition.temperature;
            temp.innerHTML = temperature + '°C';
            hum = response.current_observation.atmosphere.humidity;
            humidity.innerHTML = 'Humidity: ' + hum + '%';
            windSpeed = response.current_observation.wind.speed;
            wind.innerHTML = 'Wind Speed: ' + windSpeed + 'km/h';
            Weathertype = response.current_observation.condition.text;
            if(Weathertype === "Rain" || Weathertype === "Cloudy" || Weathertype === "Partly Cloudy" || Weathertype === "Breezy" || Weathertype === "Mostly Cloudy" || Weathertype === "Windy" || Weathertype === "Showers"){
                document.body.className = "cloudy";
            }
            if(Weathertype === "Sunny" || Weathertype === "Mostly Sunny" || Weathertype === "Clear"){
                document.body.className = "sunny";
            }
            if(Number(now.getHours()) > 19) {
                document.body.classList.add("night");
            }
            type.innerHTML = Weathertype;
        });
}

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        GetInfo();
    }
});