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
    for (let i = 1; i <= 50; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    var pokemons = await Promise.all(promises);
    console.log(pokemons)
    pokemons = await Promise.all(pokemons.map(async(data) => {
        console.log(data)
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
    </li>
        `)
    //console.log(pokemonHTMLString);
    pokedex.innerHTML = pokemonHTMLString.join(' ');
};

fetchPokemon();



/*************************** Animation slide *******************************/ 
