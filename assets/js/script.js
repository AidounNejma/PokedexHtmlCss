const pokedex = document.getElementById("pokedex")

const fetchPokemon = () => {
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
    });
        for (let i = 1; i <= 150; i++) {
        const url =https://pokeapi.co/api/v2/pokemon/${i};
        promises.push(fetch(url).then((res) => res.json()));
}
Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => 
    ({
        name: data.name,
        id: data.id,
        image: data.sprites['front_default'],
        type: data.types.map((type) => type.type.name)
    }));
    displayPokemon(pokemon);
});
};

const displayPokemon = (pokemon) =>{
    console.table(pokemon);
    const pokemonHTMLString = pokemon.map (pokeman => `
    <li class="cards"
        data-name="${pokeman.name}"
        data-image="${pokeman.image}"
        data-type="${pokeman.type}"
    >
        <img src="${pokeman.image}"/>
        <h2 class="card-name">${pokeman.name}</h2>
        <p class="card-type">${pokeman.type}</p>
    </li>
        `)
        console.log(pokemonHTMLString);
    pokedex.innerHTML = pokemonHTMLString.join(' ') ;
};

fetchPokemon();