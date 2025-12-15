import { useMemo } from "react";

interface Prop {
  pokemon: any;
  index: number;
}
const PokemonCard = ({ pokemon, index }: Prop) => {
  return (
    <div className="w-max-[320px] w-full !mx-auto relative rounded !p-2 flex flex-col h-[340px] bg-[#74CB48]">
      <div className="flex-1">
        <div className="flex justify-end text-lg font-bold text-white">
          #00{pokemon.id}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white rounded">
        <h3 className="text-lg font-bold text-[#74CB48]">
          {pokemon.name.english}
        </h3>
      </div>

      <img
        className="w-36 aspect-square absolute pokemon-card-img"
        src={pokemon.image.hires}
        alt=""
      />
    </div>
  );
};

export default PokemonCard;
