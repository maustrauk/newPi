
let lon = 30.5234;
let lat = 50.4501;
let dim = 0.3;

apiurl = 'https://api.nasa.gov/planetary/earth/imagery?' + 'lon=' + lon + '&lat=' + lat + '&dim=' + dim + '&api_key=' + key;

document.getElementById("earthImg").src=apiurl;
