import { queryArranger, gqlQueryBuilder, mapIntoQueryFieldsArray } from '../utils';
import { gql } from '@apollo/client';
import { QueryAll, QueryFields, QueryParams, Mutations, BodyParams } from './QueryStrings';
const { AllAuthors, AllBooks } = QueryAll;
const { allBooks: bookParams } = QueryParams;
const { addBook: addBookParams } = BodyParams;

// Helpers
const allQueryBuilder = () => {
  const bookKeyQueries = () => {
    const bookFields = QueryFields[AllBooks];
    return mapIntoQueryFieldsArray<typeof bookFields>(bookFields);
  };

  const authorKeyQueries = () => {
    const authorFields = QueryFields[AllAuthors];
    return mapIntoQueryFieldsArray<typeof authorFields>(authorFields);
  };

  const allBooksQuery = gqlQueryBuilder(AllBooks, bookKeyQueries(), bookParams);
  const allAuthorsQuery = gqlQueryBuilder(AllAuthors, authorKeyQueries());
  return gql`
    ${queryArranger([allBooksQuery, allAuthorsQuery], bookParams)}
  `;
};

const addBookQueryBuilder = () => {
  const bookBodyFields = () => {
    const { Title, Author, Genres } = QueryFields[AllBooks];
    return mapIntoQueryFieldsArray({ Title, Author, Genres });
  };

  const addBookQuery = gqlQueryBuilder(Mutations.AddBook, bookBodyFields(), addBookParams);
  console.log(queryArranger([addBookQuery], addBookParams, 'mutation'));
  return gql`
    ${queryArranger([addBookQuery], addBookParams, 'mutation')}
  `;
};

// Accept author and genre as parameters.
export const ALL_QUERY = allQueryBuilder();

// Add Book query mutation
export const ADD_BOOK = addBookQueryBuilder();
