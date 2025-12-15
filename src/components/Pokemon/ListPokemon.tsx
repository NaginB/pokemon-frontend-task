import { useEffect, useState } from "react";
import axios from "axios";
import { APIURL } from "../../utils/constants";
import { apis } from "../../utils/apis";
import PokemonCard from "./PokemonCard";

const ListPokemon = ({ searchedName }: { searchedName: string }) => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [filters, setFilters] = useState({});
  const [nextUrl, setNextUrl] = useState("");
  const [total, setTotal] = useState(0);

  const fetchPokemons = async () => {
    try {
      const { data } = await axios.get(`${APIURL}${apis.pokemon.list}`, {
        params: filters,
      });
      setPokemons(data.data);
      setNextUrl(data.next);
      setTotal(data.total);
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  };

  const handleLoadMore = async () => {
    try {
      const { data } = await axios.get(nextUrl);
      setPokemons((prev) => [...prev, ...data.data]);
      setNextUrl(data.next);
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  };

  const handleFilters = (event: any) => {
    const { id, value } = event.target;
    if (!value) {
      const newFilters = { ...filters };
      // @ts-ignore
      delete newFilters[id];
      setFilters(newFilters);
    } else
      setFilters({
        ...filters,
        [id]: value,
      });
  };

  useEffect(() => {
    fetchPokemons();
  }, [filters]);

  useEffect(() => {
    if (searchedName) setFilters((prev) => ({ ...prev, q: searchedName }));
    else {
      const newFilters = { ...filters };
      // @ts-ignore
      delete newFilters.q;
      setFilters(newFilters);
    }
  }, [searchedName]);

  return (
    <div className="!mt-20">
      <div className="flex items-center justify-end !gap-5 !px-20 !pb-10">
        <select id="sort" onChange={handleFilters}>
          <option value="">Select Sort</option>
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="hp">HP</option>
          <option value="attack">Attack</option>
          <option value="defense">Defense</option>
          <option value="spattack">Special Attack</option>
          <option value="spdefense">Special Defense</option>
          <option value="speed">Speed</option>
          <option value="total">Total</option>
        </select>

        <select id="order" onChange={handleFilters}>
          <option value="">Select Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select id="type" onChange={handleFilters}>
          <option value="">Select Bug</option>
          <option value="Dark">Dark</option>
          <option value="Dragon">Dragon</option>
          <option value="Electric">Electric</option>
          <option value="Fairy">Fairy</option>
          <option value="Fighting">Fighting</option>
          <option value="Fire">Fire</option>
          <option value="Flying">Flying</option>
          <option value="Ghost">Ghost</option>
          <option value="Grass">Grass</option>
          <option value="Ground">Ground</option>
          <option value="Ice">Ice</option>
          <option value="Normal">Normal</option>
          <option value="Poison">Poison</option>
          <option value="Psychic">Psychic</option>
          <option value="Rock">Rock</option>
          <option value="Steel">Steel</option>
          <option value="Water">Water</option>
        </select>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:gril-cols-1 gap-5 !px-20">
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            index={index}
            pokemon={pokemon}
            key={`pokemon-${pokemon.id}`}
          />
        ))}
      </div>

      {pokemons.length < total && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="bg-[#F34D61] text-white capitalize rounded-full !px-5 !py-3 !my-10 cursor-pointer"
          >
            load more
          </button>
        </div>
      )}
    </div>
  );
};

export default ListPokemon;
