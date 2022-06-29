import React from "react"
import axios from "axios"

export default class  LoginTemplate extends React.Component {

	constructor(props){
		super(props)

		 this.state = {
            username: '',
            email: '',
            password:''
      
        }
   		this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);

	}

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
	onSubmit(e) {
        e.preventDefault();
        console.log('sex')
        const newUser = {
            username: this.state.username,
            email: this.state.email,
           	password: this.state.password
        }
        if(this.props.mode=="register")
	        if (this.props.user=="user")
	        {
		        axios.post('https://bulkbackend.herokuapp.com/adduser', newUser)
		             .then(res => {
                  if(res.data.success==false)
                  {
                      document.getElementById("AfterSubmit").innerHTML = "email already exist" ;

                  }
                  else{
                      document.getElementById("AfterSubmit").innerHTML = "REGISTERED";
                  }
                 })
                 .catch(function(error) {
                 console.log(error);
             })

		    }
		    else
		    {
	   			axios.post('https://bulkbackend.herokuapp.com/addvendor', newUser)
		             .then(res => {
                  if(res.data.success==false)
                  {
                      document.getElementById("AfterSubmit").innerHTML = "email already exist";

                  }
                  else{
                      document.getElementById("AfterSubmit").innerHTML = "REGISTERED";
                  }
                 })
                 .catch(function(error) {
                 console.log(error);
             })

		    }    
		  else{
			if (this.props.user=="user")
	        {
		        axios.post('https://bulkbackend.herokuapp.com/checkuser', newUser)
		             .then(res => {
                   if(res.data.success==true)
                   {
                      let lol=  {...res.data._doc,type:'user'}
                      localStorage.clear()
                      localStorage.setItem('mydata',JSON.stringify(lol))
                      window.location.assign('/dashboard')
                   }
                   else{
                      document.getElementById("AfterSubmit").innerHTML = "LOGIN FAILED";
                   }
                 })
                 
		    }
		    else
		    {
	   			axios.post('https://bulkbackend.herokuapp.com/checkvendor', newUser)
		             .then(res => 
                 {
                   if(res.data.success==true)
                   {
                      let lol=  {...res.data._doc,type:'vendor'}
                      localStorage.clear()
                      localStorage.setItem('mydata',JSON.stringify(lol))
                      window.location.assign('/dashboard')
                   }
                   else{
                    console.log(res)
                      document.getElementById("AfterSubmit").innerHTML = "LOGIN FAILED";
                   }
                 });
		    }    
		}
        this.setState({
            username: '',
            email: '',
            password: ''
        });
    }
	render(){
		var hide=""
		if(this.props.mode=="login")hide="none"

 		return(
  			<div>
             <form onSubmit={this.onSubmit}>
                    <div style={{display:hide}} className="form-group">        
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               required

                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               required

                               />  
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                    <div id ="AfterSubmit">

                    </div>
                </form>
            </div>
		);
	}
}



