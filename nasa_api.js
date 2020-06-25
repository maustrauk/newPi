//Var's
let i;
let Httpreq;

let key = 'mtntDQvEooZap8WyRgBJrc2nx2wfisjitlLolpyk';

let now;
let randDate;
let testDate;
let apodDate;
let apiurl;
let json_obj;

let sol;
let camera;
let cams;
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
    return Httpreq.responseText;
}



for (i=0; i<3; i++) {
  randDate = Math.floor(Math.random() * 31536000000) + 518400000;
  testDate = new Date(now.getTime()-randDate);
  apiurl = 'https://api.nasa.gov/planetary/apod?' + 'api_key=' + key + '&date=' + testDate.getFullYear() + '-' + (testDate.getMonth() + 1) + '-' + testDate.getDate();
  json_obj = JSON.parse(Get(apiurl));
  if (json_obj.media_type==="image") {
    document.getElementById('carouselImg'+i).src=json_obj.hdurl;
    document.getElementById('carouselButton'+i).textContent='"' + json_obj.title + '"';
    document.getElementById('imgTitle'+i).textContent=json_obj.title;
    document.getElementById('imgText'+i).textContent=json_obj.explanation;
  } else {
    i--;
  }
}
i=0;



//APOD
apodDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
if (localStorage.getItem("button_apod")==="clicked") {
  apodDate = localStorage.getItem("APOD_date");
}
apiurl = 'https://api.nasa.gov/planetary/apod?' + 'api_key=' + key + '&date=' + apodDate;
json_obj = JSON.parse(Get(apiurl));
while (json_obj.media_type!=="image") {
  testDate = new Date(now.getTime()-86400000);
  apiurl = 'https://api.nasa.gov/planetary/apod?' + 'api_key=' + key + '&date=' + testDate.getFullYear() + '-' + (testDate.getMonth() + 1) + '-' + testDate.getDate();
  json_obj = JSON.parse(Get(apiurl));
}

document.getElementById("apodImg").src=json_obj.hdurl;

if (localStorage.getItem("button_apod")==="clicked") {
  window.location = '#nav_apod';
  localStorage.setItem("button_apod","un_clicked");
}

function apod_api() {
  localStorage.setItem("APOD_date",document.getElementById("APOD_date").value);
  localStorage.setItem("button_apod","clicked");
  location.reload();
  return true;
}


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

if (localStorage.getItem("button_curiosity")==="clicked") {
  sol = localStorage.getItem("curiosity_sol");
  camera = localStorage.getItem("curiosity_camera");
  i=0;

  apiurl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover[i] + '/photos?' + 'sol=' + sol + '&camera=' + camera + '&api_key=' + key;
  json_obj = JSON.parse(Get(apiurl));
  document.getElementById('card_img'+i).src=json_obj.photos["0"].img_src;
  console.log(json_obj.photos["0"].img_src);
}





function curiosity_api() {
  cams = document.getElementsByName('cameras');
  for (i=0; i<cams.length; i++) {
    if(cams[i].checked) {
        localStorage.setItem("curiosity_camera",cams[i].value);
    }
  }
  localStorage.setItem("curiosity_sol",document.getElementById("curiosity_sol").value);
  localStorage.setItem("button_curiosity","clicked");
  location.reload();
  return true;
}

document.getElementById("curiosity_submit").addEventListener("click", curiosity_api);
