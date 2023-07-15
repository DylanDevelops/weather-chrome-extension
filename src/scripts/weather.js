const apiKey = "d2359fb27eea3148a626bc7a884993a1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

document.addEventListener("DOMContentLoaded", async function() {
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");
    let measurementUnit;

    //sets the focus on the search input element
    searchBox.focus();

    async function CheckWeather(city) {
        if (searchBox.value != "") {
            //grab measurement unit from chrome storage
            chrome.storage.sync.get(
                { tempUnit: 'Imperial' },
                async (storedItems) => {
                    measurementUnit = storedItems.tempUnit;

                    const response = await fetch(apiUrl + `units=${measurementUnit}` + `&q=${city}` + `&appid=${apiKey}`);

                    if (response.status == 404) {
                        document.querySelector(".error").style.display = "block";
                        document.querySelector(".weather").style.display = "none"; 
                        setTimeout(() => {
                            document.querySelector(".error").style.display = "none";
                        }, 750);
                    } else {
                        var data = await response.json();
        
                        console.log(data);
        
                        let tempDegreeUnit;
                        let windSpeedUnit;
        
                        switch(measurementUnit)
                        {
                            case "Imperial":
                                tempDegreeUnit = "°F";
                                windSpeedUnit = " mph"
                                break;
        
                            case "Metric":
                                tempDegreeUnit = "°C";
                                windSpeedUnit = " km/h"
                                break;
                        }
        
                        document.querySelector(".city").innerHTML = data.name;
                        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + tempDegreeUnit;
                        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                        document.querySelector(".wind").innerHTML = data.wind.speed + windSpeedUnit;
        
                        switch (data.weather[0].main) {
                        case "Clouds":
                            weatherIcon.src = "/src/images/weather/clouds.png";
                            break;
                        case "Clear":
                            weatherIcon.src = "/src/images/weather/clear.png";
                            break;
                        case "Rain":
                            weatherIcon.src = "/src/images/weather/rain.png";
                            break;
                        case "Thunderstorm":
                            weatherIcon.src = "/src/images/weather/thunderstorm.png";
                            break;
                        case "Drizzle":
                            weatherIcon.src = "/src/images/weather/drizzle.png";
                            break;
                        case "Mist":
                            weatherIcon.src = "/src/images/weather/mist.png";
                            break;
                        case "Snow":
                            weatherIcon.src = "/src/images/weather/snow.png";
                            break;
                        }
        
                        document.querySelector(".weather").style.display = "block";
                        document.querySelector(".error").style.display = "none";
        
                        searchBox.value = "";
                    }
                }
            );
        }
    }

    searchBtn.addEventListener("click", (event) => {
        CheckWeather(searchBox.value);
    });

    searchBox.addEventListener("keydown", (event) => {
        if (event.keyCode == 13) {
            CheckWeather(searchBox.value);
        }
    });
});
