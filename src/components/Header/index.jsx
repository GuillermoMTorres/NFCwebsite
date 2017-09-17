import React, { Component } from 'react';
import './header.css';

class Header extends Component {

	constructor(props){
		super(props);

	this.onLogin = this.onLogin.bind(this)
	this.onLogout = this.onLogout.bind(this)
	}

	onLogin(){
		this.props.onLogin()
	}
	onLogout(){
		this.props.onLogout()
	}

  	renderLoginBt(){

   		if(this.props.logged){
        	return(
            	<span className="logBtn" onClick={this.onLogout}>Salir</span>
        	)
    	}else{
      		return(
      			<span className="logBtn" onClick={this.onLogin}>Log In</span>
      		)
    	}
  }

  render() {
    return (
		<div className="header">
			<span className="header-tittle">Website Dashboard</span>
			{this.renderLoginBt()}
		</div>
    );
  }

}

export default Header;