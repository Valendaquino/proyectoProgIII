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
      <View>
        <View style={styles.formContainer}>

          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({ search: text})}
            placeholder='Search post'
            keyboardType='default'
          />
          <TouchableOpacity style={styles.buttonSearch} onPress={() => this.searchPost(this.state.search)}>
            <Text style={styles.textButton}>Search</Text>
          </TouchableOpacity>
        </View>
       
        {
          this.state.searching ? (
            this.state.postsSearch.length === 0 ? (
              <Text style={{ color: "black" }}>No results for {this.state.userSearch}, try searching for an existing email</Text>
            ) : (
                <Text style={{ color: "black" }}> Results for {this.state.userSearch}</Text>
              )

          ) : (
            
            <Image style={styles.icon} source={{uri:"https://img.icons8.com/ios/100/000000/search-client.png"}}/>
           
            )
        }
  
           
 <FlatList
          data={this.state.postsSearch}
          keyExtractor={post => post.id}
          renderItem={({ item }) => <Post postData={item} />}
        />
{
       this.state.showME ?
        <ActivityIndicator 
          style= {{height: "100%" , width: "100%",justifyContent: "center", alignItems: "center"}}
          size= "large" 
          color= "#7BBBFA"/>
         :
         <View style={styles.formContainer}>

      </View>
       }
       </View>
    )
  }
}

const styles = StyleSheet.create({
  body:{
    backgroundColor: "black"
  },
  formContainer: {
    height: '100px',
    marginTop: 30,
    marginBottom: 30,
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignSelf: "center"

  },
  
  buttonSearch: {
    backgroundColor: 'black',
    width: "84px",
    height: "26px",
    borderRadius: "8px",
    marginLeft: "2%",
    marginRight: "5%",
    borderStyle: 'solid',
    borderColor: '#71CCF7',
    textAlign:"center",
    justifyContent: "center",
    paddingBottom:1


  },
  textButton: {
    color: 'white',
    
  },
  textInput: {
    backgroundColor: "white",
    width: "200px",
    height: "26px",
    borderRadius: "8px"
  },
  icon: {
    flex: 2,
    width: "100%",
    height: "100%",
  
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