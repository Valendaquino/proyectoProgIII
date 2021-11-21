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
        height:'100px',
        marginTop: 30,
        marginBottom:30,
        flex: 1,
        flexDirection:"row",
        width: "200px%",
     
    },
    multilineInput:{
    width:"200px" ,
    height: "26px",
    borderRadius: "15px",
    borderColor: '#fff',
    border: "1px solid grey",
    backgroundColor: "#C6E0F9"
        
    },
    buttonSearch:{
        backgroundColor: '#C6E0F9',
        width: "84px" ,
        height: "26px",
        borderRadius: "10px",
        marginLeft:"5%",
        marginRight:"5%",
        borderStyle: 'solid',
        borderColor: '#71CCF7',
      
        
    },
    textButton:{
        color: 'black'
    },
    TextInput:{
        backgroundColor: "white",
        width: "200px",
        height: "26px",
        borderRadius: "10px"
    }
})

export default SearchForm;