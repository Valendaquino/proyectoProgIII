import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      err: false,
      showME: true,
    }
  }
  navigationToRegister() {
    this.props.screenProps.navigation.navigate('Register')
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
      <View style={styles.containerLogin} >
        {
          this.state.showME ?
            <ActivityIndicator
              style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}
              size="large"
              color="#7BBBFA" />
            :
            <View style={styles.containerLogin} >
              { //preguntar si se puede
                this.state.err ? (
                  <Text style={styles.hide}>{this.props.error}</Text>
                ) : (
                  <Text>{this.props.error}</Text>
                )
              }
              <img src="https://img.icons8.com/fluency/96/000000/multiple-choice.png" />
              <TextInput style={styles.containerInput}
                onKeyPress={() => this.clearErr()}
                onChangeText={(text) => this.setState({ email: text })}
                placeholder="email"
                keyboardType="email-addres"
              />
              <TextInput style={styles.containerInput}
                onChangeText={(text) => this.setState({ password: text })}
                placeholder="password"
                keyboardType="email-addres"
                secureTextEntry={true} />
              <TouchableOpacity onPress={() => this.navigationToRegister()}>
                <Text>
                  ¿No tenes una cuenta? ¡Registrate!
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, this.state.email && this.state.password ? styles.buttonEnabled : styles.buttonDisabled]}

                onPress={() => this.props.login(this.state.email, this.state.password)}
              >
                <Text style={styles.textButton}>Ingresar</Text>
              </TouchableOpacity>

            </View>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerLogin: {
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
    width: 250,
    height: 50,
    borderRadius: "10px",
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",



  },
  buttonEnabled: {
    backgroundColor: 'green',
    width: 400,
    height: 50,
    borderRadius: "15px",
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  buttonDisabled: {
    backgroundColor: '#D3D3D3',
    display: 'none',
  },


  button: {
    backgroundColor: "406343",
    height: 50,
    width: 50,
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
    color: "406343",
    
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
export default Login;
