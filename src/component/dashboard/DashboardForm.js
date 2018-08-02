import React, { Component } from 'react';
import DashboardList from './DashboardList'

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.handleChangeOrigen = this.handleChangeOrigen.bind(this);
        this.handleChangeDestino = this.handleChangeDestino.bind(this);
        this.handleChangeDescripcion = this.handleChangeDescripcion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.activeBuscar = this.activeBuscar.bind(this);
       
        this.state = {
            origen: 'elitedsh',
            destino: 'bogota,campin',
            servicios:[],
            descripcion: '',
            latOrigen: '',
            lonOrigen: '',
            latDestino: '',
            lonDestino: '',
            distancia: '0',
            duracion: '0',
            DivCard: true,
            DivSearch:false    
        };
    }
    handleSubmit(e){
        e.preventDefault();
        console.log("presiono buton:"+this.state.origen);
        this.getApiAddressToCordenateOrigen(this.state.origen,);
    }

    handleChangeOrigen(e){
        this.setState({ origen: e.target.value });
    }

    handleChangeDestino(e) {
        this.setState({ destino: e.target.value });
    }

    handleChangeDescripcion(e) {
        this.setState({ descripcion: e.target.value });
    }

    changeVarible(inString){
        var outString = inString.replace(" ", "+");
        return outString;
    }

   

   

    getApiAddressToCordenateOrigen(origen) {

        var origen = this.changeVarible(origen);
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+origen+'&key=AIzaSyDuOYYkhp3Cgbd8o8MscHu31mWrK0f6Bp4')
            .then(response => response.json())
            .then(datas => {
                console.log(datas.results)
               
                    datas.results.forEach(data => {
                        this.state.latOrigen = data.geometry.location.lat;
                        this.state.lonOrigen = data.geometry.location.lng;
                        console.log("LatOrigen:" + this.state.latOrigen + ";LonOrigen:" + this.state.lonOrigen)
                    }) 
                    
                this.getApiAddressToCordenateDestino(this.state.destino); 
                
            })
       
    }


    getApiAddressToCordenateDestino(origen) {

        var origen = this.changeVarible(origen);

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + origen + '&key=AIzaSyDuOYYkhp3Cgbd8o8MscHu31mWrK0f6Bp4')
            .then(response => response.json())
            .then(datas => {
                console.log(datas.results)  
                    datas.results.forEach(data => {
                        this.state.latDestino = data.geometry.location.lat;
                        this.state.lonDestino = data.geometry.location.lng;
                        console.log("LatDestino:" + this.state.latDestino + ";LonDestino:" + this.state.lonDestino)
                    })

                    var origen = this.state.latOrigen + "," + this.state.lonOrigen;
                    var destino = this.state.latDestino + "," + this.state.lonDestino;
                    console.log(origen + "/" + destino);

                    this.getDistanceMatrix(origen, destino);
                    this.props.sendData(this.state.latOrigen, this.state.lonOrigen, this.state.latDestino, this.state.lonDestino);
               
            })

    }

    getDistanceMatrix(origen, destino){

        const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": "Basic bmltZXNoLnBhdGVsQHRhdHZhc29mdC5jb206cGFzc3dvcmQ=",
        "mode": "no-cors",
        "Access-Control-Allow-Origin": "*" 
        });

        var url='https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+origen+'&destinations='+destino+'&key=AIzaSyDuOYYkhp3Cgbd8o8MscHu31mWrK0f6Bp4';
        fetch(url, {method: 'GET',headers,})
            .then(response => response.json())
            .then(datas => {
                console.log(datas)
                var origen_Exacto = datas.origin_addresses[0];
                var destino_Exacto = datas.destination_addresses[0];
                
                    datas.rows.forEach(rows => {

                        rows.elements.forEach(element => {

                            if (element.status == "NOT_FOUND" || element.status == "ZERO_RESULTS" ){
                                console.log("No hay datos, o esta fuera del pais");
                                alert("Verifica las Direcciones porfavor")
                            }
                            else{

                                if (this.state.descripcion !== "" || this.setState.descripcion.length !==0) {
                                this.setState({
                                    distancia: element.distance.text,
                                    duracion: element.duration.text
                                });
                                console.log(this.state.distancia);
                                console.log(this.state.duracion);

    
                                this.setState({ DivCard: false });
                                this.setState({ DivSearch: true }); 

                                    const newItem = { text: this.state.descripcion, id: Date.now(), origen: origen_Exacto , destino: destino_Exacto};
                                this.setState(prevState => ({
                                    servicios: prevState.servicios.concat(newItem),
                                    descripcion: ''
                                }));
                                
                                console.log(this.state.servicios);

                                }
                                else{
                                    alert("Desbes agregar que servicio quieres");
                                }
                                  
                            }
                        })
                    })   
                     
            });

    }

    activeBuscar() {
        
        this.setState({ DivCard: true });
        this.setState({ DivSearch: false });
    }

    render() {

        var DivCard = {
            display: this.state.DivCard ? "block" : "none",
            padding:"20px"
        };

        var DivSearch = {
            display: this.state.DivSearch ? "block" : "none",
            padding: "20px"
        }

        const isEnabled = this.state.descripcion.length > 0;
        if (isEnabled){
            var buttonText = "Solicitar Servicio";
        }
        else{
            var buttonText = "Agregue un servicio";
        }
      
        return (

           
           
            <form onSubmit={this.handleSubmit}>
                <div className="card" style={divStyle}>
                    <div style={DivCard} >
                        <div className="form-group row">
                            <div className="col-sm-12">
                                <input type="text" className="form-control" placeholder="Desde:" onChange={this.handleChangeOrigen} value={this.state.origen} />
                                <small id="emailHelp" className="form-text text-muted">Ejemplo: Neiva,Cra. 15 #8-37</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12">
                                <input type="text" className="form-control" id="inputPassword" placeholder="Hasta:" onChange={this.handleChangeDestino} value={this.state.destino} />
                                <small id="emailHelp" className="form-text text-muted">Ejemplo: Bogota,Cra. 17a #127a-58</small>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-12">
                                <input type="text" className="form-control" placeholder="Tipo servicio:Trasteo??" onChange={this.handleChangeDescripcion} value={this.state.descripcion} />
                            </div>
                        </div>
                        <center>
                            <button style={button} disabled={!isEnabled} className="btn btn-default form-control">{buttonText}</button>
                        </center>
                    </div>

                    <div style={padding}>
                        <div className="container">
                            <div className="row">
                                <div className="col-10" style={DivSearch}>
                                <p style={{ color: '#5a9d00', fontSize: '20px', marginBottom: '0rem' }}>{this.state.duracion}<span style={{ color: '#0000008a' }}>({this.state.distancia})</span></p>
                                <span style={{ color: '#0000008a', fontSize: '13px' }}><img src="/img/icon/car.svg" width="16px" /> Actualmente es la ruta más rápida</span>
                                </div>
                                <div className="col-2" style={DivSearch}>
                                    <img onClick={() => this.activeBuscar()}  src="/img/icon/more.svg" alt="" width="30px"/>
                                </div>
                            </div>
                            <div className="row">
                                <span style={DivSearch}>Servicios</span>
                                <DashboardList items={this.state.servicios} />
                            </div>
                        </div>
                      </div>
                </div>
            </form>              
        );
    }
}


var divStyle = {
    margin:'20px'
};



var button = {
    color: 'white',
    background: '#fe642d',
};

var padding={
    padding:'20px'
}



export default LoginContainer;

