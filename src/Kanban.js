import React, { Component } from "react";
import ListElement from "./listElement";
import firebase, { auth } from "./firebase.js";
import Swal from "sweetalert2";
import "./App.css";
import Sortable from "react-sortablejs";

var db = firebase.firestore();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      nyListe: "",
      velgPri: "",
      NyListeBtn: false,
      items: [],
      items1: [],
      items2: []
    };

    this.Text = this.Text.bind(this);
    this.renderImportance = this.renderImportance.bind(this);
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
    if (this.state.nyListe === "") {
      return;
    }
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection("Kanban")
      .add({
        name: this.state.nyListe,
        elements: []
      })
      .then(resolved => {
        db.collection("Kanban")
          .doc(resolved.id)
          .update({
            id: resolved.id
          });
      });
    this.setState({
      NyListeBtn: false
    });
  }


  componentDidMount = () => {
    db.collection("Kanban").onSnapshot(snapshot => {
      let newState = [];
      snapshot.forEach(function(doc) {
        newState.push(doc.data());
      });
      this.setState({
        items: newState
      });
    });
    
    
  };
 //Testing
  testTestt (listeId) {
    db.collection("Kanban")
    .doc(listeId)
    .collection("secElements")
    .onSnapshot(snapshot => {
      let newState = [];
      snapshot.forEach(function(doc) {
        newState.push(
        newState[listeId] = doc.data());
      });
      console.log(newState)
      ;
      this.setState({
        items: newState
      });
    });
  }

  renderImportance(firebase, id, listId) {
    if (firebase == "low") {
      return this.Text("Low", "#79c5fa", id, listId);
    }
    if (firebase == "medium") {
      return this.Text("Medium", "#fac879", id, listId);
    }
    if (firebase == "high") {
      return this.Text("High", "#fa7979", id, listId);
    }
  }

  Text(pri, color2, id, listId) {
    return (
      <button
        className="PrioriteringBox"
        style={{ backgroundColor: String(color2) }}
        onClick={() => {
          this.changeImportance(pri, id, listId);
        }}
      >
        <div id="PrioriteringText">{pri}</div>
      </button>
    );
  }

  async changeImportance(pri, id, listId) {
    const { value: priPush } = await Swal.fire({
      title: "Velg prioritet på kortet",
      input: "radio",
      inputValue: pri,
      inputOptions: {
        Low: "Lav",
        Medium: "Medium",
        High: "Høy"
      }
    });
    if (priPush == "Low") {
      console.log("priStatus: Endret til low");
    }
    if (priPush == "Medium") {
      console.log("priStatus: Endret til medium");
    }
    if (priPush == "High") {
      db.doc(`Kanban/${listId}/secElements/${id}`).update({
        priStatus: "high"
      });
    }
  }
  
  async editKortText() {
    const { value: text } = await Swal.fire({
      title: "Endre navn på kortet",
      input: "text",
      inputPlaceholder: "Skriv inn navn her...",
      showCancelButton: true
    });

    if (text) {
      Swal.fire(text);
      db.collection("Kanban")
        .doc("lir2tyj2m84KFPS8IThx")
        .update({
          name: text
        });
    }
  }

  async editListeText() {
    const { value: text } = await Swal.fire({
      title: "Endre navn på listen",
      input: "text",
      inputPlaceholder: "Skriv inn navn her...",
      showCancelButton: true
    });

    if (text) {
      Swal.fire(text);
      db.collection("Kanban")
        .doc("lir2tyj2m84KFPS8IThx")
        .update({
          name: text
        });
    }
  }

  unixToTime(timeCreationFire) {
    var time = new Date(timeCreationFire);
    return time.toLocaleString();
  }

  //Må oppdateres til Firestore
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  inputKortRender() {
    return (
      <div className="inputKort1">
        <form onSubmit={this.handleSubmit}>
          <input
            name="nyListe"
            className="inputKort"
            type="text"
            placeholder="legg til ny liste"
            onChange={this.handleChange}
            value={this.state.nyListe}
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

  btnListRender() {
    return (
      <div>
        <button onClick={this.ToggleNyttKort} className="nyttKort">
          {" "}
          Legg til Liste
        </button>
      </div>
    );
  }

  ToggleNyttKort = () => {
    if (!this.state.NyListeBtn) {
      this.setState({
        NyListeBtn: true
      });
    } else {
      this.setState({
        NyListeBtn: false
      });
    }
  };

  async addNewCard(listeId) {
    const { value: text } = await Swal.fire({
      title: "Endre navn på listen",
      input: "text",
      inputPlaceholder: "Skriv inn navn her...",
      showCancelButton: true
    });

    if (text && listeId) {
      db.collection("Kanban")
        .doc(listeId)
        .collection("secElements")
        .add({
          title: text,
          pri: "",
          creation: Date.now(),
          id: ""
        })
        .then(resolved => {
          db.collection("Kanban")
            .doc(listeId)
            .collection("secElements")
            .doc(resolved.id)
            .update({
              id: resolved.id
            });
        });
    }
  }

  render() {
    return (
      <div className="App">
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
                  <Sortable
                    options={{
                      group: "liste",
                      animation: 150,
                      direction: "horizontal",
                      handle: "#rowHeader",
                      ghostClass: "ghost"
                    }}
                    tag="li"
                  >
                    <li>
                      <div className="row">
                        <div id="rowHeader">
                          <h1>{liste.name}</h1>
                          <button
                            className="btnBasic"
                            id="ListeEdit"
                            onClick={() => this.editListeText()}
                          >
                            <i class="fas fa-ellipsis-v" />
                          </button>
                        </div>
                        <Sortable
                          options={{
                            group: "shared",
                            animation: 150
                          }}
                        >
                          
                          {this.testTestt(liste.id)}
                          {liste.elements.map(item => {
                            return (
                              <ListElement
                                listId={liste.id}
                                item={item}
                                removeItem={this.removeItem}
                                editKortText={this.editKortText}
                                unixToTime={this.unixToTime}
                                renderImportance={this.renderImportance}
                              />
                            );
                            
                          })}
                        </Sortable>
                        <div>
                          <button
                            className="nyttKort"
                            onClick={() => this.addNewCard(liste.id)}
                          >
                            Legg til Kort
                          </button>
                        </div>
                      </div>
                    </li>
                  </Sortable>
                );
              })}
            </ul>
            <div className="rowListe">
              {this.state.NyListeBtn === false
                ? this.btnListRender()
                : this.inputKortRender()}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;

//mal sudo

