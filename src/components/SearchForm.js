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
                <TouchableOpacity style={styles.button} onPress={()=>this.props.searchPost(this.state.search)}>
                    <Text style={styles.textButton}>Search</Text>    
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    multilineInput:{
        height:100,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor: '#E3263D',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#E3263D'
    },
    textButton:{
        color: '#fff'
    }

})

export default SearchForm;