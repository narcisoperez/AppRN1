import React, { Component } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

// Estilos para ambos componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6666',
    width: '100%'
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCCCFF',
    width: '100%'
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 50,
  }
});

class App extends Component {
  state = {
    data: ''
  };

  componentDidMount = () => {
    this.fetchTime();
    this.interval = setInterval(this.fetchTime, 1000); // Actualiza la hora cada segundo
  };

  componentWillUnmount = () => {
    clearInterval(this.interval); // Limpia el intervalo al desmontar
  };

  fetchTime = () => {
    fetch('http://192.168.1.16/time', {  // Cambia la IP según tu configuración
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({ data: responseJson });
    })
    .catch((error) => {
      console.error(error);
    });
  };

  sendMessage = () => {
    fetch('http://192.168.1.16/msj', {  // Cambia la IP y puerto si es necesario
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: '¡Hola desde el botón de React Native!'
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      Alert.alert('Mensaje enviado con éxito', responseJson.message);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Sección superior para la hora */}
        <View style={styles.topSection}>
          <Text style={styles.bigBlue}>
            {this.state.data.time}
          </Text>
        </View>

        {/* Sección inferior para el botón */}
        <View style={styles.bottomSection}>
          <Button
            title="Enviar mensaje"
            onPress={this.sendMessage}
          />
        </View>
      </View>
    );
  }
}

export default App;
