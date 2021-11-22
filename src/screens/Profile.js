import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { db, auth } from '../firebase/config'
import Post from '../components/Post';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      showME: true,
    }
  }
  componentDidMount() {
    this.showPost();
    console.log(auth.currentUser.displayName);

  }
  showPost() {
    db.collection('posts')
      .where('user', '==', auth.currentUser.email)
      //.orderBy('createdAt', 'desc') // 1 propiedad sobre la que queres aplicar un orden
      .onSnapshot(
        (docs) => {
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
  redirectNewPost() {
    this.props.screenProps.navigation.navigate('New Post')
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
console.log(auth.currentUser.displayName);
    return (
      <View style={styles.container}>
        {
          this.state.showME ?
            <ActivityIndicator
              style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}
              size="large"
              color="#7BBBFA" />
            :
            <View style={styles.container}>
              <View style={styles.userInfo}>
                  <Text style={styles.username}> {auth.currentUser.displayName}</Text>
                  <Text style={{fontSize:"20px", marginLeft:"5px"}}> Posts: {this.state.posteos.length}</Text>
              </View>
              {this.state.posteos.length == 0 ? (
                <View style={styles.noPosts}>
                  <Text> No posts yet </Text>
                  <TouchableOpacity style={styles.addNew} onPress={() => this.redirectNewPost()}> Add new post</TouchableOpacity>
                </View>
              ) : (
                  <FlatList
                    data={this.state.posteos}
                    keyExtractor={post => post.id}
                    renderItem={({ item }) =>
                      <>

                        <Post postData={item} />

                      </>
                    }
                  />
                )}

              <TouchableOpacity style={styles.button} onPress={() => this.props.logout()} >LogOut</TouchableOpacity>
              <View style={styles.personalInfo}>
                <Text>Email: {auth.currentUser.email}</Text>
                <Text>Creation date:{auth.currentUser.metadata.creationTime}</Text>
                <Text>Last login:{auth.currentUser.metadata.lastSignInTime}</Text>
              </View>

            </View>
        }
      </View>

    )
  }
}



const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    padding: 10,
  },
  field: {
    borderColor: '#444',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  image: {
    height: 250,
  },
  touchable: {
    backgroundColor: '#444',
    borderRadius: 4,
    marginVertical: 10,
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
  },
  username: {
    fontSize: "20px"
  },
  personalInfo: {
    marginTop: "20px"
  },
  noPosts: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
  addNew: {
    fontSize: "20px",
    borderRadius: 4,
    borderWidth: 1,
    width: "fit-content",
    height: "fit-content",
    borderStyle: "solid",
    borderColor: "#71CCF7",
  }, 
  userInfo:{
    display:"flex", 
    flexDirection: "row",
    flex: 2,
    justifyContent: "center",
    alignItems:"center",
    
  },
  
})

export default Profile;