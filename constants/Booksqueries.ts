import { queryArranger, gqlQueryBuilder, mapIntoQueryFieldsArray } from '../utils';
import { gql } from '@apollo/client';
import { QueryAll, QueryFields, QueryParams } from './QueryStrings';
const { AllAuthors, AllBooks } = QueryAll;
const { allBooks: bookParams } = QueryParams;

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

// Accept author and genre as parameters.
export const ALL_QUERY = allQueryBuilder();
