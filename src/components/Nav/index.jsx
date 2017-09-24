import React, { Component } from 'react';
import { Link } from 'react-router'
import './nav.css';

class Nav extends Component{

  render() {
    return (
		<div className="nav">

			<ul>
				<Link to='/ems'>
					<li>ANALITYCS</li>
				</Link>

				<Link to='/ems/asistentes'>
					<li>ASISTENTES</li>
				</Link>

				<Link to='/ems/entradas'>
					<li>ENTRADAS</li>
				</Link>

				<Link to="/ems/invitados">
					<li>INVITADOS</li>
				</Link>

				<Link to='/ems/sponsors'>
					<li>SPONSORS</li>
				</Link>
				
				<Link to='/ems/actividades'>
					<li>ACTIVIDADES</li>
				</Link>
				
				<Link to="/ems/productos">
					<li>PRODUCTOS</li>
				</Link>
				
				<Link to="/ems/accesos">
					<li>ACCESO</li>
				</Link>

				<Link to="/ems/rcompra">
					<li>REG. COMPRA</li>
				</Link>
				
				<li>BALANCE</li>
			</ul>
	</div>
    )

	}

}

export default Nav