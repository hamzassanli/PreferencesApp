import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 const login = async (username) => {
  const newUser = { username };
  setUser(newUser);
  await AsyncStorage.setItem('user', JSON.stringify(newUser));
};

 const logout = async () => {
  setUser(null);
  await AsyncStorage.removeItem('user');
};

  // 1) Uygulama başlangıcında kullanıcıyı yükle
  useEffect(() => {
    AsyncStorage.getItem('user').then((stored) => {
      if (stored) setUser(JSON.parse(stored));
      setLoading(false);
    });
  }, []);

  // 2) user değişince kaydet / sil
  useEffect(() => {
    if (loading) return;

    if (user) {
      AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      AsyncStorage.removeItem('user');
    }
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
