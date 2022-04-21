import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, TextInput, View } from '../components/Themed';
import { ALL_QUERY } from '../constants/Booksqueries';
import { LibraryData } from '../generaltypes';
import { RootTabScreenProps } from '../types';

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  const [authorName, setName] = useState<string>('');
  const [queryByAuthor, setQueryByAuthor] = useState<string | null>(null);
  const { data, loading } = useQuery<LibraryData>(ALL_QUERY, {
    variables: { author: queryByAuthor, genre: null },
    pollInterval: 3000,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryByAuthor(authorName);
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    );
  }

  function renderItems<E>({ item }: { item: E }) {
    const itemValues = Object.entries(item);
    return (
      <View style={styles.container}>
        {itemValues.map((pair, index) => {
          let [key, value] = pair;
          if (Array.isArray(value)) {
            value = value.join();
          }
          return (
            <Text key={index}>
              {key}:{value}
            </Text>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput
        value={authorName}
        onChangeText={setName}
        style={styles.input}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
        placeholder="Name..."
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        data={data?.allBooks}
        renderItem={renderItems}
        keyExtractor={item => item.author + item.published.toString()}
      />
      <FlatList
        data={data?.allAuthors}
        renderItem={renderItems}
        keyExtractor={item => item.name.toLocaleUpperCase() + item.bookCount}
      />
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
