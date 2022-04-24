import { ApolloError, useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { NativeSyntheticEvent, NativeTouchEvent, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, Button, TextInput } from '../components/Themed';
import { ADD_BOOK, ALL_QUERY } from '../constants/Booksqueries';
import { AuthContext } from '../providers/AuthProvider';
import { ErrorContext } from '../providers/ErrorMsgProvider';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [title, setTitle] = useState('');
  const [published, setPublished] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const errorModalContext = useContext(ErrorContext);

  const sendError = (error: ApolloError) => {
    const errorMsg = error.graphQLErrors[0]?.message ? error.graphQLErrors[0].message : error.message;
    errorModalContext.displayErrorModal(errorMsg, navigation);
  };

  const [createBookRecord] = useMutation(ADD_BOOK, {
    onError: error => sendError(error),
    refetchQueries: [ALL_QUERY],
  });
  const { signOut } = useContext(AuthContext);

  const submit = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    e.preventDefault();
    const vars = { variables: { title, published: Number(published), author, genres: [genre] } };
    createBookRecord(vars);
    setTitle('');
    setPublished('');
    setAuthor('');
    setGenre('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
        placeholder="Title..."
      />
      <TextInput
        value={published}
        onChangeText={setPublished}
        keyboardType={'numeric'}
        style={styles.input}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
        placeholder="Published..."
      />
      <TextInput
        value={author}
        onChangeText={setAuthor}
        style={styles.input}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
        placeholder="Author..."
      />
      <TextInput
        value={genre}
        onChangeText={setGenre}
        style={styles.input}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
        placeholder="Input genre..."
      />
      <Button title="Submit book" onPress={submit} />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Button title="Sign Out" onPress={signOut} />
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
