import React, {ReactNode, SyntheticEvent, Component } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import firebase, { auth } from "./firebase.js";
import moment from "moment";
import "./Dashboard.css";
import Swal from "sweetalert2";

const db = firebase.firestore();

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            eventName:"",
            eventStartDate:"",
            eventDeadline:"",
            events: [],
            elements: [{name: "tim", id:23}, {name: "egil", id:30}],
        })
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.eventName === "") {
          return;
        }
        db.collection("Kalender")
          .add({
            eventName: this.state.eventName,
            eventStartDate: this.state.eventStartDate,
            eventDeadline: this.state.eventDeadline,
            eventStatus: "ikke startet"
          })
          .then(resolved => {
            db.collection("Kalender")
              .doc(resolved.id)
              .update({
                id: resolved.id
              });
          });
          this.setState({
            eventName:"",
            eventStartDate:"",
            eventDeadline:"",
          });
    }

    componentDidMount = () => {
        db.collection("Kalender").onSnapshot(snapshot => {
          let newState = [];
          snapshot.forEach(function(doc) {
            newState.push(doc.data());
          });
          this.setState({
            events: newState,
          });
        });
      };

      renderImportance(firebase, id) {
        if (firebase === "Ferdig") {
          return this.Text("Ferdig", "#79c5fa", id);
        }
        if (firebase === "Pågår") {
          return this.Text("Pågår", "#fac879", id);
        }
        if (firebase === "Ikke startet") {
          return this.Text("Ikke startet", "#fa7979", id);
        }
      }
    
      Text(pri, color2, id, listId) {
        return (
          <button
            className="btnBasic"
            id="ToggleFinish"
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
          title: "Velg status",
          input: "radio",
          inputValue: pri,
          inputOptions: {
            ikkestartet: "Ikke startet",
            pågår: "Pågår",
            ferdig: "Ferdig"
          }
        });
        if (priPush == "ikkestartet") {
            db.collection("Kalender")
            .doc(id)
            .update({
                eventStatus: "Ikke startet"
            });
        }
        if (priPush == "pågår") {
            db.collection("Kalender")
            .doc(id)
            .update({
                eventStatus: "Pågår"
            });
        }
        if (priPush == "ferdig") {
            db.collection("Kalender")
            .doc(id)
            .update({
                eventStatus: "Ferdig"
            });
        }
      }


    render() {
        return (
            <div className="App">
            <main className="main">
              <div className="DashboardBox">
                <h1 id="VelkommenText">Hei, Sturla Bakke</h1>
                <h2 id="oppgaveTitle">PRO101 Webprossjekt</h2>
                <div className="oppgaveText">
                    <p>
                        <h4>Oppgavetekst</h4>
                        Det finnes mange varianter av prosjektstyringsverktøy, to-do apper og verktøy for å jobbe smidig. Dere skal lage enda en, som inkluderer noe dere kanskje har savnet i andre tilsvarende verktøy dere eventuelt har benyttet.
                        <br/><br/>
                        Dere skal lage en webapplikasjon som dere selv ville hatt nytte av i arbeidet med å utvikle programvare. En løsning som gir mulighet til å definere en gruppe eller prosjekt, legge inn oppgaver, fordele oppgaver mellom gruppemedlemmer og vise hvem som jobber med hva (status), sette frister, gi påminnelser,
                        <br/><br/>
                        Aller først: diskuter målgruppe, behov, ønsker, og kanskje noe målgruppen ikke tenker over at de kunne trenge. Det kan være en ny vinkling ved et slikt verktøy. Diskuter mulige visuelle designvalg, brukerscenarioer og teknologiske løsninger.
                        <br/><br/>
                        Lag en klikkbar enkel trådskisse-prototype av konseptet sammen og som dere prøvekjører litt, før dere koder opp den ferdige løsningen.
                    </p>
                    <h4>Krav, deriblant tekniske, til løsningen.</h4>
                    <ul className="listDashboard">
                        <li>
                            Applikasjonen skal kunne vise og oppdatere oppgaver og som et minimum tildele oppgaver
                            til gruppemedlemmer og endre status på en oppgave fra planlagt til underveis til utført.
                        </li>

                        <li>
                            Data skal oppbevares i JavaScript objekter i koden (dette er en utilstrekkelig løsning for en
                            ekte applikasjon, men fungerer godt for en prototype)
                        </li>
                        <li>
                            Eksempelet på neste side kan benyttes som et utgangspunkt for datastrukturen eller dere kan
                            lage deres eget.
                        </li>
                        <li>
                            Koden skal lastes opp på et GitHub repository
                        </li>
                        <li>
                            Vis at dere har tenkt på kravene til universell utforming (WCAG 2.0) ved å legge til rette for
                            også de med nedsatt funksjonsevne.
                        </li>
                        <li>
                            Koden skal være ryddig og lettleselig, med konsis indentering, samt kommentarer hvor det er
                            nødvendig og hensiktsmessig inndeling i flere filer.
                        </li>
                        <li>
                            Designet skal være brukervennlig, følge gjeldene designprinsipper for god brukervennlighet
                            og brukskvalitet, og tilpasset målgruppen.
                        </li>
                    </ul>
                </div>
              </div>
              <div className="kalenderContainer">
                <h2 className="KalenderHeader">Kalender</h2>
                <ul>
                <div>
                    {this.state.events.map((items) => {
                        return( 
                        <li className = "eventList">
                            <div className="leftSide" id="eventName">{items.eventName}</div>
                            <div className="leftSide" id="eventDeadline">Deadline: {items.eventDeadline}</div>
                            <div className="EventFinishContainer">
                                {this.renderImportance(items.eventStatus, items.id)}
                            </div>
                            
                            <div className="eventTimeLeft">Gjenstående tid: {items.eventTimeLeft}</div>
                        </li>
                        )}) }
                </div>
                </ul>
                <div className="LeggtilKalender">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            name="eventName"
                            id="inputName"
                            className="inputKalender"
                            type="text"
                            placeholder="legg til ny liste"
                            onChange={this.handleChange}
                            value={this.state.eventName}
                        />
                        <input
                            name="eventStartDate"
                            className="inputKalender"
                            type="date"
                            onChange={this.handleChange}
                            value={this.state.eventStartDate}
                        />
                        <input
                            name="eventDeadline"
                            className="inputKalender"
                            type="date"
                            onChange={this.handleChange}
                            value={this.state.eventDeadline}
                        />
                        <button className="btnBasic" id="KalenderBtn">
                            Legg til
                        </button>
                    </form>
                </div>
              </div>
            </main>
          </div>
        )
    }
}

export default Dashboard;