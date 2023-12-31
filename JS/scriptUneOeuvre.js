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
        console.log(data.data)
        dataOeuvre = data.data
        affichageDonneesOeuvre()
    })
    .catch(function (err) {
        console.log(err);
});

// Affichage des données de l'oeuvre
function affichageDonneesOeuvre() {
    // Disparition du loader
    document.getElementById("conteneurLoader").style.display = "none"

    // Affichage de l'image
    document.getElementById("imageOeuvre").style.display = "block"
    document.getElementById("imageOeuvre").src = "https://www.artic.edu/iiif/2/" + dataOeuvre.image_id
    document.getElementById("imageOeuvre").srcset = "https://www.artic.edu/iiif/2/" + dataOeuvre.image_id + "/full/400,/0/default.jpg"

    // Apparition de la div remplie d'informations
    document.getElementById("informations").style.display = "block"

    // Affichage du nom de l'oeuvre et de son artiste
    document.querySelector("h1").innerText = dataOeuvre.title
    document.querySelector("h2").innerText = dataOeuvre.artist_title
    document.querySelector("h3").innerText = dataOeuvre.date_start

    // Affichage des informations techniques
    document.querySelector("p").innerText =  "\n" + "Origin : " + dataOeuvre.place_of_origin + "\n" + 
                                            "Category : " + dataOeuvre.department_title + "\n" + 
                                            "Material : " + dataOeuvre.medium_display + "\n" + 
                                            "Technique : " + dataOeuvre.artwork_type_title + "\n" + 
                                            "Dimensions : " + dataOeuvre.dimensions + "\n" + 
                                            "Reference : " + dataOeuvre.main_reference_number
}