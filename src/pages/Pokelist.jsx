import React, { useEffect, useState } from 'react'
import Pokecard from '../components/Pokecard'
import { Link, useLocation, useNavigate } from 'react-router'

const Pokelist = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search)
    const page = queryParams.get('page') || "1"
    const [pokeList, setPokeList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(page)
    const [totalPages, setTotalPages] = useState(0)
    const itemsPerPage = 21
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {

        const offset = (currentPage - 1) * itemsPerPage

        setPokeList([])
        setIsLoading(true)
        setError(null)

        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`)
        .then(response => {
            if(!response.ok){
                throw new Error("Network response not OK")
            }
            return response.json()
        })
        .then(data => {

            setTotalPages(Math.ceil(data.count / itemsPerPage))

            const fetchedData = data.results.map(pokemon => {
                return fetch(pokemon.url)
                .then(res => res.json())
            })
            return Promise.all(fetchedData)
        })
        .then(pokemons => {
            setPokeList(pokemons)
            setIsLoading(false)
        })
        .catch(error => {
            setError(error.message)
            setIsLoading(false)
        })
    }, [currentPage])
  
    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
        window.scrollTo(0, 0) // Scroll to top when changing page
    }
    
      const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
        window.scrollTo(0, 0) // Scroll to top when changing page
    }
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchInput.trim()) {
            // Convert to lowercase for case-insensitive comparison
            const pageNumber = parseInt(searchInput)
            
            // Check if input is a valid page number
            if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
                setCurrentPage(pageNumber)
                navigate(`/?page=${pageNumber}`)
                window.scrollTo(0, 0)
            } else {
                // Handle invalid page number
                alert(`Please enter a valid page number between 1 and ${totalPages}`)
            }
        }
        setSearchInput('')
    }

    if (isLoading) return <div className='min-w-screen min-h-screen flex justify-center items-center'>Loading Pokemons...</div>
    if (error) return <div>Error occured: {error.message}</div>

    return (
    <div className='pt-22 flex flex-col justify-center align-center max-w-full'>
        <h1 className='text-center text-white text-4xl mt-4 mb-12 justify-center'>PokeList</h1>

        <form onSubmit={handleSearchSubmit} className="flex justify-center my-4 gap-10">
            <input 
                type="text" 
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Enter page number..."
                className="px-4 py-2 text-white border border-gray-300 bg-black rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
                type="submit"
                className="  cursor-pointer text-white bg-gray-900 shadow-lg shadow-indigo-700 trnsition-all
                            duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-600 min-w-24 rounded-lg"
            >
                Go
            </button>
        </form>
        <div className="flex flex-row min-w-50 gap-10 justify-center my-4 ">
            <button className='cursor-pointer text-white bg-gray-900 shadow-lg shadow-indigo-700 trnsition-all
                            duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-600 min-w-24'
            onClick={handlePrevPage} 
            disabled={currentPage === 1 || isLoading}
            >
            Previous
            </button>
            <span className='flex items-center text-white'>Page {currentPage} of {totalPages}</span>
            <button className='cursor-pointer text-white bg-gray-900 shadow-lg shadow-indigo-700 trnsition-all
                            duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-600 min-w-24'
            onClick={handleNextPage} 
            disabled={currentPage === totalPages || isLoading}
            >
            Next
            </button>
        </div>

        <div className='flex flex-wrap text-center justify-center mx-20  max-w-full min-h-100'>
            {pokeList.map(pokemon => (
                <Link key={pokemon.id} to={`/Pokemon/${pokemon.id}?page=${currentPage}` }> 
                    <Pokecard  pokemon={pokemon}/>
                </Link>
            ))}
        </div>
        
    </div>
  )
}

export default Pokelist