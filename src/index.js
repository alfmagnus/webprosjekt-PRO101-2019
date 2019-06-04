import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./Dashboard";
import * as serviceWorker from './serviceWorker';

/* Av en eller annen grunn fungerer ikke routinga i appen med mindre dette er med */
const routing = (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                <li>
                    <Link to="/Kanban">Kanban</Link>
                </li>
            </ul>
            <Route exact path="/" component={Dashboard} />
            <Route path="/Kanban" component={App} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
