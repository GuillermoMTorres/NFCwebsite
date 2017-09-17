import React, { Component } from 'react';
import firebase from 'firebase';
import {HashRouter, Match} from 'react-router'

import './App.css';

import Header from '../Header'
import Nav from '../Nav'
import Main from '../Main'
import Sponsors from '../Sponsors'
import Productos from '../Productos'
import Invitados from '../Invitados'
import FrontPage from '../FrontPage'

class App extends Component {
  constructor(){ 
    super();

    this.state = {
      user: null,
      name: '',
      isLogged: true
    };

  this.handleAuth = this.handleAuth.bind(this)
  this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
      if(this.state.user){
        this.setState({ isLogged: true, name: this.state.user.displayName})      
      }else{
        this.setState({ isLogged: false, name: ""})        
     }
    });
  }

  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout () {

    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha cerrado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  pushData() {
    const record = {
      Nombre: "asd",
      Descripcion: "qwerty"
    }
    const dbRef = firebase.database().ref('Sponsors');
    const newSponsor = dbRef.push();
    newSponsor.set(record)
  }

  renderIfLogged(elemento){
    if(this.state.user){

        if(elemento==='Main')
        return(
          <div>
            <Nav />
            <Main/>
          </div>
        )
        if(elemento==='Sponsors')
        return(
          <div>
            <Nav />
            <Sponsors/>
          </div>
        )
        if(elemento==='Asistentes')
        return(
          <div>
            <Nav />
            <Main/>
          </div>
        )
              if(elemento==='Main')
        return(
          <div>
            <Nav />
            <Main/>
          </div>
        )



    }else{
        return(
          <div className="notLogWarn">Tienes que estar registrado para acceder</div>
        )
    }
  }
  renderIfLoggedSponsor(){
    if(this.state.user){
        return(
          <div>
            <Nav />
            <Sponsors/>
          </div>
        )
    }else{
        return(
          <div className="notLogWarn">Tienes que estar registrado para acceder</div>
        )
    }
  }



  render() {
    return (
      <HashRouter>
      <div>
        <Match exactly pattern ="/" render ={() => {  

              if(this.state.user){
                  return(
                    <div>
                      <Header logged={this.state.isLogged} name={this.state.name} onLogin={this.handleAuth} onLogout={this.handleLogout}
                      />
                      <Nav />
                      <Main/>
                    </div>
                  )
              }else{
                  return(
                    <div>
                      <Header logged={this.state.isLogged} name={this.state.name} onLogin={this.handleAuth} onLogout={this.handleLogout}
                        />
                      <div className="notLogWarn">Tienes que estar registrado para acceder</div>
                    </div>
                  )
              }

        }} />
        <Match exactly pattern ="/invitados" render ={() => {  

              if(this.state.user){
                  return(
                    <div>
                      <Header logged={this.state.isLogged} name={this.state.name} onLogin={this.handleAuth} onLogout={this.handleLogout}
                      />
                      <Nav />
                      <Invitados/>
                    </div>
                  )
              }else{
                  return(
                    <div>
                      <Header logged={this.state.isLogged} name={this.state.name} onLogin={this.handleAuth} onLogout={this.handleLogout}
                        />
                      <div className="notLogWarn">Tienes que estar registrado para acceder</div>
                    </div>
                  )
              }

        }} />
        <Match pattern='/productos' render = {() => {

              if(this.state.user){
                  return(
                    <div>
                      <Header logged={this.state.isLogged} name={this.state.name} onLogin={this.handleAuth} onLogout={this.handleLogout}
                      />
                      <Nav />
                      <Productos />
                    </div>
                  )
              }else{
                  return(
                    <div>
                      <Header logged={this.state.isLogged} name={this.state.name} onLogin={this.handleAuth} onLogout={this.handleLogout}
                        />
                      <div className="notLogWarn">Tienes que estar registrado para acceder</div>
                    </div>
                  )
              }

        }} />
        <Match pattern='/sponsors' render = {() => {
            
              if(this.state.user){
                  return(
                    <div>
                      <Header logged={this.state.isLogged} name={this.state.name} onLogin={this.handleAuth} onLogout={this.handleLogout}
                        />
                      <Nav />
                      <Sponsors/>
                    </div>
                  )
              }else{
                  return(
                    <div>
                      <Header logged={this.state.isLogged} name={this.state.name} onLogin={this.handleAuth} onLogout={this.handleLogout}
                        />
                      <div className="notLogWarn">Tienes que estar registrado para acceder</div>
                    </div>
                  )
              }
        }} />
        <Match pattern='/frontpage' render = {() => {
            
                  return(
                    <div>
                      <FrontPage/>
                    </div>
                  )
        }} />

      </div>
      </HashRouter>
    );
  }
}

export default App;
