const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');
const background = document.querySelector('body');

search.addEventListener('click', () => {

    const APIKey = '2cd8291b47538ebfc97f0064b44dc2a8';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    background.style.background = '#ffb429'
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    background.style.background = '#353640'
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    background.style.background = '#eaeaea'
                    container.style.border = '0px black solid';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    background.style.background = '#4e7995'
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    background.style.background = '#d3d3d3'
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
});