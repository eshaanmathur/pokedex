export type ORNull<T> = T | null;
export interface ApiResponse {
  results: { [key: string]: any }[];
}

export interface PokemonApiRespone {
  id: number;
  [key: string]: any;
}

export interface Pokemon {
  name: string;
  image: string;
}

export interface PokemonData {
  name: string;
  image: string;
  weight: number;
  height: number;
  types: { type: { name: string } }[];
}
