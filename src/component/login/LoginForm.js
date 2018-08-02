import React, { Component } from 'react';
import { Redirect } from 'react-router';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            redirect: false
            
        }
        this.ChangeEmail = this.ChangeEmail.bind(this);
        this.ChangePassword = this.ChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    ChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    ChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e){
        e.preventDefault();    
        fetch('https://www.mocky.io/v2/5b61ed61300000f10d6a4424')
            .then(response => response.json())
            .then(datas => {
                
                console.log(datas)
                datas.result.forEach(data => {
                    console.log(data.email);
                    if (data.email===this.state.email && data.password===this.state.password){
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('email', data.email);
                        this.setState({ redirect: true })
                    }
                    else{
                        alert("contrseña erronea");
                    }
                })
            
            })
    }

    render() {
        const {redirect} = this.state;
        if (redirect) {
                return <Redirect to='/dashboard' />;
        }

        return (
        <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-12 col-md-4">
                        <form onSubmit={this.handleSubmit}>
                            <div class="card" style={divStyle}>
                                <img src="/img/icon/user.svg" style={logo}  />
                                <br/>
                                <center>
                                <p>Ingresar a mi cuenta</p>
                                </center>
                            <div class="form-group row">
                                <div class="col-sm-12">
                                        <input type="email" onChange={this.ChangeEmail} value={this.state.email}  class="form-control"  placeholder="Correo:" />
                                     </div>
                                </div>
                            <div class="form-group row">
                                    <div class="col-sm-12">
                                        <input type="password" onChange={this.ChangePassword} value={this.state.password}  class="form-control" id="inputPassword" placeholder="Contraseña:" />
                                    </div>
                            </div>
                            <center>
                                <button style={button} type="submit" class="btn btn-default form-control">Iniciar Sesión</button>
                            </center>
                            </div> 
                           
                        </form>
                </div>
           </div>

        </div>
        );
    }

   
    
}

 var logo ={
    position: 'absolute', 
    top: '-45px',
    left: '40%',
    maxWidth: '80px' 
 }
var divStyle = {
    color: '#fe642d',
    padding:'20px',
    marginTop:'100px',
    position: 'relative'
};

var button = {
    color:'white',
    background: '#fe642d',
};



export default LoginForm;
