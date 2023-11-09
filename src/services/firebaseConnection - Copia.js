import * as firebase from 'firebase';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAutXYke2kYzD7H-XawMa7zZVkHDfCNncc",
    authDomain: "meuapp-f93a3.firebaseapp.com",
    projectId: "meuapp-f93a3",
    storageBucket: "meuapp-f93a3.appspot.com",
    messagingSenderId: "222015273133",
    appId: "1:222015273133:web:62324addaefec6c59a2e24",
    measurementId: "G-K4LLPM07L9"
  };

    firebase.initializeApp(firebaseConfig);



  export default firebase ;