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
        }  
    }
    
    render(){
        return (
            <View>
            <Text>hola</Text>
             
            </View>
          );
        }
      }
      const styles = StyleSheet.create({
        button: {
          backgroundColor: "#28a745",
          paddingHorizontal: 10,
          paddingVertical: 6,
          textAlign: "center",
          borderRadius: 4,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#28a745",
        },
        textButton: {
          color: "#fff",
        },
      });
export default Login;