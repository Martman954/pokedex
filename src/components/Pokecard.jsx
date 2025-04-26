import React from 'react'

const Pokecard = ({pokemon}) => {


    const pokecolor = (name) => {
        let color = "black"
        if (name === "grass"){
            color = "green-400"
        }
        else if(name === "fire"){
            color = "orange-500"
        }
        else if(name === "poison"){
            color = "purple-400"
        }
        else if(name === "bug"){
            color = "lime-500"
        }
        else if(name === "water"){
            color = "sky-600"
        }
        else if(name === "normal"){
            color = "gray-400"
        }
        else if(name === "flying"){
            color = "blue-400"
        }
        else if(name === "psychic"){
            color = "pink-400"
        }
        else if(name === "electric"){
            color = "yellow-400"
        }
        else if(name === "ground"){
            color = "amber-900"
        }
        else if (name === "fairy"){
            color = "fuchsia-400"
        }
        else if(name === "fighting"){
            color = "orange-900"
        }
        else if(name === "rock"){
            color = "orange-300"
        }
        else if(name === "ice"){
            color = "cyan-300"
        }
        else if(name === "ghost"){
            color = "indigo-800"
        }
        else if(name === "dragon"){
            color = "indigo-600"
        }
        else if(name === "dark"){
            color = "yellow-900"
        }
        return color;
      }

    return (
    <>
        <div className="flex flex-col min-w-20 min-h-20 sm:min-w-40 sm:min-h-40 
                        px-2 py-2 mx-2 my-2 rounded-xl bg-gray-400/30 hover:bg-gray-300/50">
            <h2 className="text-xl">{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <ul className='flex flex-wrap content-center gap-2 justify-center'>
               <li className={`bg-${pokecolor(pokemon.types[0].type.name)} rounded-lg px-1 py-1 text-white font-bold shadow-lg`}>
                    {pokemon.types[0].type.name} 
                </li>
                {pokemon.types.length > 1 ? 
                <li className={`bg-${pokecolor(pokemon.types[1].type.name)} rounded-lg px-1 py-1 text-white font-bold shadow-lg`}>
                    {pokemon.types[1].type.name}
                </li> 
                : ""}
            </ul>
            <p>Weight: {pokemon.weight}</p>
        </div>
    </>
    )
}

export default Pokecard