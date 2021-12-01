const pokedex = document.getElementById("pokedex") /* creation de la constante pokedex qui reprend mon ol du HTML */

const getDetails = async(id)=> { /* fonction asynchrone qui va récupérer une partie de l'API Pokemon (pour les images et le type)  */
    let details = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json());/* on stocke dans details les données et on récupère le résultat au format Json */
    return details; /* on retourne details */
} 

const getData = async(data) =>{ /* fonction permettant de regrouper les données de details et de data (mes deux liens de l'Api pokémon) */
    let details = await getDetails(data.id); /* on récupère l'id de details via la data.id  */
    //console.log(details);
    let pokedata = { // on stocke toutes ces données dans la variable pokedate
        description: data.flavor_text_entries.filter(entry => entry.language.name == "fr")[0].flavor_text, /* la fonction filter nous permet de récupérer des données selon certains paramètres (ici la langue "fr") */
        name: data.names.filter(entry => entry.language.name == "fr")[0].name,
        id: data.id,
        image: details.sprites['front_default'],
        type: details.types.map((type) => type.type.name),
        color: data.color.name,
    }
    //console.log(pokedata)
    return pokedata;
}

const fetchPokemon = async() => { /* fonction asynchrone nous permettant de récupérer (fetch) le deuxième lien de l'API */
    const promises = []; /* On instancie un tableau vide appelé promises */
    for (let i = 1; i <= 150; i++) { /* boucle for permettant de déterminer combien de pokémons nous voulons récupérer */
        const url = `https://pokeapi.co/api/v2/pokemon-species/${i}`;/* la boucle va modifier le numéro de l'id se trouvant à la fin de l'URL */
        promises.push(fetch(url).then((res) => res.json())); /* on push et stocke tout en json dans l'array promises */
    }
    var pokemons = await Promise.all(promises);
    //console.log(pokemons)
    pokemons = await Promise.all(pokemons.map(async(data) => {
        //console.log(data)
        const element = await getData(data)/* on rappelle la fonction getData (qui a les données des deux URL) et on la stocke dans element*/
        return element /* on retourne element */
    }));
    //console.log(pokemons)

    displayPokemon(pokemons); /* On appelle la fonction displayPokemon avec pour paramètre : pokemons (qu'on a définit juste au dessus) */
};

const displayPokemon = (pokemon) => { /* fonction nous permettant d'avoir un rendu visuel */
    //console.table(pokemon);
    const pokemonHTMLString = pokemon.map(pokedata =>{ /* constante pokemonHTMLString contenant */
        let newElement = document.createElement('li');
        newElement.style.backgroundColor = pokedata.color; /* changement du style du li */
        newElement.classList = "cards"; /* ajout de la classe à l'élément li */
        newElement.dataset.name = pokedata.name;/* on écrit tous les paramètres que l'on veut faire passer dans la balise li */
        newElement.dataset.image = pokedata.image;
        newElement.dataset.description = pokedata.description;
        newElement.dataset.type = pokedata.type;
        newElement.addEventListener('click', openSideMenu)
        newElement.innerHTML = /* ce qui va apparaitre dans vignettes (image et nom du pokemon) */
        `
        <img src="${pokedata.image}"/>
        <h2 class="card-name">${pokedata.name}</h2> 
        ` 
        
        pokedex.append(newElement);
    })
    //console.log(pokemonHTMLString);
    
};

fetchPokemon(); /* appel de la fonction */



/*************************** Animation slide *******************************/ 
var pokePicture = document.querySelector(".pokePicture");
var pokeName = document.querySelector(".pokemonName");
var pokeDescription = document.querySelector(".description");
var pokeType = document.querySelector(".pokeType");
var pokeVue = document.querySelector(".pokemonSheet");

function openSideMenu(e){
    if(pokeVue.style.display = "none"){
        pokeName.innerHTML = e.currentTarget.dataset.name;
        pokePicture.src = e.currentTarget.dataset.image;
        pokeDescription.innerHTML = e.currentTarget.dataset.description;
        pokeType.innerHTML = e.currentTarget.dataset.type;

        pokeVue.classList.add("slideInRight");
        pokeVue.style.display = "flex";
        setTimeout(function(){ 
            pokeVue.classList.remove("slideInRight");
        }
        , 1000);
        
    } 
}
