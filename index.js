const express = require('express');
const app = express();
const fetch = require('node-fetch');

//Sætter view engine til ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

//Definerer root mappe til css referencer m.m.
app.use(express.static(__dirname + '/'));

//Route til forside
app.get("/", async (req, res) => {
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/mediesuset/news');

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json(); 
    console.log(apiResponse) 

    return res.render("pages/index", {
       nyheder: apiResponse
      });
        
});

app.get("/index-full", async (req, res) => {
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/mediesuset/news');

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json(); 
    console.log(apiResponse) 

    return res.render("pages/index-full", {
       nyheder: apiResponse
      });
        
});

app.get("/line-up", async (req, res) => {
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/mediesuset/events');

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json(); 
    console.log(apiResponse) 

    return res.render("pages/line-up", {
       lineup: apiResponse
      });
        
});

app.get("/program", async (req, res) => {
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/mediesuset/events');

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json(); 
    console.log(apiResponse) 

    return res.render("pages/program", {
       program: apiResponse
      });
        
});

app.get("/artist-side/:id", async (req, res) => {
    let id = req.params.id
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch(`https://api.mediehuset.net/mediesuset/events/${id}`);

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();  
    console.log(apiResponse) 

    return res.render("pages/artist-side", {
       artist: apiResponse
      });
});


app.get("/ticket", async (req, res) => {
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/mediesuset/tickets');

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json(); 
    console.log(apiResponse) 

    return res.render("pages/ticket", {
       billet: apiResponse
      });
        
});


app.get("/camps", async (req, res) => {
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/mediesuset/camps');

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json(); 
    console.log(apiResponse) 

    return res.render("pages/camps", {
       camps: apiResponse
      });
        
});

app.get("/camp-side/:id", async (req, res) => {
    let id = req.params.id
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch(`https://api.mediehuset.net/mediesuset/camps/${id}`);

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();  
    console.log(apiResponse) 

    return res.render("pages/camp-side", {
       camp: apiResponse,
       facilities: apiResponse.item.facilities
      });
});

app.get("/praktisk", (req, res) => {
    res.render('pages/praktisk');

});

app.get("/login", (req, res) => {
    res.render('pages/login');

});


//404 meddelelse
app.use(function(req, res, next) {
    res.status(404).send(
        res.render('pages/404')   
    );
});

//Angiver port der skal lyttes på
app.listen(3000, () => {
    console.log("Express server kører...");
});