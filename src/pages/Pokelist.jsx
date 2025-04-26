import React, { useEffect, useState } from 'react'
import Pokecard from '../components/Pokecard'

const Pokelist = () => {
  
    const [pokeList, setPokeList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 21;

    useEffect(() => {

        const offset = (currentPage - 1) * itemsPerPage;

        setPokeList([])
        setIsLoading(true)
        setError(null)

        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`)
        .then(response => {
            if(!response.ok){
                throw new Error("Network response not OK")
            }
            return response.json();
        })
        .then(data => {

            setTotalPages(Math.ceil(data.count / itemsPerPage))

            const fetchedData = data.results.map(pokemon => {
                return fetch(pokemon.url)
                .then(res => res.json())
            })
            return Promise.all(fetchedData)
        })
        .then(detailedPokemon => {
            setPokeList(detailedPokemon)
            setIsLoading(false)
        })
        .catch(error => {
            setError(error.message)
            setIsLoading(false)
        })
    }, [currentPage])
  
    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
        window.scrollTo(0, 0); // Scroll to top when changing page
    }
    
      const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
        window.scrollTo(0, 0); // Scroll to top when changing page
    }


    if (isLoading) return <div className='min-w-screen min-h-screen flex justify-center items-center'>Loading Pokemons...</div>
    if (error) return <div>Error occured: {error.message}</div>

    return (
    <>
        <h1 className='text-center text-4xl my-2 justify-center'>PokeList</h1>

        <div className="flex flex-row min-w-50 gap-10 justify-center my-4 ">
            <button className='cursor-pointer bg-gray-200 rounded-xl px-4 py-4 hover:bg-gray-300 min-w-24'
            onClick={handlePrevPage} 
            disabled={currentPage === 1 || isLoading}
            >
            Previous
            </button>
            <span className='flex items-center'>Page {currentPage} of {totalPages}</span>
            <button className='cursor-pointer bg-gray-200 rounded-xl px-4 py-4 hover:bg-gray-300 min-w-24'
            onClick={handleNextPage} 
            disabled={currentPage === totalPages || isLoading}
            >
            Next
            </button>
        </div>

        <div className='flex flex-wrap text-center justify-center mx-20  max-w-full min-h-100'>
            {pokeList.map(pokemon => (
                <Pokecard key={pokemon.id} pokemon={pokemon}/>
            ))}
        </div>
    </>
  )
}

export default Pokelist