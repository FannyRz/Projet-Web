// Récupération de l'id de l'oeuvre à afficher
// const idOeuvre = document.getElementById("")
const idOeuvre = localStorage.getItem("idOeuvre")

// URL
const url = 'https://api.artic.edu/api/v1/artworks/' + idOeuvre

// Variable qui va récupérer nos données
let dataOeuvre = null

// Récupération des données d'une oeuvre de l'API
fetch(url)
.then(function(response) {
    if (response.ok) {
        return response.json(); // Retour d'une promesse
    } else {
        throw ("Error " + response.status);
    }
    })
    .then (function(data) { 
        //Traitement des données
        console.log(data)
    })
    .catch(function (err) {
        console.log(err);
});

// Affichage des données de l'oeuvre
const id = document.getElementById("test-id")
id.innerText = idOeuvre