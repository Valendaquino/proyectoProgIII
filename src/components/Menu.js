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
  
 

 
  render() {
  
    return (
        
      <Drawer.Navigator>
           <Drawer.Screen name='Prueba' component={() => <Login/> }/>
           <Drawer.Screen name='Prueba2' component={() => <Register/> }/>
      </Drawer.Navigator>
    );
  }
}

export default Menu;
