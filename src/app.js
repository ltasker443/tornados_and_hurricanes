
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
      let rightNowDate = document.querySelector("#current-date");
        rightNowDate.innerHTML = currentlyIs(todayIs);

      function formatTime(timestamp){
      let time= new Date(timestamp);
      let hour= time.getHours();
      let minute=time.getMinutes();
      let newTime= `Last refreshed: ${hour}:${minute}`;
      return newTime;
      }
  
        function currentConditions(response) {
        document.querySelector("#city").innerHTML=response.data.name;

        let temperature = Math.round(response.data.main.temp);
        let cityTemperature=document.querySelector("#current-temp");
        cityTemperature.innerHTML=`${temperature}º`;

        let minimum = Math.round(response.data.main.temp_min);
        let cityMinTemp=document.querySelector("#low-temp");
        cityMinTemp.innerHTML=`${minimum}º`;

        let maximum=Math.round(response.data.main.temp_max);
        let cityMaxTemp=document.querySelector("#hi-temp");
        cityMaxTemp.innerHTML=`${maximum}º`;

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
        console.log(response);

        let refreshTime=document.querySelector("#refresh-time");
        refreshTime.innerHTML=formatTime(response.data.dt * 1000);

        let conditionIcon=document.querySelector("#condition-icon");
        conditionIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);
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

      let form = document.querySelector("#city-search-form");
      form.addEventListener("submit", handleSearch);
      let searchButton = document.querySelector("#search-button");
      searchButton.addEventListener("click", handleSearch);
      
      let locationButton=document.querySelector("#current-location-button");
      locationButton.addEventListener("click", getLocation);

      searchCity("Las Vegas");

      

