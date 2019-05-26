import React, { Component } from "react";
import SharedGroup from './shared-group';
import firebase, { auth } from "./firebase.js";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
          navnKort: "",
          NyttKortBtn: false,
          items: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.logout = this.logout.bind(this);
    }

    logout() {
        firebase.auth().signOut();
    }

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    handleSubmit(e) {
      e.preventDefault();
      if (this.state.navnKort === "") {
        return;
      }
      const itemsRef = firebase.database().ref('items');
      const item = {
        title: this.state.navnKort,
        creation: Date.now()
      }
      itemsRef.push(item);
      this.setState({
        navnKort: ''
      });
      this.setState({
        NyttKortBtn: false
      })
    }

    unixToTime(timecode) {
      var timeVar = new Date(timecode);
      return timeVar.toLocaleString();
    }

    componentDidMount() {
      const itemsRef = firebase.database().ref('items');
      itemsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        let newState = [];
        for (let item in items) {
          newState.push({
            id: item,
            title: items[item].title,
            creation: items[item].creation
          });
        }
        this.setState({
          items: newState
        });
      });
    }

    removeItem(itemId) {
      const itemRef = firebase.database().ref(`/items/${itemId}`);
      itemRef.remove();
    }

    inputKortRender() {
      return (
        <div className="inputKort1">
          <form onSubmit={this.handleSubmit}>
          <input
            name="navnKort"
            className="inputKort"
            type="text"
            placeholder="Nytt kort"
            onChange={this.handleChange}
            value={this.state.navnKort}
          />
          <button className="btnBasic" id="leggtilKort"> Legg til</button>
          <button onClick={this.ToggleNyttKort} className="btnBasic" id="leggtilKortAvbryt">X</button>
          </form>
          
        </div>
      );
    }

    btnKortRender() {
      return (
        <div>
          <button onClick={this.ToggleNyttKort} className="nyttKort"> Legg til Kort</button>
        </div>
      );
    }

    ToggleNyttKort = () => {
      if(!this.state.NyttKortBtn){
      this.setState({
        NyttKortBtn: true
      });
      } 
      else{this.setState({
        NyttKortBtn: false
      });
      }
    }

    render() {
      return (
        <div>
          <header className="App-header">
            <h3>webprosjekt</h3>
            <button className="btnBasic" id="loggut" onClick={this.logout}>Logout</button>
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
              
            </div>

            <div className="row">
              <h1 className="row-header">TODO test123</h1>
              <section className='display-item'>
                <div className="wrapper">
                  <ul>
                  {this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <SharedGroup items={[
                        <div>
                          <div className="KortNavn">{item.title}</div>
                          <div id="KortSlettDiv">
                            <button className="btnBasic" id="KortSlett" 
                              onClick={() => this.removeItem(item.id)}>
                              <i className="fas fa-trash"/>
                            </button>
                          </div>
                          <div className="KortLagtTil">{this.unixToTime(item.creation)}</div>
                        </div>]}/>
                      </li>
                    )
                  })}
                  </ul>
                </div>
              </section>
              {this.state.NyttKortBtn === false
                    ? this.btnKortRender()
                    : this.inputKortRender()
              }
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