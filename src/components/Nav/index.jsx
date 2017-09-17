import React, { Component } from 'react';
import { Link } from 'react-router'
import styles from './nav.css';

class Nav extends Component{
	constructor(){
		super()
	}

  render() {
    return (
		<div className="nav">

			<ul>
				<Link to='/'>
					<li>ANALITYCS</li>
				</Link>

				<Link to='/asistentes'>
					<li>ASISTENTES</li>
				</Link>

				<li>ENTRADAS</li>

				<Link to="/invitados">
					<li>INVITADOS</li>
				</Link>

				<Link to='/sponsors'>
					<li>SPONSORS</li>
				</Link>

				<li>ACTIVIDADES</li>

				<Link to="/productos">
				<li>PRODUCTOS</li>
				</Link>
				
				<li>ACCESO</li>
				<li>REG. COMPRA</li>
				<li>BALANCE</li>
			</ul>
	</div>
    )

	}

}

export default Nav