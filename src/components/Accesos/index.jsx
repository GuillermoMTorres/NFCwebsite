import React, { Component } from 'react';
import firebase from 'firebase';
import { table } from 'react-bootstrap';
import uuid from 'uuid';

class Accesos extends Component{
	constructor(){
		super();
		this.state = {
			accesos: [],
		}
	}

	componentWillMount(){
		let a = [];

		firebase.database().ref('Accesos').on('child_added', snapshot => {
			
			if(snapshot.val()!=="text"){ //Text -> Valor por defecto de firebase

			var newSnapshot = {} //Añadimos la unique key al snapshot
			newSnapshot = snapshot.val()
			newSnapshot.id = uuid.v4()
			newSnapshot.key = snapshot.key
			a.push(newSnapshot);

				this.setState({
					accesos: a				
				})
			}
		})

	}

	renderMapText (index, Accesos){
			return(
				<tr key={Accesos.id}>
					<td>{Accesos.DNI}</td>
					<td>{Accesos.F_acceso}</td>
					<td>{Accesos.Ent_Sal}</td>
				</tr>
			)
		
	}


  render() {

    return (
    	
		<div className="content">
			<div className="content-header">
				<div className="peak"></div>
				<p>Lista de Accesos</p>
			</div>
			<div className="content-main">
			<form onSubmit={this.test}>
					<table className="striped bordered condensed hover">
					  <thead className="thead-inverse">
				    <tr>
				      <th>DNI</th>
				      <th>Fecha de acceso</th>
				      <th>Entrada o Salida</th>
				    </tr>
				  </thead>
				  <tbody>
				{
				this.state.accesos.map((acceso, index) => (

						this.renderMapText(index, acceso)	
					))
				}
				</tbody>
				</table>
				</form>
			</div>

	</div>
    )

	}

}

export default Accesos