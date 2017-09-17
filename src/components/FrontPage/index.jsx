import React, { Component } from 'react';
import './frontpage.css';
import firebase from 'firebase';
import uuid from 'uuid';


import logo from './musicf.png';
import invit from './in2.png';
import arrow from './arrow.png';

class FrontPage extends Component{

	constructor(){
		super();
		this.state = {
			invitados: []
		}
	}
	


	componentWillMount(){
		let a = [];

		firebase.database().ref('Invitados').on('child_added', snapshot => {
			
			if(snapshot.val()!="text"){ //Text -> Valor por defecto de firebase

			var newSnapshot = new Object() //Añadimos la unique key al snapshot
			newSnapshot = snapshot.val()
			newSnapshot.id = uuid.v4()
			newSnapshot.key = snapshot.key
			a.push(newSnapshot);

				this.setState({
					invitados: a				
				})
			}
		console.log("holis " + this.state.invitados)
		});
	}
	renderMapText (index, invitado){
			{
				return(
						<div className="inv-card">
							<img src={invit}/>
							<p>{invitado.Nombre}</p>
						</div>
				)
			
			}
	}

  render() {
    return (
    	<div>
			<div className="w-header">
				<div className="w-header-top">
					<div className="w-mainheader-top">
						<span className="w-header-left">Auditorio Nacional de Música, Madrid, España</span>
						<span>22-25 Septiembre</span>
					</div>
					<div className="w-subheader-top">
						<nav>
							<ul>
								<li className="left"><a href="website.html">Inicio</a></li>
								<li className="left"><a href="#">Invitados</a></li>
								<li className="left"><a href="tickets.html">Tickets</a></li>
								<li className="right"><a href="#">F.A.Q</a></li>
								<li className="right"><a href="tienda.html">Tienda</a></li>
								<li className="right"><a href="horario.html">Horario</a></li>
							</ul>
						</nav>
						<div className="clear"></div>
					</div>
				</div>
				<div className="w-header-content">
					<div className="w-header-content-center">
						<img src ={logo} />
						<p className="head-tittle">MUSIC FEST</p>
						<span className="test">22-25 SEPT</span>
						<p className="head-description">Bienvenido a la nueva experiencia</p>
					</div>
					<div className="buyTickets"></div>
				</div>

			</div>

			<div className="w-content">

				<div className="w-invitados">
					<div className="w-invitados-header">
						<p className="section-tittle">Invitados</p>
						<span>Conoce a más invitados <img src={arrow}/></span>
					</div>
					<div className="w-invitados-content">
					{
						this.state.invitados.map((invitado, index) => (

							this.renderMapText(index, invitado)	
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
						<div className="act-card act-left">
							<p>Nombre Actividad 1</p>
							<p>Horario Actividad 1</p>
							<p className="act-left-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cumque expedita harum explicabo veniam dicta. Repellat maxime ab in blanditiis, facilis exercitationem repudiandae, nam voluptate non officia consequuntur, ex architecto.</p>
						</div>
						<div className="act-card act-right">
							<p>Nombre Actividad 1</p>
							<p>Horario Actividad 1</p>
							<p className="act-right-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cumque expedita harum explicabo veniam dicta. Repellat maxime ab in blanditiis, facilis exercitationem repudiandae, nam voluptate non officia consequuntur, ex architecto.</p>
						</div>
						<div className="act-card act-left">
							<p>Nombre Actividad 1</p>
							<p>Horario Actividad 1</p>
							<p className="act-left-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cumque expedita harum explicabo veniam dicta. Repellat maxime ab in blanditiis, facilis exercitationem repudiandae, nam voluptate non officia consequuntur, ex architecto.</p>
						</div>
					</div>

				</div>

				<div className="w-footer">
					<div className="row">
					<div className="col-1">
					<img src ={logo} />
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
