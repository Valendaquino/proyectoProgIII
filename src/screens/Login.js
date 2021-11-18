import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

class Login extends Component{
    constructor(){
        super();
        this.state={
            email: "",
            password: "",
            err: false
        }  
    }
    navigationToRegister(){
      this.props.screenProps.navigation.navigate('Register')
    }
    clearErr(){
      this.setState({
        err: true
      })
    }
      
    render(){
        return (
            <View>
             { //preguntar si se puede
              this.state.err ? ( 
                <Text style={styles.hide}>{this.props.error}</Text>
              ):(
                <Text>{this.props.error}</Text>
              )
            }
             <TextInput
             onKeyPress={()=>this.clearErr()}
             onChangeText={(text)=> this.setState({email:text})}
             placeholder="email"
             keyboardType="email-addres"
             />
             <TextInput
             onChangeText={(text)=> this.setState({password:text})}
             placeholder="password"
             keyboardType="email-addres"
             secureTextEntry={true} />
             <TouchableOpacity onPress={()=> this.navigationToRegister()}>
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
              color: "#fff",
            },
            hide:{
              display: 'none'
            }
           
          });
    export default Login;
         