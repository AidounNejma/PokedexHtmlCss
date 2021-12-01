
const pokedex = document.getElementById("pokedex")

const getDetails = async(id)=> {
    let details = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json());
    return details;
}

const getData = async(data) =>{
    let details = await getDetails(data.id);
    console.log(data);
    let pokedata = {
        description: data.flavor_text_entries.filter(entry => entry.language.name == "fr")[0].flavor_text,
        name: data.names.filter(entry => entry.language.name == "fr")[0].name,
        id: data.id,
        image: details.sprites['front_default'],
        type: details.types.map((type) => type.type.name),
        color: data.color.name,
    }
    //console.log(pokedata)
    return pokedata;
}

const fetchPokemon = async() => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
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
    const pokemonHTMLString = pokemon.map(pokedata => `
    <div class="box">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <li class="cards" style="background-color:${pokedata.color} "
        data-name="${pokedata.name}"
        data-image="${pokedata.image}"
        data-type="${pokedata.description}"
    >   
    <div class="Opacity">
        <img class= card-image src="${pokedata.image}"/>
        <h2 class="card-name">${pokedata.name}</h2>
        <p class="card-type">Type: ${pokedata.type.join(' ')}</p>
        </div>
    </li>
    </div>
        `)
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
