import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: ""
     
    };
  }
  navigationToLogin(){
    this.props.screenProps.navigation.navigate('Login')
  }
  render() {
    
    return (
      <View>
        <Text>{this.props.error}</Text>
        <Text>Register</Text>
        <TextInput
          onChangeText={(text) => this.setState({ email: text })}
          placeholder="email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text)=>this.setState({userName: text})}
          placeholder='user name'
          keyboardType='default'/>
        <TextInput
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="password"
          keyboardType="email-address"
          secureTextEntry={true}
        />
         <TouchableOpacity onPress={()=> this.navigationToLogin()}>
               <Text>
                 ¿Ya tenés una cuenta? ¡Ingresá!
               </Text>
             </TouchableOpacity>
        
       
            <TouchableOpacity

           style={[styles.button, this.state.email && this.state.password && this.state.userName ? styles.buttonEnabled : styles.buttonDisabled]}
            onPress={() => this.props.register(this.state.email, this.state.userName, this.state.password)}
          >
            <Text style={styles.textButton}>Registrar</Text>
          </TouchableOpacity>
          
        
       
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonEnabled: {
    backgroundColor: '#00ADB5',
},
buttonDisabled: {
    backgroundColor: '#D3D3D3',
    display: 'none',
},
  button: {
    backgroundColor: "#71CCF7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#71CCF7",
  },
  textButton: {
    color: "white",
  },
});

export default Register;