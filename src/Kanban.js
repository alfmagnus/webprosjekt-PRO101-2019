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
      listElements: [],
      ids: []
    };

    this.removeItem = this.removeItem.bind(this);
    this.Text = this.Text.bind(this);
    this.renderImportance = this.renderImportance.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logout = this.logout.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
    this.editKortText = this.editKortText.bind(this);
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
      let ids = [];
      snapshot.forEach(function(doc) {
        newState.push(doc.data());
        ids.push(doc.id);
      });
      this.setState({
        items: newState,
        ids: ids
      });
    });
  };

  //////////////////////// -----------------------------     Kort 

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
      this.priFirestore(listId,id,"low")
    }
    if (priPush == "Medium") {
      this.priFirestore(listId,id,"medium")
    }
    if (priPush == "High") {
      this.priFirestore(listId,id,"high")
    }
  }

  priFirestore(listeId,kortId, pri){
    let temp = this.state.items;
      for (let liste in temp) {
        if (temp[liste].id == listeId) {
          for (let card in temp[liste].elements) {
            if (temp[liste].elements[card].id == kortId) {
              temp[liste].elements[card].priStatus = pri;
              this.setState({
                items: temp
              });
              db.collection("Kanban")
                .doc(listeId)
                .update({
                  elements: temp[liste].elements
                });
            }
          }
        }
      }
  }
  
  async editKortText(listeId, kortId) {
    const { value: text } = await Swal.fire({
      title: "Endre navn på kortet",
      input: "text",
      inputPlaceholder: "Skriv inn navn her...",
      showCancelButton: true
    });

    if (text) {
      let temp = this.state.items;
      for (let liste in temp) {
        if (temp[liste].id == listeId) {
          for (let card in temp[liste].elements) {
            if (temp[liste].elements[card].id == kortId) {
              temp[liste].elements[card].title = text;
              this.setState({
                items: temp
              });
              db.collection("Kanban")
                .doc(listeId)
                .update({
                  elements: temp[liste].elements
                });
            }
            this.alertLagtTil(text, "Kortet")
          }
        }
      }
    }
  }

  async addNewCard(listeId) {
    const { value: text } = await Swal.fire({
      title: "Endre navn på listen",
      input: "text",
      inputPlaceholder: "Skriv inn navn her...",
      showCancelButton: true
    });

    if (text && listeId) {
      let card = { title: text, priStatus: "medium", creation: Date.now(), id: Date.now() };
      db.collection("Kanban")
        .doc(listeId)
        .update({
          elements: firebase.firestore.FieldValue.arrayUnion(card)
        });
    }
  }

  removeItem(listeId, kortId) {
    let temp = this.state.items;
      for (let liste in temp) {
        if (temp[liste].id == listeId) {
          for (let card in temp[liste].elements) {
            if (temp[liste].elements[card].id == kortId) {
              db.collection("Kanban")
                .doc(listeId)
                .update({
                  elements: firebase.firestore.FieldValue.arrayRemove(temp[liste].elements[card])
                });
            }
          }
        }
      }
  }

  unixToTime(timeCreationFire) {
    var time = new Date(timeCreationFire);
    return time.toLocaleString();
  }

  //////////////////////// -----------------------------     Liste 

  async editListeText(listeId) {
    const { value: text } = await Swal.fire({
      title: "Endre navn på listen",
      input: "text",
      inputPlaceholder: "Skriv inn navn her...",
      showCancelButton: true
    });

    if (text) {
      this.alertLagtTil(text, "Liste")
      db.collection("Kanban")
        .doc(listeId)
        .update({
          name: text
        });
    }
  }

  alertLagtTil(text, type){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    Toast.fire({
      type: 'success',
      title: type + ' ble endret til ' + text
    })
  }
  ///test

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
                            onClick={() => this.editListeText(liste.id)}
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