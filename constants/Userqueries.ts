import { queryArranger, gqlQueryBuilder, mapIntoQueryFieldsArray } from '../utils';
import { gql } from '@apollo/client';
import { Mutations, QueryFields, BodyParams } from './QueryStrings'
const { token } = QueryFields;
const { login: loginRequestParam } = BodyParams;
const { Login  } = Mutations;

// Helper
const loginQueryBuilder = () =>{
    const loginResultValueField= mapIntoQueryFieldsArray<typeof token>(token);
    const loginOperation = gqlQueryBuilder(Login,loginResultValueField,loginRequestParam)
    return gql`${queryArranger([loginOperation],loginRequestParam,'mutation')}`
}

export const USER_LOGIN = loginQueryBuilder();