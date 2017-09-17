import React, { Component } from 'react';
import firebase from 'firebase';
import uuid from 'uuid';

class Productos extends Component{
	constructor(){
		super()
		this.state = {
			productos: [],
			onEdit: -1
		}
	this.addData = this.addData.bind(this)
	this.removeData = this.removeData.bind(this)
	}

	componentWillMount(){
		let a = [];

		firebase.database().ref('Productos').on('child_added', snapshot => {
			
			if(snapshot.val()!="text"){ //Text -> Valor por defecto de firebase

			var newSnapshot = new Object() //Añadimos la unique key al snapshot
			newSnapshot = snapshot.val()
			newSnapshot.id = uuid.v4()
			newSnapshot.key = snapshot.key
			a.push(newSnapshot);

				this.setState({
					productos: a				
				})
			}
		})

		firebase.database().ref('Productos').on('child_removed', snapshot => {
			console.log("Holis removed" + snapshot.val().Nombre)
			if(snapshot.val()!="text"){ //Text -> Valor por defecto de firebase

			a.forEach(function(element, index) {

		    if(element.Nombre === snapshot.val().Nombre){
		    	console.log("holis if")
		    	a.splice(index, 1)
		    }
		    console.log(a);
		});
				this.setState({
					productos: a				
				})
			}
		})

		firebase.database().ref('Productos').on('child_changed', snapshot => {
			console.log("Holis child change" + snapshot.key)
			if(snapshot.val()!="text"){ //Text -> Valor por defecto de firebase

			a.forEach(function(element, index) {

		    if(element.key === snapshot.key){

		    var newSnapshot = new Object() //Añadimos la unique key al snapshot
			newSnapshot = snapshot.val()
			newSnapshot.id = uuid.v4()
			newSnapshot.key = snapshot.key
		    	a[index] = newSnapshot
		    }

		});
		this.setState({
					productos: a,
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
		      Precio: e.target.precio.value,
		      Imagen: e.target.imagen.value,
		      ID_producto: e.target.idProducto.value
		    }

	    const dbRef = firebase.database().ref('Productos');
	    const newSponsor = dbRef.push();
	    newSponsor.set(record)
 	}
 	removeData(e){	
 		let key = e.target.name;
		let ref = firebase.database().ref('Productos');
		ref.orderByChild('Nombre').equalTo(key).once('value', snapshot => {
		     let updates = {};
		     snapshot.forEach(child => updates[child.key] = null);
		     ref.update(updates);
		});

 	}
 	check(index){
 		console.log(index)
 		if(index==this.state.onEdit){
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
		let idDef = e.target.idProd.value ||e.target.idProd.placeholder
		let preDef = e.target.precio.value ||e.target.precio.placeholder

	 		const record = {
		      Nombre: nameDef,
		      Descripcion: descDef,
		      Imagen: imgDef,
		      ID_producto: idDef,
		      Precio: preDef
		    }
		
 		let key = e.target.nombre.placeholder;
		let ref = firebase.database().ref('Productos');
		ref.orderByChild('Nombre').equalTo(key).once('value', snapshot => {
		     let updates = {};
		     snapshot.forEach(child => updates[child.key] = record);
		     ref.update(updates);
		});


	}

	renderMapText (producto, index){
		if(this.state.onEdit == index)
		{
			return(
				<tr key={producto.id}>
					<td><input name="idProd" placeholder={producto.ID_producto}/></td>
					<td><input name="nombre" placeholder={producto.Nombre}/></td>
					<td><input name="descripcion" placeholder={producto.Descripcion}/></td>
					<td><input name="precio" placeholder={producto.Precio}/></td>
					<td><input name="imagen" placeholder={producto.Imagen}/>
					 	<input type="submit" value="Submit"/>
					 	<button type="button" name={producto.Nombre} onClick={() => this.check(index)}>Cancelar</button>
					</td>
				</tr>
			)
		}else{
			return(
				<tr key={producto.id}>
					<td>{producto.ID_producto}</td>
					<td>{producto.Nombre}</td>
					<td>{producto.Descripcion}</td>
					<td>{producto.Precio}</td>
					<td>{producto.Imagen}
					<button name={producto.Nombre} onClick={this.removeData}>Remove</button>
					<button type="button" name={producto.Nombre} onClick={() => this.check(index)}>Edit</button>
					</td>
				</tr>
			)
		}
	}

	render(){

		return(

		<div className="content">
			<div className="content-header">
				<div className="peak"></div>
				<p onClick="scrollTo(#asd)">Productos</p>
			</div>
			<div className="content-main">
				<form onSubmit={this.test}>
					<table className="striped bordered condensed hover">
					  <thead className="thead-inverse">
				    <tr>
				      <th>ID</th>
				      <th>Nombre</th>
				      <th>Descripcion</th>
				      <th>Precio</th>
				      <th>Imagen</th>
				    </tr>
				  </thead>
				  <tbody>
				{
				this.state.productos.map((producto, index) => (

						this.renderMapText(producto, index)	
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
					<label>ID</label>
					<input id="testing" type="text" name="idProductos" placeholder="Inserta el nombre"></input>
					<label>Precio</label>
					<input id="testing" type="text" name="precio" placeholder="Inserta el nombre"></input>
					<input type="submit" value="Submit"></input>
				</form>
			</div>
			</div>
			<div id="asd"></div>
		</div>
    )
	}

}

export default Productos