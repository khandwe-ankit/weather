let weather = {
    apiKey: "4e56806bd4b51584795fd53fe637d79d",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { cod } = data;
        if (cod >= 400 && cod <= 600) {
            const { message } = data;
            if (message === "Nothing to geocode")
                window.alert("Please enter a city");
            else if (message === "city not found")
                window.alert("City not found, Please check the spelling or try a different city")
            else
                window.alert(message);
        }
        else {
            const { name } = data;
            const { country } = data.sys;
            const { icon, description } = data.weather[0];
            const { temp, temp_min, temp_max, feels_like, humidity } = data.main;
            const { speed } = data.wind;

            //console.log(cod,name,icon,description,speed,temp,temp_min, temp_max);
            document.querySelector(".place").innerText = "Weather in " + name + ", " + country;
            document.querySelector(".temp").innerText = temp + "°C";
            document.querySelector(".feels-like").innerText = "Feels like " + feels_like + "°C";
            if (temp_min !== temp_max) {
                document.querySelector(".min-max-temp").innerText = "Min-Max " + temp_min + "-" + temp_max + "°C";
            }
            else {
                document.querySelector(".min-max-temp").style.display = "none";
            }

            document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".desc").innerText = description;
            document.querySelector(".humidity").innerText = "Humidity: " + humidity + " %";
            document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1930x1080/?" + name + "')"
        }
    },
    searchWeather: function () {
        const city = document.querySelector(".city").value.trim();
        if (city !== "") {
            this.fetchWeather(city);
        }
        else {
            document.querySelector(".city").value = "";
            window.alert("Please enter a city");
        }
    }
};

document.getElementById('submit').addEventListener("click", function (event) {
    weather.searchWeather();
})

document.querySelector('#city').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        weather.searchWeather();
    }
});

document.querySelector('#current-year').innerHTML = new Date().getFullYear();

weather.fetchWeather("London");

 //$("#favicon").attr("href","https://openweathermap.org/img/wn/" + icon + ".png");
