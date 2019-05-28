import React, { Component } from "react";
import './App.css';

class ListElement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <li key={this.props.item.id}>
        <div className="re">
            {this.props.renderImportance(this.props.item.priStatus)}
            <div id="KortSlettDiv">
            <button
              className="btnBasic"
              id="KortSlett"
              onClick={() => this.props.removeItem(this.props.item.id)}
            >
              <i className="fas fa-trash" />
            </button>
          </div>
          <div className="KortNavn">{this.props.item.title}</div>
          <div className="KortLagtTil">{this.props.unixToTime(this.props.item.creation)}</div>
        </div>
      </li>
      

    );
  }
}

export default ListElement;
