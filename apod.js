let key = 'mtntDQvEooZap8WyRgBJrc2nx2wfisjitlLolpyk';

let now = new Date();
let randDate;
let testDate;
let apiurl;
let json_obj;

function Get(yourUrl,get_code){
    let Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    console.log("function 'Get' used");
    return Httpreq.responseText;
}



for (let i=0; i<3; i++) {
  randDate = Math.floor(Math.random() * 31536000000) + 518400000;
  testDate = new Date(now.getTime()-randDate);
  apiurl = 'https://api.nasa.gov/planetary/apod?' + 'api_key=' + key + '&date=' + testDate.getFullYear() + '-' + (testDate.getMonth() + 1) + '-' + testDate.getDate();
  json_obj = JSON.parse(Get(apiurl),0);
  if (json_obj.media_type==="image") {
    document.getElementById('carouselImg'+i).src=json_obj.hdurl;
    document.getElementById('carouselButton'+i).textContent='"' + json_obj.title + '"';
    document.getElementById('imgTitle'+i).textContent=json_obj.title;
    document.getElementById('imgText'+i).textContent=json_obj.explanation;
    console.log(json_obj);
  } else {
    i--;
  }
}
