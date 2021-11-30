const pokedex = document.getElementById("pokedex")

const fetchPokemon = () => {
const promises = [];
    for (let i = 1; i <= 150; i++) {
            const url =`https://pokeapi.co/api/v2/pokemon/${i}`;
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
    <li>
        <img src="${pokeman.image}"/>
        <h2>${pokeman.name}</h2>
        <p>${pokeman.type}</p>
    </li>
        `)
        console.log(pokemonHTMLString);
    pokedex.innerHTML = pokemonHTMLString.join(' ') ;
};

fetchPokemon();