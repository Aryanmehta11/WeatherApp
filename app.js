document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const locationInput = document.getElementById('location');
    const location = locationInput.value;

    if (location.trim() === '') {
        alert("Please enter a location");
        return;
    }

    showLoading(true);

    getWeatherData(location)
        .then(data => {
            displayWeather(data);
            
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again');
        })
        .finally(() => {
            showLoading(false);
        });
});

// Function for getting the weather data 

function getWeatherData(location) {
    const apiKey = "95c7b0901ca54bada1a120500231512";
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    return fetch(apiUrl)
        .then(response => response.json());
}

// Function to display the data
function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    const temperature = data.current.temp_c;
    const description = data.current.condition.text;

    weatherResult.innerHTML =
        `<h2>Weather in ${data.location.name}, ${data.location.country}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>`;
}

// Function to handle the loading 
function showLoading(isLoading) {
    const loadingElement = document.getElementById('loading');
    const formElement = document.getElementById('weatherForm');

    if (isLoading) {
        loadingElement.style.display = 'block';
        formElement.style.display = 'none';
    } else {
        loadingElement.style.display = 'none';
        formElement.style.display = 'block';
    }
}
