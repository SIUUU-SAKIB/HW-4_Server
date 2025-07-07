export type Genre = "DRAMA" | "HISTORY" | "FICTION" | "SCIENCE" | "NON-FICTION" | "ADVENTURE"
export interface IBook {
  image: string,
  title: string,
  author: string
  genre: Genre,
  isbn: number
  description: string
  copies: number
  available: boolean
}
