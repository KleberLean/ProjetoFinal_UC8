import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
const TOKEN_KEY = '@auth_token';
const [isAuthenticated, setIsAuthenticated] = useState(false);

export async function saveToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function getToken() {
  return await AsyncStorage.getItem(TOKEN_KEY);
}

export async function removeToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

async function signIn(token: string) {
  await saveToken(token); 
  setIsAuthenticated(true);
}