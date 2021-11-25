import React, { Component } from "react";
import { NavigationContainer, findFocusedRoute } from "@react-navigation/native";
import { Image } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { auth } from "../firebase/config";
import Icon from "react-native-vector-icons/Ionicons"
// Import de los screens a los que quiero navegar
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from "../screens/Login";
import Register from "../screens/Register";
import PostForm from "../screens/PostForm";
import Search from "../screens/Search"


const Drawer = createDrawerNavigator();

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userData: {},
      error: "",


    };
  }


  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        this.setState({ loggedIn: true, userData: user })
      } else {
        this.setState({ loggedIn: false, userData: "" })
      }
    })
  }
  register(email, userName, password) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        this.setState({
          loggedIn: true, error: "",
        });
        userData.user.updateProfile({
          displayName: userName
        })
      })
      .then(() => console.log('Usuario registrado exitosamente!'))
      .catch(err => {
        this.setState({ error: err.message })
      })

  }

  login(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userData) => {
        this.setState({
          loggedIn: true,
          error: "",
        })

          ;
      })
      .catch((err) => this.setState({ error: err.message })
      )
    console.log(auth.signInWithEmailAndPassword(email, password));
  }
  logout() {
    auth
      .signOut()
      .then(() => {
        this.setState({
          loggedIn: false,
          userData: ""

        })
      })
      .catch(err => console.log(err))

  }





  render() {

    return (
      <Drawer.Navigator>
        {this.state.loggedIn === true ?
          <>
            <Drawer.Screen name="Home" component={() => <Home />} options={{ drawerIcon: config => <Icon size={23} name="home-outline" />, unmountOnBlur: true }} />
            <Drawer.Screen name="Search" component={() => <Search />} options={{ drawerIcon: config => <Icon size={23} name="search" />, unmountOnBlur: true }} />
            <Drawer.Screen name="Profile" component={(screenProps) => <Profile screenProps={screenProps} logout={() => this.logout()} />} options={{ drawerIcon: config => <Icon size={23} name="person-outline" />, unmountOnBlur: true }} />
            <Drawer.Screen name="New Post" component={(screenProps) => <PostForm screenProps={screenProps} />} options={{ drawerIcon: config => <Icon size={23} name="add-circle-outline" />, unmountOnBlur: true }} />
          </> : <>
            <Drawer.Screen name="Login" component={(screenProps) => <Login screenProps={screenProps} login={(email, pass) => this.login(email, pass)} error={this.state.error} />} options={{ drawerIcon: config => <Icon size={23} name="enter-sharp" />, unmountOnBlur: true }} />
            <Drawer.Screen name="Register" component={(screenProps) => <Register screenProps={screenProps} register={(email, userName, pass) => this.register(email, userName, pass)} error={this.state.error} />} options={{ drawerIcon: config => <Icon size={23} name="create-sharp" />, unmountOnBlur: true }} />
          </>
        }
      </Drawer.Navigator>
    );
  }
}

export default Menu;
