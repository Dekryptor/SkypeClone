import React, { Component } from 'react';

class ContactDetail extends Component {

  render() {

  	let align;
	if(this.props.alignment){
        align = 'bubble you';
	}else{
		align = 'bubble me';
	}
  
    return (
      <div className="chat">
        <div className={align} >Hello there! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
      </div>
      );    
  }
}

export default ContactDetail;
