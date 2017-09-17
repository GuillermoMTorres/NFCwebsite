import React, { Component } from 'react';
import Nav from '../Nav'
import './main.css';

class Main extends Component{
	constructor(props){
		super(props)
	}

  render() {
    return (

		<div className="content">
			<div className="content-header">
				<div className="peak"></div>
				<p>Analitica</p>
			</div>
			<div className="content-main">
				<p>Holis, aquí deberia ir analisis de Google Analitycs</p>
			</div>
		</div>

    );

	}

}

export default Main