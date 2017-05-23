$(document).ready(()=> {

$('#weather-form').submit((event)=> {
    event.preventDefault();
    console.log("User submitted the form");
    let zipcode = $('#zip-code').val();
    console.log(zipcode);
});

    let canvas = $('#weather-canvas');
    let context = canvas[0].getContext('2d');

    let assumedTemp = 65;
    let currentPercent = 0;

    function animateCircle(currentArc) {
        // inner circle
        context.fillStyle = "#ccc";
        context.beginPath();
        context.arc(155,75,70,Math.PI*0,Math.PI*2);
        context.fill();

        // outer line
        context.lineWidth = 5;
        context.strokeColor = '#ff0';
        context.beginPath();
        context.arc(155,75,75,Math.PI*1.5,(Math.PI*2* currentArc)+ Math.PI*1.5);
        context.stroke();
        // update the current percentage
        currentPercent++;
        if (currentPercent < assumedTemp) {
            requestAnimationFrame(()=> {
                animateCircle(currentPercent/100);
            })
        }
    }
    animateCircle();


});

