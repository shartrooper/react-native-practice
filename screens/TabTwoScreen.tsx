import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { ALL_QUERY } from '../constants/Booksqueries';
import { LibraryData, Book, Author } from '../generaltypes';

export default function TabTwoScreen() {
  const { data, loading } = useQuery<LibraryData>(ALL_QUERY, { variables: { author: null, genre: null } });
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
        {itemValues.map((pair,index) => {
          let [key, value] = pair;
          if (Array.isArray(value)) {
            value = value.join();
          }
          return(<Text key={index}>
            {key}:{value}
          </Text>);
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList data={data?.allBooks} renderItem={renderItems} keyExtractor={item => item.author + item.published.toString()} />
      <FlatList data={data?.allAuthors} renderItem={renderItems} keyExtractor={item => item.name.toLocaleUpperCase() + item.bookCount} />
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
});
