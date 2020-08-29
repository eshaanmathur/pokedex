import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../components/Layouts';
import PokemanModal from '../components/PokemanModal';

export default function Home({ pokemon }) {
  const router = useRouter();
  const modalOpen = !!router.query.id;
  const handelModalClose = () => {
    router.push('/');
  };
  return (
    <Layout>
      {modalOpen && <PokemanModal id={router.query.id} handelClose={handelModalClose} />}
      <ul>
        {pokemon.map((pokeman, index) => (
          <li key={index}>
            <Link href={`/?id=${index + 1}`} as={`/pokemon/${index + 1}`} scroll={false}>
              <a className="flex items-center p-4 my-2 text-lg capitalize bg-gray-200 border border-grey hover:shadow-md rounded-md">
                <img src={pokeman.image} alt={pokeman.name} className="w-20 h-20 mr-3" />
                <span className="mr-2 font-bold">{index + 1}.</span>
                {pokeman.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const data = await res.json();

    const pokemon = data.results.map((result, idx) => {
      const paddedIdx = ('00' + (1 + idx)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIdx}.png`;
      return {
        ...result,
        image,
      };
    });
    return { props: { pokemon } };
  } catch (err) {
    console.error(err);
    return { props: { pokemon: [] } };
  }
}
