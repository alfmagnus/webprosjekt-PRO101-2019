import React, { Component } from "react";
import ListElement from "./listElement";
import firebase, { auth } from "./firebase.js";
import Swal from 'sweetalert2'
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
      items: []
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
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const itemsRef = db.collection("Kanban").add({
        name: this.state.nyListe,
        elements:[]
      
    });
    this.setState({
      NyListeBtn: false
    });
  }
  
  componentDidMount = () => {
    db.collection("Kanban").onSnapshot(snapshot => {
      let newState = [];
      snapshot.forEach(function(doc) {
        console.log(doc.id)
        newState.push(
          doc.data()
        );
      });
      this.setState({
        items: newState
      });
    });
  };

  renderImportance(firebase){
    if(firebase == "low"){
      return this.Text("Low", "#79c5fa")
    }
    if(firebase == "medium"){
      return this.Text("Medium", "#fac879")
    }
    if(firebase == "high"){
      return this.Text("High", "#fa7979")
    }
  }
  Text(pri, color2){
    return(
      <button 
        className="PrioriteringBox" 
        style={{backgroundColor: String(color2)}} 
        onClick={() => {
          this.changeImportance();
        }}
      >
        <div id="PrioriteringText">{pri}</div>
      </button>
    )
  }

  changeImportance(){
    Swal.fire("Testing")
  }

  unixToTime(timeCreationFire) {
    var time = new Date(timeCreationFire);
    return time.toLocaleString();
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
                          direction: 'horizontal',
                          handle: "#rowHeader",
                          ghostClass: 'ghost',
                        }}
                      >
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
                          return <ListElement item={item} removeItem={this.removeItem} unixToTime={this.unixToTime} renderImportance={this.renderImportance}/>;
                        })}
                      </Sortable>
                      
                      <div>
                        <button className="nyttKort">
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
                : this.inputKortRender()
              }
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