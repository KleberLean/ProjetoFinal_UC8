import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList} from '../../routes/types'
import { useAuth } from '../../contexts/AuthContext';

import {saveToken} from '../../services/authStorage';
import { login } from '../../services/accounts/login';

export default function SignIn() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (email === "" || senha === "") {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
  
    try {
      const response = await login(email, senha);
      await signIn(response.token); 
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro", error.message);
      } else {
        Alert.alert("Erro", "Falha ao fazer login");
      }
    }
  };
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Sua senha"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004A8D",
  },

  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  },

  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  
  title: {
    fontSize: 20,
    marginTop: 28,
  },

  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#007bff',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
  },

  registerText: {
    color: '#a1a1a1',
  },



});