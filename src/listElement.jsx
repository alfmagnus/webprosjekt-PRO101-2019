import React, { Component } from "react";
import './App.css';
import firebase, { auth } from "./firebase.js";

import "./App.css";
var db = firebase.firestore();

class ListElement extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit2(e) {
        e.preventDefault();
        db.collection("Kanban").doc("lir2tyj2m84KFPS8IThx").update({
            name: this.state.editTest
        });
    }
    handleEdit(e) {
        this.setState({
            editTest: e.target.editTest
        });
    }

  render() {
    return (
      <div>
      <li key={this.props.item.id}>
        <div className="re">
          <div className="kortTopRow">
            {this.props.renderImportance(this.props.item.priStatus, this.props.item.id)}
            <div id="KortSlettDiv">
            <button
              className="btnBasic"
              id="KortSlett"
              onClick={() => this.props.removeItem(this.props.item.name)}
            >
              <i className="fas fa-trash" />
            </button>
            </div>
            <div id="KortEditDiv">
            /*<button
              className="btnBasic"
              id="KortEdit"
              onClick={() => this.props.editItemRender(this.props.item.name)}
            >
              <i className="fas fa-edit" />
            </button>*/
            </div>
            <div className="KortNavn">{this.props.item.title}</div>
            <div className="KortLagtTil">{this.props.unixToTime(this.props.item.creation)}</div>
            <div className="editKort1">
              <form onSubmit={this.props.handleSubmit2}>
                <input
                    name="editTest"
                    className="inputKort"
                    type="text"
                    onChange={this.props.handleChange}
                    defaultValue={this.props.handleEdit}

                />
                <button className="btnBasic" id="leggtilKort">
                  {" "}
                  Legg til
                </button>
              </form>
            </div>
            </div>
          </div>
      </li>
      </div>
    );
  }
}

export default ListElement;
