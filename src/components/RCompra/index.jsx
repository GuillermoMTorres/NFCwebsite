import React, { Component } from 'react';
import firebase from 'firebase';
import uuid from 'uuid';


class RCompra extends Component{
	constructor(){
		super();
		this.state = {
			registrosCompra: [],
			onEdit: -1
		}

	this.addData = this.addData.bind(this)
	this.removeData = this.removeData.bind(this)
	}

	componentWillMount(){
		let a = [];

		firebase.database().ref('Rcompra').on('child_added', snapshot => {
			
			if(snapshot.val()!=="text"){ //Text -> Valor por defecto de firebase

			var newSnapshot = {} //Añadimos la unique key al snapshot
			newSnapshot = snapshot.val()
			newSnapshot.id = uuid.v4()
			newSnapshot.key = snapshot.key
			a.push(newSnapshot);

				this.setState({
					registrosCompra: a				
				})
			}
		})

		firebase.database().ref('Rcompra').on('child_removed', snapshot => {

			if(snapshot.val()!=="text"){ //Text -> Valor por defecto de firebase

			a.forEach(function(element, index) {

		    if(element.Nombre === snapshot.val().Nombre){

		    	a.splice(index, 1)
		    }

		});
				this.setState({
					registrosCompra: a				
				})
			}
		})

		firebase.database().ref('Rcompra').on('child_changed', snapshot => {

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
					registrosCompra: a,
					onEdit: -1				
				})
			}
		})

	}

 	addData(e){
 		e.preventDefault()
	 		const record = {
	 		  ID:e.target.id.value,
		      DNI: e.target.dni.value,
		      Cantidad: e.target.cantidad.value,
		      Productos: e.target.productos.value,
		      Fecha_compra: e.target.f_compra.value,
		      Comentario: e.target.comentario.value
		    }

	    const dbRef = firebase.database().ref('Rcompra');
	    const newSponsor = dbRef.push();
	    newSponsor.set(record)
 	}
 	removeData(e){
 		let key = e.target.name;
		let ref = firebase.database().ref('Rcompra');
		ref.orderByChild('ID').equalTo(key).once('value', snapshot => {
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
		let idDef = e.target.id.value || e.target.id.placeholder
		let dniDef = e.target.dni.value || e.target.dni.placeholder
		let prodDef = e.target.productos.value || e.target.productos.placeholder
		let cantidadDef = e.target.cantidad.value || e.target.cantidad.placeholder
		let fcompraDef = e.target.f_compra.value || e.target.f_compra.placeholder
		let comentarioDef = e.target.comentario.value || e.target.comentario.placeholder

	 		const record = {
	 		  ID:  idDef,
		      Productos: prodDef,
		      DNI: dniDef,
		      Cantidad: cantidadDef,
		      Fecha_compra: fcompraDef,
		      Comentario: comentarioDef
		    }
		
 		let key = e.target.id.value || e.target.id.placeholder;
		let ref = firebase.database().ref('Rcompra');
		ref.orderByChild('ID').equalTo(key).once('value', snapshot => {
		     let updates = {};
		     snapshot.forEach(child => updates[child.key] = record);
		     ref.update(updates);
		});


	}

	renderMapText (index, rcompra){
		if(this.state.onEdit === index)
		{
			return(
				<tr key={rcompra.id}>
					<td><input name="id" placeholder={rcompra.ID}/></td>
					<td><input name="dni" placeholder={rcompra.DNI}/></td>
					<td><input name="productos" placeholder={rcompra.Productos}/></td>
					<td><input name="cantidad" placeholder={rcompra.Cantidad}/></td>
					<td><input name="f_compra" placeholder={rcompra.Fecha_compra}/></td>
					<td><input name="comentario" placeholder={rcompra.Comentario}/>
					 	<input type="submit" value="Submit"/>
					 	<button type="button" name={rcompra.Nombre} onClick={() => this.check(index)}>Cancelar</button>
					</td>
				</tr>
			)
		}else{
			return(
				<tr key={rcompra.id}>
					<td>{rcompra.ID}</td>
					<td>{rcompra.DNI}</td>
					<td>{rcompra.Productos}</td>
					<td>{rcompra.Cantidad}</td>
					<td>{rcompra.Fecha_compra}</td>
					<td>{rcompra.Comentario}
					<button type="button" name={rcompra.ID} onClick={this.removeData}>Remove</button>
					<button type="button" name={rcompra.Nombre} onClick={() => this.check(index)}>Edit</button>
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
				<p>Registros de Compra</p>
			</div>
			<div className="content-main">
			<form onSubmit={this.test}>
					<table className="striped bordered condensed hover">
					  <thead className="thead-inverse">
				    <tr>
				      <th>ID</th>
				      <th>Dni</th>
				      <th>Productos</th>
				      <th>Cantidad</th>
				      <th>F. de Compra</th>
				      <th>Comentario</th>
				    </tr>
				  </thead>
				  <tbody>
				{
				this.state.registrosCompra.map((rcompra, index) => (

						this.renderMapText(index, rcompra)	
					))
				}
				</tbody>
				</table>
				</form>
			<div className="addNewSponsor">
				<form onSubmit={this.addData}>
					<label>ID</label>
					<input id="testing" type="text" name="id" placeholder="Inserta el DNI"></input>
					<label>DNI</label>
					<input id="testing" type="text" name="dni" placeholder="Inserta el DNI"></input>
					<label>Productos</label>
					<textarea cols="100" name="productos" placeholder="Inserta la edad"></textarea>
					<label>Cantidad</label>
					<textarea cols="100" name="cantidad" placeholder="Inserta el nombre de la entrada"></textarea>
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

export default RCompra