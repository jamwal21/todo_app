import firebase from 'firebase'

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDlPJ5CcA_5TVfGh_gVeXBEwSLQhSWqiZ8",
    authDomain: "todo-app-902a6.firebaseapp.com",
    databaseURL: "https://todo-app-902a6.firebaseio.com",
    projectId: "todo-app-902a6",
    storageBucket: "todo-app-902a6.appspot.com",
    messagingSenderId: "843640978586",
    appId: "1:843640978586:web:4d42c2ab12d55c7e60b323",
    measurementId: "G-4VFXP2J8GG"
  });

  const db = firebaseApp.firestore();

  export default db ;