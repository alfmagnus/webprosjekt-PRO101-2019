import React, { Component } from "react";
import SharedGroup from "./shared-group";
import ListElement from "./listElement";
import firebase, { auth } from "./firebase.js";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./App.css";

import Sortable from "react-sortablejs";
var db = firebase.firestore();

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
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const itemsRef = db.collection("Kanban").add({
      elements: {
        title: this.state.navnKort,
        creation: Date.now()
      }
    });
    this.setState({
      NyttKortBtn: false
    });
  }

  unixToTime(timeCreationFire) {
    var time = new Date(timeCreationFire);
    return time.toLocaleString();
  }

  componentDidMount = () => {
    db.collection("Kanban").onSnapshot(snapshot => {
      let newState = [];
      let index = 0;

      snapshot.forEach(function(doc) {
        newState.push(
          doc.data()
          // name: doc.data().name,
          // title: doc.data().elements,
          // creation: doc.data().elements[0].creation
        );
      });

      this.setState({
        items: newState
      });

      console.log(newState);
    });
  };

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
          <button className="btnBasic" id="leggtilKort">
            {" "}
            Legg til
          </button>
          <button
            onClick={this.ToggleNyttKort}
            className="btnBasic"
            id="leggtilKortAvbryt"
          >
            X
          </button>
        </form>
      </div>
    );
  }

  btnKortRender() {
    return (
      <div>
        <button onClick={this.ToggleNyttKort} className="nyttKort">
          {" "}
          Legg til Kort
        </button>
      </div>
    );
  }

  ToggleNyttKort = () => {
    if (!this.state.NyttKortBtn) {
      this.setState({
        NyttKortBtn: true
      });
    } else {
      this.setState({
        NyttKortBtn: false
      });
    }
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <h3>webprosjekt</h3>
          <button className="btnBasic" id="loggut" onClick={this.logout}>
            Logout
          </button>
        </header>
        <main className="Main">
          <div className="KanbanBox">
            <ul>

              {this.state.items.map(liste => {
                return (  
                  <li>
                    <div className="row">
                      <div id="rowHeader">
                        <h1>{liste.name}</h1>
                        <i class="fas fa-ellipsis-v" id="editRow" />
                      </div>
                      <Sortable
                        options={{
                          group: "shared",
                          animation: 150
                        }}
                      >
                        {liste.elements.map(item => {
                          return <ListElement item={item} removeItem={this.removeItem} unixToTime={this.unixToTime} />;
                        })}
                      </Sortable>

                      {this.state.NyttKortBtn === false
                        ? this.btnKortRender()
                        : this.inputKortRender()}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="rowListe">
              <button id="nyListe">Legg til liste</button>
              {console.log(this.state)}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;


//mal sudo



// Kanban
// firebase = [
//   -list
//   --kort
//   --{name: "Kanban", elements:["asd","223"]}
// ]

// <sortable class="lists">
// this.state.items.map((liste) => {

//   <SharedGroup  items={liste}></SharedGroup>
// })
// </sortable>
// Sortable options:{
//   handle: ".rowHeader",
//   direction: "horizontal"
// }

// SharedGroups:
// render{
//   <h1>{this.props.name}</h1>
// <sortable>
//   this.props.elements.map({

//   })
// </sortable>
// }
// props.name

// renderImportance(firebase){
//   if(firease == "high"){
//     return (<div></div>)
//   }
// }




                      {/* {liste.elements.map((item) => {
                            return (
                              <li key={item.id}>
                                {item.title}
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
                          })}              */}