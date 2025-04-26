import React, {  useEffect, useState} from 'react'
import { Link, useParams } from "react-router"
import { useLocation } from "react-router"

const Pokemon = () => {
    const { id } = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const page = queryParams.get('page')
    const [pokemon, setPokemon] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
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
        else if(name === "steel"){
            color = "gray-600"
        }
        return color
      }
    useEffect(() => {
        setIsLoading(true)
        setError(null)

        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if(!response.ok){
                throw new Error("Network response not OK")
            }
            return response.json()
        })
        .then(pokemon => {
            setPokemon(pokemon)
            setIsLoading(false)
        })
        .catch(error => {
            setError(error.message)
            setIsLoading(false)
        })


        
    }, [id])
    


    
    if (isLoading) return <div className='min-w-screen min-h-screen flex justify-center items-center'>Loading Pokemons...</div>
    if (error) return <div>Error occured: {error.message}</div>

    return (
        <div className='flex justify-center my-22 w-full '>
            <Link to={`/?page=${page}`} 
                className='absolute  md:right-10 right-4 top-26 sm:px-2 md:px-4 px-1 sm:py-2 md:py-4 py-1 
                            bg-gray-400/70 rounded-lg text-white bg-gray-900 shadow-lg shadow-indigo-700 trnsition-all
                            duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-600'>
                                Back
            </Link>
            <div className='rounded-lg border border-indigo-600   py-3 pb-12 min-h-190 w-200 sm:w-400 md:w-1/2 mx-0 sm:mx-4
                            text-white bg-gray-900 shadow-lg shadow-indigo-700 trnsition-all
                            duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-600
                           '>
                <h1 className="text-center text-4xl sm:text-8xl pb-2 flex flex-col items-center pt-6 ">{pokemon.name}</h1>
                
                <div className="flex flex-col">
                    <div className='flex flex-col w-full  items-center'>
                        <ul className='flex flex-wrap content-center justify-center gap-5 md:gap-4 sm:gap-2'>
                            <li className={`bg-${pokecolor(pokemon.types[0].type.name)} px-2 py-2 my-1 rounded-lg px-1 py-1 
                                            text-2xl sm:text-3xl md:text-4xl text-white font-bold shadow-lg`}>
                                {pokemon.types[0].type.name} 
                            </li>
                            {pokemon.types.length > 1 ? 
                            <li className={`bg-${pokecolor(pokemon.types[1].type.name)} px-2 py-2 my-1 rounded-lg px-1 py-1 
                                            text-2xl sm:text-3xl md:text-4xl text-white font-bold shadow-lg`}>
                                {pokemon.types[1].type.name}
                            </li> 
                            : ""}
                        </ul>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} className='w-70 pt-6 sm:pt-0' /> 
                        <div className='flex flex-row sm:flex-col justify-center'>
                                <div className='text-center text-xl pb-2 mx-2'>
                                    <h2 className='text-4xl pb-2'>Stats</h2>
                                    <p>Weight: {pokemon.weight}</p>
                                    <p>Height: {pokemon.height}</p>
                                </div>
                                <div className='text-center text-xl mx-2'>
                                    <h2 className='text-4xl pb-2'>Abilities</h2>
                                    <ul className='text-center text-xl'>
                                        {pokemon.abilities.map((ability, index) => (
                                            <li key={index}>{ability.ability.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                    </div>

                    
                </div>
            </div>
        </div>
  )
}

export default Pokemon