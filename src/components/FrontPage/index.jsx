import React, { Component } from 'react';
import './frontpage.css';
import firebase from 'firebase';
import uuid from 'uuid';
import { Link } from 'react-router'

import logo from './musicf.png';
import arrow from './arrow.png';

class FrontPage extends Component{

	constructor(){
		super();
		this.state = {
			invitados: [],
			actividades: []
		}
	}
	


	componentWillMount(){
		let aux = [];
		let aux2 = [];

		firebase.database().ref('Invitados').on('child_added', snapshot => {
			
			if(snapshot.val()!=="text"){ //Text -> Valor por defecto de firebase

			var newSnapshot = {} //Añadimos la unique key al snapshot
			newSnapshot = snapshot.val()
			newSnapshot.id = uuid.v4()
			newSnapshot.key = snapshot.key
			aux.push(newSnapshot);

				this.setState({
					invitados: aux				
				})
			}
		});

		firebase.database().ref('Actividades').on('child_added', snapshot => {
			
			if(snapshot.val()!=="text"){ //Text -> Valor por defecto de firebase

			var newSnapshot = {} //Añadimos la unique key al snapshot
			newSnapshot = snapshot.val()
			newSnapshot.id = uuid.v4()
			newSnapshot.key = snapshot.key
			aux2.push(newSnapshot);

				this.setState({
					actividades: aux2				
				})
			}
		});
	}
	renderInvitadosMap (index, invitado){

			return(
					<div className="inv-card" key={invitado.key}>
						<img src={invitado.Imagen} alt="Invitado"/>
						<p>{invitado.Nombre}</p>
					</div>
			)
			
	}
	renderActividadesMap (index, actividad){
		var side=""
		var side2=""
		if(index % 2 === 0){
			side="act-card act-left"
			side2="act-left-description"
		}else{
			side="act-card act-right"
			side2="act-right-description"
		}
			
				return(
						<div className={side}>
							<p>{actividad.Nombre}</p>
							<p>{actividad.Dia} {actividad.Hora}</p>
							<p className={side2}>{actividad.Descripcion}</p>
						</div>
				)
			
	}


  render() {
    return (
    	<div>
    		<div className="w-header-content">
					<div className="w-header-content-center">
						<img src ={logo} alt="imagen" />
						<p className="head-tittle">MUSIC FEST</p>
						<span className="test">22-25 SEPT</span>
						<p className="head-description">Bienvenido a la nueva experiencia</p>
					</div>
					<Link to="/tickets">
					<div className="buyTickets"></div>
					</Link>
			</div>

			<div className="w-content">

				<div className="w-invitados">
					<div className="w-invitados-header">
						<p className="section-tittle">Invitados</p>
						<span>Conoce a más invitados <img src={arrow} alt="más invitados"/></span>
					</div>
					<div className="w-invitados-content">
					{
						this.state.invitados.map((invitado, index) => (

							this.renderInvitadosMap(index, invitado)	
						))
					}
					</div>
					<div className="clear"></div>
				</div>

				<div className="w-actividades">
				
					<div className="w-actividades-header">
						<p className="section-tittle">Actividades</p>
					</div>
					<div className="w-actividades-content">
						{
							this.state.actividades.map((actividad, index) => (

								this.renderActividadesMap(index, actividad)	
							))
						}
					</div>

				</div>

				<div className="w-footer">
					<div className="row">
					<div className="col-1">
					<img src ={logo} alt="logo" />
					</div>
					<div className="col">
						<p>	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut suscipit porro vel quia, enim veniam repellat voluptatem modi impedit, id hic nihil sint magni pariatur labore facilis distinctio. Exercitationem, illum.</p>
					</div>
					</div>
				</div>

			</div>
		</div>

    );

	}

}

export default FrontPage
