import React, { Component } from 'react';
import DashboardForm from './DashboardForm';
import MapContainer from './MapContainer';
import { Redirect } from 'react-router';



class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latOrigen: '4.6966871',
            lonOrigen: '-74.047046',
            latDestino: '4.6966871',
            lonDestino: '-74.047046',
            redirect: false, 
        };
        this.getData = this.getData.bind(this)
    }
    getData(val1,val2,val3,val4) {
        this.setState({ latOrigen: val1, lonOrigen: val2, latDestino: val3, lonDestino: val4})
     }
    render() {

        if (!localStorage.getItem('token')) {
            this.setState({ redirect: true });
        }
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div style={{position: 'relative'}}>
                <MapContainer latOrigen={this.state.latOrigen} lonOrigen={this.state.lonOrigen} latDestino={this.state.latDestino} lonDestino={this.state.lonDestino}/> 
                <div style={{ position: 'absolute', top: '30px', left: '0', right: '0', margin: '0', maxWidth: '500px' }}>
                    <DashboardForm sendData={this.getData} />
                </div>   
            </div>

            
        );
    }
}

export default LoginContainer;


