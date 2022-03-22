//funcion fetch es la forma en que nosotros hacemos justamente una consulta a una petición http - api

// const fetchPokemon = () => {
//         const pokeNameInput = document.getElementById("pokeName");
//         let pokeName = pokeNameInput.value.toLowerCase();
//         const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
//         //promesa es asincrono - stack de programación
//         fetch(url).then((res) => {
//             if (res.status != "200") {
//                 console.log(res);
//                 pokeImage("./images/Pokebola-pokeball-png-0.png");
//             } else {
//                 return res.json();
//             }
//         }).then((data) => {
//             console.log(data);
//             let pokeImg = data.sprites.front_default;
//             console.log(pokeImg);
//             pokeImage(pokeImg);
//         })
//     }
//     // fetchPokemon();
// const pokeImage = (url) => {
//     const pokePhoto = document.getElementById("pokeImg");
//     pokePhoto.src = url;
// }

const searchBtn = document.getElementById('search-btn'); // search button
const inputField = document.getElementById('name-input'); // search field input
const nameScreen = document.getElementById('name-screen'); //name-screen
const imageScreen = document.getElementById('main-screen'); // image screen
const aboutScreen = document.getElementById('about-screen'); // about-text screen
const typeScreen = document.getElementById('type-screen'); // type screen
const idScreen = document.getElementById('id-screen'); // spices screen

const getPokemonData = (pokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((response) => {
            if (response.status != "200") {
                imageScreen.style.backgroundImage = `url('./images/Pokebola-pokeball-png-0.png')`;
            } else {
                return response.json();
            }

        })
        .then((data) => {
            let id = ('00' + data.id).slice(-3);
            imageScreen.style.backgroundImage = `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png')`;
            nameScreen.innerHTML = data.name;
            typeScreen.innerHTML = `tipo: ${data.types[0].type.name}`;
            let porcentaje = 0;
            let nombre_stat = '';


            data.stats.forEach(element => {
                porcentaje = element.base_stat;
                nombre_stat = element.stat.name;
                aboutScreen.innerHTML = `move: ${nombre_stat} Estadistica: ${porcentaje}%`;
            });

            idScreen.innerHTML = `id: ${data.id}`;
            inputField.value = '';

        });
};

inputField.addEventListener(
    'keydown',
    (event) => event.key === 'Enter' && searchBtn.click()
);
searchBtn.addEventListener('click', () => getPokemonData(inputField.value));