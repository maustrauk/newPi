let sol=1000;
let camera='NAVCAM';

apiurl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?' + 'sol=' + sol + '&camera=' + camera + '&api_key=' + key;

json_obj = JSON.parse(Get(apiurl));
document.getElementById("marsImg").src=json_obj.photos["0"].img_src;
