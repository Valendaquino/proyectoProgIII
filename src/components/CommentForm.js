import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

class CommentForm extends Component{
    constructor(props){
        super(props)
        this.state={
            comment:''
        }
    }
    


    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Comentarios</Text>
                <TextInput
                    style={styles.multilineInput}
                    onChangeText={(text)=>this.setState({comment: text})}
                    placeholder='Dejá tu comentario'
                    keyboardType='default'
                    multiline
                    />
                <TouchableOpacity style={styles.button} onPress={()=>this.props.guardarComentario(this.state.comment)}>
                    <Text style={styles.textButton}>Enviar comentario</Text>    
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
        backgroundColor:'#71CCF7',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#71CCF7'
    },
    textButton:{
        color: '#fff'
    }

})

export default CommentForm;