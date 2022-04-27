enum BookQueryFields {
  Title = 'title',
  Published = 'published',
  Author = 'author',
  Genres = 'genres',
}

enum AuthorQueryFields {
  Name = 'name',
  Born = 'born',
  BookCount = 'bookCount',
}

enum tokenQueryFields {
  Value='value'
}

export enum QueryAll {
  AllBooks = 'allBooks',
  AllAuthors = 'allAuthors',
  Token ='token'
}

export const QueryParams = {
  [QueryAll.AllBooks]: ['$author: String', '$genre: String'],
  [QueryAll.AllAuthors]: null,
};

export const QueryFields = {
  [QueryAll.AllAuthors]: { ...AuthorQueryFields },
  [QueryAll.AllBooks]: { ...BookQueryFields },
  [QueryAll.Token]: {...tokenQueryFields}
};

export enum Mutations {
  AddBook = 'addBook',
  EditAuthor = 'editAuthor',
  Login = 'login'
}

export const BodyParams = {
  [Mutations.AddBook]: ['$title: String!', '$published: Int!', '$author: String!', '$genres: [String!]'],
  [Mutations.EditAuthor]: ['$name: String!', '$setBornTo: Int!'],
  [Mutations.Login]: ['$username: String!','$password: String!']
};
