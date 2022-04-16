import { ReactNode } from 'react';

export type Author = {
  name: string;
  born?: number | null;
  id?: string;
  bookCount: number;
};

export type Book = {
  title: string;
  published: number;
  author: string;
  id?: string;
  genres: string[];
};

export type Props = {
  children: ReactNode;
};
