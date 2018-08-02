

import React from 'react'
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'

class MapContainer extends React.Component {
    constructor(props) {
        super(props)
         }

    render() {
        const DirectionsComponent = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDuOYYkhp3Cgbd8o8MscHu31mWrK0f6Bp4",
                loadingElement: <div style={{ height: `400px` }} />,
                containerElement: <div style={{ width: `100%` }} />,
                mapElement: <div style={{ height: `600px`, width: ` 100%` }} />,
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
                
                componentDidMount() {
                   const DirectionsService = new window.google.maps.DirectionsService();
                    DirectionsService.route({
                        origin: new window.google.maps.LatLng(this.props.latOrigen1, this.props.lonOrigen1),
                        destination: new window.google.maps.LatLng(this.props.latDestino1, this.props.lonDestino1),
                        travelMode: window.google.maps.TravelMode.DRIVING,
                    }, (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            this.setState({
                                directions: { ...result },
                                markers: true
                            })
                            console.error(`Salida ${result}`);
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    });
                }
            })
        )(props =>
            <GoogleMap defaultZoom={1}>
                {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers} />}
            </GoogleMap>
        );
        return (<DirectionsComponent latOrigen1={this.props.latOrigen} lonOrigen1={this.props.lonOrigen} latDestino1={this.props.latDestino} lonDestino1={this.props.lonDestino}/>)
    }
}


export default MapContainer;