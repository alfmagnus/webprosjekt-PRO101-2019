import React, { Component } from "react";
import SharedGroup from './shared-group';
import Sortable from 'react-sortablejs';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './App.css';

class App extends React.Component {

  render() {
      return (
        <div>
          <header className="App-header">
            <p>webprosjekt</p>
          </header>
          <main className="Main">
          <div className="KanbanBox">
            
            <div className="row">
              <h1 className="row-header">TODO testing</h1>
              <SharedGroup items={['Apple', 'Banaba', 'Cherry', 'Grape']}/>
              <button className="nyttKort"> Legg til kort</button>
            </div>

            <div className="row">
              <h1 className="row-header">TODO testing</h1>
              <SharedGroup items={['Lemon', 'Orange', 'Pear', 'Peach']}/>
              <button className="nyttKort"> Legg til kort</button>
            </div>

            <div className="row">
              <h1 className="row-header">TODO testing</h1>
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