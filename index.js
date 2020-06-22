//Var's
let i;
let Httpreq;

let key = 'mtntDQvEooZap8WyRgBJrc2nx2wfisjitlLolpyk';

let now;
let randDate;
let testDate;
let apiurl;
let json_obj;

let sol;
let camera;
let rover;

let lon;
let lat;
let dim;
let earth_date;

//Image Slider

now = new Date();

function Get(yourUrl){
    Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    console.log("function 'Get' used");
    return Httpreq.responseText;
}



for (i=0; i<3; i++) {
  randDate = Math.floor(Math.random() * 31536000000) + 518400000;
  testDate = new Date(now.getTime()-randDate);
  apiurl = 'https://api.nasa.gov/planetary/apod?' + 'api_key=' + key + '&date=' + testDate.getFullYear() + '-' + (testDate.getMonth() + 1) + '-' + testDate.getDate();
  json_obj = JSON.parse(Get(apiurl),0);
  if (json_obj.media_type==="image") {
    document.getElementById('carouselImg'+i).src=json_obj.hdurl;
    document.getElementById('carouselButton'+i).textContent='"' + json_obj.title + '"';
    document.getElementById('imgTitle'+i).textContent=json_obj.title;
    document.getElementById('imgText'+i).textContent=json_obj.explanation;
  } else {
    i--;
  }
}


//Epic

apiurl = 'https://api.nasa.gov/EPIC/archive/natural/' + '2019/05/30/' +'png/epic_1b_20190530011359.png'+ '?api_key=' + key;
document.getElementById("epicImg").src=apiurl;

//Earth

lon = 30.5234;
lat = 50.4501;
dim = 0.3;

if (localStorage.getItem("button_earth")==="clicked") {
  lon = localStorage.getItem("lon_earth");
  lat = localStorage.getItem("lat_earth");
  dim = localStorage.getItem("dim_earth");
}

document.getElementById("longitude").value=lon;
document.getElementById("latitude").value=lat;
document.getElementById("zoom").value=dim;


apiurl = 'https://api.nasa.gov/planetary/earth/imagery?' + 'lon=' + lon + '&lat=' + lat + '&dim=' + dim + '&api_key=' + key;

document.getElementById("earthImg").src=apiurl;

if (localStorage.getItem("button_earth")==="clicked") {
  window.location = '#nav_earth';
  localStorage.setItem("button_earth","un_clicked");
}

function earth_api() {
  localStorage.setItem("lon_earth",document.getElementById("longitude").value);
  localStorage.setItem("lat_earth",document.getElementById("latitude").value);
  localStorage.setItem("dim_earth",document.getElementById("zoom").value);
  localStorage.setItem("button_earth","clicked");
  location.reload();
  return true;
}

function earth_default() {
  lon = 30.5234;
  lat = 50.4501;
  dim = 0.3;

  document.getElementById("longitude").value=lon;
  document.getElementById("latitude").value=lat;
  document.getElementById("zoom").value=dim;

  earth_api();
  return true;
}


//Mars

sol=Math.floor(Math.random() * 100) + 900;
camera=["FHAZ","RHAZ","NAVCAM"];
rover=["curiosity","opportunity","spirit"];

for (i=0; i<3; i++) {
  if (i===1) {
    sol = Math.floor(Math.random() * 99) + 99;
  }
  if  (i===2) {
    sol = Math.floor(Math.random() * 90) + 10;
  }
  apiurl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover[i] + '/photos?' + 'sol=' + sol + '&camera=' + camera[i] + '&api_key=' + key;
  json_obj = JSON.parse(Get(apiurl));
  if (Object.keys(json_obj.photos).length===0) {
    i--;
  } else {
    document.getElementById('card_img'+i).src=json_obj.photos["0"].img_src;
  }
}
