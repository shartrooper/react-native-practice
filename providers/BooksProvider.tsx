import { QueryAll, QueryFields } from '../constants/QueryStrings';
import { gqlQueryBuilder, queryArranger, mapIntoQueryFieldsArray } from '../utils';
import { client } from '../config/client';
import { gql } from '@apollo/client';
const { AllBooks, AllAuthors } = QueryAll;

const bookKeyQueries = () => {
  const { Author, Title, Published } = QueryFields[AllBooks];
  return [Author, Title, Published];
};

const authorKeyQueries = () => {
  const authorFields = QueryFields[AllAuthors];
  return mapIntoQueryFieldsArray<typeof authorFields>(authorFields);
};

const query = gql`
  ${queryArranger([gqlQueryBuilder(AllBooks, bookKeyQueries()), gqlQueryBuilder(AllAuthors, authorKeyQueries())])}
`;

client
  .query({ query })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => console.log(error));
