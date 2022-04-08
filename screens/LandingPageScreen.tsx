import { StyleSheet } from 'react-native';
import { Button, Text, TextInput, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { Navigators } from '../navigation';

const Separator = () => <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />;

export default function LandingPage({ navigation }: RootStackScreenProps<'Root'>) {
  const toTabs = () => {
    navigation.navigate(Navigators.Tabs);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App's Landing Page</Text>
      <Separator />
      <Text style={styles.textBody}>Please, login to access the Tab section</Text>
      <Separator />
      <TextInput style={styles.input} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" placeholder="Name..." />
      <TextInput style={styles.input} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" placeholder="Password..." />
      <Button title="Press me" onPress={toTabs} />
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
  textBody: {
    textAlign: 'center',
  },
  input: {
    width: '95%',
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
});
