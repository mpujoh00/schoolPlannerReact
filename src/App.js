import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import NavBar from './components/navBar';
import Home from './components/home';
import CreateActivity from './components/createActivity';

document.title = "School planner"

function App() {
  console.log("Refreshing...");

  return (
    <Router>
      <NavBar />      
      <div className="container" style={{padding: '20px'}}>
        <div className="row">
          <div className="col-md-12">
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/createActivity' exact component={CreateActivity} />
            </Switch>
          </div>
        </div>
      </div>      
    </Router>
  );
}

export default App;
