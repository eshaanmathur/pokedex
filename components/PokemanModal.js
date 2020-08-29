import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import Pokeman from './Pokeman';
import useLockBodyScroll from '../hook/useLockBodyScroll';

function useFetchPokeman(id) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        const paddedIdx = ('00' + id).slice(-3);
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

function ModalWrapper({ children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>
      {children}
    </div>
  );
}

export default function PokemanModal({ id, handelClose }) {
  const { data, loading } = useFetchPokeman(id);
  useLockBodyScroll();
  if (loading) {
    return (
      <ModalWrapper>
        <Loading className="w-20 h-20 text-gray-100 animate-spin" />
      </ModalWrapper>
    );
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
