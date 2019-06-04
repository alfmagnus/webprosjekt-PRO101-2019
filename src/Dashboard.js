import React, {ReactNode, SyntheticEvent, Component } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./Dashboard.css";


class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div className="App">
            <main className="main">
              <div className="DashboardBox">
                <h1 id="VelkommenText">Hei, Alf Magnus</h1>
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
              <div className="Kalender">
              
              </div>
            </main>
          </div>
        )
    }
}

export default Dashboard;