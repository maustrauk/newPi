let sol=Math.floor(Math.random() * 100) + 900;
let camera=["FHAZ","RHAZ","NAVCAM"];
let rover=["curiosity","opportunity","spirit"];

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
