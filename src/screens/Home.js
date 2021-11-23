import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, Button, FlatList, TextInput } from 'react-native';
import { db, auth } from '../firebase/config'
import Post from '../components/Post';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      postsSearch: [],
      showME: true,

    }
  }
  componentDidMount() {
    this.showPost();

  }
  showPost() {
    db.collection('posts')
      //.where('user', '==',auth.currentUser.email)
      .orderBy('createdAt', 'desc') // 1 propiedad sobre la que queres aplicar un orden
      .onSnapshot(
        docs => {
          console.log(docs);
          let posts = [];
          docs.forEach(doc => {
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



  componentWillMount() {
    setTimeout(() => {
      this.setState({
        showME: false
      })
    },
      3000)
  }


  render() {
    return (

      <View style={styles.container}>
        {
          this.state.showME ? (
            <ActivityIndicator
              style={styles.actIndicator}
              size="large"
              color="#7BBBFA" />
          ) : (
              <View style={styles.container}>

                <FlatList
                  data={this.state.posteos}
                  keyExtractor={post => post.id}
                  renderItem={({ item }) => <Post postData={item} />}
                />
              </View>
            )

        }
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'black'
  },
  formContainer: {
    backgroundColor: 'black',
    marginHorizontal: 10,
    padding: 10,
  },
  field: {
    borderColor: '#444',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 20,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  image: {
    height: 250,
  },
  touchable: {
    backgroundColor: '#ccc',
    borderRadius: 4,
    marginVertical: 10,
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

export default Home;