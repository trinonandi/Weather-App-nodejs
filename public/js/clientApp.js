console.log("hello client js is up");



const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const tempDisplay = document.querySelector
('#tempDisplay');
const locationDisplay = document.querySelector('#location');
const forecastList = document.getElementById('list');
const descriptionView = document.getElementById("description");

locationDisplay.textContent = 'Enter a location and search to get the current weather forecast';



weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault(); //used to prevent the form to restart after each submission
    
    // intialized to flush the previous results from the screen
    tempDisplay.textContent = 'Loading...';
    locationDisplay.textContent ='';
    forecastList.textContent='';
    descriptionView.textContent='';

    fetch(`/weather?address=${searchInput.value}`).then((response) => {
        return response.json();
     })
     .then((data) =>{
         if(data.error){ 
            locationDisplay.textContent = error;
        }
        else{
            const location = data.location;
            const temp = data.forecast.temp;
            const realFeel = data.forecast.feels_like;
            const humidity = data.forecast.humidity;
            const description = data.forecast.weather[0].description;
            
           
    
            locationDisplay.textContent = location;
            tempDisplay.textContent = temp+' °C';
            descriptionView.textContent = description;
    
            let entry = document.createElement('li');
            entry.appendChild(document.createTextNode(`Humidity : ${humidity}`));
            forecastList.appendChild(entry);
    
            entry = document.createElement('li');
            entry.appendChild(document.createTextNode(`Real Feel : ${realFeel} °C `));
            forecastList.appendChild(entry);
    
            entry = document.createElement('li');
            entry.appendChild(document.createTextNode(`UV Index : ${data.forecast.uvi}`));
            forecastList.appendChild(entry);  
            
            entry = document.createElement('li');
            entry.appendChild(document.createTextNode(`Visibility : ${data.forecast.visibility} meters`));
            forecastList.appendChild(entry);  
        }
     })
     .catch((error) => {
        tempDisplay.textContent = '';
        locationDisplay.textContent = 'Invalid loaction entered';
     });
});