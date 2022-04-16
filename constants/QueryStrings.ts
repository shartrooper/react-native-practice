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
