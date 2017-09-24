import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router'
import { Row, Col } from 'react-bootstrap';
import uuid from 'uuid';

import './webticket.css';

class WebTicket extends Component{

	constructor(props){
		super(props)
		this.state = {
			entradas: [],
			selected: -1,
			nameSelected: "",
		}
		this.purchaseTicket = this.purchaseTicket.bind(this)
	}

	componentWillMount(){
		let a = [];

		firebase.database().ref('Entradas').on('child_added', snapshot => {
			
			if(snapshot.val()!=="text"){ //Text -> Valor por defecto de firebase

			var newSnapshot = {} //Añadimos la unique key al snapshot
			newSnapshot = snapshot.val()
			newSnapshot.id = uuid.v4()
			newSnapshot.key = snapshot.key
			a.push(newSnapshot);

				this.setState({
					entradas: a				
				})
			}
		})
		
	}

	renderEntradasMap (index, entrada){
		let selected = "row ticket-row"
		if(index===this.state.selected){
			selected = selected + " ticketSelected"
		}
			return(
				<Row key={entrada.key} onClick={() => this.selectTicket(index, entrada.Nombre)} className={selected}>
						<Col xs={3} className="left-ticket-div">
							<p>{entrada.Nombre}</p>
						</Col>
						<Col xs={6} className="center-ticket-div">
							<p>{entrada.Descripcion}</p>
						</Col>
						<Col xs={3} className="right-ticket-div">
							<p>{entrada.Precio}</p>
						</Col>
				</Row>
			)
	}
	selectTicket(index, nombre){
	 		this.setState({
				selected: index,
				nameSelected: this.state.entradas[index].Nombre				
			})
 	}

	purchaseTicket(e){
		e.preventDefault()
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth()+1; //January is 0!
		let yyyy = today.getFullYear();
		let hh = today.getHours();
		let mn = today.getMinutes();
		let ss = today.getSeconds();

		if(dd<10) {
		    dd = '0'+dd
		} 

		if(mm<10) {
		    mm = '0'+mm
		}

		if(hh<10){
			hh = '0'+hh
		}
		if(mn<10){
			mn = '0'+mn
		}if(ss<10){
			ss = '0'+ss
		}

		today = dd + '/' + mm + '/' + yyyy + " " + hh + ":" + mn + ":" + ss;

		const record = {
		 		  Nombre: e.target.nombre.value,
			      DNI: e.target.dni.value,
			      Correo: e.target.correo.value,
			      Edad: e.target.edad.value,
			      Entrada: this.state.nameSelected,
			      Fecha_compra: today,
			      Comentario: ""
		}


	         this.props.onUpload(e,record)
	      
 	}



	render() {
    return (
    <div>
		<div className="ticket-container">
			
			<div className="section-tittle">
				<p>Entradas</p>
			</div>

			<Link to="/entradas">
				<div className="ticket-card">

				</div>
			</Link>
			<div className="ticket-card">
					{
						this.state.entradas.map((entrada, index) => (

							this.renderEntradasMap(index, entrada)	
						))
					}
			</div>>
		</div>
		<div className="ticket-form">
		<form onSubmit={this.purchaseTicket}>
 			<div className="form-group">
	    		<label>Nombre</label>
	    		<input type="text" className="form-control" name="nombre" placeholder="Password"></input>
	  		</div>
 			<div className="form-group">
    			<label>Correo</label>
    			<input type="email" className="form-control" name="correo" aria-describedby="Email" placeholder="Enter email"></input>
 			</div>
 			<div className="form-group">
	    		<label>Edad</label>
	    		<input type="text" className="form-control" name="edad" placeholder="Edad"></input>
	  		</div>
 			<div className="form-group">
	    		<label>DNI</label>
	    		<input type="text" className="form-control" name="dni" placeholder="Dni"></input>
	  		</div>
			<div className="form-group">
				<input type="file" name="fupload"></input>
	  		</div>
	  		<button type="submit" className="btn btn-primary">Submit</button>
  		</form>
		</div>
	</div>
    )

	}
}
	
export default WebTicket