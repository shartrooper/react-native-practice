import { Button, TextInput, View, Text } from '../../components/Themed';
import { NativeSyntheticEvent, NativeTouchEvent, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ALL_QUERY, EDIT_AUTHOR_BIRTH } from '../../constants/Booksqueries';
import { ApolloError, useMutation } from '@apollo/client';
import { useState } from 'react';

type Prop = {
  authors: string[];
  handleErrorMsg: (error: ApolloError) => void;
};

export default function AuthorBirthYearForm({ authors, handleErrorMsg }: Prop) {
  const [authorName, setAuthorName] = useState('');
  const [born, setBornYear] = useState('');
  const [editAuthorRecord] = useMutation(EDIT_AUTHOR_BIRTH, {
    onError: error => handleErrorMsg(error),
    refetchQueries: [ALL_QUERY],
  });

  const updateBirthYear = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    e.preventDefault();
    const vars = { variables: { name: authorName, setBornTo: Number(born) } };
    editAuthorRecord(vars);
    setAuthorName('');
    setBornYear('');
  };

  return (
    <>
      <Text style={styles.title}>Author Form</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.container}>
        <Picker selectedValue={authorName} onValueChange={itemValue => setAuthorName(itemValue)} style={styles.input}>
          {authors.map((author, index) => (
            <Picker.Item key={`author-selector-${index}`} label={author} value={author} />
          ))}
        </Picker>
        <TextInput
          value={born}
          onChangeText={setBornYear}
          keyboardType={'numeric'}
          style={styles.input}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
          placeholder="Birth year..."
        />
        <Button title="Update Author" onPress={updateBirthYear} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: 25,
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
    margin: 10,
    padding: 10,
    borderWidth: 1,
  },
});
