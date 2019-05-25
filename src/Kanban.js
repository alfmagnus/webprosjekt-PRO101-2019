import React, { Component } from "react";
import SharedGroup from './shared-group';
import firebase from './firebase';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
          pro: false
        }

        this.logout = this.logout.bind(this);
    }
    logout() {
        firebase.auth().signOut();
    }

    inputKortRender() {
      return (
        <div className="inputKort1">
          <input
            className="inputKort"
            type="text"
            placeholder="Nytt kort"
          />
          <button className="loggut" id="leggtilKort"> Legg til</button>
          <button className="loggut" id="leggtilKortAvbryt">X</button>
        </div>
      );
    }

    btnKortRender() {
      return (
        <div>
          <button onClick={this.onCl} className="nyttKort"> Legg til Kort</button>
        </div>
      );
    }

    onCl = () => {
      this.setState({
        pro: true
      });}

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
              <h1 className="row-header">TODO testing</h1> <i className="far fa-clock" />
              <SharedGroup items={['Lemon', 'Orange', 'Pear', 'Lemon', 'Orange', 'Pear', 'Peach', 'Lemon']}/>
              <button className="nyttKort"> Legg til kort</button>
            </div>

            <div className="row">
              <h1 className="row-header">TODO test1</h1>
              <SharedGroup items={['Lemon', 'Orange', 'Pear', 'Peach', 'Orange', 'Pear', 'Peach']}/>
              {this.state.pro === false
                    ? this.btnKortRender()
                    : this.inputKortRender()}
            </div>

            <div className="row">
              <h1 className="row-header">TODO test123</h1>
              <SharedGroup items={['Lemon', 'Orange', 'Pear', 'Peach']}/>
              

            </div>

            <div className="row">
              <button className="nyListe"> Legg til liste</button>
            </div>
            
          </div>
          </main>
        </div>
      );
  }
}

export default App;