import firebase from "firebase";
const firebaseeConfig={
  apiKey: "AIzaSyBrBb_hH1PI4r36ZMyfpfGSX9GIMUXsxD0",
  authDomain: "collegecareerportal-c0be7.firebaseapp.com",
  databaseURL: "https://collegecareerportal-c0be7-default-rtdb.firebaseio.com",
  projectId: "collegecareerportal-c0be7",
  storageBucket: "collegecareerportal-c0be7.appspot.com",
  messagingSenderId: "829046087936",
  appId: "1:829046087936:web:2075c7d470b5e9ee5993e5",
  // measurementId: "G-2F9YJ78VXF"
  
};
firebase.initializeApp(firebaseeConfig);
var database = firebase.database();
export default database;