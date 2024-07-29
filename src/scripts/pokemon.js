const searchedPokemonNames = new Set();
function searchPokemon() {
    namePokemon = document.getElementById('nome-pokemon').value.trim();
    if (!namePokemon) {
        alert('Digite o nome do Pokemon');
        return;
    }
    if (searchedPokemonNames.has(namePokemon.toLowerCase())) {
        alert('Este Pokémon já foi pesquisado.');
        return;
    }
    const status = document.getElementById('status');
    status.innerText = 'Pegando Informações...';

    const api = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`;
    fetch(api).then(response => {
        if(!response.ok) {
            if(response.status == 404) {
                alert('Ocorreu um erro. Digite o nome corretamente.');
            }
            throw new ('Erro ao buscar Pokémon');
        }
        return response.json();
    })
    .then(data => {

        console.log(data);

        const pokemonContainer = document.createElement('div');
        pokemonContainer.classList.add('pokemon');

        const spritePokemon = document.createElement('img');
        spritePokemon.src = data.sprites.front_default;
        spritePokemon.alt = data.name;
        pokemonContainer.appendChild(spritePokemon);

        const pokemonName = document.createElement('p');
        pokemonName.innerText = `Name : ${data.name}`;
        pokemonContainer.appendChild(pokemonName);

        const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
        const pokemonTypes = document.createElement('p');
        pokemonTypes.innerText = `Tipos: ${types}`;
        pokemonContainer.appendChild(pokemonTypes);

        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
        const pokemonAbilities = document.createElement('p');
        pokemonAbilities.innerText = `Habilidades: ${abilities}`;
        pokemonContainer.appendChild(pokemonAbilities);


        const pokemonResults = document.getElementById('pokemon-results');
        pokemonResults.appendChild(pokemonContainer);

        searchedPokemonNames.add(namePokemon.toLowerCase());

        status.innerText = '';
    })
    .catch(error => {
        console.error('Erro:', error);
        status.innerText = '';
    });

}

function searchRandomPokemon() {
    let randomPokemon = Math.floor(Math.random() * 1025) + 1;
    console.log(randomPokemon);

    const status = document.getElementById('status');
    status.innerText = 'Pegando Informações...';

    const api = `https://pokeapi.co/api/v2/pokemon/${randomPokemon}`;

    fetch(api).then(response => response.json())
    .then(data => {

        console.log(data);

        if (searchedPokemonNames.has(data.name.toLowerCase())) {
            alert('Este Pokémon já foi pesquisado.');
            status.innerText = '';
            return;
        }

        const pokemonContainer = document.createElement('div');
        pokemonContainer.classList.add('pokemon');

        const spritePokemon = document.createElement('img');
        spritePokemon.src = data.sprites.front_default;
        spritePokemon.alt = data.name;
        pokemonContainer.appendChild(spritePokemon);

        const pokemonName = document.createElement('p');
        pokemonName.innerText = `Name : ${data.name}`;
        pokemonContainer.appendChild(pokemonName);

        const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
        const pokemonTypes = document.createElement('p');
        pokemonTypes.innerText = `Tipos: ${types}`;
        pokemonContainer.appendChild(pokemonTypes);

        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
        const pokemonAbilities = document.createElement('p');
        pokemonAbilities.innerText = `Habilidades: ${abilities}`;
        pokemonContainer.appendChild(pokemonAbilities);


        const pokemonResults = document.getElementById('pokemon-results');
        pokemonResults.appendChild(pokemonContainer);

        searchedPokemonNames.add(data.name.toLowerCase());

        status.innerText = '';
    })
    .catch(error => {
        console.error('Erro:', error);
        status.innerText = '';
    })

}

function probabilityShiny() {
    
}