import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
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
    backgroundColor: '#C6E0F9',
    width: "84px",
    height: "26px",
    borderRadius: "8px",
    marginLeft: "0",
    marginRight: "5%",
    borderStyle: 'solid',
    borderColor: '#71CCF7',
    textAlign:"center",
    justifyContent: "center",
    paddingBottom:1


  },
  textButton: {
    color: 'black',
    
  },
  textInput: {
    backgroundColor: "white",
    width: "200px",
    height: "26px",
    borderRadius: "8px"
  },
  icon: {
    flex: 2,
    width: "200px",
    height: "200px",
  
  }
})

export default Search;