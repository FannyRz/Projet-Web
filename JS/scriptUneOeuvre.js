// Récupération de l'id de l'oeuvre à afficher
const idOeuvre = localStorage.getItem("idOeuvre")

// URL de notre oeuvre
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
        // Traitement des données
        console.log(data)
        dataOeuvre = data.data
        affichageDonneesOeuvre()
    })
    .catch(function (err) {
        console.log(err);
});

// Affichage des données de l'oeuvre
function affichageDonneesOeuvre() {
    // Disparition du loader
    document.getElementById("divConteneur").style.display = "none"

    // Affichage de l'image
    document.querySelector("img").style.display = "block"
    document.querySelector("img").src = "https://www.artic.edu/iiif/2/" + dataOeuvre.image_id
    document.querySelector("img").srcset = "https://www.artic.edu/iiif/2/" + dataOeuvre.image_id + "/full/400,/0/default.jpg"

    // Affichage du nom de l'oeuvre et de son artiste
    document.querySelector("h1").innerText = dataOeuvre.title
    document.querySelector("h2").innerText = dataOeuvre.artist_title
    // TODO : ajout du reste
}