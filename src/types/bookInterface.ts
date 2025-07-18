export type Genre = "Drama" | "History" | "Fiction" | "Science" | "Non-Fiction" | "Adventure" | "Biography" | "Others"
export interface IBook {
  image: string,
  title: string,
  author: string
  genre: Genre,
  isbn: number
  description: string
  copies: number
  available: boolean, published: number
}
