import React, { Component } from 'react';
import firebase from 'firebase';
import {HashRouter, Match} from 'react-router'

import './App.css';

import Header from '../Header'
import Nav from '../Nav'
import Main from '../Main'
import Sponsors from '../Sponsors'
import Rcompra from '../RCompra'
import Productos from '../Productos'
import Invitados from '../Invitados'
import Accesos from '../Accesos'
import Entradas from '../Entradas'
import Actividades from '../Actividades'
import Asistentes from '../Asistentes'
import FrontPage from '../FrontPage'
import WebTicket from '../WebTicket'
import WebHeader from '../WebHeader'

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
  this.handleUpload = this.handleUpload.bind(this);
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

  handleUpload (event,record) {
      event.preventDefault()
      console.log(record.Nombre)
      
      const file = event.target.fupload.files[0];
      const storageRef = firebase.storage().ref(`/DNI/${record.DNI}/dni`)
      const task = storageRef.put(file);
      if(file.size > 5242880){
        alert(`El archivo que has subido pesa demasiado. No se pueden subir archivos de más de 5MB`)
      }else{
        task.on('state_changed', snapshot => {
          let percentage = (snapshot.bytesTransfered / snapshot.totalBytes) * 100
          this.setState({
            uploadValue: percentage
          })
        }, error => {
          console.log(error.message)
        }, () => {
          const dbRef = firebase.database().ref('Asistentes');
          const newAsistente = dbRef.push();
          newAsistente.set(record);
        });
      }
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




  render() {
    return (
      <HashRouter>
      <div>
        <Match exactly pattern ="/ems" render ={() => {  

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
        <Match pattern ="/ems/invitados" render ={() => {  

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
        <Match pattern ="/ems/accesos" render ={() => {  

              if(this.state.user){
                  return(
                    <div>
                      <Header logged={this.state.isLogged} name={this.state.name} onLogin={this.handleAuth} onLogout={this.handleLogout}
                      />
                      <Nav />
                      <Accesos/>
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
        <Match pattern ="/ems/asistentes" render ={() => {  

              if(this.state.user){
                  return(
                    <div>
                      <Header logged={this.state.isLogged} name={this.state.name} onLogin={this.handleAuth} onLogout={this.handleLogout}
                      />
                      <Nav />
                      <Asistentes/>
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
        <Match pattern ="/ems/rcompra" render ={() => {  

              if(this.state.user){
                  return(
                    <div>
                      <Header logged={this.state.isLogged} name={this.state.name} onLogin={this.handleAuth} onLogout={this.handleLogout}
                      />
                      <Nav />
                      <Rcompra/>
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
        <Match pattern ="/ems/entradas" render ={() => {  

              if(this.state.user){
                  return(
                    <div>
                      <Header logged={this.state.isLogged} name={this.state.name} onLogin={this.handleAuth} onLogout={this.handleLogout}
                      />
                      <Nav />
                      <Entradas/>
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
        <Match pattern='/ems/productos' render = {() => {

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
        <Match pattern='/ems/sponsors' render = {() => {
            
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
        <Match pattern='/ems/actividades' render = {() => {
            
              if(this.state.user){
                  return(
                    <div>
                      <Header logged={this.state.isLogged} name={this.state.name} onLogin={this.handleAuth} onLogout={this.handleLogout}
                        />
                      <Nav />
                      <Actividades/>
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
        <Match exactly pattern='/' render = {() => {
            
                  return(
                    <div>
                      <WebHeader/>
                      <FrontPage/>
                    </div>
                  )
        }} />
        <Match pattern='/tickets' render = {() => {
            
                  return(
                    <div>
                      <WebHeader/>
                      <WebTicket onUpload={this.handleUpload} />
                    </div>
                  )
        }} />
      </div>
      </HashRouter>
    );
  }
}

export default App;
