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
    return (
      <View>
        <View style={styles.formContainer}>

          <TextInput
            style={styles.TextInput}
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
              <Image style={styles.icon} souce={{ uri: "https://img.icons8.com/ios-glyphs/30/000000/search-client.png" } /*no puedo hacer que se vea la img, como que aparece en el render pero no se ve el diujo*/} />
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
  formContainer: {
    height: '100px',
    marginTop: 30,
    marginBottom: 30,
    flex: 1,
    flexDirection: "row",
    width: "200px%",

  },
  multilineInput: {
    width: "200px",
    height: "26px",
    borderRadius: "15px",
    borderColor: '#fff',
    border: "1px solid grey",
    backgroundColor: "#C6E0F9"

  },
  buttonSearch: {
    backgroundColor: '#C6E0F9',
    width: "84px",
    height: "26px",
    borderRadius: "10px",
    marginLeft: "5%",
    marginRight: "5%",
    borderStyle: 'solid',
    borderColor: '#71CCF7',


  },
  textButton: {
    color: 'black'
  },
  TextInput: {
    backgroundColor: "white",
    width: "200px",
    height: "26px",
    borderRadius: "10px"
  },
  icon: {
    flex: 1,
    width: "20px",
    height: "20px",
    alignSelf: "center",

    paddingHorizontal: 10,
    paddingVertical: 6,
    
   

  
  }
})

export default Search;