import { Camera } from "expo-camera";
import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image,ActivityIndicator } from "react-native";
import { storage } from "../firebase/config";
import Icon from "react-native-vector-icons/Ionicons"
class MyCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: false,
      photo: "",
      showME:true,
    };
    this.camera;
  }

  componentDidMount() {
    Camera.requestCameraPermissionsAsync()
      .then(() => {
        this.setState({
          permission: true,
        });
      })
      .catch((err) => console.log(err));

    Camera.getAvailableCameraTypesAsync().then((res) => console.log(res));
  }

  takePicture() {
    this.camera
      .takePictureAsync()
      .then((photo) => {
        //console.log(photo);
        this.setState({
          photo: photo.uri,
        });
      })
      .catch((err) => console.log(err));
  }

  savePhoto() {
    //console.log("guardar foto en firebase");
    fetch(this.state.photo)
      .then((res) => res.blob())
      .then((image) => {
        const ref = storage.ref(`photos/${Date.now()}.png`);

        ref.put(image)
            .then(() => {
                ref.getDownloadURL()
                    .then((url) => {
                        this.props.onImageUpload(url)
                        this.setState({
                          photo: "",
                        });
          });
        });
      })

      .catch((err) => console.log(err));
  }
  deletePhoto() {
    //console.log("guardar foto en firebase");
    fetch(this.state.photo)
      .then(() => this.setState({
        photo:''
      }))
      .catch((err) => console.log(err));
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
    return (
      <>
        {this.state.photo ? (
          <>
            <Image
              style={{ flex: 1, width: "100%", borderWidth:1,borderStyle: 'solid', borderColor: 'white', }}
              source={{ uri: this.state.photo }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity  style={styles.buttonAc} onPress={() => this.savePhoto()}>
                <Text ><Icon style={{color:"green"}} size={40} name="checkmark-sharp"/></Text>
                
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonAc} onPress={() => this.deletePhoto()}>
                <Text ><Icon style={{color:"red"}} size={40} name="close-sharp"/></Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
          {
             this.state.showME ? (
               
              <ActivityIndicator 
                style= {{height: "100%" , width: "100%",justifyContent: "center", alignItems: "center"}}
                size= "large" 
                color= "#7BBBFA"/>
            ):(
              <Camera
              style={{ flex: 1, width: "100%" }}
              type={Camera.Constants.Type.front}
              ref={(cam) => (this.camera = cam)}
            >
            <TouchableOpacity style={styles.shoot} onPress={() => this.takePicture()}>
              <Icon style={styles.icon} size={60} name="radio-button-on-sharp"/>
            </TouchableOpacity>
            </Camera>
            )
          
          }
           
          </>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({

buttonAc:{
  backgroundColor:'white',
  paddingHorizontal: 10,
  paddingVertical: 6,
  textAlign: 'center',
  borderRadius:4, 
  borderWidth:1,
  borderStyle: 'solid',
  borderColor: '#808080',
  height:"fit-content",
  width:"fit-content",
  fontSize:20,
  marginTop:4,
  marginLeft:15,
  marginBottom:4

  
},
textButton:{
  color: '#fff',
  alignSelf:"center"
},
buttonContainer:{
  display:"flex",
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"center"
},
icon: {
  display:"flex",
  flex: 1,
  width: "60px",
  height: "60px",
  alignSelf: "center",
  textAlign: 'center',
 
 
},
  shoot:{
    position: "absolute",
    bottom: 0,
    alignItems:"center",
    justifyContent:"center", 
    alignSelf: "center"
  }
})

export default MyCamera;
