import React,{ Component} from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { auth, db } from "../firebase/config";


class Home extends Component{
    constructor(){
        super();
        this.state={
            posts:[]
        }  
    }

   
    render(){
        
        return (
            <View>
              hola
            </View>
          );
    }
}




export default Home;