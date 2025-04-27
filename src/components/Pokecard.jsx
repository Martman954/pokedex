import React from "react";

const Pokecard = ({ pokemon }) => {
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

  const primaryType = pokemon.types[0].type.name;
  const primaryColor = getTypeColor(primaryType);
  const secondaryType =
    pokemon.types.length > 1 ? pokemon.types[1].type.name : null;
  const secondaryColor = secondaryType ? getTypeColor(secondaryType) : null;

  return (
    <>
      <div
        className={`flex flex-col min-w-20 min-h-20 sm:min-w-40 sm:min-h-40 
                        px-2 py-2 mx-2 my-2 rounded-xl text-white bg-gray-900 shadow-lg  transition-all
                            duration-300 hover:-translate-y-2`}
        style={{
          boxShadow: `0 0 10px 2px ${primaryColor}`,
          "--tw-shadow-color": primaryColor,
        }}
      >
        <h2 className="text-xl">{pokemon.name}</h2>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="h-40 w-40"
        />
        <ul className="flex flex-wrap content-center gap-2 justify-center">
          <li
            className={`bg-gray-200 rounded-lg px-1 py-1 text-white font-bold shadow-lg`}
            style={{ backgroundColor: primaryColor }}
          >
            {pokemon.types[0].type.name}
          </li>
          {pokemon.types.length > 1 ? (
            <li
              className={`bg-gray-200 rounded-lg px-1 py-1 text-white font-bold shadow-lg`}
              style={{ backgroundColor: secondaryColor }}
            >
              {pokemon.types[1].type.name}
            </li>
          ) : (
            ""
          )}
        </ul>
        <p>Weight: {pokemon.weight}</p>
      </div>
    </>
  );
};

export default Pokecard;
