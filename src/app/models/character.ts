export interface Character {
  /** Unique identifier for the character */
  id: number;
  /** Name of the character */
  name: string;
  /** Current status (e.g., "Alive", "Dead", "unknown") */
  status: string;
  /** Species of the character (e.g., "Human", "Alien") */
  species: string;
  /** URL to the character's image */
  image: string;
}

export interface ApiResponse {
  /** Array of Character objects returned by the API */
  results: Character[];
}
