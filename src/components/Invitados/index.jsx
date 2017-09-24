import React, { Component } from 'react';
import firebase from 'firebase';
import { table } from 'react-bootstrap';
import uuid from 'uuid';

class Invitados extends Component{
	constructor(){
		super();
		this.state = {
			invitados: [],
			onEdit: -1
		}

	this.addData = this.addData.bind(this)
	this.removeData = this.removeData.bind(this)
	}

	componentWillMount(){
		let a = [];

		firebase.database().ref('Invitados').on('child_added', snapshot => {
			
			if(snapshot.val()!=="text"){ //Text -> Valor por defecto de firebase

			var newSnapshot = {} //Añadimos la unique key al snapshot
			newSnapshot = snapshot.val()
			newSnapshot.id = uuid.v4()
			newSnapshot.key = snapshot.key
			a.push(newSnapshot);

				this.setState({
					invitados: a				
				})
			}
		})

		firebase.database().ref('Invitados').on('child_removed', snapshot => {

			if(snapshot.val()!=="text"){ //Text -> Valor por defecto de firebase

			a.forEach(function(element, index) {

		    if(element.Nombre === snapshot.val().Nombre){

		    	a.splice(index, 1)
		    }

		});
				this.setState({
					invitados: a				
				})
			}
		})

		firebase.database().ref('Invitados').on('child_changed', snapshot => {
			if(snapshot.val()!=="text"){ //Text -> Valor por defecto de firebase

			a.forEach(function(element, index) {

		    if(element.key === snapshot.key){

		    var newSnapshot = {} //Añadimos la unique key al snapshot
			newSnapshot = snapshot.val()
			newSnapshot.id = uuid.v4()
			newSnapshot.key = snapshot.key
		    	a[index] = newSnapshot
		    }

		});
				this.setState({
					invitados: a,
					onEdit: -1				
				})
			}
		})

	}

 	addData(e){
 		e.preventDefault()
	 		const record = {
		      Nombre: e.target.nombre.value,
		      Descripcion: e.target.descripcion.value,
		      Imagen: e.target.imagen.value
		    }

	    const dbRef = firebase.database().ref('Invitados');
	    const newSponsor = dbRef.push();
	    newSponsor.set(record)
 	}
 	removeData(e){
 		let key = e.target.name;
		let ref = firebase.database().ref('Invitados');
		ref.orderByChild('Nombre').equalTo(key).once('value', snapshot => {
		     let updates = {};
		     snapshot.forEach(child => updates[child.key] = null);
		     ref.update(updates);
		});

 	}
 	check(index){
 		console.log(index)
 		if(index===this.state.onEdit){
	 		this.setState({
				onEdit: -1				
			})
 		}else{
	 		this.setState({
				onEdit: index				
			})
 		}

 	}

	test(e){
		e.preventDefault();
		let nameDef = e.target.nombre.value || e.target.nombre.placeholder
		let descDef = e.target.descripcion.value || e.target.descripcion.placeholder
		let imgDef = e.target.imagen.value ||e.target.imagen.placeholder

	 		const record = {
		      Nombre: nameDef,
		      Descripcion: descDef,
		      Imagen: imgDef
		    }
		
 		let key = e.target.nombre.placeholder;
		let ref = firebase.database().ref('Invitados');
		ref.orderByChild('Nombre').equalTo(key).once('value', snapshot => {
		     let updates = {};
		     snapshot.forEach(child => updates[child.key] = record);
		     ref.update(updates);
		});


	}

	renderMapText (index, invitado){
		if(this.state.onEdit === index)
		{
			return(
				<tr key={invitado.id}>
					<td><input name="nombre" placeholder={invitado.Nombre}/></td>
					<td><input name="descripcion" placeholder={invitado.Descripcion}/></td>
					<td><input name="imagen" placeholder={invitado.Imagen}/>
					 	<input type="submit" value="Submit"/>
					 	<button type="button" name={invitado.Nombre} onClick={() => this.check(index)}>Cancelar</button>
					</td>
				</tr>
			)
		}else{
			return(
				<tr key={invitado.id}>
					<td>{invitado.Nombre}</td>
					<td>{invitado.Descripcion}</td>
					<td>{invitado.Imagen}
					<button name={invitado.Nombre} onClick={this.removeData}>Remove</button>
					<button type="button" name={invitado.Nombre} onClick={() => this.check(index)}>Edit</button>
					</td>
				</tr>
			)
		}
	}


  render() {

    return (
    	
		<div className="content">
			<div className="content-header">
				<div className="peak"></div>
				<p>Lista de Invitados</p>
			</div>
			<div className="content-main">
			<form onSubmit={this.test}>
					<table className="striped bordered condensed hover">
					  <thead className="thead-inverse">
				    <tr>
				      <th>Name</th>
				      <th>Description</th>
				      <th>Imagen</th>
				    </tr>
				  </thead>
				  <tbody>
				{
				this.state.invitados.map((invitado, index) => (

						this.renderMapText(index, invitado)	
					))
				}
				</tbody>
				</table>
				</form>
			<div className="addNewSponsor">
				<form onSubmit={this.addData}>
					<label>Nombre</label>
					<input id="testing" type="text" name="nombre" placeholder="Inserta el nombre"></input>
					<label>Descripción</label>
					<textarea cols="100" name="descripcion" placeholder="Inserta descripcion"></textarea>
					<label>Imagen</label>
					<input id="testing" type="text" name="imagen" placeholder="Inserta el nombre"></input>
					<input type="submit" value="Submit"></input>
				</form>
			</div>
			</div>

		</div>
    )

	}

}

export default Invitados