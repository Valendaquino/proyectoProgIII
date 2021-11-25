import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, } from "react-native";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      err: false,
      showME: true,

    };
  }
  navigationToLogin() {
    this.props.screenProps.navigation.navigate('Login')
  }
  clearErr() {
    this.setState({
      err: true
    })
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        showME: false
      })
    },
      3000)
  }




  render() {

    return (
      <View style={styles.containerRegister}>
        {
          this.state.showME ?
            <ActivityIndicator
              style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}
              size="large"
              color="#7BBBFA" />
            :
            <View style={styles.containerRegister}>
              { //preguntar si se puede
                this.state.err ? (
                  <Text style={styles.hide}>{this.props.error}</Text>
                ) : (
                    <Text>{this.props.error}</Text>
                  )
              }
              <img src="https://img.icons8.com/external-inipagistudio-mixed-inipagistudio/64/000000/external-registration-form-online-therapy-inipagistudio-mixed-inipagistudio.png" />
              <TextInput style={styles.containerInput}
                onKeyPress={() => this.clearErr()}
                onChangeText={(text) => this.setState({ email: text })}
                placeholder="email"
                keyboardType="email-address"
              />
              <TextInput
                style={styles.containerInput}
                onChangeText={(text) => this.setState({ userName: text })}
                placeholder='user name'
                keyboardType='default' />
              <TextInput style={styles.containerInput}
                onChangeText={(text) => this.setState({ password: text })}
                placeholder="password"
                keyboardType="email-address"
                secureTextEntry={true}
              />
              <TouchableOpacity style={styles.texto} onPress={() => this.navigationToLogin()}>
                <Text>
                  ¿Ya tenés una cuenta? ¡Ingresá!
               </Text>
              </TouchableOpacity>


              <TouchableOpacity

                style={[styles.button, this.state.email && this.state.userName && this.state.password ? styles.buttonEnabled : styles.buttonDisabled]}
                onPress={() => this.props.register(this.state.email, this.state.userName, this.state.password)}
              >
                <Text style={styles.textButton}>Registrar</Text>
              </TouchableOpacity>

            </View>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerRegister: {
    backgroundColor: "white",
    height: "90%",
    with: "70%",
    borderRadius: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "10%",
    marginLeft: "5%",
    marginRight: "5%"
  },
  containerInput: {
    backgroundColor: "white",
    width: 200,
    height: 50,
    borderRadius: "15px",
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  buttonEnabled: {
    backgroundColor: 'green',
    width: 200,
    height: 50,
    borderRadius: "15px",
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%"
  },
  buttonDisabled: {
    backgroundColor: '#D3D3D3',
    display: 'none',
  },
  texto: {
    marginTop: 20,
    height: 20,
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: 50,
    width: 100,
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "green",
    marginTop: 10
  },
  textButton: {
    color: "white",
  },
  hide: {
    display: 'none'
  },
  actIndicator: {
    width: screen.width,
    height: screen.height,
    backgroundColor: 'white',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  }
});

export default Register;