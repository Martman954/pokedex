import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useLocation } from "react-router";

const Pokemon = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page");
  const [pokemon, setPokemon] = useState(null);
  const [imageToggled, setImageToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTypeColor = (type) => {
    const colorMap = {
      grass: "#4ade80", // green-400
      fire: "#f97316", // orange-500
      poison: "#c084fc", // purple-400
      bug: "#84cc16", // lime-500
      water: "#0284c7", // sky-600
      normal: "#9ca3af", // gray-400
      flying: "#60a5fa", // blue-400
      psychic: "#f472b6", // pink-400
      electric: "#facc15", // yellow-400
      ground: "#78350f", // amber-900
      fairy: "#e879f9", // fuchsia-400
      fighting: "#7c2d12", // orange-900
      rock: "#fdba74", // orange-300
      ice: "#67e8f9", // cyan-300
      ghost: "#3730a3", // indigo-800
      dragon: "#4f46e5", // indigo-600
      dark: "#713f12", // yellow-900
      steel: "#4b5563", // gray-600
    };
    return colorMap[type] || "#9ca3af"; // Default to gray-400
  };

  const handleImageClick = () => setImageToggled(!imageToggled);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not OK");
        }
        return response.json();
      })
      .then((pokemonData) => {
        setPokemon(pokemonData);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-white text-5xl min-w-screen min-h-screen flex justify-center items-center">
        Loading Pokemon...
      </div>
    );
  }

  if (error) {
    return <div className="text-white text-5xl min-w-screen min-h-screen flex justify-center items-center">Error occurred: {error}</div>;
  }

  if (!pokemon || !pokemon.types || pokemon.types.length === 0) {
    return <div>No types available for this Pokémon.</div>;
  }

  const primaryType = pokemon.types[0].type.name;
  const primaryColor = getTypeColor(primaryType);
  const secondaryType =
    pokemon.types.length > 1 ? pokemon.types[1].type.name : null;
  const secondaryColor = secondaryType ? getTypeColor(secondaryType) : null;

  const imageSrc = imageToggled
    ? pokemon.sprites.back_default
    : pokemon.sprites.front_default;

  return (
    <div
      className="flex justify-center my-22 w-full"
      
    >
      <Link
        to={`/?page=${page}`}
        className="absolute md:right-10 right-4 top-26 sm:px-2 md:px-4 px-1 sm:py-2 md:py-4 py-1 
                            bg-gray-400/70 rounded-lg text-white bg-gray-900 shadow-lg shadow-indigo-700 transition-all
                            duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-600"
      >
        Back
      </Link>
      <div
        className="rounded-lg border border-indigo-600 py-3 pb-12 min-h-190 w-200 sm:w-400 md:w-1/2 mx-0 sm:mx-4
                            text-white bg-gray-900 shadow-lg shadow-indigo-700 transition-all
                            duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-600 cursor-pointer"
        style={{
          boxShadow: `0 0 10px 2px ${primaryColor}`,
          "--tw-shadow-color": primaryColor,
        }}
        onClick={handleImageClick}
      >
        <h1 className="text-center text-4xl sm:text-8xl pb-2 flex flex-col items-center pt-6 ">
          {pokemon.name}
        </h1>

        <div className="flex flex-col">
          <div className="flex flex-col w-full items-center">
            <ul className="flex flex-wrap content-center justify-center gap-5 md:gap-4 sm:gap-2">
              <li
                className={`px-2 py-2 my-1 rounded-lg px-1 py-1 text-2xl sm:text-3xl md:text-4xl text-white font-bold shadow-lg`}
                style={{ backgroundColor: primaryColor }}
              >
                {pokemon.types[0].type.name}
              </li>
              {secondaryType && (
                <li
                  className={`px-2 py-2 my-1 rounded-lg px-1 py-1 text-2xl sm:text-3xl md:text-4xl text-white font-bold shadow-lg`}
                  style={{ backgroundColor: secondaryColor }}
                >
                  {secondaryType}
                </li>
              )}
            </ul>
            <img
              src={imageSrc}
              alt={pokemon.name}
              className="w-70 pt-6 sm:pt-0"
            />
            <div className="flex flex-row sm:flex-col justify-center">
              <div className="text-center text-xl pb-2 mx-2">
                <h2 className="text-4xl pb-2">Stats</h2>
                <p>Weight: {pokemon.weight}</p>
                <p>Height: {pokemon.height}</p>
              </div>
              <div className="text-center text-xl mx-2">
                <h2 className="text-4xl pb-2">Abilities</h2>
                <ul className="text-center text-xl">
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
  );
};

export default Pokemon;
