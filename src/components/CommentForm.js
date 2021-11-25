import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: ''
        }
    }



    render() {
        return (
            <View style={styles.formContainer}>

                <TextInput
                    style={styles.multilineInput}
                    onChangeText={(text) => this.setState({ comment: text })}
                    placeholder='Add a comment..'
                    keyboardType='default'
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={() => this.props.guardarComentario(this.state.comment)}>
                    <Text style={styles.textButton}>Post</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 10,
        marginTop: 20,
        marginBottom: 90,
        height: "50%"


    },
    multilineInput: {

        height: 100,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,

    },
    button: {
        backgroundColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        height: 40
    },
    textButton: {
        color: 'white'
    }

})

export default CommentForm;