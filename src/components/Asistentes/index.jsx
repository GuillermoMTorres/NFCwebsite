import React, { Component } from 'react';
import firebase from 'firebase';
import uuid from 'uuid';


class Asistentes extends Component{
	constructor(){
		super();
		this.state = {
			asistentes: [],
			onEdit: -1
		}

	this.addData = this.addData.bind(this)
	this.removeData = this.removeData.bind(this)
	}

	componentWillMount(){
		let a = [];

		firebase.database().ref('Asistentes').on('child_added', snapshot => {
			
			if(snapshot.val()!=="text"){ //Text -> Valor por defecto de firebase

			var newSnapshot = {} //Añadimos la unique key al snapshot
			newSnapshot = snapshot.val()
			newSnapshot.id = uuid.v4()
			newSnapshot.key = snapshot.key
			a.push(newSnapshot);

				this.setState({
					asistentes: a				
				})
			}
		})

		firebase.database().ref('Asistentes').on('child_removed', snapshot => {

			if(snapshot.val()!=="text"){ //Text -> Valor por defecto de firebase

			a.forEach(function(element, index) {

		    if(element.Nombre === snapshot.val().Nombre){

		    	a.splice(index, 1)
		    }

		});
				this.setState({
					asistentes: a				
				})
			}
		})

		firebase.database().ref('Asistentes').on('child_changed', snapshot => {
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
					asistentes: a,
					onEdit: -1				
				})
			}
		})

	}

 	addData(e){
 		e.preventDefault()
	 		const record = {

	 		  Nombre: e.target.nombre.value,
		      DNI: e.target.dni.value,
		      Correo: e.target.correo.value,
		      Edad: e.target.edad.value,
		      Entrada: e.target.entrada.value,
		      Fecha_compra: e.target.f_compra.value,
		      Comentario: e.target.comentario.value
		    }

	    const dbRef = firebase.database().ref('Asistentes');
	    const newSponsor = dbRef.push();
	    newSponsor.set(record)
 	}
 	removeData(e){
 		let key = e.target.name;
		let ref = firebase.database().ref('Asistentes');
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
		let dniDef = e.target.dni.value || e.target.dni.placeholder
		let correoDef = e.target.correo.value || e.target.correo.placeholder
		let edadDef = e.target.edad.value || e.target.edad.placeholder
		let entradaDef = e.target.entrada.value || e.target.entrada.placeholder
		let fcompraDef = e.target.f_compra.value || e.target.f_compra.placeholder
		let comentarioDef = e.target.comentario.value || e.target.comentario.placeholder

	 		const record = {
		      Nombre: nameDef,
		      DNI: dniDef,
		      Correo: correoDef,
		      Edad: edadDef,
		      Entrada: entradaDef,
		      Fecha_compra: fcompraDef,
		      Comentario: comentarioDef
		    }
		
 		let key = e.target.nombre.placeholder;
		let ref = firebase.database().ref('Asistentes');
		ref.orderByChild('Nombre').equalTo(key).once('value', snapshot => {
		     let updates = {};
		     snapshot.forEach(child => updates[child.key] = record);
		     ref.update(updates);
		});


	}

	renderMapText (index, asistente){
		if(this.state.onEdit === index)
		{
			return(
				<tr key={asistente.id}>
					<td><input name="nombre" placeholder={asistente.Nombre}/></td>
					<td><input name="dni" placeholder={asistente.DNI}/></td>
					<td><input name="correo" placeholder={asistente.Correo}/></td>
					<td><input name="edad" placeholder={asistente.Edad}/></td>
					<td><input name="entrada" placeholder={asistente.Entrada}/></td>
					<td><input name="f_compra" placeholder={asistente.Fecha_compra}/></td>
					<td><input name="comentario" placeholder={asistente.Comentario}/>
					 	<input type="submit" value="Submit"/>
					 	<button type="button" name={asistente.Nombre} onClick={() => this.check(index)}>Cancelar</button>
					</td>
				</tr>
			)
		}else{
			return(
				<tr key={asistente.id}>
					<td>{asistente.Nombre}</td>
					<td>{asistente.DNI}</td>
					<td>{asistente.Correo}</td>
					<td>{asistente.Edad}</td>
					<td>{asistente.Entrada}</td>
					<td>{asistente.Fecha_compra}</td>
					<td>{asistente.Comentario}
					<button name={asistente.Nombre} onClick={this.removeData}>Remove</button>
					<button type="button" name={asistente.Nombre} onClick={() => this.check(index)}>Edit</button>
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
				<p>Lista de Asistentes</p>
			</div>
			<div className="content-main">
			<form onSubmit={this.test}>
					<table className="striped bordered condensed hover">
					  <thead className="thead-inverse">
				    <tr>
				      <th>Nombre</th>
				      <th>Dni</th>
				      <th>Correo</th>
				      <th>Edad</th>
				      <th>Entrada</th>
				      <th>F. de Compra</th>
				      <th>Comentario</th>
				    </tr>
				  </thead>
				  <tbody>
				{
				this.state.asistentes.map((asistente, index) => (

						this.renderMapText(index, asistente)	
					))
				}
				</tbody>
				</table>
				</form>
			<div className="addNewSponsor">
				<form onSubmit={this.addData}>
					<label>Nombre</label>
					<input id="testing" type="text" name="nombre" placeholder="Nombre"></input>
					<label>DNI</label>
					<input id="testing" type="text" name="dni" placeholder="Inserta el DNI"></input>
					<label>Correo</label>
					<input id="testing" type="mail" name="correo" placeholder="Inserta el correo"></input>
					<label>Edad</label>
					<textarea cols="100" name="edad" placeholder="Inserta la edad"></textarea>
					<label>Entrada</label>
					<textarea cols="100" name="entrada" placeholder="Inserta el nombre de la entrada"></textarea>
					<label>F. de Compra</label>
					<textarea cols="100" name="f_compra" placeholder="Formato dd/mm/yyyy hh:mm:ss"></textarea>
					<label>Comentario</label>
					<textarea cols="100" name="comentario" placeholder="Inserta el comentario"></textarea>
					<input type="submit" value="Submit"></input>
				</form>
			</div>
			</div>

		</div>
    )

	}


}

export default Asistentes