import { Camera } from "expo-camera";
import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { storage } from "../firebase/config";

class MyCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: false,
      photo: "",
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

  render() {
    return (
      <>
        {this.state.photo ? (
          <>
            <Image
              style={{ flex: 1, width: "100%", borderWidth:1,borderStyle: 'solid', borderColor: 'white', }}
              source={{ uri: this.state.photo }}
            />
            <View>
              <TouchableOpacity onPress={() => this.savePhoto()}>
                <Text style={styles.buttonAc}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.deletePhoto()}>
                <Text style={styles.buttonAc}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Camera
              style={{ flex: 1, width: "100%" }}
              type={Camera.Constants.Type.front}
              ref={(cam) => (this.camera = cam)}
            >
            <TouchableOpacity style={styles.shoot} onPress={() => this.takePicture()}>
              <Image style={styles.icon} source={{uri: "https://img.icons8.com/ios-glyphs/30/000000/camera.png"}}/>
            </TouchableOpacity>
            </Camera>
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
  borderColor: 'black',
  height:45,
  width:350,
  fontSize:20,
  marginTop:4,
  marginLeft:15,
  marginBottom:4

  
},
textButton:{
  color: '#fff',
  alignSelf:"center"
},
icon: {
  flex: 1,
  width: "60px",
  height: "60px",
  alignSelf: "center",
  marginTop:'180%',
  backgroundColor:'white',
  paddingHorizontal: 10,
  paddingVertical: 6,
  textAlign: 'center',
  borderRadius:4, 
  borderWidth:1,
  borderStyle: 'solid',
  borderColor: 'white',
  position: "absolute",
  

},
})

export default MyCamera;
