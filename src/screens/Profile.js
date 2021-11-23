import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { db, auth } from '../firebase/config'
import Post from '../components/Post';
import { ceil } from 'react-native-reanimated';

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
            <View style={styles.container2}>
              <View style={styles.userInfo}>
                  <Text style={styles.user}><Image style={styles.icon2} source={{uri:"https://img.icons8.com/ios/50/000000/user--v2.png"}}/> {auth.currentUser.displayName}</Text>
                  <Text style={styles.user}> {this.state.posteos.length} posts</Text>
              </View>
              {this.state.posteos.length == 0 ? (
                <View style={styles.noPosts}>
                  <Image style={styles.icon} source={{uri:"https://img.icons8.com/ios/100/000000/camera--v1.png"}}/>
                  <Text style={styles.noPostText}>No posts yet</Text>
                  <TouchableOpacity style={styles.addNew} onPress={() => this.redirectNewPost()}> Add a new one</TouchableOpacity>
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

              <TouchableOpacity style={styles.button} onPress={() => this.props.logout()} > Log Out </TouchableOpacity>
              <View style={styles.personalInfo}>
                
                <Text>User e-mail: {auth.currentUser.email}</Text>
                <Text>Creation date: {auth.currentUser.metadata.creationTime}</Text>
                <Text>Last login: {auth.currentUser.metadata.lastSignInTime}</Text>
              </View>

            </View>
        }
      </View>

    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,//esta linea rompe todo el perfil cuando se cargan fotos.
    paddingHorizontal: 10,
    fontSize:"20px",
    backgroundColor: 'green',
    
  },
  container2: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'blue',
    marginTop:20
    
  },
  formContainer: {

    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    padding: 100,
    paddingTop:5,
    marginTop:150
   
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
    flex:1
  },
  icon: {
    flex: 2,
    width: "70",
    height: "70",
  },
  touchable: {
    backgroundColor: '#444',
    borderRadius: 4,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    width: "fit-content",
    height: "fit-content",
    borderStyle: "solid",
    borderColor: "black",
    marginLeft:130,

},
  textButton: {
    color: "black",
  },
  user: {
    
    fontSize: "60",
    backgroundColor:'grey'
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
  noPostText:{
    fontSize: "20px",
    textAlign: "center",
    marginBottom: "5px"
  },
  addNew: {
    fontSize: "20px",
    borderRadius: 4,
    borderWidth: 1,
    width: "fit-content",
    height: "fit-content",
    backgroundColor: '#C6E0F9',
    borderRadius: "8px",
    marginLeft: "0px",
    marginRight: "0px",
    borderStyle: 'solid',
    borderColor: '#71CCF7',
    textAlign:"center",
    justifyContent: "center",
    paddingBottom:1,
    alignSelf:"center"
   
  }, 
  userInfo:{
    display:"flex", 
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems:"center",
    backgroundColor:"purple",
    margin:4,
    height:40,

    
  },
  icon2:{
    flex: 2,
    width: "20px",
    height: "20px",
    justifyContent: "center",
    marginRight: 1
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

export default Profile;