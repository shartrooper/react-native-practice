import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, TextInput, View } from '../components/Themed';
import { AuthContext } from '../providers/AuthProvider';
import { RootStackScreenProps } from '../types';

const Separator = () => <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />;

export default function LandingPage({ navigation }: RootStackScreenProps<'Root'>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App's Landing Page</Text>
      <Separator />
      <Text style={styles.textBody}>Please, login to access the Tab section</Text>
      <Separator />
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
        placeholder="Name..."
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
        placeholder="Password..."
      />
      <Button title="Sign In" onPress={() => signIn({ username, password })} />
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
