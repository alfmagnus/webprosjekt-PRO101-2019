import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Dashboard from "./Dashboard.js";
import Kanban from "./Kanban.js";
import firebase from './firebase';
import loginBG from "./bg.jpg";

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
      email: '',
      password: ''
    });
    this.authListener = this.authListener.bind(this);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  logout() {
    firebase.auth().signOut();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        alert(error.message);
      });
  }

  signup(e){
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
      alert(error);
      })
  }

  render() {
    return (
      <Router>
      <div className="App">
        {this.state.user ? (
          <header className="App-header">
          <div>
            <div id="prosjektnavn">Webprosjekt - 2019</div>
            <div id="brukernavn">Alf Magnus Lie</div>
          </div>
          <button className="btnBasic" id="loggut" onClick={this.logout}>
            Logg ut
          </button>
        </header>
        ) : (
          ""
        )}

        {this.state.user ? (
          <div className="mainPage">
              <div className="sidebar">
          <div className="linkWrapper">
            <div className="linkTo">
              <NavLink
              exact={true}
              className="links"
              activeClassName="activeLink"
              to="/">
                <div className="sidebarIcon">
                  <i class="fas fa-home"></i>
                  <h3 className="sidebarName">Dashboard</h3>
                </div>
              </NavLink>
            </div>
            <div className="linkTo">
              <NavLink
              className="links"
              activeClassName="activeLink"
              to="/Kanban">
                <div className="sidebarIcon">
                <i class="fas fa-list"></i>
                  <h3 className="sidebarName">Kanban</h3>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
              <div className="renderWindow">
                <Route exact path="/" component={Dashboard} />
                <Route path="/Kanban" component={Kanban} />
              </div>
          </div>
        ) : (
            <div>
              <img src={loginBG} className="loginBG" alt="bg" />
              <div className="loginform">
                <form>
                    <h2 className="LoginText">Login</h2>
                    <div class="login-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <br/>
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="LoginInput" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div class="login-group">
                        <label for="exampleInputPassword1">Password</label>
                        <br/>
                        <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="LoginInput" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" onClick={this.login} class="loginbtn" id="loginbtn">Login</button>
                      <br/>
                    <button onClick={this.signup} className="loginbtn" id="signupbtn">Signup</button>
                </form>
              </div>
            </div>
        )}
      </div>
    </Router>
     );
  }
}
 export default App;