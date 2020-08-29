import { useRouter } from 'next/router';
import Layout from '../../components/Layouts';
import Link from 'next/link';

function Pokeman({ pokeman }) {
  return (
    <div className="p-10 bg-gray-100 rounded shadow-md">
      <h1 className="mb-2 text-4xl text-center capitalize">{pokeman.name}</h1>
      <img className="mx-auto" src={pokeman.image} alt={pokeman.name} />
      <div className="text-center">
        <p>
          <span className="mr-2 text-xs font-bold uppercase">Weight:</span> {pokeman.weight}
        </p>
        <p>
          <span className="mr-2 text-xs font-bold uppercase">Height:</span>
          {pokeman.height}
        </p>
        <h2 className="mt-6 mb-2 text-2xl">Types</h2>
        <div className="flex justify-center space-x-4">
          {pokeman.types.map((type, index) => (
            <p className="px-4 py-1 text-sm font-semibold text-gray-100 uppercase bg-gray-700 rounded" key={index}>
              {type.type.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PokemonPage({ pokeman }) {
  return (
    <Layout>
      <Pokeman pokeman={pokeman} />
      <p className="mt-10 text-center">
        <Link href="/">
          <a className="text-base font-extrabold uppercase">[ home ]</a>
        </Link>
      </p>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const id = ctx.params.id;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    const paddedIdx = ('00' + data.id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIdx}.png`;
    return { props: { pokeman: { ...data, image } } };
  } catch (err) {
    console.error(err);
    return { props: { pokeman: null } };
  }
}
