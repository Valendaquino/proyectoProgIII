import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { auth } from "../firebase/config";

class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      
    }
  }
  render(){
   
    return(
      <View style={styles.container}>
                <text>e-mail:{auth.currentUser.email}</text>
                <text>creation date:{auth.currentUser.metadata.creationTime}</text>
                <text>last login:{auth.currentUser.metadata.lastSignInTime}</text>
                <TouchableOpacity onPress={()=>this.props.logout()}>LogOut</TouchableOpacity>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10,
  },
  formContainer:{
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    padding:10,
  },
  field:{
    borderColor: '#444',
    borderWidth:1,
    borderStyle: 'solid',
    height: 20,
    paddingHorizontal: 20,
    paddingVertical:10
  },
  image:{
    height: 250,
  },
  touchable:{
    backgroundColor: '#ccc',
    borderRadius:4,
    marginVertical:10,
  }
})

export default Profile;