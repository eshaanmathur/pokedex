import React, { useEffect, useState, FC } from 'react';
import useLockBodyScroll from 'hook/useLockBodyScroll';
import Loading from 'components/Loading';
import Pokeman from 'components/Pokeman';
import { PokemonData, ORNull } from 'types';


function useFetchPokeman<R>(id: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ORNull<any>>(null);
  const [data, setData] = useState<ORNull<R>>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        const paddedIdx = id.padStart(3, '0');
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIdx}.png`;
        setData({ ...data, image });
        setLoading(false);
      } catch (err) {
        setError(err);
        console.error(err);
        setLoading(false);
      }
    })();
  }, [id]);

  return { data, error, loading };
}

const ModalWrapper: FC = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
      {children}
    </div>
  );
}

interface Props {
  id: string;
  handelClose: () => void;
}

const PokemanModal: FC<Props> = ({ id, handelClose }) => {
  const { data, loading, error } = useFetchPokeman<PokemonData>(id);

  useLockBodyScroll();

  if (loading) {
    return (
      <ModalWrapper>
        <Loading className="w-20 h-20 text-gray-100 animate-spin" />
      </ModalWrapper>
    );
  }

  if (data === null || error) {
    return (
      <ModalWrapper>
        <div className="flex flex-col w-full max-w-2xl mx-4 md:w-7/12">
          <button className="py-4 text-sm font-bold text-gray-100 uppercase" onClick={handelClose}>
            [x] close
        </button>
          <div className="flex items-center justify-center py-20 bg-gray-100 rounded">
            <p className="font-bold text-gray-700">No Data found</p>
          </div>
        </div>
      </ModalWrapper>
    )
  }

  return (
    <ModalWrapper>
      <div className="flex flex-col w-full max-w-2xl mx-4 md:w-7/12">
        <button className="py-4 text-sm font-bold text-gray-100 uppercase" onClick={handelClose}>
          [x] close
        </button>
        <Pokeman pokeman={data} />
      </div>
    </ModalWrapper>
  );
}


export default PokemanModal;
