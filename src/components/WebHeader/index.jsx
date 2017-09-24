import React, { Component } from 'react';
import { Link } from 'react-router'



class WebHeader extends Component{

	render() {
    return (
    		<div className="w-header">
				<div className="w-header-top">
					<div className="w-mainheader-top">
						<span className="w-header-left">Auditorio Nacional de Música, Madrid, España</span>
						<span>22-25 Septiembre</span>
					</div>
					<div className="w-subheader-top">
						<nav>
							<ul>
								<li className="left"><Link to= "/">Inicio</Link></li>
								<li className="left"><a href="">Invitados</a></li>
								<li className="left"><Link to="/tickets">Tickets</Link></li>
								<li className="right"><a href="">F.A.Q</a></li>
								<li className="right"><a href="tienda.html">Tienda</a></li>
								<li className="right"><a href="horario.html">Horario</a></li>
							</ul>
						</nav>
						<div className="clear"></div>
					</div>
				</div>
			</div>
    )

	}
}
	
export default WebHeader