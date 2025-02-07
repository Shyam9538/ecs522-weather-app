import './App.css';
import React from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import WeatherToday from './pages/Todayweather';



class  App extends React.Component {

  render(){
 
  return (
    <Router>
      <Sidebar />
      <Switch>
      <Route exact path="/Home" render={() => (
      
         <Home Message="Hi Username !" position=""/>
   )}/>
      <Route  path='/Todayweather' exact component={WeatherToday} />
      </Switch>
    </Router>
  );
}
}

export default App;

