export default function getImageUrl(pokemonId: number) {
  const paddedIdx = pokemonId.toString().padStart(3, '0');
  const image = `/assets/images/${paddedIdx}.png`;
  return image;
}
