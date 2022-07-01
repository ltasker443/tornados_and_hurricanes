
let todayIs = new Date();
function currentlyIs(date) {
        let weekdays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        let dayToday = weekdays[todayIs.getDay()];
        let month = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        let thisMonth = month[todayIs.getMonth()];
        let currentDate = todayIs.getDate();
        let newDate = `${dayToday} ${thisMonth} ${currentDate}`;
        return newDate;
      }

      function formatTime(timestamp){
      let time= new Date(timestamp);
      let hour= time.getHours(); 
      if (hour < 10) {
        hour = `0${hour}`;
      }
      let minute=time.getMinutes();
      if (minute <10) {
        minute = `0${minute}`;
      }
      let newTime= `Last refreshed: ${hour}:${minute}`;
      return newTime;
      }

      function getForecast(coordinates){
        console.log(coordinates);
        let apiKey = "294c897fc47f4b73d1c81e6766aacc85";
        let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
        console.log(apiUrl);
        axios.get(apiUrl).then(displayForecast);
      }

  
        function currentConditions(response) {
        document.querySelector("#city").innerHTML=response.data.name;

        let temperature = Math.round(response.data.main.temp);
        let cityTemperature=document.querySelector("#current-temp");
        cityTemperature.innerHTML=`${temperature}`;

        let minimum = Math.round(response.data.main.temp_min);
        let cityMinTemp=document.querySelector("#low-temp");
        cityMinTemp.innerHTML=`Night ${minimum}º`;

        let maximum=Math.round(response.data.main.temp_max);
        let cityMaxTemp=document.querySelector("#hi-temp");
        cityMaxTemp.innerHTML=`Day ${maximum}º`;

        let feelsLike = Math.round(response.data.main.feels_like);
        let cityFeelsLike=document.querySelector("#feels-like");
        cityFeelsLike.innerHTML=`Feels Like: ${feelsLike}º`;

        let humidity = (response.data.main.humidity);
        let cityHumidity=document.querySelector("#humidity");
        cityHumidity.innerHTML=`Humidity: ${humidity}%`;
     
        let wind = Math.round(response.data.wind.speed);
        let cityWind=document.querySelector("#wind");
        cityWind.innerHTML=`Wind Speed: ${wind}mph`;
      
        let condition = (response.data.weather[0].main);
        let cityCondition=document.querySelector("#condition-description");
        cityCondition.innerHTML=`${condition}`;

        let refreshTime=document.querySelector("#refresh-time");
        refreshTime.innerHTML=formatTime(response.data.dt * 1000);

        let conditionIcon=document.querySelector("#condition-icon");
        conditionIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);

        fahrenheitTemperature=response.data.main.temp;

        getForecast(response.data.coord);
      }

        

      function searchCity(city) {
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=294c897fc47f4b73d1c81e6766aacc85&units=imperial`;
        axios.get(`${apiUrl}`).then(currentConditions);
      }

      function handleSearch(event) {
        event.preventDefault();
        let city = document.querySelector("#city-search-input").value;
        searchCity(city);
      }

      function searchLocation(position) {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=294c897fc47f4b73d1c81e6766aacc85&units=imperial`;
          axios.get(`${apiUrl}`).then(currentConditions);
        }

      function getLocation(event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(searchLocation);
      }
      
      function displayCelcius(event){
        event.preventDefault();
        let temperature = document.querySelector("#current-temp");
        fahrenheitLink.classList.remove("active");
        celciusLink.classList.add("active");
        let celciusTemperature = (((fahrenheitTemperature - 32) * 5) /9);
        temperature.innerHTML=Math.round(celciusTemperature);
      }

      function displayFahrenheit(event) {
      event.preventDefault();  
      celciusLink.classList.remove("active");
      fahrenheitLink.classList.add("active");
      let temperature = document.querySelector("#current-temp");
      temperature.innerHTML = Math.round(fahrenheitTemperature);
      }
      
      function changeBackground() {
        let time = new Date();
        let hours = time.getHours();
        if (hours >= 5 && hours < 20) {
          document.body.style.backgroundColor = "#5dacbd";
        }
        }

        function displayForecast(response) {
          console.log(response.data)
          let dailyForecast = response.data.daily;
          let forecast = document.querySelector("#forecast");
          
          let forecastHTML = `<div class="row">`;
          dailyForecast.forEach(function (forecastDay) {
            forecastHTML = forecastHTML + 
           `<div class="col-2">
           <div class = "forecast"> 14
            <div>${forecastDay.dt}</div>
            <i class="fa-solid fa-cloud-sun"></i>
            <div class="low-high">
            </div>
            <span id="#min">${forecastDay.temp.min}</span> <span id="max"> ${forecastDay.temp.max} </span>
            </div>
            </span>
        </div>`;
         });
           forecastHTML=forecastHTML + `</div>`;
           forecast.innerHTML = forecastHTML;

        }

      let fahrenheitTemperature = null;

      let form = document.querySelector("#city-search-form");
      form.addEventListener("submit", handleSearch);
      let searchButton = document.querySelector("#search-button");
      searchButton.addEventListener("click", handleSearch);
      
      let locationButton=document.querySelector("#current-location-button");
      locationButton.addEventListener("click", getLocation);

      let rightNowDate = document.querySelector("#current-date");
      rightNowDate.innerHTML = currentlyIs(todayIs);

      let celciusLink=document.querySelector("#celcius");
      celciusLink.addEventListener("click", displayCelcius);

      let fahrenheitLink=document.querySelector("#fahrenheit");
      fahrenheitLink.addEventListener("click", displayFahrenheit);

      searchCity("Las Vegas");
      changeBackground();
      

      

      

