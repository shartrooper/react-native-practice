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

export enum QueryAll {
  AllBooks = 'allBooks',
  AllAuthors = 'allAuthors',
}

export const QueryParams = {
  [QueryAll.AllBooks]: ['$author: String', '$genre: String'],
  [QueryAll.AllAuthors]: null,
};

export const QueryFields = {
  [QueryAll.AllAuthors]: { ...AuthorQueryFields },
  [QueryAll.AllBooks]: { ...BookQueryFields },
};

export enum Mutations {
  AddBook = 'addBook',
  EditAuthor = 'editAuthor',
}

export const BodyParams = {
  [Mutations.AddBook]: ['$title: String!', '$published: Int!', '$author: String!', '$genres: [String!]'],
  [Mutations.EditAuthor]: ['$name: String!', '$setBornTo: Int!'],
};
