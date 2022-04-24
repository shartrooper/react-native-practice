import { ApolloError, useQuery } from '@apollo/client';
import { useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import ShowDataList from '../components/ShowDataList';
import { Button, Text, View } from '../components/Themed';
import { ALL_QUERY } from '../constants/Booksqueries';
import { LibraryData, Book, Author } from '../generaltypes';
import { ErrorContext } from '../providers/ErrorMsgProvider';
import { RootTabScreenProps } from '../types';
import AuthorBirthYearForm from './forms/AuthorBirthYear';

const AUTHORS_HEADER = ['name', 'born', 'bookCount'];
const BOOKS_HEADER = ['title', 'author', 'published'];

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  // const [authorName, setName] = useState<string>('');
  const errorModalContext = useContext(ErrorContext);
  const [header, setHeader] = useState<string[]>(AUTHORS_HEADER);
  const [queryByAuthor, setQueryByAuthor] = useState<string | null>(null);
  const sendError = (error: ApolloError) => {
    const errorMsg = error.graphQLErrors.length ? error.graphQLErrors[0].message : error.message;
    errorModalContext.displayErrorModal(errorMsg, navigation);
  };
  const { data, loading } = useQuery<LibraryData>(ALL_QUERY, {
    variables: { author: queryByAuthor, genre: null },
    onError: error => sendError(error),
    // pollInterval: 3000,
  });

  const getHeaderKeysData = <D extends Book | Author>(headers: string[], items: D[]) => {
    if (!items.length) return [];
    const listData = items.map((item, index) => {
      let newItem = { id: '' };
      for (const key in item) {
        if (headers.find(header => header === key)) {
          if (!item[key]) {
            continue;
          }
          newItem = { ...newItem, [key]: item[key] };
        }
      }
      return { ...newItem, id: `author-${index}` };
    });
    return listData;
  };

  const headerData = useMemo(() => {
    if (!data) return [];
    switch (header) {
      case BOOKS_HEADER:
        return getHeaderKeysData(header, data.allBooks);
      default:
        return getHeaderKeysData(header, data.allAuthors);
    }
  }, [header, data]);

  /*useEffect(() => {
    const timer = setTimeout(() => {
      setQueryByAuthor(authorName);
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, [authorName]);*/

  const SetupShowDataList = () => <ShowDataList headers={header} itemsData={headerData} />;

  const AuthorForm = () => {
    const authorsArray = data
      ? data.allAuthors.reduce((acc: string[], current) => {
          return [...acc, current.name];
        }, [])
      : [];

    return header === AUTHORS_HEADER ? <AuthorBirthYearForm authors={authorsArray} handleErrorMsg={sendError} /> : null;
  };

  const ToggleDataButton = () => {
    const toggleData = () => {
      if (header === AUTHORS_HEADER) {
        setHeader(BOOKS_HEADER);
        return;
      }
      setHeader(AUTHORS_HEADER);
    };
    return <Button title={header === AUTHORS_HEADER ? 'authors' : 'books'} onPress={toggleData} />;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ToggleDataButton />
      <SetupShowDataList />
      <AuthorForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: '95%',
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
});
