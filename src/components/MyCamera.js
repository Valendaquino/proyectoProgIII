// import React,{ Component} from 'react'
// import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
// import { auth, db, storage } from "../firebase/config";
// import { Camera } from 'expo-camera';

// class MyCamera extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             permission:false,
//             photo: ""
//         }
//         this.camera;
//        //para capturar cosas no podemosusar un query selector. por eso hago una referencia. cada vez que necesito el componente camera puedo hacer uso de esto
//     }
//     componentDidMount(){
//         //llamo al Camera que importamos.eso nos trae metodos que podemos utilizar.
//         Camera.requestCameraPermissionsAsync()
//             .then(()=>
//                 this.setState({
//                     permission:true
//                 })
//             )
//             .catch((err)=> console.log(err))
//         Camera.getAvailableCameraTypesAsync()
//         //que verifique que camaras tiene disponible el disp.
//             .then((res)=> console.log(res))
//     }
//     takePicture(){
//         this.camera.takePictureAsync()// cuando se ejecuta devuelve una promesa. metodo que nso provee camera.
//         .then((photo)=>{
//             console.log(photo);
//             this.setState({
//                 photo: photo.uri
//                 //direccion interna de la foto
//             })
//         })
//         .catch((err)=>console.log(err))

//     }
//     savePhoto(){
//         //console.log("guardar foto en firebase");
//         fetch(this.state.photo) 
//         .then((res)=>res.blob()//en vez de json
//             .then((image)=>{
//                 const ref = storage.ref(`photos/${Date.now()}.jpg`)
//                 ref.put(image)
//                     .then(()=>{
//                         ref
//                             .getDownloadURL()//quiero obtener la url de donde se guardo.
//                             .then((url)=> {
//                                 this.props.onImageUpload(url)
//                                 this.setState({
//                                     photo:""
//                                 }) //una vez que la pasamos la dejamos en blanco
//                             })
//                             //necesito pasarle a este componente un, metodo por prop para que almacene esta img
//                     });
//             })
//         )
//             .catch((err)=> console.log(err))
//     }
//     render(){
//        return(
//        <> 
//         {this.state.photo ? (
//             <>
//                 <Image 
//                     style={{flex: 1, width:"100%"}}
//                     source={{uri:this.state.photo}}
//                 />
//                 <View>
//                     <TouchableOpacity onPress={()=>this.savePhoto()}>
//                         <Text>Acept</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity>
//                         <Text>Cancel</Text>
//                     </TouchableOpacity>
//                 </View>
//             </>
//         ):(
//             <>
//                 <Camera
//                 style={{flex:1, width: "100%"}}
//                 type={Camera.Constants.Type.front}
//                 ref={(cam)=> (this.camera = cam)} //es una prop
//                 />
//                 <TouchableOpacity onPress={()=>this.takePicture()}>
//                     <Text>Shoot</Text>
//                 </TouchableOpacity>
//             </>
//         ) }
            
//        </>
//        // para poner la camara trasera hacer unn if ternario aca
//     )}
// }

// export default MyCamera;
