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
  
   }
  showPost(){
    db.collection('posts')
        .where('user', '==',auth.currentUser.email)
        //.orderBy('createdAt', 'desc') // 1 propiedad sobre la que queres aplicar un orden
        .onSnapshot(
        docs => {
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
  render(){
   
    return(
      <View style={styles.container}>
                <text>E-mail:{auth.currentUser.email}</text>
                
                <FlatList 
                  data= { this.state.posteos }
                  keyExtractor = { post => post.id}
                  renderItem = { ({item}) => <Post postData={item}/>}
                />
                <text>C reation date:{auth.currentUser.metadata.creationTime}</text>
                <text>Last login:{auth.currentUser.metadata.lastSignInTime}</text>
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