
import React, {ReactNode, SyntheticEvent, Component } from "react";
import "./Dashboard.css";
import "./index.html";
import ApiCalendar from "react-google-calendar-api";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";


class Dashboard extends React.Component {
    constructor(props) {
        super(props)




        this.state = {
            events: []
        }
    }

    compponentDidMount() {
        require("google-client-api")().then((gapi) => {
            console.log("initializing GAPI...");
            var CLIENT_ID = "411098371378-d8t8aaakf7ukp3mp1o12gaigc3jrom28.apps.googleusercontent.com";
            var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
            var SCOPES = "https://www.googleapis.com/auth/calendar";

            gapi.client.init({
                discoveryDocs: DISCOVERY_DOCS,
                clientId: CLIENT_ID,
                scope: SCOPES
            }).then(function () {
                console.log("GAPI Initialized.");
                gapi.auth2.getAuthInstance().isSignedIn.listen(this._updateSigninStatus);
                this.setState({gapi: gapi}, () => {
                    this._updateSigninStatus(this.state.gapi.auth2.getAuthInstance().isSignedIn.get());
                });

            }.bind(this));
        });
    }

    getEvents() {
        let that = this;

        function start() {
            window.gapi.client.init({
                "apiKey": "AIzaSyCIjPXnXQFmfWn6PbJnFj3PjUjoxSe_cLo"
            }).then(function () {
                return window.gapi.client.request({
                    "path":
                        `https://www.googleapis.com/calendar/v3/calendars/$prosjektprog2019@gmail.com/events`,
                })
            }).then((response) => {
                let events = response.result.items
                that.setState({
                    events
                }, () => {
                    console.log(that.state.events);
                })
            }, function (reason) {
                console.log(reason);
            });
        }

        window.gapi.load("client", start)
    }

    render() {
        const showLogControls = !(this.state.gapi === null);
        return (
            <div id="my-signIn"/>)
    }
}

/*
      /*  const user = "Andreas";
        const oppgaveTittel = "OppgaveTittel";
        return (
            <div className="Dashboard">
                <header className="App-header">
                <h3>Dashboard</h3>
                </header>
                <div className ="welcome">
                    <h1>Hello, {user}</h1>
                    <h2>{oppgaveTittel}</h2>
                    <Link to="/Kanban">
                        <button type="button" className = "kanbanButton">
                            kanban
                        </button>
                    </Link>
                </div>
                <div className ="placeHolder">

                </div>
           </div>
        );
    }
}
*/

/* Failed to compile
./node_modules/react-google-calendar-api/build/ApiCalendar.js
Module not found: Can't resolve '../../../apiGoogleconfig.json' in 'C:\Users\Andreas\IdeaProjects\webprosjekt-PRO101-2019\node_modules\react-google-calendar-api\build'
This error occurred during the build time and cannot be dismissed.
*/
export default Dashboard;