import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import LoginIndex from "./component/login/LoginIndex"
import DashboardIndex from "./component/dashboard/DashboardIndex"

const App = () => (
  
  <Router>
    <div>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-1"><img src="/img/icon/logo.png" alt="" width="60px"/></div>
          <div className="col-2"><span><Link to="/dashboard">{sesion}</Link></span></div>
          <div className="col-9" style={{ textAlign: "right"}}><a href="" onClick={handleClick}>LogOut</a></div>
        </div>
      </div>

      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </Router>
);


  if (localStorage.getItem("token")) {
    var sesion = localStorage.getItem("email");
  }
  else {
    var sesion = "Home";
  }


function handleClick(e) {
  e.preventDefault();
  localStorage.clear();
  console.log("Sesion Close");
  sesion = "Home";
  window.location.href = "/";

  
}

const Home = () => (<LoginIndex/>);
const Dashboard = () => (<DashboardIndex/>);

export default App;
