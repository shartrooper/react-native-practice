export type Author = {
  name: string;
  born?: number;
  id: string;
  bookCount: number;
};

export type Book = {
  title: string;
  published: number;
  author: string;
  id: string;
  genres: string[];
};
