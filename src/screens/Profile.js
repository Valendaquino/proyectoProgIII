import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { db, auth } from '../firebase/config'
import Post from '../components/Post';

class Profile extends Component{
  constructor(props){
    super(props);
    this.state ={
      posteos: [],
    }
  }
  componentDidMount(){
    this.showPost();
    console.log(auth.currentUser.displayName);
  
   }
  showPost(){
    db.collection('posts')
        .where('user', '==',auth.currentUser.email)
        //.orderBy('createdAt', 'desc') // 1 propiedad sobre la que queres aplicar un orden
        .onSnapshot(
          (docs) => {
              console.log(docs);
              let posts = [];
              docs.forEach( doc => {
                    posts.push({
                      id: doc.id,
                      data: doc.data(),
                    })
              })
            console.log(posts);
  
            this.setState({
              posteos: posts,
            })
        }
      )
  }
  deletePost(id){
    
      db.collection("posts")
        .doc(id).delete()
          .then((post) => {
            console.log(post.id);
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
  }
  render(){
   
    return(
      <View style={styles.container}>
                <text>E-mail:{auth.currentUser.email}</text>
                <text> User:{auth.currentUser.displayName}</text>
                
                <FlatList 
                  data= { this.state.posteos }
                  keyExtractor = { post => post.id}
                  renderItem = { ({item}) => 
                    <>
                      <TouchableOpacity onPress={()=>this.deletePost(item.id)}>x</TouchableOpacity>
                      <Post postData={item}/>
                      
                    </>
                  }
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.props.logout()} >LogOut</TouchableOpacity>
                <text>Creation date:{auth.currentUser.metadata.creationTime}</text>
                <text>Last login:{auth.currentUser.metadata.lastSignInTime}</text>
                
                
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:10,
    backgroundColor:'white'
  },
  formContainer:{
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    padding:10,
  },
  field:{
    borderColor: '#444',
    borderWidth:1,
    borderStyle: 'solid',
    height: 50,
    paddingHorizontal: 20,
    paddingVertical:10
  },
  image:{
    height: 250,
  },
  touchable:{
    backgroundColor: '#444',
    borderRadius:4,
    marginVertical:10,
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
    color: "black",
}
})

export default Profile;