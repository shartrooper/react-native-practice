import { queryArranger, gqlQueryBuilder, mapIntoQueryFieldsArray } from '../utils';
import { gql } from '@apollo/client';
import { QueryAll, QueryFields, QueryParams, Mutations, BodyParams } from './QueryStrings';
const { AllAuthors, AllBooks } = QueryAll;
const { allBooks: bookParams } = QueryParams;
const { addBook: addBookParams, editAuthor: editAuthorParams } = BodyParams;

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
  return gql`
    ${queryArranger([addBookQuery], addBookParams, 'mutation')}
  `;
};

const editAuthorQueryBuilder = () => {
  const authorBodyFields = () => {
    const { Name, Born } = QueryFields[AllAuthors];
    return mapIntoQueryFieldsArray({ Name, Born });
  };

  const addAuthorEditQuery = gqlQueryBuilder(Mutations.EditAuthor, authorBodyFields(), editAuthorParams);
  return gql`
    ${queryArranger([addAuthorEditQuery], editAuthorParams, 'mutation')}
  `;
};

const fetchAuthorsQueryBuilder = () => {
  const authorKeyQueries = () => {
    const authorFields = QueryFields[AllAuthors];
    return mapIntoQueryFieldsArray<typeof authorFields>(authorFields);
  };
  const allAuthorsQuery = gqlQueryBuilder(AllAuthors, authorKeyQueries());
  return gql`
   ${queryArranger([allAuthorsQuery])}
  `;
};

// Accept author and genre as parameters.
export const ALL_QUERY = allQueryBuilder();

// Add Book query mutation
export const ADD_BOOK = addBookQueryBuilder();

// Fetch all authors
export const ALL_AUTHORS = fetchAuthorsQueryBuilder();

// Update an Author BirthYear field
export const EDIT_AUTHOR_BIRTH = editAuthorQueryBuilder();
