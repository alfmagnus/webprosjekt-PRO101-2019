import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './firebase';
import loginBG from "./bg.jpg";

class Login extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
  }

  signup(e){
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
      })
  }
  render() {
    return (
    <div><img src={loginBG} className="loginBG" alt="bg" />
    <div className="loginform">
        
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <br/>
                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <br/>
                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" onClick={this.login} class="loginbtn">Login</button>
            <button onClick={this.signup} style={{marginLeft: '25px'}} className="loginbtn">Signup</button>
        </form>
    </div>
    </div>
    );
  }
}
export default Login;