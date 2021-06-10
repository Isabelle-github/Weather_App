fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=601652d163a5d44814bc01470bcbb223')
    .then(response => response.json())
    .then(json => console.log(json))

const myAPI = {
    key: "601652d163a5d44814bc01470bcbb223",
    urlBasic: 'https://api.openweathermap.org/data/2.5/'
}

const searchField = document.querySelector('input');
searchField.addEventListener('keypress', (e) => {
    console.log(searchField.value);

    if (e.key == 'Enter') {
        console.log('fnz');
        checkWeather(searchField.value);
    }
    // if (e.key == 14) {
    //     checkWeather(searchField.value);
    // }
});

function checkWeather(town) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${town}&APPID=${myAPI.key}&units=metric`)
        //translate weather into JSon syntax
        .then(myWeather => { return myWeather.json() })
        //.then(waetherr => console.log(waetherr))
        // display the json_Weather on the html page
        .then(showMyWeather);
}

// the weather argument here is the actual weather object taken fron the API
function showMyWeather(weather) {
    //display the city that user typed in searchfield
    console.log(weather);
    let town = document.querySelector('.location .city');
    town.innerHTML = `${weather.name}, ${weather.sys.country}`;

    // display the complete date 
    let currentTime = new Date();
    let dateElement = document.querySelector('.date');
    dateElement.innerHTML = buildDate(currentTime);

    // display the temperature in celcius
    let temperature = document.querySelector(".temp");
    temperature.innerHTML = `${weather.main.temp} °C`;

    // display the description
    let describe = document.querySelector(".weather");
    describe.innerHTML = `${weather.weather[0].description}`;

    // Change the background image according to weather description
    let body = document.querySelector('body');
    if (describe.innerText.includes('cloud')) {
        console.log("cloudyyy")
        body.style.background = `url('assets/img/cloudy-storm.jpg') no-repeat center/cover`;
    } else if (describe.innerText.includes('rain')) {
        console.log("rainyyy")
        body.style.background = `url('assets/img/rain.jpg') no-repeat center/cover`;
    } else if (describe.innerText.includes('snow')) {
        console.log("snowyyy")
        body.style.background = `url('assets/img/snowy.jpg') no-repeat center/cover`;
    } else if (describe.innerText.includes('sun')) {
        console.log("sunyyy")
        body.style.background = `url('assets/img/sunny.jpg') no-repeat center/cover`;
    } else if (describe.innerText.includes('storm')) {
        console.log("stormyy")
        body.style.background = `url('assets/img/thunderbolt_lights.png') no-repeat center/cover`;
    } else if (describe.innerText.includes('clear')) {
        console.log("cleary sky")
        body.style.background = `url('assets/img/clear.jpg') no-repeat center/cover`;
    }
    // Display highest and Lowest Temperature
    let minMax = document.querySelector(".hi-low");
    minMax.innerHTML = `${weather.main.temp_min} °C / ${weather.main.temp_max} °C`;
}

function buildDate(timeNow) {

    let myMonths = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'];
    let myDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'];

    let resDay = myDays[timeNow.getDay()]
    let resMonth = myMonths[timeNow.getMonth()]
    let resDate = timeNow.getDate();
    let resYear = timeNow.getFullYear();


    // setInterval(() => {
    //     console.log(timeNow.toLocaleTimeString())
    // }, 1000)

    // return `${resDay} ${resDate} ${resMonth} ${resYear}`;
    // return `${resDay} ${resDate} ${resMonth} ${resYear}, ${timeNow}`; // last variable displays whole date and time again
    return `${resDay} ${resDate} ${resMonth} ${resYear}, ${timeNow.toLocaleTimeString()}`; // last variable displays time, but the time is not updating itself
}


//TO DO: When die eingegebene Stadt nicht gefunden wurde, display "City not Found"
// HOW TO show ont time with updating seconds