import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {user?.username}</Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>Go to Settings</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.logout]} onPress={() => {
        logout();
        navigation.replace('Login');
      }}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  text: { fontSize: 20, fontWeight: '600' },
  button: { backgroundColor: '#222', padding: 12, borderRadius: 8, alignItems: 'center' },
  logout: { backgroundColor: '#555' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
