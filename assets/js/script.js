
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
}
Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => 
    ({
        name: data.name,
        id: data.id,
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
    </li>
        `)
        console.log(pokemonHTMLString);
    pokedex.innerHTML = pokemonHTMLString.join(' ') ;
};

fetchPokemon();