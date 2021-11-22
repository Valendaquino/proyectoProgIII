import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator,} from 'react-native';
import { auth, db } from '../firebase/config'
import MyCamera from '../components/MyCamera';
class PostForm extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost:'',
            url:'',
            showCamera: true,
            showME:true,
        };
    }
  
    submitPost(){
        db.collection('posts').add({
            user: auth.currentUser.email,
            createdAt: Date.now(),
            description: this.state.textoPost,
            photo: this.state.url,
            likes:[],
            comments:[]
        })
        .then( ()=>{ 
            this.setState({
                textoPost:'',
                showCamera: true
            })
  
            this.props.screenProps.navigation.navigate('Home')
        })
         
          
         
        .catch(err=>console.log(err))
    }
    onImageUpload(url){
       this.setState({
           url: url ,//va a ser igual a la url que viene del hijo.
           showCamera:false,
       })
   }

   componentWillMount()
   {
     setTimeout(()=>{
   this.setState({
     showME:false
   })
     },
     3000)
   }
   
 
    render(){
        return this.state.showCamera ? (
            <MyCamera onImageUpload={(url) => this.onImageUpload(url)} />
          ) : (
            <View style={styles.formContainer}>
             {
       this.state.showME ?
        <ActivityIndicator 
          style= {{height: "100%" , width: "100%",justifyContent: "center", alignItems: "center"}}
          size= "large" 
          color= "#7BBBFA"/>
         :
         <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Write a description...."
                keyboardType="default"
                onChangeText={(text) => this.setState({ textoPost: text })}
                value={this.state.textoPost}
                multiline={true}
              />
      
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.submitPost()}
              >
                <Text style={styles.textButton}>Post</Text>
              </TouchableOpacity>
            </View>
              }
              </View>
          );
        }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
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
        backgroundColor: "#FFFFFF",
      
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

export default PostForm;