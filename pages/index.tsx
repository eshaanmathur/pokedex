import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import PokemanModal from 'components/PokemanModal';
import { Pokemon, ApiResponse } from 'types';
import { capitalize } from 'utils/capitalize';
import getImageUrl from 'utils/getImageUrl';

interface HomeProps {
  pokemon: Pokemon[];
}

function Home({ pokemon }: HomeProps) {
  const router = useRouter();
  const selectedPokemonId = router.query.id?.toString();
  const pageTitle = selectedPokemonId ? capitalize(pokemon[parseInt(selectedPokemonId) - 1].name) : 'Home';
  const handelModalClose = () => {
    router.push('/');
  };
  return (
    <Layout title={pageTitle}>
      {!!router.query.id && <PokemanModal id={router.query.id.toString()} handelClose={handelModalClose} />}
      <ul>
        {pokemon.map((pokeman, index) => (
          <li key={index}>
            <Link href={`/?id=${index + 1}`} as={`/pokemon/${index + 1}`} scroll={false}>
              <a className="flex items-center p-4 my-2 text-lg capitalize bg-gray-200 border rounded-md border-grey hover:shadow-md">
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

export async function getStaticProps(): Promise<{ props: HomeProps }> {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const data: ApiResponse = await res.json();

    const pokemon = data.results.map((result, idx) => {
      const image = getImageUrl(idx + 1);
      return {
        name: result.name,
        image,
      };
    });
    return { props: { pokemon } };
  } catch (err) {
    console.error(err);
    return { props: { pokemon: [] } };
  }
}

export default Home;
