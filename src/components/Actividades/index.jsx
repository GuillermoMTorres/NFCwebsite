import React, { Component } from 'react';
import firebase from 'firebase';
import uuid from 'uuid';


class Actividades extends Component{
	constructor(){
		super();
		this.state = {
			actividades: [],
			onEdit: -1
		}

	this.addData = this.addData.bind(this)
	this.removeData = this.removeData.bind(this)
	}

	componentWillMount(){
		let a = [];

		firebase.database().ref('Actividades').on('child_added', snapshot => {
			
			if(snapshot.val()!=="text"){ //Text -> Valor por defecto de firebase

			var newSnapshot = {} //Añadimos la unique key al snapshot
			newSnapshot = snapshot.val()
			newSnapshot.id = uuid.v4()
			newSnapshot.key = snapshot.key
			a.push(newSnapshot);

				this.setState({
					actividades: a				
				})
			}
		})

		firebase.database().ref('Actividades').on('child_removed', snapshot => {

			if(snapshot.val()!=="text"){ //Text -> Valor por defecto de firebase

			a.forEach(function(element, index) {

		    if(element.Nombre === snapshot.val().Nombre){

		    	a.splice(index, 1)
		    }

		});
				this.setState({
					actividades: a				
				})
			}
		})

		firebase.database().ref('Actividades').on('child_changed', snapshot => {

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
					actividades: a,
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
		      Hora: e.target.hora.value,
		      Dia: e.target.dia.value
		    }

	    const dbRef = firebase.database().ref('Actividades');
	    const newSponsor = dbRef.push();
	    newSponsor.set(record)
 	}
 	removeData(e){
 		let key = e.target.name;
		let ref = firebase.database().ref('Actividades');
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
		let horaDef = e.target.hora.value ||e.target.hora.placeholder
		let diaDef = e.target.dia.value ||e.target.dia.placeholder

	 		const record = {
		      Nombre: nameDef,
		      Descripcion: descDef,
		      Hora: horaDef,
		      Dia: diaDef
		    }
		
 		let key = e.target.nombre.placeholder;
		let ref = firebase.database().ref('Actividades');
		ref.orderByChild('Nombre').equalTo(key).once('value', snapshot => {
		     let updates = {};
		     snapshot.forEach(child => updates[child.key] = record);
		     ref.update(updates);
		});


	}

	renderMapText (index, actividad){
		if(this.state.onEdit === index)
		{
			return(
				<tr key={actividad.id}>
					<td><input name="dia" placeholder={actividad.Dia}/></td>
					<td><input name="hora" placeholder={actividad.Hora}/></td>
					<td><input name="nombre" placeholder={actividad.Nombre}/></td>
					<td><input name="descripcion" placeholder={actividad.Descripcion}/>
					 	<input type="submit" value="Submit"/>
					 	<button type="button" name={actividad.Nombre} onClick={() => this.check(index)}>Cancelar</button>
					</td>
				</tr>
			)
		}else{
			return(
				<tr key={actividad.id}>
					<td>{actividad.Dia}</td>
					<td>{actividad.Hora}</td>
					<td>{actividad.Nombre}</td>
					<td>{actividad.Descripcion}
					<button name={actividad.Nombre} onClick={this.removeData}>Remove</button>
					<button type="button" name={actividad.Nombre} onClick={() => this.check(index)}>Edit</button>
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
				<p>Lista de Actividades</p>
			</div>
			<div className="content-main">
			<form onSubmit={this.test}>
					<table className="striped bordered condensed hover">
					  <thead className="thead-inverse">
				    <tr>
				      <th>Dia</th>
				      <th>Hora</th>
				      <th>Nombre</th>
				      <th>Descripción</th>
				    </tr>
				  </thead>
				  <tbody>
				{
				this.state.actividades.map((actividad, index) => (

						this.renderMapText(index, actividad)	
					))
				}
				</tbody>
				</table>
				</form>
			<div className="addNewSponsor">
				<form onSubmit={this.addData}>
					<label>Dia</label>
					<input id="testing" type="text" name="dia" placeholder="Inserta el dia 23/24/25"></input>
					<label>Hora</label>
					<input id="testing" type="text" name="hora" placeholder="Inserta la hora h:min-h:min"></input>
					<label>Nombre</label>
					<input id="testing" type="text" name="nombre" placeholder="Inserta el nombre"></input>
					<label>Descripción</label>
					<textarea cols="100" name="descripcion" placeholder="Inserta descripcion"></textarea>
					<input type="submit" value="Submit"></input>
				</form>
			</div>
			</div>

		</div>
    )

	}


}

export default Actividades