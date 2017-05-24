$(document).ready(()=> {

    const weatherApi = 'http://api.openweathermap.org/data/2.5/weather';
    const forecastApi = 'http://api.openweathermap.org/data/2.5/forecast';

$('#weather-form').submit((event)=> {
    event.preventDefault();
    console.log("User submitted the form");
    let zipcode = $('#zip-code').val();
    console.log(zipcode);
    let weatherUrl = weatherApi + '?zip=' + zipcode + '&units=imperial&appid=' + apiKey;
    let forecastUrl = forecastApi + '?zip=' + zipcode + '&units=imperial&appid=' + apiKey;
    console.log(weatherUrl);
    $.getJSON(weatherUrl, (weatherData)=> {
        console.log(weatherData)
        let currTemp = weatherData.main.temp;
        let icon = weatherData.weather[0].icon + '.png';
        console.log(icon);
        let name = weatherData.name;
        let conditions = weatherData.weather[0].description;
        
        let newHTML = '<div>The temp in ' + name + ' is currently ' + currTemp + '&deg;</div>'
        let iconHTML = '<img src="http://openweathermap.org/img/w/' + icon+'">'
        let conditionsHTML = 'Current Conditions: ' + iconHTML;
        
        console.log(iconHTML);
        $('#temp-info').html(newHTML);

        
        currentPercent = 0;
        animateCircle(0,currentPercent);
        animateCircle(0, currTemp);
        
        $('#conditions').html(conditionsHTML);
        
    })

    $.getJSON(forecastUrl, (forecastData)=> {
        console.log(forecastData)
        // let forecastIconsList = forecastData.list.weather.icon
        var items = $();
        var i = 3;
        for (let i = 3; i < 36; i+=8){
            let icon = forecastData.list[i].weather[0].icon + '.png';
            let iconHTML = '<img src="http://openweathermap.org/img/w/'+ icon + '">'
            let tempHi = forecastData.list[i].main.temp_max;
            let tempLo = forecastData.list[i].main.temp_min;
            
            items = items.add('<div class="item2 forecast-item">'+iconHTML+ tempLo + ' / ' + tempHi+ '</div>')
        }
        $('.forecast-box').append(items);
        

    })

});

    let canvas = $('#weather-canvas');
    let context = canvas[0].getContext('2d');

    let assumedTemp = 65;
    let currentPercent = 0;

    function animateCircle(currentArc,currentTemp) {
        // inner circle
        context.fillStyle = "#ccc";
        context.beginPath();
        context.arc(155,80,70,Math.PI*0,Math.PI*2);
        context.fill();

        // outer line
        // create gradient


        context.lineWidth = 5;
        // context.strokeStyle = gradient1;
        context.beginPath();
        context.arc(155,80,75,Math.PI*1.5,(Math.PI*2* currentArc)+ Math.PI*1.5);
        context.stroke();
        // context.font = "48px Myriad Pro";
        // context.fillStyle = "Blue";
        // // context.textBaseline = "top";
        // context.fillText(currentTemp.toString(), 155, 75);
        // update the current percentage
        // context.fillText(Math.floor(currentTemp) + String.fromCharCode,176,70);
        currentPercent++;
        if (currentPercent < currentTemp) {
            requestAnimationFrame(()=> {
                animateCircle(currentPercent/100, currentTemp);
            })
        }
        if (currentTemp < 40) {
            context.strokeStyle = '#0000ff';
        } else if ( currentTemp < 60) {
            context.strokeStyle = '#008000';
        } else if (currentTemp < 80 ) {
            context.strokeStyle = '#ffff00';
        }else if (currentTemp < 100) {
            context.strokeStyle = '#ff0000';
        }
    }
    animateCircle();


});

