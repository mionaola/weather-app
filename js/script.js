let link = 'http://api.weatherstack.com/current?access_key=1a73729d0bc678305d7eee184dfa1542';
const container = document.querySelector('.container');
const curveUp = document.querySelector('.curve_up');
const curveDown = document.querySelector('.curve_down');
const forecastArea = document.querySelector('.forecast');
const textFiledsArea = document.querySelector('.text-fields');

const weatherConditions = {
    rainy: [365, 362, 359, 356, 353, 320, 317, 314, 311, 308, 305, 302, 299, 296, 293, 284, 281, 266, 263, 185, 182, 176, 143],
    snowy: [371, 368, 338, 335, 332, 329, 326, 323, 230, 227, 179],
    sunny: [113],
    partlyCloudy: [116],
    cloudy: [122, 119],
    foggy: [260, 248],
    storm: [395, 392, 389, 386],
    thunder: [200],
    hailing: [377, 374, 350],
};

let storage = {
    city: 'Turin',
};

const fetchData = async () => {
    const result = await fetch(`${link}&query=${storage.city}`);
    const data = await result.json();
    console.log(data);

    let {
        location: { name },
    } = data;

    let {
        current: {
            temperature,
            feelslike,
            humidity,
            weather_descriptions: weatherDescriptions,
            is_day: isDay,
            weather_code: weatherCode,
        },
    } = data;

    console.log(weatherCode);

    if (isDay === 'yes') {
        container.classList.add('isDay');
        curveUp.classList.add('isDay');
        curveDown.classList.add('isDay');
        forecastArea.classList.add('isDay');
        textFiledsArea.classList.add('isDay');
    } else {
        container.classList.remove('isDay');
        curveUp.classList.remove('isDay');
        curveDown.classList.remove('isDay');
        forecastArea.classList.remove('isDay');
        textFiledsArea.classList.remove('isDay');
    }


    let img = document.querySelector('img');

    function findByCode(code) {
        return Object.keys(weatherConditions).find((key) => {
            return weatherConditions[key].includes(code);
        })
    }

    switch (findByCode(weatherCode)) {
        case 'rainy':
            img.src = './img/rain.png';
            break;
        case 'snowy':
            img.src = './img/snow.png';
            break;
        case 'sunny':
            img.src = './img/sun.png';
            break;
        case 'partlyCloudy':
            img.src = './img/partly-cloudy.png';
            break;
        case 'cloudy':
            img.src = './img/clouds.png';
            break;
        case 'foggy':
            img.src = './img/fog.png';
            break;
        case 'storm':
            img.src = './img/storm.png';
            break;
        case 'thunder':
            img.src = './img/thunder.png';
            break;
        case 'hailing':
            img.src = './img/hail.png';
            break;
        default:
            img.src = './img/weather-news.png'
            break;
    }

    document.querySelector('.city-name').append(name);
    document.querySelector('.temperature').append(`${temperature}°`);
    document.querySelector('.feels-like').append(`Feels like: ${feelslike}°`);
    document.querySelector('.humidity').append(`Humidity: ${humidity}%`);
    document.querySelector('.description').append(weatherDescriptions);

}

fetchData();
