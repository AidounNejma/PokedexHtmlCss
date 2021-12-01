
const pokedex = document.getElementById("pokedex")
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors)

console.log(main_types);

<<<<<<< HEAD
const fetchPokemon = () => {
const promisesss = [];
const promises = [];
    for (let i = 1; i <= 150; i++) {
            const url =`https://pokeapi.co/api/v2/pokemon-species/${i}`;
            promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) =>  {
             let pokedata = {
                description : data.flavor_text_entries.filter(entry => entry.language.name == "fr")[0]?.flavour_text,
                name : data.names.filter(entry => entry.language.name == "fr")[0]?.name,
                
                   id: data.id,
                   /* 
                image: data.sprites['front_default'],
                
                type: data.types.map((type) => type.type.name),
                 */
             }

             return pokedata;
        }
        );
        displayPokemon(pokemon);
    });
}
    /*
        for (let i = 1; i <= 150; i++) {
        const url =https://pokeapi.co/api/v2/pokemon/${i};
        promises.push(fetch(url).then((res) => res.json()));
=======
const getDetails = async(id)=> {
    let details = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json());
    return details;
>>>>>>> 7cefa92d423681e681eafc73e2b8fecf0235320e
}

const getData = async(data) =>{
    let details = await getDetails(data.id);
    console.log(data);
    let pokedata = {
        description: data.flavor_text_entries.filter(entry => entry.language.name == "fr")[0].flavor_text,
        name: data.names.filter(entry => entry.language.name == "fr")[0].name,
        id: data.id,
<<<<<<< HEAD
        image: data.sprites['front_default'],
        type: data.types.map((type) => type.type.name)
    }));*/



const displayPokemon = (pokemon) =>{
    console.table(pokemon);
    const pokemonHTMLString = pokemon.map (pokeman => `

    <li class="cards"
        data-name="${pokeman.name}"
        data-image="${pokeman.image}"
        data-type="${pokeman.type}"
    >

        <img src="https://pokeapi.co/api/v2/pokemon/${pokeman.id}"/>
        <h2 class="card-name">${pokeman.name}</h2>
        <p class="card-type">${pokeman.type}</p>
        <p class="card-description">${pokeman.description}</p>
=======
        image: details.sprites['front_default'],
        type: details.types.map((type) => type.type.name),
        color: data.color.name,
    }
    //console.log(pokedata)
    return pokedata;
}

const fetchPokemon = async() => {
    const promises = [];
    for (let i = 1; i <= 50; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    var pokemons = await Promise.all(promises);
    //console.log(pokemons)
    pokemons = await Promise.all(pokemons.map(async(data) => {
        //console.log(data)
        const element = await getData(data)
        return element
    }));
    console.log(pokemons)

    displayPokemon(pokemons);
};

const displayPokemon = (pokemon) => {
    //console.table(pokemon);
    const pokemonHTMLString = pokemon.map(pokedata => `
    <li class="cards" style="background-color:${pokedata.color}"
        data-name="${pokedata.name}"
        data-image="${pokedata.image}"
        data-type="${pokedata.description}"
    >
        <img src="${pokedata.image}"/>
        <h2 class="card-name">${pokedata.name}</h2>
        <p class="card-type">${pokedata.type}</p>
>>>>>>> 7cefa92d423681e681eafc73e2b8fecf0235320e
    </li>
        `)
    //console.log(pokemonHTMLString);
    pokedex.innerHTML = pokemonHTMLString.join(' ');
};

fetchPokemon();



/*************************** Animation slide *******************************/ 

var cards = document.querySelector(".cards");
console.log(cards);