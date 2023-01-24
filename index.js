const pokeimg= document.getElementById('pokeimg');
const pokename= document.getElementById('pokename');
const display = document.getElementById('display');
const subdisplay= document.getElementById('subdisplay');

const obtenerPokemones = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const data = await response.json();
    setPokemonsInView(data.results);
    
  };

  const setPokemonsInView = (results,name) => {
    
    results.forEach(element => {
        if(element.name=='bulbasaur'){
            obtenerDetallePokemon('bulbasaur');
            return ;
        }
    });
    
  };

  const obtenerDetallePokemon = async (pokemon) => {
    const p = document.createElement('p');

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();

    pokeimg.setAttribute('src',`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`);
    pokename.value= (data.name).toUpperCase();
    p.textContent= `HABILIDAD: ${data.abilities.map(element=>element.ability.name.toUpperCase()+' ')} PESO: ${data.weight}  TIPO: ${data.types.map(element=>element.type.name.toUpperCase()+' ')}`;
    subdisplay.appendChild(p);

    console.log("detalle", data);
  };


  obtenerPokemones();