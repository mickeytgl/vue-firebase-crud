import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBv4DpG4dS9D_IRKiyzVaFCeEy14f5nN8k",
  authDomain: "ninja-smoothies-76937.firebaseapp.com",
  databaseURL: "https://ninja-smoothies-76937.firebaseio.com",
  projectId: "ninja-smoothies-76937",
  storageBucket: "ninja-smoothies-76937.appspot.com",
  messagingSenderId: "396685692753"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export firestore databaseURL
export default firebaseApp.firestore()
