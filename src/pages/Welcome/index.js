import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text>Tela Bem vindo</Text>

      <view>
        <Image 
        source={require('../../../assets/R.jpg')}
        />
      </view>
    </View>
  );
}

const styles = StyleSheet.create({
container: {

}

});