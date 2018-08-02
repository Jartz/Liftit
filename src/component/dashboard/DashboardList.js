import React, { Component } from 'react';
class DashboardList extends Component {
    render() {
    
    return (
      <ul>
        {this.props.items.map(item => (
          <li style={{ color: '#0000008a', fontSize: '13px'}} key={item.id}><strong>Desde:</strong>{item.origen}
          <br/>
          <strong>Hasta:</strong>{item.destino}
          <br/><strong>Servicio:</strong>{item.text}
          </li>
        ))}
      </ul>
    );
  }
}

export default DashboardList;