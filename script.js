document.addEventListener("DOMContentLoaded", function() {
    // Check if geolocation is supported
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  
    function getWeather(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = '8339b0ac6260c146c5f3affc89ea5392';
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
      fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          displayWeather(data);
        })
        .catch(error => {
          console.error('Error fetching the weather data:', error);
        });
    }
  
    function displayWeather(data) {
      const weatherDiv = document.getElementById('weather');
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  
      weatherDiv.innerHTML = `
        <h3>Current Weather</h3>
        <img src="${icon}" alt="${description}">
        <p>${description}</p>
        <p>${temp}°C</p>
      `;
    }
  });
  