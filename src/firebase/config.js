
  import app from 'firebase/app'
  import firebase from 'firebase'

  
  const firebaseConfig = {
    apiKey: "AIzaSyCafhlObSeu8TMPMuwBfVNQP-fiXsuY9QQ",
    authDomain: "proyectoprogiii-8a35e.firebaseapp.com",
    projectId: "proyectoprogiii-8a35e",
    storageBucket: "proyectoprogiii-8a35e.appspot.com",
    messagingSenderId: "313248556678",
    appId: "1:313248556678:web:d5101b3337e1560d495307"
  };

 
  // Initialize Firebase
  app.initializeApp(firebaseConfig);
  export const auth =firebase.auth()
  export const storage =firebase.storage()
  export const db =app.firestore()