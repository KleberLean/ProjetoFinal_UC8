import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import {useNavigation} from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.title}>Bem Vindo ao Senac Zeladoria!</Text>
        <Text style={styles.text}>Faça seu login para começar</Text>

        <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004A8D",
  },

  containerForm: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
