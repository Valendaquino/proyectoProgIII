import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

class SearchForm extends Component{
    constructor(props){
        super(props)
        this.state={
            posteos: [] ,
            search:" "
        }
    }
    


    render(){
        return(
            <View style={styles.formContainer}>

                <TextInput
                    style={styles.TextInput}
                    onChangeText={(text)=>this.setState({search: text})}
                    placeholder='Search post'
                    keyboardType='default'
                    />
                <TouchableOpacity style={styles.buttonSearch} onPress={()=>this.props.searchPost(this.state.search)}>
                    <Text style={styles.textButton}>Search</Text>    
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        height:'30%',
        paddingHorizontal:10,
        marginTop: 30,
        marginBottom:30,
        backgroundColor:"blue",
        flex: 1,
        flexDirection:"row",
        width: "100%",
        backgroundColor:"grey"
    },
    multilineInput:{
        height:95,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderRadius: 10,
        marginVertical:10,
    },
    buttonSearch:{
        backgroundColor: '#71CCF7',
        paddingHorizontal: 9,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#71CCF7',
       paddingLeft:50
        
        
    },
    textButton:{
        color: 'black'
    },
    TextInput:{
        backgroundColor: "white"
    }
})

export default SearchForm;