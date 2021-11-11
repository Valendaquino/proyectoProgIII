import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { auth } from "../firebase/config";

// Import de los screens a los que quiero navegar
import Login from "../screens/Login";
import Register from "../screens/Register";

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
  register(email, password) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => { 
         this.setState({loggedIn: true,
                       // error: "",
        }) ; 
    })
      .catch((err) =>  
         this.setState({error: err.message})
    );
  }
  login(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userData) => { 
          this.setState({loggedIn: true,  
                       // error: "",
        }) 

    ;})
      .catch((err) =>  this.setState({error: err.message})
      )
      console.log(auth.signInWithEmailAndPassword(email, password));
  }

 
  render() {
  
    return (
        
      <Drawer.Navigator>
           <Drawer.Screen name='login' component={() => <Login/> }/>
           <Drawer.Screen name='register' component={() => <Register/> }/>
      </Drawer.Navigator>
    );
  }
}

export default Menu;
