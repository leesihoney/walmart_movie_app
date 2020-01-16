import React, { Component } from 'react';
import './App.css';
import Nav from "./components/Nav";
import SearchPage from './SearchPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';

class App extends Component {

  render() {
    return (
      <Router>
        <div className='app'>
          <Nav />
          <Switch>
            <Route path='/' exact component={SearchPage} />
            <Route path='/movies/:id' component={MovieDetail} />
          </Switch>
        </div>
      </Router>
        
      
    )
  }
}

export default App;
