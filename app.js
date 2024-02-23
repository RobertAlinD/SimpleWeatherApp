const Container = document.querySelector(".container");
const weatherDescription = document.querySelector(".weather-description");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#searchBtn");
const cityName = document.querySelector(".city");
const tempDegree = document.querySelector(".temp");

const weatherCondition = {
    clear: {
        description: "Clear",
        image: "url('./Images/sun.jpeg')",
    },
    cloud: {
        description: "Clouds",
        image: "url('./Images/cloud.jpg')",
    },
    rain: {
        description: "Rain",
        image: "url('./Images/rain.jpeg')",
    },
    wind: {
        description: "Wind",
        image: "url('./Images/cloud.jpg')",
    },
    snow: {
        description: "Snow",
        image: "url('./Images/winter.jpg')",
    },
};
const updateBackground = (image) => {
    Container.style.backgroundImage = image;
};
const updateText = (description, city, country, temp) => {
    weatherDescription.textContent = description;
    cityName.textContent = `${city} ${country}`;
    tempDegree.textContent = `${temp}° Celsius`;
};
const updateUI = (description, city, country, temp) => {
    updateText(description, city, country, temp);
    switch (description) {
        case weatherCondition.clear.description:
            updateBackground(weatherCondition.clear.image);
            break;
        case weatherCondition.cloud.description:
            updateBackground(weatherCondition.cloud.image);
            break;
        case weatherCondition.rain.description:
            updateBackground(weatherCondition.rain.image);
            break;
        case weatherCondition.wind.description:
            updateBackground(weatherCondition.wind.image);
            break;
        case weatherCondition.snow.description:
            updateBackground(weatherCondition.snow.image);
            break;
        default:
            updateBackground(weatherCondition.clear.image);
    }
};
const fetchCityGeoLocation = async () => {
    // console.log(searchInput.value);

    try {
        const geoCall = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=5&lang=ro&appid=a134a8f626865e58a99d5cfde0a46b9d
        `);
        const geoResponse = await geoCall.json();
        console.log("geoResponse", geoResponse);



        const latitude = geoResponse[0].lat;
        const longitude = geoResponse[0].lon;

        try {
            const weatherCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=a134a8f626865e58a99d5cfde0a46b9d
            `)
            const weatherResponse = await weatherCall.json();
            console.log(weatherResponse);

            const returnDescription = weatherResponse.weather[0].main;
            const returnName = geoResponse[0].name;
            const returnCountry = geoResponse[0].country;
            const returnTemp = Math.round(weatherResponse.main.temp);


            updateUI(returnDescription, returnName, returnCountry, returnTemp,);
            searchInput.value = "";




        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error);
    }
}
searchButton.addEventListener('click', () => { fetchCityGeoLocation(); });















