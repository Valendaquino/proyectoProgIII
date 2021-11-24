import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native';
import { db, auth } from '../firebase/config'
import Post from '../components/Post';
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postsSearch: [],
      search: " ",
      searching: false,
      userSearch: '',
      showME: true,
    }
  }
  searchPost(user) {
    this.setState({
      userSearch: user
    })
    db.collection('posts')
      .where('user', '==', user)
      // .orderBy('createdAt', 'desc') // 1 propiedad sobre la que queres aplicar un orden
      .onSnapshot(
        docs => {
          console.log(docs);
          let postsSearch = [];
          docs.forEach(doc => {
            postsSearch.push({
              id: doc.id,
              data: doc.data(),
            })
          })


          this.setState({
            submit: true,
            postsSearch: postsSearch,
            searching: true
          })
        }
      )
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


  render() {
    console.log(this.state.searching);
    return (
      <View >
        <View style={styles.formContainer}>

          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({ search: text})}
            placeholder='     Search post'
            keyboardType='default'
          />
          <TouchableOpacity style={styles.buttonSearch} onPress={() => this.searchPost(this.state.search)}>
            <Text style={styles.textButton}>Search</Text>
          </TouchableOpacity>
        </View>
       
        {
          this.state.searching ? (
            this.state.postsSearch.length === 0 ? (
              <Text style={{ color: "black", fontSize:20 }}> No se encuntran resultados para "{this.state.userSearch}", intenta ingresando un email existente</Text>
            ) : (
                <Text style={{ color: "black",fontSize:20, marginTop:10, marginBottom:10, marginLeft:10, }}> Resultados para  {this.state.userSearch}</Text>
              )

          ) : (
            
           <Text style={styles.text}> No posts searched yet </Text>
           
            )
        }
  
           
 <FlatList
          data={this.state.postsSearch}
          keyExtractor={post => post.id}
          renderItem={({ item }) => <Post postData={item} />}
        />
{/* lo sacaría mejor
       this.state.showME ?
        <ActivityIndicator 
          style= {{height: "100%" , width: "100%",justifyContent: "center", alignItems: "center"}}
          size= "large" 
          color= "#7BBBFA"/>
         :
         <View style={styles.formContainer}>

      </View>
       */}
       </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    height: "100%",
    marginTop: 30,
    marginBottom: 30,
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignSelf: "center"

  },
  
  buttonSearch: {
    backgroundColor: 'white',
    width: 100,
    height: 50,
    borderRadius: 13,
    marginLeft: 7,
    marginRight:5,
    textAlign:"center",
    justifyContent: "center",
    paddingBottom:1,
    fontSize:20


  },
  textButton: {
    color: 'black',
    
  },
  textInput: {
    backgroundColor: "white",
    width: 250,
    height: 50,
    borderRadius: "8px",
    fontSize:20
    
  },

  text:{
    textAlign:"center",
    fontSize:"30px",
    marginTop: "100px"

  },

  actIndicator: {
    width: screen.width,
    height: screen.height,
    backgroundColor: 'white',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  }
})

export default Search;