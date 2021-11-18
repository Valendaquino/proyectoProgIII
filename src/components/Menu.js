import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { auth } from "../firebase/config";

// Import de los screens a los que quiero navegar
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from "../screens/Login";
import Register from "../screens/Register";
import PostForm from "../screens/PostForm";


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


  componentDidMount(){
    auth.onAuthStateChanged((user)=>{
     if(user!==null){
         this.setState({loggedIn:true, userData: user})
     }else{
         this.setState({loggedIn:false, userData: ""})
     }
 })
 }
  register(email, userName, password) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then( (userData) => {
        this.setState({loggedIn: true, error: "",
            }) ; 
        userData.user.updateProfile({
            displayName: userName
        })
    })
    .then(() => console.log('Usuario registrado exitosamente!'))
    .catch(err => {
        this.setState({error: err.message})
    })
    
  }
  
  login(email, password) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userData) => { 
          this.setState({loggedIn: true,  
                       error: "",
        }) 

    ;})
      .catch((err) =>  this.setState({error: err.message})
      )
      console.log(auth.signInWithEmailAndPassword(email, password));
  }
  logout(){
    auth
        .signOut()
        .then( ()=>{
            this.setState({
                loggedIn:false,
                userData:""
        
        })})
       .catch(err=> console.log(err))
     
 }

  



  render() {
  
    return (
        <Drawer.Navigator>
            {this.state.loggedIn === true ? 
                <>
                    <Drawer.Screen name="Home"  component={() => <Home /> } /> 
                    <Drawer.Screen name="Profile" component={() => <Profile  logout={()=>this.logout()}/> }  />
                    <Drawer.Screen name="New Post" component={(screenProps)=><PostForm screenProps={screenProps}/>}/>
                    </>:<>
                    <Drawer.Screen name="Login" component={(screenProps) => <Login screenProps={screenProps} login={(email, pass) => this.login(email,pass)} error={this.state.error}/>} />
                    <Drawer.Screen name="Register"  component={(screenProps) => <Register screenProps={screenProps} register={(email, userName, pass) => this.register(email,userName, pass)} error={this.state.error} />}  />
                </>
        }
        </Drawer.Navigator>
    );
  }
}

export default Menu;
