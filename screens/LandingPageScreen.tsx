import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function LandingPage({ navigation }: RootStackScreenProps<'Root'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App's Landing Page</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
