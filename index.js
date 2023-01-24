const pokeimg= document.getElementById('pokeimg');
const pokename= document.getElementById('pokename');
const display = document.getElementById('display');
const subdisplay= document.getElementById('subdisplay');

const obtenerPokemones = async (name) => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
    const data = await response.json();
    
    localStorage.setItem('PokeList',JSON.stringify(data.results))
    setPokemonsInView(data.results,name);
    
  };

  const setPokemonsInView = (results,name) => {
    results.forEach(element => {
        if(element.name==name){
            obtenerDetallePokemon(name);
        }else{
            console.log(element.name);
        }
    });
    
  };

  const obtenerDetallePokemon = async (pokemon) => {
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();

    pokeimg.setAttribute('src',`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`);
    pokename.value= (data.name).toUpperCase();
    subdisplay.innerHTML= `<p>HABILIDAD: ${data.abilities.map(element=>element.ability.name.toUpperCase()+' ')} PESO: ${data.weight}  TIPO: ${data.types.map(element=>element.type.name.toUpperCase()+' ')} </p>`;
    

    console.log("detalle", data);
  };





  pokename.addEventListener("keypress", function(event) {
    
    if (event.key === "Enter") {
      event.preventDefault();
      if(localStorage.getItem('PokeList')){
        const data = JSON.parse(localStorage.getItem('PokeList'));
        setPokemonsInView(data,this.value);
      }
      obtenerPokemones(this.value);
    }
  });
  