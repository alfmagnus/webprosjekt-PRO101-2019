import React, { Component } from "react";
import SharedGroup from './shared-group';
import firebase from './firebase';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
    }
    logout() {
        firebase.auth().signOut();
    }

    render() {
      return (
        <div>
          <header className="App-header">
            <h3>webprosjekt</h3>
            <button className="loggut" onClick={this.logout}>Logout</button>
          </header>
          <main className="Main">
          <div className="KanbanBox">
            
            <div className="row">
            
                        
              <h1 className="row-header">TODO testing</h1>
              <SharedGroup items={['Lemon', 'Orange', 'Pear', 'Peach']}/>
              <button className="nyttKort"> Legg til kort</button>
            </div>

            <div className="row">
              <h1 className="row-header">TODO test1</h1>
              <SharedGroup items={['Lemon', 'Orange', 'Pear', 'Peach']}/>
              <button className="nyttKort"> Legg til kort</button>
            </div>

            <div className="row">
              <h1 className="row-header">TODO test123</h1>
              <SharedGroup items={['Lemon', 'Orange', 'Pear', 'Peach']}/>
              <button className="nyttKort"> Legg til kort</button>
            </div>

            <div className="row">
              <button className="nyttKort"> Legg til liste</button>
            </div>
            
          </div>
          </main>
        </div>
      );
  }
}

export default App;