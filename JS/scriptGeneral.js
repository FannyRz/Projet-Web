// Variable qui va récupérer nos données
let listeOeuvres = []

// Nombre de pages de données que l'on veut récupérer dans l'API
// L'API contenant beaucoup de données, elle est divisée en plusisurs pages
const nbPages = 20

// Récupération des données de l'API pour le nombre de pages souhaité
for (let page = 1; page <= nbPages; page++) {
    // Changement de page dans l'URL de notre API
    let url = 'https://api.artic.edu/api/v1/artworks?page=' + page

    // Fetch de l'URL
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
            listeOeuvres.push(data.data)
            
            // Test si toutes les données ont été récupérées
            if (page == nbPages) {
                traitementData()
            }
        })
        .catch(function (err) {
            console.log(err);
    });
}

// Récupération de la div template et du main
const template = document.getElementById("apercu-oeuvre-template")
const main = document.querySelector("main")

// Fonction qui va afficher toutes les oeuvres récupérées via l'API
function traitementData() {
    // Affichage de nos données dans la console
    console.log(listeOeuvres)

    // Création des éléments HTML de toutes les oeuvres
    for (let i=0; i<listeOeuvres.length; i++) {
        for (j=0; j<listeOeuvres[i].length; j++) {

            // Clonage du template de div à remplir avec les bonnes donées
            let div = template.cloneNode(true)
            div.id = listeOeuvres[i][j].id

            // Affichage du nom de l'oeuvre et de son artiste
            let titre = listeOeuvres[i][j].title == null ? "Titre inconnu" : listeOeuvres[i][j].title
            let artiste = listeOeuvres[i][j].artist_title == null ? "Artiste inconnu" : listeOeuvres[i][j].artist_title
            div.querySelector("p").innerHTML = "<b>" + titre + "</b><br>" + artiste
            
            // Affichage de l'image
            div.querySelector("img").src = "https://www.artic.edu/iiif/2/" + listeOeuvres[i][j].image_id
            div.querySelector("img").srcset = "https://www.artic.edu/iiif/2/" + listeOeuvres[i][j].image_id + "/full/200,/0/default.jpg"
            
            // Ajout de la nouvelle div remplie 
            // (que si l'artiste n'est pas null, sinon il n'y a pas bcp d'info ni d'image dans l'API)
            if (listeOeuvres[i][j].artist_title != null) {
                main.appendChild(div)
            }
        
            // Changement de page quand on clique sur l'oeuvre
            div.onclick = function() {
                localStorage.clear()
                localStorage.setItem("idOeuvre", this.getAttribute('id'));
            }
        }
    }
}
