let sol=1000;
let camera='fhaz';

apiurl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?' + 'sol' + sol + '&camera' + camera + '&api_key=' + key;

//json_obj = JSON.parse(Get(apiurl));
//document.getElementById("marsImg").src=json_obj.img_src;
console.log(Get(apiurl));
