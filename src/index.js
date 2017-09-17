import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyCcN5bOptWxK0QSKQFMQEJGC14DJ-MOs5s",
    authDomain: "nfcwebsite-ad1be.firebaseapp.com",
    databaseURL: "https://nfcwebsite-ad1be.firebaseio.com",
    projectId: "nfcwebsite-ad1be",
    storageBucket: "nfcwebsite-ad1be.appspot.com",
    messagingSenderId: "721440709193"	
});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
