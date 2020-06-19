/*NYHEDSBREV SUBMIT BEGIN*/
const button = document.getElementById('send');
let cookie = function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    let item;
    for(item of ca) {
        while (item.charAt(0) == ' ') {
            item = item.substring(1);
        }
        if (item.indexOf(name) == 0) {
            return item.substring(name.length, item.length);
        }
    }
    return "";
};
let bearer = 'Bearer ' + cookie //Definere bearertoken med cookien 


button.onclick = function() {
let email = document.getElementById('email').value;
let data = new URLSearchParams(); //Laver data der kan komme i fetchens "body" til api'en
data.append("email", email); //Sender indputet (emailen) til variablet data

let requestOptions = { 
  method: 'POST', //Laver fetchen til en "post"
  headers: { 
      'Authorization': bearer //Sætter token med
  },
  body: data, //Definere body'en
  redirect: 'follow' 
};

fetch("https://api.mediehuset.net/mediesuset/newsletter", requestOptions) //Variablet requestOptions er de ekstra informationer som skal med på fetchen
  .then(response => response.text()) //Tager svaret og laver det til tekst
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

const email = document.getElementById('email');
if(email.value === '') {
    alert('Feltet E-mail adresse må ikke være tomt!');
    email.focus();
    return false;
}

alert('Formularen blev afsendt!');
}
/*NYHEDSBREV SUBMIT END*/