        /**
         * Tjekker på om cookie er sat (bruger er logget ind)
         **/
        if(!checkCookie()) {
            loginHtml();
        } else {
            logoutpage();
        }
  
        /**
         * Funktion til at logge ind med
         * Henter form inputs (username, password)
         * Laver en POST request med disse til API endpoint /gettoken
         * Sætter cookie hvis der er respons med user_id og token
         * Viser logout knap (logoutHtml())
         **/
        function login(form) {
            //Sætter headers
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
            // Sætter input værdier til URL encoded
            let username = form.username.value;
            let password = form.password.value;
            let urlencoded = new URLSearchParams();
            urlencoded.append("username", username);
            urlencoded.append("password", password);
  
            //Sætter Request Options
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };
  
            //Fetcher endpoint med requestOptions
            fetch("https://api.mediehuset.net/token", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.access_token) {
                        
                        // Sætter cookies
                        setCookie('token', result.access_token, 7);
                        setCookie('user_id', result.user_id, 7);
  
                        // Kalder funktion til at udskrive logout knap
                        logoutpage();
  
                    }
                })
        }
  
        /**
         * Funktion til at sætte cookie
         **/ 
        function setCookie(cname, cvalue, exdays) {
            let d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
  
        /**
         * Funktion til at hente cookie
         **/ 
        function getCookie(cname) {
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
        }
  
        /**
         * Funktion til at tjekke cookie
         **/ 
        function checkCookie() {
            if(getCookie("user_id") != "") {
                return true;
            } else {
                return false;
            }
        }   
  
        
        function logout() {
            setCookie('token', 0, -7);
            setCookie('user_id', 0, -7);
            loginHtml();
        }
  
        /**
         * Funktion til at udskrive login vindue med
         **/
        function loginHtml() {
            const html = `
            <div class="grid-container">
            <form class="login2">
            <h4>Indtast login oplysninger:</h4>
                <div>
                  <label for="username">Email/Brugernavn:</label>
                  <input type="text" name="username" id="username" value="" required>        
                </div>
                <div>
                  <label for="password">Adgangskode:</label>
                  <input type="password" name="password" id="password" value="" required>        
                </div>
                <div>
                  <a class="link">
                  <button type="button" onclick="login(this.form)">LOGIN</button>
                </a>
                </div>
              </form>
            </div>          
            `;  
            document.getElementById('login').innerHTML = html;
        }
  
        /**
         * Funktion til at udskrive logout knap med
         **/
        function logoutpage() { 
          const html = `
          <div class="grid-container">
            <div class="login3">
          <h2>Du er nu logget ind!</h2>
            <div>
          <a class="link" href="/"><button type="button" >Tilbage til forsiden!</button></a>
          </div>
                  <div>
                    <button type="button" onclick="logout()">Logout</button>
                  </div>
           </div>
        </div>
    
            `;
            document.getElementById('login').innerHTML = html;
        }